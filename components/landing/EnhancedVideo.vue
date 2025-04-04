<template>
  <div class="relative w-full overflow-hidden">
    <!-- Video de Fondo con Imagen De Respaldo -->
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
        <source src="~/assets/media/video.webm" type="video/webm" />
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
            class="appointment-btn group inline-flex items-center text-lg font-medium text-white transition-all duration-300 md:text-xl overflow-hidden rounded-full"
          >
            <span>Pedir una cita</span>
            <Icon
              name="lucide:arrow-right"
              size="1.25rem"
              class="ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
            />
          </NuxtLink>

          <!-- Play Video Button - Restored semi-transparent design with glow -->
          <button
            class="video-btn group relative flex w-fit items-center space-x-3 overflow-hidden rounded-full bg-white/10 px-6 py-3 text-white backdrop-blur-sm transition-all duration-300"
            @click="openVideoModal"
          >
            <div
              class="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:scale-105"
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

    <!-- Video Modal -->
    <Transition name="fade">
      <div
        v-if="isVideoModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center"
        @click="closeVideoModal"
      >
        <!-- Backdrop with blur -->
        <div class="absolute inset-0 bg-black/90 backdrop-blur-sm"></div>

        <!-- Modal Content -->
        <div
          ref="modalContainer"
          class="relative z-10 w-full max-w-5xl overflow-hidden rounded-lg bg-black shadow-2xl"
          @click.stop
        >
          <!-- Close Button -->
          <button
            class="absolute right-3 top-3 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-all duration-300 hover:bg-white/60 hover:text-black sm:right-4 sm:top-4 sm:h-10 sm:w-10"
            aria-label="Cerrar video"
            @click.stop="closeVideoModal"
          >
            <Icon name="lucide:x" size="1.25rem" />
          </button>

          <!-- Video Container -->
          <div class="relative aspect-video w-full bg-black">
            <!-- Video Element -->
            <video
              ref="modalVideoRef"
              class="h-full w-full cursor-pointer"
              @canplay="handleVideoReady"
              @click="togglePlayPause"
              @loadeddata="updateLoadingProgress(50)"
              @canplaythrough="updateLoadingProgress(100)"
              @progress="updateLoadingProgress"
              @play="handleVideoPlay"
              @pause="handleVideoPause"
              @ended="handleVideoEnded"
              @waiting="handleVideoWaiting"
              preload="metadata"
            >
              <source src="~/assets/media/presentation.mp4" type="video/mp4" />
              <span class="sr-only"
                >Tu navegador no soporta el formato de video.</span
              >
            </video>

            <!-- Estado de carga inicial (antes de que el video esté listo) -->
            <Transition name="fade" mode="out-in">
              <div
                v-if="!videoReady"
                class="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gray-900/95"
              >
                <!-- Loading Animation -->
                <div class="video-loader mb-4">
                  <svg class="h-14 w-14 sm:h-16 sm:w-16" viewBox="0 0 100 100">
                    <circle
                      class="loader-circle"
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke-width="4"
                    />
                  </svg>
                </div>

                <div
                  class="text-base font-medium tracking-wider text-white sm:text-lg"
                >
                  Preparando presentación
                  <span class="loading-dots">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                  </span>
                </div>

                <!-- Progress Bar -->
                <div
                  class="absolute bottom-8 left-0 right-0 mx-auto w-3/4 overflow-hidden rounded-full sm:bottom-10"
                >
                  <div class="h-1 w-full bg-gray-800/80">
                    <div
                      class="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-300"
                      :style="{ width: `${loadingProgress}%` }"
                    />
                  </div>
                </div>
              </div>
            </Transition>

            <!-- Estado "Listo para reproducir" (video listo pero no reproduciendo) -->
            <Transition name="fade">
              <div
                v-if="videoReady && !isPlaying && !isBuffering"
                class="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gray-900/80"
              >
                <div class="text-lg font-medium tracking-wider text-white mb-6">
                  Listo para reproducir
                </div>

                <button
                  class="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-white/10 transition-colors duration-300 hover:bg-white/20 sm:h-16 sm:w-16"
                  @click.stop="startPlayback"
                >
                  <Icon
                    name="lucide:play"
                    class="h-7 w-7 text-white sm:h-8 sm:w-8"
                  />
                </button>
              </div>
            </Transition>

            <!-- Estado de buffering (solo cuando está reproduciendo y cargando) -->
            <Transition name="fade">
              <div
                v-if="isBuffering && isPlaying && !showPlayPauseIndicator"
                class="absolute inset-0 z-30 flex items-center justify-center bg-black/50"
              >
                <div class="buffering-spinner">
                  <div class="buffering-circle"></div>
                  <div class="buffering-circle"></div>
                  <div class="buffering-circle"></div>
                </div>
              </div>
            </Transition>

            <!-- Indicador de Play/Pause (aparece brevemente al cambiar estado) -->
            <Transition name="scale">
              <div
                v-if="showPlayPauseIndicator"
                class="pointer-events-none absolute inset-0 z-40 flex items-center justify-center"
              >
                <div class="rounded-full bg-black/40 p-5 sm:p-6">
                  <Icon
                    :name="isPlaying ? 'lucide:pause' : 'lucide:play'"
                    class="h-6 w-6 text-white sm:h-8 sm:w-8"
                  />
                </div>
              </div>
            </Transition>

            <!-- Video Controls -->
            <Transition name="fade">
              <div
                v-if="videoReady && isPlaying"
                class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 transition-opacity duration-300 hover:opacity-100 sm:p-4"
                @click.stop
              >
                <!-- Progress Bar -->
                <div
                  class="relative mb-2 h-1.5 w-full cursor-pointer overflow-hidden rounded-full bg-white/20 sm:mb-3"
                  @click.stop="seekVideo"
                >
                  <div
                    class="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-500"
                    :style="{ width: `${videoProgress}%` }"
                  ></div>
                </div>

                <!-- Controls Row - Fixed alignment -->
                <div class="flex items-center justify-between gap-1 sm:gap-2">
                  <div class="flex items-center gap-2">
                    <!-- Play/Pause Button -->
                    <button
                      class="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white/10 transition-colors duration-200 hover:bg-white/20 sm:h-8 sm:w-8"
                      @click.stop="togglePlayPause"
                    >
                      <Icon
                        :name="isPlaying ? 'lucide:pause' : 'lucide:play'"
                        class="h-3.5 w-3.5 text-white sm:h-4 sm:w-4"
                      />
                    </button>

                    <!-- Time Display -->
                    <div class="text-xs text-white/90 sm:text-sm">
                      {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
                    </div>
                  </div>

                  <div class="flex items-center gap-1 sm:gap-2">
                    <!-- Volume Control -->
                    <div class="relative flex items-center">
                      <button
                        class="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white/10 transition-colors duration-200 hover:bg-white/20 sm:h-8 sm:w-8"
                        @click.stop="toggleMute"
                      >
                        <Icon
                          :name="
                            !isMuted && volume > 0.5
                              ? 'lucide:volume-2'
                              : !isMuted && volume > 0
                              ? 'lucide:volume-1'
                              : 'lucide:volume-x'
                          "
                          class="h-3.5 w-3.5 text-white sm:h-4 sm:w-4"
                        />
                      </button>

                      <div class="ml-1 hidden w-16 sm:ml-2 sm:block sm:w-20">
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          v-model="volume"
                          class="volume-slider h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/20"
                          @input="updateVolume"
                        />
                      </div>
                    </div>

                    <!-- Playback Speed -->
                    <div class="relative">
                      <button
                        class="flex cursor-pointer items-center rounded-full bg-white/10 px-1.5 py-0.5 text-xs text-white transition-colors duration-200 hover:bg-white/20 sm:px-2 sm:py-1 sm:text-sm"
                        @click.stop="toggleSpeedMenu"
                      >
                        {{ playbackSpeed }}x
                      </button>

                      <div
                        v-if="showSpeedMenu"
                        class="absolute bottom-full right-0 mb-2 w-20 rounded bg-gray-800 py-1 shadow-lg sm:w-24"
                      >
                        <button
                          v-for="speed in [0.5, 0.75, 1, 1.25, 1.5, 2]"
                          :key="speed"
                          class="block w-full cursor-pointer px-2 py-1 text-left text-xs text-white hover:bg-white/10 sm:px-3 sm:text-sm"
                          :class="{ 'bg-white/20': playbackSpeed === speed }"
                          @click.stop="setPlaybackSpeed(speed)"
                        >
                          {{ speed }}x
                        </button>
                      </div>
                    </div>

                    <!-- Fullscreen Button -->
                    <button
                      class="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white/10 transition-colors duration-200 hover:bg-white/20 sm:h-8 sm:w-8"
                      @click.stop="toggleFullscreen"
                    >
                      <Icon
                        name="lucide:maximize"
                        class="h-3.5 w-3.5 text-white sm:h-4 sm:w-4"
                      />
                    </button>
                  </div>
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
import { ref, computed, onMounted, onUnmounted } from "vue";

// Video references
const backgroundVideoRef = ref<HTMLVideoElement | null>(null);
const modalVideoRef = ref<HTMLVideoElement | null>(null);
const modalContainer = ref<HTMLElement | null>(null);

// State
const isVideoModalOpen = ref<boolean>(false);
const videoReady = ref<boolean>(false);
const isPlaying = ref<boolean>(false);
const showPlayPauseIndicator = ref<boolean>(false);
const loadingProgress = ref<number>(0);
const currentTime = ref<number>(0);
const duration = ref<number>(0);
const isBuffering = ref<boolean>(false);
const lastPlayPos = ref<number>(0);
const volume = ref<number>(1);
const isMuted = ref<boolean>(false);
const playbackSpeed = ref<number>(1);
const showSpeedMenu = ref<boolean>(false);

// Computed
const videoProgress = computed(() => {
  if (duration.value === 0) return 0;
  return (currentTime.value / duration.value) * 100;
});

// Body scroll lock state
let originalBodyStyle = {
  overflow: "",
  paddingRight: "",
};

// Timers
let bufferingTimer: number | null = null;
let progressInterval: number | null = null;
let playPauseIndicatorTimer: number | null = null;

// Format time (mm:ss)
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

  // Buffering detection
  if (isPlaying.value && !isBuffering.value) {
    if (
      lastPlayPos.value === currentTime.value &&
      !modalVideoRef.value.paused
    ) {
      isBuffering.value = true;
    }
  }

  lastPlayPos.value = currentTime.value;
};

