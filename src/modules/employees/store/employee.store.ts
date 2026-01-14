import { ref } from 'vue'
import type { EmployeeType } from '../types/Employee'
import { defineStore } from 'pinia'

export const useEmployeeStore = defineStore(
  'employee',
  () => {
    const employees = ref<EmployeeType[]>([])

    const setEmployeesIntoStore = (newEmployees: EmployeeType) => {
      if (newEmployees.id) {
        const index = employees.value.findIndex(
          (emp) => emp.id === newEmployees.id
        )
        if (index !== -1) {
          const existingEmployee = employees.value[index]
          employees.value[index] = {
            ...newEmployees,
            token: newEmployees.token ?? existingEmployee?.token
          }
        } else {
          employees.value = [...employees.value, newEmployees]
        }
      } else {
        const employeedAddId = {
          ...newEmployees,
          id: employees.value.length + 1,
          token: crypto.randomUUID()
        }
        console.log('employeedAddId', employeedAddId)
        employees.value = [...employees.value, employeedAddId]
      }
    }

    return {
      employees,
      setEmployeesIntoStore
    }
  },
  {
    persist: true
  }
)
