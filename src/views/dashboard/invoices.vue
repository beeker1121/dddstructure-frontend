<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router';

import Sidebar from '../../components/dashboard/sidebar.vue'
import { useInvoicesStore } from '../../stores/invoices'

// Constants.
const router = useRouter()

// Props.

// Data.

// Stores.
const invoicesStore = useInvoicesStore()

// Mounted.
onMounted(() => {
    console.log('mounted')

    invoicesStore.getInvoices()
})

// Computed.

// Watchers.

// Methods.
const createInvoice = () => {
    // Redirect to create invoice.
    router.push({ name: 'Invoice' })
}

const editInvoice = (id: number) => {
    // Redirect to edit invoice.
    console.log('going')
    router.push({ name: 'InvoiceEdit', params: { id } })
}
</script>

<template>
    <div class="dashboard-container">
        <Sidebar />

        <div class="content">
            <div class="invoices">
                <div class="header">
                    <h1>Invoices</h1>
                    <button @click="createInvoice">New Invoice</button>
                </div>

                <div v-if="invoicesStore.invoices.length" class="invoices-list">
                    <table class="table-general">
                        <thead>
                            <tr>
                                <th>Actions</th>
                                <th>ID</th>
                                <th>Bill To</th>
                                <th>Pay To</th>
                                <th class="amount-paid-header">Amount Paid</th>
                                <th class="amount-due-header">Amount Due</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="invoice in invoicesStore.invoices">
                                <td>
                                    <button class="action" @click="editInvoice(invoice.id)">Edit</button>
                                    <button class="action">View</button>
                                    <button class="action red"><font-awesome-icon class="icon" icon="trash-can" /></button>
                                </td>
                                <td>{{ invoice.id }}</td>
                                <td class="bill-to-td">
                                    <div class="bill-to">
                                        <div v-if="invoice.bill_to.first_name !== '' && invoice.bill_to.last_name !== ''">
                                            <div class="first-last-name">{{ invoice.bill_to.first_name }} {{ invoice.bill_to.last_name }}</div>
                                            <div v-if="invoice.bill_to.company !== ''" class="company">{{ invoice.bill_to.company }}</div>
                                        </div>
                                        <div v-else-if="invoice.bill_to.company !== ''" class="company">{{ invoice.bill_to.company }}</div>
                                        <div class="state-country">{{ invoice.bill_to.city }} {{ invoice.bill_to.state }}, {{ invoice.bill_to.country }}</div>
                                    </div>
                                </td>
                                <td class="pay-to-td">
                                    <div class="pay-to">
                                        <div v-if="invoice.pay_to.first_name !== '' && invoice.pay_to.last_name !== ''">
                                            <div class="first-last-name">{{ invoice.pay_to.first_name }} {{ invoice.pay_to.last_name }}</div>
                                            <div v-if="invoice.pay_to.company !== ''" class="company">{{ invoice.pay_to.company }}</div>
                                        </div>
                                        <div v-else-if="invoice.pay_to.company !== ''" class="company">{{ invoice.pay_to.company }}</div>
                                        <div class="state-country">{{ invoice.pay_to.city }} {{ invoice.pay_to.state }}, {{ invoice.pay_to.country }}</div>
                                    </div>
                                </td>
                                <td class="amount-paid">$0.00 <span class="currency">USD</span></td>
                                <td class="amount-due">${{ invoice.amount_due }}.00 <span class="currency">USD</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else class="no-invoices">
                    <div class="invoice-image">
                        <font-awesome-icon class="icon" icon="file-invoice-dollar" />
                    </div>

                    <h3>No invoices!</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.invoices {
    display: flex;
    flex-direction: column;
    width: 100%;

    .header {
        flex: 0 1 auto;
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

    .invoices-list {
        padding: 8px 26px;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 2px 1px 3px 0 rgba(37, 37, 37, 0.2);

        .table-general {
            thead {
                .amount-paid-header {
                    text-align: right;
                }

                .amount-due-header {
                    text-align: right;
                }
            }

            tbody {
                font-size: 0.88em;

                td {
                    padding: 10px 0;
                }

                button.action {
                    font-size: 0.88em;
                    font-weight: 600;
                }

                .bill-to-td, .pay-to-td {
                    vertical-align: top;
                }

                .bill-to, .pay-to {
                    display: inline-block;
                    text-align: center;

                    .company {
                        color: #999;
                        font-size: 0.8em;
                    }

                    .state-country {
                        font-size: 0.8em;
                    }
                }

                .amount-paid {
                    font-size: 1.3em;
                    font-weight: 600;
                    text-align: right;
                }

                .amount-due {
                    color: #61a839;
                    font-size: 1.3em;
                    font-weight: 600;
                    text-align: right;
                }
            }
        }
    }

    .no-invoices {
        flex: 1 1 auto;
        align-content: center;
        color: #fff;
        text-align: center;

        .invoice-image {
            margin: 0 auto;

            svg {
                width: 100px;
                height: 100px;
            }
        }
    }
}
</style>