<template>
  <section class="bg-gradient-to-b from-white to-blue-50/50 py-16">
    <div class="container mx-auto max-w-7xl px-4">
      <!-- Encabezado de sección -->
      <div class="mb-12 text-center">
        <h2
          class="text-3xl font-bold text-gray-900 md:text-4xl relative inline-block pb-5"
        >
          Nuestros <span class="text-primary-300"> Tratamientos </span>
          <span
            class="absolute bottom-1 left-[30%] h-1 w-40 bg-primary-700 rounded-full transform origin-left"
          />
        </h2>
        <p class="mt-4 text-gray-600 max-w-2xl mx-auto">
          Ofrecemos tratamientos oncológicos avanzados con tecnología de
          vanguardia y atención personalizada
        </p>
        <div class="mt-4">
          <a
            href="#"
            class="inline-flex items-center text-primary-500 font-medium transition-all duration-300 hover:text-blue-800 group"
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

      <!-- Grid de tarjetas -->
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <TreatmentCard
          v-for="treatment in treatments"
          :image="treatment.image"
          :title="treatment.title"
          :description="treatment.description"
          :url="treatment.url"
          :key="treatment.title"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import TreatmentCard from "./TreatmentCard.vue";
const treatments = ref([
  {
    title: "Trasplante de Médula Ósea",
    description:
      "Reemplaza células madre dañadas por células sanas, para tratar enfermedades.",
    image:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "/tratamientos/trasplante-medula-osea",
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
    image: "/treatments/oncologia.jpg",
    url: "/tratamientos/cirugia-oncologica",
  },
]);
</script>
