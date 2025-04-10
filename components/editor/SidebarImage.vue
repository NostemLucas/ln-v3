<template>
  <div>
    <div class="flex justify-between items-center mb-3 px-6">
      <h3
        class="text-sm font-medium text-gray-500 uppercase tracking-wider flex items-center gap-1"
      >
        <Icon name="lucide:image" class="h-4 w-4" />
        Biblioteca de imágenes
      </h3>
      <label
        for="image-upload"
        class="text-xs text-emerald-600 hover:text-emerald-700 cursor-pointer flex items-center gap-1"
      >
        <Icon name="lucide:upload" class="h-3 w-3" />
        Subir
      </label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        class="hidden"
        @change="uploadImage"
      />
    </div>

    <!-- Grid de imágenes -->
    <div class="grid grid-cols-2 gap-2 px-4">
      <div
        v-for="(image, index) in imageLibrary"
        :key="index"
        class="relative group aspect-square border rounded-md overflow-hidden"
      >
        <img
          :src="image.url"
          :alt="image.alt || 'Imagen de biblioteca'"
          class="w-full h-full object-cover"
        />
        <div
          class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2"
        >
          <!--           <button
            @click="insertImageFromLibrary(image)"
            class="p-1 bg-white rounded-full"
            title="Insertar imagen"
          >
            <Icon name="lucide:plus" class="h-4 w-4 text-emerald-600" />
          </button> -->
          <button
            @click="removeImageFromLibrary(index)"
            class="p-1 bg-white rounded-full"
            title="Eliminar de la biblioteca"
          >
            <Icon name="lucide:trash-2" class="h-4 w-4 text-red-500" />
          </button>
        </div>
      </div>

      <!-- Placeholder cuando no hay imágenes -->
      <div
        v-if="imageLibrary.length === 0"
        class="col-span-2 aspect-video border border-dashed border-gray-300 rounded-md flex items-center justify-center p-4"
      >
        <div class="text-center">
          <Icon
            name="lucide:image-off"
            class="h-8 w-8 text-gray-300 mx-auto mb-2"
          />
          <p class="text-xs text-gray-400">No hay imágenes en la biblioteca</p>
          <label
            for="image-upload-empty"
            class="mt-2 text-xs text-emerald-600 hover:text-emerald-700 cursor-pointer inline-block"
          >
            Subir imagen
          </label>
          <input
            id="image-upload-empty"
            type="file"
            accept="image/*"
            class="hidden"
            @change="uploadImage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ImageItem } from "~/types/content-builder";

const imageLibrary = ref<ImageItem[]>([]);
const uploadImage = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) return;

  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = (event) => {
    if (event.target && event.target.result) {
      // Agregar la imagen a la biblioteca
      imageLibrary.value.push({
        url: event.target.result as string,
        alt: file.name,
        date: new Date(),
      });

      // Limpiar el input para permitir subir la misma imagen nuevamente
      input.value = "";
    }
  };

  reader.readAsDataURL(file);
};

const removeImageFromLibrary = (index: number) => {
  imageLibrary.value.splice(index, 1);
};

/* const insertImageFromLibrary = (image: ImageItem) => {
  // Crear un nuevo bloque de imagen con la imagen seleccionada
  addComponent("image");

  // Obtener el último bloque añadido (que debería ser la imagen)
  const lastBlock = blocks.value[blocks.value.length - 1];
  if (lastBlock && lastBlock.type === "image") {
    // Actualizar la URL de la imagen
    lastBlock.content = image.url;
    if (image.alt) {
      lastBlock.imageProps = {
        ...lastBlock.imageProps,
        alt: image.alt,
      };
    }

    // Renderizar el bloque actualizado
    renderBlock(lastBlock);
  }
};

const selectImageFromLibrary = (image: ImageItem) => {
  // Si estamos seleccionando para la imagen de portada
  if (showImageLibraryModal.value) {
    fixedFields.value.bannerImage = image.url;
    showImageLibraryModal.value = false;
    return;
  }

  // Si hay un bloque de imagen seleccionado, actualizar su URL
  if (selectedBlock.value && selectedBlock.value.type === "image") {
    updateBlockContent(image.url);
    if (image.alt) {
      updateImageProps({ alt: image.alt });
    }
  }
}; */
</script>

<style></style>
