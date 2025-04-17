<script setup lang="ts">
import ContentDisplay from "./ContentDisplay.vue";

interface DevicePreviewProps {
  deviceType: "desktop" | "tablet" | "mobile";
  isActive: boolean;
  width: number;
}

const props = defineProps<DevicePreviewProps>();

// Común a todos los dispositivos
const heightByDevice = {
  desktop: 600,
  tablet: 700,
  mobile: 650,
};

const windowHeight = heightByDevice[props.deviceType];
</script>

<template>
  <div
    v-if="isActive"
    :id="`${deviceType}-preview`"
    class="device-preview origin-top transform-gpu"
  >
    <!-- Mobile design -->
    <template v-if="deviceType === 'mobile'">
      <div
        class="rounded-xl overflow-hidden shadow-2xl border-8 border-gray-800 mx-auto"
        :style="{ width: `${width}px` }"
      >
        <div class="bg-gray-800 p-2 text-white text-center">
          <div class="flex items-center justify-between">
            <div class="w-12"></div>
            <div class="h-1.5 w-32 bg-gray-600 rounded-full"></div>
            <div class="flex space-x-1">
              <div class="h-2.5 w-2.5 rounded-full bg-gray-500"></div>
            </div>
          </div>
        </div>

        <div class="bg-white">
          <div
            class="mobile-content overflow-y-auto px-6 py-2"
            :style="{ height: `${windowHeight}px`, width: `${width}px` }"
          >
            <ContentDisplay :device-type="deviceType" />
          </div>
        </div>

        <div class="bg-gray-800 p-3 flex justify-center">
          <div class="h-1 w-16 bg-gray-400 rounded-full"></div>
        </div>
      </div>
      <div class="text-center mt-2 text-xs text-gray-500">
        Móvil ({{ width }}px)
      </div>
    </template>

    <!-- Tablet design -->
    <template v-else-if="deviceType === 'tablet'">
      <div
        class="rounded-xl overflow-hidden shadow-2xl border-8 border-gray-800 mx-auto"
        :style="{ width: `${width}px` }"
      >
        <div class="bg-gray-800 p-2 text-white text-center">
          <div class="flex items-center justify-between">
            <div class="flex space-x-1">
              <div class="h-2.5 w-2.5 rounded-full bg-red-500"></div>
              <div class="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
              <div class="h-2.5 w-2.5 rounded-full bg-green-500"></div>
            </div>
            <div class="h-1.5 w-32 bg-gray-600 rounded-full"></div>
            <div class="w-12"></div>
          </div>
        </div>

        <div class="bg-white">
          <div
            class="tablet-content overflow-y-auto mx-auto"
            :style="{ height: `${windowHeight}px`, width: `${width}px` }"
          >
            <ContentDisplay :device-type="deviceType" />
          </div>
        </div>

        <div class="bg-gray-800 h-2"></div>
      </div>
      <div class="text-center mt-2 text-xs text-gray-500">
        Tablet ({{ width }}px)
      </div>
    </template>

    <!-- Desktop design -->
    <template v-else>
      <div
        class="rounded-t-lg overflow-hidden shadow-2xl mx-auto"
        :style="{ width: `${width}px` }"
      >
        <div class="bg-gray-800 p-2 text-white text-center">
          <div class="flex items-center justify-between">
            <div class="flex space-x-1">
              <div class="h-2.5 w-2.5 rounded-full bg-red-500"></div>
              <div class="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
              <div class="h-2.5 w-2.5 rounded-full bg-green-500"></div>
            </div>
            <div class="h-1.5 w-32 bg-gray-600 rounded-full"></div>
            <div class="w-16"></div>
          </div>
        </div>

        <div class="border-x border-gray-800 bg-white">
          <div
            class="desktop-content overflow-y-auto"
            :style="{ height: `${windowHeight}px`, width: `${width}px` }"
          >
            <ContentDisplay :device-type="deviceType" />
          </div>
        </div>

        <div class="bg-gray-800 h-2"></div>
      </div>
      <div class="text-center mt-2 text-xs text-gray-500">
        Desktop ({{ width }}px)
      </div>
    </template>
  </div>
</template>
