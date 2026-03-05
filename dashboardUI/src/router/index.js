import {createRouter, createWebHistory} from 'vue-router'

import DashboardView from '../views/DashboardView.vue'
import UserDetailsView from '../views/UserDetailsView.vue'

const routes = [
    {
        path: '/',      
        name: 'Dashboard',
        component: DashboardView,
        meta: { title: 'Dashboard' }
    },
    {
        path: '/user/:id',
        name: 'UserDetails',
        component: UserDetailsView,
        meta: { title: 'User Details' }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router