<script setup lang="ts">
import DeviceSelector from "./DeviceSelector.vue";
import DevicePreview from "./DevicePreview.vue";
import InfoPanel from "./InfoPanel.vue";

type DeviceType = "desktop" | "tablet" | "mobile";

const activeDevice = ref<DeviceType>("mobile");
const zoomLevel = ref<number>(100); // Cambié el zoom inicial a 100%
const scrollContainer = ref(null);

// Simulado del tamaño base de los dispositivos
const getBaseWidth = (device: DeviceType): number => {
  switch (device) {
    case "desktop":
      return 1280;
    case "tablet":
      return 768;
    case "mobile":
      return 390;
    default:
      return 1280;
  }
};

// Handle zoom in/out
const handleZoomIn = () => {
  zoomLevel.value = Math.min(zoomLevel.value + 10, 150);
};

const handleZoomOut = () => {
  zoomLevel.value = Math.max(zoomLevel.value - 10, 30);
};

const computeContainerSize = (device: DeviceType) => {
  const baseWidth = getBaseWidth(device);
  return {
    width: `${baseWidth * (zoomLevel.value / 100)}px`,
    height: `${baseWidth * (zoomLevel.value / 100) * (9 / 16)}px`, // Ajusta la altura manteniendo una relación de aspecto razonable
  };
};
</script>

<template>
  <div class="bg-white h-full flex flex-col relative">
    <div class="flex flex-col p-4 absolute w-full z-10">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center space-x-2">
          <UButton
            variant="outline"
            icon="lucide:minus"
            class="inline-flex items-center px-2 py-2 text-sm font-medium border rounded-md"
            @click="handleZoomOut"
          />
          <span class="text-sm font-medium w-12 text-center text-black"
            >{{ zoomLevel }}%</span
          >
          <UButton
            class="inline-flex items-center px-2 py-2 text-sm font-medium border rounded-md"
            @click="handleZoomIn"
            icon="lucide:plus"
          />
        </div>
      </div>

      <div class="flex items-center space-x-4">
        <DeviceSelector
          :active-device="activeDevice"
          @update:active-device="activeDevice = $event"
        />
      </div>
    </div>

    <div
      ref="scrollContainer"
      class="scroll-container flex-1 overflow-auto p-4 cursor-grab"
    >
      <div
        class="virtual-container"
        :style="computeContainerSize(activeDevice)"
      >
        <div class="preview-wrapper flex items-center justify-center h-full">
          <div
            class="preview-container transform-gpu bg-blue"
            :style="{
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: 'top center',
              width: `${getBaseWidth(activeDevice)}px`,
            }"
          >
            <DevicePreview
              :device-type="activeDevice"
              :is-active="true"
              :width="getBaseWidth(activeDevice)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scroll-container {
  scrollbar-width: thin;
  -ms-overflow-style: auto;
  position: relative;
}

.virtual-container {
  position: relative;
  min-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
