<script setup>
import Pikaday from "pikaday";
import { useTemplateRef, onMounted } from "vue";
const dateInput = useTemplateRef("date-input");
const props = defineProps(["placeholder", "required", "name", "form", "value"]);
import { vMaska } from "maska/vue";
import { useFormModel } from "@/stores/form";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { watch } from "vue";


const { formModel } = storeToRefs(useFormModel())

const date = ref("")

watch(date, (n, _) => {
    if (n !== undefined || n !== "") {
        formModel.value[props.name] = n
    }
}, { immediate: true })

onMounted(() => {
    const elm = dateInput.value;
    const _ = new Pikaday({
        field: elm,
        toString(date, _) {
            const day = String(date.getDate()).padStart(2, "0");
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const year = date.getFullYear();
            const dateString = `${year}-${month}-${day}`
            return dateString;
        },
        onClose() {
            date.value = elm.value
        }
    });
});


</script>

<template>
    <input type="text" ref="date-input" class="input" v-maska="'####-##-##'" :placeholder="props.placeholder"
        :required="props.required" :name="props.name" :value="props.value"  />
</template>
