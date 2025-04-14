<template>
  <UModal
    :open="isOpen"
    @close="closeModal"
    :dismissible="true"
    portal
    class="md:max-w-4xl"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    :ui="{
      overlay: 'bg-black/90 backdrop-blur-sm',
      wrapper: 'ring-0 focus:outline-none focus:ring-0',
      content: 'ring-0 focus:outline-none focus:ring-0',
    }"
  >
    <template #content>
      <div class="h-full w-full relative">
        <h2 id="modal-title" class="sr-only">Presentación de video</h2>

        <!-- Botón de cierre -->
        <UButton
          @click="closeModal"
          variant="ghost"
          class="absolute top-2 right-2 h-10 w-10 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors flex justify-center items-center"
          aria-label="Cerrar modal"
        >
          <Icon name="lucide:x" />
        </UButton>

        <video
          controls
          preload="auto"
          autoplay
          muted
          class="w-full h-full object-contain"
        >
          <source src="~/assets/media/presentation.mp4" type="video/mp4" />
          <span class="sr-only"
            >Tu navegador no soporta el formato de video.</span
          >
        </video>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:isOpen"]);

const closeModal = () => {
  emit("update:isOpen", false);
};
</script>
