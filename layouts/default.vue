<template>
  <div class="w-screen min-h-screen max-w-screen overflow-x-hidden">
    <TopBar />
    <slot />
  </div>
</template>
<script lang="ts" setup>
import TopBar from "@/components/navigation/TopBar.vue";
import Footer from "@/components/navigation/Footer.vue";
</script>
