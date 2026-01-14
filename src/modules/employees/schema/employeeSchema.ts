import { z } from 'zod'

export type EmployeeSchema = z.infer<typeof employeeSchema>

export const employeeSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  lastName: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
  dni: z
    .string()
    .min(7, 'El DNI debe tener al menos 7 dígitos')
    .regex(/^\d+$/, 'El DNI solo puede contener números'),
  cuil: z
    .string()
    .min(11, 'El CUIL debe tener al menos 11 dígitos')
    .regex(/^\d+$/, 'El CUIL solo puede contener números'),
  email: z
    .string()
    .email('Correo electrónico inválido')
    .optional()
    .or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  employeeNumber: z.string().min(1, 'El legajo es requerido'),
  sectors: z.object({
    value: z.number(),
    label: z.string()
  }),
  daysOfWork: z
    .array(z.number())
    .min(1, 'Debe seleccionar al menos un día laboral'),
  entryTime: z.string().min(1, 'La hora de ingreso es requerida'),
  exitTime: z.string().min(1, 'La hora de salida es requerida'),
  active: z.boolean().default(false),
  leaveDate: z.string().optional().or(z.literal('')),
  reasonForLeave: z.string().optional(),
  mustClock: z.boolean().default(false)
})
