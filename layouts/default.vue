<template>
  <div class="w-full min-h-screen overflow-x-hidden">
    <TopBar />
    <slot />
    <Footer />
  </div>
</template>
<script lang="ts" setup>
import TopBar from "@/components/navigation/TopBar.vue";
import Footer from "@/components/navigation/Footer.vue";
</script>
