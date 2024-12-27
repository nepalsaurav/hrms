<script setup>
import BreadCrumb from "@/components/BreadCrumb.vue";
import GenericAdd from "@/components/GenericAdd.vue";
import { formList } from "./user";
const breadcrumbLink = [
    {
        label: "Dashboard",
        path: "/",
        isActive: false,
    },
    {
        label: "Settings",
        path: "/settings",
        isActive: false,
    },
    {
        label: "User",
        path: "/settings/user",
        isActive: false,
    },
    {
        label: "Add",
        path: "/settings/user/add",
        isActive: true,
    },
];
</script>

<template>
    <BreadCrumb :links="breadcrumbLink" />
    <GenericAdd :formList="formList" legend="Add User" />
</template>
