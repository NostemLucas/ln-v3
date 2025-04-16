<template>
  <div class="relative">
    <!-- Device Frame -->
    <div :class="getDeviceFrameClasses()" :style="getDeviceFrameStyle()">
      <div class="relative">
        <!-- Device Top Bezel (for mobile and tablet) -->
        <div
          v-if="device !== 'desktop'"
          class="absolute top-0 left-0 right-0 h-6 flex justify-center items-start z-10"
        >
          <div class="bg-black w-24 h-5 rounded-b-xl"></div>
        </div>

        <!-- Desktop monitor stand -->
        <div
          v-if="device === 'desktop'"
          class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center"
        >
          <div class="bg-gray-700 w-32 h-2 rounded-b-lg"></div>
          <div class="bg-gray-700 w-20 h-6 rounded-b-lg"></div>
        </div>

        <!-- Content Viewport -->
        <div
          class="bg-white overflow-auto rounded-2xl scrollbar-hidden"
          :style="getViewportStyle()"
        >
          <!-- Rendered Content -->
          <ContentRenderer :device="device" :orientation="orientation" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ContentRenderer from "./ContentReader.vue";
import type { DeviceType, OrientationType, DeviceConfig } from "~/types/device";

// Props definition
const props = defineProps<{
  device: DeviceType;
  orientation: OrientationType;
  scale: number;
  devices: DeviceConfig;
}>();

// Computed properties
const getDeviceFrameClasses = () => {
  const baseClasses =
    "bg-gray-800 transform transition-all duration-300 ease-in-out inline-block device-shadow";

  if (props.device === "mobile") {
    return `${baseClasses} p-3 rounded-[32px]`;
  } else if (props.device === "tablet") {
    return `${baseClasses} p-3 rounded-[24px]`;
  } else {
    return `${baseClasses} p-2 rounded-lg`;
  }
};

const getDeviceFrameStyle = () => {
  return {
    transform: `scale(${props.scale / 100})`,
    transformOrigin: "top center",
  };
};

const getViewportStyle = () => {
  const dimensions = props.devices[props.device][props.orientation];
  return {
    width: `${dimensions.width}px`,
    height: `${dimensions.height}px`,
  };
};
</script>
