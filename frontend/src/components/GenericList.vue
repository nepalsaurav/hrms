<script setup>
import { ref, onMounted, watch } from "vue";
import { client } from "@/api/pocketbase";
import LoadingSkeleton from "./LoadingSkeleton.vue";
import { convertUtcToLocalDate, snakeToProperCase } from "../utils";
import { useRouter, useRoute } from "vue-router";
import { vInfiniteScroll } from "@vueuse/components";
import Status from "./Status.vue";
import Swal from "sweetalert2";
import Avatar from "./Avatar.vue";

// Props
const props = defineProps({
    schema: Object,
    expand: { type: String, default: "" },
    expandLabel: { type: String, default: "" },
});

// Reactive variables
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

// Labels for expanded fields
const expandLabel = { employee: "full_name", company: "name" };

// Destructure schema fields for easier access
const { name, fields } = props.schema;


async function fetchData(page = 1, sort = "-created", filter = "", isPush = false) {
    error.value = null;
    if (!isPush) loading.value = true;

    try {
        const expand = fields.filter(e => e.type === "relation").map(e => e.name).join(",");
        const record = await client.collection(name).getList(page, 50, {
            sort, filter, expand
        });
        post.value = record;
        recordItems.value = isPush ? [...recordItems.value, ...record.items] : record.items;
    } catch (err) {
        error.value = err.data.message;
    } finally {
        if (!isPush) loading.value = false;
    }
}

function onLoadMore() {
    if (page.value < post.value.totalPages) {
        page.value += 1;
        isPush.value = true;
    }
}

onMounted(() => parseQuery(route.query));

watch(
    () => route.query,
    (newQuery) => parseQuery(newQuery),
    { immediate: true }
);

watch(() => [page.value, sort.value, filter.value], () => fetchData(page.value, sort.value, filter.value, isPush.value), { immediate: true });

function parseQuery(query) {
    if (query["filter"] !== undefined) {
        filter.value = query["filter"];
        page.value = 1;
        isPush.value = false;
    }
}

function hideCol(header) {
    const hiddenFields = ["id", "created", "updated", "address"];
    return !header.hidden && !hiddenFields.includes(header.name);
}

function selectAll(event) {
    selected.value = event.target.checked ? [...recordItems.value] : [];
}

async function deleteData() {
    const confirm = await Swal.fire({
        title: "Are you sure want to delete?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#171717",
        cancelButtonColor: "#808080",
        confirmButtonText: "Yes, delete it!"
    });
    if (!confirm.isConfirmed || selected.value.length === 0) return;

    const batch = client.createBatch();
    selected.value.forEach(item => batch.collection(name).delete(item.id));

    const loading = Swal.fire({
        title: "Data is deleting ...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
    });

    try {
        await batch.send();
        fetchData();
        selected.value = [];
        Swal.close();
    } catch (err) {
        Swal.close();
        Swal.fire({ title: "Error!", text: err.data.message, icon: "error" });
        selected.value = [];
    }
}

function editData(item) {
    router.push(`${route.path}/edit/${item.id}`);
}
</script>

<template>
    <div v-if="loading && !post">
        <LoadingSkeleton />
    </div>

    <div v-if="post">
        <div class="box" v-if="selected.length > 0">
            <div class="is-flex">
                <p class="has-text-weight-bold">
                    {{ selected.length }} selected out of {{ recordItems.length }}
                </p>
                <button class="button is-danger is-small ml-4" @click="deleteData">
                    <i class="bi bi-archive pr-1"></i> Delete
                </button>
            </div>
        </div>

        <div v-infinite-scroll="onLoadMore" class="scroll-div" v-if="post.items.length > 0">
            <p class="has-text-grey">Total Items: {{ post.totalItems }}</p>
            <table class="table is-fullwidth is-striped">
                <thead>
                    <tr>
                        <th>
                            <input class="custom-checkbox" type="checkbox" @click="selectAll"
                                :checked="selected.length === recordItems.length"
                                :indeterminate="selected.length > 0 && selected.length < recordItems.length" />
                        </th>
                        <template v-for="header in fields">
                            <th v-if="hideCol(header)" :key="header.name">
                                {{ snakeToProperCase(header.name) }}
                            </th>
                        </template>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="item in recordItems" :key="item.id">
                        <td><input v-model="selected" :value="item" class="custom-checkbox" type="checkbox" /></td>
                        <template v-for="header in fields">
                            <td v-if="hideCol(header)" @click="editData(item)" class="edit-data" :key="header.name">
                                <span v-if="header.type === 'autodate'">{{ convertUtcToLocalDate(item[header.name])
                                    }}</span>
                                <span v-else-if="header.type === 'bool'">
                                    <span class="tag" :class="item[header.name] ? 'is-info' : 'is-danger'">
                                        {{ item[header.name] }}
                                    </span>
                                </span>
                                <span v-else-if="header.type === 'relation'">
                                    {{ item.expand[header.name]?.[expandLabel[header.name]] }}
                                </span>
                                <span v-else-if="['avatar', 'logo'].includes(header.name)">
                                    <Avatar :filename="item[header.name]" :record="item" size="64x64" />
                                </span>
                                <span v-else-if="header.type === 'date'">{{ item[header.name].split(" ")[0] }}</span>
                                <span v-else-if="header.name === 'status'">
                                    <Status :item="item" :header="header" />
                                </span>
                                <span v-else>{{ item[header.name] }}</span>
                            </td>
                        </template>
                    </tr>
                </tbody>
            </table>
        </div>

        <p class="mt-3 has-text-weight-bold" v-if="post.items.length === 0">No data to show</p>
    </div>

    <div v-if="error">
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
