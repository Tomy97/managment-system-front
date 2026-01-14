import { ref } from 'vue'
import type { EmployeeType } from '../types/Employee'
import { defineStore } from 'pinia'

export const useEmployeeStore = defineStore(
  'employee',
  () => {
    const employees = ref<EmployeeType[]>([
      {
        id: 1,
        name: 'Juan',
        lastName: 'Perez',
        email: 'juan.perez@example.com',
        phone: '+54 9 11 1234-5678',
        sectors: ['1', '2'],
        daysOfWork: [1, 2, 3, 4, 5],
        entryTime: '08:00',
        exitTime: '17:00',
        active: false,
        mustClock: false,
        dni: '12345678901',
        cuil: '12345678901',
        employeeNumber: '12345678901',
        token: '12345678901'
      }
    ])

    const setEmployeesIntoStore = (newEmployees: EmployeeType) => {
      if (newEmployees.id) {
        const index = employees.value.findIndex(
          (emp) => emp.id === newEmployees.id
        )
        if (index !== -1) {
          employees.value[index] = { ...newEmployees }
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
