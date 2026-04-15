import type { RouteRecordRaw } from 'vue-router';

const categoriesRoutes: RouteRecordRaw[] = [
  {
    path: 'categories',
    name: 'categories',
    component: () => import('@/modules/categories/views/CategoriesPage.vue'),
  },
];

export default categoriesRoutes;
