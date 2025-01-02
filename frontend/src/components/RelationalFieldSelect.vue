<script setup>
import { ref } from "vue";
import { onMounted } from "vue";
import { client } from "@/api/pocketbase";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
const options = ref([]);
const selected_label = ref("");
const error = ref(null);
const selected = ref([]);
const props = defineProps({
    name: String,
    collection: String,
    labelField: String,
    firstOption: String,
    selected: String,
    combinedFields: Array,
    isCombinedField: Boolean,
    multiple: {
        type: Boolean,
        default: false,
    },
});

onMounted(async () => {
    // const div = vselect.value.querySelector("#vs2__combobox");
    console.log(props.selected);
    selected.value = props.selected;
    try {
        const records = await client
            .collection(props.collection)
            .getFullList({});
        options.value = records;

        if (Array.isArray(props.selected)) {
            // if (selected.value != "") {
            //     // const filtered_option = records.filter(
            //     //     (e) => e.id === selected_val,
            //     // );
            //     selected_label.value = ["Sick Leave", "Emergency Leave"];
            // }
            if (selected.value !== "") {
                const _selected = [];
                props.selected.forEach((val) => {
                    const filtered_option = records.filter((e) => e.id === val);
                    _selected.push(filtered_option[0][props.labelField]);
                });
                selected_label.value = _selected;
            }
        } else {
            if (selected.value !== "") {
                const filtered_option = records.filter(
                    (e) => e.id === props.selected,
                );
                selected_label.value = filtered_option[0][props.labelField];
            }
        }
    } catch {
        error.value = true;
    }
});

function setSelected(value) {
    if (Array.isArray(value)) {
        value.forEach((e) => {
            if (typeof e === "object") {
                selected.value.push(e.id);
            }
        });
    } else {
        selected.value.push(value.id);
    }
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
</script>

<template>
    <div style="width: 100%">
        <input
            type="hidden"
            :name="props.name"
            :value="e"
            v-if="Array.isArray(selected)"
            v-for="e in [...new Set(selected)]"
        />

        <input
            type="hidden"
            :name="props.name"
            :value="selected"
            v-if="!Array.isArray(selected)"
        />

        <vSelect
            :placeholder="props.firstOption"
            :options="options"
            :label="props.labelField"
            :value="props.selected"
            :multiple="props.multiple"
            v-model="selected_label"
            @option:selected="setSelected"
        >
            <template v-slot:option="option">
                <span v-if="props.isCombinedField !== undefined">
                    {{ renderCombineField(option, props.combinedFields) }}
                </span>
                <span v-else>
                    {{ option[props.labelField] }}
                </span>
            </template>
        </vSelect>
    </div>
</template>
