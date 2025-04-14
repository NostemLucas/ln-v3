<script setup lang="ts">
import { useRoute } from "vue-router";
import type { BreadcrumbItem } from "@nuxt/ui";

// Obtenemos la ruta actual
const route = useRoute();

// Dividimos la ruta por '/' y filtramos vacíos
const pathSegments = route.path.split("/").filter(Boolean);

const items = ref<BreadcrumbItem[]>([
  {
    label: "Home",
    icon: "i-lucide-house",
    to: "/",
  },
  ...pathSegments.map((segment, index) => ({
    label: segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" "),

    icon: index === 0 ? "i-lucide-heart-pulse" : "i-lucide-link",
    to: "/" + pathSegments.slice(0, index + 1).join("/"),
  })),
]);
</script>

<template>
  <UBreadcrumb
    :items="items"
    class="w-full pb-6"
    :ui="{
      linkLabel: 'text-slate-300 mt-1',
      linkLeadingIcon: 'text-slate-300',
      separatorIcon: 'text-slate-300',
    }"
  />
</template>
