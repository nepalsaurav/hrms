<script setup>
import { client } from "@/api/pocketbase";
import { ref } from "vue";
import { onMounted, watchEffect, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { computed } from "vue";
import LoadingSkeleton from "./LoadingSkeleton.vue";
import Filter from "./Filter.vue";
import Swal from "sweetalert2";
import { RouterLink } from "vue-router";
import { vInfiniteScroll } from "@vueuse/components";
const router = useRouter();
const route = useRoute();
const loading = ref(true);
const error = ref(null);
const listData = ref(null);
const page = ref(1);
const sort = ref("-created");
const filter = ref("");
const selected = ref([]);
const isPush = ref(false);
const recordItems = ref([]);

const props = defineProps({
    listHeader: Array,
    collection: String,
    filter: Array,
    detailViewLink: String,
    routeBack: {
        type: String,
    },
    expand: {
        type: String,
        default: "",
    },
});

async function fetchData(page, sort = "-created", filter = "", isPush = false) {
    if (!isPush) {
        loading.value = true;
    }
    try {
        const record = await client
            .collection(props.collection)
            .getList(page, 5, {
                filter: filter,
                sort: sort,
                expand: props.expand,
            });
        listData.value = record;
        if (isPush) {
            recordItems.value.push(...record.items);
        } else {
            recordItems.value = record.items;
            loading.value = false;
        }
    } catch (error) {
        if (!isPush) {
            recordItems.value = [];
            listData.value = null;
        }
        loading.value = false;
    }
}

onMounted(() => {
    parseQuery(route.query);
});

watch(
    () => route.query,
    (newId, _) => {
        parseQuery(newId);
    },
);

watchEffect(() => {
    fetchData(page.value, sort.value, filter.value, isPush.value);
});

function onLoadMore() {
    if (page.value < listData.value.totalPages) {
        page.value += 1;
        isPush.value = true;
    }
}
function parseQuery(query) {
    if (query["filter"] !== undefined) {
        filter.value = query["filter"];
        page.value = 1;
        isPush.value = false;
    }
}

function resetList() {
    recordItems.value = [];
    page.value = 1;
    filter.value = "";
    isPush.value = false;
}

function renderCombineField(item, fields) {
    let texts = [];
    for (let i = 0; i < fields.length; i++) {
        if (item[fields[i]] !== "") {
            texts.push(item[fields[i]]);
        }
    }
    return texts.join(" ");
}

function calculateSerialNumber(index) {
    const page = listData.value.page;
    const perPage = listData.value.perPage;
    const sn = (page - 1) * perPage + (index + 1);
    return sn;
}

function changePerPage(event) {
    const selectElement = event.target;
    const selectedValues = Array.from(selectElement.selectedOptions).map(
        (option) => option.value,
    )[0];
    if (selectedValues === "per page") {
        return;
    }

    const query_obj = {};
    query_obj["perPage"] = selectedValues;
    router.push({
        path: props.routeBack,
        query: query_obj,
    });
}

function selectAll(event) {
    console.log("select all trigger");
    const selectElement = event.target;
    if (selectElement.checked) {
        selected.value = recordItems.value;
    } else {
        selected.value = [];
    }
}

async function deleteData() {
    const confirm = await Swal.fire({
        title: "Are you sure want to delete?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#171717",
        cancelButtonColor: "#808080",
        confirmButtonText: "Yes, delete it!",
    });
    if (!confirm.isConfirmed) return;
    if (selected.value.length === 0) return;
    const batch = client.createBatch();
    selected.value.forEach((e, index) => {
        batch.collection(props.collection).delete(e.id);
    });
    const loading = Swal.fire({
        title: "Data is deleting ...",
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        },
    });
    try {
        await batch.send();
        fetchData(page.value, sort.value, filter.value);
        selected.value = [];
        Swal.close();
    } catch (error) {
        console.log(error);
        Swal.close();
        Swal.fire({
            title: "Error!",
            text: error.data.message,
            icon: "error",
        });
        selected.value = [];
    }
}

function detailViewClick(item) {
    router.push(`${props.detailViewLink}/${item.id}`);
}
</script>

