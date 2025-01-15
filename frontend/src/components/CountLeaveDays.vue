<script setup>
import { ref } from 'vue';
import { calculateWeekdaysInRange } from "@/utils"
import { watchEffect } from 'vue';
import { client } from '@/api/pocketbase';
import { getTotalLeavesTakenAll } from '@/views/payroll/payroll';
import { computed } from 'vue';
import { watch } from 'vue';
import { useFormModel } from '@/stores/form';
import { onMounted } from 'vue';
import { useStorage } from '@vueuse/core';

const days = ref(0)
const fromDate = ref("")
const toDate = ref("")
const settings = ref(null)
const leaveBalance = ref(0)
const employee_id = ref(null)
const leave = ref(null)

const {formModel} = useFormModel()

const balanceLeave = computed(() =>  leaveBalance.value - days.value)

const employee = JSON.parse(useStorage("employee").value)


watchEffect(() => {
    (async () => {
        if (employee_id.value) {
        if (!leave.value) {
            const record = await client.collection("leave").getFullList({
                filter: `employee='${employee_id.value}'`,
                requestKey: null
            })
            const leaveUtilized = getTotalLeavesTakenAll(record, settings.value.fy_year.from_date.value, settings.value.fy_year.to_date.value)
          
            const leaveType = employee?.expand?.leave_type
            const allowedLeave = leaveType.reduce((acc,e) => acc + e.allowed_paid_leave, 0)
            leaveBalance.value = allowedLeave - leaveUtilized
        }
    }
    })()
    if (fromDate.value !== "" && toDate.value !== "") {
        days.value = calculateWeekdaysInRange(fromDate.value, toDate.value, settings.value?.weekly_off?.value)
    }
})


watch(formModel, (new_value, _) => {
    employee_id.value = new_value?.employee[0]
    fromDate.value = new_value?.leave_from
    toDate.value = new_value?.leave_to
})


onMounted(async () => {
    const record = await client.send("/api/get_settings/settings.json", {requestKey: null});
    settings.value = record
})





</script>

<template>
    <div class="is-flex">
        <input type="text" class="input is-small" :value="days" disabled>
        <input type="text" class="input ml-4 is-small" :value="balanceLeave" disabled>
    </div>
</template>