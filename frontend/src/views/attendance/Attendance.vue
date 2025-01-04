<script setup lang="jsx">
import BreadCrumb from "@/components/BreadCrumb.vue";
import { RouterLink } from "vue-router";
import ListDisplay from "@/components/ListDisplay.vue";
import Status from "@/components/Status.vue";
import { defineComponent } from "vue";
import { client } from "@/api/pocketbase";
import { ref } from "vue";
import EmployeePresentStatus from "@/components/EmployeePresentStatus.vue";
import AcceptorReject from "@/components/AcceptorReject.vue";

const listHeader = [
    {
        name: "employee",
        label: "Employee",
        type: "expand",
        isCombinedField: true,
        expandCollection: "employee",
        fields: ["first_name", "middle_name", "last_name"],
    },
    {
        name: "date",
        label: "Date",
        type: "date",
    },
    {
        name: "check_in_time",
        label: "Check In",
        type: "text",
    },
    {
        name: "check_out_time",
        label: "Check Out",
        type: "text",
    },
    {
        name: "attendance_status",
        label: "Attendance Status",
        type: "custom_component",
        component: EmployeePresentStatus,
    },

    {
        name: "status",
        label: "Status",
        type: "custom_component",
        component: Status,
    },
    {
        name: "action",
        label: "Action",
        type: "custom_component",
        collection: "check_in",
        component: AcceptorReject,
        can: true,
    },
];

const filter = [
    {
        name: "text_search",
        label: "Search",
        type: "text_search",
        fields: [
            "employee.first_name",
            "employee.middle_name",
            "employee.last_name",
            "date",
            "check_in_time",
            "check_out_time",
            "status",
        ],
        placeholder: "search",
    },
];
</script>
<template>
    <div class="container">
        <BreadCrumb
            :links="[
                {
                    path: '/',
                    label: 'Dashboard',
                    isActive: false,
                },
                {
                    path: '/attendance',
                    label: 'Attendance',
                    isActive: true,
                },
            ]"
        />

        <div class="card">
            <div class="card-content">
                <div class="is-flex is-flex-direction-row-reverse">
                    <RouterLink
                        to="/attendance/checkout"
                        class="button is-danger ml-2"
                    >
                        <i class="bi bi-plus-circle px-1"></i>Check Out
                    </RouterLink>
                    <RouterLink to="/attendance/checkin" class="button is-dark">
                        <i class="bi bi-plus-circle px-1"></i>Check In
                    </RouterLink>
                </div>

                <div class="mt">
                    <ListDisplay
                        :listHeader="listHeader"
                        :filter="filter"
                        expand="employee"
                        collection="check_in"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
