<template>
  <div class="w-full h-full">
    <header>
      <UButton label="Ubicaciones" icon="lucide:chevron-left" variant="ghost" />
    </header>
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
