<script setup lang="ts">
import { ref, watch } from "vue";

interface SliderProps {
  modelValue: number;
  min?: number;
  max?: number;
  step?: number;
}

const props = withDefaults(defineProps<SliderProps>(), {
  min: 0,
  max: 100,
  step: 1,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

const internalValue = ref(props.modelValue);

// Watch for external changes
watch(
  () => props.modelValue,
  (newValue) => {
    internalValue.value = newValue;
  }
);

const handleInput = (event: Event) => {
  const value = parseInt((event.target as HTMLInputElement).value);
  internalValue.value = value;
  emit("update:modelValue", internalValue.value);
};
</script>

<template>
  <div class="relative flex items-center w-full">
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :value="modelValue"
      @input="handleInput"
      class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
    />
  </div>
</template>
