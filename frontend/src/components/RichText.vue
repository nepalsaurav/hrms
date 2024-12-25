<script setup>
// import { ref } from "vue";
import "trix/dist/trix.css";
import "trix";
const props = defineProps({
    name: String,
    initialContent: String,
});
</script>

<template>
    <div class="trix_container">
        <input
            id="x"
            type="hidden"
            :name="props.name"
            :value="props.initialContent"
        />
        <trix-editor input="x"></trix-editor>
    </div>
</template>

<style scoped>
.trix_container {
    max-width: 100%;
    height: auto;
}
.trix_container .trix-button-group {
    background-color: white;
}
.trix_container .trix-content {
    background-color: white;
}
</style>
