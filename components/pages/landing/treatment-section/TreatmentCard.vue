<template>
  <div
    class="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
  >
    <!-- Indicador de categoría -->
    <div class="absolute top-4 right-4 z-30">
      <UBadge
        label="Tratamiento Especializado"
        color="primary"
        size="md"
        class="font-medium px-3 py-1 rounded-full"
      />
    </div>

    <!-- Contenedor de imagen con efectos -->
    <div class="relative h-[400px] overflow-hidden">
      <!-- Overlay gradiente que baja al hacer hover -->
      <div
        class="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-80 transition-all duration-700 ease-in-out]"
      />
      <div
        class="absolute inset-0 z-10 bg-gradient-to-t from-primary-800/90 via-primary-600/70 to-transparent opacity-80 transition-all duration-700 ease-in-out group-hover:translate-y-[70%] translate-y-28"
      />

      <!-- Imagen con efecto de zoom -->
      <NuxtImg
        :src="image"
        :alt="`Imagen de ${title}`"
        draggable="false"
        class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />

      <!-- Contenido superpuesto -->
      <div
        class="absolute bottom-0 left-0 z-20 w-full p-6 text-white transition-all duration-500 translate-y-10 group-hover:translate-y-0"
      >
        <!-- Título con efecto de subrayado en hover -->
        <h3
          class="mb-3 text-2xl font-bold text-white relative inline-block group-hover:text-blue-100"
        >
          {{ title }}
          <span
            class="absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-300 transition-all duration-500 group-hover:w-full"
          ></span>
        </h3>

        <!-- Descripción con mejor legibilidad -->
        <p
          class="line-clamp-3 max-w-prose text-sm font-light text-gray-100 group-hover:text-white leading-relaxed min-h-[4.5rem]"
        >
          {{ description }}
        </p>

        <!-- Botón con animación  -->
        <div
          class="mt-6 transform transition-all duration-500 group-hover:translate-y-0 opacity-0 group-hover:opacity-100"
        >
          <UButton
            variant="solid"
            type="button"
            :to="url"
            draggable="false"
            class="rounded-full bg-white px-w py-2 font-medium text-blue-900 hover:shadow-lg hover:bg-white/80 transition-all duration-300"
            label="Conocer más"
            trailing-icon="lucide:chevron-right"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});
</script>
