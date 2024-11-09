<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';

import api from '../api'
import { setJWT } from '../helpers/auth'

// Constants.
const router = useRouter()

// Props.
// const props = defineProps({
//     prop1: String
// })

// Data.
const email = ref<String>('')
const password = ref<String>('')

// Mounted.
onMounted(() => {
    console.log('mounted')
})

// Computed.

// Watchers.

// Methods.
const login = () => {
    // Build the payload.
    const payload = {
        email: email.value,
        password: password.value
    }

    // Call the API.
    api.login(payload)
    .then(res => res.json()).then((res) => {
        console.log(res)

        // Set JWT.
        setJWT('jklmvelakjelfka.lkjflekavlm.ajlkejflkajf')

        // Redirect to dashboard.
        router.push('/dashboard')
    }).catch((err) => {
        console.log('error: ' + err)

        // Set JWT.
        setJWT('jklmvelakjelfka.lkjflekavlm.ajlkejflkajf')

        // Redirect to dashboard.
        router.push('/dashboard')
    })
}
</script>

<template>
    <div class="login">
        <div class="login-container">
            <div class="logo">
                <span>Simple</span>Invoicing
            </div>

            <hr />

            <div class="form">
                <div class="field email">
                    <label for="email">Email Address</label>
                    <input id="email" type="email" placeholder="email@example.com" v-model="email" />
                </div>
                <div class="field password">
                    <label for="password">password</label>
                    <input id="password" type="password" placeholder="" v-model="password" />
                </div>

                <button class="submit" @click="login">Login</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.login {
    display: flex;
    place-items: center;
    flex: 1;
    background-color: #ccc;
    background-image: linear-gradient(to right top, #b9b9b9, #b6b6b6, #b3b3b3, #b1b1b1, #aeaeae, #b0b0b0, #b2b2b2, #b4b4b4, #bcbcbc, #c3c3c3, #cbcbcb, #d3d3d3);

    .login-container {
        margin: 0 auto;
        padding: 14px 42px 26px 42px;
        background-color: #fff;
        box-shadow: 0px 0px 8px 1px rgba(37, 37, 37, 0.17);
        border-radius: 4px;

        .logo {
            margin: 0;
            font-size: 2em;
            font-weight: 600;
            text-shadow: 2px 2px 0.7px #ddd;

            span {
                color:rgb(53, 131, 235);
            }
        }

        hr {
            margin: 14px 0;
            border: 0;
            border-top: 1px solid #eee;
        }

        .form {
            .field {
                margin: 12px 0 0 0;
            }

            label {
                display: block;
                margin: 0 0 2px 0;
                font-size: 0.72em;
                font-weight: 500;
                text-transform: uppercase;
            }

            input {
                margin: 0;
                padding: 10px 8px;
                width: 100%;
                border: 1px solid #e3e3e3;
                border-radius: 4px;
                box-sizing: border-box;
            }
        }
    }
}
</style>