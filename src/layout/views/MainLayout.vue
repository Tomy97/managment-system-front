<script setup lang="ts">
import SidebarMenu from '@/layout/components/SidebarMenu.vue'
</script>

<template>
  <div class="flex min-h-screen">
    <SidebarMenu />
    <main class="flex-1 ml-64">
      <RouterView />
    </main>
  </div>
</template>
