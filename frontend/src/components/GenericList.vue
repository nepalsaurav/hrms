<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import { client } from "@/api/pocketbase";
import LoadingSkeleton from "./LoadingSkeleton.vue";
import { convertUtcToLocalDate } from "../utils";
import { convertCamelToProper } from "../utils";
import { useRouter, useRoute } from "vue-router";
import Swal from "sweetalert2";
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

console.log(props.expand.split(",").join(","), props.expandLabel);
const loading = ref(false);
const post = ref(null);
const error = ref(null);
const selected = ref([]);
const route = useRoute();
const router = useRouter();

async function fetchData(
    page = 1,
    page_size = 50,
    sort = "-created",
    filter = "",
) {
    post.value = error.value = null;
    loading.value = true;
    try {
        const collectionName = props.schema.name;
        const record = await client
            .collection(collectionName)
            .getList(page, page_size, {
                sort: sort,
                filter: filter,
                expand: props.expand,
            });
        post.value = record;
        console.log(props.schema.fields);
    } catch (err) {
        error.value = err.data.message;
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    fetchData();
});

function hideCol(header) {
    // if (route.params.id === "users") {
    //     if (!header.hidden) {
    //         return true;
    //     }
    // }
    if (!header.hidden && header.name != "id") {
        return true;
    } else {
        return false;
    }
}

function selectAll(event) {
    const selectElement = event.target;
    if (selectElement.checked) {
        selected.value = post.value.items;
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
    <div v-if="loading">
        <LoadingSkeleton />
    </div>
    <div v-if="post !== null">
        <!-- action tab -->
        <div class="box" v-if="selected.length > 0">
            <div class="is-flex">
                <p class="has-text-weight-bold">
                    {{ selected.length }} selected out of
                    {{ post.items.length }}
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
            v-if="post.items.length > 0"
        >
            <thead>
                <tr>
                    <th>
                        <input
                            class="custom-checkbox"
                            @click="selectAll"
                            type="checkbox"
                            :checked="selected.length === post.items.length"
                            :indeterminate="
                                selected.length > 0 &&
                                selected.length < post.items.length
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
                <template v-for="item in post.items">
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
                                        convertUtcToLocalDate(item[header.name])
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
                                <span v-else>
                                    {{ item[header.name] }}
                                </span>
                            </td>
                        </template>
                    </tr>
                </template>
            </tbody>
        </table>

        <p class="mt-3 has-text-weight-bold" v-if="post.items.length === 0">
            no any data to show
        </p>
    </div>
    <div v-if="error !== null">
        <p class="has-text-danger">{{ error }}</p>
    </div>
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

.edit-data {
    cursor: pointer;
}
</style>
