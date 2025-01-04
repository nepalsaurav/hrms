<script setup>
import BreadCrumb from "@/components/BreadCrumb.vue";
import { useRoute } from "vue-router";
import { client } from "@/api/pocketbase";
import { ref, watch } from "vue";
import LoadingSkeleton from "@/components/LoadingSkeleton.vue";
import { createSample } from "./sample";

const route = useRoute();
const loading = ref(false);
const schema = ref(null);
const error = ref(null);
const disabledGetSample = ref(false);

async function fetchData() {
    schema.value = error.value = null;
    loading.value = true;
    try {
        const records = await client.send(
            `/api/get_collection/${route.params.collection}`,
        );
        schema.value = records.collection;
        console.log(records.collection);
    } catch (err) {
        error.value = err.data.message;
    } finally {
        loading.value = false;
    }
}

watch([route.params, route.query], fetchData, { immediate: true });

async function getSampleFile() {
    disabledGetSample.value = true;
    await createSample(schema.value, route.query.type);
    disabledGetSample.value = false;
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
                    isActive: false,
                },
                {
                    path: `/import/${route.params.collection}`,
                    label: route.params.collection,
                    isActive: true,
                },
            ]"
        />

        <LoadingSkeleton v-if="loading" />
        <div class="main" v-if="schema !== null">
            <div class="card">
                <div class="card-content">
                    <button
                        class="button has-text-link"
                        @click.prevent="getSampleFile"
                        :disabled="disabledGetSample"
                    >
                        get sample file <i class="bi bi-arrow-right ml-2"></i>
                    </button>

                    <form class="mt-3">
                        <fieldset>
                            <div class="file has-name is-info">
                                <label class="file-label">
                                    <input
                                        class="file-input"
                                        type="file"
                                        name="resume"
                                    />
                                    <span class="file-cta">
                                        <span class="file-icon">
                                            <i class="fas fa-upload"></i>
                                        </span>
                                        <span class="file-label"
                                            >Choose a file…</span
                                        >
                                    </span>
                                    <span class="file-name"
                                        >No file uploaded</span
                                    >
                                </label>
                            </div>

                            <button class="mt-2 button is-dark ml-3">
                                Import
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
        <p class="has-text-danger" v-if="error !== null">{{ error }}</p>
    </div>
</template>
