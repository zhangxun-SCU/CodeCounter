import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('@/layout/index.vue'),
            children: [
                {
                    path: '/count',
                    name: 'count',
                    component: () => import('@/views/CountView.vue'),
                }
            ]
        }
    ]
})

