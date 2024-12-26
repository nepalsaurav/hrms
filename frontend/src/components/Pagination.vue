<script setup>
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const props = defineProps({
    pageInfo: Object,
});
function changePage(page) {
    const query_obj = {};
    query_obj["page"] = page;
    router.push({
        path: "/employee",
        query: {
            ...route.query,
            ...query_obj,
        },
    });
}
</script>

<template>
    <nav class="pagination is-rounded is-small">
        <button
            href="#"
            class="button is-dark is-small"
            @click="changePage(props.pageInfo.page - 1)"
            :disabled="props.pageInfo.page === 1"
        >
            Previous
        </button>
        <button class="button is-small ml-2">{{ props.pageInfo.page }}</button>
        <button
            href="#"
            class="button is-dark is-small ml-2"
            @click="changePage(props.pageInfo.page + 1)"
            :disabled="props.pageInfo.page === props.pageInfo.totalPages"
        >
            Next page
        </button>
    </nav>
</template>
