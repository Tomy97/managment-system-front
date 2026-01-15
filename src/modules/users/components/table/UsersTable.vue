<script setup lang="ts">
import { Edit, User } from 'lucide-vue-next'
import type { UserType } from '../../types/user'
import { useUsersStore } from '../../store/user.store'
import Table from '@/components/ui/table/Table.vue'
import TableHeader from '@/components/ui/table/TableHeader.vue'
import TableRow from '@/components/ui/table/TableRow.vue'
import TableHead from '@/components/ui/table/TableHead.vue'
import TableBody from '@/components/ui/table/TableBody.vue'
import TableCell from '@/components/ui/table/TableCell.vue'
import FormUsersDialog from '../dialog/FormUsersDialog.vue'
import type { UserSchema } from '../../schema/userSchema'

const props = defineProps<{
  users: UserType[]
}>()

const tableHeaders = [
  {
    label: 'ID',
    key: 'id'
  },
  {
    label: 'Nombre',
    key: 'name'
  },
  {
    label: 'Apellido',
    key: 'lastName'
  },
  {
    label: 'Email',
    key: 'email'
  },
  {
    label: 'Rol',
    key: 'role'
  },
  {
    label: 'Acciones',
    key: 'actions'
  }
]

const usersStore = useUsersStore()
</script>

<template>
  <div v-if="usersStore.users.length === 0">
    <div class="flex flex-col items-center justify-center py-12 text-center">
      <User class="size-12 text-muted-foreground mb-4" />
      <p class="text-lg font-medium text-muted-foreground">
        No hay usuarios registrados
      </p>
      <p class="text-sm text-muted-foreground mt-2">
        Agrega un nuevo usuario para comenzar
      </p>
    </div>
  </div>
  <Table v-else>
    <TableHeader>
      <TableRow>
        <TableHead v-for="header in tableHeaders" :key="header.key">
          {{ header.label }}
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="user in users" :key="user.id">
        <TableCell v-for="col in tableHeaders" :key="`${user.id}-${col.key}`">
          <span v-if="col.key === 'actions' && user.id">
            <div class="flex items-center gap-2">
              <FormUsersDialog
                :initialData="user as unknown as Partial<UserSchema>"
                buttonText="Editar"
                :icon="Edit"
                title="Editar Usuario"
                description="Completa el formulario para editar el usuario."
                buttonClass="cursor-pointer border-slate-900"
                @submit="usersStore.setUsersIntoStore"
              />
            </div>
          </span>
          <span v-else-if="col.key === 'role' && user.id">
            {{ user.role.label }}
          </span>
          <span v-else>
            {{ user[col.key as keyof UserType] }}
          </span>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
