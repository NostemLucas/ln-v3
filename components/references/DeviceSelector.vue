<script setup lang="ts">
type DeviceType = "desktop" | "tablet" | "mobile";

interface DeviceSelectorProps {
  activeDevice: DeviceType;
}

defineProps<DeviceSelectorProps>();
const emit = defineEmits<{
  (e: "update:activeDevice", value: DeviceType): void;
}>();

const handleValueChange = (value: DeviceType) => {
  emit("update:activeDevice", value);
};
</script>

<template>
  <div class="inline-flex rounded-md shadow-sm" role="group">
    <UButton
      type="button"
      variant="link"
      icon="lucide:monitor"
      size="lg"
      :class="
        activeDevice === 'desktop'
          ? 'bg-gray-200 text-gray-900'
          : 'bg-white text-gray-700 hover:bg-gray-100'
      "
      @click="handleValueChange('desktop')"
      aria-label="Desktop view"
    >
    </UButton>

    <UButton
      type="button"
      variant="link"
      icon="lucide:tablet"
      size="lg"
      :class="
        activeDevice === 'tablet'
          ? 'bg-gray-200 text-gray-900'
          : 'bg-white text-gray-700 hover:bg-gray-100'
      "
      @click="handleValueChange('tablet')"
      aria-label="Tablet view"
    >
    </UButton>
    <UButton
      type="button"
      variant="link"
      icon="lucide:smartphone"
      size="lg"
      :class="
        activeDevice === 'mobile'
          ? 'bg-gray-200 text-gray-900'
          : 'bg-white text-gray-700 hover:bg-gray-100'
      "
      @click="handleValueChange('mobile')"
      aria-label="Mobile view"
    >
    </UButton>
  </div>
</template>
