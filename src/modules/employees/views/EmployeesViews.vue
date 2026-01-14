<script setup lang="ts">
import { ref } from 'vue'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, SearchIcon } from 'lucide-vue-next'
import FormEmployeeDialog from '../components/dialog/FormEmployeeDialog.vue'
import EmployeesTable from '../components/table/EmployeesTable.vue'
import { useEmployeeStore } from '../store/employee.store'
import ButtonGroup from '@/components/ui/button-group/ButtonGroup.vue'
import Button from '@/components/ui/button/Button.vue'

const searchQuery = ref('')

const employeeStore = useEmployeeStore()
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
              <ButtonGroup>
                <Input placeholder="Buscar empleado..." v-model="searchQuery" type="search" />
                <Button variant="outline" aria-label="Search">
                  <SearchIcon />
                </Button>
              </ButtonGroup>
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
