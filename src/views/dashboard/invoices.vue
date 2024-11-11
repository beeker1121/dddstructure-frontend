<script setup lang="ts">
import Sidebar from '../../components/dashboard/sidebar.vue'
</script>

<template>
    <div class="dashboard-container">
        <Sidebar />

        <div class="content">
            <div class="invoices">
                <h1>Invoices</h1>

                <div class="invoices-list">
                    <div class="invoice">this will be an invoice</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.invoices {
    width: 100%;

    h1 {
        margin: 0 0 20px 0;
        padding: 0;
        color: #fff;
        font-size: 2.6em;
        font-weight: 700;
        text-transform: uppercase;
    }

    .invoices-list {
        padding: 8px 14px;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 2px 1px 3px 0 rgba(37, 37, 37, 0.2);
    }
}
</style>