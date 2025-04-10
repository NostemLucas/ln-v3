<script setup lang="ts">
import { useRoute } from "vue-router";
import type { BreadcrumbItem } from "@nuxt/ui";

// Obtenemos la ruta actual
const route = useRoute();

// Dividimos la ruta por '/' y filtramos vacíos
const pathSegments = route.path.split("/").filter(Boolean);

// Generamos dinámicamente el breadcrumb
const items = ref<BreadcrumbItem[]>([
  {
    label: "Home",
    icon: "i-lucide-house",
    to: "/",
  },
  ...pathSegments.map((segment, index) => ({
    label: segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    icon: index === 0 ? "i-lucide-heart-pulse" : "i-lucide-link", // puedes ajustar íconos
    to: "/" + pathSegments.slice(0, index + 1).join("/"),
  })),
]);
</script>

<template>
  <UBreadcrumb :items="items" />
</template>
