<template>
  <div class="w-full h-full">
    <div class="flex flex-col md:flex-row gap-4 h-full">
      <div class="flex flex-col w-full md:w-[60%]">
        <div
          class="flex flex-row w-full bg-wild-sand-50 rounded p-4 gap-3 items-start"
        >
          <Icon name="lucide:clock" class="text-3xl mt-1 text-wild-sand-700" />
          <div class="flex flex-col">
            <h1 class="font-bold text-base">
              Se envió para revisión el 9 de abril
            </h1>
            <p class="text-sm text-wild-sand-700">
              Tu publicación está siendo revisada. El proceso de verificación
              puede tardar hasta cinco días. No se mostrará públicamente hasta
              que haya sido aprobada.
            </p>
          </div>
        </div>

        <div class="space-y-2 pt-3">
          <NuxtImg
            src="https://placehold.co/1400x400"
            class="w-full h-48 object-cover rounded-2xl"
          />
        </div>
      </div>

      <!-- Vista previa -->
      <div class="w-full md:w-[40%] p-4 rounded text-white h-full text-center">
        <IphoneDevice />

        <!-- Texto 1: Descripción de la vista previa -->
        <p
          class="mt-8 text-sm font-semibold text-wild-sand-500 flex flex-col gap-1 justify-center items-center"
        >
          Vista previa de la información en vivo.
          <span
            class="border-t-3 border-wild-sand-400 border-dashed h-1 w-[55%]"
          />
        </p>

        <!-- Texto 2: Acción para abrir en nueva pestaña -->
        <UButton
          href="#"
          variant="link"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center gap-1 text-sm text-blue-500 hover:text-white transition"
        >
          Ver en una nueva pestaña
          <Icon name="lucide:external-link" class="w-4 h-4" />
        </UButton>
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
import Icon from "@nuxt/ui/runtime/components/Icon.vue";
interface Device {
  name: string;
  component: Component;
}

const devices: Device[] = [
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
</script>

<style></style>
