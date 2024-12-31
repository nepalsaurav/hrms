<script setup>
import { ref } from "vue";
import BreadCrumb from "./BreadCrumb.vue";
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { client } from "@/api/pocketbase";
import LoadingSkeleton from "./LoadingSkeleton.vue";
import { setPrintContent } from "@/stores/print";
import { url } from "@/api/config";
import Avatar from "./Avatar.vue";

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

        <!-- main content -->
        <div id="contentToPrint">
            <template v-for="item in viewList">
                <div class="pl-6" v-if="item.type === 'profile_photo'">
                    <Avatar
                        :filename="data[item.name]"
                        :record="data"
                        size="128x128"
                    />
                </div>
            </template>
            <div class="card mt-4">
                <div class="card-content">
                    <!-- tabular content -->
                    <div class="columns is-multiline">
                        <table class="table is-bordered">
                            <tbody>
                                <tr v-for="item in viewList">
                                    <template v-if="item.type === 'text'">
                                        <td>{{ item.label }}</td>
                                        <td>
                                            <input
                                                type="text"
                                                class="input"
                                                :value="data[item.name]"
                                                readonly
                                                disabled
                                            />
                                        </td>
                                    </template>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- tabular content -->
                    <template v-for="item in viewList">
                        <div
                            class="box"
                            style="width: 60rem"
                            v-if="item.type === 'rich_text'"
                            v-html="data[item.name]"
                        />
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
