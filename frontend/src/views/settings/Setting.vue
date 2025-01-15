<script setup>
import { RouterLink } from "vue-router";
import { useRoute } from "vue-router";
import SideNav from "@/components/nav/SideNav.vue";

let menus = [
    {
        path: "/settings/collection/users",
        name: "user",
        label: "User",
        icon: null,
        hasChild: false,
    },
    {
        path: "/settings/collection/company",
        name: "company",
        label: "Company",
        icon: null,
        hasChild: false,
    },
    {
        path: "/settings/collection/roles",
        name: "roles",
        label: "Roles",
        icon: null,
        hasChild: false,
    },
    {
        path: "/settings/collection/department",
        name: "department",
        label: "Department",
        hasChild: false,
        icon: null,
    },
    {
        path: `/settings/collection/branch`,
        name: "branch",
        label: "Branch",
        icon: null,
        hasChild: false,
    },
    
    {
        name: "leave_setting",
        label: "Leave",
        hasChild: true,
        icon: null,
        children: [
            {
                path: "/settings/collection/leave_type",
                name: "leave_type",
                label: "Leave Type",
                icon: null,
            },
        ],
    },
    {
        name: "attendance_setting",
        label: "Attendance",
        hasChild: true,
        icon: null,
        children: [
            {
                path: "/settings/collection/attendance",
                name: "attendance",
                label: "Attendance",
                icon: null,
            },
        ],
    },
];
const route = useRoute();
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
