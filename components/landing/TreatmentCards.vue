<template>
  <div class="container mx-auto max-w-7xl px-4 py-12">
    <div class="mb-8 text-center">
      <h2 class="text-3xl font-bold text-gray-900 md:text-4xl">
        Nuestros Tratamientos
      </h2>
      <div class="mt-2">
        <a
          href="#"
          class="inline-flex items-center text-blue-600 transition-colors hover:text-blue-800"
        >
          <span>Ver Todos</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="ml-1 h-5 w-5"
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

    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="treatment in treatments"
        :key="treatment.title"
        class="group relative overflow-hidden rounded-lg shadow-md transition-shadow duration-300 hover:shadow-2xl"
      >
        <div class="relative h-[26em] overflow-hidden">
          <div
            class="absolute inset-0 z-10 bg-gradient-to-t from-blue-900/80 via-blue-900/70 to-transparent transition-all duration-500 ease-in-out group-hover:translate-y-40"
          />

          <NuxtImg
            :src="treatment.image"
            :alt="`Imagen de ${treatment.title}`"
            draggable="false"
            format="webpm"
            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />

          <div
            class="absolute bottom-0 left-0 z-20 w-full p-6 text-white transition-transform duration-500 ease-in-out group-hover:-translate-y-5"
          >
            <h3
              class="mb-3 line-clamp-1 text-2xl font-bold text-white md:text-2xl"
            >
              {{ treatment.title }}
            </h3>
            <p
              class="line-clamp-3 max-w-prose text-sm font-light text-gray-100"
            >
              {{ treatment.description }}
            </p>

            <div
              class="mt-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              <button
                class="rounded-full bg-white px-4 py-2 text-sm font-medium text-blue-900 transition-colors hover:bg-blue-50"
              >
                Leer más
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const treatments = ref([
  {
    title: "Trasplante de Médula Ósea",
    description:
      "Procedimiento médico en el que se reemplaza la médula ósea dañada con células madre sanas, permitiendo la regeneración del tejido y mejorando la calidad de vida del paciente.",
    image: "/treatments/medula.jpeg",
  },
  {
    title: "Inmunoterapia",
    description:
      "Terapia innovadora que fortalece el sistema inmunológico para atacar selectivamente las células cancerosas, minimizando el daño a las células sanas.",
    image: "/treatments/inmunoterapia.jpg",
  },
  {
    title: "Quimioterapia",
    description:
      "Tratamiento basado en el uso de fármacos que destruyen células cancerosas. Puede emplearse solo o en combinación con otros tratamientos para aumentar su efectividad.",
    image: "/treatments/quimio.jpg",
  },
  {
    title: "Quimioterapia Metronómica",
    description:
      "Estrategia terapéutica que administra quimioterapia en dosis bajas y constantes, con el objetivo de reducir efectos secundarios y mejorar la calidad de vida del paciente.",
    image: "/treatments/metro.jpg",
  },
  {
    title: "Terapia Biológica",
    description:
      "Tratamiento que utiliza sustancias naturales o modificadas genéticamente para interferir en los procesos que favorecen el crecimiento y propagación del cáncer.",
    image: "/treatments/biologica.jpg",
  },
  {
    title: "Cirugía Oncológica",
    description:
      "Procedimiento quirúrgico especializado en la extirpación de tumores malignos y tejido circundante, con el objetivo de eliminar el cáncer de manera segura y efectiva.",
    image: "/treatments/oncologia.jpg",
  },
]);
</script>
