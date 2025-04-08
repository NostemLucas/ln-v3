<template>
  <div class="overflow-x-hidden">
    <!-- Sección Principal: Quiénes Somos -->
    <section class="bg-white py-16">
      <div class="container mx-auto px-4 md:px-8">
        <div class="grid items-start gap-12 lg:grid-cols-12">
          <!-- Text Content - Expanded -->
          <div class="lg:col-span-8 xl:col-span-8">
            <div class="mb-8">
              <div class="mb-4 h-1 w-20 bg-blue-600"></div>
              <h1 class="text-3xl font-bold text-gray-900 md:text-4xl">
                ¿Quiénes somos?
              </h1>
            </div>

            <div class="space-y-4 leading-relaxed text-gray-700">
              <p>
                En
                <span class="font-semibold text-blue-700">Oncoclinic</span>
                trabajamos con compromiso y pasión para liderar la lucha contra
                el cáncer, promoviendo la investigación, la educación y la
                concienciación sobre esta enfermedad.
              </p>

              <p>
                Nuestro objetivo es alcanzar la excelencia en la prevención, el
                diagnóstico y el tratamiento de los tumores, a través de la
                investigación clínico-científica, la innovación en gestión y la
                mejora continua en la calidad del servicio que ofrecemos a
                nuestros pacientes.
              </p>

              <p>
                Contamos con un equipo multidisciplinario de especialistas
                altamente calificados, dedicados a brindar atención médica y
                apoyo psicológico integral tanto al paciente como a su familia,
                en cada etapa del proceso oncológico.
              </p>

              <p>
                Ofrecemos un diagnóstico preciso, tratamientos personalizados y
                un enfoque humano, empleando tecnologías de vanguardia y
                estrategias colaborativas para mejorar la calidad de vida de
                quienes atendemos.
              </p>
              <p>
                Desarrollamos programas innovadores de alto impacto que buscan
                transformar la atención oncológica en Bolivia. Apostamos por la
                investigación científica, el desarrollo tecnológico y un modelo
                de atención sostenible que garantice el acceso a servicios de
                calidad en todos los niveles y estratos sociales.
              </p>

              <blockquote
                class="my-4 border-l-4 border-blue-600 pl-4 text-xl text-blue-700 italic"
              >
                "Donde quiera que se ama el arte de la medicina se ama también a
                la humanidad."
                <p class="mt-2 text-right text-base text-gray-600">- Platón</p>
              </blockquote>
            </div>
          </div>

          <!-- Image Section - Compact -->
          <div class="group relative lg:col-span-4 xl:col-span-4">
            <div class="h-[700px] overflow-hidden rounded-xl shadow-lg">
              <img
                src="/landing/monalisa.jpg"
                alt="Imagen institucional"
                class="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />
              <div
                class="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-transparent opacity-30"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Sección de Filosofía: Misión, Visión y Valores -->
    <section class="bg-gray-50 py-16">
      <div class="container mx-auto px-4 md:px-8">
        <div class="mb-12 text-center">
          <div class="mx-auto mb-2 h-1 w-16 bg-blue-600"></div>
          <h2 class="text-3xl font-bold text-gray-900">Nuestra Filosofía</h2>
          <p class="mt-4 text-gray-600">
            Conoce los principios que guían nuestro trabajo diario
          </p>
        </div>

        <!-- Tabs de navegación -->
        <div class="mb-10 flex flex-wrap justify-center gap-4">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="rounded-full px-8 py-3 text-sm font-medium transition-all duration-300"
            :class="
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'border border-blue-200 bg-white text-blue-600 hover:bg-blue-50'
            "
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Contenido de los tabs (sin card, con diseño más limpio) -->
        <div class="mx-auto max-w-4xl">
          <transition name="fade" mode="out-in">
            <!-- Misión -->
            <div
              v-if="activeTab === 'mission'"
              class="flex flex-col items-center"
            >
              <div
                class="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-blue-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-10 w-10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="6"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                </svg>
              </div>
              <h3 class="mb-6 text-center text-2xl font-bold text-gray-900">
                Nuestra Misión
              </h3>

              <!-- Card de misión mejorada -->
              <div
                class="bg-white rounded-xl shadow-lg p-8 border-t-4 border-blue-600 max-w-3xl hover:shadow-xl transition-all duration-300"
              >
                <p class="text-lg leading-relaxed text-gray-700 p-2">
                  Brindar una atención integral y humanizada en la prevención,
                  diagnóstico, tratamiento y seguimiento de pacientes con
                  enfermedades oncológicas, a través de la excelencia médica, la
                  innovación constante y el uso de tecnología de vanguardia.
                </p>
              </div>
            </div>

            <!-- Visión -->
            <div
              v-else-if="activeTab === 'vision'"
              class="flex flex-col items-center"
            >
              <div
                class="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-blue-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-10 w-10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
              <h3 class="mb-6 text-center text-2xl font-bold text-gray-900">
                Nuestra Visión
              </h3>
              <div class="grid gap-6 md:grid-cols-2 max-w-4xl">
                <div
                  v-for="(vision, index) in visions"
                  :key="index"
                  class="bg-white rounded-xl p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border-t-4 border-blue-500"
                >
                  <div class="flex items-center gap-3 mb-4">
                    <div
                      class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold"
                    >
                      V{{ index + 1 }}
                    </div>
                    <h4 class="font-semibold text-blue-700 text-lg">
                      {{ vision.title }}
                    </h4>
                  </div>
                  <p class="text-gray-700">{{ vision.description }}</p>
                </div>
              </div>
            </div>

            <!-- Valores -->
            <div
              v-else-if="activeTab === 'values'"
              class="flex flex-col items-center"
            >
              <div
                class="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-blue-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-10 w-10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  ></path>
                </svg>
              </div>
              <h3 class="mb-6 text-center text-2xl font-bold text-gray-900">
                Nuestros Valores
              </h3>

              <!-- Valores con nuevo diseño mejorado -->
              <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl">
                <div
                  v-for="(value, index) in valuesList"
                  :key="index"
                  class="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-blue-100 relative overflow-hidden"
                >
                  <div
                    class="absolute top-0 right-0 w-16 h-16 bg-blue-500 opacity-10 rounded-bl-full"
                  ></div>

                  <div class="flex items-center gap-3 mb-4">
                    <div
                      class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm"
                    >
                      {{ value.id.charAt(0) }}
                    </div>
                    <h4 class="font-semibold text-blue-700">{{ value.id }}</h4>
                  </div>

                  <h5 class="font-medium text-gray-800 mb-3 text-lg">
                    {{ value.title }}
                  </h5>
                  <p class="text-gray-600">{{ value.description }}</p>

                  <div class="mt-4 pt-4 border-t border-blue-100">
                    <div class="flex items-center text-sm text-blue-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 mr-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Principio fundamental</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </section>

    <!-- Sección de Cita (a 100vw) -->
    <section class="relative w-screen bg-blue-600 py-16 text-white">
      <div
        class="absolute top-0 left-0 h-full w-full bg-blue-700 opacity-10 mix-blend-overlay"
      ></div>
      <div class="relative z-10 container mx-auto px-4">
        <div class="mx-auto max-w-3xl text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mx-auto mb-6 h-12 w-12 opacity-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
          <blockquote class="mb-6 text-2xl font-light italic md:text-3xl">
            "Soñar, querer que el arte se una al de la medicina es una tentativa
            a la humanidad."
          </blockquote>
          <p class="text-xl font-semibold">- Renoir</p>
        </div>
      </div>
    </section>
    <Line />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Line from "~/components/timeline/Line.vue";
