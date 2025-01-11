import { createApp } from 'vue'

import Notifications from './views/dashboard/notifications.vue'
import Modal from './views/dashboard/modal.vue'

import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPhone, faChartSimple, faFileInvoiceDollar, faRightFromBracket, faUser, faTrashCan, faCreditCard, faMoneyBillTransfer, faBuildingColumns } from '@fortawesome/free-solid-svg-icons'
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
    faRightFromBracket,
    faUser,
    faTrashCan,
    faCreditCard,
    faMoneyBillTransfer,
    faBuildingColumns
)

// Create app.
const pinia = createPinia()
const app = createApp(App)

// Set components.
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('notifications', Notifications)
app.component('modal', Modal)

// Set pinia.
app.use(pinia)

// Set router.
app.use(router)

app.mount('#app')
