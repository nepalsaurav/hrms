<script setup>
import SideNav from "@/components/nav/SideNav.vue";

let menus = [
    {
        path: "/payroll/payroll_list",
        name: "payroll_list",
        label: "Payroll",
        icon: null,
        hasChild: false,
    },
    {
        path: "/payroll/salary_component",
        name: "salary_component",
        label: "Salary Component",
        icon: null,
        hasChild: false,
    },
    {
        path: "/payroll/salary_structure",
        name: "salary_structure",
        label: "Salary Structure",
        icon: null,
        hasChild: false,
    },
    {
        path: "/payroll/collection/advance_salary",
        name: "advance_salary",
        label: "Advance Salary",
        icon: null,
        hasChild: false
    },
];
</script>

<template>
    <div class="columns">
        <div class="column is-2 box">
            <!-- setting side nav -->
            <SideNav :menus="menus" />
            <!-- setting side nav -->
        </div>
        <div class="column is-10 ml-4">
            <router-view />
        </div>
    </div>
</template>
