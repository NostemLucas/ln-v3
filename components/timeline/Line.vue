<template>
  <!-- Sección de Timeline Horizontal -->
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4 md:px-8">
      <div class="mb-12 text-center">
        <h2 class="text-3xl font-bold text-gray-900">Nuestra Historia</h2>

        <div class="mx-auto mt-2 h-1 w-16 rounded bg-primary-300" />
        <p class="mt-4 text-gray-600">
          Conoce nuestra trayectoria y línea de crecimiento a lo largo del
          tiempo
        </p>
      </div>

      <!-- Indicador de desplazamiento -->
      <div class="flex justify-center mb-4 items-center gap-2 text-gray-500">
        <span class="text-sm">Arrastra para explorar</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="animate-bounce-x"
        >
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path>
        </svg>
      </div>

      <div class="mx-auto max-w-6xl relative">
        <!-- Contenedor con scroll horizontal personalizado -->
        <div
          ref="scrollContainer"
          class="timeline-scroll-container overflow-x-auto pb-8 flex justify-start cursor-grab"
          v-dragscroll
        >
          <!-- Barra de timeline continua que ocupa todo el ancho -->
          <div class="absolute top-[282px] h-9 left-0 right-0 w-max">
            <div class="h-full w-full flex">
              <template
                v-for="(item, index) in timelineItems"
                :key="`bar-${index}`"
              >
                <div
                  class="h-full w-72"
                  :style="{
                    backgroundColor: colors[index % colors.length],

                    borderRadius:
                      index === 0
                        ? '30px 0 0 30px'
                        : timelineItems.length - 1 === index
                        ? '0 30px 30px 0'
                        : '',
                  }"
                ></div>
              </template>
            </div>
          </div>

          <template
            v-for="(item, index) in timelineItems"
            :key="`item-${index}`"
          >
            <div
              class="timeline-item flex-shrink-0 w-64 mx-4 h-[600px] flex justify-center items-center relative z-10"
            >
              <!-- Triángulos en la barra de timeline -->
              <div
                v-if="index % 2 !== 0"
                class="absolute bottom-[294px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[40px] border-r-[40px] border-b-[40px] border-transparent border-b-red-500 z-20"
                :style="{ borderBottomColor: colors[index % colors.length] }"
              />
              <div
                v-else
                class="absolute top-[294px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[40px] border-r-[40px] border-t-[40px] border-transparent border-t-red-500 z-20"
                :style="{ borderTopColor: colors[index % colors.length] }"
              />

              <div
                class="flex items-center"
                :style="{
                  flexDirection: index % 2 === 0 ? 'column' : 'column-reverse',
                }"
              >
                <!-- Año - Tamaño fijo -->
                <div
                  class="rounded-full p-4 font-bold w-28 h-28 flex justify-center items-center border-[10px] text-3xl select-none z-20 bg-white"
                  :style="{
                    borderColor: colors[index % colors.length],
                    color: colors[index % colors.length],
                  }"
                >
                  {{ item.year }}
                </div>

                <!-- Línea entre el círculo y la barra - Tamaño fijo con más espacio -->
                <div
                  class="w-2 h-48 flex justify-center items-center"
                  :style="{ backgroundColor: colors[index % colors.length] }"
                ></div>

                <!-- Contenido - Tamaño fijo -->
                <div
                  class="w-64 h-64 text-center flex flex-col items-center justify-center gap-4 select-none px-4"
                  :style="{
                    marginTop: index % 2 === 0 ? '16px' : '',
                    marginBottom: index % 2 === 0 ? '' : '16px',
                  }"
                >
                  <p
                    class="text-gray-700 text-[22px] uppercase font-bold line-clamp-2"
                  >
                    {{ item.title }}
                  </p>
                  <span
                    class="h-1 w-20 rounded-full"
                    :style="{ backgroundColor: colors[index % colors.length] }"
                  />
                  <p
                    class="text-gray-500 font-light text-sm line-clamp-4 overflow-hidden"
                  >
                    {{ item.content }}
                  </p>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const timelineItems = [
  {
    year: "2017",
    title: "Nuestros Inicios",
    content:
      "Nace Oncoclinic en la Clínica FIDES de El Alto, marcando un hito con la realización del primer trasplante de médula ósea autólogo en Bolivia.",
  },
  {
    year: "2018",
    title: "Alianza con Chicago",
    content:
      "Se establece una alianza estratégica con la Universidad de Chicago, fortaleciendo la colaboración en programas de trasplante de médula ósea.",
  },
  {
    year: "2019",
    title: "Nos Expandimos a La Paz",
    content:
      "Se expande el alcance con la apertura de Oncoclinic en la ciudad de La Paz, ampliando el acceso a tratamientos oncológicos especializados.",
  },
  {
    year: "2020",
    title: "Laboratorio Molecular",
    content:
      "Se inaugura el Laboratorio de Biología Molecular Paolo Belli, mejorando las capacidades diagnósticas en oncología.",
  },
  {
    year: "2021",
    title: "Acreditación Hospitalaria",
    content:
      "La infraestructura de hospitalización recibe acreditación, garantizando atención con altos estándares de calidad y bioseguridad.",
  },
  {
    year: "2022",
    title: "Registro Internacional",
    content:
      "Bolivia ingresa oficialmente al registro internacional de países que realizan trasplantes de médula ósea. Además, se habilitan salas de Terapia Intensiva Oncológica, fortaleciendo la atención a pacientes críticos.",
  },
  {
    year: "2023",
    title: "Primer Trasplante Alogénico",
    content:
      "Se realiza el primer trasplante de médula ósea alogénico en adultos en Bolivia, un avance para la medicina del país.",
  },
  {
    year: "2024",
    title: "Unidad de Secuenciación",
    content:
      "Se inaugura la Unidad de Secuenciación Genómica (Next Generation Sequencing) y el primer quirófano oncológico especializado de la institución.",
  },
  {
    year: "2025",
    title: "Acreditación ISO",
    content:
      "Oncoclinic se convierte en la primera clínica en Bolivia en obtener la acreditación ISO, consolidando su compromiso con la excelencia y la calidad internacional.",
  },
];

const colors = [
  "#FCCF48",
  "#FD9E00",
  "#FD4414",
  "#CE1A6A",
  "#683FB7",
  "#3C57D6",
  "#00A3E0",
  "#00BFA6",
  "#00B050",
  "#8CC63F",
  "#D9E021",
];
</script>

<style scoped>
/* Animación para el ícono de flecha */
@keyframes bounce-x {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(10px);
  }
}

.animate-bounce-x {
  animation: bounce-x 1s infinite;
}

/* Ocultar la barra de desplazamiento pero mantener la funcionalidad */
.timeline-scroll-container {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  position: relative;
}

.timeline-scroll-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

/* Asegurar que los elementos del timeline tengan un tamaño fijo */
.timeline-item {
  flex: 0 0 auto;
}
</style>
