import { z } from 'zod'
import type { EmployeeType } from './../types/Employee.d'

export type EmployeeSchema = z.infer<typeof employeeSchema> & EmployeeType

export const employeeSchema = z.object({
  name: z
    .string({ required_error: 'El nombre es requerido' })
    .min(1, 'El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres'),
  lastName: z
    .string({ required_error: 'El apellido es requerido' })
    .min(1, 'El apellido es requerido')
    .min(2, 'El apellido debe tener al menos 2 caracteres'),
  dni: z
    .string({ required_error: 'El DNI es requerido' })
    .min(1, 'El DNI es requerido')
    .min(7, 'El DNI debe tener al menos 7 dígitos')
    .regex(/^\d+$/, 'El DNI solo puede contener números'),
  cuil: z
    .string({ required_error: 'El CUIL es requerido' })
    .min(1, 'El CUIL es requerido')
    .min(11, 'El CUIL debe tener al menos 11 dígitos')
    .regex(/^\d+$/, 'El CUIL solo puede contener números'),
  email: z
    .string()
    .email('Correo electrónico inválido')
    .optional()
    .or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  employeeNumber: z.preprocess(
    (val) => {
      if (val === '' || val === null || val === undefined) {
        return undefined
      }
      if (typeof val === 'string') {
        const num = Number(val)
        return isNaN(num) ? val : num
      }
      return val
    },
    z
      .number({
        required_error: 'El legajo es requerido',
        invalid_type_error: 'El legajo debe ser un número'
      })
      .int('El legajo debe ser un número entero')
      .min(1, 'El legajo es requerido')
  ),
  sectors: z.object(
    {
      value: z.number(),
      label: z.string()
    },
    { required_error: 'Debe seleccionar un sector' }
  ),
  daysOfWork: z
    .array(z.number(), {
      required_error: 'Debe seleccionar al menos un día laboral'
    })
    .min(1, 'Debe seleccionar al menos un día laboral'),
  entryTime: z
    .string({ required_error: 'La hora de ingreso es requerida' })
    .min(1, 'La hora de ingreso es requerida'),
  exitTime: z
    .string({ required_error: 'La hora de salida es requerida' })
    .min(1, 'La hora de salida es requerida'),
  active: z.boolean().default(false),
  leaveDate: z.string().optional().or(z.literal('')),
  reasonForLeave: z.string().optional(),
  mustClock: z.boolean().default(false)
})
