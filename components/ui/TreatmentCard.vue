<template>
  <div
    class="group h-full overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
  >
    <div class="relative h-48 overflow-hidden">
      <img
        :src="image"
        :alt="title"
        class="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"
      ></div>
    </div>
    <div class="p-6">
      <h3 class="mb-3 text-xl font-semibold text-slate-800">{{ title }}</h3>
      <p class="mb-4 text-slate-600">{{ description }}</p>
      <router-link
        :to="link"
        class="inline-flex items-center rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
      >
        Ver detalles
        <Icon name="lucide:chevron-right" class="ml-2 h-4 w-4" />
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  image: string;
  link: string;
}>();
</script>
