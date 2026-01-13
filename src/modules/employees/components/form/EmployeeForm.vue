<script setup lang="ts">
import { computed } from 'vue'
import { z } from 'zod'
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

// Esquema de validación con zod
const employeeSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  apellido: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
  dni: z
    .string()
    .min(7, 'El DNI debe tener al menos 7 dígitos')
    .regex(/^\d+$/, 'El DNI solo puede contener números'),
  cuil: z
    .string()
    .min(11, 'El CUIL debe tener al menos 11 dígitos')
    .regex(/^\d+$/, 'El CUIL solo puede contener números'),
  correoElectronico: z
    .string()
    .email('Correo electrónico inválido')
    .optional()
    .or(z.literal('')),
  telefonoContacto: z.string().optional().or(z.literal('')),
  legajo: z.string().min(1, 'El legajo es requerido'),
  sectores: z.object({
    id: z.number(),
    nombre: z.string()
  }),
  diasLaborales: z
    .array(z.number())
    .min(1, 'Debe seleccionar al menos un día laboral'),
  horaIngreso: z.string().min(1, 'La hora de ingreso es requerida'),
  horaSalida: z.string().min(1, 'La hora de salida es requerida'),
  activo: z.boolean().default(true),
  fechaBaja: z.string().nullable().optional(),
  motivoBaja: z.string().optional(),
  debeFichar: z.boolean().default(true)
})

type EmployeeFormData = z.infer<typeof employeeSchema>

const props = defineProps<{
  initialData?: Partial<EmployeeFormData>
}>()

const emit = defineEmits<{
  (e: 'submit', data: EmployeeFormData): void
  (e: 'cancel'): void
}>()

// Días de la semana
const diasSemana = [
  { value: 1, label: 'Lunes' },
  { value: 2, label: 'Martes' },
  { value: 3, label: 'Miércoles' },
  { value: 4, label: 'Jueves' },
  { value: 5, label: 'Viernes' },
  { value: 6, label: 'Sábado' },
  { value: 7, label: 'Domingo' }
]

// Motivos de baja
const motivosBaja = [
  { value: '', label: 'Seleccione un motivo' },
  { value: 'renuncia', label: 'Renuncia' },
  { value: 'despido', label: 'Despido' },
  { value: 'jubilacion', label: 'Jubilación' },
  { value: 'fin_contrato', label: 'Fin de contrato' },
  { value: 'otro', label: 'Otro' }
]

// Sectores (ejemplo, debería venir del módulo de Sectores)
const sectores = [
  { id: 1, nombre: 'Administración' },
  { id: 2, nombre: 'Ventas' },
  { id: 3, nombre: 'Producción' },
  { id: 4, nombre: 'Recursos Humanos' }
]

// Configurar vee-validate
const { handleSubmit, values, errors, setFieldValue, submitCount } = useForm({
  validationSchema: toTypedSchema(employeeSchema),
  validateOnMount: false,
  initialValues: {
    nombre: props.initialData?.nombre || '',
    apellido: props.initialData?.apellido || '',
    dni: props.initialData?.dni || '',
    cuil: props.initialData?.cuil || '',
    correoElectronico: props.initialData?.correoElectronico || '',
    telefonoContacto: props.initialData?.telefonoContacto || '',
    legajo: props.initialData?.legajo || '',
    sectores: props.initialData?.sectores || { id: undefined, nombre: '' },
    diasLaborales: props.initialData?.diasLaborales || [],
    horaIngreso: props.initialData?.horaIngreso || '',
    horaSalida: props.initialData?.horaSalida || '',
    activo: props.initialData?.activo ?? true,
    fechaBaja: props.initialData?.fechaBaja || null,
    motivoBaja: props.initialData?.motivoBaja || '',
    debeFichar: props.initialData?.debeFichar ?? true
  }
})

const onSubmit = handleSubmit(
  (formValues) => {
    emit('submit', formValues as EmployeeFormData)
  },
  (errors) => {
    console.log('Errores de validación:', errors)
  }
)

const showFechaBaja = computed(() => !values.activo)

const toggleDiaLaboral = (dia: number) => {
  const currentDias = Array.isArray(values.diasLaborales)
    ? [...values.diasLaborales]
    : []
  const index = currentDias.indexOf(dia)

  if (index > -1) {
    currentDias.splice(index, 1)
  } else {
    currentDias.push(dia)
  }

  setFieldValue('diasLaborales', currentDias)
}
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
                :model-value="field.value"
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
                :model-value="field.value"
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
                :model-value="field.value"
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
                :model-value="field.value"
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
                :model-value="field.value"
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
                :model-value="field.value"
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
              :model-value="field.value"
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
      <FormField v-slot="{ field, meta }" name="sectores">
        <FormItem class="relative">
          <FormLabel>Sectores *</FormLabel>
          <Select
            :model-value="field.value"
            @update:modelValue="
              setFieldValue(
                'sectores',
                $event as unknown as { id: number; nombre: string }
              )
            "
          >
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Seleccione un sector" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="sector in sectores"
                :key="sector.id"
                :value="sector"
              >
                {{ sector.nombre }}
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
      <FormField v-slot="{ value, meta }" name="diasLaborales">
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
                  :checked="(value as number[])?.includes(dia.value)"
                  @update:modelValue="toggleDiaLaboral(dia.value)"
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
                :model-value="field.value"
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
        <FormField v-slot="{ field }" name="activo">
          <FormItem
            class="flex flex-row items-start space-x-3 space-y-0 relative"
          >
            <FormControl>
              <Checkbox
                :checked="field.value as boolean"
                @update:checked="setFieldValue('activo', $event as boolean)"
              />
            </FormControl>
            <div class="space-y-1 leading-none">
              <FormLabel>Activo</FormLabel>
            </div>
          </FormItem>
        </FormField>

        <FormField v-slot="{ field }" name="debeFichar">
          <FormItem
            class="flex flex-row items-start space-x-3 space-y-0 relative !h-auto"
          >
            <FormControl>
              <Checkbox
                :checked="field.value as boolean"
                @update:checked="setFieldValue('debeFichar', $event as boolean)"
              />
            </FormControl>
            <div class="space-y-1 leading-none">
              <FormLabel>Debe fichar</FormLabel>
            </div>
          </FormItem>
        </FormField>
      </div>

      <!-- Fecha de Baja y Motivo (solo si no está activo) -->
      <div v-if="showFechaBaja" class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField v-slot="{ field, meta }" name="fechaBaja">
          <FormItem class="relative">
            <FormLabel>Fecha de Baja</FormLabel>
            <FormControl>
              <Input
                :model-value="field.value"
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
                :model-value="field.value"
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
