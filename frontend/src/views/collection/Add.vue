<script setup>
import { watch } from "vue";
import { client } from "@/api/pocketbase";
import { useRoute } from "vue-router";
import { ref } from "vue";
import LoadingSkeleton from "@/components/LoadingSkeleton.vue";
import { snakeToProperCase } from "@/utils";
import { genericTrimFormObject } from "@/utils";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import BreadCrumb from "@/components/BreadCrumb.vue";
import RenderForms from "@/components/RenderForms.vue";

import { watchEffect } from "vue";

const loading = ref(false);
const post = ref(null);
const error = ref(null);
const route = useRoute();
const router = useRouter();
const breadCrumbLink = ref([]);
const formErrors = ref({});

const props = defineProps({
    parentRoute: String,
    label: String,
});

watch(() => [route.params.id, route.params.query], fetchCollectioSchema, {
    immediate: true,
});

watchEffect(() => {
    const link = [
        {
            label: "Dashboard",
            path: "/",
            isActive: false,
        },
        {
            label: props.label,
            path: `/${props.parentRoute}/collection/${route.params.id}`,
            isActive: false,
        },
        {
            label: snakeToProperCase(route.params.id),
            path: `/${props.parentRoute}/collection/${route.params.id}`,
            isActive: false,
        },
        {
            label: "Add",
            path: `/settings/collection/${route.params.id}/add`,
            isActive: true,
        },
    ];
    breadCrumbLink.value = link;
});

async function fetchCollectioSchema() {
    post.value = error.value = null;
    loading.value = true;
    try {
        const record = await client.send(
            `/api/get_collection/${route.params.id}`,
        );
        post.value = record.collection;
    } catch {
        error.value = "something bad occured";
    } finally {
        loading.value = false;
    }
}

function mappedFormList(list) {
    let data = list.map((e) => {
        e.label = snakeToProperCase(e.name);
        e.placeholder = e.name;
        if (e.type === "select") {
            e.options = e.values.map((val) => {
                return { label: val, value: val };
            });
        }
        if (e.type === "relation") {
            e.type = "relational_field_select";
            e.collection = e.name;
            if (e.collection === "employee") {
                e.isCombinedField = true;
                e.combinedFields = ["first_name", "middle_name", "last_name"];
                e.labelField = "first_name";
            } else {
                e.labelField = "name";
            }
            e.firstOption = `select ${e.name}`;
        }
        return e;
    });
    data = data.filter((e) => {
        if (e.name !== "tokenKey" && e.type !== "autodate" && e.name !== "id") {
            return e;
        }
    });

    if (route.params.id === "users") {
        data.splice(1, 0, {
            name: "passwordConfirm",
            label: "Password Confirm",
            type: "password",
            required: true,
            placeholder: "password confirm",
        });
    }
    return data;
}

async function handleSubmit(event) {
    event.preventDefault();
    const target = event.target;
    const form = new FormData(target);
    let formObject = Object.fromEntries(form.entries());
    formObject = genericTrimFormObject(formObject);
    try {
        const record = await client
            .collection(route.params.id)
            .create(formObject);
        console.log(record);
        Swal.fire({
            title: "Success!",
            text: "successfully create",
            icon: "success",
        });
        router.push(`/${props.parentRoute}/collection/${route.params.id}`);
    } catch (error) {
        if (error.data.data) {
            const errObject = {};
            Object.entries(error.data.data).forEach(([key, value]) => {
                errObject[key] = value.message;
            });
            formErrors.value = errObject;
        }
    }
}
</script>
<template>
    <BreadCrumb :links="breadCrumbLink" />
    <div v-if="loading" class="mt-4">
        <LoadingSkeleton />
    </div>
    <div v-if="post !== null">
        <div class="card mt-3">
            <div class="card-content">
                <form novalidate @submit="handleSubmit">
                    <legend class="has-text-weight-bold">
                        Add {{ snakeToProperCase(route.params.id) }}
                    </legend>
                    <div class="is-flex is-flex-direction-row-reverse">
                        <button class="button is-dark" type="submit">
                            Save
                        </button>
                    </div>
                    <div class="columns is-multiline">
                        <div
                            class="column"
                            :class="item.type === 'editor' ? 'is-12' : 'is-4'"
                            v-for="item in mappedFormList(post.fields)"
                        >
                            <RenderForms :form="item" :errors="formErrors" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div v-if="error !== null" class="mt-4">
        <p class="has-text-danger">{{ error }}</p>
    </div>
</template>
