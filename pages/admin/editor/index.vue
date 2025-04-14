<template>
  <div class="grid grid-cols-10 w-full bg-cyan-200 h-full">
    <div class="col-span-7 flex justify-center items-center bg-red-500">
      <LaptopDevice />
    </div>
    <div class="col-span-3 flex justify-center items-center bg-blue-500">
      <div class="flex flex-col gap-4">
        <h1 class="text-2xl font-bold">Select Device</h1>
        <div class="flex gap-4">
          <div
            v-for="device in devices"
            :key="device.name"
            @click="selectDevice(device)"
            class="cursor-pointer p-2 border rounded-lg hover:bg-gray-200"
          >
            {{ device.name }}
          </div>
        </div>
        <component :is="selectedDevice.component" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DefaultDevice from "~/components/editor/devices/DefaultDevice.vue";
import DesktopDevice from "~/components/editor/devices/DesktopDevice.vue";
import IphoneDevice from "~/components/editor/devices/IphoneDevice.vue";
import LaptopDevice from "~/components/editor/devices/LaptopDevice.vue";
import PixelDevice from "~/components/editor/devices/PixelDevice.vue";
import TabletDevice from "~/components/editor/devices/TabletDevice.vue";

definePageMeta({
  layout: "admin",
  title: "Editor",
  meta: {
    auth: true,
    admin: true,
  },
});

interface Device {
  name: string;
  component: any;
}

const devices = [
  {
    name: "default",
    component: DefaultDevice,
  },
  {
    name: "desktop",
    component: DesktopDevice,
  },
  {
    name: "pixel",
    component: PixelDevice,
  },
  {
    name: "tablet",
    component: TabletDevice,
  },
  {
    name: "laptop",
    component: LaptopDevice,
  },
  {
    name: "iphone",
    component: IphoneDevice,
  },
];
const selectedDevice = ref(devices[0]);

const selectDevice = (device: Device) => {
  selectedDevice.value = device;
};
</script>

<style></style>
