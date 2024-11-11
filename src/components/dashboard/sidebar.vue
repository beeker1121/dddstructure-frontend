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

        <router-link to="/dashboard">
            <font-awesome-icon class="icon" icon="chart-simple" />Dashboard
        </router-link>
        <router-link to="/dashboard/invoices">
            <font-awesome-icon class="icon" icon="file-invoice-dollar" />Invoices
        </router-link>
        <router-link to="/dashboard/account">
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
    box-shadow: 2px 0 3px 0 rgb(37, 37, 37, 0.2);
    z-index: 2;

    .logo {
        margin: 20px 0 26px 0;
        font-size: 1.5em;
        font-weight: 600;
        text-shadow: 2px 2px 0.7px #ddd;

        span {
            color:rgb(53, 131, 235);
        }
    }

    a {
        display: block;
        margin: 10px 0;
        font-weight: 300;
        color: #333;

        .icon {
            margin: 0 12px 0 0;
            color: rgb(53, 131, 235);
        }
    }
}
</style>