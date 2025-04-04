<template>
  <div
    ref="heroSection"
    class="relative w-full h-[90vh] overflow-hidden text-white"
    @wheel="handleWheel"
  >
    <!-- Multiple background images with scroll-based transitions -->
    <div class="absolute inset-0 w-full h-full overflow-hidden">
      <!-- Image layers that change with scroll -->
      <div
        v-for="(image, index) in images"
        :key="index"
        class="absolute inset-0 w-full h-full transition-all duration-1000"
        :style="{
          opacity: currentImageIndex === index ? 1 : 0,
          transform: `scale(${
            currentImageIndex === index
              ? 1
              : index < currentImageIndex
              ? 0.9
              : 1.1
          })`,
          zIndex: images.length - index,
        }"
      >
        <img
          :src="image.src"
          :alt="image.alt"
          class="absolute w-full h-[120%] object-cover object-center transition-all duration-700 ease-out"
          :style="{
            transform: `translateY(${-scrollOffset * 40}px) scale(${
              1 + scrollOffset * 0.05
            })`,
            filter: `brightness(${0.8 + scrollOffset * 0.2})`,
          }"
          draggable="false"
        />

        <!-- Per-image text that appears with scroll -->
        <div
          class="absolute inset-0 flex items-center justify-center z-10 transition-all duration-700"
          :style="{
            opacity: currentImageIndex === index ? scrollOffset * 2 : 0,
            transform: `translateY(${(1 - scrollOffset) * 50}px)`,
          }"
        >
          <div
            class="text-6xl md:text-8xl font-bold text-white/80 text-center px-4 backdrop-blur-sm"
          >
            {{ image.title }}
          </div>
        </div>
      </div>

      <!-- Overlay with gradient -->
      <div
        class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/75 z-10"
        :style="{ opacity: 1 - scrollOffset * 0.3 }"
      ></div>

      <!-- Animated particles effect -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none z-20">
        <div
          v-for="i in 20"
          :key="`particle-${i}`"
          class="absolute rounded-full bg-amber-400/30 blur-md"
          :style="{
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: 0.1 + Math.random() * 0.2,
            transform: `translateY(${
              scrollOffset * 100 * (Math.random() * 2 - 1)
            }px)`,
            transition: 'transform 0.5s ease-out',
          }"
        ></div>
      </div>
    </div>

    <!-- Content Container -->
    <div
      class="relative z-30 h-full w-full flex items-center"
      :style="{
        opacity: 1 - scrollOffset * 2,
        transform: `translateY(${scrollOffset * -100}px)`,
      }"
    >
      <div class="container mx-auto px-6 md:px-8 lg:px-12">
        <!-- Logo and Tagline -->
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

        <!-- Main Heading with animated highlight -->
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

        <!-- Subheading with decorative element -->
        <div
          class="flex items-center mb-8 md:mb-10 transform translate-y-8 opacity-0"
          :class="{ 'animate-slide-up-delay-2': isLoaded }"
        >
          <div class="w-12 h-1 bg-amber-400 mr-4"></div>
          <h6 class="text-lg md:text-xl font-medium opacity-90">
            Expertos en servicios médicos en el área Oncológica
          </h6>
        </div>

        <!-- Buttons with enhanced styling -->
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

    <!-- Scroll indicator with enhanced effects -->
    <div
      class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-40"
      :style="{ opacity: 1 - scrollOffset * 3 }"
    >
      <!-- Animated scroll icon -->
      <div
        class="w-6 h-10 border-2 border-white/70 rounded-full mb-2 flex justify-center relative overflow-hidden"
      >
        <div
          class="w-1.5 h-1.5 bg-amber-400 rounded-full absolute top-2"
          :style="{
            transform: `translateY(${Math.sin(Date.now() / 500) * 4 + 4}px)`,
            opacity: scrolling ? 0.5 : 1,
          }"
        ></div>
      </div>

      <!-- Text indicator with dynamic effect -->
      <div
        class="flex items-center gap-2 text-sm font-light"
        :class="{ 'animate-pulse': scrolling }"
      >
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

    <!-- Image indicators with enhanced interaction -->
    <div
      class="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-40"
    >
      <div
        v-for="(image, index) in images"
        :key="`indicator-${index}`"
        class="group flex items-center gap-3 cursor-pointer"
        @click="navigateToImage(index)"
      >
        <!-- Dot indicator -->
        <div
          class="w-3 h-3 rounded-full transition-all duration-300 relative"
          :class="
            currentImageIndex === index
              ? 'bg-amber-400 scale-125'
              : 'bg-white/40 hover:bg-white/60'
          "
        >
          <!-- Ripple effect for active dot -->
          <div
            v-if="currentImageIndex === index"
            class="absolute inset-0 bg-amber-400/50 rounded-full animate-ping"
          ></div>
        </div>

        <!-- Label that appears on hover -->
        <div
          class="text-sm font-medium opacity-0 transform translate-x-2 transition-all duration-300 whitespace-nowrap"
          :class="{
            'group-hover:opacity-100 group-hover:translate-x-0':
              currentImageIndex !== index,
          }"
        >
          {{ image.label }}
        </div>

        <!-- Active label -->
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
import { ref, onMounted, onUnmounted, computed, watch } from "vue";

