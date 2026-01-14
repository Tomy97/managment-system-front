<script setup lang="ts">
import GenericDialog from '@/modules/employees/components/dialog/GenericDialog.vue'
import SectionForm from '../form/SectionForm.vue'
import { ref, type Component } from 'vue'
import type { ButtonVariants } from '@/components/ui/button'
import type { SectionSchema } from '../../schema/sectionSchema';

const props = defineProps<{
  title: string
  buttonText: string
  description?: string
  buttonClass?: string
  buttonVariant?: ButtonVariants['variant']
  icon?: Component
  initialData?: Partial<SectionSchema>
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
  emit('submit', data)
  isOpenDialog.value = false
}
</script>

<template>
  <GenericDialog
    :open="isOpenDialog"
    :button-text="buttonText"
    :title="title"
    :description="description"
    :buttonClass="buttonClass"
    :buttonVariant="buttonVariant"
    :icon="icon"
    @update:open="onStateDialogChange"
  >
    <SectionForm
      :initialData="initialData"
      @submit="handleSubmit"
      @cancel="onStateDialogChange(false)"
    />
  </GenericDialog>
</template>
