<script setup lang="ts">
import { ref } from 'vue'
import GenericDialog from './GenericDialog.vue'
import { useQRCode } from '@vueuse/integrations/useQRCode'
import InputGroup from '@/components/ui/input-group/InputGroup.vue'
import InputGroupInput from '@/components/ui/input-group/InputGroupInput.vue'
import InputGroupAddon from '@/components/ui/input-group/InputGroupAddon.vue'
import InputGroupButton from '@/components/ui/input-group/InputGroupButton.vue'
import { CheckIcon, CopyIcon } from 'lucide-vue-next'
import { useClipboard } from '@vueuse/core'

const props = defineProps<{
  token: string
}>()

const openDialog = ref<boolean>(false)
const qrcode = useQRCode(props.token)
const { copy, copied } = useClipboard()

console.log('qrcode', qrcode)
const onStateDialogChange = (value: boolean) => {
  openDialog.value = value
}
</script>

<template>
  <GenericDialog
    :open="openDialog"
    @update:open="onStateDialogChange"
    buttonText="Token"
    title="Activacion"
    buttonVariant="outline"
    buttonClass="cursor-pointer border-slate-900"
  >
    <div class="py-4 space-y-4">
      <div class="flex justify-center items-center w-full h-full">
        <img :src="qrcode" alt="QR Code" />
      </div>
      <div class="grid w-full max-w-sm gap-6 justify-center">
        <InputGroup>
          <InputGroupInput :model-value="props.token" read-only />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              aria-label="Copy"
              title="Copy"
              size="icon-xs"
              @click="copy(props.token)"
            >
              <CheckIcon v-if="copied" />
              <CopyIcon v-if="!copied" />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  </GenericDialog>
</template>
