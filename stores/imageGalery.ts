import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { ImageItem } from "@/types/content-builder";

export const useImageGalleryStore = defineStore("imageGallery", () => {
  const images = ref<ImageItem[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Computed
  const imageCount = computed(() => images.value.length);

  // Actions
  const fetchImages = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      // Aquí puedes reemplazar con tu API real
      const response = await fetch("https://api.example.com/images");
      if (!response.ok) {
        throw new Error("Error al cargar imágenes");
      }

      const data = await response.json();
      images.value = data;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Error desconocido";
      // Datos de ejemplo para desarrollo
      images.value = [
        {
          url: "https://placehold.co/600x400/png",
          alt: "Imagen 1",
          date: new Date("2023-01-01"), // Replace with an appropriate date
        },
        {
          url: "https://placehold.co/600x400/png",
          alt: "Imagen 2",
          date: new Date("2023-01-02"), // Replace with an appropriate date
        },
        {
          url: "https://placehold.co/600x400/png",
          alt: "Imagen 3",
          date: new Date("2023-01-03"), // Replace with an appropriate date
        },
      ];
    } finally {
      isLoading.value = false;
    }
  };

  const addImage = (image: ImageItem) => {
    images.value.push(image);
  };

  const removeImage = (imageId: string) => {
    /*   images.value = images.value.filter((img) => img.id !== imageId); */
  };

  const updateImage = (imageId: string, updates: Partial<ImageItem>) => {
    /*    const index = images.value.findIndex((img) => img.id === imageId);
    if (index !== -1) {
      images.value[index] = { ...images.value[index], ...updates };
    } */
  };

  return {
    images,
    isLoading,
    error,
    imageCount,
    fetchImages,
    addImage,
    removeImage,
    updateImage,
  };
});
