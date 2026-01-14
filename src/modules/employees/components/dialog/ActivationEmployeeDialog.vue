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

const onStateDialogChange = (value: boolean) => {
  openDialog.value = value
}
</script>

<template>
  <GenericDialog
    :open="openDialog"
    @update:open="onStateDialogChange"
    buttonText="Token"
    title="Activación"
    buttonVariant="outline"
    buttonClass="cursor-pointer border-slate-900"
  >
    <div class="flex flex-col items-center gap-6 py-6">
      <div class="flex justify-center">
        <img :src="qrcode" alt="QR Code" class="w-40 h-40" />
      </div>

      <div class="w-full max-w-xs">
        <InputGroup>
          <InputGroupInput
            :model-value="props.token"
            read-only
            class="text-center"
          />

          <InputGroupAddon align="inline-end">
            <InputGroupButton
              aria-label="Copy"
              title="Copy"
              size="icon-xs"
              @click="copy(props.token)"
            >
              <CheckIcon v-if="copied" class="size-4" />
              <CopyIcon v-else class="size-4" />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  </GenericDialog>
</template>
