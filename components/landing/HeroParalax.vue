<template>
  <div class="relative w-full h-screen overflow-hidden text-white">
    <!-- Contenedor de imágenes con efecto de transición de cuadrícula -->
    <div class="absolute inset-0 w-full h-full">
      <transition-group
        name="grid-transition"
        tag="div"
        class="relative w-full h-full"
      >
        <div
          v-for="(image, index) in images"
          :key="image.id"
          v-show="currentImageIndex === index"
          class="absolute inset-0 w-full h-full"
        >
          <!-- Imagen de fondo -->
          <NuxtImg
            :src="image.src"
            :alt="image.alt"
            class="w-full h-full object-cover object-center"
            draggable="false"
          />

          <!-- Overlay con gradiente para mejorar legibilidad -->
          <div
            class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/80"
          ></div>

          <!-- Efecto de cuadrícula para transición -->
          <div
            class="absolute inset-0 grid-effect"
            :class="{ active: isTransitioning && nextImageIndex !== index }"
          >
            <div
              v-for="i in gridSize * gridSize"
              :key="i"
              class="grid-item"
              :style="{
                animationDelay: `${
                  (i % gridSize) * 50 + Math.floor(i / gridSize) * 50
                }ms`,
              }"
            ></div>
          </div>
        </div>
      </transition-group>
    </div>

    <!-- Contenido principal fijo -->
    <div class="relative z-30 h-full w-full flex items-center">
      <div class="container mx-auto px-6 md:px-8 lg:px-12">
        <!-- Logo y tagline con animación de entrada -->
        <div
          class="mb-4 md:mb-6 transform translate-y-8 opacity-0"
          :class="{ 'animate-slide-up': isLoaded }"
        >
          <div
            class="inline-block px-4 py-1 border-l-4 border-amber-400 bg-amber-900/30 backdrop-blur-sm"
          >
            <h6
              class="text-lg md:text-xl font-semibold tracking-wider text-amber-300"
            >
              ONCOCLINIC
            </h6>
          </div>
        </div>

        <!-- Título principal con highlight animado -->
        <h1
          class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl mb-4 md:mb-6 transform translate-y-8 opacity-0"
          :class="{ 'animate-slide-up-delay-1': isLoaded }"
        >
          La Mejor Atención
          <span class="relative inline-block">
            Médica
            <span
              class="absolute bottom-1 left-0 w-full h-3 bg-amber-500/30 -z-10 transform skew-x-3"
            ></span>
          </span>
          y Sanitaria En Tu Ciudad
        </h1>

        <!-- Subtítulo con elemento decorativo -->
        <div
          class="flex items-center mb-8 md:mb-10 transform translate-y-8 opacity-0"
          :class="{ 'animate-slide-up-delay-2': isLoaded }"
        >
          <div class="w-12 h-1 bg-amber-400 mr-4"></div>
          <h6 class="text-lg md:text-xl font-medium opacity-90">
            Expertos en servicios médicos en el área Oncológica
          </h6>
        </div>

        <!-- Botones con estilos mejorados -->
        <div
          class="flex flex-col sm:flex-row gap-4 transform translate-y-8 opacity-0"
          :class="{ 'animate-slide-up-delay-3': isLoaded }"
        >
          <NuxtLink to="/contactos">
            <button
              class="group cursor-pointer flex items-center justify-center gap-2 px-8 py-3 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-amber-500/30"
            >
              Contactos
              <span
                class="inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-arrow-right"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </button>
          </NuxtLink>
          <NuxtLink to="/profesionales">
            <button
              class="group cursor-pointer flex items-center justify-center gap-2 px-8 py-3 bg-transparent hover:bg-white/10 text-white border-2 border-white/70 hover:border-white rounded-full transition-all duration-300"
            >
              Nuestros Doctores
              <span
                class="inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-users"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </span>
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Indicadores de imagen con interacción mejorada -->
    <div
      class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 z-40"
    >
      <div
        v-for="(image, index) in images"
        :key="`indicator-${index}`"
        class="group cursor-pointer"
        @click="navigateToImage(index)"
      >
        <!-- Indicador de punto -->
        <div
          class="w-3 h-3 rounded-full transition-all duration-300 relative"
          :class="
            currentImageIndex === index
              ? 'bg-amber-400 scale-125'
              : 'bg-white/40 hover:bg-white/60'
          "
        >
          <!-- Efecto de onda para punto activo -->
          <div
            v-if="currentImageIndex === index"
            class="absolute inset-0 bg-amber-400/50 rounded-full animate-ping"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NuxtImg } from "#components";
