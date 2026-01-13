<script setup lang="ts">
import { ref } from 'vue'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Search, Plus } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import FormEmployeDialog from '../components/dialog/FormEmployeDialog.vue'
import EmployeesTable from '../components/table/EmployeesTable.vue'

interface Employee {
  id: number
  nombre: string
  apellido: string
  dni: string
  cuil: string
  legajo: string
  activo: boolean
  debeFichar: boolean
  token?: string
}

const searchQuery = ref('')
const viewDialogOpen = ref(false)
const editDialogOpen = ref(false)
const selectedEmployee = ref<Employee | null>(null)

const employees = ref<Employee[]>([
  {
    id: 2,
    nombre: 'AUGUSTO',
    apellido: 'RAMIREZ',
    dni: '352545254',
    cuil: '203525452542',
    legajo: '1458',
    activo: true,
    debeFichar: true,
    token: 'Token'
  }
])

const handleSubmit = (data: Employee) => {
  console.log('Datos del formulario:', data)
  employees.value = [
    ...employees.value,
    { ...data, id: employees.value.length + 1 } as Employee
  ]
}
</script>

<template>
  <div class="w-full p-4 md:p-6 lg:p-8">
    <div class="mx-auto max-w-7xl">
      <!-- Card Container -->
      <Card>
        <!-- Header Section -->
        <CardHeader>
          <div
            class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <CardTitle class="text-2xl">Gestión de Empleados</CardTitle>

            <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
              <!-- Search Input -->
              <div class="relative flex-1 sm:min-w-[250px]">
                <Search
                  class="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  v-model="searchQuery"
                  type="search"
                  placeholder="Buscar..."
                  class="pl-9"
                />
              </div>

              <!-- New Employee Button -->
              <FormEmployeDialog
                buttonText="Nuevo Empleado"
                :icon="Plus"
                title="Nuevo Empleado"
                description="Completa el formulario para agregar un nuevo empleado al sistema."
                @submit="handleSubmit"
              />
            </div>
          </div>
        </CardHeader>

        <!-- Table Section -->
        <CardContent>
          <EmployeesTable :employees="employees" />
        </CardContent>
      </Card>
    </div>

    <!-- Dialog para Ver Empleado -->
    <Dialog v-model:open="viewDialogOpen">
      <DialogContent class="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalles del Empleado</DialogTitle>
          <DialogDescription>
            Información completa del empleado seleccionado.
          </DialogDescription>
        </DialogHeader>
        <div v-if="selectedEmployee" class="py-4 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm font-medium text-muted-foreground">ID</p>
              <p class="text-sm">{{ selectedEmployee.id }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-muted-foreground">Nombre</p>
              <p class="text-sm">{{ selectedEmployee.nombre }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-muted-foreground">Apellido</p>
              <p class="text-sm">{{ selectedEmployee.apellido }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-muted-foreground">DNI</p>
              <p class="text-sm">{{ selectedEmployee.dni }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-muted-foreground">CUIL</p>
              <p class="text-sm">{{ selectedEmployee.cuil }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-muted-foreground">Legajo</p>
              <p class="text-sm">{{ selectedEmployee.legajo }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-muted-foreground">Activo</p>
              <span
                :class="
                  cn(
                    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                    selectedEmployee.activo
                      ? 'bg-green-600 text-white'
                      : 'bg-muted text-muted-foreground'
                  )
                "
              >
                {{ selectedEmployee.activo ? 'Sí' : 'No' }}
              </span>
            </div>
            <div>
              <p class="text-sm font-medium text-muted-foreground">
                Debe fichar
              </p>
              <span
                :class="
                  cn(
                    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                    selectedEmployee.debeFichar
                      ? 'bg-blue-500 text-white'
                      : 'bg-muted text-muted-foreground'
                  )
                "
              >
                {{ selectedEmployee.debeFichar ? 'Sí' : 'No' }}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    <!-- Dialog para Editar Empleado esto va a ser el mismo compo que con el que se crea -->
    <Dialog v-model:open="editDialogOpen">
      <DialogContent class="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Editar Empleado</DialogTitle>
          <DialogDescription>
            Modifica la información del empleado seleccionado.
          </DialogDescription>
        </DialogHeader>
        <div v-if="selectedEmployee" class="py-4">
          <p class="text-sm text-muted-foreground">
            Formulario de edición (pendiente de implementar)
          </p>
          <p class="text-sm mt-2">
            Editando: {{ selectedEmployee.nombre }}
            {{ selectedEmployee.apellido }}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>
