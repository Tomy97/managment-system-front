<script setup lang="ts">
import { ref, type Component } from 'vue'
import GenericDialog from './GenericDialog.vue'
import EmployeeForm from '../form/EmployeeForm.vue'
import type { ButtonVariants } from '@/components/ui/button'
import type { EmployeeSchema } from '../../schema/employeeSchema'

const props = defineProps<{
  buttonText: string
  icon: Component
  title: string
  description: string
  buttonClass?: string
  buttonVariant?: ButtonVariants['variant']
  initialData?: EmployeeSchema
}>()

const emit = defineEmits<{
  (e: 'submit', data: any): void
}>()
const isOpenDialog = ref<boolean>(false)

const onStateDialogChange = (value: boolean) => {
  isOpenDialog.value = value
}

const handleSubmit = (data: any) => {
  console.log('Datos del formulario:', data)
  // Aquí puedes agregar la lógica para guardar el empleado
  // Por ejemplo, llamar a una API
  emit('submit', data)
  isOpenDialog.value = false
}

const handleCancel = () => {
  isOpenDialog.value = false
}
</script>

<template>
  <div>
    <GenericDialog
      :open="isOpenDialog"
      :button-text="buttonText"
      :icon="icon"
      :title="title"
      :description="description"
      :buttonVariant="buttonVariant"
      :buttonClass="buttonClass"
      @update:open="onStateDialogChange"
    >
      <EmployeeForm
        :initial-data="initialData"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
    </GenericDialog>
  </div>
</template>
