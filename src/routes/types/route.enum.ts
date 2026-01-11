export type RoutePathEnum = (typeof RoutePath)[keyof typeof RoutePath]

export const RoutePath = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
} as const

export const RouteName = {
  HOME: 'home',
  LOGIN: 'login',
  REGISTER: 'register',
} as const
