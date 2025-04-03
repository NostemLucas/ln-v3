<template>
  <div class="relative w-full overflow-hidden">
    <!-- Background Video -->
    <div
      class="relative aspect-[3/4] max-h-[600px] w-full bg-gray-900 md:aspect-auto md:max-h-[650px]"
    >
      <video
        ref="backgroundVideoRef"
        class="aspect-[3/4] max-h-[600px] w-full bg-black object-cover md:aspect-auto md:max-h-[650px] md:w-full"
        loop
        muted
        autoplay
        playsinline
        poster="~/assets/media/banner.png"
      >
        <source src="~/assets/media/video.webm" type="video/webm" />
        Tu navegador no soporta el formato de video.
      </video>
    </div>

    <!-- Enhanced Gradient overlays with more dynamic animation -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 animate-gradient-pulse"
    />
    <div
      class="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent animate-gradient-slide"
    />

    <!-- Content Container with improved spacing -->
    <div
      class="px-6 lg:container w-full m-auto absolute inset-x-0 bottom-20 md:bottom-24"
    >
      <div class="h-auto max-w-4xl">
        <!-- Main Heading with enhanced animations -->
        <h1
          class="font-horsham mb-8 text-4xl leading-tight tracking-wide text-white md:mb-10 md:text-5xl lg:mb-12 lg:text-7xl text-glow-premium animate-title-reveal"
        >
          Transformando el cuidado de tu salud
        </h1>

        <!-- Action Buttons with premium effects -->
        <div
          class="flex flex-col space-y-6 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-8 animate-buttons-reveal"
        >
          <!-- Appointment Button with premium hover effect -->
          <NuxtLink
            to="#"
            class="group flex items-center text-lg text-white transition-all duration-300 ease-out md:text-xl lg:text-2xl hover:text-glow-premium relative overflow-hidden appointment-button"
          >
            <span class="z-10 relative">
              Pedir una cita
              <span class="appointment-underline"></span>
            </span>
            <Icon
              name="lucide:chevron-right"
              class="ml-3 h-6 w-6 transition-all duration-300 ease-out transform group-hover:translate-x-2 group-hover:scale-110 z-10"
            />
            <div class="appointment-button-glow"></div>
          </NuxtLink>

          <!-- Enhanced Play Video Button with premium effects -->
          <button
            class="play-button-premium group flex items-center space-x-3 px-8 py-4 text-white text-xl rounded-full transition-all duration-300 relative overflow-hidden"
            @click="openVideoModal"
          >
            <div
              class="play-button-background absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300"
            ></div>
            <div
              class="play-icon-wrapper relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300"
            >
              <Icon
                name="lucide:play"
                class="h-6 w-6 text-white fill-white group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span class="relative z-10 font-medium tracking-wide"
              >Ver Presentación</span
            >
            <div class="play-button-shine"></div>
          </button>
        </div>
      </div>
    </div>

    <!-- Enhanced Video Modal with premium loading animation -->
    <Transition name="modal-fade">
      <div
        v-if="isVideoModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center"
        @click="closeVideoModal"
      >
        <!-- Premium Backdrop with enhanced blur -->
        <div class="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

        <!-- Modal Content with enhanced animations -->
        <div
          ref="modalContainer"
          class="relative z-10 w-full max-w-5xl overflow-hidden rounded-xl bg-black shadow-2xl transition-all duration-500"
          :class="{
            'scale-100 opacity-100': videoReady,
            'scale-95 opacity-0': !videoReady,
          }"
          @click.stop
        >
          <!-- Enhanced Close Button -->
          <button
            class="absolute top-4 right-4 z-20 rounded-full bg-black/50 p-2.5 text-white transition-all duration-300 hover:bg-white hover:text-black close-button-premium"
            aria-label="Cerrar video"
            @click.stop="closeVideoModal"
          >
            <Icon name="lucide:x" class="h-5 w-5" />
          </button>

          <!-- Video Container with premium loading state -->
          <div class="relative aspect-video w-full bg-black">
            <!-- Premium loading indicator for the modal video -->
            <div
              v-if="!videoReady"
              class="absolute inset-0 flex flex-col items-center justify-center space-y-4 bg-gray-900/90 z-10"
            >
              <!-- Premium loading animation -->
              <div class="premium-video-loader">
                <svg class="circular-loader" viewBox="25 25 50 50">
                  <circle
                    class="loader-path"
                    cx="50"
                    cy="50"
                    r="20"
                    fill="none"
                    stroke-width="3"
                  />
                </svg>
                <div class="loader-pulse"></div>
              </div>

              <div
                class="text-white text-lg font-medium mt-6 tracking-wider loading-text"
              >
                Cargando presentación
                <span class="loading-dots">
                  <span class="dot"></span>
                  <span class="dot"></span>
                  <span class="dot"></span>
                </span>
              </div>

              <!-- Enhanced visual preview -->
              <div
                class="absolute inset-0 flex items-center justify-center opacity-30"
              >
                <div
                  class="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900"
                >
                  <div
                    class="absolute inset-0 flex items-center justify-center"
                  >
                    <div
                      class="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm pulse-animation"
                    >
                      <Play class="h-12 w-12 text-white/80" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Enhanced progress bar -->
              <div
                class="absolute bottom-10 left-0 right-0 mx-auto w-3/4 h-1.5 bg-gray-800/80 rounded-full overflow-hidden"
              >
                <div
                  class="h-full rounded-full premium-progress-bar"
                  :style="{ width: `${loadingProgress}%` }"
                ></div>
              </div>
            </div>

            <!-- Video Element with optimized loading -->
            <video
              ref="modalVideoRef"
              class="h-full w-full"
              @canplay="handleVideoReady"
              @click="togglePlayPause"
              @loadeddata="updateLoadingProgress(50)"
              @canplaythrough="updateLoadingProgress(100)"
              @progress="updateLoadingProgress"
              @play="isPlaying = true"
              @pause="isPlaying = false"
              @ended="isPlaying = false"
              preload="metadata"
            >
              <source src="~/assets/media/presentation.mp4" type="video/mp4" />
              Tu navegador no soporta el formato de video.
            </video>

            <!-- Enhanced custom video controls (shown when video is ready) -->
            <div
              v-if="videoReady"
              class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 custom-controls"
              @click.stop
            >
              <div class="flex items-center space-x-4">
                <button
                  class="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
                  @click.stop="togglePlayPause"
                >
                  <Icon
                    v-if="isPlaying"
                    name="lucide:pause"
                    class="h-14 w-14"
                  />

                  <Icon v-else name="lucide:play" class="h-14 w-14" />
                </button>

                <div
                  class="relative flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer"
                  @click.stop="seekVideo"
                >
                  <div
                    class="absolute top-0 left-0 h-full bg-white rounded-full"
                    :style="{ width: `${videoProgress}%` }"
                  ></div>
                </div>

                <div class="text-white/90 text-sm">
                  {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
                </div>
              </div>
            </div>

            <!-- Enhanced Play/Pause indicator -->
            <Transition name="scale-premium">
              <div
                v-if="showPlayPauseIndicator"
                class="pointer-events-none absolute inset-0 flex items-center justify-center"
              >
                <div
                  class="rounded-full bg-black/40 p-8 backdrop-blur-sm transform transition-transform duration-300 play-indicator-premium"
                >
                  <Icon
                    v-if="isPlaying"
                    name="lucide:pause"
                    class="h-14 w-14"
                  />

                  <Icon v-else name="lucide:play" class="h-14 w-14" />
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";

// Video references
const backgroundVideoRef = ref<HTMLVideoElement | null>(null);
const modalVideoRef = ref<HTMLVideoElement | null>(null);
const modalContainer = ref<HTMLElement | null>(null);

// Modal state
const isVideoModalOpen = ref<boolean>(false);
const videoReady = ref<boolean>(false);
const isPlaying = ref<boolean>(false);
const showPlayPauseIndicator = ref<boolean>(false);
const loadingProgress = ref<number>(0);
const currentTime = ref<number>(0);
const duration = ref<number>(0);

// Computed video progress
const videoProgress = computed(() => {
  if (duration.value === 0) return 0;
  return (currentTime.value / duration.value) * 100;
});

// Body scroll lock state
let originalBodyStyle = {
  overflow: "",
  paddingRight: "",
};

// Format time for video player (mm:ss)
const formatTime = (seconds: number): string => {
  if (isNaN(seconds)) return "00:00";

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

// Update video progress
const updateVideoProgress = () => {
  if (!modalVideoRef.value) return;
  currentTime.value = modalVideoRef.value.currentTime;
  duration.value = modalVideoRef.value.duration;
};

// Seek video to clicked position
const seekVideo = (event: MouseEvent) => {
  if (!modalVideoRef.value) return;

  const target = event.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();
  const pos = (event.clientX - rect.left) / rect.width;

  modalVideoRef.value.currentTime = pos * modalVideoRef.value.duration;
  updateVideoProgress();
};

// Enhanced video ready handler with animation
const handleVideoReady = () => {
  // Add a slight delay for smoother transition
  setTimeout(() => {
    videoReady.value = true;

    // Start progress tracking
    if (modalVideoRef.value) {
      duration.value = modalVideoRef.value.duration;

      // Set up progress tracking interval
      const progressInterval = setInterval(() => {
        if (!modalVideoRef.value || !isVideoModalOpen.value) {
          clearInterval(progressInterval);
          return;
        }
        updateVideoProgress();
      }, 250);
    }
  }, 500);
};

// Update loading progress with enhanced animation
const updateLoadingProgress = (event: any) => {
  if (typeof event === "number") {
    loadingProgress.value = event;
    return;
  }

  if (modalVideoRef.value) {
    try {
      // Calculate progress based on buffered ranges
      if (modalVideoRef.value.buffered.length > 0) {
        const bufferedEnd = modalVideoRef.value.buffered.end(0);
        const duration = modalVideoRef.value.duration;
        if (duration > 0) {
          loadingProgress.value = Math.round((bufferedEnd / duration) * 100);
        }
      }
    } catch (e) {
      console.error("Error al calcular progreso:", e);
    }
  }

  // Simulate progress with smoother animation
  if (loadingProgress.value < 20) {
    loadingProgress.value += 2 + Math.random() * 3;
  }
};

// Enhanced toggle play/pause with premium animation
const togglePlayPause = (): void => {
  if (!modalVideoRef.value) return;

  if (modalVideoRef.value.paused) {
    modalVideoRef.value
      .play()
      .then(() => {
        isPlaying.value = true;
      })
      .catch((error) => {
        console.error("Error playing video:", error);
      });
  } else {
    modalVideoRef.value.pause();
    isPlaying.value = false;
  }

  // Show enhanced play/pause indicator
  showPlayPauseIndicator.value = true;
  setTimeout(() => {
    showPlayPauseIndicator.value = false;
  }, 1000);
};

// Enhanced video modal opening with premium loading animation
const openVideoModal = (): void => {
  isVideoModalOpen.value = true;
  videoReady.value = false;
  isPlaying.value = false;
  loadingProgress.value = 0;
  currentTime.value = 0;
  duration.value = 0;
  lockScroll(true);

  // Start enhanced loading progress simulation
  const progressInterval = setInterval(() => {
    if (loadingProgress.value < 85 && !videoReady.value) {
      // Non-linear progress for more realistic loading simulation
      const increment = 5 * Math.pow(0.95, loadingProgress.value / 10);
      loadingProgress.value += Math.random() * increment;
    } else {
      clearInterval(progressInterval);
    }
  }, 300);

  // Load and play the modal video with slight delay for better UX
  setTimeout(() => {
    if (modalVideoRef.value) {
      if (modalVideoRef.value.canPlayType("video/mp4")) {
        // Preload video
        modalVideoRef.value.load();

        // Play after a short delay to allow for loading animation
        setTimeout(() => {
          if (modalVideoRef.value) {
            modalVideoRef.value
              .play()
              .then(() => {
                isPlaying.value = true;
              })
              .catch((error) => {
                console.error("Error playing video:", error);
              });
          }
        }, 800);
      }
    }
  }, 300);
};

// Enhanced modal closing with animation
const closeVideoModal = (): void => {
  if (modalVideoRef.value) {
    modalVideoRef.value.pause();
    // Reset video position for next viewing
    modalVideoRef.value.currentTime = 0;
  }

  isVideoModalOpen.value = false;
  lockScroll(false);
};

// Lock/unlock body scroll with enhanced handling
const lockScroll = (lock: boolean): void => {
  if (lock) {
    // Save current body styles
    originalBodyStyle = {
      overflow: document.body.style.overflow,
      paddingRight: document.body.style.paddingRight,
    };

    // Calculate scrollbar width
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    // Lock scroll
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  } else {
    // Restore original body styles
    document.body.style.overflow = originalBodyStyle.overflow;
    document.body.style.paddingRight = originalBodyStyle.paddingRight;
  }
};

// Handle escape key to close modal
const handleKeyDown = (event: KeyboardEvent): void => {
  if (!isVideoModalOpen.value) return;

  if (event.key === "Escape") {
    closeVideoModal();
  } else if (event.key === " " && videoReady.value) {
    // Space bar toggles play/pause
    togglePlayPause();
    event.preventDefault();
  }
};

// Lifecycle hooks
onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);

  // Ensure scroll is restored
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
});
</script>

