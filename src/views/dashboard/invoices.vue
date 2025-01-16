<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';

import apiUser from '../../api-user'
import Sidebar from '../../components/dashboard/sidebar.vue'
import { useInvoicesStore } from '../../stores/invoices'
import { useModalStore } from '../../stores/modal'
import { displayMoneyFormat } from '../../utils/currency'

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

// Constants.
const router = useRouter()

const limit = 10

// Props.

// Data.
let search = ref('')
let currentPage = ref(1)

let dueDate = ref([new Date(Date.now()), new Date(Date.now())])

// Stores.
const invoicesStore = useInvoicesStore()
const modalStore = useModalStore()

// Mounted.
onMounted(() => {
    searchInvoices()
})

// Computed.

// Watchers.

// Methods.
const searchInvoices = (page?: number) => {
    // Set created at start and end times.
    dueDate.value[0].setHours(0, 0, 0, 0)
    dueDate.value[1].setHours(23, 59, 59, 0)

    // Build params.
    let params = {
        created_at: {
            start_date: dueDate.value[0],
            end_date: dueDate.value[1]
        },
        offset: 0,
        limit: limit
    }

    if (page && page > 1) {
        params.offset = (page-1) * limit
    }

    // Search invoices.
    invoicesStore.getInvoices(params)
    .then(() => {
        if (page) {
            currentPage.value = page
        } else {
            currentPage.value = 1
        }
    })
}

const nextPage = () => {
    if (currentPage.value >= getTotalPagesCount()) {
        return
    }

    searchInvoices(currentPage.value+1)
}

const prevPage = () => {
    if (currentPage.value <= 1) {
        return
    }

    searchInvoices(currentPage.value-1)
}

const createInvoice = () => {
    // Redirect to create invoice.
    router.push({ name: 'Invoice' })
}

const editInvoice = (id: number) => {
    // Redirect to edit invoice.
    router.push({ name: 'InvoiceEdit', params: { id } })
}

