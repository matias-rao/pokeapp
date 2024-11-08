import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', name: 'Welcome', component: () => import('./../views/Welcome.vue')},
    { path: '/home', name: 'Home', component: () => import('./../views/Index.vue')},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;