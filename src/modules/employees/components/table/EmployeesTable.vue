<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Edit, User } from 'lucide-vue-next'
import FormEmployeeDialog from '../dialog/FormEmployeeDialog.vue'
import type { EmployeeType } from '../../types/Employee'
import { useEmployeeStore } from '../../store/employee.store'
import EmployeeDatesDialog from '../dialog/EmployeeDatesDialog.vue'
import StatusBadge from '../badge/StatusBadge.vue'
import ActivationEmployeeDialog from '../dialog/ActivationEmployeeDialog.vue'
import type { EmployeeSchema } from '../../schema/employeeSchema'

const props = defineProps<{
  employees: EmployeeType[]
}>()

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
  <div
    v-if="employeeStore.employees.length === 0"
    class="flex flex-col items-center justify-center py-12 text-center"
  >
    <User class="size-12 text-muted-foreground mb-4" />
    <p class="text-lg font-medium text-muted-foreground">
      No hay empleados registrados
    </p>
    <p class="text-sm text-muted-foreground mt-2">
      Agrega un nuevo empleado para comenzar
    </p>
  </div>
  <Table v-else>
    <TableHeader>
      <TableRow>
        <TableHead v-for="header in tableHeaders" :key="header.key">
          {{ header.label }}
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="employee in employeeStore.employees" :key="employee.id">
        <TableCell
          v-for="col in tableHeaders"
          :key="`${employee.id}-${col.key}`"
        >
          <template v-if="col.key === 'photo'">
            <div
              class="flex size-10 items-center justify-center rounded-full bg-muted"
            >
              <User class="size-5 text-muted-foreground" />
            </div>
          </template>

          <template v-else-if="col.key === 'active' || col.key === 'mustClock'">
            <StatusBadge
              :key="`${employee.id}-${col.key}-badge`"
              :status="employee[col.key as keyof typeof employee]"
            />
          </template>

          <template v-else-if="col.key === 'token' && employee.token">
            <ActivationEmployeeDialog :token="employee.token" />
          </template>

          <template v-else-if="col.key === 'actions' && employee.id">
            <div class="flex items-center gap-2">
              <EmployeeDatesDialog v-if="employee.id" :employee="employee" />
              <FormEmployeeDialog
                buttonText="Editar"
                :icon="Edit"
                title="Editar Empleado"
                description="Completa el formulario para editar el empleado."
                buttonClass="cursor-pointer border-slate-900"
                :initialData="
                  employee as unknown as Partial<EmployeeSchema> & {
                    id?: number
                  }
                "
                @submit="employeeStore.setEmployeesIntoStore"
              />
            </div>
          </template>

          <span v-else>
            {{ employee[col.key as keyof typeof employee] }}
          </span>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
