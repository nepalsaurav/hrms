<script setup>
import { ref } from "vue";
import { onMounted } from "vue";
import { client } from "@/api/pocketbase";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
const options = ref([]);
const selected_label = ref("");
const error = ref(null);
const selected = ref("");
const props = defineProps({
    name: String,
    collection: String,
    labelField: String,
    firstOption: String,
    selected: String,
});

onMounted(async () => {
    // const div = vselect.value.querySelector("#vs2__combobox");
    selected.value = props.selected;
    try {
        const records = await client
            .collection(props.collection)
            .getFullList({});
        options.value = records;
        if (selected.value != "") {
            const filtered_option = records.filter(
                (e) => e.id === props.selected[0],
            );
            selected_label.value = filtered_option[0][props.labelField];
        }
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
            :value="props.selected"
            v-model="selected_label"
            @option:selected="setSelected"
        >
            <template v-slot:option="option">
                {{ option[props.labelField] }}
            </template>
        </vSelect>
    </div>
</template>
