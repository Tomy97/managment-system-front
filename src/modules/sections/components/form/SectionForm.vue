<script setup lang="ts">
import { Form, FormField } from '@/components/ui/form'
import FormControl from '@/components/ui/form/FormControl.vue'
import FormItem from '@/components/ui/form/FormItem.vue'
import FormLabel from '@/components/ui/form/FormLabel.vue'
import Input from '@/components/ui/input/Input.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { sectionSchema, type SectionSchema } from '../../schema/sectionSchema'
import { useForm } from 'vee-validate'
import { ref, watch } from 'vue'
import FieldError from '@/components/ui/field/FieldError.vue'
import Button from '@/components/ui/button/Button.vue'

const props = defineProps<{
  initialData?: Partial<SectionSchema>
}>()

const sectionId = ref<number | undefined>(undefined)

const emit = defineEmits<{
  (e: 'submit', data: SectionSchema): void
  (e: 'cancel'): void
}>()

const { handleSubmit, values, errors, submitCount, setFieldValue } = useForm({
  validationSchema: toTypedSchema(sectionSchema),
  validateOnMount: false,
  keepValuesOnUnmount: true
})

const onSubmit = handleSubmit(
  (formValues) => {
    const dataToSubmit = {
      ...formValues,
      ...(sectionId.value && { id: sectionId.value })
    }
    emit('submit', dataToSubmit as SectionSchema & { id?: number })
  },
  (errors) => {
    console.log('Errores de validación:', errors)
  }
)

watch(
  () => props.initialData as SectionSchema & { id?: number },
  (newData: SectionSchema & { id?: number }) => {
    if (newData) {
      sectionId.value = newData.id
      setFieldValue('name', newData.name)
    } else {
      sectionId.value = undefined
    }
  },
  { immediate: true, deep: true }
)
</script>

<template>
  <Form>
    <form class="space-y-6" @submit.prevent="onSubmit">
      <FormField v-slot="{ field, meta }" name="name">
        <FormItem class="relative">
          <FormLabel>Nombre del sector *</FormLabel>
          <FormControl>
            <Input
              class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              :model-value="values.name as string | undefined"
              placeholder="Ingrese el nombre del sector"
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
      <div class="flex justify-end gap-3 pt-4">
        <Button
          class="cursor-pointer"
          type="button"
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
