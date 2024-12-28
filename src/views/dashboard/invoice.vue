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

                            <table>
                                <thead>
                                    <tr>
                                        <th>Name &amp; Description</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="name">
                                            <div class="field">
                                                <input type="text" placeholder="Name" />
                                            </div>
                                        </td>
                                        <td class="quantity">
                                            <div class="field">
                                                <input type="text" placeholder="0" />
                                            </div>
                                        </td>
                                        <td class="price">
                                            <div class="field">
                                                <input type="text" placeholder="0" />
                                            </div>
                                        </td>
                                        <td class="total">
                                            <div class="field">
                                                $100.00 <span class="currency">USD</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="description" colspan="3">
                                            <div class="field">
                                                <input type="text" placeholder="Description" />
                                            </div>
                                        </td>
                                    </tr>
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

                            <div class="add-item">+ Add Item</div>
                        </div>
                    </div>

                    <div class="details-totals">
                        <div class="details">
                            <h3>Details</h3>

                            <div class="invoice-po-number">
                                <div class="field">
                                    <label for="invoice-number">Invoice Number</label>
                                    <input id="invoice-number" type="text" placeholder="" />
                                </div>

                                <div class="field">
                                    <label for="po-number">PO Number</label>
                                    <input id="po-number" type="text" placeholder="" />
                                </div>
                            </div>

                            <div class="currency-due-date">
                                <div class="field">
                                    <label for="currency">Currency</label>
                                    <input id="currency" type="text" placeholder="USD" />
                                </div>

                                <div class="field">
                                    <label for="due-date">Due Date</label>
                                    <input id="due-date" type="text" placeholder="" />
                                </div>
                            </div>

                            <div class="field">
                                <label for="message">Message</label>
                                <input id="message" type="text" placeholder="Thank you!" />
                            </div>
                        </div>

                        <div class="payment-methods">
                            <h3>Payment Methods</h3>

                            <div class="methods">
                                <div class="method card selected">
                                    <font-awesome-icon class="icon" icon="credit-card" />Card
                                </div>
                                <div class="method ach">
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
                                        <td>$100.00 <span class="currency">USD</span></td>
                                    </tr>
                                    <tr>
                                        <td>Tax Rate</td>
                                        <td>
                                            <div class="field">
                                                <input id="tax-rate" class="tax-rate" type="text" placeholder="7.25" /><span class="percentage">%</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Tax (7.25%)</td>
                                        <td>$7.25 <span class="currency">USD</span></td>
                                    </tr>
                                </tbody>
                            </table>

                            <hr />

                            <div class="total">
                                <div>Total</div>
                                <div>$107.25 <span class="currency">USD</span></div>
                            </div>
                        </div>

                        <button class="green-bg" @click="create">Create Invoice</button>
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
            font-size: 2.2em;
            font-weight: 700;
            text-transform: uppercase;
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

                table {
                    width: 100%;
                    text-align: center;
                    border-spacing: 0;

                    thead {
                        font-size: 0.78em;

                        th {
                            padding: 12px 0;
                            color: #bbb;
                            /* font-size: 0.8em; */
                            font-weight: 600;
                            text-transform: uppercase;
                            border-bottom: 1px solid #e3e3e3;
                        }

                        th:first-child {
                            padding-left: 0;
                            text-align: left;
                        }

                        .amount-paid-header {
                            text-align: right;
                        }

                        .amount-due-header {
                            text-align: right;
                        }
                    }

                    tbody {
                        td {
                            .currency {
                                color: #bbb;
                                font-size: 0.64em;
                                font-weight: 400;
                            }
                        }

                        td:first-child {
                            text-align: left;
                        }

                        tr:last-child td {
                            border-bottom: 0;
                        }

                        .name {
                            padding: 0 8px 0 0;
                            width: 60%;
                        }

                        .quantity {
                            padding: 0 8px 0 0;
                        }

                        .total {
                            padding: 0 0 0 8px;
                            color: #61a839;
                            font-weight: 600;
                            text-align: right;

                            .field {
                                position: relative;
                                top: 6px;

                                .currency {
                                    display: block;
                                    position: relative;
                                    top: -4px;
                                }
                            }
                        }
                    }
                }

                .add-item {
                    margin: 8px 0 0 6px;
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