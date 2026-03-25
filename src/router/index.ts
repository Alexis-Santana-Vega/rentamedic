/**
 * router/index.ts
 *
 * Manual routes for ./src/pages/*.vue
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/pages/auth/LoginPage.vue';
import SignupPage from '@/pages/auth/SignupPage.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/PublicLayout.vue'),
      children: [
        {
          path: '',
          component: () => import('@/pages/public/IndexPage.vue'),
        },
        {
          path: 'about',
          component: () => import('@/pages/public/AboutPage.vue'),
        },
        {
          path: 'contact',
          component: () => import('@/pages/public/ContactPage.vue'),
        },
      ],
    },
    {
      path: '/auth',
      component: AuthLayout,
      children: [
        {
          path: '',
          redirect: '/auth/login',
        },
        {
          path: 'login',
          component: LoginPage,
        },
        {
          path: 'signup',
          component: SignupPage,
        },
      ],
    },
  ],
});

export default router;
