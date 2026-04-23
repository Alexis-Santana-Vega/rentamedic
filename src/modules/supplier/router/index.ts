import type { RouteRecordRaw } from 'vue-router';

const supplierRoutes: RouteRecordRaw[] = [
  {
    path: 'supplier',
    name: 'supplier',
    component: () => import('@/modules/supplier/views/SupplierPage.vue'),
  },
];

export default supplierRoutes;
