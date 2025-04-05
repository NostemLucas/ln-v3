<template>
  <div class="overflow-hidden rounded-lg border border-slate-200">
    <button
      class="flex w-full items-center justify-between bg-white p-4 text-left transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
      @click="$emit('toggle', id)"
      :aria-expanded="active"
      :aria-controls="`accordion-content-${id}`"
    >
      <span class="font-medium text-slate-800">{{ title }}</span>
      <Icon
        name="lucide:chevron-down"
        class="h-5 w-5 text-slate-600 transition-transform duration-200"
        :class="{ 'rotate-180': active }"
      />
    </button>
    <div
      :id="`accordion-content-${id}`"
      class="overflow-hidden transition-all duration-300"
      :class="active ? 'max-h-96' : 'max-h-0'"
    >
      <div class="border-t border-slate-200 bg-slate-50 p-4 text-slate-600">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: string;
  title: string;
  active: boolean;
}>();

defineEmits<{
  (e: "toggle", id: string): void;
}>();
</script>
