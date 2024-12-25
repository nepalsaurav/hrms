<script setup>
import { RouterLink } from "vue-router";
import ListDisplay from "@/components/ListDisplay.vue";
import BreadCrumb from "@/components/BreadCrumb.vue";
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
                label: 'Employee',
                path: '/employee',
                isActive: true,
            },
        ]"
    />

    <div class="card">
        <div class="card-content">
            <div class="is-flex is-flex-direction-row-reverse">
                <RouterLink to="/employee/add" class="button is-dark">
                    <i class="bi bi-plus-circle px-1"></i>Add Employee
                </RouterLink>
            </div>
            <div class="mt-5">
                <ListDisplay />
            </div>
        </div>
    </div>
</template>
