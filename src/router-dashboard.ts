import { initialAuthCheck } from './helpers/auth'

// Views.
import Dashboard from './views/dashboard/index.vue'

// Create routes.
const routes = {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: initialAuthCheck
}

export default routes