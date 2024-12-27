<script setup>
import { ref } from "vue";
import BreadCrumb from "./BreadCrumb.vue";
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { client } from "@/api/pocketbase";
import LoadingSkeleton from "./LoadingSkeleton.vue";
import { setPrintContent } from "@/stores/print";
import { url } from "@/api/config";

const props = defineProps({
    collection: String,
    breadcrumb: Object,
    breadcrumbLabel: String,
    viewList: Object,
});

const loading = ref(false);
const data = ref(null);
const error = ref(null);
const breadCrumbLink = ref(null);
const route = useRoute();

onMounted(() => {
    breadCrumbLink.value = props.breadcrumb;
});

watch(() => route.params.id, fetchData, { immediate: true });

async function fetchData(id) {
    error.value = null;
    data.value = null;
    loading.value = true;
    try {
        const record = await client
            .collection(props.collection)
            .getOne(route.params.id);
        breadCrumbLink.value.push({
            label: record[props.breadcrumbLabel],
            path: `/employee/view/${record.id}`,
            isActive: true,
        });
        data.value = record;
        console.log(record);
    } catch (error) {
        error.value = error.data.message;
    } finally {
        loading.value = false;
    }
}

function printDocument() {
    var content = document.getElementById("contentToPrint").outerHTML;
    setPrintContent(content);
    window.open(`${url}/#print`, "_blank", "width=800,height=600");
}
</script>

<template>
    <BreadCrumb v-if="breadCrumbLink" :links="breadCrumbLink" />
    <!-- for loading conditiom -->
    <LoadingSkeleton v-if="loading" />
    <!-- for loading conditiom -->
    <div v-if="data != null">
        <div class="is-flex is-flex-direction-row-reverse mb-4">
            <button class="button is-secondary" @click="printDocument">
                <i class="bi bi-printer"></i>
            </button>
        </div>

        <div class="card" id="contentToPrint">
            <div class="card-content">
                <div class="columns is-multiline">
                    <div
                        class="column"
                        v-for="item in viewList"
                        :class="item.type === 'rich_text' ? 'is-12' : 'is-6'"
                    >
                        <div class="field is-grouped">
                            <div class="control">
                                <p class="has-text-grey">{{ item.label }}:</p>
                            </div>
                            <div class="control">
                                <p v-if="item.type === 'text'">
                                    {{ data[item.name] }}
                                </p>

                                <p v-if="item.type === 'date'">
                                    {{ data[item.name].split(" ")[0] }}
                                </p>

                                <div v-if="item.type === 'textarea'">
                                    {{ data[item.name] }}
                                </div>

                                <div
                                    class="box"
                                    style="width: 60rem"
                                    v-if="item.type === 'rich_text'"
                                    v-html="data[item.name]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
