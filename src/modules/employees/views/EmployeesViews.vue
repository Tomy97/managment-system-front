<script setup lang="ts">
import { ref } from 'vue'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, Plus } from 'lucide-vue-next'
import FormEmployeeDialog from '../components/dialog/FormEmployeeDialog.vue'
import EmployeesTable from '../components/table/EmployeesTable.vue'
import { useEmployeeStore } from '../store/employee.store'

const searchQuery = ref('')

const employeeStore = useEmployeeStore()

console.log('uuid', crypto.randomUUID())
</script>

<template>
  <div class="w-full p-4 md:p-6 lg:p-8">
    <div class="mx-auto max-w-7xl">
      <Card>
        <CardHeader>
          <div
            class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <CardTitle class="text-2xl">Gestión de Empleados</CardTitle>

            <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div class="relative flex-1 sm:min-w-[250px]">
                <Search
                  class="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  v-model="searchQuery"
                  type="search"
                  placeholder="Buscar..."
                  class="pl-9"
                />
              </div>

              <FormEmployeeDialog
                buttonText="Nuevo Empleado"
                :icon="Plus"
                title="Nuevo Empleado"
                description="Completa el formulario para agregar un nuevo empleado al sistema."
                @submit="employeeStore.setEmployeesIntoStore"
              />
            </div>
          </div>
        </CardHeader>

        <!-- Table Section -->
        <CardContent>
          <EmployeesTable :employees="employeeStore.employees" />
        </CardContent>
      </Card>
    </div>
  </div>
</template>
