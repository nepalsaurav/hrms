<script setup>
// import RelationalFieldSelect from "./RelationalFieldSelect.vue";
import DynamicSelect from "./DynamicSelect.vue";
import { trimFormObject } from "@/views/employee/forms";
import { useRouter, useRoute } from "vue-router";
const props = defineProps({
    filter: Array,
    routeBack: {
        type: String,
        default: "/employee",
    },
    resetList: {
        type: Function,
        default: null,
    },
    filterFuntion: Function
});

const router = useRouter();
const route = useRoute();

function getCombineField() {
    const items = props.filter.filter((e) => e.name === "text_search");
    return items[0].fields;
}

function getItemByKey(key, array) {
    const items = array.filter((e) => e.name === key);
    return items[0];
}

async function handleSumbit(event) {
    event.preventDefault();
    const target = event.target;
    const form = new FormData(target);
    let formObject = Object.fromEntries(form.entries());
    formObject = trimFormObject(formObject);
    if (Object.keys(formObject).length === 0) {
        return;
    }
    const filter = [];
    const query_obj = {};
    if (formObject["text_search"] !== undefined) {
        const val = formObject["text_search"];
        query_obj["text_search"] = val;
        const combineFields = getCombineField();

        combineFields.forEach((e) => {
            filter.push(`${e}~'${val}'`);
        });
    }
    for (const [key, value] of Object.entries(formObject)) {
        if (key != "text_search" && value != "") {
            query_obj[key] = value;
            const item = getItemByKey(key, props.filter);
            if (item.type === "select") {
                filter.push(`${key}="${value}"`);
            } else {
                filter.push(`${key}?~"${value}"`);
            }
        }
    }
    const filter_string = filter.join("||");
    query_obj["filter"] = filter_string;
    router.push({
        path: route.path,
        query: query_obj,
    });
}

function resetForm() {
    router.push(route.path);
    if (props.resetList !== null) {
        props.resetList();
    }
}
</script>
<template>
    <form novalidate @submit="handleSumbit">
        <div class="columns is-multiline">
            <div
                class="column"
                v-for="item in props.filter"
                :class="props.filter.length === 1 ? 'is-6' : 'is-3'"
            >
                <!-- render text search -->
                <div class="field" v-if="item.type === 'text_search'">
                    <label class="label" :for="item.name">
                        <small> {{ item.label }}</small></label
                    >
                    <div class="control">
                        <input
                            :id="item.name"
                            class="input is-small"
                            :name="item.name"
                            :value="route.query.text_search"
                            type="text"
                            :placeholder="item.placeholder"
                        />
                    </div>
                </div>
                <!-- render text search -->

                <!-- render select -->
                <!-- select -->
                <div class="field" v-if="item.type === 'select'">
                    <label class="label" :for="item.name">
                        <small> {{ item.label }}</small></label
                    >
                    <div class="control">
                        <div class="select is-small" style="width: 100%">
                            <select
                                :name="item.name"
                                :id="item.name"
                                style="width: 100%"
                            >
                                <option
                                    v-for="option in item.options"
                                    :value="option.value"
                                    :selected="
                                        option.value === route.query[item.name]
                                    "
                                >
                                    {{ option.label }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- select -->
                <!-- render select -->

                <!-- relational field options -->

                <DynamicSelect
                    v-if="item.type === 'relational_field_select'"
                    :item="item"
                />

                <!-- relational field options -->
            </div>

            <div class="column is-12">
                <div class="field">
                    <div class="control">
                        <button class="button is-dark is-small" type="submit">
                            <i class="bi bi-search pr-1"></i>
                            Search
                        </button>
                        <button
                            class="button is-secondary ml-2 is-small"
                            @click="resetForm"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>
