<script setup>
import DetailView from "@/components/DetailView.vue";
import { ref } from "vue";
const breadcrumbLink = ref([
    {
        label: "Dashboard",
        path: "/",
        isActive: false,
    },
    {
        label: "Employee",
        path: "/employee",
        isActive: false,
    },
    {
        label: "View",
        path: `/employee`,
        isActive: false,
    },
]);

const viewList = [
    {
        name: "first_name",
        label: "First Name",
        type: "text",
    },
    {
        name: "middle_name",
        label: "Middle Name",
        type: "text",
    },
    {
        name: "last_name",
        label: "Last Name",
        type: "text",
    },
    {
        name: "date_of_birth_ad",
        label: "Date of birth (AD)",
        type: "date",
    },
    {
        name: "nationality",
        label: "Nationality",
        type: "text",
    },
    {
        name: "contact_number",
        label: "Contact Number",
        type: "text",
    },
    {
        name: "email",
        label: "Email",
        type: "text",
    },
    {
        name: "address",
        label: "Address",
        type: "textarea",
    },
    {
        name: "designation",
        label: "Designation",
        type: "text",
    },
    {
        name: "department",
        label: "Department",
        type: "text",
    },
    {
        name: "joining_date",
        label: "Joining Date",
        type: "date",
    },
    {
        name: "bio",
        label: "Bio",
        type: "rich_text",
    },
];
</script>

<template>
    <DetailView
        collection="employee"
        :breadcrumb="breadcrumbLink"
        breadcrumbLabel="first_name"
        :viewList="viewList"
    />
</template>
