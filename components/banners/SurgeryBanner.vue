<template>
  <div
    class="bg-gradient-to-r from-[#0D3B66] to-[#1D5B96] px-4 py-8 text-white"
  >
    <div class="mx-auto max-w-7xl">
      <div
        class="flex flex-col items-start gap-6 rounded-lg border border-[#F39C12]/20 bg-[#0D3B66]/60 p-6 shadow-lg backdrop-blur-sm md:flex-row md:items-center md:justify-between"
      >
        <div class="flex items-start gap-5 md:items-center">
          <div
            class="flex h-14 w-14 items-center justify-center rounded-md bg-[#F39C12] p-3 shadow-md"
          >
            <Icon icon="medical-icon:i-surgery" class="h-8 w-8" />
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span
                class="rounded-sm bg-[#F39C12] px-3 py-1 text-xs font-medium uppercase tracking-wider"
                >Campaña</span
              >
              <h2 class="text-xl font-semibold">
                Programa de Cirugías Solidarias
              </h2>
            </div>
            <p class="mt-2 max-w-xl text-sm leading-relaxed text-gray-200">
              Nuestro programa de cirugías solidarias ofrece intervenciones
              quirúrgicas a pacientes sin recursos. Ayúdenos a seguir ofreciendo
              este servicio esencial.
            </p>
            <div class="mt-3 flex items-center gap-2">
              <Icon icon="mdi:account-group" class="h-4 w-4 text-[#F39C12]" />
              <span class="text-sm font-medium text-gray-200"
                >127 pacientes beneficiados este año</span
              >
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <button
            class="group rounded-md bg-[#F39C12] px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#E67E22] focus:outline-none focus:ring-2 focus:ring-[#F39C12]/50"
            @click="$emit('show-modal')"
          >
            <span class="flex items-center justify-center gap-2">
              Solicitar Información
              <Icon
                icon="mdi:arrow-right"
                class="h-4 w-4 transition-transform group-hover:translate-x-1"
              />
            </span>
          </button>
          <span class="text-center text-xs text-gray-300"
            >Consulta gratuita de evaluación</span
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
