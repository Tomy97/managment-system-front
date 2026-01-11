<script setup lang="ts">
import { useRoute } from 'vue-router'
import {
  Users,
  Building2,
  Link2,
  FolderTree,
  BarChart3,
  XCircle,
  Key,
  FileText,
  LogOut
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

const route = useRoute()

const menuItems = [
  {
    label: 'Empleados',
    icon: Users,
    path: '/employees'
  },
  {
    label: 'Sucursales',
    icon: Building2,
    path: '/branches'
  },
  {
    label: 'Asignar Sucursales',
    icon: Link2,
    path: '/assign-branches'
  },
  {
    label: 'Sectores',
    icon: FolderTree,
    path: '/sectors'
  },
  {
    label: 'Reportes fichadas',
    icon: BarChart3,
    path: '/clock-in-reports'
  },
  {
    label: 'Reporte ausentes',
    icon: XCircle,
    path: '/absentee-report'
  },
  {
    label: 'Usuarios',
    icon: Key,
    path: '/users'
  },
  {
    label: 'Logs',
    icon: FileText,
    path: '/logs'
  }
]

const isActive = (path: string) => {
  return route.path === path || route.path.startsWith(path + '/')
}
</script>

<template>
  <Sidebar
    class="rounded-br-3xl shadow-lg !bg-white !text-foreground [&_[data-sidebar=sidebar]]:!bg-white"
    :collapsible="'offcanvas'"
  >
    <SidebarHeader class="p-6 !bg-white">
      <div class="flex items-center gap-3 mb-4">
        <div
          class="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100"
        >
          <div class="flex gap-1">
            <div class="w-2 h-2 rounded-full bg-teal-400"></div>
            <div class="w-2 h-2 rounded-full bg-pink-400"></div>
            <div class="w-2 h-2 rounded-full bg-purple-400"></div>
          </div>
        </div>
      </div>
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
              'py-6 !text-foreground !hover:bg-gray-50 !hover:text-foreground',
              isActive(item.path)
                ? '!bg-gray-100 !shadow-sm !text-foreground !font-semibold'
                : ''
            ]"
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
            class="!text-foreground !hover:bg-gray-50 !hover:text-foreground"
          >
            <LogOut class="w-5 h-5 flex-shrink-0 text-foreground" />
            <span class="text-sm font-medium">Salir</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>
