import { defineStore } from "pinia";

export interface ImageData {
  id: string;
  name: string;
  size: number;
  type: string;
  lastModified: number;
  base64: string;
}

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

export const useImageStore = defineStore("imageStore", {
  state: () => ({
    images: [] as ImageData[],
  }),

  actions: {
    loadFromLocalStorage() {
      const stored = localStorage.getItem("images");
      if (stored) {
        try {
          this.images = JSON.parse(stored);
        } catch (e) {
          console.error("Error parsing images from localStorage", e);
        }
      }
    },

    async addImages(files: File[]) {
      const validFiles = files.filter((file) => file.size <= 2 * 1024 * 1024); // Max 2MB

      const newImages = await Promise.all(
        validFiles.map(async (file) => ({
          id: crypto.randomUUID(),
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified,
          base64: await fileToBase64(file),
        }))
      );

      this.images = [...this.images, ...newImages];
      localStorage.setItem("images", JSON.stringify(this.images));
    },

    removeImageById(id: string) {
      this.images = this.images.filter((img) => img.id !== id);
      localStorage.setItem("images", JSON.stringify(this.images));
    },

    clearImages() {
      this.images = [];
      localStorage.removeItem("images");
    },
  },
});
