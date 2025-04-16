<template>
  <div class="bg-white border-b border-gray-200 py-3 px-4 sm:px-6 w-full">
    <div
      class="container mx-auto flex flex-col sm:flex-row gap-4 sm:items-center justify-between"
    >
      <div class="flex flex-wrap gap-4 items-center">
        <!-- Device Selector -->
        <div class="flex items-center gap-2">
          <label for="device-select" class="text-sm font-medium text-gray-700"
            >Device:</label
          >
          <div class="relative">
            <select
              id="device-select"
              :value="device"
              class="bg-white border border-gray-300 text-gray-700 py-1 pl-3 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              @change="handleDeviceChange"
            >
              <option value="mobile">Mobile</option>
              <option value="tablet">Tablet</option>
              <option value="desktop">Desktop</option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Orientation Toggle -->
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium text-gray-700">Orientation:</span>
          <div class="flex p-0.5 bg-gray-100 rounded-md">
            <button
              :class="`px-3 py-1 text-sm rounded-md transition-all ${
                orientation === 'portrait'
                  ? 'bg-white shadow border border-gray-200'
                  : 'text-gray-700 hover:bg-gray-50'
              }`"
              @click="setPortraitOrientation"
            >
              <svg
                class="inline-block w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              Portrait
            </button>
            <button
              :class="`px-3 py-1 text-sm rounded-md transition-all ${
                orientation === 'landscape'
                  ? 'bg-white shadow border border-gray-200'
                  : 'text-gray-700 hover:bg-gray-50'
              }`"
              @click="setLandscapeOrientation"
            >
              <svg
                class="inline-block w-4 h-4 mr-1 transform rotate-90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              Landscape
            </button>
          </div>
        </div>

        <!-- Scale Slider -->
        <div class="flex items-center gap-2">
          <label for="scale-slider" class="text-sm font-medium text-gray-700"
            >Scale:</label
          >
          <input
            id="scale-slider"
            type="range"
            min="20"
            max="100"
            :value="scale"
            class="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            @input="handleScaleChange"
          />
          <span class="text-sm text-gray-600">{{ scale }}%</span>
        </div>
      </div>

      <!-- Right side controls -->
      <div class="flex items-center gap-3">
        <button
          class="px-2 py-1 text-sm rounded-md text-gray-700 hover:bg-gray-100 transition-all flex items-center"
          @click="refreshContent"
        >
          <svg
            class="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Refresh
        </button>
        <button
          class="px-2 py-1 text-sm rounded-md text-gray-700 hover:bg-gray-100 transition-all flex items-center"
          @click="viewCode"
        >
          <svg
            class="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
          View Code
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DeviceType, OrientationType } from "../../types/device";

const props = defineProps<{
  device: DeviceType;
  orientation: OrientationType;
  scale: number;
}>();

const emit = defineEmits<{
  "update:device": [value: DeviceType];
  "update:orientation": [value: OrientationType];
  "update:scale": [value: number];
}>();

// Event handlers
const handleDeviceChange = (e: Event) => {
  const target = e.target as HTMLSelectElement;
  emit("update:device", target.value as DeviceType);
};

const setPortraitOrientation = () => {
  emit("update:orientation", "portrait");
};

const setLandscapeOrientation = () => {
  emit("update:orientation", "landscape");
};

const handleScaleChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit("update:scale", Number(target.value));
};

const refreshContent = () => {
  // Trigger content refresh
  console.log("Refreshing content");
  window.location.reload();
};

const viewCode = () => {
  // Show content code
  console.log("Viewing code");
  // This could open a modal with the content's code
};
</script>
