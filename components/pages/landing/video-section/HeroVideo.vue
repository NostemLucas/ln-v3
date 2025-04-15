<template>
  <div class="relative w-full overflow-hidden">
    <div
      class="relative aspect-[3/4] max-h-[600px] w-full bg-gray-900 md:aspect-video md:max-h-[650px]"
    >
      <video
        ref="backgroundVideoRef"
        class="h-full w-full object-cover"
        loop
        muted
        autoplay
        playsinline
        poster="~/assets/media/banner.png"
      >
        <source src="~/assets/media/banner.mp4" type="video/mp4" />
        <span class="sr-only"
          >Tu navegador no soporta el formato de video.</span
        >
      </video>

      <!-- Overlays con Gradiente -->
      <div
        class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 animate-pulse-subtle"
      />
      <div
        class="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent"
      />
    </div>
    <!-- Content Container -->
    <div
      class="absolute inset-x-0 bottom-0 w-full px-6 pb-16 md:bottom-16 md:pb-0 lg:container lg:mx-auto"
    >
      <div class="mx-auto max-w-4xl">
        <!-- Main Heading with animation -->
        <h1
          class="animate-fade-in-up font-horsham text-4xl font-bold leading-tight tracking-wide text-white md:text-5xl lg:text-6xl"
        >
          Transformando el cuidado de tu salud
        </h1>

        <!-- Action Buttons -->
        <div
          class="mt-8 flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-6 sm:space-y-0 md:mt-10"
        >
          <!-- Appointment Button - Fixed with better integration -->
          <NuxtLink
            to="#"
            class="appointment-btn group inline-flex items-center text-lg f text-white transition-all duration-300 md:text-xl overflow-hidden rounded-full font-normal"
          >
            <span>Pedir una cita</span>
            <Icon
              name="lucide:arrow-right"
              size="1.25rem"
              class="ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
            />
          </NuxtLink>

          <button
            class="video-btn group relative flex w-fit items-center space-x-3 overflow-hidden rounded-full bg-white/10 px-6 py-3 text-white backdrop-blur-sm transition-all duration-300"
            @click="isModalOpen = true"
          >
            <div
              class="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-transform duration-300"
            >
              <Icon name="lucide:play" class="h-5 w-5 text-white" />
            </div>
            <span class="relative z-10 font-medium tracking-wide"
              >Ver Presentación</span
            >
          </button>
        </div>
      </div>
    </div>
    <EnhancedVideo v-model:is-open="isModalOpen" />
  </div>
</template>

<script lang="ts" setup>
import EnhancedVideo from "./EnhancedVideo.vue";
const isModalOpen = ref(false);
</script>

<style scoped>
.video-btn {
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
}

.video-btn:hover {
  box-shadow: 0 0 25px rgba(0, 255, 255, 0.4);
  background-color: rgba(255, 255, 255, 0.15);
}

.appointment-btn {
  position: relative;
  padding: 0.2rem 0;
  display: inline-flex;
  align-items: center;
}

.appointment-btn::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, white, transparent);
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}
</style>
