<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';

import apiUser from '../../api-user'
import Sidebar from '../../components/dashboard/sidebar.vue'
import { useInvoicesStore } from '../../stores/invoices'

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

// Constants.
const router = useRouter()

// Props.

// Data.
let search = ref('')

let dueDate = ref([new Date(Date.now()), new Date(Date.now())])

// Stores.
const invoicesStore = useInvoicesStore()

// Mounted.
onMounted(() => {
    searchInvoices()
})

// Computed.

// Watchers.

// Methods.
const searchInvoices = () => {
    // Set created at start and end times.
    dueDate.value[0].setHours(0, 0, 0, 0)
    dueDate.value[1].setHours(23, 59, 59, 0)

    // Search invoices.
    invoicesStore.getInvoices({
        created_at: {
            start_date: dueDate.value[0],
            end_date: dueDate.value[1]
        }
    })
}

const createInvoice = () => {
    // Redirect to create invoice.
    router.push({ name: 'Invoice' })
}

const editInvoice = (id: number) => {
    // Redirect to edit invoice.
    router.push({ name: 'InvoiceEdit', params: { id } })
}

const deleteInvoice = (id: number) => {
    // Call the API.
    apiUser.deleteInvoice(id)
    .then(res => {
        // Handle errors.
        if (res.status !== 200) {
            res.json().then(res => {
                if (res.errors) {
                    return
                }
            })
        }

        searchInvoices()
    }).catch((err) => {
        console.log('error: ' + err)
    })
}

const datePickerFormat = (date: [Date, Date]) => {
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

    // Handle start date.
    const startDate = date[0]
    const startDateStr = monthNames[startDate.getMonth()] + ' ' +
        startDate.getDate() + getSuffix(startDate.getDate()) + ', ' +
        startDate.getFullYear();
    
    // Handle end date.
    const endDate = date[1]
    const endDateStr = monthNames[endDate.getMonth()] + ' ' +
        endDate.getDate() + getSuffix(endDate.getDate()) + ', ' +
        endDate.getFullYear();

    return startDateStr + ' to ' + endDateStr
}
</script>

<template>
    <div class="dashboard-container">
        <Sidebar />

        <div class="content">
            <div class="invoices">
                <div class="header">
                    <h1>Invoices</h1>
                    <button class="green-bg" @click="createInvoice">+ New Invoice</button>
                </div>

                <div class="invoices-list">
                    <div class="search-wrapper">
                        <div class="field">
                            <input id="search" type="text" placeholder="Search by ID, name, amount..." v-model="search" />
                        </div>

                        <div class="field-datepicker">
                            <VueDatePicker v-model="dueDate" :enable-time-picker="false" :format="datePickerFormat" :clearable="false" range auto-apply />
                        </div>

                        <button class="green-bg" @click="searchInvoices">Search</button>
                    </div>
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
                                    <button class="action red" @click="deleteInvoice(invoice.id)"><font-awesome-icon class="icon" icon="trash-can" /></button>
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

                    <div v-if="invoicesStore.invoices.length" class="pagination-two">
                        <div class="prev">< Prev</div>
                        <div class="page selected">1</div>
                        <div class="page">2</div>
                        <div class="ellipsis">...</div>
                        <div class="page">6</div>
                        <div class="page">7</div>
                        <div class="next">Next ></div>
                    </div>

                    <div v-if="!invoicesStore.invoices.length" class="no-invoices">
                        <div class="invoice-image">
                            <font-awesome-icon class="icon" icon="file-invoice-dollar" />
                        </div>

                        <h3>No invoices!</h3>
                    </div>
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
        align-items: flex-end;
        margin: -8px 0 20px 0;

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

        .search-wrapper {
            display: flex;
            margin: 0 0 16px 0;
            justify-content: flex-start;
            gap: 8px;

            .field-datepicker {
                min-width: 240px;
            }

            button {
                flex: 0 1;
                margin: 8px 0 0 0;
                padding: 4px 8px;
                font-size: 0.8em;
            }
        }

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

        .pagination-two {
            display: flex;
            justify-content: center;
            gap: 4px;
            margin: 32px auto 16px auto;

            div {
                padding: 8px 16px;
                font-size: 0.8em;
                font-weight: 600;
                background-color: #fff;
                border: 1px solid #e3e3e3;
                border-radius: 4px;
                cursor: pointer;

                &.selected {
                    background-color: #61a839;
                    color: #fff;
                }
            }
        }

        .no-invoices {
            margin: 24px 0 0 0;
            flex: 1 1 auto;
            align-content: center;
            color: #555;
            text-align: center;
            text-shadow: 2px 1px 3px rgba(37, 37, 37, 0.2);

            .invoice-image {
                margin: 0 auto;

                svg {
                    width: 50px;
                    height: 50px;
                    filter: drop-shadow(2px 1px 3px rgba(37, 37, 37, 0.2));
                }
            }
        }
    }
}
</style>