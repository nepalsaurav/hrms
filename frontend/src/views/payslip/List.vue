<script setup lang="jsx">
import { ref } from "vue";

import BreadCrumb from "@/components/BreadCrumb.vue";
import { useRouter } from "vue-router";
import ListDisplay from "@/components/ListDisplay.vue";
import { RouterLink } from "vue-router";


// State and reactive variables
const modalActive = ref(false);
const formErrors = ref({});
const type = ref("single");
const router = useRouter();


// ViewPaySlip component
const ViewPaySlip = {
    props: {
        item: Object,
    },
    render() {
        return (
            <RouterLink
                to={`/payslip_list/view_payslip?id=${this.item.id}&employee=${this.item.employee}&full_name=${this.item.expand.employee.full_name}`}
                class="button is-small is-dark"
            >
                ⚲
            </RouterLink>
        );
    },
};

// Dynamic form generation based on 'type'

// Table headers for ListDisplay component
const listHeader = ref([
    { name: "employee", label: "Employee", type: "expand", expandCollection: "employee", expandLabel: "full_name" },
    { name: "from_date", label: "From Date", type: "date" },
    { name: "to_date", label: "To Date", type: "date" },
    { name: "view", label: "View", type: "custom_component", component: ViewPaySlip },
]);

// Filter for ListDisplay
const filters = ref([
    { name: "text_search", label: "Search", type: "text_search", fields: ["employee.first_name", "employee.middle_name", "employee.last_name"], placeholder: "search" },
]);


</script>


<template>
    <div class="container">
        <BreadCrumb :links="[
            { path: '/', label: 'Dashboard', isActive: false },
            { path: '/payslip_list', label: 'Payroll', isActive: true },
        ]" />

        <div class="card">
            <div class="card-content">
                <ListDisplay :listHeader="listHeader" :filter="filters" expand="employee" collection="payroll" :checkBoxAllowed="false" />
            </div>
        </div>
    </div>
</template>
