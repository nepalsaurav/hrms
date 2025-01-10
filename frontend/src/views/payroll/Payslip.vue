<script setup>
import { ref } from "vue";
import { toWords } from 'number-to-words';
import BreadCrumb from "@/components/BreadCrumb.vue";
import { useVueToPrint } from "vue-to-print";
import { useRoute } from "vue-router";
import LoadingSkeleton from "@/components/LoadingSkeleton.vue";
import { watch } from "vue";
import { client } from "@/api/pocketbase";

const componentRef = ref();
const route = useRoute()
const loading = ref(false)
const payslipData = ref(null)
const error = ref(null)
const company = ref(null)
const employee = JSON.parse(localStorage.getItem("employee"))
let breadcrumbLinks = []

if (employee.expand.roles.name === "Admin") {
    breadcrumbLinks = [
        {
            path: '/',
            label: 'Dashboard',
            isActive: false
        },
        {
            path: '/payroll/payroll_list',
            label: 'Payroll',
            isActive: false
        },
        {
            path: '/payroll/payslip',
            label: 'Pay Slip',
            isActive: true
        },
        {
            path: '/payroll/payslip',
            label: route.query.full_name,
            isActive: true
        }
    ]
} else {
    breadcrumbLinks = [
        {
            path: '/',
            label: 'Dashboard',
            isActive: false
        },
        {
            path: '/payslip_list',
            label: 'Pay Slip',
            isActive: false
        },
        {
            path: '/payslip_list',
            label: route.query.full_name,
            isActive: true
        }
    ]
}


async function fetchData() {
    payslipData.value = error.value = null
    try {
        const companyRecord = (await client.collection('company').getList(1, 1, {})).items[0]
        company.value = companyRecord
        console.log(companyRecord)
        const record = await client.collection("payroll").getOne(route.query.id, { expand: "employee" })
        payslipData.value = record

    } catch (err) {
        error.value = err.data.message
    } finally {
        loading.value = false
    }
}

watch(route.query, fetchData, { immediate: true })



function getTotal(type, component) {
    const amt = component.filter(e => e.type === type).reduce((acc, e) => acc + e.amount, 0)
    return amt
}

function netPay(component) {
    const amt = component.reduce((acc, e) => {
        if (e.type === "Earning") {
            return acc + e.amount;
        } else {
            return acc - e.amount;
        }
    }, 0);
    return amt;
}

const { handlePrint } = useVueToPrint({
    content: componentRef,
    documentTitle: `Payslip ${payslipData?.value?.employee}`,
});


</script>

<template>
    <div class="container">
        <BreadCrumb :links="breadcrumbLinks" />

        <LoadingSkeleton v-if="loading" />

        <template v-if="payslipData !== null">
            <div class="is-flex is-flex-direction-row-reverse">
                <button class="button is-light mb-2 mr-4" @click="handlePrint"><i class="bi bi-printer"></i></button>
            </div>
            <div class="card" ref="componentRef">
                <div class="card-content">
                    <!-- company details -->
                    <div class="columns ">
                        <div class="column is-half">
                            <img :src="client.files.getURL(company, company?.logo)" class="image is-128x128"
                                alt="company logo" />
                            <p class="is-size-4 has-text-weight-bold">
                                {{ company?.name }}
                            </p>
                            <p v-html="company?.address"></p>
                            <p>{{ company?.contact_no }}</p>
                        </div>
                    </div>
                    <!-- company details -->
                    <div class="columns">
                        <div class="column">
                            <p class="is-size-6 has-text-grey">
                                Employee: {{ payslipData.expand.employee.full_name }}
                            </p>
                        </div>
                        <div class="column">
                            <p class="is-size-6 has-text-grey">
                                From Date: {{ payslipData.from_date.split(" ")[0] }}
                            </p>
                        </div>
                        <div class="column">
                            <p class="is-size-6 has-text-grey">
                                To Date: {{ payslipData.to_date.split(" ")[0] }}
                            </p>
                        </div>
                    </div>
                    <!-- users detail -->

                    <!-- table -->

                    <table class="table is-fullwidth is-bordered">
                        <thead>
                            <tr>
                                <th class="has-text-weight-bold is-size-5">Particulars</th>
                                <th class="has-text-weight-bold is-size-5">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colspan="2" class="has-text-weight-bold is-size-6">Earnings</td>
                            </tr>
                            <template v-for="item in payslipData.details.component">
                                <tr v-if="item.type === 'Earning'">
                                    <td>{{ item.name }}</td>
                                    <td class="has-text-right">Rs. {{ item.amount.toLocaleString() }}</td>
                                </tr>
                            </template>
                            <tr>
                                <td class="has-text-grey">Total Earnings</td>
                                <td class="has-text-grey has-text-right">Rs. {{ getTotal("Earning",
                                    payslipData.details.component) }}</td>
                            </tr>
                            <tr>
                                <td colspan="2" class="has-text-weight-bold is-size-6">Deductions</td>
                            </tr>
                            <template v-for="item in payslipData.details.component">
                                <tr v-if="item.type === 'Deduction'">
                                    <td>{{ item.name }}</td>
                                    <td class="has-text-right">Rs. {{ item.amount.toLocaleString() }}</td>
                                </tr>
                            </template>
                            <tr>
                                <td class="has-text-grey">Total Deduction</td>
                                <td class="has-text-grey has-text-right">Rs. {{ getTotal("Deduction",
                                    payslipData.details.component).toLocaleString() }}</td>
                            </tr>
                            <tr>
                                <td class="is-size-5"><strong>Net Pay</strong></td>
                                <td class="has-text-right"> <strong>Rs. {{
                                    netPay(payslipData.details.component).toLocaleString() }}</strong>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <p class="has-text-grey">
                        Net Pay: Rs. {{ netPay(payslipData.details.component).toLocaleString() }}
                    </p>
                    <p class="has-text-grey">Amoumn in word: {{ toWords(netPay(payslipData.details.component)) }}</p>
                    <p class="mt-3 has-text-grey">**This is a system-generated payslip, so it does not require a
                        signature.
                    </p>
                </div>
            </div>

        </template>

        <template v-if="error != null">
            <p class="has-text-danger">{{ error }}</p>
        </template>
    </div>
</template>

<style scoped>
/* You can add custom styling here */
</style>
