<template>
  <!-- Banner Template -->
  <div v-if="selectedTemplate === 'banner'" class="relative">
    <img
      :src="fixedFields.bannerImage || 'https://placehold.co/1920x1800/png'"
      alt="Banner"
      class="w-full h-64 object-cover"
    />
    <div
      class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6"
    >
      <div class="max-w-4xl mx-auto">
        <div class="text-white/80 mb-1">
          {{
            fixedFields.category
              ? fixedFields.category.toUpperCase()
              : "CATEGORÍA"
          }}
          |
          {{
            fixedFields.date
              ? new Date(fixedFields.date).toLocaleDateString()
              : "FECHA"
          }}
        </div>
        <h1 class="text-3xl font-bold text-white">
          {{ fixedFields.title || "Título del artículo" }}
        </h1>
        <p class="text-white/80 mt-2">
          Por {{ fixedFields.author || "Nombre del autor" }}
        </p>
      </div>
    </div>
  </div>

  <!-- Feature Template -->
  <div v-else-if="selectedTemplate === 'feature'" class="p-6">
    <div class="max-w-4xl mx-auto">
      <div class="text-emerald-600 font-medium mb-1">
        {{
          fixedFields.category
            ? fixedFields.category.toUpperCase()
            : "CATEGORÍA"
        }}
        |
        {{
          fixedFields.date
            ? new Date(fixedFields.date).toLocaleDateString()
            : "FECHA"
        }}
      </div>
      <h1 class="text-4xl font-bold mb-2">
        {{ fixedFields.title || "Título del artículo" }}
      </h1>
      <p class="text-gray-500 mb-2">
        Por {{ fixedFields.author || "Nombre del autor" }}
      </p>
      <p class="text-gray-700 mb-4">
        {{ fixedFields.summary || "Resumen del artículo..." }}
      </p>
      <img
        :src="fixedFields.bannerImage || 'https://placehold.co/1920x1800/png'"
        alt="Banner"
        class="w-full h-64 object-cover rounded-md mb-6"
      />
    </div>
  </div>

  <!-- Minimal Template -->
  <div v-else-if="selectedTemplate === 'minimal'" class="p-6">
    <div class="max-w-3xl mx-auto">
      <div class="text-center text-gray-500 mb-1">
        {{
          fixedFields.category
            ? fixedFields.category.toUpperCase()
            : "CATEGORÍA"
        }}
        |
        {{
          fixedFields.date
            ? new Date(fixedFields.date).toLocaleDateString()
            : "FECHA"
        }}
      </div>
      <h1 class="text-3xl font-bold mb-2 text-center">
        {{ fixedFields.title || "Título del artículo" }}
      </h1>
      <p class="text-gray-500 mb-4 text-center">
        Por {{ fixedFields.author || "Nombre del autor" }}
      </p>
      <img
        :src="fixedFields.bannerImage || 'https://placehold.co/1920x1800/png'"
        alt="Banner"
        class="w-full h-64 object-cover rounded-md mb-6"
      />
      <p class="text-gray-700 text-center italic mb-6">
        {{ fixedFields.summary || "Resumen del artículo..." }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  selectedTemplate: {
    type: String,
    required: true,
  },
  fixedFields: {
    type: Object,
    required: true,
  },
});
</script>