<template>
    <LoadingSkeleton v-if="loading" />

    <div v-if="!loading && listData">
        <!-- filter tab -->
        <div class="box">
            <Filter
                :filter="props.filter"
                :routeBack="props.routeBack"
                :resetList="resetList"
            />
        </div>

        <!-- filter tab -->
        <!-- action tab -->
        <div class="box" v-if="selected.length > 0">
            <div class="is-flex">
                <p class="has-text-weight-bold">
                    {{ selected.length }} selected out of
                    {{ recordItems.length }}
                </p>

                <button
                    class="button is-danger is-small ml-4"
                    @click="deleteData"
                >
                    <i class="bi bi-archive pr-1"></i>
                    Delete
                </button>
            </div>
        </div>

        <!-- action tab -->
        <div
            v-infinite-scroll="onLoadMore"
            class="scroll-div"
            v-if="recordItems.length > 0"
        >
            <p class="has-text-grey">Total Items: {{ listData.totalItems }}</p>
            <table class="table is-fullwidth is-striped">
                <thead>
                    <tr>
                        <th>
                            <input
                                class="custom-checkbox"
                                @click="selectAll"
                                type="checkbox"
                                :checked="
                                    selected.length === recordItems.length
                                "
                                :indeterminate="
                                    selected.length > 0 &&
                                    selected.length < recordItems.length
                                "
                            />
                        </th>
                        <th v-for="item in props.listHeader">
                            {{ item.label }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in recordItems" :key="item.id">
                        <td>
                            <input
                                v-model="selected"
                                :value="item"
                                class="custom-checkbox"
                                type="checkbox"
                            />
                        </td>

                        <td
                            v-for="header in props.listHeader"
                            :class="{ 'text-link': header.link }"
                            @click="header.link && detailViewClick(item)"
                        >
                            <!-- render serial number -->
                            <span v-if="header.type === 'serial_number'">
                                {{ calculateSerialNumber(index) }}
                            </span>
                            <!-- render serial number -->

                            <!-- render simple text -->
                            <span v-if="header.type === 'text'">
                                {{ item[header.name] }}
                            </span>
                            <!-- render simple text -->

                            <!-- render combine field  -->
                            <span v-if="header.type === 'combined'">
                                {{
                                    renderCombineField(
                                        item,
                                        header.combinedField,
                                    )
                                }}
                            </span>
                            <!-- render combine field  -->

                            <!-- render date -->
                            <span v-if="header.type === 'date'">
                                {{ item[header.name].split(" ")[0] }}
                            </span>
                            <!-- render date -->

                            <!-- expand -->
                            <tempalte v-if="header.type === 'expand'">
                                <span v-if="header.isCombinedField">
                                    {{
                                        renderCombineField(
                                            item.expand[
                                                header.expandCollection
                                            ],
                                            header.fields,
                                        )
                                    }}
                                </span>
                            </tempalte>

                            <!-- render action -->
                            <span v-if="header.type === 'action'">
                                <RouterLink
                                    class="button is-dark"
                                    style="width: 10px; height: 20px"
                                    :to="`/employee/edit/${item.id}`"
                                    ><i
                                        class="bi bi-pencil"
                                        style="font-size: 10px"
                                    ></i
                                ></RouterLink>
                            </span>
                            <!-- render action -->
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div v-if="!loading && error === null" class="mt-4">
        <p v-if="recordItems.length === 0" class="has-text-weight-bold">
            no any data to show
        </p>
    </div>

    <p class="has-text-danger" v-if="error !== null">
        {{ error }}
    </p>
</template>

<style scoped>
.scroll-div {
    height: 350px;
    overflow-y: scroll;
}
.custom-checkbox {
    transform: scale(1.2);
}

.custom-checkbox:checked {
    accent-color: var(--bulma-dark);
}

.custom-checkbox:indeterminate {
    accent-color: var(--bulma-dark);
}

.text-link {
    color: var(--bulma-dark);
    cursor: pointer;
}
.text-link:hover {
    text-decoration: underline;
}
</style>
