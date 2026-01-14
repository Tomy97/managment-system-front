<script setup lang="ts">
import { computed, ref } from 'vue'
import GenericDialog from '../../../../core/components/dialog/GenericDialog.vue'
import { useQRCode } from '@vueuse/integrations/useQRCode'
import InputGroup from '@/components/ui/input-group/InputGroup.vue'
import InputGroupInput from '@/components/ui/input-group/InputGroupInput.vue'
import InputGroupAddon from '@/components/ui/input-group/InputGroupAddon.vue'
import InputGroupButton from '@/components/ui/input-group/InputGroupButton.vue'
import { CheckIcon, CopyIcon } from 'lucide-vue-next'
import { useClipboard } from '@vueuse/core'
import { RoutePath } from '@/routes/types/route.enum'
import ButtonGroup from '@/components/ui/button-group/ButtonGroup.vue'
import Button from '@/components/ui/button/Button.vue'

const props = defineProps<{
  token: string
}>()

const openDialog = ref<boolean>(false)
const tokenUrl = computed(() => {
  return `${import.meta.env.VITE_APP_URL}/managment-system-front${RoutePath.ACTIVATION}/${props.token}`
})
const qrcode = useQRCode(tokenUrl)
const { copy, copied } = useClipboard()

const onStateDialogChange = (value: boolean) => {
  openDialog.value = value
}

const shareByWhatsApp = () => {
  window.open(
    `https://wa.me/?text=${encodeURIComponent(tokenUrl.value)}`,
    '_blank'
  )
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
    :prevent-auto-focus="true"
  >
    <div class="flex flex-col items-center gap-6 py-6">
      <div class="flex justify-center">
        <div
          class="p-[2px] rounded-[2rem] bg-border from-[#6366f1] via-[#a855f7] to-[#ec4899]"
        >
          <div
            class="bg-white p-4 rounded-[1.9rem] flex items-center justify-center relative"
          >
            <img :src="qrcode" alt="QR Code" class="w-45 h-45" />

            <div
              class="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow-md"
            >
              <div class="bg-[#0a0a0a] p-1 rounded-full">
                <svg
                  class="size-4 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full max-w-xs">
        <InputGroup>
          <InputGroupInput
            :model-value="tokenUrl"
            read-only
            class="text-center"
          />

          <InputGroupAddon align="inline-end">
            <InputGroupButton
              aria-label="Copy"
              title="Copy"
              size="icon-xs"
              @click="copy(tokenUrl)"
            >
              <CheckIcon v-if="copied" class="size-4" />
              <CopyIcon v-else class="size-4" />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
      <ButtonGroup class="items-center [--radius:9999rem]">
        <ButtonGroup class="flex-1">
          <Button variant="outline" class="gap-2" @click="shareByWhatsApp">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp"
              class="size-7"
            />
            Compartir
          </Button>
        </ButtonGroup>
      </ButtonGroup>
    </div>
  </GenericDialog>
</template>
