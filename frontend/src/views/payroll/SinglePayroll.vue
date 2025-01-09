<script setup>
import LoadingSkeleton from "@/components/LoadingSkeleton.vue";
import { onMounted } from "vue";
import { ref, watchEffect, computed } from "vue";
import { client } from "@/api/pocketbase";
import { isWeekDay, calculateDays, getDateRange, evalFunction } from "@/utils";
import { getTotalLeavesTaken, getLeavesDetail } from "./payroll";

const props = defineProps({
    employee: String,
    query: Object,
    settings: Object,
});
const emit = defineEmits(["update"]);

const loading = ref(true);
const error = ref([]);
const salary = ref([]);
const employee = ref(null);
const days = ref({});
const formulaContext = ref({});

const grossSalary = computed(() =>
    salary.value
        .filter(e => e.type === "Earning")
        .reduce((amt, e) => amt + e.amount, 0)
);

const netSalary = computed(() =>
    grossSalary.value - salary.value
        .filter(e => e.type === "Deduction")
        .reduce((amt, e) => amt + e.amount, 0)
);

watchEffect(() => {
    if (days.value.unpaid && days.value.unpaid > 0 && grossSalary.value > 0) {
        const unpaidDeduction = (grossSalary.value / calculateDays(props.query.from_date, props.query.to_date)) * days.value.unpaid;
        const deductionIndex = salary.value.findIndex(e => e.name === "Unpaid Leave Deduction");

        const deduction = {
            name: "Unpaid Leave Deduction",
            amount: parseFloat(unpaidDeduction.toFixed(2)),
            type: "Deduction",
        };

        if (deductionIndex !== -1) {
            salary.value[deductionIndex] = deduction;
        } else {
            salary.value.push(deduction);
        }
    }

    emit("update", {
        employee: props.employee,
        value: {
            component: salary.value,
            grossSalary: grossSalary.value,
            netSalary: netSalary.value,
        },
    });
});

onMounted(async () => {
    loading.value = true;
    error.value = [];
    salary.value = [];

    try {
        const employeeRecord = await client.collection("employee").getOne(props.employee, {
            expand: "leave_type,salary_structure",
        });
        employee.value = employeeRecord;
        formulaContext.value = employeeRecord;

        if (!employeeRecord.expand.leave_type) {
            error.value.push("Leave type is not assigned to employee.");
        }

        const [attendanceRecords, leaveRecords] = await Promise.all([
            client.collection("attendance").getFullList({
                filter: `employee='${props.employee}' && '${props.query.from_date} 00:00:00.000Z' <= date && '${props.query.to_date} 00:00:00.000Z' >= date`,
            }),
            client.collection("leave").getFullList({
                filter: `employee='${props.employee}' && leave_from >= '${props.query.from_date} 00:00:00.000Z'`,
            }),
        ]);

        const daysRange = getDateRange(props.query.from_date, props.query.to_date);
        let [workingDays, workedDays, acceptedLeaveDays] = [0, 0, 0];

        for (const day of daysRange) {
            if (isWeekDay(day, props.settings.weekly_off.value)) continue;

            const attendance = attendanceRecords.find(e => e.date.split(" ")[0] === day);
            if (attendance) {
                if (attendance.status === "present") workedDays++;
                else {
                    const leave = getLeavesDetail(leaveRecords, day);
                    if (leave.leave && leave.leave.status === "accepted") acceptedLeaveDays += leave.leaveDays;
                }
            }
            workingDays++;
        }

        const allowedLeave = employeeRecord.expand.leave_type?.reduce((sum, e) => sum + (e.allowed_paid_leave || 0), 0) || 0;
        days.value = {
            workingDays,
            present: workedDays,
            absentDays: workingDays - workedDays,
            acceptedLeave: acceptedLeaveDays,
            unpaid: Math.max(workingDays - workedDays - Math.min(acceptedLeaveDays, allowedLeave), 0),
        };

        if (!employeeRecord.expand.salary_structure) {
            error.value.push("Salary structure is not assigned to employee.");
            return;
        }

        const salaryComponents = employeeRecord.expand.salary_structure.components;
        for (const e of salaryComponents) {
            const component = await client.collection("salary_component").getOne(e.component);
            const amount = e.calculated
                ? evalFunction(component.formula, formulaContext.value)
                : e.amount;

            formulaContext.value[component.abbreviation] = e.calculated ? component.formula : e.amount;
            salary.value.push({
                name: e.name,
                amount,
                type: component.type,
            });
        }
    } catch (err) {
        error.value.push("An error occurred while fetching data.");
    } finally {
        loading.value = false;
    }
});
</script>


<template>
    <LoadingSkeleton v-if="loading" />
    <div class="card">
        <div class="card-content">
            <div class="columns is-multiline mb-1">
                <div class="column is-3">
                    <small class="has-text-grey">
                        Employee: {{ employee?.full_name }}
                    </small>
                </div>
                <div class="column is-3">
                    <small class="has-text-grey">
                        Salary Structure:
                        {{ employee?.expand?.salary_structure?.name }}
                    </small>
                </div>
                <div class="column is-3">
                    <small class="has-text-grey">
                        From: {{ props.query.from_date }}
                    </small>
                </div>
                <div class="column is-3">
                    <small class="has-text-grey">
                        To: {{ props.query.to_date }}
                    </small>
                </div>
                <div class="column is-3">
                    <small class="has-text-grey">
                        Working Days: {{ days?.workingDays }}
                    </small>
                </div>
                <div class="column is-3">
                    <small class="has-text-grey">
                        Present: {{ days?.present }}
                    </small>
                </div>
                <div class="column is-3">
                    <small class="has-text-grey">
                        Absent: {{ days?.absentDays }}
                    </small>
                </div>
                <div class="column is-3">
                    <small class="has-text-grey">
                        Accepted Leave: {{ days?.acceptedLeave }}
                    </small>
                </div>
                <div class="column is-3">
                    <small class="has-text-grey">
                        Unpaid Leave: {{ days?.unpaid }}
                    </small>
                </div>
            </div>
            <template v-if="salary.length > 0">
                <div class="columns is-multiline">
                    <template v-for="item in salary">
                        <div class="column is-4" v-if="item.type === 'Earning'">
                            <label :for="item.name" class="label is-small">{{ item.name }}
                                <i class="bi bi-plus-circle-fill"></i></label>
                            <input :id="item.name" type="text" class="input is-small" :value="item.amount" />
                        </div>
                    </template>
                    <div class="column is-4">
                        <label for="gross_salary" class="label is-small">Gross Salary</label>
                        <input id="gross_salary" type="text" class="input is-small" :value="grossSalary" />
                    </div>
                    <template v-for="item in salary">
                        <div class="column is-4" v-if="item.type === 'Deduction'">
                            <label :for="item.name" class="label is-small">{{ item.name }}
                                <i class="bi bi-dash-circle-fill"></i></label>
                            <input :id="item.name" type="text" class="input is-small" :value="item.amount" />
                        </div>
                    </template>
                    <div class="column is-4">
                        <label for="gross_salary" class="label is-small">Net Salary</label>
                        <input id="gross_salary" type="text" class="input is-small" :value="netSalary" />
                    </div>
                    
                </div>
            </template>
            <template v-if="error.length > 0">
                <ul>
                    <li v-for="err in error">
                        <small class="has-text-danger">{{
                            err
                        }}</small>
                    </li>
                </ul>
            </template>
        </div>
    </div>
</template>
