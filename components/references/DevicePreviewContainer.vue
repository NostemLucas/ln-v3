<script setup lang="ts">
import { ref } from "vue";
import DeviceSelector from "./DeviceSelector.vue";
import DevicePreview from "./DevicePreview.vue";
import InfoPanel from "./InfoPanel.vue";
import Slider from "./Slider.vue";

type DeviceType = "desktop" | "tablet" | "mobile";

const activeDevice = ref<DeviceType>("desktop");
const zoomLevel = ref<number>(90);

// Get the base width for each device type
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

const handleZoomChange = (value: number) => {
  zoomLevel.value = value;
};
</script>

<template>
  <div class="bg-white h-full flex flex-col">
    <div class="flex flex-col p-4 border-b">
      <div class="flex items-center justify-between mb-3">
        <h1 class="text-xl font-bold text-gray-800">Vista Previa</h1>
        <div class="flex items-center space-x-2">
          <UButton
            variant="outline"
            icon="lucide:minus"
            class="inline-flex items-center px-2 py-2 text-sm font-medium border rounded-md"
            @click="handleZoomOut"
          ></UButton>
          <span class="text-sm font-medium w-12 text-center"
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

        <div class="flex-1 ml-4">
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
            class="cursor-pointer"
          />
        </div>
      </div>
    </div>

    <div
      class="flex-1 overflow-auto bg-gray-100 p-4 flex items-center justify-center"
    >
      <div
        class="preview-container transform-gpu"
        :style="{ transform: `scale(${zoomLevel / 100})` }"
      >
        <!--       <DevicePreview
          device-type="desktop"
          :is-active="activeDevice === 'desktop'"
          :width="getBaseWidth('desktop')"
        />

        <DevicePreview
          device-type="tablet"
          :is-active="activeDevice === 'tablet'"
          :width="getBaseWidth('tablet')"
        />

        <DevicePreview
          device-type="mobile"
          :is-active="activeDevice === 'mobile'"
          :width="getBaseWidth('mobile')"
        /> -->
        <DevicePreview
          :device-type="activeDevice"
          :is-active="true"
          :width="getBaseWidth(activeDevice)"
        />
      </div>
    </div>

    <div class="border-t p-4">
      <InfoPanel />
    </div>
  </div>
</template>
