<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';

import { useFormModel } from '@/stores/form';
import { watch } from 'vue';

const el = ref(null)
const toggleEl = ref(null)
const props = defineProps({
    form: Object,
    defaultValue: {
        default: ""
    }
})
const options = ref([
    {
        label: "Select type",
        value: ""
    },
    {
        label: "First-Half",
        value: "First-Half"
    },
    {
        label: "Second-Half",
        value: "Second-Half"
    }
])

const { formModel } = useFormModel()

watch(formModel, (newValue, _) => {
    if (toggleEl.value) {
        if (newValue.is_half) {
            toggleEl.value.style.display = "block"
        } else {
            toggleEl.value.style.display = "none"
        }
    }
}, { immediate: true });

onMounted(() => {
    toggleEl.value = el.value.parentElement.parentElement.parentElement
    toggleEl.value.style.display = "none"
})

</script>

<template>
    <div class="select" ref="el">
        <select :name="form.name">
            <option v-for="option in options" :value="option.value" :selected="option.value === props.defaultValue">
                {{ option.label }}
            </option>
        </select>
    </div>
</template>