<script setup>
import BreadCrumb from "@/components/BreadCrumb.vue";
import { formDetails } from "./forms";
import RenderForms from "@/components/RenderForms.vue";
import { ref } from "vue";

const formErrors = ref({});
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
                label: 'Add',
                path: '/leave/add',
                isActive: true,
            },
        ]"
    />

    <div class="card">
        <div class="card-content">
            <form novalidate>
                <legend class="has-text-weight-bold">Add Employee</legend>
                <div class="is-flex is-flex-direction-row-reverse">
                    <button class="button is-dark" type="submit">Save</button>
                </div>
                <div class="columns is-multiline">
                    <div class="column is-4" v-for="item in formDetails">
                        <RenderForms :form="item" :errors="formErrors" />
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
