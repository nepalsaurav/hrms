<script setup>
import { ref } from "vue";
import { formDetails } from "./forms";
const tabs = ref([
    {
        name: "personal_details",
        label: "Personal Details"
    },
    {
        name: "contact_details",
        label: "Contact Details"
    },
    {
        name: "job_details",
        label: "Job Details"
    },
    {
        name: "payroll_and_benifits",
        label: "Payroll and Benefits"
    },
    {
        name: "system_and_administrative_details",
        label: "System and Administrative Details"
    },
    {
        name: "Additional Information",
        label: "additional_information"
    },
    {
        name: "optional_attributes",
        label: "Optional Attributes"
    }
]);

const activeFormTab = ref("personal_details");

function changeTab(name) {
    activeFormTab.value = name;
}

</script>

<template>
    <h1 class="subtitle">Add Employee</h1>
    <hr>

    <div class="card">
        <div class="card-content">
            <form>
                <!-- tabs -->
                <div class="tabs">
                    <ul>
                        <li v-for="tab in tabs" :class="tab.name === activeFormTab && 'is-active'">
                            <a v-on:click="changeTab(tab.name)">{{ tab.label }}</a>
                        </li>
                    </ul>
                </div>
                <!-- tabs -->

                <!-- main form content -->
                <div v-for="tab in tabs">
                    <div class="columns is-multiline" v-show="tab.name === activeFormTab">
                        <div class="column is-4" v-for="form in formDetails[tab.name]">
                            <div class="field">
                                <label :for="form.name" class="label">{{ form.label }}</label>
                                <div class="control">
                                    <!-- text input -->
                                    <input v-if="form.type === 'text'" :id="form.name" :name="form.name" class="input"
                                        type="text" :placeholder="form.placeholder" :required="form.required">
                                    <!-- text input -->

                                    <!-- date input -->
                                    <input v-if="form.type === 'date'" :id="form.name" :name="form.name" class="input"
                                        type="date" :placeholder="form.placeholder" :required="form.required">
                                    <!-- date input -->
                                     

                                    <!-- tel input -->
                                    <input v-if="form.type === 'tel'" :id="form.name" :name="form.name" class="input"
                                        type="tel" :placeholder="form.placeholder" :required="form.required">
                                    <!-- tel input -->

                                    <!-- email input -->
                                    <input v-if="form.type === 'email'" :id="form.name" :name="form.name" class="input"
                                        type="email" :placeholder="form.placeholder" :required="form.required">
                                    <!-- email input -->

                                    <!-- select -->
                                    <div class="select" v-if="form.type==='select'">
                                        <select>
                                             <option v-for="option in form.options" :value="option">
                                                {{  option }}
                                             </option>
                                        </select>
                                    </div>
                                    <!-- select -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- main form content -->
            </form>
        </div>
    </div>
</template>