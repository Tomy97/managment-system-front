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
import { watch } from 'vue'
import type { SelectOption } from '@/core/types/Selects'

const props = defineProps<{
  initialData?: Partial<EmployeeSchema>
}>()

console.log('initialData', props.initialData)

const emit = defineEmits<{
  (e: 'submit', data: EmployeeSchema): void
  (e: 'cancel'): void
}>()

// Días de la semana
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

console.log('values', values)
const onSubmit = handleSubmit(
  (formValues) => {
    emit('submit', formValues as EmployeeSchema)
  },
  (errors) => {
    console.log('Errores de validación:', errors)
  }
)

const setDiaLaboral = (dia: number, checked: boolean) => {
  console.log('dia', dia)
  console.log('checked', checked)
  const dias = [...(values.diasLaborales ?? [])]

  if (checked) {
    if (!dias.includes(dia)) dias.push(dia)
  } else {
    const index = dias.indexOf(dia)
    if (index !== -1) dias.splice(index, 1)
  }

  setFieldValue('diasLaborales', dias)
}

watch(
  () => props.initialData as EmployeeSchema,
  (newData) => {
    console.log('newData', newData)
    if (newData) {
      setFieldValue('nombre', newData.nombre)
      setFieldValue('apellido', newData.apellido)
      setFieldValue('dni', newData.dni)
      setFieldValue('cuil', newData.cuil)
      setFieldValue('legajo', newData.legajo)
      setFieldValue('sectores', newData.sectores)
      setFieldValue(
        'diasLaborales',
        Array.isArray(newData.diasLaborales) ? newData.diasLaborales : []
      )
      setFieldValue('horaIngreso', newData.horaIngreso)
      setFieldValue('horaSalida', newData.horaSalida)
      console.log('values desde el watch', values)
    }
  },
  { immediate: true, deep: true }
)
</script>

