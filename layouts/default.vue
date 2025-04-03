<template>
  <div class="w-screen min-h-screen overflow-x-hidden">
    <slot />
  </div>
</template>
<script lang="ts" setup>
import TopBar from "@/components/navigation/TopBar.vue";
import Footer from "@/components/navigation/Footer.vue";
</script>
