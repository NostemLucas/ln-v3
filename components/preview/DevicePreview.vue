<template>
  <div class="flex flex-col items-center min-h-screen bg-gray-50">
    <ControlsBar
      :device="device"
      @update:device="device = $event"
      :orientation="orientation"
      @update:orientation="orientation = $event"
      :scale="scale"
      @update:scale="scale = $event"
    />

    <div class="flex-1 flex items-center justify-center p-8 overflow-auto">
      <DeviceFrame
        :device="device"
        :orientation="orientation"
        :scale="scale"
        :devices="deviceConfig"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  DeviceType,
  OrientationType,
  DeviceConfig,
} from "../../types/device";
import DeviceFrame from "./DeviceFrame.vue";
import ControlsBar from "./ControlsBar.vue";

const deviceConfig = ref<DeviceConfig>({
  mobile: {
    portrait: { width: 375, height: 667 },
    landscape: { width: 667, height: 375 },
  },
  tablet: {
    portrait: { width: 768, height: 1024 },
    landscape: { width: 1024, height: 768 },
  },
  desktop: {
    portrait: { width: 1024, height: 768 },
    landscape: { width: 1280, height: 720 },
  },
});

const device = ref<DeviceType>("mobile");
const orientation = ref<OrientationType>("portrait");
const scale = ref<number>(40);
</script>
