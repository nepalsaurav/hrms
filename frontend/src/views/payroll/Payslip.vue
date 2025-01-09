<script setup>
import { ref } from "vue";
import { toWords } from 'number-to-words';
import BreadCrumb from "@/components/BreadCrumb.vue";
import { useVueToPrint } from "vue-to-print";
const componentRef = ref();
const payslipData = ref({
    employee: "Rashmita Dahal",
    fromDate: "2024-12-12",
    toDate: "2024-12-26",
    component: [
        { amount: 17700, name: "Basic Salary", type: "Earning" },
        {
            amount: 1770,
            name: "Unpaid Leave Deduction",
            type: "Deduction",
        },
        {
            amount: 8700,
            name: "Dearness Allowance",
            type: "Earning",
        },
        { amount: 3500, name: "Allowance", type: "Earning" },
        {
            amount: 1947,
            name: "Social Security Fund",
            type: "Deduction",
        },
    ],
    grossSalary: 17700,
    netSalary: 15930,
});

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
  documentTitle: `Payslip ${payslipData.value.employee}`,
});


</script>

<template>
     <BreadCrumb :links="[
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
         }
     ]"/>

     <div class="is-flex is-flex-direction-row-reverse">
        <button class="button is-light mb-2 mr-4" @click="handlePrint"><i class="bi bi-printer"></i></button>
     </div>
    <div class="card" ref="componentRef">
        <div class="card-content">
            <!-- company details -->
            <div class="columns is-centered">
                <div class="column is-half">
                    <img src="https://abc.com.np/images/abc_logo.svg" class="image is-128x128" alt="company logo" />
                    <p class="is-size-4 has-text-weight-bold">
                        ABC Securities pvt.ltd.
                    </p>
                    <p>Indrachowk-24, Kathmandu</p>
                    <p>+977 01-5970117</p>
                </div>
            </div>
            <!-- company details -->
            <div class="columns">
                <div class="column">
                    <p class="is-size-6 has-text-grey">
                        Employee: {{ payslipData.employee }}
                    </p>
                </div>
                <div class="column">
                    <p class="is-size-6 has-text-grey">
                        From Date: {{ payslipData.fromDate }}
                    </p>
                </div>
                <div class="column">
                    <p class="is-size-6 has-text-grey">
                        To Date: {{ payslipData.toDate }}
                    </p>
                </div>
            </div>
            <!-- users detail -->

            <!-- table -->
            <div class="columns">
                <div class="column">
                    <table class="table is-fullwidth is-bordered">
                        <thead>
                            <tr>
                                <th>Earnings</th>
                                <th>Amount</th>

                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="item in payslipData.component">
                                <tr v-if="item.type === 'Earning'">
                                    <td>{{ item.name }}</td>
                                    <td class="has-text-right">Rs. {{ item.amount.toLocaleString() }}</td>
                                </tr>
                            </template>
                            <tr>
                                <td class="has-text-grey">Total Earnings</td>
                                <td class="has-text-grey has-text-right">Rs. {{ getTotal("Earning", payslipData.component) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="column">
                    <table class="table is-fullwidth is-bordered">
                        <thead>
                            <tr>
                                <th>Deductions</th>
                                <th>Amount</th>

                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="item in payslipData.component">
                                <tr v-if="item.type === 'Deduction'">
                                    <td>{{ item.name }}</td>
                                    <td class="has-text-right">Rs. {{ item.amount.toLocaleString() }}</td>
                                </tr>
                            </template>
                            <tr>
                                <td class="has-text-grey">Total Deduction</td>
                                <td class="has-text-grey has-text-right">Rs. {{ getTotal("Deduction", payslipData.component).toLocaleString() }}</td>
                            </tr>
                            <tr>
                                <td class="is-size-5"><strong>Net Pay</strong></td>
                                <td class="has-text-right"> <strong>Rs. {{ netPay(payslipData.component).toLocaleString() }}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>


            </div>

            <p class="has-text-grey">
                Net Pay:  Rs. {{ netPay(payslipData.component).toLocaleString() }}
            </p>
            <p class="has-text-grey">Amoumn in word: {{ toWords(netPay(payslipData.component)) }}</p>
            <p class="mt-3 has-text-grey">**This is a system-generated payslip, so it does not require a signature.</p>
        </div>

    </div>
</template>

<style scoped>
/* You can add custom styling here */
</style>
