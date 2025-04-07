<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
    <h2 class="text-lg font-medium mb-3 text-gray-800 flex items-center gap-2">
      <Icon name="lucide:layout-template" class="h-5 w-5 text-emerald-600" />
      Plantillas
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <!-- Opción sin plantilla -->
      <div
        class="border rounded-md p-3 cursor-pointer hover:border-emerald-500 transition-colors"
        :class="{
          'border-emerald-500 bg-emerald-50': selectedTemplate === 'none',
        }"
        @click="$emit('select-template', 'none')"
      >
        <div
          class="aspect-video bg-gray-100 mb-2 overflow-hidden flex items-center justify-center"
        >
          <Icon name="lucide:layout" class="h-10 w-10 text-gray-400" />
        </div>
        <p class="font-medium text-center">Sin Plantilla</p>
      </div>

      <!-- Plantillas predefinidas -->
      <div
        v-for="template in templates"
        :key="template.id"
        class="border rounded-md p-3 cursor-pointer hover:border-emerald-500 transition-colors"
        :class="{
          'border-emerald-500 bg-emerald-50': selectedTemplate === template.id,
        }"
        @click="$emit('select-template', template.id)"
      >
        <div class="aspect-video bg-gray-100 mb-2 overflow-hidden">
          <img
            :src="template.thumbnail"
            alt="Vista previa de plantilla"
            class="w-full h-full object-cover"
          />
        </div>
        <p class="font-medium text-center">{{ template.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import type { Template } from "~/types/content-builder";

defineProps({
  templates: {
    type: Array as () => Template[],
    required: true,
  },
  selectedTemplate: {
    type: String,
    default: null,
  },
});

defineEmits(["select-template"]);
</script>
