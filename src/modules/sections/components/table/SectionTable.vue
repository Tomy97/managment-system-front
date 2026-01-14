<script setup lang="ts">
import { Building2, Pencil, TrashIcon } from 'lucide-vue-next'
import { useSectionsStore } from '../../store/sections.store'
import type { SectionType } from '../../types/section'
import Table from '@/components/ui/table/Table.vue'
import TableHeader from '@/components/ui/table/TableHeader.vue'
import TableRow from '@/components/ui/table/TableRow.vue'
import TableHead from '@/components/ui/table/TableHead.vue'
import TableBody from '@/components/ui/table/TableBody.vue'
import TableCell from '@/components/ui/table/TableCell.vue'
import FormSectionDialog from '../dialog/FormSectionDialog.vue'
import Button from '@/components/ui/button/Button.vue'

const props = defineProps<{
  sections: SectionType[]
}>()

const sectionsStore = useSectionsStore()
</script>

<template>
  <div
    v-if="sectionsStore.sections.length === 0"
    class="flex flex-col items-center justify-center py-12 text-center"
  >
    <Building2 class="size-12 text-muted-foreground mb-4" />
    <p class="text-lg font-medium text-muted-foreground">
      No hay sectores registrados
    </p>
    <p class="text-sm text-muted-foreground mt-2">
      Agrega un nuevo sector para comenzar
    </p>
  </div>
  <Table v-else>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[50px]">ID</TableHead>
        <TableHead>Nombre</TableHead>
        <TableHead class="w-[100px]">Acciones</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="section in sectionsStore.sections" :key="section.id">
        <TableCell class="w-[50px]">
          {{ section.id }}
        </TableCell>
        <TableCell>
          {{ section.name }}
        </TableCell>
        <TableCell v-if="section.id" key="actions">
          <div class="flex items-center gap-2">
            <FormSectionDialog
              :initialData="section"
              buttonText="Editar"
              :icon="Pencil"
              title="Editar Sector"
              buttonClass="cursor-pointer border-slate-900"
              description="Completa el formulario para editar el sector."
              @submit="sectionsStore.setSectionsIntoStore($event)"
            />
            <Button
              aria-label="Eliminar sector"
              class="rounded-full cursor-pointer"
              @click="sectionsStore.deleteSection(section.id)"
              variant="destructive"
            >
              <TrashIcon class="size-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
