<script setup>
import BreadCrumb from "@/components/BreadCrumb.vue";
import LoadingSkeleton from "@/components/LoadingSkeleton.vue";
import SinglePayroll from "./SinglePayroll.vue";
import { watch, ref } from "vue";
import { useRoute } from "vue-router";
import { client } from "@/api/pocketbase";
const route = useRoute();
const settings = ref(null);
const error = ref(null);

async function fetchData() {
    settings.value = error.value = null;
    try {
        const record = await client.send("/api/get_settings/settings.json");
        settings.value = record;
    } catch (err) {
        error.value = err.data.message;
    }
}

watch(route.query, fetchData, { immediate: true });
</script>

<template>
    <BreadCrumb
        :links="[
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
        ]"
    />

    <LoadingSkeleton v-if="settings === null" />
    <template v-if="settings !== null">
        <SinglePayroll :query="route.query" :settings="settings" />
    </template>
    <p v-if="error !== null">{{ error }}</p>
</template>
