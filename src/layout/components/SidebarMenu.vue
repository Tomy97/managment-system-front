<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import {
  Users,
  Building2,
  Link2,
  FolderTree,
  BarChart3,
  XCircle,
  Key,
  FileText,
  LogOut,
  Home
} from 'lucide-vue-next'
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator
} from '@/components/ui/sidebar'
import { RoutePath } from '@/routes/types/route.enum'

const route = useRoute()
const router = useRouter()

const menuItems = [
  {
    label: 'Inicio',
    icon: Home,
    path: RoutePath.HOME
  },
  {
    label: 'Empleados',
    icon: Users,
    path: RoutePath.EMPLOYEES
  },
  {
    label: 'Sucursales',
    icon: Building2,
    path: RoutePath.BRANCHES
  },
  {
    label: 'Asignar Sucursales',
    icon: Link2,
    path: RoutePath.ASSIGN_BRANCHES
  },
  {
    label: 'Sectores',
    icon: FolderTree,
    path: RoutePath.SECTORS
  },
  {
    label: 'Reportes fichadas',
    icon: BarChart3,
    path: RoutePath.CLOCK_IN_REPORTS
  },
  {
    label: 'Reporte ausentes',
    icon: XCircle,
    path: RoutePath.ABSENTEE_REPORT
  },
  {
    label: 'Usuarios',
    icon: Key,
    path: RoutePath.USERS
  },
  {
    label: 'Logs',
    icon: FileText,
    path: RoutePath.LOGS
  }
]

const isActive = (path: string) => {
  return route.path === path || route.path.startsWith(path + '/')
}

const navigateTo = (path: string) => {
  router.push(path)
}
</script>

<template>
  <Sidebar
    class="rounded-br-3xl shadow-lg !bg-white !text-foreground [&_[data-sidebar=sidebar]]:!bg-white"
    :collapsible="'offcanvas'"
  >
    <SidebarHeader class="p-6 !bg-white">
      <div class="flex items-center gap-3 mb-4">Logo de la empresa</div>
      <p class="text-lg font-medium text-foreground">Hola, X</p>
    </SidebarHeader>

    <SidebarContent class="px-4 !bg-white">
      <SidebarMenu class="space-y-2">
        <SidebarMenuItem v-for="item in menuItems" :key="item.path">
          <SidebarMenuButton
            as="router-link"
            :to="item.path"
            :is-active="isActive(item.path)"
            :class="[
              'py-6 !text-foreground !hover:bg-gray-50 !hover:text-foreground cursor-pointer',
              isActive(item.path)
                ? '!bg-red-100 !shadow-sm !text-foreground !font-semibold'
                : ''
            ]"
            @click="navigateTo(item.path)"
          >
            <component
              :is="item.icon"
              :class="[
                'w-10 h-10 flex-shrink-0',
                isActive(item.path) ? 'text-destructive' : 'text-foreground'
              ]"
            />
            <span class="text-sm font-medium">{{ item.label }}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarContent>

    <SidebarFooter class="p-4 !bg-white">
      <SidebarSeparator class="mb-4 !bg-gray-200" />
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            as="button"
            class="py-6 !text-foreground !hover:bg-gray-50 !hover:text-foreground"
          >
            <LogOut class="w-5 h-5 flex-shrink-0 text-foreground" />
            <span class="text-sm font-medium">Salir</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>
