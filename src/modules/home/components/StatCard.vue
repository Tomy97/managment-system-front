<script setup lang="ts">
interface IProps {
  title: string
  value: string | number
  trend?: string
  trendLabel?: string
  icon: any
  subIcon?: any
}

const props = defineProps<IProps>()
</script>

<template>
  <div
    class="relative overflow-hidden rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md"
  >
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-muted-foreground">
          {{ props.title }}
        </p>
        <p class="mt-2 text-3xl font-bold text-card-foreground">
          {{ props.value }}
        </p>
        <p class="mt-1 text-xs text-muted-foreground">
          <component
            v-if="props.subIcon"
            :is="props.subIcon"
            class="inline h-3 w-3 text-destructive mr-1"
          />
          <span v-if="props.trend" class="text-destructive">{{
            props.trend
          }}</span>
          <span class="text-muted-foreground ml-1">{{ props.trendLabel }}</span>
        </p>
      </div>
      <div
        class="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 dark:bg-destructive/20"
      >
        <component :is="props.icon" class="h-6 w-6 text-destructive" />
      </div>
    </div>
  </div>
</template>
