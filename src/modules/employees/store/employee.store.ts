import { computed, ref } from 'vue'
import type { EmployeeType } from '../types/Employee'
import { defineStore } from 'pinia'

export const useEmployeeStore = defineStore(
  'employee',
  () => {
    const employees = ref<EmployeeType[]>([])
    const totalEmployees = computed(() => employees.value.length)
    const monthlyGrowth = computed(() => {
      if (employees.value.length === 0) return 0
      const previousMonthTotal = 20 // Mock: Basandome de como fue el mes pasado
      const growth =
        ((employees.value.length - previousMonthTotal) / previousMonthTotal) *
        100
      return Math.round(growth)
    })

    const setEmployeesIntoStore = (newEmployees: EmployeeType) => {
      if (newEmployees.id) {
        const index = employees.value.findIndex(
          (emp) => emp.id === newEmployees.id
        )
        if (index !== -1) {
          const existingEmployee = employees.value[index]
          employees.value[index] = {
            ...newEmployees,
            token: existingEmployee?.token
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
        employees.value = [...employees.value, employeedAddId]
      }
    }

    return {
      employees,
      totalEmployees,
      monthlyGrowth,
      setEmployeesIntoStore
    }
  },
  {
    persist: true
  }
)