// Images for the slideshow with titles and labels
const images = [
  {
    src: "/mock/paralax.jpg",
    alt: "Oncoclinic Background 1",
    title: "Excelencia",
    label: "Inicio",
  },
  {
    src: "/mock/paralax.jpg", // En un caso real, estas serían diferentes imágenes
    alt: "Oncoclinic Background 2",
    title: "Innovación",
    label: "Servicios",
  },
  {
    src: "/mock/paralax.jpg", // En un caso real, estas serían diferentes imágenes
    alt: "Oncoclinic Background 3",
    title: "Compromiso",
    label: "Especialistas",
  },
];

// State variables
const heroSection = ref<HTMLElement | null>(null);
const currentImageIndex = ref(0);
const scrollOffset = ref(0); // 0 to 1 within each image section
const isLoaded = ref(false);
const scrolling = ref(false);
const scrollTimeout = ref<number | null>(null);
const wheelEvents = ref<number[]>([]);
const lastScrollTime = ref(Date.now());

// Handle wheel events for custom scrolling
const handleWheel = (e: WheelEvent) => {
  e.preventDefault();

  // Track wheel events for momentum
  const now = Date.now();
  wheelEvents.value.push(e.deltaY);

  // Keep only recent events (last 200ms)
  wheelEvents.value = wheelEvents.value.filter(
    () => now - lastScrollTime.value < 200
  );

  // Calculate momentum based on recent wheel events
  const momentum =
    wheelEvents.value.reduce((sum, delta) => sum + delta, 0) / 100;

  // Update scroll offset with momentum
  updateScrollOffset(momentum);

  // Update last scroll time
  lastScrollTime.value = now;

  // Show scrolling indicator
  scrolling.value = true;

  // Clear previous timeout
  if (scrollTimeout.value) {
    clearTimeout(scrollTimeout.value);
  }

  // Set timeout to hide scrolling indicator
  scrollTimeout.value = window.setTimeout(() => {
    scrolling.value = false;
  }, 500);
};

// Update scroll offset with momentum and handle image transitions
const updateScrollOffset = (momentum: number) => {
  // Update scroll offset
  scrollOffset.value += momentum * 0.01;

  // Constrain between 0 and 1
  if (scrollOffset.value < 0) {
    // If at first image and trying to scroll up, bounce effect
    if (currentImageIndex.value === 0) {
      scrollOffset.value = 0;
    } else {
      // Move to previous image
      currentImageIndex.value--;
      scrollOffset.value = 1;
    }
  } else if (scrollOffset.value > 1) {
    // If at last image and trying to scroll down, bounce effect
    if (currentImageIndex.value === images.length - 1) {
      scrollOffset.value = 1;
    } else {
      // Move to next image
      currentImageIndex.value++;
      scrollOffset.value = 0;
    }
  }
};

// Navigate to specific image
const navigateToImage = (index: number) => {
  // If same image, do nothing
  if (index === currentImageIndex.value) return;

  // Set scroll offset based on direction
  scrollOffset.value = index < currentImageIndex.value ? 1 : 0;

  // Update current image
  currentImageIndex.value = index;

  // Animate scroll offset to show transition
  const startOffset = scrollOffset.value;
  const targetOffset = index < currentImageIndex.value ? 0 : 1;
  const startTime = Date.now();
  const duration = 800;

  const animateOffset = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);

    scrollOffset.value =
      startOffset + (targetOffset - startOffset) * easedProgress;

    if (progress < 1) {
      requestAnimationFrame(animateOffset);
    }
  };

  requestAnimationFrame(animateOffset);
};

// Easing function for smoother animations
const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

// Animate scroll indicator
const animateScrollIndicator = () => {
  // Force component update for scroll indicator animation
  setInterval(() => {
    // This empty function just forces a component update for the scroll indicator animation
  }, 50);
};

// Initialize
onMounted(() => {
  // Prevent default scroll behavior on the hero section
  if (heroSection.value) {
    heroSection.value.addEventListener("wheel", (e) => e.preventDefault(), {
      passive: false,
    });
  }

  // Start scroll indicator animation
  animateScrollIndicator();

  // Trigger entrance animations
  setTimeout(() => {
    isLoaded.value = true;
  }, 100);

  // Demo effect to show scrolling functionality
  setTimeout(() => {
    // Simulate scrolling down slightly
    let demoProgress = 0;
    const demoInterval = setInterval(() => {
      demoProgress += 0.02;
      scrollOffset.value = Math.min(demoProgress, 0.3);

      if (demoProgress >= 0.3) {
        clearInterval(demoInterval);

        // Then scroll back up
        setTimeout(() => {
          let reverseProgress = 0.3;
          const reverseInterval = setInterval(() => {
            reverseProgress -= 0.02;
            scrollOffset.value = Math.max(reverseProgress, 0);

            if (reverseProgress <= 0) {
              clearInterval(reverseInterval);
            }
          }, 30);
        }, 800);
      }
    }, 30);
  }, 2000);
});

onUnmounted(() => {
  // Clear any timeouts
  if (scrollTimeout.value) {
    clearTimeout(scrollTimeout.value);
  }
});
</script>

<style scoped>
/* Custom animations */
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

/* Ensure smooth animations */
* {
  @apply transition-all duration-300;
}

/* Custom scrollbar for webkit browsers */
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
