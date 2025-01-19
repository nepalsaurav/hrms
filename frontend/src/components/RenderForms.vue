<script setup>
import DatePicker from "./DatePicker.vue";
import RichText from "./RichText.vue";
import { ref } from "vue";
import RelationalFieldSelect from "./RelationalFieldSelect.vue";
import CodeEditor from "./CodeEditor.vue";
import { useFormModel } from "@/stores/form";
import { storeToRefs } from "pinia";

const { formModel } = storeToRefs(useFormModel())

const props = defineProps({
    form: { type: Object },
    errors: { type: Object, default: () => ({}) },
    defaultValue: { default: "" },
});


// set if showlabel props form is undefined to true otherwise its value
const showLabel = props.form.showLabel === undefined ? true : props.form.showLabel


// Set default value for select if type is select
if (props.form.type === "select") {
    formModel.value[props.form.name] = props.defaultValue
}

const filename = ref("");
const defaultCheckboxValue = ref("checkbox_off");

// Method for updating file
function updateFile(event) {
    const file = event.target.files[0];
    // update file to v-model
    formModel.value[props.form.name] = file
    if (file) {
        filename.value = file.name;
    }
}

// Method for handling checkbox checked state
function handleCheckbox(event) {
    defaultCheckboxValue.value = event.target.checked ? "checkbox_on" : "checkbox_off";
}

// Compute the component type for optimized conditional rendering
const isType = (type) => props.form.type === type;

// Method to check if checkbox value is true or false
function checkCheckboxChecked(val) {
    return val !== "" && val !== "checkbox_off";
}


formModel.value[props.form.name] = props.defaultValue

if(props.form.type === "file") {
    filename.value = props.defaultValue
}
</script>

<template>
    <div class="field">
        <label :for="form.name" v-if="showLabel">
            <small class="has-text-weight-bold">
                {{ form.label }}
                <span v-if="form.required" class="has-text-danger">*</span>
            </small>
        </label>
        <div class="control">
            <!-- Text, URL, and Email inputs -->
            <input v-if="isType('text') || isType('url') || isType('email')" :id="form.name" :name="form.name"
                class="input" type="text" v-model="formModel[form.name]" :placeholder="form.placeholder"
                :required="form.required" :disabled="form.disabled"  />

            <!-- Password input -->
            <input v-if="isType('password')" :id="form.name" :name="form.name" class="input" type="password"
                v-model="formModel[form.name]" :placeholder="form.placeholder" :required="form.required" />

            <!-- Number input -->
            <input v-if="isType('number')" :id="form.name" :name="form.name" v-model="formModel[form.name]"
                class="input" type="number" :placeholder="form.placeholder"  :required="form.required" />

            <!-- Date input -->
            <DatePicker v-if="isType('date')" :placeholder="form.placeholder" :required="form.required"
                :name="form.name" :form="form"
                :value="props.defaultValue.split(' ')[0]" />

            <!-- Textarea -->
            <textarea v-if="isType('textarea')" class="textarea" :name="form.name" v-model="formModel[form.name]"
                :placeholder="form.placeholder">
                {{ props.defaultValue }}
            </textarea>

            <!-- Formula field with custom code editor -->
            <CodeEditor v-if="isType('formula')" :value="props.defaultValue" :form="form" />

            <!-- Select input -->
            <div class="select" v-if="isType('select')">
                <select :name="form.name" v-model="formModel[form.name]">
                    <option v-for="option in form.options" :value="option.value"
                        :selected="option.value === props.defaultValue">
                        {{ option.label }}
                    </option>
                </select>
            </div>

            <!-- Rich text or editor -->
            <RichText v-if="isType('rich_text') || isType('editor')" :name="form.name"
                :initialContent="props.defaultValue" />

            <!-- File input -->
            <div class="file has-name" v-if="isType('file')">
                <label class="file-label">
                    <input class="file-input" @change="updateFile" type="file" :name="form.name" />
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

            <!-- Custom component -->
            <template v-if="isType('custom_component')">
                <component :is="form.component" :defaultValue="props.defaultValue" :form="form" />
            </template>

            <!-- Boolean input -->
            <input v-if="isType('bool')" type="hidden" :name="form.name" v-model="defaultCheckboxValue" />
            <input v-if="isType('bool')" :id="form.name" v-model="formModel[form.name]"
                :checked="checkCheckboxChecked(props.defaultValue)" @change="handleCheckbox" value="off" type="checkbox"
                class="checkbox custom-checkbox" />

            <!-- Relational field options -->
            <RelationalFieldSelect v-if="isType('relational_field_select')" :name="form.name"
                :collection="form.collection" :labelField="form.labelField" :firstOption="form.firstOption"
                :selected="props.defaultValue" :isCombinedField="form.isCombinedField"
                :combinedFields="form.combinedFields" :multiple="form.multiple !== undefined ? form.multiple : false" />

            <!-- Error display -->
            <p class="help is-danger" v-if="props.errors[form.name] != undefined">
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
label small{
    font-weight: 500 !important;
}



</style>
