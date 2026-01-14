<!-- @fallthroughAttributes true -->
<!-- @strictTemplates true -->

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useAttrs } from 'vue'
import { cn } from '@/lib/utils'

defineOptions({
  inheritAttrs: false
})

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
const attrs = useAttrs()

const mergedAttrs = {
  ...attrs,
  'data-slot': 'native-select-option'
} as any
</script>

<template>
  <option
    v-bind="mergedAttrs"
    :class="cn('bg-popover text-popover-foreground', props.class)"
  >
    <slot />
  </option>
</template>
