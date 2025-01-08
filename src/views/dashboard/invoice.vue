<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import apiUser from '../../api-user'
import Sidebar from '../../components/dashboard/sidebar.vue'
import Money from '../../components/dashboard/money.vue'
import { displayMoneyFormat, percentageFromInt, RoundingType } from '../../utils/currency'

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import Maska from '../../components/dashboard/maska.vue'

// Constants.
const router = useRouter()
const route = useRoute()

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

type LineItem = {
    name: string
    description: string
    quantity: number
    price: number
    subtotal: number
}

type Invoice = {
    invoice_number: string
    po_number: string
    currency: string
    due_date: string
    message: string
    bill_to: BillTo,
    pay_to: PayTo,
    line_items: LineItem[]
    payment_methods: string[]
    tax_rate: string
    amount_due: number
}

let invoice = ref<Invoice>({
    invoice_number: "",
    po_number: "",
    currency: "USD",
    due_date: "",
    message: "",
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
    line_items: [{
        name: "",
        description: "",
        quantity: 0,
        price: 0,
        subtotal: 0
    }],
    payment_methods: ['card'],
    tax_rate: "",
    amount_due: 0
})

let dueDate = ref(new Date())

// Stores.

// Mounted.
onMounted(() => {
    // Load invoice if editing.
    if (route.params.id) {
        apiUser.getInvoice(parseInt(route.params.id as string))
        .then(res => res.json()).then(res => {
            invoice.value = res.data

            // Set due date.
            const end = new Date()
            end.setHours(23, 59, 59, 999)
            const endTimeUTC = end.toISOString().split('T')[1].split('.')[0]
            dueDate.value = new Date(invoice.value.due_date + ' ' + endTimeUTC + 'Z')
        })
    }
})

// Computed.
const totals = computed(() => {
    let ret = {
        subtotal: 0,
        tax: 0,
        total: 0
    }

    invoice.value.line_items.forEach((lineItem) => {
        ret.subtotal += lineItem.quantity * lineItem.price
    })

    // Calculate tax.
    const taxRate = parseFloat(invoice.value.tax_rate)
    if (!isNaN(taxRate)) {
        ret.tax = percentageFromInt(ret.subtotal, taxRate, 0, RoundingType.Bankers)
    }

    // Calculate total.
    ret.total = ret.subtotal + ret.tax

    return ret
})

// Watchers.

