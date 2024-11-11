<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router';

import Sidebar from '../../components/dashboard/sidebar.vue'
import { useInvoicesStore } from '../../stores/invoices'

// Constants.
const router = useRouter()

// Props.
// const props = defineProps({
//     prop1: String
// })

// Data.
// const email = ref<String>('')
// const password = ref<String>('')

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
</script>

<template>
    <div class="dashboard-container">
        <Sidebar />

        <div class="content">
            <div class="invoices">
                <div class="header">
                    <h1>Invoices</h1>
                    <button class="green" @click="createInvoice">New Invoice</button>
                </div>

                <div v-if="invoicesStore.invoices.length" class="invoices-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Actions</th>
                                <th>ID</th>
                                <th>Amount Paid</th>
                                <th>Amount Due</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="invoice in invoicesStore.invoices">
                                <td>
                                    <button class="action">Edit</button>
                                    <button class="action green">View</button>
                                    <button class="action red">Delete</button>
                                </td>
                                <td>{{ invoice.id }}</td>
                                <td>$0.00</td>
                                <td class="amount-due">${{ invoice.amount_due }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.invoices {
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

    .invoices-list {
        padding: 8px 14px;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 2px 1px 3px 0 rgba(37, 37, 37, 0.2);

        table {
            width: 100%;
            text-align: center;

            thead {
                th {
                    padding: 12px;
                    color: #999;
                    font-size: 0.76em;
                    font-weight: 300;
                    text-transform: uppercase;
                    border-bottom: 1px solid #f4f4f4;
                }
            }

            tbody {
                font-weight: 300;

                .amount-due {
                    color: #5bb32a;
                    font-size: 1.8em;
                    font-weight: 400;
                }
            }
        }
    }
}
</style>