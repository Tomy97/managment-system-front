<script setup lang="ts">
import { FormField } from '@/components/ui/form'
import FormItem from '@/components/ui/form/FormItem.vue'
import FormLabel from '@/components/ui/form/FormLabel.vue'
import { Form, useForm } from 'vee-validate'
import { userSchema, type UserSchema } from '../../schema/userSchema'
import { toTypedSchema } from '@vee-validate/zod'
import { ref, watch } from 'vue'
import FormControl from '@/components/ui/form/FormControl.vue'
import Input from '@/components/ui/input/Input.vue'
import FieldError from '@/components/ui/field/FieldError.vue'
import Select from '@/components/ui/select/Select.vue'
import SelectTrigger from '@/components/ui/select/SelectTrigger.vue'
import SelectValue from '@/components/ui/select/SelectValue.vue'
import SelectContent from '@/components/ui/select/SelectContent.vue'
import SelectItem from '@/components/ui/select/SelectItem.vue'
import type { SelectOption } from '@/core/types/Selects'
import Button from '@/components/ui/button/Button.vue'

const props = defineProps<{
  initialData?: Partial<UserSchema>
}>()

const emit = defineEmits<{
  (e: 'submit', data: UserSchema): void
  (e: 'cancel'): void
}>()

const userId = ref<number | undefined>(undefined)

const { handleSubmit, values, errors, submitCount, setFieldValue } = useForm({
  validationSchema: toTypedSchema(userSchema),
  validateOnMount: false,
  keepValuesOnUnmount: true
})

const onSubmit = handleSubmit(
  (formValues) => {
    const dataToSubmit = {
      ...formValues,
      ...(userId.value && { id: userId.value })
    }
    emit('submit', dataToSubmit as UserSchema & { id?: number })
  },
  (errors) => {
    console.log('Errores de validación:', errors)
  }
)

const roles: SelectOption[] = [
  { value: 1, label: 'Administrador' },
  { value: 2, label: 'Usuario' }
]

watch(
  () => props.initialData as UserSchema & { id?: number },
  (newData: UserSchema & { id?: number }) => {
    if (newData) {
      userId.value = newData.id
      setFieldValue('name', newData.name)
      setFieldValue('lastName', newData.lastName)
      setFieldValue('email', newData.email)
      setFieldValue('role', newData.role)
    } else {
      userId.value = undefined
    }
  },
  { immediate: true, deep: true }
)
</script>

<template>
  <Form>
    <form class="space-y-6" @submit.prevent="onSubmit">
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField v-slot="{ field, meta }" name="name">
          <FormItem class="relative">
            <FormLabel>Nombre *</FormLabel>
            <FormControl>
              <Input
                :model-value="values.name"
                placeholder="Ingrese el nombre"
                @blur="field.onBlur"
                @update:modelValue="setFieldValue('name', $event as string)"
              />
            </FormControl>
            <FieldError
              v-if="(meta.touched || submitCount > 0) && !!errors.name"
              :errors="[errors.name]"
            />
          </FormItem>
        </FormField>
        <FormField v-slot="{ field, meta }" name="lastName">
          <FormItem class="relative">
            <FormLabel>Apellido *</FormLabel>
            <FormControl>
              <Input
                :model-value="values.lastName"
                placeholder="Ingrese el apellido"
                @blur="field.onBlur"
                @update:modelValue="setFieldValue('lastName', $event as string)"
              />
            </FormControl>
            <FieldError
              v-if="(meta.touched || submitCount > 0) && !!errors.lastName"
              :errors="[errors.lastName]"
            />
          </FormItem>
        </FormField>
      </div>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField v-slot="{ field, meta }" name="email">
          <FormItem class="relative">
            <FormLabel>Correo Electrónico *</FormLabel>
            <FormControl>
              <Input
                :model-value="values.email"
                placeholder="Ingrese el correo electrónico"
                @blur="field.onBlur"
                @update:modelValue="setFieldValue('email', $event as string)"
              />
            </FormControl>
            <FieldError
              v-if="(meta.touched || submitCount > 0) && !!errors.email"
              :errors="[errors.email]"
            />
          </FormItem>
        </FormField>
        <FormField v-slot="{ field, meta }" name="role">
          <FormItem class="relative">
            <FormLabel>Rol *</FormLabel>
            <FormControl>
              <Select
                :model-value="values.role"
                @blur="field.onBlur"
                @update:modelValue="
                  setFieldValue(
                    'role',
                    $event as { label: string; value: number }
                  )
                "
              >
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Seleccione el rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    v-for="role in roles"
                    :key="role.value"
                    :value="role"
                  >
                    {{ role.label }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FieldError
              v-if="(meta.touched || submitCount > 0) && !!errors.role"
              :errors="[errors.role]"
            />
          </FormItem>
        </FormField>
      </div>
      <div class="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          class="cursor-pointer"
          variant="outline"
          @click="$emit('cancel')"
        >
          Cancelar
        </Button>
        <Button type="submit" class="text-white cursor-pointer">
          Guardar
        </Button>
      </div>
    </form>
  </Form>
</template>
