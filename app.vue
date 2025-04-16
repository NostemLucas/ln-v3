<template>
  <UApp>
    <NuxtLayout>
      <NuxtRouteAnnouncer />
      <RouterView />
      <ResponsiveChip />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
import ResponsiveChip from "@/components/utils/ResponsiveChip.vue";
</script>
