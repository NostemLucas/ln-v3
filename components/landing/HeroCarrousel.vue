<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import personnel from "~/mocks/doctors";
interface CarouselProps {
  autoplay?: boolean;
  autoplaySpeed?: number;
  isInfinite?: boolean;
  pauseOnHover?: boolean;
}

const props = withDefaults(defineProps<CarouselProps>(), {
  autoplay: true,
  autoplaySpeed: 4000,
  isInfinite: true,
  pauseOnHover: true,
});

const currentIndex = ref<number>(0);
const hoveredPerson = ref<number | null>(null);
const autoplayPaused = ref<boolean>(false);
const touchStartX = ref<number>(0);
const touchEndX = ref<number>(0);

let autoplayInterval: number | null = null;

const windowWidth = ref<number>(
  typeof window !== "undefined" ? window.innerWidth : 1024
);

const visibleSlides = computed<number>(() => {
  if (windowWidth.value < 640) return 1;
  if (windowWidth.value < 768) return 2;
  return 3;
});

const nextSlide = (): void => {
  if (currentIndex.value < personnel.length - visibleSlides.value) {
    currentIndex.value++;
  } else if (props.isInfinite) {
    currentIndex.value = 0;
  }
};

const prevSlide = (): void => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  } else if (props.isInfinite) {
    currentIndex.value = personnel.length - visibleSlides.value;
  }
};

const goToSlide = (index: number): void => {
  const maxIndex = personnel.length - visibleSlides.value;
  currentIndex.value = Math.min(Math.max(0, index), maxIndex);
};

const startAutoplay = (): void => {
  if (props.autoplay && !autoplayInterval && !autoplayPaused.value) {
    autoplayInterval = window.setInterval(() => {
      nextSlide();
    }, props.autoplaySpeed);
  }
};

const stopAutoplay = (): void => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
  }
};

const pauseAutoplay = (): void => {
  if (props.pauseOnHover) {
    autoplayPaused.value = true;
    stopAutoplay();
  }
};

const resumeAutoplay = (): void => {
  if (props.pauseOnHover) {
    autoplayPaused.value = false;
    startAutoplay();
  }
};

const handleTouchStart = (e: TouchEvent): void => {
  touchStartX.value = e.touches[0].clientX;
};

const handleTouchMove = (e: TouchEvent): void => {
  touchEndX.value = e.touches[0].clientX;
};

