<script setup lang="ts">
import type { ButtonVariants } from '@/components/ui/button'
import Button from '@/components/ui/button/Button.vue'
import Dialog from '@/components/ui/dialog/Dialog.vue'
import DialogContent from '@/components/ui/dialog/DialogContent.vue'
import DialogDescription from '@/components/ui/dialog/DialogDescription.vue'
import DialogHeader from '@/components/ui/dialog/DialogHeader.vue'
import DialogTitle from '@/components/ui/dialog/DialogTitle.vue'
import DialogTrigger from '@/components/ui/dialog/DialogTrigger.vue'
import type { Component } from 'vue'

const props = withDefaults(
  defineProps<{
    open: boolean
    buttonText: string
    title: string
    description?: string
    buttonClass?: string
    buttonVariant?: ButtonVariants['variant']
    icon?: Component
  }>(),
  {
    buttonClass:
      'bg-destructive text-destructive-foreground hover:bg-red-400 cursor-pointer text-white'
  }
)

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogTrigger as-child>
      <Button :variant="buttonVariant" :class="buttonClass">
        <component v-if="icon" :is="icon" class="size-4" />
        {{ buttonText }}
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[600px]" show-close-button>
      <DialogHeader>
        <DialogTitle>{{ title }}</DialogTitle>
        <DialogDescription v-if="description">{{ description }}</DialogDescription>
      </DialogHeader>
      <slot />
    </DialogContent>
  </Dialog>
</template>
