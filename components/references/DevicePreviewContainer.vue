<script setup lang="ts">
import DeviceSelector from "./DeviceSelector.vue";
import DevicePreview from "./DevicePreview.vue";
import InfoPanel from "./InfoPanel.vue";

type DeviceType = "desktop" | "tablet" | "mobile";

const activeDevice = ref<DeviceType>("mobile");
const zoomLevel = ref<number>(47);
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

// Handle zoom in/out 10
const handleZoomIn = () => {
  zoomLevel.value = Math.min(zoomLevel.value + 10, 150);
};

const handleZoomOut = () => {
  zoomLevel.value = Math.max(zoomLevel.value - 10, 30);
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
          ></UButton>
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
      <!--  
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
            class="cursor-pointer z-50"
          />
        </div>
      </div> -->
    </div>

    <!-- Contenedor principal de desplazamiento -->
    <div
      ref="scrollContainer"
      class="scroll-container flex-1 overflow-auto p-4 cursor-grab"
      v-dragscroll
      style="position: relative"
    >
      <!-- Contenedor virtual que proporciona espacio adicional para el zoom -->
      <div
        class="virtual-container"
        :style="{
          width: `${Math.max(
            1000,
            getBaseWidth(activeDevice) * (zoomLevel / 50)
          )}px`,
          height: `${Math.max(
            800,
            getBaseWidth(activeDevice) * (zoomLevel / 120)
          )}px`,
        }"
      >
        <!-- Contenedor centrado para el contenido -->
        <div class="preview-wrapper flex items-center justify-center h-full">
          <div
            class="preview-container transform-gpu bg-blue"
            :style="{
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: 'center center',
              width: `${getBaseWidth(activeDevice)}px`,
            }"
          >
            <!-- Tu contenido -->
            <!--   <NuxtImg src="/logo.png" draggable="false" /> -->
            <!-- o tu DevicePreview descomentar según necesites -->

            <DevicePreview
              :device-type="activeDevice"
              :is-active="true"
              :width="getBaseWidth(activeDevice)"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 
    <div class="border-t p-4">
      <InfoPanel />
    </div> -->
  </div>
</template>

<style scoped>
.scroll-container {
  scrollbar-width: thin;
  -ms-overflow-style: auto;
  position: relative;
  /* Aseguramos que el scroll sea visible para facilitar la navegación */
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
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Si quieres ocultar las barras de desplazamiento, pero permitir el scroll */
/* Descomentar si es necesario
.scroll-container::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.scroll-container::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.scroll-container::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0.1);
}
*/
</style>
