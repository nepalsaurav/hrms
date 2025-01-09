<script setup>
import LoadingSkeleton from "@/components/LoadingSkeleton.vue";
import { onMounted } from "vue";
import { ref, watchEffect, computed } from "vue";
import { client } from "@/api/pocketbase";
import { isWeekDay } from "@/utils";
import { calculateDays, calculateWeekdaysInRange } from "@/utils";
import { getTotalLeavesTaken } from "./payroll";
import { evalFunction } from "@/utils";
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
        .filter((e) => e.type === "Earning")
        .reduce((amt, e) => amt + e.amount, 0),
);

const netSalary = computed(() => {
    return (
        grossSalary.value -
        salary.value
            .filter((e) => e.type === "Deduction")
            .reduce((amt, e) => amt + e.amount, 0)
    );
});

watchEffect(() => {
    if (days.value.unpaid && days.value.unpaid > 0) {
        if (grossSalary.value === 0) return;
        const unpaidSalaryDecduction =
            (grossSalary.value /
                calculateDays(props.query.from_date, props.query.to_date)) *
            days.value.unpaid;
        const filter = salary.value.filter(
            (e) => e.name === "Unpaid Leave Deduction",
        );
        if (filter.length > 0) return;
        salary.value.push({
            name: "Unpaid Leave Deduction",
            amount: parseFloat(unpaidSalaryDecduction.toFixed(2)),
            type: "Deduction",
        });
    }

    emit("update", {
        employee: props.employee,
        value: {
            component: salary.value,
            grossSalary: grossSalary.value,
            netSalary: netSalary.value,
        },
    });
    // console.log(salary.value);
});

onMounted(async () => {
    error.value = [];
    salary.value = [];
    try {
        const fetchAttendance = await client
            .collection("attendance")
            .getFullList({
                filter: `employee="${props.employee}" && "${props.query.from_date} 00:00:00.000Z" <= date && "${props.query.to_date} 00:00:00.000Z" >= date`,
            });
        const fetchLeave = await client.collection("leave").getFullList({
            filter: `employee="${props.employee}" && "${props.query.from_date} 00:00:00.000Z" <= leave_from && "${props.query.to_date} 00:00:00.000Z" >= leave_to`,
        });
        // const totalLeaveTaken = (
        //     await client.collection("leave").getList(1, 1, {
        //         filter: `employee="${props.query.employee}" && status="accepted"  && "${props.settings.fy_year.from_date.value} 00:00:00.000Z" <= leave_from && "${props.settings.fy_year.to_date.value} 00:00:00.000Z" >= leave_to`,
        //     })
        // ).totalItems;
        let workingDays = calculateWeekdaysInRange(
            props.query.from_date,
            props.query.to_date,
            props.settings.weekly_off.value,
        );

        let employeeWorkedDays = 0;
        fetchAttendance.forEach((attendance) => {
            if (attendance.status === "present") {
                employeeWorkedDays += 1;
            }
        });
        days.value.workingDays = workingDays;
        days.value.present = employeeWorkedDays;
        let absentDays = workingDays - employeeWorkedDays;
        let acceptedLeaveDays = getTotalLeavesTaken(
            fetchLeave,
            props.query.from_date,
            props.query.to_date,
        );

        const employeeRecord = await client
            .collection("employee")
            .getOne(props.employee, {
                expand: "leave_type,salary_structure",
            });
        employee.value = employeeRecord;
        formulaContext.value = employeeRecord;
        let unpaidLeave = absentDays;
        if (employeeRecord.expand.leave_type === undefined) {
            error.value.push("leave is not assigned to employee");
        }
        if (employeeRecord.expand.leave_type !== undefined) {
            const allowedLeave = employeeRecord.expand.leave_type.reduce(
                (sum, e) => sum + (e.allowed_paid_leave || 0),
                0,
            );
            if (acceptedLeaveDays <= allowedLeave) {
                unpaidLeave = absentDays - acceptedLeaveDays;
            }
        }
        fetchLeave.forEach((leave) => {
            if (leave.is_half) {
                absentDays -= 0.5;
                unpaidLeave -= 0.5;
            }
        });
        days.value.absentDays = absentDays;
        days.value.acceptedLeave = acceptedLeaveDays;
        days.value.unpaid = unpaidLeave;
        if (employeeRecord.expand.salary_structure === undefined) {
            error.value.push("salary structure is not assigned to employee");
        }
        if (employeeRecord.expand.salary_structure !== undefined) {
            const salaryComponent =
                employeeRecord.expand.salary_structure.components;
            salaryComponent.forEach(async (e) => {
                const component = await client
                    .collection("salary_component")
                    .getOne(e.component);

                let amount = 0;
                if (e.calculated) {
                    const evalReturn = evalFunction(
                        component.formula,
                        formulaContext.value,
                    );
                    amount = evalReturn;
                } else {
                    amount = e.amount;
                }
                formulaContext.value[component.abbreviation] = e.calculated
                    ? component.formula
                    : e.amount;

                salary.value.push({
                    name: e.name,
                    amount: amount,
                    type: component.type,
                });
            });
        }
    } catch (error) {
        console.log(error);
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
                        {{ employee?.expand?.salary_structure.name }}
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
                            <label :for="item.name" class="label is-small"
                                >{{ item.name }}
                                <i class="bi bi-plus-circle-fill"></i
                            ></label>
                            <input
                                :id="item.name"
                                type="text"
                                class="input is-small"
                                :value="item.amount"
                            />
                        </div>
                    </template>
                    <div class="column is-4">
                        <label for="gross_salary" class="label is-small"
                            >Gross Salary</label
                        >
                        <input
                            id="gross_salary"
                            type="text"
                            class="input is-small"
                            :value="grossSalary"
                        />
                    </div>
                    <template v-for="item in salary">
                        <div
                            class="column is-4"
                            v-if="item.type === 'Deduction'"
                        >
                            <label :for="item.name" class="label is-small"
                                >{{ item.name }}
                                <i class="bi bi-dash-circle-fill"></i
                            ></label>
                            <input
                                :id="item.name"
                                type="text"
                                class="input is-small"
                                :value="item.amount"
                            />
                        </div>
                    </template>
                    <div class="column is-4">
                        <label for="gross_salary" class="label is-small"
                            >Net Salary</label
                        >
                        <input
                            id="gross_salary"
                            type="text"
                            class="input is-small"
                            :value="netSalary"
                        />
                    </div>
                </div>
            </template>
            <template v-if="error.length > 0">
                <small class="has-text-danger" v-for="err in error">{{
                    err
                }}</small>
            </template>
        </div>
    </div>
</template>
