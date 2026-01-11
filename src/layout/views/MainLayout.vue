<script setup lang="ts">
import SidebarMenu from '@/layout/components/SidebarMenu.vue'
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger
} from '@/components/ui/sidebar'
</script>

<template>
  <SidebarProvider>
    <SidebarMenu />
    <SidebarInset>
      <div class="flex items-center gap-2 p-4 md:hidden">
        <SidebarTrigger />
      </div>
      <RouterView />
    </SidebarInset>
  </SidebarProvider>
</template>
