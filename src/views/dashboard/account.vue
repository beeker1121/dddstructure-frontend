<script setup lang="ts">
import { onMounted } from 'vue'

import Sidebar from '../../components/dashboard/sidebar.vue'

// Constants.

// Props.

// Data.

// Stores.

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
            <div class="account">
                <div class="header">
                    <h1>Account</h1>
                </div>

                <div class="account-form">
                    Edit
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.account {
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

    .account-form {
        padding: 20px 24px;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 2px 1px 3px 0 rgba(37, 37, 37, 0.2);
    }
}
</style>