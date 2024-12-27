<script setup>
import { client } from "@/api/pocketbase";
import { ref } from "vue";
import { onMounted, watchEffect, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import LoadingSkeleton from "./LoadingSkeleton.vue";
import Filter from "./Filter.vue";
import Pagination from "./Pagination.vue";
import Swal from "sweetalert2";
import { RouterLink } from "vue-router";

const router = useRouter();
const route = useRoute();
const loading = ref(true);
const error = ref(null);
const listData = ref(null);
const page = ref(1);
const sort = ref("-created");
const filter = ref("");
const perPage = ref(10);
const selected = ref([]);
const props = defineProps({
    listHeader: Array,
    collection: String,
    filter: Array,
    detailViewLink: String,
    routeBack: {
        type: String,
    },
});

async function fetchData(
    page,
    page_size = "10",
    sort = "-created",
    filter = "",
) {
    loading.value = true;
    try {
        const record = await client
            .collection(props.collection)
            .getList(page, page_size, {
                filter: filter,
                sort: sort,
            });
        loading.value = false;
        listData.value = record;
        // console.log(record);
    } catch (error) {
        loading.value = false;
        error.value = error.data.message;
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

function parseQuery(query) {
    if (query["perPage"] !== undefined) {
        perPage.value = parseInt(query["perPage"]);
    }
    if (query["page"] !== undefined) {
        page.value = parseInt(query["page"]);
    }
    if (query["filter"] !== undefined) {
        filter.value = query["filter"];
    }
    if (query["reset"] !== undefined) {
        router.push(route.path);
        fetchData(1);
    }
}

watchEffect(() => {
    fetchData(page.value, perPage.value, sort.value, filter.value);
});

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
    const selectElement = event.target;
    if (selectElement.checked) {
        selected.value = listData.value.items;
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
        fetchData(page.value, perPage.value, sort.value, filter.value);
        selected.value = [];
        Swal.close();
    } catch (error) {
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
    <div v-if="!loading && error === null && listData">
        <!-- filter tab -->
        <div class="box">
            <Filter :filter="props.filter" :routeBack="props.routeBack" />
        </div>
        <!-- filter tab -->
        <!-- action tab -->
        <div class="box" v-if="selected.length > 0">
            <div class="is-flex">
                <p class="has-text-weight-bold">
                    {{ selected.length }} selected out of
                    {{ listData.items.length }}
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
        <table
            class="table is-fullwidth is-striped"
            v-if="listData.items.length > 0"
        >
            <thead>
                <tr>
                    <th>
                        <input
                            class="custom-checkbox"
                            @click="selectAll"
                            type="checkbox"
                            :checked="selected.length === listData.items.length"
                            :indeterminate="
                                selected.length > 0 &&
                                selected.length < listData.items.length
                            "
                        />
                    </th>
                    <th v-for="item in props.listHeader">
                        {{ item.label }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in listData.items" :key="item.id">
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
                            {{ renderCombineField(item, header.combinedField) }}
                        </span>
                        <!-- render combine field  -->

                        <!-- render date -->
                        <span v-if="header.type === 'date'">
                            {{ item[header.name].split(" ")[0] }}
                        </span>
                        <!-- render date -->

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
                    <!-- <td>1</td>
                    <td>{{ item.first_name }}</td> -->
                </tr>
            </tbody>
        </table>

        <div class="is-flex" v-if="listData.items.length > 0">
            <div>
                <p class="has-text-weight-bold">
                    page {{ listData.page }} of {{ listData.totalPages }} [total
                    items: {{ listData.totalItems }}]
                </p>
            </div>
            <p class="ml-4">per page:</p>
            <div class="select is-small ml-1" @change="changePerPage">
                <select>
                    <option
                        v-for="item in Array.from(['1', '5', '10', '20', '50'])"
                        :value="item"
                        :selected="String(perPage) === item"
                    >
                        {{ item }}
                    </option>
                </select>
            </div>
            <div style="margin-left: 300px" v-if="listData.totalPages > 1">
                <Pagination
                    :pageInfo="{
                        page: listData.page,
                        perPage: listData.perPage,
                        totalItems: listData.totalItems,
                        totalPages: listData.totalPages,
                    }"
                />
            </div>
        </div>
    </div>

    <div v-if="!loading && error === null && listData" class="mt-4">
        <p v-if="listData.items.length === 0" class="has-text-weight-bold">
            no any data to show
        </p>
    </div>

    <p class="has-text-danger" v-if="error !== null">{{ error }}</p>
</template>

<style scoped>
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
