import { z } from 'zod'

export type EmployeeSchema = z.infer<typeof employeeSchema>

export const employeeSchema = z.object({
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
    value: z.number(),
    label: z.string()
  }),
  diasLaborales: z
    .array(z.number())
    .min(1, 'Debe seleccionar al menos un día laboral'),
  horaIngreso: z.string().min(1, 'La hora de ingreso es requerida'),
  horaSalida: z.string().min(1, 'La hora de salida es requerida'),
  activo: z.boolean().default(true),
  fechaBaja: z.string().optional().or(z.literal('')),
  motivoBaja: z.string().optional(),
  debeFichar: z.boolean().default(true)
})
