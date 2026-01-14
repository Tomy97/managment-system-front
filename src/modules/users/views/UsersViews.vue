<script setup lang="ts">
import ButtonGroup from '@/components/ui/button-group/ButtonGroup.vue'
import Card from '@/components/ui/card/Card.vue'
import CardHeader from '@/components/ui/card/CardHeader.vue'
import CardTitle from '@/components/ui/card/CardTitle.vue'
import { Plus, SearchIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import FormUsersDialog from '../components/dialog/FormUsersDialog.vue'
import { useUsersStore } from '../store/user.store'
import Input from '@/components/ui/input/Input.vue'
import Button from '@/components/ui/button/Button.vue'
import CardContent from '@/components/ui/card/CardContent.vue'
import UsersTable from '../components/table/UsersTable.vue'

const searchQuery = ref('')
const usersStore = useUsersStore()
</script>

<template>
  <div class="w-full p-4 md:p-6 lg:p-8">
    <div class="mx-auto max-w-7xl">
      <Card>
        <CardHeader>
          <div
            class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <CardTitle class="text-2xl">Gestión de Usuarios</CardTitle>

            <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonGroup>
                <Input
                  placeholder="Buscar usuario..."
                  v-model="searchQuery"
                  type="search"
                />
                <Button variant="outline" aria-label="Search">
                  <SearchIcon />
                </Button>
              </ButtonGroup>
              <FormUsersDialog
                buttonText="Nuevo Usuario"
                :icon="Plus"
                title="Nuevo Usuario"
                description="Completa el formulario para agregar un nuevo usuario al sistema."
                @submit="usersStore.setUsersIntoStore"
              />
            </div>
          </div>
        </CardHeader>

        <!-- Table Section -->
        <CardContent>
          <UsersTable :users="usersStore.users" />
        </CardContent>
      </Card>
    </div>
  </div>
</template>
