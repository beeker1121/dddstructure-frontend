<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router';

import { clearJWT } from '../../helpers/auth'

// Constants.
const router = useRouter()

// Props.
// const props = defineProps({
//     prop1: String
// })

// Data.

// Mounted.
onMounted(() => {})

// Computed.

// Watchers.

// Methods.
const logout = () => {
    clearJWT()

    router.push({ name: 'Login' })
}
</script>

<template>
    <div class="sidebar">
        <div class="logo">
            <span>Simple</span>Invoicing
        </div>

        <router-link to="/dashboard" :class="{'selected': $route.name === 'Dashboard'}">
            <font-awesome-icon class="icon" icon="chart-simple" />Dashboard
        </router-link>
        <router-link to="/dashboard/invoices" :class="{'selected': $route.name === 'Invoices' || $route.name === 'Invoice' || $route.name === 'InvoiceEdit'}">
            <font-awesome-icon class="icon" icon="file-invoice-dollar" />Invoices
        </router-link>
        <router-link to="/dashboard/account" :class="{'selected': $route.name === 'Account'}">
            <font-awesome-icon class="icon" icon="user" />Account
        </router-link>
        <a href="#" @click.prevent="logout">
            <font-awesome-icon class="icon" icon="right-from-bracket" />Logout
        </a>
    </div>
</template>

<style scoped>
.sidebar {
    padding: 5px 28px;
    box-shadow: var(--box-shadow-container);
    z-index: 2;

    .logo {
        margin: var(--spacing-three) 0 26px 0;
        font-size: var(--font-size-logo-sidebar);
        font-weight: var(--font-weight-600);
        text-shadow: 2px 2px 0.7px #ddd;

        span {
            color:rgb(53, 131, 235);
        }
    }

    a {
        display: block;
        margin: calc(var(--spacing-two) - 2px) 0;
        font-weight: 400;
        color: #555;
        opacity: 0.7;

        .icon {
            margin: 0 calc(var(--spacing) + 4px) 0 0;
            opacity: 0.5;
        }
    }

    a:hover,
    a.selected {
        font-weight: var(--font-weight-500);
        opacity: 1;

        .icon {
            color: rgb(53, 131, 235);
            opacity: 1;
        }
    }
}
</style>