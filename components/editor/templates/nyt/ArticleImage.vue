// ArticleImage.vue - Componente para la imagen del artículo
<template>
  <div class="flex flex-col gap-4">
    <NuxtImg
      :src="src"
      :placeholder="placeholder || 'https://placehold.co/1400x400'"
      class="rounded-sm h-86 w-full object-cover"
    />
    <p class="font-horsham text-md font-thin leading-5 text-gray-400">
      {{ caption }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  src: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "https://placehold.co/1400x400",
  },
  caption: {
    type: String,
    default: "",
  },
});
</script>
