<template>
  <div
    class="mx-auto flex flex-col gap-4 h-full font-horsham max-w-xl px-6 md:px-0 pt-6 pb-24 text-start"
  >
    <TemplateHeader
      :categoria="store.categoria"
      :title="store.title"
      :description="store.description"
    />
    <ArticleImage
      :src="store.image"
      :placeholder="store.image"
      caption="Imagen de portada sds sd sd sd s "
    />
    <ArticleAutor
      :author-name="store.autor"
      :avatar-src="store.image"
      :location-info="store.locacion"
      :publish-date="store.fecha"
    />
  </div>
</template>

<script lang="ts" setup>
import ArticleImage from "../templates/nyt/ArticleImage.vue";
import TemplateHeader from "../templates/nyt/TemplateHeader.vue";
import ArticleAutor from "../templates/nyt/ArticleAutor.vue";
const store = useEditorStore();
</script>

<style></style>
