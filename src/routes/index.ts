import type { RouteRecordRaw } from 'vue-router'
import { RoutePath } from '@/routes/types/route.enum'

const mainLayout = () => import('@/layout/views/MainLayout.vue')
const authLayout = () => import('@/layout/views/AuthLayout.vue')

export const routes: RouteRecordRaw[] = [
  {
    path: RoutePath.HOME,
    component: mainLayout,
    children: [
      {
        path: RoutePath.HOME,
        component: () => import('@/modules/home/views/Home.vue')
      }
    ]
  },
  {
    path: RoutePath.LOGIN,
    component: authLayout,
    children: []
  }
]
