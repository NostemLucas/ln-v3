<template>
  <sdsd />
</template>

<script setup lang="ts">
import sdsd from "@/components/editor/index.vue";
definePageMeta({
  layout: "admin",
  meta: {
    title: "Editor de Artículos",
    description: "Crea y edita artículos de manera sencilla.",
  },
  /* auth: {
    roles: ["admin", "editor"],
    redirect: "/login",
  }, */
});
</script>
