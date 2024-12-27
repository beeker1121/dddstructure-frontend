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
    company: string
    address_line_1: string
    address_line_2: string
    city: string
    state: string
    postal_code: string
    country: string
    email: string
    phone: string
}

type PayTo = {
    first_name: string
    last_name: string
    company: string
    address_line_1: string
    address_line_2: string
    city: string
    state: string
    postal_code: string
    country: string
    email: string
    phone: string
}

type Invoice = {
    bill_to: BillTo,
    pay_to: PayTo,
    amount_due: number
}

const invoice = ref<Invoice>({
    bill_to: {
        first_name: "",
        last_name: "",
        company: "",
        address_line_1: "",
        address_line_2: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
        email: "",
        phone: ""
    },
    pay_to: {
        first_name: "",
        last_name: "",
        company: "",
        address_line_1: "",
        address_line_2: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
        email: "",
        phone: ""
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
                    <div class="two-columns">
                        <div class="bill-to">
                            <h3>Bill to</h3>

                            <div class="name">
                                <div class="field">
                                    <label for="bill-to-first-name">First Name</label>
                                    <input id="bill-to-first-name" type="text" placeholder="" v-model="invoice.bill_to.first_name" />
                                </div>

                                <div class="field">
                                    <label for="bill-to-last-name">Last Name</label>
                                    <input id="bill-to-last-name" type="text" placeholder="" v-model="invoice.bill_to.last_name" />
                                </div>

                                <div class="field">
                                    <label for="bill-to-company">Company</label>
                                    <input id="bill-to-company" type="text" placeholder="" v-model="invoice.bill_to.company" />
                                </div>
                            </div>

                            <div class="address">
                                <div class="field">
                                    <label for="bill-to-address-line-1">Address Line 1</label>
                                    <input id="bill-to-address-line-1" type="text" placeholder="" v-model="invoice.bill_to.address_line_1" />
                                </div>

                                <div class="field">
                                    <label for="bill-to-address-line-2">Line 2</label>
                                    <input id="bill-to-address-line-2" type="text" placeholder="" v-model="invoice.bill_to.address_line_2" />
                                </div>
                            </div>

                            <div class="city-state-postal-country">
                                <div class="field">
                                    <label for="bill-to-city">City</label>
                                    <input id="bill-to-city" type="text" placeholder="" v-model="invoice.bill_to.city" />
                                </div>

                                <div class="field">
                                    <label for="bill-to-state">State</label>
                                    <input id="bill-to-state" type="text" placeholder="" v-model="invoice.bill_to.state" />
                                </div>

                                <div class="field">
                                    <label for="bill-to-postal-code">Postal Code</label>
                                    <input id="bill-to-postal-code" type="text" placeholder="" v-model="invoice.bill_to.postal_code" />
                                </div>

                                <div class="field">
                                    <label for="bill-to-country">Country</label>
                                    <input id="bill-to-country" type="text" placeholder="" v-model="invoice.bill_to.country" />
                                </div>
                            </div>

                            <div class="email-phone">
                                <div class="field">
                                    <label for="bill-to-email">Email</label>
                                    <input id="bill-to-email" type="email" placeholder="email@example.com" v-model="invoice.bill_to.email" />
                                </div>

                                <div class="field">
                                    <label for="bill-to-phone">Phone</label>
                                    <input id="bill-to-phone" type="text" placeholder="(555) 555-5555" v-model="invoice.bill_to.phone" />
                                </div>
                            </div>
                        </div>

                        <div class="pay-to">
                            <h3>Pay to</h3>

                            <div class="name">
                                <div class="field">
                                    <label for="pay-to-first-name">First Name</label>
                                    <input id="pay-to-first-name" type="text" placeholder="" v-model="invoice.pay_to.first_name" />
                                </div>

                                <div class="field">
                                    <label for="pay-to-last-name">Last Name</label>
                                    <input id="pay-to-last-name" type="text" placeholder="" v-model="invoice.pay_to.last_name" />
                                </div>

                                <div class="field">
                                    <label for="pay-to-company">Company</label>
                                    <input id="pay-to-company" type="text" placeholder="" v-model="invoice.pay_to.company" />
                                </div>
                            </div>

                            <div class="address">
                                <div class="field">
                                    <label for="pay-to-address-line-1">Address Line 1</label>
                                    <input id="pay-to-address-line-1" type="text" placeholder="" v-model="invoice.pay_to.address_line_1" />
                                </div>

                                <div class="field">
                                    <label for="pay-to-address-line-2">Line 2</label>
                                    <input id="pay-to-address-line-2" type="text" placeholder="" v-model="invoice.pay_to.address_line_2" />
                                </div>
                            </div>

                            <div class="city-state-postal-country">
                                <div class="field">
                                    <label for="pay-to-city">City</label>
                                    <input id="pay-to-city" type="text" placeholder="" v-model="invoice.pay_to.city" />
                                </div>

                                <div class="field">
                                    <label for="pay-to-state">State</label>
                                    <input id="pay-to-state" type="text" placeholder="" v-model="invoice.pay_to.state" />
                                </div>

                                <div class="field">
                                    <label for="pay-to-postal-code">Postal Code</label>
                                    <input id="pay-to-postal-code" type="text" placeholder="" v-model="invoice.pay_to.postal_code" />
                                </div>

                                <div class="field">
                                    <label for="pay-to-country">Country</label>
                                    <input id="pay-to-country" type="text" placeholder="" v-model="invoice.pay_to.country" />
                                </div>
                            </div>

                            <div class="email-phone">
                                <div class="field">
                                    <label for="pay-to-email">Email</label>
                                    <input id="pay-to-email" type="email" placeholder="email@example.com" v-model="invoice.pay_to.email" />
                                </div>

                                <div class="field">
                                    <label for="pay-to-phone">Phone</label>
                                    <input id="pay-to-phone" type="text" placeholder="(555) 555-5555" v-model="invoice.pay_to.phone" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="line-items">
                        <h3>Line Items</h3>
                    </div>

                    <div class="details">
                        <h3>Details</h3>

                        <br />  - Payment types (card, ach)
                        <br />  - Message

                        <div class="field">
                            <label for="amount-due">Amount Due</label>
                            <input id="amount-due" type="number" placeholder="" v-model="invoice.amount_due" />
                        </div>
                    </div>

                    <div>Totals
                        <br />  - Tax
                        <br />  - Adjustment (addition, discount)
                    </div>

                    <button class="green-bg" @click="create">Create Invoice</button>
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
        margin: 0 0 20px 0;

        h1 {
            margin: 0;
            padding: 0;
            color: #fff;
            font-size: 2.2em;
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

        .two-columns {
            display: flex;
            gap: 20px;
        }

        .bill-to, .pay-to, .line-items, .details {
            margin: 0 0 12px 0;

            h3 {
                margin: 0;
                padding: 0;
                font-size: 1.2em;
                font-weight: 600;
            }
        }

        .bill-to, .pay-to {
            display: flex;
            flex-direction: column;

            .name {
                display: flex;
                gap: 8px;

                .field {
                    flex: 1 1 auto;
                }
            }

            .address {
                display: flex;
                gap: 8px;

                .field:first-child {
                    flex: 1 1 70%;
                }
            }

            .city-state-postal-country {
                display: flex;
                gap: 8px;

                .field {
                    flex: 1 1 auto;
                }
            }

            .email-phone {
                display: flex;
                gap: 8px;

                .field {
                    flex: 1 1 auto;
                }
            }
        }
    }
}
</style>