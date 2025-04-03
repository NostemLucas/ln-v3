<template>
  <div
    class="bg-gradient-to-r from-[#1E3A5F] to-[#2E5984] px-4 py-8 text-white"
  >
    <div class="mx-auto max-w-7xl">
      <div
        class="flex flex-col items-start gap-6 rounded-lg border border-[#4CAF50]/20 bg-[#1E3A5F]/60 p-6 shadow-lg backdrop-blur-sm md:flex-row md:items-center md:justify-between"
      >
        <div class="flex items-start gap-5 md:items-center">
          <div
            class="flex h-14 w-14 items-center justify-center rounded-md bg-[#4CAF50] p-3 shadow-md"
          >
            <Icon icon="mdi:charity" class="h-8 w-8" />
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span
                class="rounded-sm bg-[#4CAF50] px-3 py-1 text-xs font-medium uppercase tracking-wider"
                >Donación</span
              >
              <h2 class="text-xl font-semibold">
                Campaña de Equipamiento Médico
              </h2>
            </div>
            <p class="mt-2 max-w-xl text-sm leading-relaxed text-gray-200">
              Ayúdenos a adquirir equipamiento médico de última generación para
              mejorar el diagnóstico y tratamiento de nuestros pacientes. Cada
              donación marca la diferencia.
            </p>
            <div class="mt-3 flex items-center gap-2">
              <div class="h-1.5 w-24 rounded-full bg-gray-600 overflow-hidden">
                <div class="h-full w-3/4 bg-[#4CAF50]"></div>
              </div>
              <span class="text-sm font-medium text-gray-200"
                >75% conseguido</span
              >
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <button
            class="group rounded-md bg-[#4CAF50] px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#388E3C] focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/50"
            @click="$emit('show-modal')"
          >
            <span class="flex items-center justify-center gap-2">
              Donar Ahora
              <Icon
                icon="mdi:arrow-right"
                class="h-4 w-4 transition-transform group-hover:translate-x-1"
              />
            </span>
          </button>
          <span class="text-center text-xs text-gray-300"
            >Donaciones deducibles de impuestos</span
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
