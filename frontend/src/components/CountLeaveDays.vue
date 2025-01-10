<script setup>
import { ref } from 'vue';
import { calculateWeekdaysInRange } from "@/utils"
import { watchEffect } from 'vue';
import { onMounted } from 'vue';
import { client } from '@/api/pocketbase';
import { getTotalLeavesTakenAll } from '@/views/payroll/payroll';
import { computed } from 'vue';
const days = ref(0)
const fromDate = ref("")
const toDate = ref("")
const settings = ref(null)
const leaveBalance = ref(0)
const employee_id = ref(null)
const leave = ref(null)

const balanceLeave = computed(() =>  leaveBalance.value - days.value)

watchEffect(() => {
    (async () => {
        if (employee_id.value) {
        console.log(employee_id.value)
        if (!leave.value) {
            const record = await client.collection("leave").getFullList({
                filter: `employee='${employee_id.value}'`,
                expand: "employee.leave_type"
            })
            const leaveUtilized = getTotalLeavesTakenAll(record, settings.value.fy_year.from_date.value, settings.value.fy_year.to_date.value)
            console.log(leaveUtilized)
            const leaveType = record[0].expand.employee.expand.leave_type
            const allowedLeave = leaveType.reduce((acc,e) => acc + e.allowed_paid_leave, 0)
            leaveBalance.value = allowedLeave - leaveUtilized
        }
    }
    })()
    if (fromDate.value !== "" && toDate.value !== "") {
        console.log(fromDate.value, toDate.value)
        days.value = calculateWeekdaysInRange(fromDate.value, toDate.value, settings.value?.weekly_off?.value)
    }
})






onMounted(async () => {
    const record = await client.send("/api/get_settings/settings.json");
    settings.value = record
    const formDateEl = document.querySelector('[name="leave_from"]');
    const toDateEl = document.querySelector('[name="leave_to"]')
    const employeeEL = document.querySelector('[name="employee"]')
    formDateEl.addEventListener("change", (event) => {
        fromDate.value = event.target.value
    })
    toDateEl.addEventListener("change", (event) => {
        toDate.value = event.target.value
    })

    employee_id.value = employeeEL?.value
    
    employeeEL.addEventListener("input", (event) => {
        console.log(event.target)
    })
    
})

</script>

<template>
    <div class="is-flex">
        <input type="text" class="input is-small" :value="days" disabled>
        <input type="text" class="input ml-4 is-small" :value="balanceLeave" disabled>
    </div>
</template>