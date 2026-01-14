<script setup lang="ts">
import { Button } from '@/core/components/ui/button'
import type { FunctionalComponent } from 'vue'
import { useRouter } from 'vue-router'

interface Props {
  title: string
  description: string
  icon: FunctionalComponent
  routeName: string
  to?: string
}

defineProps<Props>()
const router = useRouter()
const navigateTo = (route: string) => {
  router.push({ name: route })
}
</script>

<template>
  <div
    class="group relative overflow-hidden rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-lg hover:border-destructive/50"
  >
    <div class="flex items-start justify-between">
      <div class="flex-1">
        <div
          class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10 dark:bg-destructive/20 transition-colors group-hover:bg-destructive/20"
        >
          <component :is="icon" class="h-6 w-6 text-destructive" />
        </div>
        <h3 class="text-lg font-semibold text-card-foreground">{{ title }}</h3>
        <p class="mt-2 text-sm text-muted-foreground">{{ description }}</p>
      </div>
    </div>
    <div class="mt-6">
      <Button
        variant="outline"
        size="sm"
        class="w-full group-hover:border-destructive"
        @click="navigateTo(routeName)"
      >
        Ver más
      </Button>
    </div>
  </div>
</template>
