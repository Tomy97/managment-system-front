<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import FieldError from '@/components/ui/field/FieldError.vue'
import Select from '@/components/ui/select/Select.vue'
import SelectTrigger from '@/components/ui/select/SelectTrigger.vue'
import SelectValue from '@/components/ui/select/SelectValue.vue'
import SelectContent from '@/components/ui/select/SelectContent.vue'
import SelectItem from '@/components/ui/select/SelectItem.vue'
import {
  type EmployeeSchema,
  employeeSchema
} from '../../schema/employeeSchema'
import { watch, ref } from 'vue'
import type { SelectOption } from '@/core/types/Selects'

const props = defineProps<{
  initialData?: Partial<EmployeeSchema>
}>()

const emit = defineEmits<{
  (e: 'submit', data: EmployeeSchema): void
  (e: 'cancel'): void
}>()

const employeeId = ref<number | undefined>(undefined)

const diasSemana: SelectOption[] = [
  { value: 1, label: 'Lunes' },
  { value: 2, label: 'Martes' },
  { value: 3, label: 'Miércoles' },
  { value: 4, label: 'Jueves' },
  { value: 5, label: 'Viernes' },
  { value: 6, label: 'Sábado' },
  { value: 7, label: 'Domingo' }
]

const motivosBaja: SelectOption[] = [
  { value: 0, label: 'Seleccione un motivo' },
  { value: 1, label: 'Renuncia' },
  { value: 2, label: 'Despido' },
  { value: 3, label: 'Jubilación' },
  { value: 4, label: 'Fin de contrato' },
  { value: 5, label: 'Otro' }
]

const sectores: SelectOption[] = [
  { value: 1, label: 'Administración' },
  { value: 2, label: 'Ventas' },
  { value: 3, label: 'Producción' },
  { value: 4, label: 'Recursos Humanos' }
]

const { handleSubmit, values, errors, submitCount, setFieldValue } = useForm({
  validationSchema: toTypedSchema(employeeSchema),
  validateOnMount: false,
  keepValuesOnUnmount: true
})

const onSubmit = handleSubmit(
  (formValues) => {
    const dataToSubmit = {
      ...formValues,
      ...(employeeId.value && { id: employeeId.value })
    }
    emit('submit', dataToSubmit as EmployeeSchema & { id?: number })
  },
  (errors) => {
    console.log('Errores de validación:', errors)
  }
)

const setDayOfWork = (day: number, checked: boolean) => {
  const days = [...(values.daysOfWork ?? [])]

  if (checked) {
    if (!days.includes(day)) days.push(day)
  } else {
    const index = days.indexOf(day)
    if (index !== -1) days.splice(index, 1)
  }

  setFieldValue('daysOfWork', days)
}

