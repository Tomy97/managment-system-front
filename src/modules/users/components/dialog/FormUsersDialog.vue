<script setup lang="ts">
import type { ButtonVariants } from '@/components/ui/button'
import GenericDialog from '@/core/components/dialog/GenericDialog.vue'
import { ref, type Component } from 'vue'
import type { UserSchema } from '../../schema/userSchema'
import UserForm from '../form/UserForm.vue'

const props = defineProps<{
  buttonText: string
  icon: Component
  title: string
  description: string
  buttonClass?: string
  buttonVariant?: ButtonVariants['variant']
  initialData?: Partial<UserSchema>
}>()

const emit = defineEmits<{
  (e: 'submit', data: any): void
}>()
const isOpenDialog = ref<boolean>(false)

const onStateDialogChange = (value: boolean) => {
  isOpenDialog.value = value
}

const handleSubmit = (data: UserSchema) => {
  emit('submit', data)
  isOpenDialog.value = false
}

const handleCancel = () => {
  isOpenDialog.value = false
}
</script>

<template>
  <GenericDialog
    :open="isOpenDialog"
    :button-text="buttonText"
    :icon="icon"
    :title="title"
    :description="description"
    :buttonVariant="buttonVariant"
    :buttonClass="buttonClass"
    :initialData="initialData"
    @update:open="onStateDialogChange"
    @submit="handleSubmit"
    @cancel="handleCancel"
  >
    <UserForm
      :initialData="initialData"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </GenericDialog>
</template>
