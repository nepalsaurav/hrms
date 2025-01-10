<script setup>
import BreadCrumb from "@/components/BreadCrumb.vue";
import LoadingSkeleton from "@/components/LoadingSkeleton.vue";
import SinglePayroll from "./SinglePayroll.vue";
import { watch, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { client } from "@/api/pocketbase";
import Swal from "sweetalert2";

const route = useRoute();
const router = useRouter();
const settings = ref(null);
const error = ref(null);
const formProcessing = ref(false);
const formModal = ref({});

async function fetchData() {
    settings.value = error.value = null;
    try {
        if (route.query.employee !== "undefined") {
            formModal.value[route.query.employee] = null;
        } else {
             const employee = await client.collection("employee").getFullList()
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
                </div>
                <template v-for="(_, key) in formModal">
                    <SinglePayroll :employee="key" :query="route.query" :settings="settings" @update="handleUpdate" />
                </template>
            </fieldset>
        </form>
    </template>
    <p v-if="error !== null">{{ error }}</p>
</template>
