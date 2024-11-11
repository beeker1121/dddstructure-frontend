import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPhone, faChartSimple, faFileInvoiceDollar, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from './App.vue'
import router from './router'

// CSS.
import './style.css'

// Handle Font Awesome.
library.add(
    faPhone,
    faChartSimple,
    faFileInvoiceDollar,
    faRightFromBracket
)

// Create app.
const pinia = createPinia()
const app = createApp(App)

// Set Font Awesome.
app.component('font-awesome-icon', FontAwesomeIcon)

// Set pinia.
app.use(pinia)

// Set router.
app.use(router)

app.mount('#app')
