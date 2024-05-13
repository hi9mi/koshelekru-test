import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/settings',
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/settings-view.vue'),
    },
    {
      path: '/order-book',
      name: 'orderBook',
      component: () => import('@/views/order-book-view.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/not-found-view.vue'),
    },
  ],
})
