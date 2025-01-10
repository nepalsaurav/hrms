<script setup lang="jsx">
import { ref, computed } from "vue";
import RenderForms from "@/components/RenderForms.vue";
import { validateForm } from "@/utils";
import { validationSchemaSingle } from "./form";
import BreadCrumb from "@/components/BreadCrumb.vue";
import { useRouter } from "vue-router";
import ListDisplay from "@/components/ListDisplay.vue";
import { RouterLink } from "vue-router";
import { formList } from "./form"

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
                to={`/payroll/payslip?id=${this.item.id}&employee=${this.item.employee}&full_name=${this.item.expand.employee.full_name}`}
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

// Function to handle form submission
async function handleSubmit(event) {
    const target = event.target;
    const form = new FormData(target);
    const formObject = Object.fromEntries(form.entries());
    if (type.value === "single" && formObject.employee === undefined || formObject.employee  === "") {
        formErrors.value = {employee: "required fields"}
        return
    }
    const validationResult = await validateForm(formObject, validationSchemaSingle);
    if (validationResult !== true) {
        formErrors.value = validationResult;
        return;
    }

    router.push(`/payroll/add?type=${type.value}&employee=${formObject?.employee}&from_date=${formObject?.from_date}&to_date=${formObject?.to_date}`);
}

// Function to open modal for different payroll types
function addPayroll(str) {
    type.value = str;
    modalActive.value = true;
}
</script>


<template>
    <BreadCrumb :links="[
        { path: '/', label: 'Dashboard', isActive: false },
        { path: '/payroll', label: 'Payroll', isActive: true },
    ]" />

    <div class="is-flex is-flex-direction-row-reverse mb-4">
        <button class="button is-secondary ml-3" @click="addPayroll('bulk')">
            <i class="bi bi-plus-circle px-1"></i>Bulk Payroll
        </button>
        <button class="button is-dark" @click="addPayroll('single')">
            <i class="bi bi-plus-circle px-1"></i>Add Payroll
        </button>
    </div>

    <div class="card">
        <div class="card-content">
            <ListDisplay :listHeader="listHeader" :filter="filters" expand="employee" collection="payroll" />
        </div>
    </div>

    <!-- Modal -->
    <div class="modal is-active" v-if="modalActive">
        <div class="modal-background" @click="modalActive = false"></div>
        <div class="card">
            <div class="card-content">
                <form novalidate @submit.prevent="handleSubmit">
                    <div class="columns is-multiline">
                        <template v-for="item in formList(type)">
                            <div class="column">
                                <RenderForms :form="item" :errors="formErrors" />
                            </div>
                        </template>
                        <div class="column is-12">
                            <button class="button is-dark">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="modalActive = false"></button>
    </div>
</template>
