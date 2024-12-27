<script setup>
import { ref } from "vue";
import RenderForms from "./RenderForms.vue";
const props = defineProps({
    formList: Array,
    legend: String,
});
const formErrors = ref({});
</script>
<template>
    <div class="card">
        <div class="card-content">
            <form novalidate>
                <legend class="has-text-weight-bold">{{ props.legend }}</legend>
                <div class="is-flex is-flex-direction-row-reverse">
                    <button class="button is-dark" type="submit">Save</button>
                </div>
                <div class="columns is-multiline">
                    <div
                        class="column"
                        :class="item.size"
                        v-for="item in props.formList"
                    >
                        <RenderForms :form="item" :errors="formErrors" />
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
