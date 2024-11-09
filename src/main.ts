import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

// CSS.
import './style.css'

// Create app.
const app = createApp(App)

// Set router.
app.use(router)

app.mount('#app')
