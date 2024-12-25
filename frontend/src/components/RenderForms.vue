<script setup>
import DatePicker from "./DatePicker.vue";
import RichText from "./RichText.vue";
import { ref } from "vue";
import { watchEffect, computed } from "vue";
import RelationalFieldSelect from "./RelationalFieldSelect.vue";
const props = defineProps(["form", "errors"]);
const form = props.form;
const filename = ref("");
function updateFile(event) {
    const file = event.target.files[0];
    if (file) {
        filename.value = file.name;
    }
}
</script>

<template>
    <div class="field">
        <label :for="form.name" class="label">
            {{ form.label }}
            <span v-if="form.required" class="has-text-danger">*</span>
        </label>
        <div class="control">
            <!-- text input -->
            <input
                v-if="form.type === 'text'"
                :id="form.name"
                :name="form.name"
                class="input"
                type="text"
                :placeholder="form.placeholder"
                :required="form.required"
            />
            <!-- text input -->

            <!-- date input -->

            <DatePicker
                v-if="form.type === 'date'"
                :placeholder="form.placeholder"
                :required="form.required"
                :name="form.name"
            />
            <!-- date input -->

            <!-- tel input -->
            <input
                v-if="form.type === 'tel'"
                :id="form.name"
                :name="form.name"
                class="input"
                type="tel"
                :placeholder="form.placeholder"
                :required="form.required"
            />
            <!-- tel input -->

            <!-- email input -->
            <input
                v-if="form.type === 'email'"
                :id="form.name"
                :name="form.name"
                class="input"
                type="email"
                :placeholder="form.placeholder"
                :required="form.required"
            />
            <!-- email input -->

            <!-- select -->
            <div class="select" v-if="form.type === 'select'">
                <select :name="form.name">
                    <option v-for="option in form.options" :value="option">
                        {{ option }}
                    </option>
                </select>
            </div>
            <!-- select -->

            <!-- rich text -->
            <RichText
                v-if="form.type === 'rich_text'"
                :name="form.name"
                :initialContent="form.initialContent"
            />
            <!-- rich text -->

            <!-- text area -->
            <textarea
                v-if="form.type === 'textarea'"
                class="textarea"
                :name="form.name"
                :placeholder="form.placeholder"
                :value="form.initialContent"
            >
            </textarea>

            <!-- file input -->
            <div class="file has-name" v-if="form.type === 'file'">
                <label class="file-label">
                    <input
                        class="file-input"
                        @change="updateFile"
                        type="file"
                        :name="form.name"
                    />
                    <span class="file-cta">
                        <span class="file-icon">
                            <i class="bi bi-file-earmark-arrow-up"></i>
                        </span>
                        <span class="file-label"> Choose a file… </span>
                    </span>
                    <span class="file-name">
                        {{ filename }}
                    </span>
                </label>
            </div>
            <!-- file input -->

            <!-- relational field options -->
            <RelationalFieldSelect
                v-if="form.type === 'relational_field_select'"
                :name="form.name"
                :collection="form.collection"
                :labelField="form.labelField"
                :firstOption="form.firstOption"
            />

            <p
                class="help is-danger"
                v-if="props.errors[form.name] != undefined"
            >
                {{ props.errors[form.name] }}
            </p>
        </div>
    </div>
</template>
