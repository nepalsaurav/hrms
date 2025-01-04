<script setup>
import BreadCrumb from "@/components/BreadCrumb.vue";
import RenderForms from "@/components/RenderForms.vue";
import { ref } from "vue";
import { getCurrentTime, getCurrentDate } from "@/utils";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
import { client } from "@/api/pocketbase";

const formList = [
    {
        name: "employee",
        label: "Employee",
        collection: "employee",
        labelField: "first_name",
        firstOption: "select employee",
        type: "relational_field_select",
        isCombinedField: true,
        combinedFields: ["first_name", "middle_name", "last_name"],
        required: true,
    },
    {
        name: "check_out_time",
        label: "Check Out Time",
        type: "text",
        disabled: true,
    },
];
const formProcessing = ref(false);
const formErrors = ref({});
const router = useRouter();
const defaultValue = {
    check_out_time: getCurrentTime(),
};

async function handleSubmit(event) {
    const target = event.target;
    const form = new FormData(target);
    let formObject = Object.fromEntries(form.entries());
    formProcessing.value = true;
    try {
        if (formObject.employee === undefined) {
            formErrors.value["employee"] = "required fields";
            return;
        }

        const formatedDate = `${getCurrentDate()} 00:00:00.000Z`;
        const record = await client
            .collection("check_in")
            .getFirstListItem(
                `employee='${formObject.employee}'&&date='${formatedDate}'`,
            );
        if (record.check_out_time !== "") {
            formErrors.value["employee"] = "already checkout";
            return;
        }
        record.check_out_time = getCurrentTime();

        await client.collection("check_in").update(record.id, record);
        Swal.fire({
            title: "success!",
            text: "check out added",
            icon: "success",
        });
        router.push("/attendance");
    } catch (error) {
        if (error.data.message === "The requested resource wasn't found.") {
            Swal.fire({
                title: "error!",
                text: "please! first do check in",
                icon: "error",
            });
        }
        if (error.data.data) {
            const errObject = {};
            Object.entries(error.data.data).forEach(([key, value]) => {
                errObject[key] = value.message;
            });
            formErrors.value = errObject;
        }
    } finally {
        formProcessing.value = false;
    }
}
</script>

<template>
    <div class="container">
        <BreadCrumb
            :links="[
                {
                    path: '/',
                    label: 'Dashboard',
                    isActive: false,
                },
                {
                    path: '/attendance',
                    label: 'Attendance',
                    isActive: false,
                },
                {
                    path: '/attendance/checkout',
                    label: 'Check Out',
                    isActive: true,
                },
            ]"
        />

        <div class="card">
            <div class="card-content">
                <form novalidate @submit.prevent="handleSubmit">
                    <fieldset :disabled="formProcessing">
                        <legend class="has-text-weight-bold">
                            Add Check In
                        </legend>
                        <div class="is-flex is-flex-direction-row-reverse">
                            <button class="button is-dark" type="submit">
                                Save
                            </button>
                        </div>
                        <div class="columns is-multiline">
                            <template v-for="item in formList">
                                <div class="column is-4">
                                    <RenderForms
                                        :form="item"
                                        :errors="formErrors"
                                        :defaultValue="defaultValue[item.name]"
                                    />
                                </div>
                            </template>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
</template>
