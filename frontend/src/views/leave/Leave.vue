<script setup lang="jsx">
import { RouterLink } from "vue-router";
import ListDisplay from "@/components/ListDisplay.vue";
import BreadCrumb from "@/components/BreadCrumb.vue";
import Status from "@/components/Status.vue";
import { defineComponent } from "vue";
import AcceptorReject from "@/components/AcceptorReject.vue";

function getDaysBetweenDates(startDateStr, endDateStr) {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    const diffInMs = endDate - startDate;
    return diffInMs / (1000 * 60 * 60 * 24) + 1;
}

const NumberOfLeave = defineComponent({
    props: {
        item: Object,
        header: Object,
    },
    render() {
        return (
            <span>
                {getDaysBetweenDates(this.item.leave_from, this.item.leave_to)}{" "}
                days
            </span>
        );
    },
});

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
        link: true,
        fields: ["first_name", "middle_name", "last_name"],
    },
    {
        name: "leave_from",
        label: "Leave From",
        type: "date",
    },

    {
        name: "leave_to",
        label: "Leave To",
        type: "date",
    },
    {
        name: "days",
        label: "Days",
        type: "custom_component",
        component: NumberOfLeave,
    },
    {
        name: "is_half",
        label: "Half Day",
        type: "text",
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
        collection: "leave",
        component: AcceptorReject,
        can: true,
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
        fields: [
            "employee.first_name",
            "employee.middle_name",
            "employee.last_name",
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
                    <RouterLink to="/leave/add" class="button is-dark">
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
    </div>
</template>
