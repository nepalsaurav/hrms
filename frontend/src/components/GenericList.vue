<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import { client } from "@/api/pocketbase";
import LoadingSkeleton from "./LoadingSkeleton.vue";
import { convertUtcToLocalDate } from "../utils";
import { convertCamelToProper } from "../utils";
import { useRouter, useRoute } from "vue-router";
import { watch, watchEffect } from "vue";
import { vInfiniteScroll } from "@vueuse/components";
import { faker } from "@faker-js/faker";

import Swal from "sweetalert2";
import Avatar from "./Avatar.vue";
const props = defineProps({
    schema: Object,
    expand: {
        type: String,
        default: "",
    },
    expandLabel: {
        type: String,
        default: "",
    },
});

const loading = ref(true);
const post = ref(null);
const error = ref(null);
const selected = ref([]);
const route = useRoute();
const router = useRouter();
const isPush = ref(false);
const recordItems = ref([]);
const page = ref(1);
const filter = ref("");
const sort = ref("-created");

async function fetchData(
    page = 1,
    sort = "-created",
    filter = "",
    isPush = false,
) {
    error.value = null;
    if (!isPush) {
        loading.value = true;
    }

    try {
        const collectionName = props.schema.name;
        const record = await client
            .collection(collectionName)
            .getList(page, 50, {
                sort: sort,
                filter: filter,
                expand: props.expand,
            });
        post.value = record;
        if (isPush) {
            recordItems.value.push(...record.items);
        } else {
            recordItems.value = record.items;
        }
    } catch (err) {
        error.value = err.data.message;
    } finally {
        if (!isPush) {
            loading.value = false;
        }
    }
}

function onLoadMore() {
    if (page.value < post.value.totalPages) {
        page.value += 1;
        isPush.value = true;
    }
}

onMounted(() => {
    // const batch = client.createBatch();
    // for (let i = 0; i < 200; i++) {
    //     const name = faker.person.lastName();
    //     batch.collection("department").create({
    //         name: name,
    //     });
    // }
    // batch.send();
    parseQuery(route.query);
});

watch(
    () => route.query,
    (newQuery, _) => {
        parseQuery(newQuery);
    },
    { immediate: true },
);

watchEffect(() => {
    fetchData(page.value, sort.value, filter.value, isPush.value);
});

function parseQuery(query) {
    if (query["filter"] !== undefined) {
        filter.value = query["filter"];
        page.value = 1;
        isPush.value = false;
    }
}

function hideCol(header) {
    if (!header.hidden && header.name != "id") {
        return true;
    } else {
        return false;
    }
}

function selectAll(event) {
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
        batch.collection(props.schema.name).delete(e.id);
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
        fetchData();
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

function editData(item) {
    router.push(`${route.path}/edit/${item.id}`);
}
</script>

<template>
    <div v-if="loading && post === null">
        <LoadingSkeleton />
    </div>
    <div v-if="post !== null">
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
        <div class="scroll-div" v-infinite-scroll="onLoadMore">
            <table
                class="table is-fullwidth is-striped"
                v-if="post.items.length > 0"
            >
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
                        <template
                            v-for="header in props.schema.fields"
                            :key="header.name"
                        >
                            <th v-if="hideCol(header)">
                                {{ convertCamelToProper(header.name) }}
                            </th>
                        </template>
                    </tr>
                </thead>

                <tbody>
                    <template v-for="item in recordItems">
                        <tr>
                            <td>
                                <input
                                    v-model="selected"
                                    :value="item"
                                    class="custom-checkbox"
                                    type="checkbox"
                                />
                            </td>
                            <template
                                v-for="(header, index) in props.schema.fields"
                            >
                                <td
                                    v-if="hideCol(header)"
                                    @click="editData(item)"
                                    class="edit-data"
                                >
                                    <span v-if="header.type === 'autodate'">
                                        {{
                                            convertUtcToLocalDate(
                                                item[header.name],
                                            )
                                        }}
                                    </span>
                                    <span v-else-if="header.type === 'bool'">
                                        <span
                                            class="tag"
                                            :class="
                                                item[header.name] === true
                                                    ? 'is-info'
                                                    : 'is-danger'
                                            "
                                        >
                                            {{ item[header.name] }}
                                        </span>
                                    </span>

                                    <span
                                        v-else-if="
                                            header.type === 'relation' &&
                                            props.expand !== '' &&
                                            props.expandLabel != ''
                                        "
                                    >
                                        {{
                                            item.expand[header.name][
                                                props.expandLabel
                                            ]
                                        }}
                                    </span>

                                    <!-- for avatar -->
                                    <span v-else-if="header.name === 'avatar'">
                                        <Avatar
                                            :filename="item[header.name]"
                                            :record="item"
                                            size="64x64"
                                        />
                                    </span>
                                    <!-- span -->
                                    <span v-else>
                                        {{ item[header.name] }}
                                    </span>
                                </td>
                            </template>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>

        <p class="mt-3 has-text-weight-bold" v-if="post.items.length === 0">
            no any data to show
        </p>
    </div>
    <div v-if="error !== null">
        <p class="has-text-danger">{{ error }}</p>
    </div>
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

.edit-data {
    cursor: pointer;
}
</style>
