import type { RouteRecordRaw } from 'vue-router';

const outboundRoutes: RouteRecordRaw[] = [
  {
    path: 'outbound',
    name: 'outbound',
    component: () => import('@/modules/outbound/views/OutboundPage.vue'),
  },
];

export default outboundRoutes;
