<script setup>
import BreadCrumb from "@/components/BreadCrumb.vue";
import { formDetails } from "./forms";
import RenderForms from "@/components/RenderForms.vue";
import { ref } from "vue";
import { trimFormObject, validateForm } from "@/utils";
import { validationSchema } from "./forms";
import { client } from "@/api/pocketbase";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
import { getDaysBetweenDates } from "@/utils";
// import { useFormModel } from "@/stores/form";



const formErrors = ref({});
const formProcessing = ref(false);
const router = useRouter();
// const {formModel} = useFormModel()
const employee = JSON.parse(localStorage.getItem("employee"))

const defaultField = {
    "employee": employee?.id,
    "status": "pending"
}

const formEl = ref()

async function handleSubmit(event) {
    event.preventDefault();
    try {
        await client.collection("leave").create(formModel);
    } catch(error) {
        console.log(error)
    }
    const target = event.target;
    const form = new FormData(target);
    let formObject = trimFormObject(Object.fromEntries(form.entries()));
    const validate = await validateForm(
        Object.fromEntries(formObject.entries()),
        validationSchema,
    );
    if (validate !== true) {
        formErrors.value = validate;
        return;
    }
    formProcessing.value = true;
    formErrors.value = {};
    if (formObject.get("is_half") === "true") {
        formObject.append("days", 0.5);
    } else {
        formObject.append(
            "days",
            getDaysBetweenDates(
                formObject.get("leave_from"),
                formObject.get("leave_to"),
            ),
        );
    }
    try {
        await client.collection("leave").create(formObject);
        Swal.fire({
            title: "success!",
            text: "successfully created leave",
            icon: "success",
        });
        router.push("/leave");
    } catch (err) {
        console.log(err.data)
        Swal.fire({
            title: "Error!",
            text: err.data.message,
            icon: "error",
        });
    } finally {
        formProcessing.value = false;

    }

}


</script>

<template>
    <div class="container">
        <BreadCrumb :links="[
            {
                label: 'Dashboard',
                path: '/',
                isActive: false,
            },
            {
                label: 'Leave',
                path: '/leave',
                isActive: false,
            },
            {
                label: 'Add',
                path: '/leave/add',
                isActive: true,
            },
        ]" />

        <div class="card">
            <div class="card-content">
                <form novalidate @submit="handleSubmit" ref="formEl">
                    <fieldset :disabled="formProcessing">
                        <legend class="has-text-weight-bold">
                            Add Employee
                        </legend>
                        <div class="is-flex is-flex-direction-row-reverse">
                            <button class="button is-dark" type="submit">
                                Save
                            </button>
                        </div>
                        <div class="columns is-multiline">
                            <div class="column is-4" v-for="item in formDetails">
                                <RenderForms :form="item" :errors="formErrors"
                                    :defaultValue="defaultField[item.name]" />
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
</template>
