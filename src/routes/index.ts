import {
  useRouter,
  type RouteLocationNormalized,
  type RouteRecordRaw
} from 'vue-router'
import { RouteName, RoutePath } from '@/routes/types/route.enum'

const mainLayout = () => import('@/layout/views/MainLayout.vue')
const authLayout = () => import('@/layout/views/AuthLayout.vue')

export const routes: RouteRecordRaw[] = [
  {
    path: RoutePath.HOME,
    component: mainLayout,
    children: [
      {
        path: RoutePath.HOME,
        name: RouteName.HOME,
        component: () => import('@/modules/home/views/Home.vue')
      },
      {
        path: RoutePath.EMPLOYEES,
        name: RouteName.EMPLOYEES,
        component: () => import('@/modules/employees/views/EmployeesViews.vue')
      },
      {
        path: RoutePath.BRANCHES,
        name: RouteName.BRANCHES,
        component: () => import('@/modules/soon/views/SoonViews.vue')
      },
      {
        path: RoutePath.ASSIGN_BRANCHES,
        name: RouteName.ASSIGN_BRANCHES,
        component: () => import('@/modules/soon/views/SoonViews.vue')
      },
      {
        path: RoutePath.SECTORS,
        name: RouteName.SECTORS,
        component: () => import('@/modules/sections/views/SectionsViews.vue')
      },
      {
        path: RoutePath.CLOCK_IN_REPORTS,
        name: RouteName.CLOCK_IN_REPORTS,
        component: () =>
          import('@/modules/reports/views/ClockInReportsViews.vue')
      },
      {
        path: RoutePath.ABSENTEE_REPORT,
        name: RouteName.ABSENTEE_REPORT,
        component: () => import('@/modules/soon/views/SoonViews.vue')
      },
      {
        path: RoutePath.USERS,
        name: RouteName.USERS,
        component: () => import('@/modules/users/views/UsersViews.vue')
      },
      {
        path: RoutePath.SETTINGS_ACCESS_SECURITY,
        name: RouteName.SETTINGS_ACCESS_SECURITY,
        component: () => import('@/modules/soon/views/SoonViews.vue')
      },
      {
        path: RoutePath.TOKEN_MANAGEMENT,
        name: RouteName.TOKEN_MANAGEMENT,
        component: () => import('@/modules/soon/views/SoonViews.vue')
      },
      {
        path: RoutePath.LOGS,
        name: RouteName.LOGS,
        component: () => import('@/modules/soon/views/SoonViews.vue')
      }
    ]
  },
  {
    path: RoutePath.LOGIN,
    name: RouteName.LOGIN,
    component: authLayout,
    children: []
  },
  {
    path: `${RoutePath.ACTIVATION}/:token`,
    name: RouteName.ACTIVATION,
    component: () => import('@/modules/activation/views/ActivationViews.vue'),
    beforeEnter: (to: RouteLocationNormalized, _, next) => {
      const router = useRouter()
      const token = to.params.token as string
      if (!token) {
        return router.go(-1)
      }
      next()
    }
  }
]
