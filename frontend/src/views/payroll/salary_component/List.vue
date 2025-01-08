<script setup>
import BreadCrumb from "@/components/BreadCrumb.vue";
import { RouterLink } from "vue-router";
import ListDisplay from "@/components/ListDisplay.vue";

const listHeader = [
    {
        name: "name",
        label: "Name",
        type: "text",
    },
    {
        name: "abbreviation",
        label: "Abbreviation",
        type: "text",
    },
    {
        name: "type",
        label: "Type",
        type: "text",
    },
    {
        name: "edit",
        label: "Edit",
        type: "action",
    },
];

const filter = [
    {
        name: "text_search",
        label: "Search",
        type: "text_search",
        fields: ["name"],
        placeholder: "search",
    },
];
</script>

<template>
    <BreadCrumb
        :links="[
            {
                label: 'Dashboard',
                path: '/',
                isActive: false,
            },
            {
                label: 'Payroll',
                path: '/payroll',
                isActive: true,
            },
            {
                label: 'Sarary Component',
                path: '/payroll/salary_component',
                isActive: true,
            },
        ]"
    />
    <div class="card">
        <div class="card-content">
            <div class="is-flex is-flex-direction-row-reverse">
                <RouterLink
                    to="/payroll/salary_component/add"
                    class="button is-dark"
                >
                    <i class="bi bi-plus-circle px-1"></i>Add Salary Component
                </RouterLink>
            </div>

            <div class="mt-5">
                <ListDisplay
                    :listHeader="listHeader"
                    :filter="filter"
                    collection="salary_component"
                />
            </div>
        </div>
    </div>
</template>
