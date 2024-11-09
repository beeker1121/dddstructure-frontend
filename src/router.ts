import { createRouter, createWebHistory } from "vue-router"

import routerDashboard from './router-dashboard'

// Views.
import Home from './views/home.vue'
import About from './views/about.vue'
import Login from './views/login.vue'

// Create routes.
const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/about', name: 'About', component: About },
    { path: '/login', name: 'Login', component: Login },

    // Dashboard routes.
    routerDashboard
]

// Create router.
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router