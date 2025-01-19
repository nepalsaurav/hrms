<script setup>
import BreadCrumb from "@/components/BreadCrumb.vue";
import { ref, watch, useTemplateRef } from "vue";
import { formDetails } from "./form";
import RenderForms from "@/components/RenderForms.vue";
import { trimFormObject } from "@/utils";
import { client } from "@/api/pocketbase";
import { useRouter, useRoute } from "vue-router";
import Swal from "sweetalert2";
import LoadingSkeleton from "@/components/LoadingSkeleton.vue";
import { useEventListener } from "@vueuse/core";
import { useFormModel } from "@/stores/form";

const {formModel} = useFormModel()

const formProcessing = ref(false);
const formErrors = ref({});
const router = useRouter();
const route = useRoute();
const post = ref(null);
const error = ref(null);
const loading = ref(false);

watch(route.params, fetchData, { immediate: true });

async function fetchData() {
    post.value = error.value = null;
    loading.value = true;
    try {
        const record = await client
            .collection("salary_component")
            .getOne(route.params.id);
        post.value = record;
    } catch (err) {
        error.value = err.data.message;
    } finally {
        loading.value = false;
    }
}
async function handleSubmit(event) {
    formProcessing.value = true;
    
    try {
        await client
            .collection("salary_component")
            .update(route.params.id, formModel);
        Swal.fire({
            title: "success",
            text: "successfully edited salary components",
            icon: "success",
        });
        // router.push("/payroll/salary_component");
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

const saveButton = useTemplateRef("saveButton")

function handleKeyDown(event) {
    if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault(); // Prevent the browser's default save action
        saveButton.value?.click()
    }
}


useEventListener("keydown", handleKeyDown)
</script>

<template>
    <BreadCrumb :links="[
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
    ]" />

    <div class="card">
        <div class="card-content">
            <LoadingSkeleton v-if="loading" />
            <form novalidate @submit.prevent="handleSubmit" v-if="post !== null">
                <fieldset :disabled="formProcessing">
                    <legend class="has-text-weight-bold">
                        Add Salary Component
                    </legend>
                    <div class="is-flex is-flex-direction-row-reverse">
                        <button type="submit" class="button is-dark" ref="saveButton">
                            Save
                        </button>
                    </div>
                    <div class="columns mt-4 is-multiline">
                        <template v-for="item in formDetails">
                            <div class="column" :class="item.size">
                                <RenderForms :form="item" :errors="formErrors" :defaultValue="post[item.name]" />
                            </div>
                        </template>
                    </div>
                </fieldset>
            </form>
            <p class="has-text-danger" v-if="!loading && error !== null">
                {{ error }}
            </p>
        </div>
    </div>
</template>