const handleTouchEnd = (): void => {
  const touchDiff = touchStartX.value - touchEndX.value;
  const minSwipeDistance = 50;

  if (Math.abs(touchDiff) > minSwipeDistance) {
    if (touchDiff > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }
};

const handleResize = (): void => {
  windowWidth.value = window.innerWidth;
};

watch(visibleSlides, (newValue: number, oldValue: number) => {
  if (newValue < oldValue) {
    const maxIndex = personnel.length - newValue;
    if (currentIndex.value > maxIndex) {
      currentIndex.value = maxIndex;
    }
  }
});

onMounted(() => {
  startAutoplay();

  if (typeof window !== "undefined") {
    window.addEventListener("resize", handleResize);
  }
});

onBeforeUnmount(() => {
  stopAutoplay();

  if (typeof window !== "undefined") {
    window.removeEventListener("resize", handleResize);
  }
});
</script>

<template>
  <div class="container mx-auto max-w-7xl px-4 py-12">
    <div
      class="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row"
    >
      <div class="relative">
        <div
          class="absolute -top-3 left-0 h-1 w-12 rounded-full bg-primary-300"
        />
        <h2
          class="text-center text-2xl font-bold text-gray-800 sm:text-left md:text-3xl lg:text-4xl"
        >
          Nuestros Profesionales <span class="text-primary-300"> Médicos </span>
        </h2>
        <p class="mt-2 max-w-xl text-gray-600">
          Expertos altamente calificados dedicados a brindar la mejor atención
          médica
        </p>
      </div>

      <div class="flex space-x-3">
        <button
          aria-label="Previous slide"
          class="flex h-12 w-12 items-center justify-center rounded-full border border-gray-100 bg-white shadow-md transition-colors hover:bg-primary-50 focus:ring-2 focus:ring-primary-500 focus:outline-none"
          :disabled="!props.isInfinite && currentIndex === 0"
          :class="{
            'cursor-not-allowed opacity-50':
              !props.isInfinite && currentIndex === 0,
            'text-primary-600 hover:text-primary-700': true,
          }"
          @click="prevSlide"
        >
          <Icon name="lucide:chevron-left" class="h-5 w-5" />
        </button>
        <button
          aria-label="Next slide"
          class="bg-primary-white flex h-12 w-12 items-center justify-center rounded-full shadow-md transition-colors hover:bg-primary-50 focus:ring-2 focus:ring-primary-500 focus:outline-none"
          :disabled="
            !props.isInfinite &&
            currentIndex >= personnel.length - visibleSlides
          "
          :class="{
            'cursor-not-allowed opacity-50':
              !props.isInfinite &&
              currentIndex >= personnel.length - visibleSlides,
            'text-primary-600 hover:text-primary-700': true,
          }"
          @click="nextSlide"
        >
          <Icon name="lucide:chevron-right" class="h-5 w-5" />
        </button>
      </div>
    </div>

    <div
      class="relative overflow-hidden"
      @mouseenter="pauseAutoplay"
      @mouseleave="resumeAutoplay"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <div
        class="flex transition-transform duration-500 ease-in-out"
        :style="{
          transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)`,
        }"
        aria-live="polite"
      >
        <div
          v-for="(person, index) in personnel"
          :key="index"
          :class="[
            'px-2 transition-all duration-300',
            {
              'min-w-full sm:min-w-[50%] md:min-w-[33.333%] lg:min-w-[33.333%]': true,
            },
          ]"
        >
          <div
            class="group relative h-[350px] overflow-hidden rounded-lg shadow-md sm:h-[400px] md:h-[450px]"
            :aria-label="`Doctor ${person.name}, ${person.specialty}`"
            @mouseenter="hoveredPerson = index"
            @mouseleave="hoveredPerson = null"
          >
            <NuxtImg
              :src="person.image"
              :alt="`Dr. ${person.name} - ${person.specialty}`"
              class="aspect-[3/4] h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />

            <div
              v-if="person.specialty"
              class="absolute top-4 right-4 rounded-full bg-white px-3 py-2 text-xs font-semibold text-primary-500 uppercase"
            >
              {{ person.specialty }}
            </div>

            <div
              class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-primary-700/90 via-primary-800/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:p-6"
            >
              <div class="text-white">
                <div class="mb-1 text-xs font-medium sm:text-sm uppercase">
                  {{ person.specialty }}
                </div>
                <h3 class="mb-1 text-lg font-bold sm:text-xl">
                  {{ person.name }}
                </h3>
                <p class="mb-3 line-clamp-3 text-xs sm:mb-4 sm:text-sm">
                  {{ person.shortDescription }}
                </p>
                <UButton
                  variant="solid"
                  :aria-label="`Ver más información sobre ${person.name}`"
                  class="bg-white rounded-full px-4 py-2 text-primary-500 hover:text-white transition-colors duration-400"
                  label="Ver más"
                  to="/profesionales"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 flex justify-center">
      <div
        v-for="(_, index) in Math.ceil(personnel.length / visibleSlides)"
        :key="index"
        class="mx-1.5 h-2.5 w-2.5 cursor-pointer rounded-full transition-all duration-300"
        :class="
          Math.floor(currentIndex / visibleSlides) === index
            ? 'scale-125 bg-primary-600'
            : 'bg-gray-300 hover:bg-gray-400'
        "
        :aria-label="`Go to slide group ${index + 1}`"
        role="button"
        tabindex="0"
        @click="goToSlide(index * visibleSlides)"
        @keydown.enter="goToSlide(index * visibleSlides)"
      />
    </div>
  </div>
</template>
