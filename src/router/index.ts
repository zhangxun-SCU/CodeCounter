import { createRouter, createWebHashHistory } from 'vue-router'

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: () => import('@/layout/index.vue')
        },
        {
            path: '/result',
            name: 'countAmount',
            component: () => import('@/views/CodeAmountView.vue'),
        }
    ]
})
