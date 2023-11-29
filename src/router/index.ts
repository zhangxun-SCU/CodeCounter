import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('@/layout/index.vue'),
            children: [
                {
                    path: '/content',
                    name: 'content',
                    component: () => import('@/layout/content/index.vue')
                },
                {
                    path: '/count',
                    name: 'count',
                    component: () => import('@/views/CountView.vue')
                },
                {
                    path: '/setting',
                    name: 'setting',
                    component: () => import('@/views/CountAmountView.vue')
                }
            ]
        },
        {
            path: '/result',
            name: 'countAmount',
            component: () => import('@/views/CodeAmountView.vue'),
        }
    ]
})
