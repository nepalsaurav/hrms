<script setup>
import { watch, ref } from "vue";
import { useRoute } from "vue-router";
import LoadingSkeleton from "@/components/LoadingSkeleton.vue";
import BreadCrumb from "@/components/BreadCrumb.vue";
import { client } from "@/api/pocketbase";
import { formDetails } from "./forms";
import RenderForms from "@/components/RenderForms.vue";
import { validationSchema } from "./forms";
import { validateForm } from "./forms";
import { getErrorTab } from "./forms";
import { trimFormObject } from "@/utils";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const route = useRoute();
const router = useRouter();
const loading = ref(false);
const data = ref(null);
const error = ref(null);
const activeFormTab = ref("personal_details");
const formErrors = ref({});

const breadcrumbLink = ref([
    {
        label: "Dashboard",
        path: "/",
        isActive: false,
    },
    {
        label: "Employee",
        path: "/employee",
        isActive: false,
    },
    {
        label: "Edit",
        path: `/employee`,
        isActive: false,
    },
]);

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
        name: "additional_information",
        label: "Additional Information",
    },
]);

watch(() => route.params.id, fetchData, { immediate: true });

async function fetchData(id) {
    error.value = null;
    data.value = null;
    loading.value = true;
    console.log(id);
    try {
        const record = await client.collection("employee").getOne(id);
        breadcrumbLink.value.push({
            label: record.first_name,
            path: `/employee/edit/${record.id}`,
            isActive: true,
        });
        data.value = record;
    } catch (error) {
        error.value = error.data.message;
    } finally {
        loading.value = false;
    }
}

function changeTab(name) {
    activeFormTab.value = name;
}

async function handleSumbit(event) {
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
    const validate = await validateForm(
        Object.fromEntries(formObject.entries()),
        validationSchema,
    );
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
        const record = await client
            .collection("employee")
            .update(route.params.id, form);
        console.log(record);
        Swal.fire({
            title: "Success!",
            text: "Successfully edited employee",
            icon: "success",
            confirmButtonColor: "#171717",
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
        <BreadCrumb :links="breadcrumbLink" />

        <div class="card">
            <div class="card-content">
                <!-- for loading conditiom -->
                <LoadingSkeleton v-if="loading" />
                <!-- for loading conditiom -->

                <form novalidate v-if="data != null" @submit="handleSumbit">
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
                                    :defaultValue="data[form.name]"
                                />
                            </div>
                        </div>
                    </div>
                    <!-- main form content -->
                </form>

                <p v-if="error != null">{{ error }}</p>
            </div>
        </div>
    </div>
</template>