// Seek video
const seekVideo = (event: MouseEvent) => {
  if (!modalVideoRef.value) return;

  const target = event.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();
  const pos = (event.clientX - rect.left) / rect.width;

  modalVideoRef.value.currentTime = pos * modalVideoRef.value.duration;
  updateVideoProgress();
};

// Video ready handler
const handleVideoReady = () => {
  videoReady.value = true;

  if (modalVideoRef.value) {
    duration.value = modalVideoRef.value.duration;

    // Set up progress tracking
    if (progressInterval) clearInterval(progressInterval);

    progressInterval = window.setInterval(() => {
      if (!modalVideoRef.value || !isVideoModalOpen.value) {
        if (progressInterval) clearInterval(progressInterval);
        return;
      }
      updateVideoProgress();
    }, 250);
  }
};

// Handle video play
const handleVideoPlay = () => {
  isPlaying.value = true;
  isBuffering.value = false;

  // Reset buffering detection
  if (bufferingTimer) clearInterval(bufferingTimer);

  // Set up buffering detection
  bufferingTimer = window.setInterval(() => {
    if (modalVideoRef.value && isPlaying.value) {
      if (modalVideoRef.value.readyState < 3) {
        isBuffering.value = true;
      } else {
        isBuffering.value = false;
      }
    }
  }, 500);
};