// Estado para los tabs
const activeTab = ref("mission");

const tabs = [
  { id: "mission", label: "Nuestra Misión" },
  { id: "vision", label: "Nuestra Visión" },
  { id: "values", label: "Nuestros Valores" },
];

// Visiones con formato mejorado
interface Vision {
  title: string;
  description: string;
}

const visions: Vision[] = [
  {
    title: "Excelencia Clínica",
    description: "Resultados clínicos de excelencia. ",
  },
  {
    title: "Investigación Aplicada",
    description:
      "Investigación traslacional aplicada directamente a la práctica.",
  },
  {
    title: "Atención Centrada",
    description: "Modelo de atención centrado en el paciente y su familia.",
  },
  {
    title: "Impacto Nacional",
    description: "Contribución activa a la lucha contra el cáncer en el país.",
  },
];

// Valores con formato mejorado
interface Value {
  id: string;
  title: string;
  description: string;
}

const valuesList: Value[] = [
  {
    id: "Humanidad",
    title: "Paciente como prioridad",
    description:
      "Atención personalizada que incluye apoyo emocional y acompañamiento familiar.",
  },
  {
    id: "Rigor",
    title: "Integridad científica",
    description: "Rigor en diagnósticos y tratamientos basados en evidencia.",
  },
  {
    id: "Innovación",
    title: "Innovación responsable",
    description:
      "Adopción de tecnologías validadas con impacto real en supervivencia y calidad de vida.",
  },
  {
    id: "Colaboración",
    title: "Equipo multidisciplinario",
    description:
      "Colaboración entre especialistas para decisiones terapéuticas integrales.",
  },
  {
    id: "Compromiso",
    title: "Compromiso social",
    description: "Educación preventiva y acceso a tratamientos con equidad.",
  },
];
</script>