const viewInvoice = (hash: string) => {
    // Open new tab/window to view invoice.
    window.open('/invoice/' + hash, '_blank')
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
        modalStore.modal('error', 'Error', 'Error deleting invoice')
        return
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

const displayFirstLastName = (address: any): string => {
    let name = ''
    if (address.first_name !== '') {
        name = address.first_name
    }

    if (address.last_name !== '') {
        if (name !== '') {
            name += ' '
        }

        name += address.last_name
    }

    return name
}

const displayStateCountry = (address: any): string => {
    let ret = ''
    if (address.city) {
        ret = address.city
    }

    if (address.state) {
        if (ret !== '') {
            ret += ' '
        }

        ret += address.state
    }

    if (address.country) {
        if (ret !== '') {
            ret += ', '
        }

        ret += address.country
    }

    return ret
}

const getTotalPagesCount = (): number => {
    return Math.ceil(invoicesStore.totalCount/limit)
}

const getPages = (curPage: number, totalPages: number): Array<string> => {
    let result = []

    // Create a map that holds the previous
    // and following two page numbers.
    let surroundingPages = {} as any
    for (let i = curPage; i > 0; i--) {
        // Break if we're at 2 entries added.
        if (curPage-i > 2) {
            break
        }

        surroundingPages[i] = true
    }

    for (let i = curPage; i <= totalPages; i++) {
        // Break if we're at 2 entries added.
        if (i-curPage > 2) {
            break
        }

        surroundingPages[i] = true
    }

    // Create variable to store the last string
    // type added, so we can add an ellipsis
    // when needed.
    let lastStringType = ''

    // Start the loop.
    for (let i = 1; i <= totalPages; i++) {
        // If this is the first iteration.
        if (i === 1) {
            result.push('1')
            lastStringType = 'number'
            continue
        }

        // Handle first three pages.
        if (i <= 3) {
            result.push(i.toString())
            lastStringType = 'number'
            continue
        }

        // Handle surrounding pages.
        if (surroundingPages[i]) {
            result.push(i.toString())
            lastStringType = 'number'
            continue
        }

        // If the current iter is divisible by skip amount.
        if (i%10 === 0) {
            result.push(i.toString())
            lastStringType = 'number'
            continue
        }

        // If we're within 3 iterations of the last page.
        if (i+2 >= totalPages) {
            result.push(i.toString())
            lastStringType = 'number'
            continue
        }

        // If we got here, we're 'ghosting' in between
        // the pages or skip amounts, so let's see if
        // we should output an ellipsis.
        if (lastStringType === 'number') {
            result.push('...')
            lastStringType = 'ellipsis'
            continue
        }
    }

    return result
}

/* const getPagesString = (curPage: number, totalPages: number): string => {
    let result = ''

    // Create a map that holds the previous
    // and following two page numbers.
    let surroundingPages = {} as any
    for (let i = curPage; i > 0; i--) {
        // Break if we're at 2 entries added.
        if (curPage-i > 2) {
            break
        }

        surroundingPages[i] = true
    }

    for (let i = curPage; i <= totalPages; i++) {
        // Break if we're at 2 entries added.
        if (i-curPage > 2) {
            break
        }

        surroundingPages[i] = true
    }

    // Create variable to store the last string
    // type added, so we can add an ellipsis
    // when needed.
    let lastStringType = ''

    // Start the loop.
    for (let i = 1; i <= totalPages; i++) {
        // If this is the first iteration.
        if (i === 1) {
            result = '1'
            lastStringType = 'number'
            continue
        }

        // Handle first three pages.
        if (i <= 3) {
            result += '  ' + i.toString()
            lastStringType = 'number'
            continue
        }

        // Handle surrounding pages.
        if (surroundingPages[i]) {
            result += '  ' + i.toString()
            lastStringType = 'number'
            continue
        }

        // If the current iter is divisible by skip amount.
        if (i%10 === 0) {
            result += '  ' + i.toString()
            lastStringType = 'number'
            continue
        }

        // If we're within 3 iterations of the last page.
        if (i+2 >= totalPages) {
            result += '  ' + i.toString()
            lastStringType = 'number'
            continue
        }

        // If we got here, we're 'ghosting' in between
        // the pages or skip amounts, so let's see if
        // we should output an ellipsis.
        if (lastStringType === 'number') {
            result += '  ...'
            lastStringType = 'ellipsis'
            continue
        }
    }

    return result
} */

/* const displayStateCountry = (address: any): string => {
    let ret = ''
    if (address.city) {
        ret = address.city
    }

    if (address.state) {
        if (ret !== '') {
            ret += ', '
        }

        ret += address.state
    }

    if (address.country) {
        if (ret !== '' &&
            (address.city === '' || address.state === '')
        ) {
            ret += ', '
        } else if (ret !== '') {
            ret += ' '
        }

        ret += address.country
    }

    return ret
} */
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

                        <button class="green-bg" @click="searchInvoices()">Search</button>
                    </div>
                    <table class="table-general">
                        <thead>
                            <tr>
                                <th>Actions</th>
                                <th>ID</th>
                                <th>Bill To</th>
                                <th>Pay To</th>
                                <th>Status</th>
                                <th class="amount-paid-header">Amount Paid</th>
                                <th class="amount-due-header">Amount Due</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="invoice in invoicesStore.invoices">
                                <td>
                                    <button class="action" @click="editInvoice(invoice.id)">Edit</button>
                                    <button class="action" @click="viewInvoice(invoice.public_hash)">View</button>
                                    <button class="action red" @click="deleteInvoice(invoice.id)"><font-awesome-icon class="icon" icon="trash-can" /></button>
                                </td>
                                <td>{{ invoice.id }}</td>
                                <td class="bill-to-td">
                                    <div class="bill-to">
                                        <div v-if="displayFirstLastName(invoice.bill_to) !== ''">
                                            <div class="first-last-name">{{ displayFirstLastName(invoice.bill_to) }}</div>
                                        </div>
                                        <div v-if="invoice.bill_to.company !== ''" class="company">{{ invoice.bill_to.company }}</div>
                                        <div v-if="displayStateCountry(invoice.bill_to) !== ''" class="state-country">{{ displayStateCountry(invoice.bill_to) }}</div>
                                    </div>
                                </td>
                                <td class="pay-to-td">
                                    <div class="pay-to">
                                        <div v-if="displayFirstLastName(invoice.pay_to) !== ''">
                                            <div class="first-last-name">{{ displayFirstLastName(invoice.pay_to) }}</div>
                                        </div>
                                        <div v-if="invoice.pay_to.company !== ''" class="company">{{ invoice.pay_to.company }}</div>
                                        <div v-if="displayStateCountry(invoice.pay_to) !== ''" class="state-country">{{ displayStateCountry(invoice.pay_to) }}</div>
                                    </div>
                                </td>
                                <td class="status"><span :class="'status-' + invoice.status">{{ invoice.status }}</span></td>
                                <td class="amount-paid">{{ displayMoneyFormat(invoice.amount_paid, invoice.currency) }} <span class="currency">USD</span></td>
                                <td class="amount-due">{{ displayMoneyFormat(invoice.amount_due, invoice.currency) }} <span class="currency">USD</span></td>
                            </tr>
                        </tbody>
                    </table>

                    <div v-if="invoicesStore.invoices.length" class="pagination">
                        <div class="prev" @click="prevPage">< Prev</div>

                        <template v-for="page in getPages(currentPage, getTotalPagesCount())">
                            <div v-if="page !== '...'"
                                :class="{ 'page': true, 'selected': parseInt(page) === currentPage }"
                                @click="searchInvoices(parseInt(page))"
                            >{{ page }}</div>
                            <div v-else class="ellipsis">...</div>
                        </template>

                        <div class="next" @click="nextPage">Next ></div>
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
        margin: calc(-1 * var(--spacing)) 0 20px 0;

        h1 {
            margin: 0;
            padding: 0;
            color: #fff;
            font-size: var(--font-size-header);
            font-weight: var(--font-weight-500);
        }

        button {
            margin: 0;
            width: auto;
        }
    }

    .invoices-list {
        padding: var(--spacing) calc(var(--spacing-three) + 2px);
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 2px 1px 3px 0 rgba(37, 37, 37, 0.2);

        .search-wrapper {
            display: flex;
            margin: 0 0 var(--spacing-two) 0;
            justify-content: flex-start;
            gap: 8px;

            .field-datepicker {
                min-width: 240px;
            }

            button {
                flex: 0 1;
                margin: var(--spacing) 0 0 0;
                padding: var(--spacing-half) var(--spacing);
                font-size: var(--font-size-input);
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
                font-size: var(--font-size-small);

                td {
                    padding: 10px 0;
                }

                button.action {
                    font-size: var(--font-size-small);
                }

                .bill-to-td, .pay-to-td {
                    vertical-align: top;
                }

                .bill-to, .pay-to {
                    display: inline-block;
                    text-align: center;

                    .company {
                        color: #999;
                        font-size: var(--font-size-smaller);
                    }

                    .state-country {
                        font-size: var(--font-size-smaller);
                    }
                }

                .status {
                    .status-paid {
                        padding: var(--spacing-half) var(--spacing);
                        color: #fff;
                        font-size: var(--font-size-smallest);
                        font-weight: var(--font-weight-400);
                        text-transform: uppercase;
                        border-radius: var(--border-radius);
                        background-color: var(--invoice-status-paid-bg-color);
                    }

                    .status-pending {
                        padding: var(--spacing-half) var(--spacing);
                        color: #fff;
                        font-size: var(--font-size-smallest);
                        font-weight: var(--font-weight-400);
                        text-transform: uppercase;
                        border-radius: var(--border-radius);
                        background-color: var(--invoice-status-pending-bg-color);
                    }
                }

                .amount-paid {
                    text-align: right;
                }

                .amount-due {
                    text-align: right;
                }
            }
        }

        .pagination {
            display: flex;
            justify-content: center;
            gap: 4px;
            margin: var(--spacing-four) auto var(--spacing-two) auto;

            div {
                padding: var(--spacing) var(--spacing-two);
                font-size: var(--font-size-smaller);
                font-weight: var(--font-weight-600);
                background-color: #fff;
                border: 1px solid #e3e3e3;
                border-radius: 4px;
                cursor: pointer;

                &.page:hover,
                &.prev:hover,
                &.next:hover {
                    color: #fff;
                    background-color: #61a839;
                    border: 1px solid #61a839;
                }

                &.ellipsis {
                    padding: var(--spacing);
                    border: 0;
                    cursor: default;
                }

                &.selected {
                    color: #fff;
                    background-color: #61a839;
                    border: 1px solid #61a839;
                }
            }
        }

        .no-invoices {
            margin: var(--spacing-three) 0 0 0;
            flex: 1 1 auto;
            align-content: center;
            color: #555;
            text-align: center;
            text-shadow: 1px 1px 0px rgba(37, 37, 37, 0.2);

            .invoice-image {
                margin: 0 auto;

                svg {
                    width: 50px;
                    height: 50px;
                    filter: drop-shadow(2px 2px 0px rgba(37, 37, 37, 0.2));
                }
            }
        }
    }
}
</style>