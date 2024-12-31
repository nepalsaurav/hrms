<script setup>
import { RouterLink } from "vue-router";
import ListDisplay from "@/components/ListDisplay.vue";
import BreadCrumb from "@/components/BreadCrumb.vue";

const listHeader = [
    {
        name: "sn",
        label: "SN",
        type: "serial_number",
    },
    {
        name: "employee",
        label: "Employee",
        type: "expand",
        expandCollection: "employee",
        expandLabel: "name",
        isCombinedField: true,
        fields: ["first_name", "middle_name", "last_name"],
    },
];

const filter = [
    {
        name: "text_search",
        label: "Search",
        type: "text_search",
        fields: ["first_name", "middle_name", "last_name"],
        placeholder: "search",
    },
    {
        name: "gender",
        label: "Gender",
        type: "select",
        options: [
            {
                label: "Select Gender",
                value: "",
            },
            {
                label: "Male",
                value: "Male",
            },
            {
                label: "Female",
                value: "Female",
            },
            {
                label: "Other",
                value: "Other",
            },
        ],
    },

    {
        name: "marital_status",
        label: "Marital Status",
        type: "select",
        options: [
            {
                label: "Select Maritial Status",
                value: "",
            },
            {
                label: "Single",
                value: "Single",
            },
            {
                label: "Married",
                value: "Married",
            },
            {
                label: "Divorced",
                value: "Divorced",
            },
            {
                label: "Widowed",
                value: "Widowed",
            },
        ],
    },

    {
        name: "department",
        label: "Department",
        type: "relational_field_select",
        collection: "department",
        labelField: "name",
        firstOption: "Select Department",
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
                label: 'Leave',
                path: '/leave',
                isActive: true,
            },
        ]"
    />

    <div class="card">
        <div class="card-content">
            <div class="is-flex is-flex-direction-row-reverse">
                <RouterLink to="/employee/add" class="button is-dark">
                    <i class="bi bi-plus-circle px-1"></i>Add Leave
                </RouterLink>
            </div>
            <div class="mt-5">
                <ListDisplay
                    :listHeader="listHeader"
                    collection="leave"
                    :filter="filter"
                    expand="employee"
                    detailViewLink="/leave/view"
                />
            </div>
        </div>
    </div>
</template>
