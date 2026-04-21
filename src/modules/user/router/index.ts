import type { RouteRecordRaw } from 'vue-router';

const userRoutes: RouteRecordRaw[] = [
  {
    path: 'user',
    name: 'user',
    component: () => import('@/modules/user/views/UserPage.vue'),
  },
];

export default userRoutes;