// Methods.
const create = () => {
    // Build the payload.
    const payload = { ...invoice.value }

    // Sanitize line items.
    // for (let lineItem of payload.line_items) {
    //     lineItem.price = lineItem.price
    // }

    // Set due date.
    // payload.due_date = dueDate.value.toJSON().slice(0, 10)
    let d = dueDate.value
    d.setHours(23, 59, 59, 999)
    payload.due_date = d.toISOString().split('T')[0]

    // Call the API.
    apiUser.createInvoice(payload)
    .then(res => res.json()).then(res => {
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

const update = (id: number) => {
    // Build the payload.
    const payload = { ...invoice.value }

    // Sanitize line items.
    // for (let lineItem of payload.line_items) {
    //     lineItem.price = lineItem.price
    // }

    // Set due date.
    // payload.due_date = dueDate.value.toJSON().slice(0, 10)
    let d = dueDate.value
    d.setHours(23, 59, 59, 999)
    payload.due_date = d.toISOString().split('T')[0]

    // Call the API.
    apiUser.updateInvoice(id, payload)
    .then(res => res.json()).then(res => {
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

const save = () => {
    if (route.params.id) {
        update(parseInt(route.params.id as string))
        return
    }

    create()
}

const addItem = () => {
    const newItem = {
        name: "",
        description: "",
        quantity: 0,
        price: 0,
        subtotal: 0
    }

    invoice.value.line_items.push(newItem)
}

const removeItem = (index: number) => {
    invoice.value.line_items.splice(index, 1)
}

const togglePaymentMethod = (method: string) => {
    if (invoice.value.payment_methods.includes(method)) {
        invoice.value.payment_methods = invoice.value.payment_methods.filter((value) => {
            return value !== method
        })

        return
    }

    invoice.value.payment_methods.push(method)
}

const datePickerFormat = (date: Date) => {
    const getSuffix = (num: number): any => {
        const suffixes = {
            '1': 'st',
            '21': 'st',
            '31': 'st',
            '2': 'nd',
            '22': 'nd',
            '3': 'rd',
            '23': 'rd'
        } as any

        return suffixes[num] || 'th'
    }

    let monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun",
        "Jul", "Aug", "Sep",
        "Oct", "Nov", "Dec"
    ];

    let dayIndex = date.getDate();
    let monthIndex = date.getMonth();
    let year = date.getFullYear();

    return monthNames[monthIndex] + ' ' + dayIndex + getSuffix(dayIndex) + ', ' + year;
}

const sanitizeFloat = (field: string) => {
    (invoice.value as any)[field] = (invoice.value as any)[field].replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
}
</script>

<template>
    <div class="dashboard-container">
        <Sidebar />

        <div class="content">
            <div class="invoice">
                <div class="header">
                    <h1>{{ route.params.id ? 'Update' : 'New' }} Invoice</h1>
                </div>

                <div class="invoice-form-wrap">
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
                                        <select id="bill-to-country" v-model="invoice.bill_to.country">
                                            <option value="" selected>Select country...</option>
                                            <option value="US">United States</option>
                                            <option value="CA">Canada</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="email-phone">
                                    <div class="field">
                                        <label for="bill-to-email">Email</label>
                                        <input id="bill-to-email" type="email" placeholder="email@example.com" v-model="invoice.bill_to.email" />
                                    </div>

                                    <div class="field">
                                        <label for="bill-to-phone">Phone</label>
                                        <Maska id="bill-to-phone" v-model="invoice.bill_to.phone" mask="(###) ###-####" placeholder="(555) 555-5555" />
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
                                        <select id="pay-to-country" v-model="invoice.pay_to.country">
                                            <option value="" selected>Select country...</option>
                                            <option value="US">United States</option>
                                            <option value="CA">Canada</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="email-phone">
                                    <div class="field">
                                        <label for="pay-to-email">Email</label>
                                        <input id="pay-to-email" type="email" placeholder="email@example.com" v-model="invoice.pay_to.email" />
                                    </div>

                                    <div class="field">
                                        <label for="pay-to-phone">Phone</label>
                                        <Maska id="pay-to-phone" v-model="invoice.pay_to.phone" mask="(###) ###-####" placeholder="(555) 555-5555" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="line-items">
                            <h3>Line Items</h3>

                            <table class="table-general">
                                <thead>
                                    <tr>
                                        <th>Name &amp; Description</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-for="(lineItem, index) in invoice.line_items">
                                        <tr>
                                            <td class="name">
                                                <div class="field">
                                                    <input type="text" placeholder="Name" v-model="lineItem.name" />
                                                </div>
                                            </td>
                                            <td class="quantity">
                                                <div class="field">
                                                    <input type="number" placeholder="0" step="1" v-model="lineItem.quantity" />
                                                </div>
                                            </td>
                                            <td class="price">
                                                <div class="field">
                                                    <Money v-model="lineItem.price" :currency="invoice.currency" />
                                                </div>
                                            </td>
                                            <td class="total">
                                                <div class="field">
                                                    {{ displayMoneyFormat(lineItem.quantity * lineItem.price, invoice.currency) }} <span class="currency">{{ invoice.currency }}</span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="description" colspan="3">
                                                <div class="field">
                                                    <input type="text" placeholder="Description" v-model="lineItem.description" />
                                                </div>
                                            </td>
                                            <td class="remove">
                                                <button class="action red" @click="removeItem(index)"><font-awesome-icon class="icon" icon="trash-can" /></button>
                                            </td>
                                        </tr>
                                    </template>
                                </tbody>
                            </table>

                            <!-- <div class="line-items">
                                <div class="header">
                                    <div>Name &amp; Description</div>
                                    <div>Quantity</div>
                                    <div>Price</div>
                                    <div>Total</div>
                                </div>
                                <div class="body">
                                    <div class="line-item">
                                        <div class="row">
                                            <div class="field">
                                                <input type="text" placeholder="Name" />
                                            </div>
                                            <div class="field">
                                                <input type="text" placeholder="Name" />
                                            </div>
                                            <div class="field">
                                                <input type="text" placeholder="Name" />
                                            </div>
                                            <div class="total">$100.00</div>
                                        </div>
                                    </div>
                                </div>
                            </div> -->

                            <div class="add-item" @click="addItem">+ Add Item</div>
                        </div>
                    </div>

                    <div class="details-totals">
                        <div class="details">
                            <h3>Details</h3>

                            <div class="invoice-po-number">
                                <div class="field">
                                    <label for="invoice-number">Invoice Number</label>
                                    <input id="invoice-number" type="text" placeholder="" v-model="invoice.invoice_number" />
                                </div>

                                <div class="field">
                                    <label for="po-number">PO Number</label>
                                    <input id="po-number" type="text" placeholder="" v-model="invoice.po_number" />
                                </div>
                            </div>

                            <div class="currency-due-date">
                                <div class="field">
                                    <label for="currency">Currency</label>
                                    <select id="currency" v-model="invoice.currency">
                                        <option value="USD">USD</option>
                                        <option value="CAD">CAD</option>
                                    </select>
                                </div>

                                <div class="field-datepicker">
                                    <label for="dp-input-due-date">Due Date</label>
                                    <VueDatePicker uid="due-date" v-model="dueDate" :enable-time-picker="false" :format="datePickerFormat" :clearable="false" auto-apply />
                                </div>
                            </div>

                            <div class="field">
                                <label for="message">Message</label>
                                <input id="message" type="text" placeholder="Thank you!" v-model="invoice.message" />
                            </div>
                        </div>

                        <div class="payment-methods">
                            <h3>Payment Methods</h3>

                            <div class="methods">
                                <div :class="{'method': true, 'card': true, 'selected': invoice.payment_methods.includes('card')}" @click="togglePaymentMethod('card')">
                                    <font-awesome-icon class="icon" icon="credit-card" />Card
                                </div>
                                <div :class="{'method': true, 'ach': true, 'selected': invoice.payment_methods.includes('ach')}" @click="togglePaymentMethod('ach')">
                                    <font-awesome-icon class="icon" icon="building-columns" />ACH
                                </div>
                            </div>
                        </div>

                        <div class="totals">
                            <h3>Totals</h3>

                            <table>
                                <tbody>
                                    <tr>
                                        <td>Subtotal</td>
                                        <td>{{ displayMoneyFormat(totals.subtotal, invoice.currency) }} <span class="currency">{{ invoice.currency }}</span></td>
                                    </tr>
                                    <tr>
                                        <td>Tax Rate</td>
                                        <td>
                                            <div class="field">
                                                <input id="tax-rate" class="tax-rate" type="text" placeholder="7.25" v-model="invoice.tax_rate" @input="sanitizeFloat('tax_rate')" /><span class="percentage">%</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Tax ({{ invoice.tax_rate }}%)</td>
                                        <td>{{ displayMoneyFormat(totals.tax, invoice.currency) }} <span class="currency">{{ invoice.currency }}</span></td>
                                    </tr>
                                </tbody>
                            </table>

                            <hr />

                            <div class="total">
                                <div>Total</div>
                                <div>{{ displayMoneyFormat(totals.total, invoice.currency) }} <span class="currency">{{ invoice.currency }}</span></div>
                            </div>
                        </div>

                        <button class="green-bg" @click="save">{{ route.params.id ? 'Update' : 'Create' }} Invoice</button>
                    </div>
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
            font-size: 1.8em;
            font-weight: 500;
        }

        button {
            margin: 0;
            width: auto;
        }
    }

    .invoice-form-wrap {
        display: flex;
        align-items: flex-start;
        gap: 20px;

        .invoice-form {
            flex: 1 1 auto;
            padding: 20px 24px;
            background-color: #fff;
            border-radius: 4px;
            box-shadow: 2px 1px 3px 0 rgba(37, 37, 37, 0.2);

            .two-columns {
                display: flex;
                gap: 20px;
            }

            .bill-to, .pay-to, .line-items, .details {
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
                flex: 1 1 auto;

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

            .line-items {
                margin: 24px 0 0 0;

                .table-general {
                    tbody {
                        tr {
                            td {
                                border-bottom: 0;
                            }

                            .name {
                                padding: 8px 8px 0 0;
                                width: 60%;
                            }

                            .quantity {
                                padding: 8px 8px 0 0;
                            }

                            .price {
                                padding: 8px 0 0 0;
                            }

                            .total {
                                padding: 0 0 0 8px;
                                font-weight: 600;
                                text-align: right;

                                .field {
                                    position: relative;
                                    top: 4px;
                                    min-width: 70px;
                                    font-size: 0.9em;

                                    .currency {
                                        display: block;
                                        position: relative;
                                        top: -3px;
                                    }
                                }
                            }

                            .description {
                                padding: 0 0 16px 0;
                                border-bottom: 1px solid #eee;
                            }

                            .remove {
                                padding: 0 0 16px 8px;
                                text-align: right;
                                border-bottom: 1px solid #eee;

                                button {
                                    margin: 8px 0 0 0;
                                }
                            }
                        }

                        tr:last-child {
                            .description {
                                padding: 0;
                                border-bottom: 0;
                            }

                            .remove {
                                padding: 0 0 0 8px;
                                border-bottom: 0;
                            }
                        }
                    }
                }

                .add-item {
                    margin: 16px 0 0 6px;
                    color: rgb(91, 144, 215);
                    font-size: 0.8em;
                    font-weight: 600;
                    cursor: pointer;
                }
            }

            .details {
                margin: 24px 0 0 0;
            }
        }

        .details-totals {
            padding: 20px 24px;
            max-width: 280px;
            min-width: 280px;
            background-color: #fff;
            border-radius: 4px;
            box-shadow: 2px 1px 3px 0 rgba(37, 37, 37, 0.2);

            .details {
                h3 {
                    margin: 0;
                    padding: 0;
                    font-size: 1.2em;
                    font-weight: 600;
                }

                .invoice-po-number {
                    display: flex;
                    gap: 8px;
                }

                .currency-due-date {
                    display: flex;
                    gap: 8px;

                    div:first-child {
                        flex: 1 1 35%;
                        max-width: 35%;

                        select {
                            width: 100%;
                        }
                    }
                }
            }

            .payment-methods {
                .methods {
                    display: flex;
                    gap: 8px;

                    .method {
                        padding: 0.6em 1.2em;
                        width: 100%;
                        color: #555;
                        font-size: 1em;
                        font-weight: 500;
                        font-family: inherit;
                        background-color: rgb(236, 236, 236);
                        border-radius: 4px;
                        border: 1px solid transparent;
                        text-align: center;
                        opacity: 0.4;
                        cursor: pointer;

                        svg {
                            margin: 0 8px 0 0;
                        }

                        &.selected {
                            color: #fff;
                            background-color: #61a839;
                            box-shadow: 0px 1px 2px 0px rgba(34, 34, 34, 0.16);
                            opacity: 1;
                        }
                    }
                }
            }

            .totals {
                table {
                    width: 100%;

                    td {
                        padding: 2px 0;
                        /* vertical-align: bottom; */

                        .field {
                            margin: 0;

                            input {
                                padding: 4px 8px;
                            }
                        }
                    }

                    td:first-child {
                        color: #bbb;
                        font-size: 0.8em;
                        font-weight: 600;
                    }

                    td:last-child {
                        font-size: 0.88em;
                        font-weight: 500;
                        text-align: right;
                    }

                    .field {
                        margin: 4px 0;
                    }

                    .currency {
                        color: #bbb;
                        font-size: 0.64em;
                        font-weight: 400;
                    }

                    .tax-rate {
                        display: inline-block;
                        max-width: 100px;
                        text-align: right;
                    }

                    .percentage {
                        margin: 0 0 0 4px;
                        font-size: 0.74em;
                        font-weight: 400;
                    }
                }

                .currency {
                    color: #bbb;
                    font-size: 0.64em;
                    font-weight: 400;
                }

                hr {
                    margin: 14px 0;
                    border: 0;
                    border-top: 1px solid #e3e3e3;
                }

                .total {
                    display: flex;

                    div:first-child {
                        flex: 1 1 auto;
                        font-weight: 500;
                    }

                    div:last-child {
                        padding: 0 0 0 8px;
                        color: #61a839;
                        font-weight: 600;
                        text-align: right;
                    }
                }
            }
        }
    }
}
</style>