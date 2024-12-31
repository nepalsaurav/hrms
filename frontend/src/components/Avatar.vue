<script setup>
import { client } from "@/api/pocketbase";
const props = defineProps({
    filename: {
        type: String,
        default: "",
    },
    record: {
        type: Object,
        default: null,
    },
    size: {
        type: String,
        default: "1024x1024",
    },
});
</script>
<template>
    <template v-if="props.filename !== ''">
        <img
            v-if="props.record !== null"
            :class="`image is-${props.size}`"
            :src="
                client.files.getURL(props.record, props.filename, {
                    thumb: size,
                })
            "
            alt=""
        />
    </template>
</template>
