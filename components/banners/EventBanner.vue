<template>
  <div
    class="bg-gradient-to-r from-[#0F2E4C] to-[#1A5B8C] px-4 py-8 text-white"
  >
    <div class="mx-auto max-w-7xl">
      <div
        class="flex flex-col items-start gap-6 rounded-lg border border-[#3A97D4]/20 bg-[#0F2E4C]/60 p-6 shadow-lg backdrop-blur-sm md:flex-row md:items-center md:justify-between"
      >
        <div class="flex items-start gap-5 md:items-center">
          <div
            class="flex h-14 w-14 items-center justify-center rounded-md bg-[#3A97D4] p-3 shadow-md"
          >
            <Icon icon="mdi:calendar-star" class="h-8 w-8" />
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span
                class="rounded-sm bg-[#3A97D4] px-3 py-1 text-xs font-medium uppercase tracking-wider"
                >Evento</span
              >
              <h2 class="text-xl font-semibold">Jornada de Puertas Abiertas</h2>
            </div>
            <p class="mt-2 max-w-xl text-sm leading-relaxed text-gray-200">
              Le invitamos a nuestra jornada de puertas abiertas donde podrá
              conocer nuestras instalaciones, hablar con nuestros especialistas
              y participar en charlas informativas sobre salud.
            </p>
            <div class="mt-3 flex items-center gap-2">
              <Icon icon="mdi:calendar" class="h-4 w-4 text-[#3A97D4]" />
              <span class="text-sm font-medium text-gray-200"
                >15 de Mayo, 2025 | 10:00 - 18:00</span
              >
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <button
            class="group rounded-md bg-[#3A97D4] px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#2980B9] focus:outline-none focus:ring-2 focus:ring-[#3A97D4]/50"
            @click="$emit('show-modal')"
          >
            <span class="flex items-center justify-center gap-2">
              Inscribirse
              <Icon
                icon="mdi:arrow-right"
                class="h-4 w-4 transition-transform group-hover:translate-x-1"
              />
            </span>
          </button>
          <span class="text-center text-xs text-gray-300"
            >Plazas limitadas</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineEmits(["show-modal"]);
</script>
