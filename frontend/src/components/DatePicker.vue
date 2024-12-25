<script setup>
import Pikaday from "pikaday";
import { useTemplateRef, onMounted } from "vue";
const dateInput = useTemplateRef("date-input");
const props = defineProps(["placeholder", "required", "name"]);
onMounted(() => {
    const elm = dateInput.value;
    const _ = new Pikaday({
        field: elm,
        toString(date, format) {
            const day = String(date.getDate()).padStart(2, "0");
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${year}-${month}-${day}`;
        },
    });
});
</script>

<template>
    <input
        type="text"
        ref="date-input"
        class="input"
        :placeholder="props.placeholder"
        :required="props.required"
        :name="props.name"
    />
</template>
