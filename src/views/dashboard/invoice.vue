<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';

import apiUser from '../../api-user'
import Sidebar from '../../components/dashboard/sidebar.vue'

// Constants.
const router = useRouter()

// Props.

// Data.
type BillTo = {
    first_name: string
    last_name: string
}

type PayTo = {
    first_name: string
    last_name: string
}

type Invoice = {
    bill_to: BillTo,
    pay_to: PayTo,
    amount_due: number
}

let invoice = ref<Invoice>({
    bill_to: {
        first_name: "",
        last_name: ""
    },
    pay_to: {
        first_name: "",
        last_name: ""
    },
    amount_due: 0
})

// Stores.

// Mounted.
onMounted(() => {
    console.log('mounted')
})

// Computed.

// Watchers.

// Methods.
const create = () => {
    // Build the payload.
    const payload = { ...invoice.value }

    // Call the API.
    apiUser.createInvoice(payload)
    .then(res => res.json()).then((res) => {
        // Handle errors.
        if (res.errors) {
            console.log('errors: ' + res.errors)
            return
        }

        // Redirect to invoices.
        router.push({ name: 'Invoices' })
    }).catch((err) => {
        console.log('error: ' + err)
    })
}
</script>

<template>
    <div class="dashboard-container">
        <Sidebar />

        <div class="content">
            <div class="invoice">
                <div class="header">
                    <h1>New Invoice</h1>
                </div>

                <div class="invoice-form">
                    <div class="bill-to">
                        <h3>Bill to</h3>

                        <div class="field">
                            <label for="bill-to-first-name">First Name</label>
                            <input id="bill-to-first-name" type="text" placeholder="" v-model="invoice.bill_to.first_name" />
                        </div>

                        <div class="field">
                            <label for="bill-to-last-name">Last Name</label>
                            <input id="bill-to-last-name" type="text" placeholder="" v-model="invoice.bill_to.last_name" />
                        </div>
                    </div>

                    <div class="pay-to">
                        <h3>Pay to</h3>

                        <div class="field">
                            <label for="pay-to-first-name">First Name</label>
                            <input id="pay-to-first-name" type="text" placeholder="" v-model="invoice.pay_to.first_name" />
                        </div>

                        <div class="field">
                            <label for="pay-to-last-name">Last Name</label>
                            <input id="pay-to-last-name" type="text" placeholder="" v-model="invoice.pay_to.last_name" />
                        </div>
                    </div>

                    <div class="details">
                        <h3>Details</h3>

                        <div class="field">
                            <label for="amount-due">Amount Due</label>
                            <input id="amount-due" type="number" placeholder="" v-model="invoice.amount_due" />
                        </div>
                    </div>

                    <button class="green" @click="create">Submit</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.invoice {
    width: 100%;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin: 0 0 20px 0;

        h1 {
            margin: 0;
            padding: 0;
            color: #fff;
            font-size: 2.6em;
            font-weight: 700;
            text-transform: uppercase;
        }

        button {
            margin: 0;
            width: auto;
        }
    }

    .invoice-form {
        padding: 20px 24px;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 2px 1px 3px 0 rgba(37, 37, 37, 0.2);

        .bill-to, .pay-to, .details {
            margin: 0 0 12px 0;

            h3 {
                margin: 0;
                padding: 0;
                font-size: 1.4em;
                font-weight: 700;
            }
        }
    }
}
</style>