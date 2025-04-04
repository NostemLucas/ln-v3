<template>
  <div class="bg-gradient-to-b from-slate-50 to-white">
    <div class="container mx-auto px-4 py-16 md:px-6 lg:py-20">
      <!-- Breadcrumb -->
      <nav class="mb-8 flex" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <router-link
              to="/"
              class="inline-flex items-center text-sm font-medium text-slate-700 hover:text-teal-600"
            >
              <Home class="mr-2 h-4 w-4" />
              Inicio
            </router-link>
          </li>
          <li>
            <div class="flex items-center">
              <Icon
                name="lucide:chevron-right"
                class="h-4 w-4 text-slate-400"
              />
              <router-link
                to="/tratamientos"
                class="ml-1 text-sm font-medium text-slate-700 hover:text-teal-600 md:ml-2"
              >
                Tratamientos
              </router-link>
            </div>
          </li>
          <li aria-current="page">
            <div class="flex items-center">
              <Icon
                name="lucide:chevron-right"
                class="h-4 w-4 text-slate-400"
              />
              <span class="ml-1 text-sm font-medium text-slate-500 md:ml-2">
                Inmunoterapia
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <!-- Treatment Header -->
      <div class="mb-12">
        <span
          class="mb-2 inline-block rounded-full bg-teal-100 px-3 py-1 text-sm font-medium text-teal-800"
        >
          Tratamiento Especializado
        </span>
        <h1
          class="mb-4 text-3xl font-bold text-slate-800 md:text-4xl lg:text-5xl"
        >
          Inmunoterapia
        </h1>
      </div>

      <!-- Main Content -->
      <div class="grid gap-12 lg:grid-cols-2">
        <!-- Left Column: Image -->
        <div>
          <div class="overflow-hidden rounded-xl shadow-lg">
            <img
              src="/treatments/inmunoterapia.jpg"
              alt="Inmunoterapia"
              class="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        <!-- Right Column: Description and Accordions -->
        <div>
          <div class="prose prose-slate max-w-none">
            <p class="text-lg">
              La inmunoterapia es un tipo de tratamiento para el cáncer. Utiliza
              sustancias producidas por el cuerpo o en un laboratorio para
              mejorar el sistema inmunitario y ayudarlo a encontrar y destruir
              células cancerosas.
            </p>
          </div>

          <!-- Accordions -->
          <div class="mt-8 space-y-4">
            <AccordionItem
              id="inmunoterapia-cancer"
              title="¿Cómo Se Usa La Inmunoterapia Para Tratar El Cáncer?"
              :active="activeAccordion === 'inmunoterapia-cancer'"
              @toggle="toggleAccordion"
            >
              <p>
                La inmunoterapia es un tratamiento que utiliza ciertas partes
                del sistema inmunitario de una persona para combatir
                enfermedades como el cáncer. Esto se puede hacer de varias
                maneras: estimulando su propio sistema inmunitario para que
                trabaje más intensamente o de manera más específica para atacar
                las células cancerosas, o administrando componentes del sistema
                inmunitario, como proteínas producidas en el laboratorio, para
                atacar a las células cancerosas.
              </p>
            </AccordionItem>
          </div>

          <div class="mt-8 rounded-xl bg-white p-6 shadow-md">
            <h3 class="mb-4 text-xl font-semibold text-slate-800">
              Tipos de Inmunoterapia
            </h3>

            <div class="space-y-4">
              <AccordionItem
                id="anticuerpos"
                title="Anticuerpos Monoclonales Y Sus Efectos Secundarios"
                :active="activeAccordion === 'anticuerpos'"
                @toggle="toggleAccordion"
              >
                <p>
                  Los anticuerpos monoclonales son proteínas creadas en
                  laboratorio diseñadas para atacar antígenos específicos en las
                  células cancerosas. Los efectos secundarios pueden incluir
                  reacciones alérgicas, fatiga, náuseas y riesgo de infección.
                  La gravedad varía según el tipo específico de anticuerpo y la
                  condición del paciente.
                </p>
              </AccordionItem>

              <AccordionItem
                id="inhibidores"
                title="Inhibidores De Puntos De Control Inmunitario"
                :active="activeAccordion === 'inhibidores'"
                @toggle="toggleAccordion"
              >
                <p>
                  Estos medicamentos bloquean las proteínas que impiden que el
                  sistema inmunitario ataque las células cancerosas. Al
                  desactivar estos "frenos" del sistema inmunitario, permiten
                  que las células inmunitarias reconozcan y destruyan las
                  células cancerosas de manera más efectiva.
                </p>
              </AccordionItem>

              <AccordionItem
                id="terapias-t"
                title="Terapias De Células T"
                :active="activeAccordion === 'terapias-t'"
                @toggle="toggleAccordion"
              >
                <p>
                  Las terapias de células T, como CAR-T, modifican genéticamente
                  las células T del paciente para que reconozcan y ataquen las
                  células cancerosas. Estas células modificadas se multiplican
                  en el cuerpo y pueden proporcionar protección a largo plazo
                  contra el cáncer.
                </p>
              </AccordionItem>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Treatments -->
      <div class="mt-16">
        <h2 class="mb-8 text-2xl font-bold text-slate-800">
          Otros tratamientos relacionados
        </h2>
        <div class="grid gap-8 md:grid-cols-2">
          <TreatmentCard
            title="Trasplante De Médula Ósea"
            description="Un procedimiento médico que reemplaza la médula ósea por células sanas."
            image="/treatments/medula.jpeg"
            link="/tratamientos/trasplante-medula-osea"
          />
          <TreatmentCard
            title="Quimioterapia"
            description="Uso de fármacos para destruir las células cancerosas."
            image="/treatments/quimio.jpg"
            link="/tratamientos/quimioterapia"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AccordionItem from "@/components/ui/AccordionItem.vue";
import TreatmentCard from "@/components/ui/TreatmentCard.vue";

const activeAccordion = ref<string | null>(null);

const toggleAccordion = (id: string) => {
  if (activeAccordion.value === id) {
    activeAccordion.value = null;
  } else {
    activeAccordion.value = id;
  }
};
</script>
