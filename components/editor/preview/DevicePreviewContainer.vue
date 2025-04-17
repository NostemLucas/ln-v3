<script setup lang="ts">
import DeviceSelector from "./DeviceSelector.vue";
import DevicePreview from "./DevicePreview.vue";
import InfoPanel from "./InfoPanel.vue";

type DeviceType = "desktop" | "tablet" | "mobile";

const activeDevice = ref<DeviceType>("mobile");
const zoomLevel = ref<number>(100);
const scrollContainer = ref(null);

// Tamaños base para dispositivos
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

// Tamaños base para dispositivos
const getBaseHeight = (device: DeviceType): number => {
  switch (device) {
    case "desktop":
      return 800;
    case "tablet":
      return 1024;
    case "mobile":
      return 844;
    default:
      return 800;
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
  const baseHeight = getBaseHeight(device);
  return {
    width: `${baseWidth * (zoomLevel.value / 100)}px`,
    height: `${baseHeight * (zoomLevel.value / 100)}px`,
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
          <!--     <div class="flex-1 ml-4">
            <USlider
              v-model="zoomLevel"
              :min="30"
              :max="150"
              :step="1"
              :ui="{
                range:
                  'h-2 bg-wild-sand-600 rounded-lg appearance-none cursor-pointer',
                track:
                  'h-2 bg-wild-sand-200 rounded-lg appearance-none cursor-pointer',
                thumb:
                  'h-4 w-4  rounded-full border-2 ring-wild-sand-600 cursor-pointer',
              }"
              class="cursor-pointer z-50"
            />
          </div> -->
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
      v-dragscroll
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
              transformOrigin: 'center center',
              width: `${getBaseWidth(activeDevice)}px`,
              height: `${getBaseHeight(activeDevice)}px`,
            }"
          >
            <DevicePreview
              :device-type="activeDevice"
              :is-active="true"
              :width="getBaseWidth(activeDevice)"
              :height="getBaseHeight(activeDevice)"
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
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
