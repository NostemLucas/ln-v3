<template>
  <div class="w-full min-h-screen overflow-x-hidden">
    <TopBar />
    <slot />
    <Footer />
  </div>
</template>
<script lang="ts" setup>
import TopBar from "~/components/navigation/default/DefaultTopBar.vue";
import Footer from "~/components/navigation/default/DefaultFooter.vue";
</script>