import { ref, onMounted, onUnmounted, nextTick } from "vue";

// Tamaño de la cuadrícula para el efecto de transición
const gridSize = 8; // 8x8 cuadrícula

// Imágenes de alta calidad de Unsplash
const images = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?q=80&w=1920&auto=format&fit=crop",
    alt: "Hospital moderno",
    title: "Excelencia",
    label: "Inicio",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1920&auto=format&fit=crop",
    alt: "Equipo médico",
    title: "Innovación",
    label: "Servicios",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?q=80&w=1920&auto=format&fit=crop",
    alt: "Tecnología médica",
    title: "Compromiso",
    label: "Especialistas",
  },
];

// Variables de estado
const currentImageIndex = ref(0);
const nextImageIndex = ref(0);
const isLoaded = ref(false);
const isTransitioning = ref(false);
const autoChangeInterval = ref<number | null>(null);

// Cambiar imagen automáticamente cada 6 segundos
const startAutoChange = () => {
  autoChangeInterval.value = window.setInterval(() => {
    changeImage((currentImageIndex.value + 1) % images.length);
  }, 6000);
};

// Detener cambio automático
const stopAutoChange = () => {
  if (autoChangeInterval.value !== null) {
    clearInterval(autoChangeInterval.value);
    autoChangeInterval.value = null;
  }
};

// Cambiar a una imagen específica con efecto de transición
const changeImage = (index: number) => {
  if (index === currentImageIndex.value || isTransitioning.value) return;

  isTransitioning.value = true;
  nextImageIndex.value = index;

  // Esperar a que termine la animación
  setTimeout(() => {
    currentImageIndex.value = index;
    isTransitioning.value = false;
  }, 1000); // Duración de la animación
};

// Navegar a una imagen específica
const navigateToImage = (index: number) => {
  // Detener el cambio automático temporalmente
  stopAutoChange();

  // Cambiar a la imagen seleccionada
  changeImage(index);

  // Reiniciar el cambio automático después de un tiempo
  setTimeout(() => {
    startAutoChange();
  }, 10000);
};

// Inicializar
onMounted(async () => {
  // Esperar a que el DOM se actualice
  await nextTick();

  // Activar las animaciones
  setTimeout(() => {
    isLoaded.value = true;
  }, 100);

  // Iniciar el cambio automático de imágenes
  setTimeout(() => {
    startAutoChange();
  }, 3000);
});

onUnmounted(() => {
  // Detener el cambio automático
  stopAutoChange();
});
</script>

<style scoped>
/* Efecto de cuadrícula para transiciones */
.grid-effect {
  display: grid;
  grid-template-columns: repeat(v-bind(gridSize), 1fr);
  grid-template-rows: repeat(v-bind(gridSize), 1fr);
  position: absolute;
  inset: 0;
  z-index: 10;
}

.grid-item {
  background-color: transparent;
  transform: scale(1);
  opacity: 1;
}

.grid-effect.active .grid-item {
  animation: gridItemOut 0.8s forwards;
}

@keyframes gridItemOut {
  0% {
    transform: scale(1);
    opacity: 1;
    background-color: transparent;
  }
  20% {
    background-color: #000;
  }
  100% {
    transform: scale(0);
    opacity: 0;
    background-color: #000;
  }
}

/* Animaciones personalizadas */
@keyframes slide-up {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes ping {
  75%,
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

.animate-slide-up {
  animation: slide-up 0.8s ease forwards;
}

.animate-slide-up-delay-1 {
  animation: slide-up 0.8s ease 0.2s forwards;
}

.animate-slide-up-delay-2 {
  animation: slide-up 0.8s ease 0.4s forwards;
}

.animate-slide-up-delay-3 {
  animation: slide-up 0.8s ease 0.6s forwards;
}

.animate-ping {
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

/* Transiciones de Vue */
.grid-transition-enter-active,
.grid-transition-leave-active {
  transition: opacity 0.5s ease;
}

.grid-transition-enter-from,
.grid-transition-leave-to {
  opacity: 0;
}

/* Asegurar animaciones suaves */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Scrollbar personalizado para navegadores webkit */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(146, 64, 14, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(245, 158, 11, 0.5);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(245, 158, 11, 0.7);
}
</style>
