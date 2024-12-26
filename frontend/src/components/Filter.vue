<script setup>
// import RelationalFieldSelect from "./RelationalFieldSelect.vue";
import DynamicSelect from "./DynamicSelect.vue";
import { trimFormObject } from "@/views/employee/forms";
import { useRouter, useRoute } from "vue-router";
const props = defineProps({
    filter: Array,
});

const router = useRouter();
const route = useRoute();

console.log(props.filter);

function getCombineField() {
    const items = props.filter.filter((e) => e.name === "text_search");
    return items[0].fields;
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
            filter.push(`${key}?~'${value}'`);
        }
    }
    const filter_string = filter.join("||");
    query_obj["filter"] = filter_string;
    router.push({
        path: "/employee",
        query: query_obj,
    });
}

function resetForm() {
    router.push("/employee?reset=1");
}
</script>
<template>
    <form novalidate @submit="handleSumbit">
        <div class="columns is-multiline">
            <div class="column is-2" v-for="item in props.filter">
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
