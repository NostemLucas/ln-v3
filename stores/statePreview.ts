// stores/editorStore.ts
import { defineStore } from "pinia";

export const useEditorStore = defineStore("editor", {
  state: () => ({
    title: "Ejemplo de un titulo asombroso",
    description: "Plantilla",
    image: "https://placehold.co/400x400",
    autor: "Autor",
    fecha: "Fecha",
    categoria: "CATEGORIA",
    locacion: "",
  }),

  getters: {
    fullData: (state) => ({
      title: state.title,
      description: state.description,
      image: state.image,
      autor: state.autor,
      fecha: state.fecha,
      categoria: state.categoria,
      locacion: state.locacion,
    }),
  },

  actions: {
    updateField(field: keyof typeof this.$state, value: string) {
      this[field] = value;
    },
  },
});
