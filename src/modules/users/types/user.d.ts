import type { SelectOption } from "@/core/types/Selects"

export type UserType = {
  id: number
  name: string
  lastName: string
  email: string
  role: SelectOption
}