<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-row gap-4 items-center">
      <UAvatar :src="avatarSrc" size="lg" class="rounded-full" alt="Avatar" />
      <div class="flex flex-col">
        <p class="text-wild-sand-950 tracking-wide font-medium">
          Por {{ authorName }}
        </p>
        <p class="text-wild-sand-900 font-thin">
          {{ locationInfo }}
        </p>
      </div>
    </div>

    <div class="flex flex-row gap-1 items-center">
      <Icon name="lucide:clock" class="text-wild-sand-950" />
      <p class="text-sm text-wild-sand-950 font-thin">
        {{ publishDate }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  authorName: {
    type: String,
    default: "Nombre del Autor",
  },
  avatarSrc: {
    type: String,
    default: "https://placehold.co/100x100",
  },
  locationInfo: {
    type: String,
    default: "",
  },
  publishDate: {
    type: String,
    default: "Fecha de publicación",
  },
});
</script>