<template>
  <Form>
    <form class="space-y-6" @submit.prevent="onSubmit">
      <!-- Primera fila: Nombre y Apellido -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField v-slot="{ field, meta }" name="nombre">
          <FormItem class="relative">
            <FormLabel>Nombre *</FormLabel>
            <FormControl>
              <Input
                placeholder="Ingrese el nombre"
                :model-value="values.nombre"
                @update:modelValue="setFieldValue('nombre', $event as string)"
                @blur="field.onBlur"
              />
            </FormControl>

            <FieldError
              v-if="(meta.touched || submitCount > 0) && !!errors.nombre"
              :errors="[errors.nombre]"
            />
          </FormItem>
        </FormField>

        <FormField v-slot="{ field, meta }" name="apellido">
          <FormItem class="relative">
            <FormLabel>Apellido *</FormLabel>
            <FormControl>
              <Input
                :model-value="values.apellido"
                placeholder="Ingrese el apellido"
                @update:modelValue="setFieldValue('apellido', $event as string)"
                @blur="field.onBlur"
              />
            </FormControl>
            <FieldError
              v-if="(meta.touched || submitCount > 0) && !!errors.apellido"
              :errors="[errors.apellido]"
            />
          </FormItem>
        </FormField>
      </div>

      <!-- Segunda fila: DNI y CUIL -->
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

      <!-- Tercera fila: Correo y Teléfono -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField v-slot="{ field, meta }" name="correoElectronico">
          <FormItem class="relative">
            <FormLabel>Correo Electrónico</FormLabel>
            <FormControl>
              <Input
                :model-value="values.correoElectronico"
                type="email"
                placeholder="correo@ejemplo.com"
                @blur="field.onBlur"
                @update:modelValue="
                  setFieldValue('correoElectronico', $event as string)
                "
              />
            </FormControl>
            <FieldError
              v-if="
                (meta.touched || submitCount > 0) && !!errors.correoElectronico
              "
              :errors="[errors.correoElectronico]"
            />
          </FormItem>
        </FormField>

        <FormField v-slot="{ field, meta }" name="telefonoContacto">
          <FormItem class="relative">
            <FormLabel>Teléfono de Contacto</FormLabel>
            <FormControl>
              <Input
                :model-value="values.telefonoContacto"
                type="tel"
                placeholder="+54 9 11 1234-5678"
                @blur="field.onBlur"
                @update:modelValue="
                  setFieldValue('telefonoContacto', $event as string)
                "
              />
            </FormControl>
            <FieldError
              v-if="
                (meta.touched || submitCount > 0) && !!errors.telefonoContacto
              "
              :errors="[errors.telefonoContacto]"
            />
          </FormItem>
        </FormField>
      </div>

      <!-- Legajo -->
      <FormField v-slot="{ field, meta }" name="legajo">
        <FormItem class="relative">
          <FormLabel>Legajo *</FormLabel>
          <FormControl>
            <Input
              :model-value="values.legajo"
              placeholder="Ingrese el número de legajo"
              @blur="field.onBlur"
              @update:modelValue="setFieldValue('legajo', $event as string)"
            />
          </FormControl>
          <FieldError
            v-if="(meta.touched || submitCount > 0) && !!errors.legajo"
            :errors="[errors.legajo]"
          />
        </FormItem>
      </FormField>

      <!-- Sectores -->
      <FormField v-slot="{ meta }" name="sectores">
        <FormItem class="relative">
          <FormLabel>Sectores *</FormLabel>
          <Select
            :model-value="values.sectores"
            @update:modelValue="
              setFieldValue(
                'sectores',
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
            v-if="(meta.touched || submitCount > 0) && !!errors.sectores"
            :errors="[errors.sectores]"
          />
        </FormItem>
      </FormField>

      <!-- Días Laborales -->
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
                  :checked="
                    values.diasLaborales?.includes(dia.value) as boolean
                  "
                  :model-value="values.diasLaborales?.includes(dia.value)"
                  @update:modelValue="
                    setDiaLaboral(dia.value, $event as boolean)
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
            v-if="(meta.touched || submitCount > 0) && !!errors.diasLaborales"
            :errors="[errors.diasLaborales]"
          />
        </FormItem>
      </FormField>

      <!-- Horarios -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField v-slot="{ field, meta }" name="horaIngreso">
          <FormItem class="relative">
            <FormLabel>Hora de Ingreso *</FormLabel>
            <FormControl>
              <Input
                v-bind="field"
                type="time"
                :model-value="values.horaIngreso"
                @update:modelValue="
                  setFieldValue('horaIngreso', $event as string)
                "
              />
            </FormControl>
            <FieldError
              v-if="(meta.touched || submitCount > 0) && !!errors.horaIngreso"
              :errors="[errors.horaIngreso]"
            />
          </FormItem>
        </FormField>

        <FormField v-slot="{ field, meta }" name="horaSalida">
          <FormItem class="relative">
            <FormLabel>Hora de Salida *</FormLabel>
            <FormControl>
              <Input
                :model-value="values.horaSalida"
                type="time"
                @blur="field.onBlur"
                @update:modelValue="
                  setFieldValue('horaSalida', $event as string)
                "
              />
            </FormControl>
            <FieldError
              v-if="(meta.touched || submitCount > 0) && !!errors.horaSalida"
              :errors="[errors.horaSalida]"
            />
          </FormItem>
        </FormField>
      </div>

      <!-- Checkboxes: Activo y Debe fichar -->
      <div class="space-y-4">
        <FormField name="activo">
          <FormItem
            class="flex flex-row items-start space-x-3 space-y-0 relative"
          >
            <FormControl>
              <Checkbox
                :checked="values.activo as boolean"
                :model-value="values.activo"
                @update:checked="setFieldValue('activo', $event as boolean)"
              />
            </FormControl>
            <div class="space-y-1 leading-none">
              <FormLabel>Activo</FormLabel>
            </div>
          </FormItem>
        </FormField>
      </div>

      <!-- Fecha de Baja y Motivo (solo si no está activo) -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField v-slot="{ field, meta }" name="fechaBaja">
          <FormItem class="relative">
            <FormLabel>Fecha de Baja</FormLabel>
            <FormControl>
              <Input
                :model-value="values.fechaBaja"
                @blur="field.onBlur"
                type="date"
                :value="values.fechaBaja || ''"
                @update:modelValue="
                  setFieldValue('fechaBaja', $event as string)
                "
              />
            </FormControl>
            <FieldError
              v-if="(meta.touched || submitCount > 0) && !!errors.fechaBaja"
              :errors="[errors.fechaBaja]"
            />
          </FormItem>
        </FormField>

        <FormField v-slot="{ field, meta }" name="motivoBaja">
          <FormItem class="relative">
            <FormLabel>Motivo de Baja</FormLabel>
            <FormControl>
              <select
                :model-value="values.motivoBaja"
                @blur="field.onBlur"
                class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                @update:modelValue="
                  setFieldValue('motivoBaja', $event as string)
                "
              >
                <option
                  v-for="motivo in motivosBaja"
                  :key="motivo.value"
                  :value="motivo.value"
                >
                  {{ motivo.label }}
                </option>
              </select>
            </FormControl>
            <FieldError
              v-if="(meta.touched || submitCount > 0) && !!errors.motivoBaja"
              :errors="[errors.motivoBaja]"
            />
          </FormItem>
        </FormField>
      </div>
      <div class="space-y-4">
        <FormField name="debeFichar">
          <FormItem
            class="flex flex-row items-start space-x-3 space-y-0 relative !h-auto"
          >
            <FormControl>
              <Checkbox
                :checked="values.debeFichar as boolean"
                :model-value="values.debeFichar"
                @update:checked="setFieldValue('debeFichar', $event)"
              />
            </FormControl>
            <div class="space-y-1 leading-none">
              <FormLabel>Debe fichar</FormLabel>
            </div>
          </FormItem>
        </FormField>
      </div>

      <!-- Botones de acción -->
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
