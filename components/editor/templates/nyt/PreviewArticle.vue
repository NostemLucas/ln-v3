<template>
  <div>
    <TemplateHeader
      :categoria="data.categoria"
      :title="data.title"
      :description="data.description"
    />
    <ArticleImage
      :src="data.image"
      :placeholder="data.image"
      caption="Imagen de portada"
    />
  </div>
</template>

<script lang="ts" setup>
import TemplateHeader from "./TemplateHeader.vue";
import ArticleImage from "./ArticleImage.vue";

const data = {
  title: "Plantilla",
  description: "Plantilla",
  image: "https://placehold.co/1400x400",
  autor: "Autor",
  fecha: "Fecha",
  categoria: "Categoría",
};
</script>

<style></style>
