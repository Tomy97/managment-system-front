import { z } from 'zod'

export const sectionSchema = z.object({
  name: z
    .string({ required_error: 'El nombre es requerido' })
    .min(1, 'El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
})

export type SectionSchema = z.infer<typeof sectionSchema>