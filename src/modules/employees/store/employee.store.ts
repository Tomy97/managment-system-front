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
        active: true,
        mustClock: true,
        dni: '12345678901',
        cuil: '12345678901',
        employeeNumber: '12345678901',
        token: '12345678901'
      }
    ])

    const setEmployeesIntoStore = (newEmployees: EmployeeType) => {
      // Si el empleado tiene un id, significa que es una edición
      if (newEmployees.id) {
        const index = employees.value.findIndex(
          (emp) => emp.id === newEmployees.id
        )
        if (index !== -1) {
          // Actualizar el empleado existente
          employees.value[index] = { ...newEmployees }
        } else {
          // Si no se encuentra, agregarlo (caso raro)
          employees.value = [...employees.value, newEmployees]
        }
      } else {
        // Si no tiene id, es un nuevo empleado
        const employeedAddId = {
          ...newEmployees,
          id: employees.value.length + 1
        }
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
