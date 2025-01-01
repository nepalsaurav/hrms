<script setup>
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import { client } from "@/api/pocketbase";
import { ref } from "vue";
const route = useRoute();
const props = defineProps({
    item: Object,
});
let options = ref(null);
let error = ref(false);
onMounted(async () => {
    try {
        const records = await client
            .collection(props.item.collection)
            .getFullList({});

        options.value = records;
    } catch (err) {
        console.log(err.data);
        error.value = true;
    }
});
</script>

<template>
    <!-- select -->
    <div class="field">
        <label class="label" :for="item.name">
            <small> {{ props.item.label }}</small></label
        >
        <div class="control">
            <div class="select is-small" style="width: 100%">
                <select
                    :name="props.item.name"
                    :id="props.item.name"
                    style="width: 100%"
                >
                    <option v-if="options === null && !error" value="">
                        Data is loading...
                    </option>
                    <option value="" v-if="error">
                        something error occured
                    </option>
                    <option v-if="!error" value="">
                        {{ props.item.firstOption }}
                    </option>
                    <option
                        v-if="!error"
                        v-for="option in options"
                        :value="option.id"
                        :selected="option.id === route.query[props.item.name]"
                    >
                        {{ option[props.item.labelField] }}
                    </option>
                </select>
            </div>
        </div>
    </div>
</template>
