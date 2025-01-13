<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';

import api from '../api'
import { setJWT } from '../helpers/auth'
import Header from '../components/header.vue'
import { getParamError, getSingleError } from '../helpers/errors';
import { capitalize } from '../helpers/strings';
import { useUserStore } from '../stores/user';
import { displayMoneyFormat } from '../utils/currency'

// Constants.
const router = useRouter()

// Props.
// const props = defineProps({
//     prop1: String
// })

// Data.
const paymentMethodType = ref('card')
const paymentMethod = ref<any>({})
const errors = ref<any>([])

// Stores.
const userStore = useUserStore()

// Mounted.
onMounted(() => {
    // Reset errors.
    errors.value = []
})

// Computed.

// Watchers.

// Methods.
const getInvoice = () => {
}
</script>

<template>
    <div class="invoice-container">
        <div class="content">
            <div class="invoice-wrapper">
                <div class="invoice">
                    <div class="two-columns">
                        <div class="bill-to">
                            <h3>Bill to</h3>

                            <div class="inner">
                                <div class="name">John Doe</div>
                                <div class="company">Widgets, Inc</div>
                                <div class="address">123 Washington St Ste 4950</div>
                                <div class="city-state-postal-country">Chicago, IL 60545 US</div>
                            </div>
                        </div>

                        <div class="pay-to">
                            <h3>Pay to</h3>

                            <div class="inner">
                                <div class="name">Henry Smith</div>
                                <div class="address">123 Washington St</div>
                                <div class="city-state-postal-country">Chicago, IL 60545 US</div>
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
                                <template v-for="(lineItem, index) in [1]">
                                    <tr>
                                        <td class="name">
                                            Golang T-Shirt
                                        </td>
                                        <td class="quantity">
                                            12
                                        </td>
                                        <td class="price">
                                            {{ displayMoneyFormat(123, 'USD') }} <span class="currency">{{ 'USD' }}</span>
                                        </td>
                                        <td class="total">
                                            {{ displayMoneyFormat(123, 'USD') }} <span class="currency">{{ 'USD' }}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="description">
                                            Golang t-shirts with Golang Gopher, Men's, M, White
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>

                    <div class="message">Thank you for your business!</div>

                    <div class="support">If you have any issues or questions, please contact support at email@example.com or call (555) 555-5555</div>
                </div>

                <div class="payment">
                    <div class="invoice-po-num">
                        <div class="invoice-number">
                            <span>Invoice # </span> 00192837
                        </div>
                        <div class="po-number">
                            <span>PO # </span> 3984
                        </div>
                    </div>

                    <div class="payment-method">
                        <h3>Payment Method</h3>

                        <div class="methods">
                            <div :class="{'method': true, 'card': true, 'selected': paymentMethodType === 'card'}" @click="toggleType('card')">
                                <font-awesome-icon class="icon" icon="credit-card" />Card
                            </div>
                            <div :class="{'method': true, 'ach': true, 'selected': paymentMethodType === 'ach'}" @click="togglePaymentMethod('ach')">
                                <font-awesome-icon class="icon" icon="building-columns" />ACH
                            </div>
                        </div>

                        <div class="form">
                            <div class="card">
                                <div class="field">
                                    <label for="card-number">Card details</label>
                                    <input id="card-number" type="text" placeholder="4141 4141 4141 4141" />
                                </div>

                                <div class="exp-cvv">
                                    <div class="field">
                                        <input id="card-expiration" type="text" placeholder="MM/YY" />
                                    </div>
                                    <div class="field">
                                        <input id="card-cvv" type="text" placeholder="CVV" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="totals">
                        <h3>Totals</h3>

                        <table>
                            <tbody>
                                <tr>
                                    <td>Subtotal</td>
                                    <td>{{ displayMoneyFormat(123, 'USD') }} <span class="currency">{{ 'USD' }}</span></td>
                                </tr>
                                <tr>
                                    <td>Tax ({{ '1.25' }}%)</td>
                                    <td>{{ displayMoneyFormat(10, 'USD') }} <span class="currency">{{ 'USD' }}</span></td>
                                </tr>
                            </tbody>
                        </table>

                        <hr />

                        <div class="total">
                            <div>Total</div>
                            <div>{{ displayMoneyFormat(123, 'USD') }} <span class="currency">{{ 'USD' }}</span></div>
                        </div>
                    </div>

                    <button class="green-bg" @click="pay">Pay Now</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.invoice-container {
    display: flex;
    flex-direction: row;
    min-width: 100vh;
    min-height: 100vh;

    .content {
        display: flex;
        flex: 1 1 100%;
        padding: 28px 60px;
        background: linear-gradient(45deg, #3371c6 0%,#72a2e1 100%);

        h3 {
            padding: 0;
            font-size: 1.2em;
            font-weight: 600;
        }

        .invoice-wrapper {
            display: flex;
            flex-direction: row;
            gap: 28px;
            align-items: flex-start;
            justify-content: center;
            margin: 0 auto;
            width: 100%;

            .invoice {
                flex: 1 1 auto;
                padding: 20px 24px;
                max-width: 600px;
                background-color: #fff;
                border-radius: 4px;
                box-shadow: 2px 1px 3px 0 rgba(37, 37, 37, 0.2);

                h3 {
                    margin: 0;
                }

                .two-columns {
                    display: flex;
                    flex: 1 1 auto;
                    gap: 20px;
                }

                .bill-to, .pay-to {
                    display: flex;
                    flex-direction: column;
                    flex: 1 1 auto;

                    h3 {
                        margin: 0 0 8px 0;
                    }

                    .inner {
                        font-size: 0.88em;
                    }
                }

                .line-items {
                    margin: 24px 0 0 0;

                    .table-general {
                        tbody {
                            tr {
                                td {
                                    font-size: 0.88em;
                                    border-bottom: 0;
                                }

                                .name {
                                    padding: 8px 8px 0 0;
                                    width: 60%;
                                    font-weight: 500;
                                }

                                .quantity {
                                    padding: 8px 8px 0 0;
                                }

                                .price {
                                    padding: 8px 0 0 0;
                                }

                                .total {
                                    padding: 8px 0 0 8px;
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
                                    padding: 4px 0 16px 0;
                                    font-size: 0.78em;
                                    border-bottom: 1px solid #eee;
                                }
                            }

                            tr:last-child {
                                .description {
                                    padding: 4px 0 0 0;
                                    border-bottom: 0;
                                }

                                .remove {
                                    padding: 0 0 0 8px;
                                    border-bottom: 0;
                                }
                            }
                        }
                    }
                }

                .message {
                    margin: 32px auto 0 auto;
                    max-width: 400px;
                    font-size: 0.88em;
                    font-weight: 600;
                    text-align: center;
                }

                .support {
                    margin: 24px auto 0 auto;
                    max-width: 400px;
                    font-size: 0.78em;
                    text-align: center;
                }
            }

            .payment {
                padding: 20px 24px;
                max-width: 240px;
                min-width: 240px;
                background-color: #fff;
                border-radius: 4px;
                box-shadow: 2px 1px 3px 0 rgba(37, 37, 37, 0.2);

                h3 {
                    margin-top: 0;
                    padding: 0;
                    font-size: 1.2em;
                    font-weight: 600;
                }

                .invoice-po-num {
                    display: flex;
                    justify-content: space-between;
                    margin: 0 0 16px 0;
                    padding: 0 0 8px 0;
                    font-size: 0.7em;
                    font-weight: 500;
                    border-bottom: 1px solid #ddd;

                    span {
                        font-weight: 700;
                        text-transform: uppercase;
                    }
                }

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
                        user-select: none;

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

                .form {
                    margin: 16px 0 0 0;

                    .card {
                        .exp-cvv {
                            display: flex;
                            gap: 8px;
                        }
                    }
                }

                .totals {
                    h3 {
                        margin: 16px 0 8px 0;
                    }

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
                            color: #888;
                            font-size: 0.78em;
                            font-weight: 500;
                        }

                        td:last-child {
                            font-size: 0.88em;
                            font-weight: 600;
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
}
</style>