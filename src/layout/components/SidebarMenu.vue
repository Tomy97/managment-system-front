<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
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
  <aside
    class="fixed left-0 top-0 h-screen w-64 flex flex-col rounded-br-3xl shadow-lg z-50"
  >
    <!-- Logo Section -->
    <div class="p-6">
      <div class="flex items-center gap-3 mb-4">
        <div
          class="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm"
        >
          <div class="flex gap-1">
            <div class="w-2 h-2 rounded-full bg-teal-400"></div>
            <div class="w-2 h-2 rounded-full bg-pink-400"></div>
            <div class="w-2 h-2 rounded-full bg-purple-400"></div>
          </div>
        </div>
      </div>
      <p class="text-lg font-medium">Hola, X</p>
    </div>

    <!-- Navigation Menu -->
    <nav class="flex-1 px-4 overflow-y-auto">
      <ul class="space-y-2">
        <li v-for="item in menuItems" :key="item.path">
          <RouterLink
            :to="item.path"
            :class="[
              'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
              isActive(item.path)
                ? 'bg-white/20 backdrop-blur-sm shadow-md'
                : 'hover:bg-white/10'
            ]"
          >
            <component :is="item.icon" class="w-5 h-5 flex-shrink-0" />
            <span class="text-sm font-medium">{{ item.label }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>

    <!-- Separator -->
    <div class="px-4 py-2">
      <div class="h-px bg-white/20"></div>
    </div>

    <!-- Exit Option -->
    <div class="p-4">
      <button
        class="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-200"
      >
        <LogOut class="w-5 h-5 flex-shrink-0" />
        <span class="text-sm font-medium">Salir</span>
      </button>
    </div>
  </aside>
</template>
