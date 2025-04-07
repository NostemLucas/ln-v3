<template>
  <div
    class="bg-white border-b border-gray-200 p-4 shadow-sm flex justify-between items-center"
  >
    <h1 class="text-xl font-bold text-gray-800 flex items-center gap-2">
      <Icon name="lucide:newspaper" class="h-5 w-5 text-emerald-600" />
      Editor de Artículos
    </h1>
    <div class="flex items-center gap-2">
      <span class="text-sm text-gray-500">{{ blocksCount }} componentes</span>
      <button
        @click="$emit('clear-all')"
        class="text-sm text-red-500 hover:text-red-700 flex items-center gap-1"
        v-if="blocksCount > 0"
      >
        <Icon name="lucide:trash-2" class="h-4 w-4" />
        Limpiar todo
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

defineProps({
  blocksCount: {
    type: Number,
    required: true,
  },
});

defineEmits(["clear-all"]);
</script>
