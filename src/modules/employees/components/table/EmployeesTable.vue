<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Eye, Edit, User } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import FormEmployeDialog from '../dialog/FormEmployeDialog.vue'
import type { EmployeeType } from '../../types/Employee'
import { useEmployeeStore } from '../../store/employee.store'
import EmployeeDatesDialog from '../dialog/EmployeeDatesDialog.vue'

const props = defineProps<{
  employees: EmployeeType[]
}>()

const handleView = (employee: EmployeeType) => {
  console.log(employee)
}

const tableHeaders = [
  {
    label: 'Foto',
    key: 'photo'
  },
  {
    label: 'ID',
    key: 'id'
  },
  {
    label: 'Nombre',
    key: 'name'
  },
  {
    label: 'Apellido',
    key: 'lastName'
  },
  {
    label: 'DNI',
    key: 'dni'
  },
  {
    label: 'CUIL',
    key: 'cuil'
  },
  {
    label: 'Legajo',
    key: 'employeeNumber'
  },
  {
    label: 'Activo',
    key: 'active'
  },
  {
    label: 'Debe fichar',
    key: 'mustClock'
  },
  {
    label: 'Token',
    key: 'token'
  },
  {
    label: 'Acciones',
    key: 'actions'
  }
]

const employeeStore = useEmployeeStore()
</script>

<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead v-for="header in tableHeaders" :key="header.key">
          {{ header.label }}
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="employee in employeeStore.employees" :key="employee.id">
        <!-- Foto -->
        <TableCell>
          <div
            class="flex size-10 items-center justify-center rounded-full bg-muted"
          >
            <User class="size-5 text-muted-foreground" />
          </div>
        </TableCell>

        <!-- ID -->
        <TableCell>
          <span class="text-sm">{{ employee.id }}</span>
        </TableCell>

        <!-- Nombre -->
        <TableCell>
          <span class="text-sm font-medium">{{ employee.name }}</span>
        </TableCell>

        <!-- Apellido -->
        <TableCell>
          <span class="text-sm font-medium">{{ employee.lastName }}</span>
        </TableCell>

        <!-- DNI -->
        <TableCell>
          <span class="text-sm">{{ employee.dni }}</span>
        </TableCell>

        <!-- CUIL -->
        <TableCell>
          <span class="text-sm">{{ employee.cuil }}</span>
        </TableCell>

        <!-- Legajo -->
        <TableCell>
          <span class="text-sm">{{ employee.employeeNumber }}</span>
        </TableCell>
        <!-- Activo -->
        <TableCell>
          <span
            :class="
              cn(
                'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border',
                employee.active
                  ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                  : 'bg-red-100 text-red-600 border-red-200'
              )
            "
          >
            {{ employee.active ? 'Sí' : 'No' }}
          </span>
        </TableCell>

        <TableCell>
          <span
            :class="
              cn(
                'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border',
                employee.mustClock
                  ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                  : 'bg-red-100 text-red-600 border-red-200'
              )
            "
          >
            {{ employee.mustClock ? 'Sí' : 'No' }}
          </span>
        </TableCell>

        <!-- Token -->
        <TableCell>
          <Button
            v-if="employee.token"
            variant="outline"
            class="cursor-pointer"
            size="sm"
          >
            Token
          </Button>
        </TableCell>

        <!-- Acciones -->
        <TableCell>
          <div class="flex items-center gap-2">
            <EmployeeDatesDialog v-if="employee.id" :employee="employee" />
            <FormEmployeDialog
              buttonText="Editar"
              :icon="Edit"
              title="Editar Empleado"
              description="Modifica la información del empleado seleccionado."
              buttonClass="cursor-pointer border-slate-900"
              :initialData="employee"
              @submit="employeeStore.setEmployeesIntoStore"
            />
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
