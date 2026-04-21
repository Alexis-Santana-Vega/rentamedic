import type { RouteRecordRaw } from 'vue-router';

const categoryRoutes: RouteRecordRaw[] = [
  {
    path: 'equipment',
    name: 'equipment',
    component: () => import('@/modules/category/views/CategoryPage.vue'),
  },
];

export default categoryRoutes;
