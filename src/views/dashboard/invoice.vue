<script setup lang="ts">
import { onMounted } from 'vue'

import Sidebar from '../../components/dashboard/sidebar.vue'
import { useInvoicesStore } from '../../stores/invoices'

// Constants.
// const router = useRouter()

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
})

// Computed.

// Watchers.
</script>

<template>
    <div class="dashboard-container">
        <Sidebar />

        <div class="content">
            <div class="invoice">
                <div class="header">
                    <h1>Create Invoice</h1>
                </div>

                <div class="invoice-form">
                    Create
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
        padding: 8px 14px;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 2px 1px 3px 0 rgba(37, 37, 37, 0.2);
    }
}
</style>