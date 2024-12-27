<script setup>
import BreadCrumb from "@/components/BreadCrumb.vue";
import ListDisplay from "@/components/ListDisplay.vue";
import { RouterLink } from "vue-router";
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
        isActive: true,
    },
];

import { listHeader, filterList } from "./user";
</script>

<template>
    <BreadCrumb :links="breadcrumbLink" />

    <div class="card">
        <div class="card-content">
            <div class="is-flex is-flex-direction-row-reverse">
                <RouterLink to="/settings/user/add" class="button is-dark">
                    <i class="bi bi-plus-circle px-1"></i>Add User
                </RouterLink>
            </div>
            <div class="mt-2">
                <ListDisplay
                    :listHeader="listHeader"
                    :filter="filterList"
                    collection="users"
                    detailViewLink="/settings/user"
                    routeBack="/settings/user"
                />
            </div>
        </div>
    </div>
</template>
