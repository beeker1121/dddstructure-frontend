<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';

import api from '../api'
import { setJWT } from '../helpers/auth'
import Header from '../components/header.vue'
import { getParamError } from '../helpers/errors';
import { capitalize } from '../helpers/strings';

// Constants.
const router = useRouter()

// Props.
// const props = defineProps({
//     prop1: String
// })

// Data.
const email = ref<String>('')
const password = ref<String>('')

const errors = ref<any>([])

// Stores.

// Mounted.
onMounted(() => {
    console.log('mounted')
})

// Computed.

// Watchers.

// Methods.
const signup = () => {
    // Reset errors.
    errors.value = []

    // Build the payload.
    const payload = {
        email: email.value,
        password: password.value
    }

    // Call the API.
    api.signup(payload)
    .then(res => res.json()).then((res) => {
        // Handle errors.
        if (res.errors) {
            errors.value = res.errors
            return
        }

        // Set JWT.
        setJWT(res.data)

        // Redirect to dashboard.
        router.push({ name: 'Dashboard' })
    }).catch((err) => {
        console.log('error: ' + err)
    })
}
</script>

<template>
    <div class="home-container">
        <Header />

        <div class="content">
            <div class="signup">
                <div class="signup-container">
                    <div class="logo">
                        <span>Simple</span>Invoicing
                    </div>

                    <hr />

                    <div class="form">
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

                        <button class="submit" @click="signup">Signup</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.signup {
    display: flex;
    width: 100%;
    place-items: center;

    .signup-container {
        margin: 0 auto;
        padding: 14px 42px 26px 42px;
        background-color: #fff;
        box-shadow: 0px 0px 8px 1px rgba(37, 37, 37, 0.17);
        border-radius: 4px;

        .logo {
            margin: 0;
            font-size: 2.4em;
            font-weight: 600;
            text-shadow: 2px 2px 0.7px #ddd;

            span {
                color:rgb(53, 131, 235);
            }
        }

        hr {
            margin: 14px 0;
            border: 0;
            border-top: 1px solid #f4f4f4;
        }
    }
}
</style>