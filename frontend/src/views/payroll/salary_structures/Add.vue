<script setup>
import BreadCrumb from "@/components/BreadCrumb.vue";
import { ref } from "vue";
import { client } from "@/api/pocketbase";
import { onMounted } from "vue";
import { evaluate } from "mathjs";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

const salaryComponents = ref([{ name: "", amount: 0, calculated: false }]);

const records = ref([]);
const componentOptions = ref([]);
const variable = ref({});
const abbr = ref([]);
const errors = ref({});
const formLoading = ref(false);
const router = useRouter();

onMounted(async () => {
    try {
        const items = await client
            .collection("salary_component")
            .getFullList({});
        componentOptions.value = items;
        records.value = items;
        abbr.value = records.map((e) => e.abbreviation);
    } catch {}
});

function checkAbbreviation(name) {
    if (records.value.length > 0) {
        const val = records.value.filter((e) => e.name === name);
        return val;
    }
    return [];
}

function addMoreRow() {
    salaryComponents.value.forEach((val) => {
        if (val.name !== "") {
            const options = componentOptions.value.filter(
                (e) => e.name !== val.name,
            );
            componentOptions.value = options;
        }
    });
    salaryComponents.value.push({
        name: "",
        amount: 0,
        calculated: false,
    });
}

function removeMoreRow(index) {
    if (salaryComponents.value.length > 1) {
        salaryComponents.value.splice(index, 1);
    }
}

function handleSubmit(event) {
    const target = event.target;
    const form = new FormData(target);
    let formObject = Object.fromEntries(form.entries());
    console.log(formObject, salaryComponents.value);
    if (formObject.name === "") {
        errors.value["name"] = "required field";
    }
    const structures = [];

    salaryComponents.value.forEach((e) => {
        e.component = checkAbbreviation(e.name);
        structures.push(e);
    });

    if (structures.length === 0) {
        errors.value["components"] = "required field";
    }
    const mapped_structures = structures.map((e) => {
        if (e.amount === undefined) {
            e.amount = 0;
        }
        return e;
    });
    formLoading.value = true;
    try {
        const record = client.collection("salary_structure").create({
            name: formObject.name,
            components: mapped_structures,
        });
        Swal.fire({
            title: "Success!",
            text: "successfully created",
            icon: "success",
        });
        router.push("/payroll/salary_structure");
    } catch (error) {
        console.log(error);
    } finally {
        formLoading.value = false;
    }
}
</script>

<template>
    <BreadCrumb
        :links="[
            { label: 'Dashboard', path: '/', isActive: false },
            { label: 'Payroll', path: '/payroll', isActive: true },
            {
                label: 'Salary Structure',
                path: '/payroll/salary_structure',
                isActive: false,
            },
            {
                label: 'Add',
                path: '/payroll/salary_structure/add',
                isActive: true,
            },
        ]"
    />

    <div class="card">
        <div class="card-content">
            <form novalidate @submit.prevent="handleSubmit">
                <fieldset :disabled="formLoading">
                    <legend class="has-text-weight-bold">
                        Add Salary Structure
                    </legend>
                    <div class="is-flex is-flex-direction-row-reverse">
                        <button class="button is-dark" type="submit">
                            Save
                        </button>
                    </div>
                    <div class="columns is-multiline">
                        <div class="column is-12">
                            <label for="name" class="label">Name*</label>
                            <input
                                type="text"
                                class="input"
                                id="name"
                                name="name"
                                required
                            />
                            <p
                                class="has-text-danger mt-2"
                                v-if="errors.name !== undefined"
                            >
                                {{ errors.name }}
                            </p>
                        </div>
                        <div class="column is-12">
                            <label class="label">Components*</label>
                            <div
                                v-for="(component, index) in salaryComponents"
                                :key="index"
                                class="columns"
                            >
                                <div class="column">
                                    <input
                                        type="text"
                                        class="input"
                                        v-model="component.name"
                                        placeholder="Salary component"
                                        list="name_options"
                                        required
                                    />
                                    <datalist
                                        id="name_options"
                                        v-if="componentOptions.length > 0"
                                    >
                                        <option
                                            :value="item.name"
                                            v-for="item in componentOptions"
                                        >
                                            {{ item.name }}
                                        </option>
                                    </datalist>
                                </div>
                                <div class="column">
                                    <input
                                        type="number"
                                        class="input"
                                        v-model="component.amount"
                                        placeholder="Amount"
                                        required
                                    />
                                </div>
                                <div class="column">
                                    <label class="checkbox">
                                        <input
                                            type="checkbox"
                                            class="custom-checkbox"
                                            v-model="component.calculated"
                                            @change="
                                                (event) => {
                                                    if (event.target.checked) {
                                                        component.amount = 0;
                                                    }
                                                }
                                            "
                                        />
                                        Based on formula
                                    </label>
                                </div>
                                <div class="column is-narrow">
                                    <button
                                        class="button is-danger is-small mt-1"
                                        @click.prevent="removeMoreRow(index)"
                                    >
                                        Remove
                                    </button>
                                </div>
                                <p
                                    class="has-text-danger mt-2"
                                    v-if="errors.components !== undefined"
                                >
                                    {{ errors.components }}
                                </p>
                            </div>
                            <div class="is-flex is-flex-direction-row-reverse">
                                <button
                                    class="button is-dark is-small"
                                    @click.prevent="addMoreRow"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </form>
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

.custom-checkbox:indeterminate {
    accent-color: var(--bulma-dark);
}
</style>
