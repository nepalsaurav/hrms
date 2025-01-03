<script setup>
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import { onMounted } from "vue";
import { useTemplateRef, watchEffect } from "vue";

hljs.registerLanguage("javascript", javascript);
const code = useTemplateRef("code");
watchEffect(() => {});

onMounted(() => {
    const block = code.value;
    console.log(block);
    hljs.highlightElement(block);
});
</script>

<template>
    <code
        ref="code"
        class="javascript"
        type="text"
        placeholder="Calculated field"
    >
    </code>
</template>
