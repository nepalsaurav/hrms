<script setup>
import LoadingSkeleton from "@/components/LoadingSkeleton.vue";
import { onMounted } from "vue";
import { ref } from "vue";
import { client } from "@/api/pocketbase";
import { isWeekDay } from "@/utils";
const props = defineProps({
    query: Object,
    settings: Object,
});
const loading = ref(true);
const error = ref([]);
const salary = ref([]);

onMounted(async () => {
    error.value = [];
    salary.value = [];
    try {
        const fetchAttendance = await client
            .collection("attendance")
            .getFullList({
                filter: `employee="${props.query.employee}" && "${props.query.from_date} 00:00:00.000Z" <= date && "${props.query.to_date} 00:00:00.000Z" >= date`,
            });
        const fetchLeave = await client.collection("leave").getFullList({
            filter: `employee="${props.query.employee}" && "${props.query.from_date} 00:00:00.000Z" <= leave_from && "${props.query.to_date} 00:00:00.000Z" >= leave_from && "${props.query.from_date} 00:00:00.000Z" <= leave_to && "${props.query.to_date} 00:00:00.000Z" >= leave_to`,
        });
        const totalLeaveTaken = (
            await client.collection("leave").getList(1, 1, {
                filter: `employee="${props.query.employee}" && status="accepted"  && "${props.settings.fy_year.from_date.value} 00:00:00.000Z" <= leave_from && "${props.settings.fy_year.to_date.value} 00:00:00.000Z" >= leave_from && "${props.settings.fy_year.from_date.value} 00:00:00.000Z" <= leave_to && "${props.settings.fy_year.to_date.value} 00:00:00.000Z" >= leave_to`,
            })
        ).totalItems;
        let workingDays = 0;
        let employeeWorkedDays = 0;
        fetchAttendance.forEach((attendance) => {
            const chekWeekDay = isWeekDay(
                attendance.date,
                props.settings.weekly_off.value,
            );
            if (!chekWeekDay) {
                workingDays += 1;
            }
            if (attendance.status === "present") {
                employeeWorkedDays += 1;
            }
        });
        const absentDays = workingDays - employeeWorkedDays;
        const acceptedLeaveDays = fetchLeave.filter(
            (e) => e.status === "accepted",
        ).length;
        const employeeRecord = await client
            .collection("employee")
            .getOne(props.query.employee, {
                expand: "leave_type,salary_structure",
            });

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
                unpaidLeave = 0;
            }
        }

        if (employeeRecord.expand.salary_structure === undefined) {
            error.value.push("salary structure is not assigned to employee");
        }
        if (employeeRecord.expand.salary_structure !== undefined) {
            const salaryComponent =
                employeeRecord.expand.salary_structure.components;
            salaryComponent.forEach((e) => {
                salary.value.push({
                    name: e.name,
                    amount: e.amount,
                });
            });
        }

        console.log(unpaidLeave);
    } catch {
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <LoadingSkeleton v-if="loading" />
    <div class="card">
        <div class="card-content">
            <template v-if="salary.length > 0">
                <div class="columns">
                    <div class="column" v-for="item in salary">
                        <label :for="item.name" class="label">{{
                            item.name
                        }}</label>
                        <input
                            :id="item.name"
                            type="text"
                            class="input"
                            :value="item.amount"
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
