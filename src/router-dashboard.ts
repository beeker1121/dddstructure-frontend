import { initialAuthCheck } from './helpers/auth'

// Views.
import Dashboard from './views/dashboard/index.vue'
import Invoices from './views/dashboard/invoices.vue'
import Invoice from './views/dashboard/invoice.vue'
import Account from './views/dashboard/account.vue'

// Create routes.
const routes = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        beforeEnter: initialAuthCheck
    },
    {
        path: '/dashboard/invoices',
        name: 'Invoices',
        component: Invoices,
        beforeEnter: initialAuthCheck
    },
    {
        path: '/dashboard/invoice',
        name: 'Invoice',
        component: Invoice,
        beforeEnter: initialAuthCheck
    },
    {
        path: '/dashboard/account',
        name: 'Account',
        component: Account,
        beforeEnter: initialAuthCheck
    },
]

export default routes