// Handle video pause
const handleVideoPause = () => {
  isPlaying.value = false;
};

// Handle video waiting
const handleVideoWaiting = () => {
  isBuffering.value = true;
};

// Handle video ended
const handleVideoEnded = () => {
  isPlaying.value = false;

  if (bufferingTimer) {
    clearInterval(bufferingTimer);
    bufferingTimer = null;
  }
};

// Show play/pause indicator
const showIndicator = (duration = 200) => {
  // Clear any existing timer
  if (playPauseIndicatorTimer) {
    clearTimeout(playPauseIndicatorTimer);
    playPauseIndicatorTimer = null;
  }

  // Show indicator
  showPlayPauseIndicator.value = true;

  // Set timer to hide indicator
  playPauseIndicatorTimer = window.setTimeout(() => {
    showPlayPauseIndicator.value = false;
    playPauseIndicatorTimer = null;
  }, duration);
};

// Start playback
const startPlayback = () => {
  if (!modalVideoRef.value || !videoReady.value) return;

  modalVideoRef.value
    .play()
    .then(() => {
      isPlaying.value = true;
      showIndicator();
    })
    .catch((error) => {
      console.error("Error playing video:", error);
    });
};

// Update loading progress
const updateLoadingProgress = (event: any) => {
  if (typeof event === "number") {
    loadingProgress.value = event;
    return;
  }

  if (modalVideoRef.value) {
    try {
      if (modalVideoRef.value.buffered.length > 0) {
        const bufferedEnd = modalVideoRef.value.buffered.end(0);
        const duration = modalVideoRef.value.duration;
        if (duration > 0) {
          loadingProgress.value = Math.round((bufferedEnd / duration) * 100);
        }
      }
    } catch (e) {
      console.error("Error calculating progress:", e);
    }
  }
};

