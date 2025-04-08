<template>
  <section class="bg-gradient-to-b from-white to-blue-50/50 py-16">
    <div class="container mx-auto max-w-7xl px-4">
      <!-- Encabezado de sección con animación sutil -->
      <div class="mb-12 text-center">
        <h2
          class="text-3xl font-bold text-gray-900 md:text-4xl relative inline-block pb-5"
        >
          Nuestros Tratamientos
          <span
            class="absolute bottom-2 left-0 h-1 w-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transform origin-left"
          />
        </h2>
        <p class="mt-4 text-gray-600 max-w-2xl mx-auto">
          Ofrecemos tratamientos oncológicos avanzados con tecnología de
          vanguardia y atención personalizada
        </p>
        <div class="mt-4">
          <a
            href="#"
            class="inline-flex items-center text-blue-600 font-medium transition-all duration-300 hover:text-blue-800 group"
          >
            <span>Ver Todos los Tratamientos</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="ml-1 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>

      <!-- Grid de tarjetas con efectos mejorados -->
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="treatment in treatments"
          :key="treatment.title"
          class="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
        >
          <!-- Indicador de categoría -->
          <div class="absolute top-4 right-4 z-30">
            <span
              class="bg-blue-600/90 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm"
            >
              Tratamiento Especializado
            </span>
          </div>

          <!-- Contenedor de imagen con efectos -->
          <div class="relative h-[400px] overflow-hidden">
            <!-- Overlay gradiente que baja al hacer hover -->
            <div
              class="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-80 transition-all duration-700 ease-in-out]"
            />
            <div
              class="absolute inset-0 z-10 bg-gradient-to-t from-blue-900/90 via-blue-800/70 to-transparent opacity-80 transition-all duration-700 ease-in-out group-hover:translate-y-[70%] translate-y-28"
            />

            <!-- Imagen con efecto de zoom -->
            <img
              :src="treatment.image"
              :alt="`Imagen de ${treatment.title}`"
              draggable="false"
              class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />

            <!-- Contenido superpuesto -->
            <div
              class="absolute bottom-0 left-0 z-20 w-full p-6 text-white transition-all duration-500"
            >
              <!-- Título con efecto de subrayado en hover -->
              <h3
                class="mb-3 text-2xl font-bold text-white relative inline-block group-hover:text-blue-100"
              >
                {{ treatment.title }}
                <span
                  class="absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-300 transition-all duration-500 group-hover:w-full"
                ></span>
              </h3>

              <!-- Descripción con mejor legibilidad -->
              <p
                class="line-clamp-3 max-w-prose text-sm font-light text-gray-100 group-hover:text-white"
              >
                {{ treatment.description }}
              </p>

              <!-- Botón con animación mejorada -->
              <div
                class="mt-6 transform transition-all duration-500 group-hover:translate-y-0 opacity-0 group-hover:opacity-100"
              >
                <UButton
                  variant="solid"
                  type="button"
                  :to="treatment.url"
                  class="rounded-full bg-white px-5 py-2 text-sm font-medium text-blue-900 transition-all duration-300 hover:bg-blue-50 hover:shadow-lg flex items-center w-40"
                >
                  <span>Conocer más</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Botón de acción principal -->
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

const treatments = ref([
  {
    title: "Trasplante de Médula Ósea",
    description:
      "Reemplaza células madre dañadas por células sanas, para tratar enfermedades.",
    image:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "/tratamientos/transplante-medula-osea",
  },
  {
    title: "Inmunoterapia",
    description:
      "Terapia innovadora que estimula el sistema inmunológico para que reconozca y destruya células cancerosas.",
    image:
      "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "/tratamientos/inmunoterapia",
  },
  {
    title: "Quimioterapia",
    description:
      "Uso de medicamentos potentes que destruyen células cancerosas, impidiendo su crecimiento y multiplicación.",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "/tratamientos/quimioterapia",
  },
  {
    title: "Quimioterapia Metronómica",
    description:
      "Administración de dosis bajas y continuas de quimioterapia para evitar el crecimiento del tumor.",
    image:
      "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "/tratamientos/quimioterapia-metronomica",
  },
  {
    title: "Terapia Biológica",
    description:
      "Tratamiento que utiliza sustancias naturales o modificadas genéticamente para interferir en los procesos que favorecen el crecimiento y propagación del cáncer.",
    image:
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "/tratamientos/terapia-biologica",
  },
  {
    title: "Cirugía Oncológica",
    description:
      "Intervención quirúrgica para extirpar tumores cancerosos, tejidos afectados o ganglios, con el fin de controlar o curar el cáncer.",
    image:
      "https://images.unsplash.com/photo-1571772996211-2f02974a9f91?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "/tratamientos/cirugia-oncologica",
  },
]);
</script>
