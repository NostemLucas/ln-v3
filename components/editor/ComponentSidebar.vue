<template>
  <div class="flex flex-col h-full">
    <!-- Componentes arrastrables -->
    <div class="p-4 overflow-y-auto flex-grow">
      <div class="space-y-2">
        <div
          v-for="component in availableComponents"
          :key="component.type"
          class="bg-white p-3 rounded-md cursor-move hover:bg-gray-50 transition-colors flex items-center gap-2 border border-gray-200 shadow-sm"
          @click="$emit('add-component', component.type)"
        >
          <Icon :name="getIcon(component.type)" class="h-5 w-5 text-gray-500" />
          <span class="text-sm font-medium">{{ component.label }}</span>
        </div>
      </div>
    </div>

    <!-- Botones de acción -->
    <div class="p-4 border-t border-gray-200 bg-gray-50 space-y-2">
      <button
        @click="$emit('export-content')"
        class="w-full py-2 px-4 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
      >
        <Icon name="lucide:download" class="h-4 w-4" />
        Exportar JSON
      </button>

      <button
        @click="$emit('show-preview')"
        class="w-full py-2 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 shadow-sm"
      >
        <Icon name="lucide:eye" class="h-4 w-4" />
        Vista Previa
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import type { ComponentDefinition } from "~/types/content-builder";

defineProps({
  availableComponents: {
    type: Array as () => ComponentDefinition[],
    required: true,
  },
});

defineEmits(["add-component", "export-content", "show-preview"]);

// Helper functions
const getIcon = (type: string): string => {
  switch (type) {
    case "title":
      return "lucide:heading-1";
    case "subtitle":
      return "lucide:heading-2";
    case "text":
      return "lucide:text";
    case "divider":
      return "lucide:minus";
    case "image":
      return "lucide:image";
    case "video":
      return "lucide:video";
    case "columns":
      return "lucide:columns";
    case "list":
      return "lucide:list";
    case "quote":
      return "lucide:quote";
    case "code":
      return "lucide:code";
    case "table":
      return "lucide:table";
    default:
      return "lucide:text";
  }
};
</script>
