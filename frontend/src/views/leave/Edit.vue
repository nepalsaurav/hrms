<script setup>
import BreadCrumb from "@/components/BreadCrumb.vue";
import { formDetails } from "./forms";
import RenderForms from "@/components/RenderForms.vue";
import { ref } from "vue";
import { trimFormObject, validateForm } from "@/utils";
import { validationSchema } from "./forms";
import { client } from "@/api/pocketbase";
import Swal from "sweetalert2";
import { useRouter, useRoute } from "vue-router";
import { watch } from "vue";
import LoadingSkeleton from "@/components/LoadingSkeleton.vue";

const formErrors = ref({});
const formProcessing = ref(false);
const router = useRouter();
const route = useRoute();
const loading = ref(true);
const error = ref(null);
const post = ref(null);

async function fetchData(id) {
    error.data = post.value = null;
    try {
        const record = await client.collection("leave").getOne(id);
        post.value = record;
    } catch (err) {
        if (err.data.message) {
            error.value = err.data.message;
        }
    } finally {
        loading.value = false;
    }
}

watch(
    route.params,
    () => {
        fetchData(route.params.id);
    },
    { immediate: true },
);

async function handleSubmit(event) {
    event.preventDefault();
    const target = event.target;
    const form = new FormData(target);
    let formObject = trimFormObject(Object.fromEntries(form.entries()));
    const validate = await validateForm(
        Object.fromEntries(formObject.entries()),
        validationSchema,
    );
    if (validate !== true) {
        formErrors.value = validate;
        return;
    }
    formProcessing.value = true;
    formErrors.value = {};
    try {
        await client.collection("leave").update(route.params.id, formObject);
    } catch (err) {
        Swal.fire({
            title: "Error!",
            text: err.data.message,
            icon: "error",
        });
    } finally {
        Swal.fire({
            title: "Success!",
            text: "successfully udated leave",
            icon: "success",
        });
        router.push("/leave");
    }
    formProcessing.value = false;
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
                label: 'Leave',
                path: '/leave',
                isActive: false,
            },
            {
                label: 'Edit',
                path: '/leave/edit',
                isActive: true,
            },
        ]"
    />

    <div class="card">
        <div class="card-content">
            <LoadingSkeleton v-if="loading" />
            <form
                novalidate
                @submit="handleSubmit"
                v-if="!loading && post !== null"
            >
                <fieldset :disabled="formProcessing">
                    <legend class="has-text-weight-bold">Add Employee</legend>
                    <div class="is-flex is-flex-direction-row-reverse">
                        <button class="button is-dark" type="submit">
                            Save
                        </button>
                    </div>
                    <div class="columns is-multiline">
                        <div class="column is-4" v-for="item in formDetails">
                            <RenderForms
                                :form="item"
                                :errors="formErrors"
                                :defaultValue="post[item.name]"
                            />
                        </div>
                    </div>
                </fieldset>
            </form>

            <p v-if="error != null">{{ error }}</p>
        </div>
    </div>
</template>
