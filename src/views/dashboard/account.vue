<script setup lang="ts">
import { ref, onMounted } from 'vue'

import apiUser from '../../api-user'
import Sidebar from '../../components/dashboard/sidebar.vue'
import { getParamError } from '../../helpers/errors';
import { capitalize } from '../../helpers/strings';
import { useUserStore } from '../../stores/user';

// Constants.

// Props.

// Data.
const email = ref<String>('')
const password = ref<String>('')

const errors = ref<any>([])

// Stores.
const userStore = useUserStore()

// Mounted.
onMounted(() => {
    userStore.getUser().then(() => {
        // Set user email.
        email.value = userStore.user.email
    })
})

// Computed.

// Watchers.

// Methods.
const update = () => {
    // Reset errors.
    errors.value = []

    // Build the payload.
    let payload = {} as any

    // Handle email.
    if (email.value) {
        payload.email = email.value
    }

    // Handle password.
    if (password.value) {
        payload.password = password.value
    }

    // Call the API.
    apiUser.updateUser(payload)
    .then(res => res.json()).then((res) => {
        // Handle errors.
        if (res.errors) {
            errors.value = res.errors
            return
        }
    }).catch((err) => {
        console.log('error: ' + err)
    })
}
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
                    <div class="field">
                        <label for="email">Email Address</label>
                        <input id="email" type="email" placeholder="email@example.com" v-model="email" />
                        <span v-if="getParamError(errors, 'email')" class="error">
                            {{ capitalize(getParamError(errors, 'email').detail) }}
                        </span>
                    </div>

                    <div class="field">
                        <label for="password">Password</label>
                        <input id="password" type="password" placeholder="" v-model="password" />
                        <span v-if="getParamError(errors, 'password')" class="error">
                            {{ capitalize(getParamError(errors, 'password').detail) }}
                        </span>
                    </div>

                    <button class="green-bg" @click="update">Update</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.account {
    margin: 0 auto;
    width: 100%;
    max-width: 500px;

    .header {
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

    .account-form {
        padding: 20px 24px;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 2px 1px 3px 0 rgba(37, 37, 37, 0.2);
    }
}
</style>