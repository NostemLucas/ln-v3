<template>
  <!-- Sección de Timeline Horizontal -->
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4 md:px-8">
      <div class="mb-12 text-center">
        <div class="mx-auto mb-2 h-1 w-16 bg-blue-600"></div>
        <h2 class="text-3xl font-bold text-gray-900">Nuestra Historia</h2>
        <p class="mt-4 text-gray-600">
          Conoce nuestra trayectoria y línea de crecimiento a lo largo del
          tiempo
        </p>
      </div>

      <div class="mx-auto max-w-6xl relative">
        <!-- Contenedor con scroll horizontal en móvil -->
        <div class="overflow-x-auto p-8 flex justify-start items-center">
          <template v-for="(item, index) in timelineItems" :key="index">
            <div
              class="bg-amber- h-[600px] flex justify-center items-center relative"
            >
              <div
                class="h-9 w-full absolute"
                :style="{
                  backgroundColor: colors[index],
                  borderRadius:
                    index === 0
                      ? '30px 0 0 30px'
                      : timelineItems.length - 1 === index
                      ? '0 30px 30px 0'
                      : '',
                }"
              >
                <div
                  v-if="index % 2 !== 0"
                  class="absolute -top-6 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[40px] border-r-[40px] border-b-[40px] border-transparent border-b-red-500"
                  :style="{ borderBottomColor: colors[index] }"
                />
                <div
                  v-else
                  class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[40px] border-r-[40px] border-t-[40px] border-transparent border-t-red-500"
                  :style="{ borderTopColor: colors[index] }"
                />
              </div>
              <div
                class="flex items-center"
                :style="{
                  flexDirection: index % 2 === 0 ? 'column' : 'column-reverse',
                }"
              >
                <!-- Año -->
                <div
                  class="rounded-full p-4 font-bold w-28 h-28 flex justify-center items-center border-[10px] text-3xl"
                  :style="{
                    borderColor: colors[index],
                    color: colors[index],
                  }"
                >
                  {{ item.year }}
                </div>

                <!-- Línea debajo del círculo -->
                <span
                  class="w-2 h-32 flex justify-center items-center"
                  :style="{ backgroundColor: colors[index] }"
                >
                </span>

                <!-- Contenido -->
                <div
                  class="w-64 text-center flex flex-col items-center justify-center gap-4"
                  :style="{
                    marginTop: index % 2 === 0 ? '90px' : '',
                    marginBottom: index % 2 === 0 ? '' : '90px',
                  }"
                >
                  <p class="text-gray-700 text-[22px] uppercase font-bold">
                    {{ item.title }}
                  </p>
                  <span
                    class="h-1 w-20 rounded-full"
                    :style="{ backgroundColor: colors[index] }"
                  />
                  <p class="text-gray-500 font-light text-sm line-clamp-4">
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
    title: "Inicio y Primer Trasplante",
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
    title: "Expansión a La Paz",
    content:
      "Se expande el alcance con la apertura de Oncoclinic en la ciudad de La Paz, ampliando el acceso a tratamientos oncológicos especializados.",
  },
  {
    year: "2020",
    title: "Laboratorio Molecular",
    content:
      "Se inaugura el Laboratorio de Biología Molecular “Paolo Belli”, mejorando las capacidades diagnósticas en oncología.",
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
  "#FCCF48", // amarillo
  "#FD9E00", // naranja
  "#FD4414", // rojo
  "#CE1A6A", // fucsia
  "#683FB7", // morado
  "#3C57D6", // azul
  "#00A3E0", // cian
  "#00BFA6", // turquesa
  "#00B050", // verde
  "#8CC63F", // verde lima
  "#D9E021", // amarillo verdoso
];

// Función para cambiar el contenido de la línea de tiempo
</script>

<style></style>
