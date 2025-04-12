<template>
  <NuxtLink
    class="group h-full overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-md rounded-2xl p-6"
  >
    <div class="relative h-64 overflow-hidden rounded-2xl">
      <NuxtImg
        :src="image"
        :alt="title"
        class="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"
      />
    </div>
    <div class="pt-6">
      <h3 class="mb-3 text-xl font-semibold text-slate-800">{{ title }}</h3>
      <p class="mb-4 text-slate-600">{{ description }}</p>
      <UBadge
        variant="solid"
        icon="lucide:timer"
        :label="time"
        class="bg-transparent"
        :ui="{
          base: 'text-slate-400',
        }"
      />
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  image: string;
  link: string;
  time: string;
}>();
</script>