// Toggle play/pause
const togglePlayPause = (): void => {
  if (!modalVideoRef.value) return;

  if (modalVideoRef.value.paused) {
    modalVideoRef.value
      .play()
      .then(() => {
        isPlaying.value = true;
        showIndicator();
      })
      .catch((error) => {
        console.error("Error playing video:", error);
      });
  } else {
    modalVideoRef.value.pause();
    isPlaying.value = false;
    showIndicator();
  }
};

// Toggle mute
const toggleMute = (): void => {
  if (!modalVideoRef.value) return;

  isMuted.value = !isMuted.value;
  modalVideoRef.value.muted = isMuted.value;
};

// Update volume
const updateVolume = (): void => {
  if (!modalVideoRef.value) return;

  modalVideoRef.value.volume = volume.value;
  isMuted.value = volume.value === 0;
};

// Toggle speed menu
const toggleSpeedMenu = (): void => {
  showSpeedMenu.value = !showSpeedMenu.value;

  // Auto-close menu after selection
  if (showSpeedMenu.value) {
    document.addEventListener("click", closeSpeedMenu);
  } else {
    document.removeEventListener("click", closeSpeedMenu);
  }
};

// Close speed menu
const closeSpeedMenu = (): void => {
  showSpeedMenu.value = false;
  document.removeEventListener("click", closeSpeedMenu);
};

// Set playback speed
const setPlaybackSpeed = (speed: number): void => {
  if (!modalVideoRef.value) return;

  playbackSpeed.value = speed;
  modalVideoRef.value.playbackRate = speed;
  showSpeedMenu.value = false;
};

// Toggle fullscreen
const toggleFullscreen = (): void => {
  if (!modalContainer.value) return;

  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    modalContainer.value.requestFullscreen();
  }
};

// Open video modal
const openVideoModal = (): void => {
  isVideoModalOpen.value = true;
  videoReady.value = false;
  isPlaying.value = false;
  isBuffering.value = false;
  loadingProgress.value = 0;
  currentTime.value = 0;
  duration.value = 0;
  showPlayPauseIndicator.value = false;
  lockScroll(true);

  // Simulate loading progress
  const loadingInterval = setInterval(() => {
    if (loadingProgress.value < 85 && !videoReady.value) {
      loadingProgress.value += Math.random() * 3;
    } else {
      clearInterval(loadingInterval);
    }
  }, 300);

  // Load the modal video
  setTimeout(() => {
    if (modalVideoRef.value) {
      modalVideoRef.value.load();
    }
  }, 300);
};

