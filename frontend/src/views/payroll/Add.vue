<script setup>
import BreadCrumb from "@/components/BreadCrumb.vue";
import LoadingSkeleton from "@/components/LoadingSkeleton.vue";
import SinglePayroll from "./SinglePayroll.vue";
import { watch, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { client } from "@/api/pocketbase";
import Swal from "sweetalert2";
import { useArrayFind, useArrayFindIndex } from '@vueuse/core'
import { exportToExcel } from "@/utils";

const route = useRoute();
const router = useRouter();
const settings = ref(null);
const error = ref(null);
const formProcessing = ref(false);
const formModal = ref({});
const employeeRecord = ref([])

async function fetchData() {
    settings.value = error.value = null;
    try {
        if (route.query.employee !== "undefined") {
            formModal.value[route.query.employee] = null;
        } else {
            const employee = await client.collection("employee").getFullList()
            employeeRecord.value = employee
            employee.forEach((e) => {
                formModal.value[e.id] = null
            })
        }
        const record = await client.send("/api/get_settings/settings.json");
        settings.value = record;
    } catch (err) {
        console.log(err);
        error.value = err.data.message;
    }
}

watch(route.query, fetchData, { immediate: true });

function handleUpdate(data) {
    if (data.value.component.length > 0) {
        formModal.value[data.employee] = data.value;
    }
}

async function handleSubmit() {
    formProcessing.value = true;
    const batch = client.createBatch();
    for (const [key, value] of Object.entries(formModal.value)) {
        const data = {
            employee: key,
            from_date: route.query.from_date,
            to_date: route.query.to_date,
            details: value,
        };
        batch.collection("payroll").create(data);
    }
    try {
        const result = await batch.send();
        console.log(result);
        Swal.fire({
            title: "success!",
            text: "successfully created payroll",
            icon: "success",
        });
        router.push("/payroll/payroll_list");
    } catch (err) {
        Swal.fire({
            title: "error!",
            text: err.data.message,
            icon: "error",
        });
    } finally {
        formProcessing.value = false;
    }
}



async function handleExcel(params) {
    const header = new Set(["Employee"])
    for (const [key, value] of Object.entries(formModal.value)) {
        value.component.forEach((e) => {
            header.add(e.name)
        })
    }
    header.add("Gross Salary")
    header.add("Net Salary")
    const data = []
    data.push([...header])
    for (const [key, value] of Object.entries(formModal.value)) {
        const innerData = []
        const emp = useArrayFind(employeeRecord.value, e => e.id === key)
        const full_name = [emp.value.first_name, emp.value.middle_name, emp.value.last_name].filter(name => name !== "").join(" ")
        innerData[useArrayFindIndex(Array.from(header), e => e === "Employee").value] = full_name
        value.component.forEach((e) => {
             innerData[useArrayFindIndex(Array.from(header), i => i === e.name).value] = e.amount.toLocaleString()
        })
        innerData[useArrayFindIndex(Array.from(header), e => e === "Gross Salary").value] = value.grossSalary.toLocaleString()
        innerData[useArrayFindIndex(Array.from(header), e => e === "Net Salary").value] = value.netSalary.toLocaleString()
        data.push(innerData)
    }
    exportToExcel(data, `payroll_from_${route.query.from_date}_to_${route.query.to_date}`)
    console.log(data)
} 
</script>

<template>
    <BreadCrumb :links="[
        {
            path: '/',
            label: 'Dashboard',
            isActive: false,
        },
        {
            path: '/payroll/payroll_list',
            label: 'Payroll',
            isActive: false,
        },
        {
            path: '/payroll/add',
            label: 'Add',
            isActive: true,
        },
    ]" />

    <LoadingSkeleton v-if="settings === null" />
    <template v-if="settings !== null">
        <form @submit.prevent="handleSubmit">
            <fieldset :disabled="formProcessing">
                <div class="is-flex is-flex-direction-row-reverse">

                    <button type="submit" class="button is-dark mb-2">
                        Save
                    </button>
                    <button type="button" class="button is-light mb-2 mr-2" @click="handleExcel">
                        Excel
                    </button>
                </div>
                <template v-for="(_, key) in formModal">
                    <SinglePayroll :employee="key" :query="route.query" :settings="settings" @update="handleUpdate" />
                </template>
            </fieldset>
        </form>
    </template>
    <p v-if="error !== null">{{ error }}</p>
</template>
