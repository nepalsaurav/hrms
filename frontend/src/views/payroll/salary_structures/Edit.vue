<script setup>
import BreadCrumb from "@/components/BreadCrumb.vue";
import { ref } from "vue";
import { client } from "@/api/pocketbase";
import { onMounted } from "vue";
import { useTemplateRef, watch } from "vue";
import { evaluate } from "mathjs";
import Swal from "sweetalert2";
import { useRouter, useRoute } from "vue-router";

const salaryComponents = ref([]);

const records = ref([]);
const post = ref(null);
const componentOptions = ref([]);
const variable = ref({});
const abbr = ref([]);
const errors = ref({});
const formLoading = ref(false);
const router = useRouter();
const route = useRoute();

watch(() => [route.params.id, route.params.query], fetchCollectioSchema, {
    immediate: true,
});

async function fetchCollectioSchema() {
    try {
        const record = await client
            .collection("salary_structure")
            .getOne(route.params.id);
        post.value = record;
        record.components.forEach((e) => {
            salaryComponents.value.push({
                name: e.name,
                amount: e.amount,
                calculated: e.calculated,
            });

            if (e.calculated !== "") {
                variable.value[e.component[0].abbreviation] = e.calculated;
            } else {
                variable.value[e.component[0].abbreviation] = e.amount;
            }
        });
    } catch {}
}

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

    salaryComponents.value.forEach((e) => {
        if (e.name !== "") {
            console.log(e.name);
            const abbr = checkAbbreviation(e.name);
            if (abbr.length > 0) {
                if (e.amount !== 0) {
                    variable.value[abbr[0].abbreviation] = e.amount;
                }
                if (e.calculated !== "") {
                    variable.value[abbr[0].abbreviation] = e.calculated;
                }

                console.log(variable.value);
            }
        }
    });
    salaryComponents.value.push({
        name: "",
        amount: undefined,
        calculated: "",
    });
}

function removeMoreRow(index) {
    if (salaryComponents.value.length > 1) {
        salaryComponents.value.splice(index, 1);
    }
}

function evaluateExpression(expr, variables) {
    try {
        const a = evaluate(expr, variables);
        if (a["fixPrefix"] !== undefined) {
            return [a["fixPrefix"], null];
        }
        return [true, a];
    } catch {
        return [false, null];
    }
}

function changeCalculateValue(event) {
    const target = event.target;
    console.log(target.value);
    const [isValid, value] = evaluateExpression(target.value, variable.value);
    console.log(isValid, value, "expressiomn");
}

function handleSubmit(event) {
    const target = event.target;
    const form = new FormData(target);
    let formObject = Object.fromEntries(form.entries());
    console.log(formObject);
    if (formObject.name === "") {
        errors.value["name"] = "required field";
    }

    const structures = [];

    let error = false;
    let errorAt = "";
    salaryComponents.value.forEach((e) => {
        if (e.calculated !== "") {
            const [isValid, value] = evaluateExpression(
                e.calculated,
                variable.value,
            );
            console.log(isValid, value, e.calculated, variable.value);
            if (!isValid) {
                error = true;
                errorAt = e.name;
                return;
            }
            e.finalAmount = value;
        } else {
            e.finalAmount = e.amount;
        }
        e.component = checkAbbreviation(e.name);
        structures.push(e);
    });
    if (error) {
        Swal.fire({
            title: "Error!",
            text: `calculated formula error at ${errorAt}`,
            icon: "error",
        });
        return;
    }
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
        const record = client
            .collection("salary_structure")
            .update(route.params.id, {
                name: formObject.name,
                components: mapped_structures,
            });
        console.log(record);
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
                                :value="post && post.name"
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
                                    <textarea
                                        class="textarea has-text-success"
                                        @change="changeCalculateValue"
                                        v-model="component.calculated"
                                        placeholder="formula for calculated amount"
                                        required
                                    ></textarea>
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
