<script setup>
import { ref } from "vue";
import { formDetails } from "./forms";
import RenderForms from "@/components/RenderForms.vue";
import BreadCrumb from "@/components/BreadCrumb.vue";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
import { client } from "@/api/pocketbase";
import { validationSchema } from "./forms";
import { validateForm } from "./forms";
import { getErrorTab } from "./forms";
import { trimFormObject } from "./forms";
const router = useRouter();
const tabs = ref([
    {
        name: "personal_details",
        label: "Personal Details",
    },
    {
        name: "contact_details",
        label: "Contact Details",
    },
    {
        name: "job_details",
        label: "Job Details",
    },
    {
        name: "payroll_and_benifits",
        label: "Payroll and Benefits",
    },
    {
        name: "insurance_information",
        label: "Insurance Information"
    },
    {
        name: "additional_information",
        label: "Additional Information",
    },
]);

const activeFormTab = ref("personal_details");
const formErrors = ref({});

function changeTab(name) {
    activeFormTab.value = name;
}

async function handleSubmit(event) {
    event.preventDefault();
    const target = event.target;
    const form = new FormData(target);
    let formObject = Object.fromEntries(form.entries());
    const fullName = [
        formObject.first_name,
        formObject.middle_name,
        formObject.last_name,
    ]
        .filter((name) => name !== "")
        .join(" ");
    form.append("full_name", fullName);
    formObject = trimFormObject(formObject);
    const validate = await validateForm(formObject, validationSchema);
    if (validate != true) {
        formErrors.value = validate;
        const errorTab = getErrorTab(
            activeFormTab.value,
            formDetails,
            validate,
        );
        if (errorTab != undefined) {
            activeFormTab.value = errorTab;
        }
        return;
    }

    try {
        const record = await client.collection("employee").create(formObject);
      
        Swal.fire({
            title: "Success!",
            text: "Successfully create employee",
            icon: "success",
        });
        router.push("/employee");
    } catch (error) {
        const errMessage = error.data.message;
        Swal.fire({
            title: "Error!",
            text: errMessage,
            icon: "error",
        });
        // router.push("/employee");
    }
}
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
                    label: 'Employee',
                    path: '/employee',
                    isActive: false,
                },
                {
                    label: 'Add',
                    path: '/employee/add',
                    isActive: true,
                },
            ]"
        />

        <div class="card">
            <div class="card-content">
                <form novalidate v-on:submit="handleSubmit">
                    <legend class="has-text-weight-bold">Add Employee</legend>
                    <div class="is-flex is-flex-direction-row-reverse">
                        <button class="button is-dark" type="submit">
                            Save
                        </button>
                    </div>
                    <!-- tabs -->
                    <div class="tabs">
                        <ul>
                            <li
                                v-for="tab in tabs"
                                :class="
                                    tab.name === activeFormTab && 'is-active'
                                "
                            >
                                <a v-on:click="changeTab(tab.name)">{{
                                    tab.label
                                }}</a>
                            </li>
                        </ul>
                    </div>
                    <!-- tabs -->

                    <!-- main form content -->
                    <div v-for="tab in tabs">
                        <div
                            class="columns is-multiline"
                            v-show="tab.name === activeFormTab"
                        >
                            <div
                                class="column"
                                :class="
                                    form.type === 'rich_text' ? 'is-12' : 'is-4'
                                "
                                v-for="form in formDetails[tab.name]"
                            >
                                <RenderForms
                                    :form="form"
                                    :errors="formErrors"
                                />
                            </div>
                        </div>
                    </div>
                    <!-- main form content -->
                </form>
            </div>
        </div>
    </div>
</template>
