<script setup lang="ts">
import {
  Users,
  Building2,
  UserCheck,
  FolderTree,
  Key,
  UserCog,
} from 'lucide-vue-next'
import StatCard from '@/modules/home/components/StatCard.vue'
import QuickActionCard from '@/modules/home/components/QuickActionCard.vue'
import { RouteName } from '@/routes/types/route.enum'
import { useEmployeeStore } from '@/modules/employees/store/employee.store'
import { useSectionsStore } from '@/modules/sections/store/sections.store'

const employeeStore = useEmployeeStore()
const sectionsStore = useSectionsStore()
const statsCards = [
  {
    key: 'employees',
    title: 'Empleados',
    value: employeeStore.totalEmployees,
    trend: `${employeeStore.monthlyGrowth}%`,
    trendLabel: 'este mes',
    icon: Users
  },
  // {
  //   key: 'branches',
  //   title: 'Sucursales',
  //   value: 8,
  //   trend: '+2',
  //   trendLabel: 'nuevas',
  //   icon: Building2
  // },
  {
    key: 'sections',
    title: 'Sectores',
    value: sectionsStore.totalSections,
    trendLabel: 'Activas',
    icon: FolderTree
  },
  // {
  //   key: 'activity',
  //   title: 'Actividad',
  //   value: 98,
  //   trend: 'Alta',
  //   icon: Activity,
  //   subIcon: TrendingUp
  // }
]

const quickActions = [
  {
    title: 'Empleados',
    description: 'Gestiona la información de tus empleados',
    icon: UserCheck,
    name: RouteName.EMPLOYEES
  },
  {
    title: 'Sucursales',
    description: 'Administra las sucursales de tu organización',
    icon: Building2,
    name: RouteName.BRANCHES
  },
  {
    title: 'Secciones',
    description: 'Organiza las secciones de trabajo',
    icon: FolderTree,
    name: RouteName.SECTORS
  },
  {
    title: 'Usuarios',
    description: 'Administra la actividad de tu organización',
    icon: UserCog,
    name: RouteName.USERS
  },
  {
    title: 'Tokens',
    description: 'Administra los tokens de acceso',
    icon: Key,
    name: RouteName.TOKEN_MANAGEMENT
  },
  {
    title: 'Autenticación',
    description: 'Configuración de acceso y seguridad',
    icon: Users,
    name: RouteName.SETTINGS_ACCESS_SECURITY
  }
]
</script>

<template>
  <div class="w-full">
    <div class="relative">
      <div class="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1
            class="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl"
          >
            Sistema de Gestión
          </h1>
          <p class="mt-4 text-lg text-muted-foreground sm:text-xl">
            Administra tu organización de manera eficiente
          </p>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 pb-8">
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          v-for="card in statsCards"
          :key="card.key"
          :title="card.title"
          :value="card.value"
          :trend="card.trend"
          :trendLabel="card.trendLabel"
          :icon="card.icon"
        />
      </div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 pb-8">
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-foreground">Acceso Rápido</h2>
        <p class="mt-2 text-muted-foreground">
          Navega rápidamente a las secciones principales del sistema
        </p>
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <QuickActionCard
          v-for="action in quickActions"
          :key="action.title"
          :title="action.title"
          :description="action.description"
          :icon="action.icon"
          :routeName="action.name"
        />
      </div>
    </div>
  </div>
</template>
