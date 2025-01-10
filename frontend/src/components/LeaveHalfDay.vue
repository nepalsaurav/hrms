<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';

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
        label: "Morning",
        value: "morning"
     },
     {
        label: "Evening",
        value: "evening"
     }
])

onMounted(() => {
     const node = document.querySelector("#is_half");
     toggleEl.value = el.value.parentElement.parentElement.parentElement
     toggleEl.value.style.display = "none"
     if (node) {
        node.addEventListener('change', (event) => {
             if(event.target.checked) {
                toggleEl.value.style.display = "block"
             } else {
                toggleEl.value.style.display = "none"
             }
        })
     }
})
</script>

<template>
    <div class="select" ref="el">
                <select :name="form.name">
                    <option
                        v-for="option in options"
                        :value="option.value"
                        :selected="option.value === props.defaultValue"
                    >
                        {{ option.label }}
                    </option>
                </select>
            </div>
</template>