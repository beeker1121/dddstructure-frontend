import { createRouter, createWebHistory } from "vue-router"

import routerDashboard from './router-dashboard'

// Views.
import Index from './views/index.vue'
import About from './views/about.vue'
import Signup from './views/signup.vue'
import Login from './views/login.vue'

// Create routes.
const routes = [
    { path: '/', name: 'Index', component: Index },
    { path: '/about', name: 'About', component: About },
    { path: '/signup', name: 'Signup', component: Signup },
    { path: '/login', name: 'Login', component: Login },

    // Dashboard routes.
    ...routerDashboard
]

// Create router.
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router