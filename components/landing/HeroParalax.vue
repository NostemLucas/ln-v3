<template>
  <div
    ref="parallaxContainer"
    class="relative w-full h-[90vh] overflow-hidden text-white"
  >
    <!-- Capa de imagen de fondo con efecto parallax -->
    <div class="absolute inset-0 w-full h-full">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="absolute inset-0 w-full h-full transition-opacity duration-1000"
        :style="{
          opacity: currentImageIndex === index ? 1 : 0,
          zIndex: images.length - index,
        }"
      >
        <!-- Imagen con efecto parallax real -->
        <div class="absolute inset-0 h-[120%] w-full overflow-hidden">
          <img
            :src="image.src"
            :alt="image.alt"
            class="absolute w-full h-full object-cover object-center transition-transform duration-700 ease-out"
            :style="{
              transform: `translateY(${parallaxOffset * -0.15}px) scale(${
                1 + Math.abs(parallaxOffset) * 0.0001
              })`,
            }"
            draggable="false"
          />
        </div>

        <!-- Overlay con gradiente para mejorar legibilidad -->
        <div
          class="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80"
        ></div>
      </div>
    </div>

    <!-- Contenido principal -->
    <div
      class="relative z-30 h-full w-full flex items-center"
      :style="{
        transform: `translateY(${parallaxOffset * 0.05}px)`,
      }"
    >
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
          <button
            class="group flex items-center justify-center gap-2 px-8 py-3 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-amber-500/30"
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
          <button
            class="group flex items-center justify-center gap-2 px-8 py-3 bg-transparent hover:bg-white/10 text-white border-2 border-white/70 hover:border-white rounded-full transition-all duration-300"
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
        </div>
      </div>
    </div>

    <!-- Indicador de scroll con efectos mejorados -->
    <div
      class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-40"
      :style="{ opacity: Math.max(0, 1 - Math.abs(parallaxOffset) * 0.001) }"
    >
      <!-- Icono de scroll animado -->
      <div
        class="w-6 h-10 border-2 border-white/70 rounded-full mb-2 flex justify-center relative overflow-hidden"
      >
        <div
          class="w-1.5 h-1.5 bg-amber-400 rounded-full absolute top-2"
          :style="{
            transform: `translateY(${Math.sin(Date.now() / 500) * 4 + 4}px)`,
          }"
        ></div>
      </div>

      <!-- Texto indicador con efecto dinámico -->
      <div class="flex items-center gap-2 text-sm font-light">
        <span>Desliza para descubrir</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="transition-transform duration-300"
          :style="{
            transform: `translateY(${Math.sin(Date.now() / 300) * 3}px)`,
          }"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>

    <!-- Indicadores de imagen con interacción mejorada -->
    <div
      class="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-40"
    >
      <div
        v-for="(image, index) in images"
        :key="`indicator-${index}`"
        class="group flex items-center gap-3 cursor-pointer"
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

        <!-- Etiqueta que aparece al pasar el ratón -->
        <div
          class="text-sm font-medium opacity-0 transform translate-x-2 transition-all duration-300 whitespace-nowrap"
          :class="{
            'group-hover:opacity-100 group-hover:translate-x-0':
              currentImageIndex !== index,
          }"
        >
          {{ image.label }}
        </div>

        <!-- Etiqueta activa -->
        <div
          v-if="currentImageIndex === index"
          class="text-sm font-medium text-amber-300"
        >
          {{ image.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";

// Imágenes para el slideshow con títulos y etiquetas
const images = [
  {
    src: "/landing/paralax.jpg",
    alt: "Oncoclinic Background 1",
    title: "Excelencia",
    label: "Inicio",
  },
  {
    src: "/landing/paralax.jpg", // En un caso real, estas serían diferentes imágenes
    alt: "Oncoclinic Background 2",
    title: "Innovación",
    label: "Servicios",
  },
  {
    src: "/landing/paralax.jpg", // En un caso real, estas serían diferentes imágenes
    alt: "Oncoclinic Background 3",
    title: "Compromiso",
    label: "Especialistas",
  },
];

// Variables de estado
const parallaxContainer = ref<HTMLElement | null>(null);
const currentImageIndex = ref(0);
const isLoaded = ref(false);
const parallaxOffset = ref(0);
const lastScrollY = ref(0);
const ticking = ref(false);
const animationFrameId = ref<number | null>(null);

// Manejar el efecto parallax basado en la posición de scroll
const handleScroll = () => {
  lastScrollY.value = window.scrollY;

  if (!ticking.value) {
    ticking.value = true;

    animationFrameId.value = requestAnimationFrame(() => {
      // Actualizar el offset de parallax basado en la posición de scroll
      parallaxOffset.value = lastScrollY.value;

      // Determinar qué imagen mostrar basado en la posición de scroll
      // Este es un cálculo simple, puedes ajustarlo según tus necesidades
      const scrollProgress =
        lastScrollY.value / (document.body.scrollHeight - window.innerHeight);
      const targetIndex = Math.min(
        Math.floor(scrollProgress * images.length),
        images.length - 1
      );

      if (targetIndex !== currentImageIndex.value) {
        currentImageIndex.value = targetIndex;
      }

      ticking.value = false;
    });
  }
};

// Navegar a una imagen específica
const navigateToImage = (index: number) => {
  // Si es la misma imagen, no hacer nada
  if (index === currentImageIndex.value) return;

  // Actualizar la imagen actual
  currentImageIndex.value = index;

  // Calcular la posición de scroll aproximada para esta imagen
  const targetScrollY =
    (index / images.length) * (document.body.scrollHeight - window.innerHeight);

  // Scroll suave a la posición
  window.scrollTo({
    top: targetScrollY,
    behavior: "smooth",
  });
};

// Animar el indicador de scroll
const animateScrollIndicator = () => {
  // Forzar actualización del componente para la animación del indicador de scroll
  const animateFrame = () => {
    // Esta función vacía solo fuerza una actualización del componente para la animación
    animationFrameId.value = requestAnimationFrame(animateFrame);
  };

  animationFrameId.value = requestAnimationFrame(animateFrame);
};

// Inicializar
onMounted(async () => {
  // Esperar a que el DOM se actualice
  await nextTick();

  // Configurar el observador de intersección para detectar cuando el componente está visible
  if (parallaxContainer.value) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // El componente está visible, activar las animaciones
            isLoaded.value = true;
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(parallaxContainer.value);
  }

  // Iniciar la animación del indicador de scroll
  animateScrollIndicator();

  // Agregar el evento de scroll
  window.addEventListener("scroll", handleScroll, { passive: true });

  // Disparar una vez para inicializar
  handleScroll();
});

onUnmounted(() => {
  // Limpiar el evento de scroll
  window.removeEventListener("scroll", handleScroll);

  // Cancelar cualquier animación pendiente
  if (animationFrameId.value !== null) {
    cancelAnimationFrame(animationFrameId.value);
  }
});
</script>

<style scoped>
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

/* Asegurar animaciones suaves */
* {
  @apply transition-all duration-300;
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
