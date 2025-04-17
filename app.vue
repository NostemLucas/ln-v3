<template>
  <UApp>
    <NuxtLayout>
      <NuxtRouteAnnouncer />
      <NuxtPage />
      <ResponsiveChip />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
import ResponsiveChip from "@/components/utils/ResponsiveChip.vue";
</script>
