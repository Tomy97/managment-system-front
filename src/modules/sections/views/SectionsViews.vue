<script setup lang="ts">
import Card from '@/components/ui/card/Card.vue'
import CardContent from '@/components/ui/card/CardContent.vue'
import CardHeader from '@/components/ui/card/CardHeader.vue'
import CardTitle from '@/components/ui/card/CardTitle.vue'
import SectionTable from '../components/table/SectionTable.vue'
import { useSectionsStore } from '../store/sections.store'
import { Plus } from 'lucide-vue-next'
import FormSectionDialog from '../components/dialog/FormSectionDialog.vue'

const sectionsStore = useSectionsStore()
</script>

<template>
  <div class="w-full p-4 md:p-6 lg:p-8">
    <div class="mx-auto max-w-3xl">
      <Card>
        <CardHeader>
          <div
            class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <CardTitle class="text-2xl">Gestión de Sectores</CardTitle>

            <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
              <FormSectionDialog
                buttonText="Nuevo Sector"
                :icon="Plus"
                title="Nuevo Sector"
                @submit="sectionsStore.setSectionsIntoStore"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <SectionTable :sections="sectionsStore.sections" />
        </CardContent>
      </Card>
    </div>
  </div>
</template>
