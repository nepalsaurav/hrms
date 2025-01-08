<script setup>
import BreadCrumb from "@/components/BreadCrumb.vue";
import { ref } from "vue";
import { formDetails } from "./form";
import RenderForms from "@/components/RenderForms.vue";
import { trimFormObject } from "@/utils";
import { client } from "@/api/pocketbase";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const defaultValue = {
    depends_on_payment_days: true,
    is_tax_applicable: true,
};

const formProcessing = ref(false);
const formErrors = ref({});
const router = useRouter();
async function handleSubmit(event) {
    formProcessing.value = true;
    const form = new FormData(event.target);
    let formObject = trimFormObject(Object.fromEntries(form.entries()));
    try {
        await client.collection("salary_component").create(formObject);
        Swal.fire({
            title: "success",
            text: "successfully created salary components",
            icon: "success",
        });
        router.push("/payroll/salary_component");
    } catch (error) {
        if (error.data.data) {
            const errObject = {};
            Object.entries(error.data.data).forEach(([key, value]) => {
                errObject[key] = value.message;
            });
            formErrors.value = errObject;
        }
    } finally {
        formProcessing.value = false;
    }
}
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
                label: 'Payroll',
                path: '/payroll',
                isActive: true,
            },
            {
                label: 'Sarary Component',
                path: '/payroll/salary_component',
                isActive: false,
            },
            {
                label: 'Add',
                path: '/payroll/salary_component/add',
                isActive: true,
            },
        ]"
    />

    <div class="card">
        <div class="card-content">
            <form novalidate @submit.prevent="handleSubmit">
                <fieldset :disabled="formProcessing">
                    <legend class="has-text-weight-bold">
                        Add Salary Component
                    </legend>
                    <div class="is-flex is-flex-direction-row-reverse">
                        <button type="submit" class="button is-dark">
                            Save
                        </button>
                    </div>
                    <div class="columns mt-4 is-multiline">
                        <template v-for="item in formDetails">
                            <div class="column" :class="item.size">
                                <RenderForms
                                    :form="item"
                                    :errors="formErrors"
                                    :defaultValue="defaultValue[item.name]"
                                />
                            </div>
                        </template>
                    </div>
                </fieldset>
            </form>
        </div>
    </div>
</template>
