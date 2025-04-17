<template>
  <div class="flex flex-col gap-4">
    <!-- categoría -->
    <div class="font-bold uppercase tracking-wider text-black">
      {{ categoria }}
    </div>
    <!-- título principal -->
    <h2 class="text-4xl font-semibold italic leading-11 text-black">
      {{ title }}
    </h2>
    <!-- descripción corta -->
    <div
      class="text-xl leading-7 text-wild-sand-800/80 font-horsham font-extralight"
    >
      {{ description }}
    </div>
    <!-- botones de acción -->
    <span class="border-t-2 border-wild-sand-100 w-full h-1" />
    <div class="space-x-3">
      <UButton
        variant="outline"
        size="xl"
        class="rounded-full text-black ring-wild-sand-400"
        icon="lucide:share-2"
      />
      <UButton
        variant="outline"
        size="xl"
        class="rounded-full text-black ring-wild-sand-400"
        icon="lucide:book-marked"
      >
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  categoria: {
    type: String,
    default: "Categoría",
  },
  title: {
    type: String,
    default: "Título del artículo",
  },
  description: {
    type: String,
    default: "Descripción corta del artículo",
  },
});
</script>
