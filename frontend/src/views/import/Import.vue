<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import BreadCrumb from "@/components/BreadCrumb.vue";
const importCollectionList = ref([
    {
        label: "Employee",
        value: "employee",
    },
    {
        label: "Attendance",
        value: "attendance",
    },
    {
        label: "Leave",
        value: "leave",
    },
]);
const formErrors = ref({});
const router = useRouter();

function handleSubmit(event) {
    formErrors.value = {};
    const form = new FormData(event.target);
    if (form.get("collection") === "") {
        formErrors.value.collection = "please select collection";
        return;
    }
    router.push(`/import/${form.get("collection")}?type=${form.get("type")}`);
}
</script>

<template>
    <div class="container">
        <BreadCrumb
            :links="[
                {
                    path: '/',
                    label: 'Dashboard',
                    isActive: false,
                },
                {
                    path: '/import',
                    label: 'Import',
                    isActive: true,
                },
            ]"
        />
        <div class="card">
            <div class="card-content">
                <p class="has-text-weight-bold">Import Collection</p>
                <hr />
                <form novalidate @submit.prevent="handleSubmit">
                    <div class="columns is-multiline">
                        <div class="column is-12">
                            <div class="select">
                                <select name="collection">
                                    <option value="">
                                        Select Collection To Import
                                    </option>
                                    <template
                                        v-for="item in importCollectionList"
                                    >
                                        <option :value="item.value">
                                            {{ item.label }}
                                        </option>
                                    </template>
                                </select>
                            </div>
                            <p
                                class="help is-danger"
                                v-if="formErrors.collection !== undefined"
                            >
                                {{ formErrors.collection }}
                            </p>

                            <div class="select ml-4">
                                <select name="type">
                                    <option value="new">New</option>
                                    <option value="update">Update</option>
                                </select>
                            </div>
                        </div>
                        <div class="is-12">
                            <button
                                class="button is-dark ml-3 mt-2"
                                type="submit"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
