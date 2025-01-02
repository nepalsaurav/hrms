<script setup>
const props = defineProps({
    item: Object,
    header: Object,
});

function renderCombineField(item, fields) {
    let texts = [];
    for (let i = 0; i < fields.length; i++) {
        if (item.expand[props.header.collection][fields[i]] !== "") {
            texts.push(item.expand[props.header.collection][fields[i]]);
        }
    }
    return texts.join(" ");
}
</script>

<template>
    <input
        type="text"
        :value="renderCombineField(props.item, props.header.fields)"
        class="input"
        disabled
        readonly
    />
</template>
