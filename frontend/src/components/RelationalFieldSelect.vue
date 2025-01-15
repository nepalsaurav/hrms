<script setup>
import { ref, onMounted, watch } from "vue";
import { client } from "@/api/pocketbase";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { useFormModel } from "@/stores/form";
import { storeToRefs } from "pinia";
import Avatar from "./Avatar.vue";

const { formModel } = storeToRefs(useFormModel())

const props = defineProps({
    name: String,
    collection: String,
    labelField: String,
    firstOption: String,
    selected: [String, Array],
    combinedFields: Array,
    isCombinedField: Boolean,
    multiple: {
        type: Boolean,
        default: false,
    },
});

const options = ref([]);
const selected = ref(Array.isArray(props.selected) ? props.selected : [props.selected]);
const selectedLabel = ref([]);
const error = ref(null);

watch(selected, (newValue) => {

    formModel.value[props.name] = newValue;
}, { immediate: true });

const fetchOptions = async () => {
    try {
        const records = await client.collection(props.collection).getFullList({});
        options.value = records;
        updateSelectedLabel(records);
    } catch {
        error.value = true;
    }
};

const updateSelectedLabel = (records) => {
    if (Array.isArray(props.selected)) {
        selectedLabel.value = props.selected.map(id =>
            records.find(record => record.id === id)?.[props.labelField] || ''
        );
    } else {
        const record = records.find(record => record.id === props.selected);
        selectedLabel.value = record ? [record[props.labelField]] : [];
    }
};

const setSelected = (value) => {
    if (Array.isArray(value)) {
        selected.value = value.map(item => item.id);
    } else {
        const setSelected = new Set(selected.value)
        setSelected.add(value.id)
        selected.value = Array.from(setSelected)
    }
};

const renderCombineField = (item, fields) => {
    return fields.map(field => item[field]).filter(value => value).join(" ");
};

onMounted(fetchOptions);

</script>

<template>
    <div style="width: 100%">
        <input type="hidden" :name="props.name" :value="e" v-if="Array.isArray(selected)"
            v-for="e in [...new Set(selected)]" />

        <vSelect :placeholder="props.firstOption" :options="options" :label="props.labelField" v-model="selectedLabel"
            :multiple="props.multiple" :value="props.selected" @option:selected="setSelected">
            <template v-slot:option="option">
                <div class="is-flex">
                    <span v-if="props.isCombinedField">
                        {{ renderCombineField(option, props.combinedFields) }}
                    </span>
                    <span v-else>
                        {{ option[props.labelField] }}
                    </span>
                    <span v-if="props.collection === 'employee'" class="ml-2">
                        <Avatar :filename="option.photo" :record="option" size="24x24" />
                    </span>
                </div>
            </template>
        </vSelect>
    </div>
</template>
