<script setup lang="ts">
import { ref } from 'vue'
import GenericDialog from './GenericDialog.vue'
import type { EmployeeType } from '../../types/Employee'
import { Eye } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
const props = defineProps<{
  employee: EmployeeType
}>()

const openDialog = ref<boolean>(false)

const onStateDialogChange = (value: boolean) => {
  openDialog.value = value
}
</script>

<template>
  <GenericDialog
    :open="openDialog"
    @update:open="onStateDialogChange"
    buttonText="Ver"
    title="Datos del empleado"
    description="Información completa del empleado seleccionado."
    buttonClass="cursor-pointer border-slate-900"
    buttonVariant="outline"
    :icon="Eye"
  >
    <div class="py-4 space-y-4">
      <div class="grid gap-4">
        <div>
          <p class="text-sm font-medium text-muted-foreground">ID</p>
          <p class="text-sm">{{ employee.id }}</p>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <p class="text-sm font-medium text-muted-foreground">Nombre</p>
          <p class="text-sm">{{ employee.name }}</p>
        </div>
        <div>
          <p class="text-sm font-medium text-muted-foreground">Apellido</p>
          <p class="text-sm">{{ employee.lastName }}</p>
        </div>
        <div>
          <p class="text-sm font-medium text-muted-foreground">DNI</p>
          <p class="text-sm">{{ employee.dni }}</p>
        </div>
        <div>
          <p class="text-sm font-medium text-muted-foreground">CUIL</p>
          <p class="text-sm">{{ employee.cuil }}</p>
        </div>
        <div>
          <p class="text-sm font-medium text-muted-foreground">Legajo</p>
          <p class="text-sm">{{ employee.employeeNumber }}</p>
        </div>
        <div>
          <p class="text-sm font-medium text-muted-foreground">Activo</p>
          <span
            :class="
              cn(
                'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                employee.active
                  ? 'bg-green-600 text-white'
                  : 'bg-muted text-muted-foreground'
              )
            "
          >
            {{ employee.active ? 'Sí' : 'No' }}
          </span>
        </div>
        <div>
          <p class="text-sm font-medium text-muted-foreground">Debe fichar</p>
          <span
            :class="
              cn(
                'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                employee.mustClock
                  ? 'bg-blue-500 text-white'
                  : 'bg-muted text-muted-foreground'
              )
            "
          >
            {{ employee.mustClock ? 'Sí' : 'No' }}
          </span>
        </div>
      </div>
    </div>
  </GenericDialog>
</template>
