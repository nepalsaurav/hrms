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
import { useVueToPrint } from "vue-to-print";

const props = defineProps({
    collection: String,
    breadcrumb: Object,
    breadcrumbLabel: String,
    viewList: Object,
    expand: {
        type: String,
        default: "",
    },
});

const loading = ref(false);
const data = ref(null);
const error = ref(null);
const breadCrumbLink = ref(null);
const route = useRoute();
const componentRef = ref()

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
            .getOne(route.params.id, {
                expand: props.expand,
            });

        if (props.breadcrumbLabel !== undefined) {
            breadCrumbLink.value.push({
                label: record[props.breadcrumbLabel],
                path: `/${route.path}/${record.id}`,
                isActive: true,
            });
        }

        data.value = record;
        console.log(record);
    } catch (error) {
        error.value = error.data.message;
    } finally {
        loading.value = false;
    }
}


const { handlePrint } = useVueToPrint({
  content: componentRef,
  documentTitle: "detail view",
});
</script>

<template>
    <BreadCrumb v-if="breadCrumbLink" :links="breadCrumbLink" />
    <!-- for loading conditiom -->
    <LoadingSkeleton v-if="loading" />
    <!-- for loading conditiom -->
    <div v-if="data != null">
        <div class="is-flex is-flex-direction-row-reverse mb-4">
            <button class="button is-secondary" @click="handlePrint">
                <i class="bi bi-printer"></i>
            </button>
        </div>

        <!-- main content -->
        <div ref="componentRef">
            <template v-for="item in viewList">
                <div class="pl-6" v-if="item.type === 'profile_photo'">
                    <Avatar
                        :filename="data[item.name]"
                        :record="data"
                        size="128x128"
                    />
                </div>
            </template>
        
                <div class="section">
                    <!-- tabular content -->
                    <div class="columns is-multiline">
                        <template v-for="item in viewList">
                            <template v-if="item.type === 'text'">
                                <div class="column is-4">
                                    <p class="mb-2">{{ item.label }}</p>
                                    <input
                                        type="text"
                                        class="input"
                                        :value="data[item.name]"
                                        readonly
                                        disabled
                                    />
                                </div>
                            </template>

                            <template v-if="item.type === 'date'">
                                <div class="column is-4">
                                    <p class="mb-2">{{ item.label }}</p>
                                    <input
                                        type="text"
                                        class="input"
                                        :value="data[item.name].split(' ')[0]"
                                        readonly
                                        disabled
                                    />
                                </div>
                            </template>

                            <template v-if="item.type === 'text_component'">
                                <div class="column is-4">
                                    <p class="mb-2">{{ item.label }}</p>
                                    <component
                                        :is="item.component"
                                        :item="data"
                                        :header="item"
                                    />
                                </div>
                            </template>
                        </template>
                    </div>

                    <!-- tabular content -->
                    <template v-for="item in viewList">
                        <template
                            v-if="
                                item.type === 'rich_text' &&
                                data[item.name] !== ''
                            "
                        >
                            <p class="mb-2">{{ item.label }}</p>
                            <div
                                class="box"
                                style="width: 60rem"
                                v-html="data[item.name]"
                            />
                        </template>
                    </template>
                </div>
           
        </div>
    </div>
</template>

<style scoped></style>
