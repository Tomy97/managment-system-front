<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{
  status: boolean
}>()
</script>

<template>
  <span
    :class="
      cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border',
        props.status
          ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
          : 'bg-red-100 text-red-600 border-red-200'
      )
    "
  >
    {{ props.status ? 'Sí' : 'No' }}
  </span>
</template>
