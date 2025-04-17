<script setup lang="ts">
import Icon from "@nuxt/ui/runtime/components/Icon.vue";
import { useDropZone } from "@vueuse/core";
import { shallowRef, useTemplateRef } from "vue";

const imageFilesData = shallowRef<
  {
    name: string;
    size: number;
    type: string;
    lastModified: number;
    url: string;
  }[]
>([]);

function onImageDrop(files: File[] | null) {
  imageFilesData.value = [];
  if (files) {
    imageFilesData.value = files.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      url: URL.createObjectURL(file),
    }));
  }
}

const imageDropZoneRef = useTemplateRef<HTMLElement>("imageDropZoneRef");

const { isOverDropZone: isOverImageDropZone } = useDropZone(imageDropZoneRef, {
  dataTypes: ["image/png"],
  onDrop: onImageDrop,
  multiple: true,
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="w-full h-auto relative">
      <div class="flex flex-row justify-between items-center">
        <div class="flex flex-row justify-start items-center gap-2">
          <h1 class="font-bold text-2xl">Fotos</h1>
          <p class="font-normal text-wild-sand-500">0 fotos</p>
        </div>
        <UButton
          label="Agregar Fotos"
          variant="solid"
          class="bg-wild-sand-950 text-white px-4 py-2"
        />
      </div>

      <p class="text-wild-sand-500 text-sm mb-4">
        Las fotos que agregues se incluirán en un álbum llamado "Ingrese Nombre
        de Noticia", el cual aparecerá en nuestra galería.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          ref="imageDropZoneRef"
          :class="[
            'flex flex-col w-full min-h-[200px] h-auto justify-center items-center mt-2 rounded-lg border-2 border-dashed transition-colors duration-200',
            isOverImageDropZone
              ? 'border-blue-500 bg-blue-100/30'
              : 'border-gray-300 bg-gray-100/30',
          ]"
        >
          <Icon name="lucide:upload" class="text-gray-500" />
          <div class="font-bold mb-2">Arrastra y suelta tus imágenes aquí</div>
          <div
            v-if="imageFilesData.length === 0"
            class="text-gray-500 text-center p-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-12 w-12 mx-auto mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p>Formato aceptado: PNG</p>
          </div>
        </div>

        <div
          v-if="imageFilesData.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div
            v-for="(file, index) in imageFilesData"
            :key="index"
            class="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div
              class="relative aspect-video w-full overflow-hidden bg-gray-100"
            >
              <NuxtImg
                :src="file.url"
                :alt="file.name"
                class="w-full h-full object-contain"
              />
            </div>
            <div class="p-3 text-sm">
              <p class="font-medium truncate" :title="file.name">
                {{ file.name }}
              </p>
              <p class="text-xs text-gray-500">
                {{ (file.size / 1024).toFixed(1) }} KB
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
