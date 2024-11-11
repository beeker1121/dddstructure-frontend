import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// CSS.
import './style.css'

// Create app.
const pinia = createPinia()
const app = createApp(App)

// Set pinia.
app.use(pinia)

// Set router.
app.use(router)

app.mount('#app')
