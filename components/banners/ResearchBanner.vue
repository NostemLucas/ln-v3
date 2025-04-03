<template>
  <div
    class="bg-gradient-to-r from-[#0A2647] to-[#144272] px-4 py-8 text-white"
  >
    <div class="mx-auto max-w-7xl">
      <div
        class="flex flex-col items-start gap-6 rounded-lg border border-[#2C74B3]/20 bg-[#0A2647]/60 p-6 shadow-lg backdrop-blur-sm md:flex-row md:items-center md:justify-between"
      >
        <div class="flex items-start gap-5 md:items-center">
          <div
            class="flex h-14 w-14 items-center justify-center rounded-md bg-[#2C74B3] p-3 shadow-md"
          >
            <Icon icon="mdi:hand-heart" class="h-8 w-8" />
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span
                class="rounded-sm bg-[#2C74B3] px-3 py-1 text-xs font-medium uppercase tracking-wider"
                >Iniciativa</span
              >
              <h2 class="text-xl font-semibold">
                Programa de Investigación Oncológica
              </h2>
            </div>
            <p class="mt-2 max-w-xl text-sm leading-relaxed text-gray-200">
              Contribuya a nuestro programa de investigación oncológica y ayude
              a financiar avances médicos que transforman vidas. Su apoyo es
              fundamental para el desarrollo de nuevos tratamientos.
            </p>
            <div class="mt-3 flex items-center gap-2">
              <div class="h-1.5 w-1.5 rounded-full bg-[#2C74B3]"></div>
              <span class="text-sm font-medium text-[#2C74B3]"
                >{{ donorsCount }} colaboradores activos</span
              >
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <button
            class="group rounded-md bg-[#2C74B3] px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#205295] focus:outline-none focus:ring-2 focus:ring-[#2C74B3]/50"
            @click="$emit('show-modal')"
          >
            <span class="flex items-center justify-center gap-2">
              Colaborar
              <Icon
                icon="mdi:arrow-right"
                class="h-4 w-4 transition-transform group-hover:translate-x-1"
              />
            </span>
          </button>
          <span class="text-center text-xs text-gray-300"
            >Certificado fiscal disponible</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineProps({
  donorsCount: {
    type: Number,
    default: 0,
  },
});

defineEmits(["show-modal"]);
</script>
