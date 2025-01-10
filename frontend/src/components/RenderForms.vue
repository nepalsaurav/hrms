<script setup>
import DatePicker from "./DatePicker.vue";
import RichText from "./RichText.vue";
import { ref } from "vue";
import { watchEffect, computed } from "vue";
import RelationalFieldSelect from "./RelationalFieldSelect.vue";
import CodeEditor from "./CodeEditor.vue";
const props = defineProps({
    form: { type: Object },
    errors: { type: Object, default: () => ({}) },
    defaultValue: { default: "" },
});
const form = props.form;
const filename = ref("");
const defaultCheckboxValue = ref("checkbox_off");
function updateFile(event) {
    const file = event.target.files[0];
    if (file) {
        filename.value = file.name;
    }
}

function checkChekboxChecked(val) {
    if (val === "") {
        return false;
    }
    return val;
}

function handleCheckbox(event) {
    const target = event.target;
    if (target.checked) {
        defaultCheckboxValue.value = "checkbox_on";
    } else {
        defaultCheckboxValue.value = "checkbox_off";
    }
}
</script>

<template>
    <div class="field">
       <label :for="form.name">
        <small  class="has-text-weight-bold">
            {{ form.label }}
            <span v-if="form.required" class="has-text-danger">*</span>
        </small>
       </label>
        <div class="control">
            <!-- text input -->
            <input
                v-if="form.type === 'text' || form.type === 'url'"
                :id="form.name"
                :name="form.name"
                class="input"
                type="text"
                :value="props.defaultValue"
                :placeholder="form.placeholder"
                :required="form.required"
                :disabled="form.disabled"
            />
            <!-- text input -->

            <CodeEditor
                v-if="form.type === 'formula'"
                :value="props.defaultValue"
                :form="form"
            />

            <!-- number input -->

            <input
                v-if="form.type === 'number'"
                :id="form.name"
                :name="form.name"
                class="input"
                type="number"
                :value="props.defaultValue"
                :placeholder="form.placeholder"
                :required="form.required"
            />

            <!-- password input -->
            <input
                v-if="form.type === 'password'"
                :id="form.name"
                :name="form.name"
                class="input"
                type="password"
                :value="props.defaultValue"
                :placeholder="form.placeholder"
                :required="form.required"
            />
            <!-- password input -->

            <!-- date input -->

            <DatePicker
                v-if="form.type === 'date'"
                :placeholder="form.placeholder"
                :required="form.required"
                :name="form.name"
                :value="props.defaultValue.split(' ')[0]"
            />
            <!-- date input -->

            <!-- tel input -->
            <input
                v-if="form.type === 'tel'"
                :id="form.name"
                :name="form.name"
                class="input"
                type="tel"
                :value="props.defaultValue"
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
                :value="props.defaultValue"
                :placeholder="form.placeholder"
                :required="form.required"
            />
            <!-- email input -->

            <!-- select -->
            <div class="select" v-if="form.type === 'select'">
                <select :name="form.name">
                    <option
                        v-for="option in form.options"
                        :value="option.value"
                        :selected="option.value === props.defaultValue"
                    >
                        {{ option.label }}
                    </option>
                </select>
            </div>
            <!-- select -->

            <!-- rich text -->
            <RichText
                v-if="form.type === 'rich_text' || form.type === 'editor'"
                :name="form.name"
                :initialContent="props.defaultValue"
            />
            <!-- rich text -->

            <!-- text area -->
            <textarea
                v-if="form.type === 'textarea'"
                class="textarea"
                :name="form.name"
                :placeholder="form.placeholder"
                :value="props.defaultValue"
            >
            </textarea>
            <!-- text area -->

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

            <template v-if="form.type === 'custom_component'">
                 <component :is="form.component" :defaultValue:="props.defaultValue" :form="form"/>
            </template>

            <!-- bool input -->
            <input
                type="hidden"
                :name="form.name"
                v-if="form.type === 'bool'"
                v-model="defaultCheckboxValue"
            />
            <input
                v-if="form.type === 'bool'"
                :id="form.name"
                :checked="checkChekboxChecked(props.defaultValue)"
                @change="handleCheckbox"
                value="off"
                type="checkbox"
                class="checkbox custom-checkbox"
            />
            <!-- bool input -->

            <!-- relational field options -->
            <RelationalFieldSelect
                v-if="form.type === 'relational_field_select'"
                :name="form.name"
                :collection="form.collection"
                :labelField="form.labelField"
                :firstOption="form.firstOption"
                :selected="props.defaultValue"
                :isCombinedField="form.isCombinedField"
                :combinedFields="form.combinedFields"
                :multiple="form.multiple !== undefined ? form.multiple : false"
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

<style scoped>
.custom-checkbox {
    transform: scale(1.2);
}

.custom-checkbox:checked {
    accent-color: var(--bulma-dark);
}
</style>
