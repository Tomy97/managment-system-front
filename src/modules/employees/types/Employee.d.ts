export type EmployeeType = {
  id: number
  name: string
  lastName: string
  dni: string
  cuil: string
  employeeNumber: string
  active: boolean
  mustClock: boolean
  email: string
  phone: string
  sectors: string[]
  daysOfWork: number[]
  entryTime: string
  exitTime: string
  token?: string
}