watch(
  () => props.initialData as EmployeeSchema & { id?: number },
  (newData) => {
    if (newData) {
      employeeId.value = (newData as any).id

      setFieldValue('name', newData.name)
      setFieldValue('lastName', newData.lastName)
      setFieldValue('dni', newData.dni)
      setFieldValue('cuil', newData.cuil)
      setFieldValue('employeeNumber', newData.employeeNumber)
      setFieldValue('sectors', newData.sectors)
      setFieldValue(
        'daysOfWork',
        Array.isArray(newData.daysOfWork) ? newData.daysOfWork : []
      )
      setFieldValue('entryTime', newData.entryTime)
      setFieldValue('exitTime', newData.exitTime)
      setFieldValue('active', newData.active)
      setFieldValue('mustClock', newData.mustClock)
      setFieldValue('leaveDate', newData.leaveDate)
      setFieldValue('reasonForLeave', newData.reasonForLeave)
      setFieldValue('email', newData.email)
      setFieldValue('phone', newData.phone)
    } else {
      employeeId.value = undefined
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
                placeholder="Ingrese el nombre"
                :model-value="values.name"
                @update:modelValue="setFieldValue('name', $event as string)"
                @blur="field.onBlur"
              />
            </FormControl>

            <FieldError
              v-if="(meta.touched || submitCount > 0) && !!errors.name"
              :errors="[errors.name]"
            />
          </FormItem>
        </FormField>

        <FormField v-slot="{ field, meta }" name="apellido">
          <FormItem class="relative">
            <FormLabel>Apellido *</FormLabel>
            <FormControl>
              <Input
                :model-value="values.lastName"
                placeholder="Ingrese el apellido"
                @update:modelValue="setFieldValue('lastName', $event as string)"
                @blur="field.onBlur"
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
        <FormField v-slot="{ field, meta }" name="dni">
          <FormItem class="relative">
            <FormLabel>DNI *</FormLabel>
            <FormControl>
              <Input
                :model-value="values.dni"
                placeholder="Ingrese el DNI"
                maxlength="8"
                @blur="field.onBlur"
                @update:modelValue="setFieldValue('dni', $event as string)"
              />
            </FormControl>
            <FieldError
              v-if="(meta.touched || submitCount > 0) && !!errors.dni"
              :errors="[errors.dni]"
            />
          </FormItem>
        </FormField>

        <FormField v-slot="{ field, meta }" name="cuil">
          <FormItem class="relative">
            <FormLabel>CUIL *</FormLabel>
            <FormControl>
              <Input
                :model-value="values.cuil"
                maxlength="11"
                placeholder="Ingrese el CUIL"
                @blur="field.onBlur"
                @update:modelValue="setFieldValue('cuil', $event as string)"
              />
            </FormControl>
            <FieldError
              v-if="(meta.touched || submitCount > 0) && !!errors.cuil"
              :errors="[errors.cuil]"
            />
          </FormItem>
        </FormField>
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField v-slot="{ field, meta }" name="email">
          <FormItem class="relative">
            <FormLabel>Correo Electrónico</FormLabel>
            <FormControl>
              <Input
                :model-value="values.email"
                type="email"
                placeholder="correo@ejemplo.com"
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

        <FormField v-slot="{ field, meta }" name="phone">
          <FormItem class="relative">
            <FormLabel>Teléfono de Contacto</FormLabel>
            <FormControl>
              <Input
                :model-value="values.phone"
                type="tel"
                placeholder="+54 9 11 1234-5678"
                @blur="field.onBlur"
                @update:modelValue="setFieldValue('phone', $event as string)"
              />
            </FormControl>
            <FieldError
              v-if="(meta.touched || submitCount > 0) && !!errors.phone"
              :errors="[errors.phone]"
            />
          </FormItem>
        </FormField>
      </div>

      <FormField v-slot="{ field, meta }" name="legajo">
        <FormItem class="relative">
          <FormLabel>Legajo *</FormLabel>
          <FormControl>
            <Input
              :model-value="values.employeeNumber"
              placeholder="Ingrese el número de legajo"
              @blur="field.onBlur"
              @update:modelValue="
                setFieldValue('employeeNumber', $event as string)
              "
            />
          </FormControl>
          <FieldError
            v-if="(meta.touched || submitCount > 0) && !!errors.employeeNumber"
            :errors="[errors.employeeNumber]"
          />
        </FormItem>
      </FormField>

      <FormField v-slot="{ meta }" name="sectors">
        <FormItem class="relative">
          <FormLabel>Sectores *</FormLabel>
          <Select
            :model-value="values.sectors"
            @update:modelValue="
              setFieldValue(
                'sectors',
                $event as unknown as { id: number; label: string }
              )
            "
          >
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Seleccione un sector" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="sector in sectores"
                :key="sector.value"
                :value="sector"
              >
                {{ sector.label }}
              </SelectItem>
            </SelectContent>
          </Select>
          <FieldError
            v-if="(meta.touched || submitCount > 0) && !!errors.sectors"
            :errors="[errors.sectors]"
          />
        </FormItem>
      </FormField>

      <FormField v-slot="{ meta }" name="diasLaborales">
        <FormItem class="relative">
          <FormLabel>Días Laborales *</FormLabel>
          <div class="flex flex-col sm:flex-row sm:flex-wrap gap-4 mt-2">
            <FormItem
              v-for="dia in diasSemana"
              :key="dia.value"
              class="flex flex-row items-center space-x-2 space-y-0"
            >
              <FormControl>
                <Checkbox
                  :checked="values.daysOfWork?.includes(dia.value) as boolean"
                  :model-value="values.daysOfWork?.includes(dia.value)"
                  @update:modelValue="
                    setDayOfWork(dia.value, $event as boolean)
                  "
                />
              </FormControl>
              <div class="leading-none">
                <FormLabel class="font-normal cursor-pointer">
                  {{ dia.label }}
                </FormLabel>
              </div>
            </FormItem>
          </div>
          <FieldError
            v-if="(meta.touched || submitCount > 0) && !!errors.daysOfWork"
            :errors="[errors.daysOfWork]"
          />
        </FormItem>
      </FormField>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField v-slot="{ field, meta }" name="horaIngreso">
          <FormItem class="relative">
            <FormLabel>Hora de Ingreso *</FormLabel>
            <FormControl>
              <Input
                v-bind="field"
                type="time"
                :model-value="values.entryTime"
                @update:modelValue="
                  setFieldValue('entryTime', $event as string)
                "
              />
            </FormControl>
            <FieldError
              v-if="(meta.touched || submitCount > 0) && !!errors.entryTime"
              :errors="[errors.entryTime]"
            />
          </FormItem>
        </FormField>

        <FormField v-slot="{ field, meta }" name="horaSalida">
          <FormItem class="relative">
            <FormLabel>Hora de Salida *</FormLabel>
            <FormControl>
              <Input
                :model-value="values.exitTime"
                type="time"
                @blur="field.onBlur"
                @update:modelValue="setFieldValue('exitTime', $event as string)"
              />
            </FormControl>
            <FieldError
              v-if="(meta.touched || submitCount > 0) && !!errors.exitTime"
              :errors="[errors.exitTime]"
            />
          </FormItem>
        </FormField>
      </div>

      <div class="space-y-4">
        <FormField name="active">
          <FormItem
            class="flex flex-row items-start space-x-3 space-y-0 relative"
          >
            <FormControl>
              <Checkbox
                :checked="values.active as boolean"
                :model-value="values.active"
                @update:modelValue="setFieldValue('active', $event as boolean)"
              />
            </FormControl>
            <div class="leading-none">
              <FormLabel class="font-normal cursor-pointer"> Activo </FormLabel>
            </div>
          </FormItem>
        </FormField>
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField v-slot="{ field, meta }" name="leaveDate">
          <FormItem class="relative">
            <FormLabel>Fecha de Baja</FormLabel>
            <FormControl>
              <Input
                :model-value="values.leaveDate"
                @blur="field.onBlur"
                type="date"
                :value="values.leaveDate || ''"
                @update:modelValue="
                  setFieldValue('leaveDate', $event as string)
                "
              />
            </FormControl>
            <FieldError
              v-if="(meta.touched || submitCount > 0) && !!errors.leaveDate"
              :errors="[errors.leaveDate]"
            />
          </FormItem>
        </FormField>

        <FormField v-slot="{ meta }" name="reasonForLeave">
          <FormItem class="relative">
            <FormLabel>Motivo de Baja</FormLabel>

            <Select
              :model-value="values.reasonForLeave"
              @update:modelValue="
                setFieldValue('reasonForLeave', $event as string)
              "
            >
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Seleccione un motivo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="motivo in motivosBaja"
                  :key="motivo.value"
                  :value="motivo"
                >
                  {{ motivo.label }}
                </SelectItem>
              </SelectContent>
            </Select>
            <FieldError
              v-if="
                (meta.touched || submitCount > 0) && !!errors.reasonForLeave
              "
              :errors="[errors.reasonForLeave]"
            />
          </FormItem>
        </FormField>
      </div>
      <div class="space-y-4">
        <FormField name="mustClock">
          <FormItem
            class="flex flex-row items-start space-x-3 space-y-0 relative !h-auto"
          >
            <FormControl>
              <Checkbox
                :checked="values.mustClock as boolean"
                :model-value="values.mustClock"
                @update:modelValue="
                  setFieldValue('mustClock', $event as boolean)
                "
              />
            </FormControl>
            <div class="leading-none">
              <FormLabel class="font-normal cursor-pointer"
                >Debe fichar</FormLabel
              >
            </div>
          </FormItem>
        </FormField>
      </div>

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
