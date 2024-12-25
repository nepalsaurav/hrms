<script setup>
import { ref } from "vue";
import { onMounted } from "vue";
import { client } from "@/api/pocketbase";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
const options = ref([]);
const selected = ref("");
const props = defineProps({
    name: String,
    collection: String,
    labelField: String,
    firstOption: String,
});

onMounted(async () => {
    // const div = vselect.value.querySelector("#vs2__combobox");
    try {
        const records = await client
            .collection(props.collection)
            .getFullList({});
        options.value = records;
    } catch {
        error.value = true;
    }
});

function setSelected(value) {
    selected.value = value.id;
}
</script>

<template>
    <div style="width: 100%">
        <input type="hidden" :name="props.name" :value="selected" />
        <vSelect
            :placeholder="props.firstOption"
            :options="options"
            :label="props.labelField"
            @option:selected="setSelected"
        >
            <template v-slot:option="option">
                {{ option[props.labelField] }}
            </template>
        </vSelect>
    </div>
</template>
