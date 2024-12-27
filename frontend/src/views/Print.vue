<script setup>
import { onMounted } from "vue";
import { getPrintContent } from "@/stores/print";
onMounted(() => {
    const content = getPrintContent();
    document.getElementById("app").innerHTML = content;
});
</script>

<template>
    <h1>print view</h1>
</template>
