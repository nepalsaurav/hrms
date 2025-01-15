<script setup>
import { useStorage } from '@vueuse/core';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { client } from '@/api/pocketbase';
import { getTotalLeavesTakenAll } from '@/views/payroll/payroll';
import LoadingSkeleton from '../LoadingSkeleton.vue';
import RenderForms from '../RenderForms.vue';
import { watch } from 'vue';
import { useFormModel } from '@/stores/form';


const props = defineProps({
    employee: Object
})
const settings = JSON.parse(useStorage("settings").value)
const leaveBalance = ref(0);
const leaveTaken = ref(0)
const loading = ref(false)
const error = ref(null)
const employee_id = ref(null)
const allowedLeave = ref(0)
const { formModel } = useFormModel()
const defaultValue = ref({
    employee: client.authStore.record?.employee
}
)

const searchEmployeeForm = {
    name: "employee",
    label: "Employee",
    collection: "employee",
    labelField: "full_name",
    firstOption: "select employee",
    type: "relational_field_select",
    isCombinedField: true,
    combinedFields: ["first_name", "middle_name", "last_name"],
    required: true,
    showLabel: false
}


onMounted(() => {
    if (client.authStore.record?.employee !== undefined) {
        employee_id.value = client.authStore.record?.employee
    }

})


watch(employee_id, async () => {
    error.value = null
    loading.value = true
    if (employee_id.value) {
        try {
            console.log(employee_id.value)
            const employee = await client.collection("employee").getOne(employee_id.value, {
                expand: "leave_type",
                requestKey: null
            })
            const leaveType = employee?.expand.leave_type
            allowedLeave.value = leaveType?.reduce((acc, e) => acc + e.allowed_paid_leave, 0)
            const leaveRecord = await client.collection("leave").getFullList({
                filter: `employee='${employee.id}'`,
                requestKey: null
            })
            console.log(employee, leaveRecord)
            leaveTaken.value = getTotalLeavesTakenAll(leaveRecord, settings.fy_year.from_date.value, settings.fy_year.to_date.value)
            leaveBalance.value = allowedLeave.value - leaveTaken.value
        } catch (err) {
            console.log(err)
            error.value = err.data.message
        } finally {
            loading.value = false
        }
    }
}, { immediate: true })


watch(formModel, (new_value, _) => {
    const id = new_value.employee.slice(-1)[0]
    defaultValue.value.employee = id
    employee_id.value = id
})


function fyYear() {
    const fromDate = settings?.fy_year.from_date.value
    const toDate = settings?.fy_year.to_date.value
    return `${fromDate.split("-")[0].slice(2)}/${toDate.split("-")[0].slice(2)}`
}
</script>

<template>
    <LoadingSkeleton v-if="loading" />
    <template v-if="!loading">
        <p class="is-size-5 mb-2 has-text-weight-bold">Leave Summary</p>
        <RenderForms :form="searchEmployeeForm" :defaultValue="defaultValue[searchEmployeeForm.name]" />
        <p class="has-text-grey">FY Year {{ fyYear() }}</p>
        <p class="has-text-grey">Allowed Leave: {{ allowedLeave }}</p>
        <p class="has-text-grey">Leave Taken: {{ leaveTaken }}</p>
        <p class="has-text-grey">Leave Balance: {{ leaveBalance }}</p>
    </template>
    <p class="has-text-danger" v-if="error !== null">{{ error }}</p>
</template>