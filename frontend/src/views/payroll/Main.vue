<script setup lang="jsx">
import { ref } from "vue";
import RenderForms from "@/components/RenderForms.vue";
import { validateForm } from "@/utils";
import { validationSchemaSingle } from "./form";
import BreadCrumb from "@/components/BreadCrumb.vue";
import { useRouter } from "vue-router";
import ListDisplay from "@/components/ListDisplay.vue";
import { defineComponent } from "vue";

import { RouterLink } from "vue-router";

const modalActive = ref(false);
const formErrors = ref({});
const router = useRouter();
function addPayroll() {
    modalActive.value = true;
}

const ViewPaySlip = defineComponent({
    props: {
        item: Object,
        header: Object,
    },
    render() {
        return (
            <RouterLink
                to={`/payroll/payslip?id=${this.item.id}&employee=${this.item.employee}`}
                class="button is-small is-dark"
            >
                ⚲
            </RouterLink>
        );
    },
});

const listHeader = ref([
    {
        name: "employee",
        label: "Employee",
        type: "expand",
        expandCollection: "employee",
        expandLabel: "full_name",
    },
    {
        name: "from_date",
        label: "From Date",
        type: "date",
    },
    {
        name: "to_date",
        label: "To Date",
        type: "date",
    },
    {
        name: "view",
        label: "View",
        type: "custom_component",
        component: ViewPaySlip,
    },
]);

const filters = ref([
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
]);

const formList = ref([
    {
        name: "employee",
        label: "Employee",
        collection: "employee",
        labelField: "full_name",
        firstOption: "select employee",
        type: "relational_field_select",
        isCombinedField: true,
        combinedFields: ["first_name", "middle_name", "last_name"],
        required: true,
    },
    {
        name: "from_date",
        label: "From Date",
        type: "date",
        placeholder: "2001-01-01",
    },
    {
        name: "to_date",
        label: "To Date",
        type: "date",
        placeholder: "2001-01-01",
    },
]);

async function handleSubmit(event) {
    const target = event.target;
    const form = new FormData(target);
    let formObject = Object.fromEntries(form.entries());
    const validate = await validateForm(formObject, validationSchemaSingle);
    console.log(validate);
    if (validate !== true) {
        formErrors.value = validate;
        return;
    }

    router.push(
        `/payroll/add?type=single&employee=${formObject.employee}&from_date=${formObject.from_date}&to_date=${formObject.to_date}`,
    );
    console.log(formObject);
}
</script>

<template>
    <BreadCrumb
        :links="[
            {
                path: '/',
                label: 'Dashboard',
                isActive: false,
            },
            {
                path: '/payroll',
                label: 'Payroll',
                isActive: true,
            },
        ]"
    />
    <div class="is-flex is-flex-direction-row-reverse mb-4">
        <button class="button is-dark" @click="addPayroll">
            <i class="bi bi-plus-circle px-1"></i>Add Payroll
        </button>
    </div>

    <div class="card">
        <div class="card-content">
            <ListDisplay
                :listHeader="listHeader"
                :filter="filters"
                expand="employee"
                collection="payroll"
            />
        </div>
    </div>

    <!-- add_modal -->
    <div class="modal" :class="modalActive && 'is-active'">
        <div class="modal-background"></div>

        <div class="card">
            <div class="card-content">
                <form novalidate @submit.prevent="handleSubmit">
                    <div class="columns is-multiline">
                        <template v-for="item in formList">
                            <div class="column">
                                <RenderForms
                                    :form="item"
                                    :errors="formErrors"
                                />
                            </div>
                        </template>
                        <div class="column is-12">
                            <button class="button is-dark">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <button
            class="modal-close is-large"
            aria-label="close"
            @click="modalActive = false"
        ></button>
    </div>
</template>
