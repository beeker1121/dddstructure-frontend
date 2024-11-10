import { initialAuthCheck } from './helpers/auth'

// Views.
import Dashboard from './views/dashboard/index.vue'
import Invoices from './views/dashboard/invoices.vue'

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
]

export default routes