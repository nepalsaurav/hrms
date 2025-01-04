<script setup>
import { watch } from "vue";
import { client } from "@/api/pocketbase";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { RouterLink } from "vue-router";
import LoadingSkeleton from "@/components/LoadingSkeleton.vue";
import GenericList from "@/components/GenericList.vue";
import BreadCrumb from "@/components/BreadCrumb.vue";
import { snakeToProperCase } from "@/utils";
import { watchEffect } from "vue";
import Filter from "@/components/Filter.vue";
import { makeTextSearchFields } from "./setting";

const loading = ref(false);
const post = ref(null);
const error = ref(null);
const route = useRoute();
const breadCrumbLink = ref([]);

const props = defineProps({
    parentRoute: String,
    label: String,
});

const filterList = ref([]);

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
            isActive: true,
        },
    ];
    breadCrumbLink.value = link;
});

watch(() => [route.params.id, route.query], fetchCollectioSchema, {
    immediate: true,
});

async function fetchCollectioSchema() {
    post.value = error.value = null;
    loading.value = true;
    try {
        const record = await client.send(
            `/api/get_collection/${route.params.id}`,
        );
        const searchFields = makeTextSearchFields(record.collection);
        console.log(searchFields);
        filterList.value = [
            {
                name: "text_search",
                label: "Search",
                type: "text_search",
                fields: searchFields,
                placeholder: "search",
            },
        ];
        filterList.value.fields = searchFields;
        post.value = record.collection;
    } catch (err) {
        error.value = "something bad occured";
    } finally {
        loading.value = false;
    }
}
</script>
<template>
    <BreadCrumb :links="breadCrumbLink" />
    <div v-if="loading" class="mt-4">
        <LoadingSkeleton />
    </div>
    <div v-if="post !== null">
        <div class="is-flex is-flex-direction-row-reverse">
            <RouterLink
                :to="`/${props.parentRoute}/collection/${route.params.id}/add`"
                class="button is-dark"
                ><i class="bi bi-plus-circle px-1"></i> Add
                {{ snakeToProperCase(route.params.id) }}</RouterLink
            >
        </div>
        <div class="card mt-3">
            <div class="card-content">
                <div class="mb-4">
                    <Filter :filter="filterList" />
                </div>
                <GenericList :schema="post" />
            </div>
        </div>
    </div>
    <div v-if="error !== null" class="mt-4">
        <p class="has-text-danger">{{ error }}</p>
    </div>
</template>