// Close video modal
const closeVideoModal = (): void => {
  if (modalVideoRef.value) {
    modalVideoRef.value.pause();
    modalVideoRef.value.currentTime = 0;
  }

  // Clear timers
  if (bufferingTimer) {
    clearInterval(bufferingTimer);
    bufferingTimer = null;
  }

  if (progressInterval) {
    clearInterval(progressInterval);
    progressInterval = null;
  }

  if (playPauseIndicatorTimer) {
    clearTimeout(playPauseIndicatorTimer);
    playPauseIndicatorTimer = null;
  }

  isVideoModalOpen.value = false;
  isPlaying.value = false;
  showPlayPauseIndicator.value = false;
  lockScroll(false);

  // Remove any event listeners
  document.removeEventListener("click", closeSpeedMenu);
};

// Lock/unlock body scroll
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

// Handle escape key
const handleKeyDown = (event: KeyboardEvent): void => {
  if (!isVideoModalOpen.value) return;

  if (event.key === "Escape") {
    closeVideoModal();
  } else if (event.key === " " && videoReady.value) {
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
  document.removeEventListener("click", closeSpeedMenu);

  // Clear timers
  if (bufferingTimer) clearInterval(bufferingTimer);
  if (progressInterval) clearInterval(progressInterval);
  if (playPauseIndicatorTimer) clearTimeout(playPauseIndicatorTimer);

  // Restore scroll
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
});
</script>

<style>
/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s cubic-bezier(0.19, 1, 0.22, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.7);
}

/* Animations */
@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse-subtle {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.9;
  }
}

.animate-fade-in-up {
  animation: fade-in-up 1s cubic-bezier(0.19, 1, 0.22, 1) forwards;
}

.animate-pulse-subtle {
  animation: pulse-subtle 4s ease-in-out infinite;
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

.appointment-btn:hover::after {
  transform: scaleX(1);
}

.appointment-btn span {
  position: relative;
  z-index: 10;
}

.appointment-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transition: 0.5s;
}

.appointment-btn:hover::before {
  left: 100%;
}

/* Video Button - Restored semi-transparent design with glow */
.video-btn {
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
}

.video-btn:hover {
  box-shadow: 0 0 25px rgba(0, 255, 255, 0.4);
  background-color: rgba(255, 255, 255, 0.15);
}

.video-btn::before {
  content: "";
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
}

.video-btn:hover::before {
  left: 150%;
}

/* Video Loader */
.video-loader {
  position: relative;
  width: 80px;
  height: 80px;
}

.loader-circle {
  stroke: white;
  stroke-dasharray: 242;
  stroke-dashoffset: 242;
  animation: loader-dash 2s ease-in-out infinite;
}

@keyframes loader-dash {
  0% {
    stroke-dashoffset: 242;
  }
  50% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: -242;
  }
}

/* Loading dots */
.loading-dots {
  display: inline-flex;
  margin-left: 5px;
}

.dot {
  width: 4px;
  height: 4px;
  margin: 0 2px;
  background-color: white;
  border-radius: 50%;
  display: inline-block;
  animation: dot-pulse 1.5s infinite ease-in-out;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes dot-pulse {
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

/* Buffering spinner */
.buffering-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
}

.buffering-circle {
  width: 10px;
  height: 10px;
  margin: 0 4px;
  background-color: white;
  border-radius: 50%;
  animation: buffering-animation 1.4s infinite ease-in-out both;
}

.buffering-circle:nth-child(1) {
  animation-delay: -0.32s;
}

.buffering-circle:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes buffering-animation {
  0%,
  80%,
  100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Volume slider styling */
.volume-slider {
  -webkit-appearance: none;
  appearance: none;
  height: 4px;
  outline: none;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.2);
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
}

.volume-slider::-moz-range-thumb {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  border: none;
}

/* Responsive adjustments for mobile */
@media (max-width: 640px) {
  .video-btn {
    width: 100%;
    justify-content: center;
  }

  .buffering-spinner {
    transform: scale(0.8);
  }

  .volume-slider {
    width: 60px;
  }
}

@media (max-width: 480px) {
  .video-loader {
    transform: scale(0.8);
  }

  .appointment-btn,
  .video-btn {
    font-size: 0.95rem;
  }
}
</style>
