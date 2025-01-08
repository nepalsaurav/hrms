<script setup>
import { ref, onMounted, watchEffect } from "vue";
import { VAceEditor } from "vue3-ace-editor";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/ext-language_tools";
import { client } from "@/api/pocketbase";

const aceRef = ref(null);
const content = ref("");
const props = defineProps({
    value: String,
    form: Object,
});

// watchEffect(() => {
//     console.log(content.value);
// });

onMounted(async () => {
    content.value = props.value;
    const suggestionList = [];

    try {
        const salaryComponent = await client
            .collection("salary_component")
            .getFullList();
        suggestionList.push(...salaryComponent.map((e) => e.abbreviation));
        const employee = await client.send("/api/get_collection/employee");
        suggestionList.push(...employee.collection.fields.map((e) => e.name));
    } catch {}

    const editor = aceRef.value.getAceInstance();
    const staticWordCompleter = {
        getCompletions: function (editor, session, pos, prefix, callback) {
            callback(
                null,
                suggestionList.map(function (word) {
                    return {
                        caption: word,
                        value: word,
                        meta: "static",
                    };
                }),
            );
        },
    };
    editor.completers.push(staticWordCompleter);
});
</script>
<template>
    <input
        type="hidden"
        :name="props.form.name"
        :id="props.form.name"
        v-model="content"
    />
    <v-ace-editor
        ref="aceRef"
        v-model:value="content"
        :options="{
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: true,
        }"
        lang="javascript"
        theme="chrome"
        style="height: 300px"
    />
</template>
