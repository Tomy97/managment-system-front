import { ref } from 'vue'
import type { EmployeeType } from '../types/Employee'
import { defineStore } from 'pinia'

export const useEmployeeStore = defineStore(
  'employee',
  () => {
    const employees = ref<EmployeeType[]>([
      {
        id: 1,
        nombre: 'Juan',
        apellido: 'Perez',
        dni: '123456789',
        cuil: '12345678901',
        legajo: '12345678901',
        activo: true,
        debeFichar: true,
        token: '12345678901'
      }
    ])

    const setEmployeesIntoStore = (newEmployees: EmployeeType) => {
      const employeedAddId = {
        ...newEmployees,
        id: employees.value.length + 1
      }
      employees.value = [...employees.value, employeedAddId]
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
