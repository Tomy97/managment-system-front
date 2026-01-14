<script setup lang="ts">
import { Rocket } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from '@/components/ui/empty'
</script>

<template>
  <div class="flex items-center justify-center h-screen bg-background">
    <Empty class="max-w-md border border-dashed rounded-xl p-8 shadow-sm">
      <EmptyHeader>
        <EmptyMedia>
          <div class="rounded-full bg-primary/10 p-4 mb-4">
            <Rocket class="size-10 text-primary animate-pulse" />
          </div>
        </EmptyMedia>
        <EmptyTitle class="text-3xl font-bold tracking-tight">
          Módulo no disponible
        </EmptyTitle>
        <EmptyDescription class="text-base mt-2">
          Estamos trabajando arduamente para traerte esta nueva funcionalidad.
          ¡Estará lista muy pronto!
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent class="mt-6">
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" class="w-full" @click="$router.back()">
            Volver atrás
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  </div>
</template>