<style>
/* Enhanced transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.scale-premium-enter-active,
.scale-premium-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.scale-premium-enter-from,
.scale-premium-leave-to {
  opacity: 0;
  transform: scale(0.7);
}

/* Premium text and button effects */
.text-glow-premium {
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.6),
    0 0 30px rgba(255, 255, 255, 0.3);
}

/* Enhanced animations for the banner */
.animate-title-reveal {
  animation: premiumTitleReveal 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards;
  opacity: 0;
}

.animate-buttons-reveal {
  animation: premiumButtonsReveal 1.2s cubic-bezier(0.19, 1, 0.22, 1) 0.4s
    forwards;
  opacity: 0;
}

.animate-gradient-pulse {
  animation: premiumGradientPulse 8s ease-in-out infinite;
}

.animate-gradient-slide {
  animation: premiumGradientSlide 15s ease-in-out infinite alternate;
}

@keyframes premiumTitleReveal {
  0% {
    opacity: 0;
    transform: translateY(40px);
    filter: blur(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

@keyframes premiumButtonsReveal {
  0% {
    opacity: 0;
    transform: translateY(30px);
    filter: blur(5px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

@keyframes premiumGradientPulse {
  0%,
  100% {
    opacity: 0.95;
  }
  50% {
    opacity: 0.75;
  }
}

@keyframes premiumGradientSlide {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

/* Enhanced appointment button */
.appointment-button {
  padding: 0.5rem 0;
}

.appointment-underline {
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, white, transparent);
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}

.appointment-button:hover .appointment-underline {
  transform: scaleX(1);
}

.appointment-button-glow {
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transform: skewX(-25deg);
  transition: 0.5s;
  opacity: 0;
}

.appointment-button:hover .appointment-button-glow {
  animation: appointmentGlow 1.5s infinite;
  opacity: 1;
}

@keyframes appointmentGlow {
  0% {
    left: -100%;
  }
  100% {
    left: 200%;
  }
}

/* Enhanced play button */
.play-button-premium {
  overflow: hidden;
}

.play-button-background {
  background: linear-gradient(135deg, #3a7bd5, #00d2ff);
  transition: all 0.5s ease;
}

.play-button-premium:hover .play-icon-wrapper {
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
}

.play-button-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transform: skewX(-25deg);
  opacity: 0;
}

.play-button-premium:hover .play-button-shine {
  animation: buttonShine 1.5s infinite;
  opacity: 1;
}

@keyframes buttonShine {
  0% {
    left: -100%;
  }
  100% {
    left: 200%;
  }
}

/* Enhanced video loading animation */
.premium-video-loader {
  position: relative;
  width: 80px;
  height: 80px;
}

.circular-loader {
  animation: rotate 2s linear infinite;
  height: 100%;
  transform-origin: center center;
  width: 100%;
}

.loader-path {
  stroke: white;
  stroke-dasharray: 150, 200;
  stroke-dashoffset: -10;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

.loader-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  height: 40%;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124;
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0.5;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.8;
  }
}

/* Loading dots animation */
.loading-text {
  display: flex;
  align-items: center;
}

.loading-dots {
  display: inline-flex;
  margin-left: 5px;
}

.dot {
  width: 5px;
  height: 5px;
  margin: 0 2px;
  background-color: white;
  border-radius: 50%;
  display: inline-block;
  animation: dotPulse 1.5s infinite ease-in-out;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes dotPulse {
  0%,
  100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
}

/* Enhanced progress bar */
.premium-progress-bar {
  background: linear-gradient(90deg, #3a7bd5, #00d2ff);
  transition: width 0.3s ease;
  position: relative;
  overflow: hidden;
}

.premium-progress-bar::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  animation: progressShine 2s infinite linear;
}

@keyframes progressShine {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Enhanced play indicator */
.play-indicator-premium {
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
  animation: indicatorPulse 1s ease-out;
}

@keyframes indicatorPulse {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
}

/* Pulse animation for loading preview */
.pulse-animation {
  animation: pulsate 2s ease-in-out infinite;
}

@keyframes pulsate {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
}

/* Custom video controls */
.custom-controls {
  transform: translateY(0);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.custom-controls:hover {
  transform: translateY(-5px);
}

/* Close button premium effect */
.close-button-premium {
  overflow: hidden;
}

.close-button-premium::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.2) 0%,
    transparent 70%
  );
  transform: scale(0);
  opacity: 0;
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.close-button-premium:hover::before {
  transform: scale(2);
  opacity: 1;
}
</style>
