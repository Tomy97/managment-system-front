<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import Empty from '@/components/ui/empty/Empty.vue';
import EmptyContent from '@/components/ui/empty/EmptyContent.vue';
import EmptyDescription from '@/components/ui/empty/EmptyDescription.vue';
import EmptyHeader from '@/components/ui/empty/EmptyHeader.vue';
import EmptyMedia from '@/components/ui/empty/EmptyMedia.vue';
import EmptyTitle from '@/components/ui/empty/EmptyTitle.vue';
import { RoutePath } from '@/routes/types/route.enum';
import { CheckCircle } from 'lucide-vue-next';

</script>

<template>
  <div class="flex items-center justify-center h-screen bg-background">
    <Empty class="max-w-md border border-dashed rounded-xl p-8 shadow-sm">
      <EmptyHeader>
        <EmptyMedia class="m-0">
          <div class="rounded-full p-2 text-green-500">
            <CheckCircle class="size-10" />
          </div>
        </EmptyMedia>
        <EmptyTitle class="text-3xl font-bold tracking-tight">
          Activación exitosa
        </EmptyTitle>
        <EmptyDescription class="text-base mt-2">
          El empleado ha sido activado correctamente.
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent class="mt-6">
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" class="w-full" @click="$router.push(RoutePath.HOME)">
            Ir a la página de inicio
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  </div>
</template>
