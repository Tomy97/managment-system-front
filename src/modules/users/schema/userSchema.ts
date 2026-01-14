import { z } from 'zod'

export const userSchema = z.object({
  name: z
    .string({ required_error: 'El nombre es requerido' })
    .min(1, 'El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres'),
  lastName: z
    .string({ required_error: 'El apellido es requerido' })
    .min(1, 'El apellido es requerido')
    .min(2, 'El apellido debe tener al menos 2 caracteres'),
  email: z
    .string({ required_error: 'El correo electrónico es requerido' })
    .email('El correo electrónico es requerido'),

  role: z.object(
    {
      value: z.number({ required_error: 'El rol es requerido' }),
      label: z.string({ required_error: 'El rol es requerido' })
    },
    { required_error: 'Debe seleccionar un rol' }
  )
})

export type UserSchema = z.infer<typeof userSchema>
