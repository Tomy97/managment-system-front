export type RoutePathEnum = (typeof RoutePath)[keyof typeof RoutePath]

export const RoutePath = {
  HOME: '/',
  LOGIN: '/login',
  ACTIVATION: '/activation',
  REGISTER: '/register',
  EMPLOYEES: '/employees',
  BRANCHES: '/branches',
  ASSIGN_BRANCHES: '/assign-branches',
  SECTORS: '/sectors',
  CLOCK_IN_REPORTS: '/clock-in-reports',
  ABSENTEE_REPORT: '/absentee-report',
  USERS: '/users',
  LOGS: '/logs',
  SETTINGS_ACCESS_SECURITY: '/settings-access-security',
  TOKEN_MANAGEMENT: '/token-management',
} as const

export const RouteName = {
  HOME: 'home',
  LOGIN: 'login',
  ACTIVATION: 'activation',
  REGISTER: 'register',
  EMPLOYEES: 'employees',
  BRANCHES: 'branches',
  ASSIGN_BRANCHES: 'assign-branches',
  SECTORS: 'sectors',
  CLOCK_IN_REPORTS: 'clock-in-reports',
  ABSENTEE_REPORT: 'absentee-report',
  USERS: 'users',
  LOGS: 'logs',
  SETTINGS_ACCESS_SECURITY: 'settings-access-security',
  TOKEN_MANAGEMENT: 'token-management',
} as const
