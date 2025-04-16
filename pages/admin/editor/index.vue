<template>
  <!-- todo: revisar la impelmtacion del deslizble -->
  <div class="w-full h-full overflow-hidden">
    <div class="flex flex-col gap-4 w-full h-full">
      <div class="w-full h-full space-y-1">
        <p class="text-3xl font-semibold">Oncoclinic Clinica Oncologica</p>
        <div class="flex flex-row gap-3 w-full items-center">
          <span
            class="h-3 w-3 bg-wild-sand-600 rounded-full inline-block -translate-y-0.5"
          />
          <p class="font-semibold m-0">En revisión:</p>
          <p class="font-medium text-wild-sand-600 m-0">
            Productor de Contenido
          </p>
        </div>

        <UTabs
          variant="link"
          :items="items"
          v-model="selectedTab"
          class="w-full h-full"
          :ui="{
            label: 'text-wild-sand-700 cursor-pointer',
            indicator: 'bg-wild-sand-400 text-wild-sand-950',
            content: ' h-full',
          }"
        >
          <template #informacion> <PropertyTab /></template>
          <template #elementos> dsdsd</template>
          <template #fotos> dsdsd</template>
          <template #estadisticas> dsdsd</template>
        </UTabs>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TabsItem } from "@nuxt/ui";
import PropertyTab from "~/components/editor/tabs/PropertyTab.vue";
definePageMeta({
  layout: "admin",
  title: "Editor",
  meta: {
    auth: true,
    admin: true,
  },
});

const items = [
  { label: "informacion", value: "informacion", slot: "informacion" },
  {
    label: "Elementos Destacados",
    value: "elementos-destacados",
    slot: "elementos",
  },
  { label: "Fotos", value: "fotos", slot: "fotos" },
  { label: "Estadisticas", value: "estadisticas", slot: "estadisticas" },
] satisfies TabsItem[];

const selectedTab = ref(items[0].value);
</script>
