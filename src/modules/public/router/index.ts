import type { RouteRecordRaw } from 'vue-router';

const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/core/layouts/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/modules/public/views/HomePage.vue'),
      },
      {
        path: 'search',
        name: 'search',
        component: () => import('@/modules/public/views/SearchPage.vue'),
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/modules/public/views/AboutPage.vue'),
      },
      {
        path: 'contact',
        name: 'contact',
        component: () => import('@/modules/public/views/ContactPage.vue'),
      },
    ],
  },
];

export default publicRoutes;
