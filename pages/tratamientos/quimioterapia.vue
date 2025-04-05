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
                Quimioterapia
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
          Quimioterapia
        </h1>
      </div>

      <!-- Main Content -->
      <div class="grid gap-12 lg:grid-cols-2">
        <!-- Left Column: Description and Accordions -->
        <div>
          <div class="prose prose-slate max-w-none">
            <p class="text-lg">
              La quimioterapia es el uso de fármacos para destruir las células
              cancerosas. Este tipo de tratamiento contra el cáncer actúa sobre
              las células cancerosas, matando las células y frenando su avance.
            </p>
            <p>
              La quimioterapia se puede usar como tratamiento principal o como
              terapia adyuvante (después de la cirugía o radioterapia). Existen
              varios tipos: "quimioterapia estándar", "quimioterapia
              tradicional" y "quimioterapia citotóxica".
            </p>
          </div>

          <!-- Accordions -->
          <div class="mt-8 space-y-4">
            <AccordionItem
              id="quimioterapia-cancer"
              title="¿Cómo Trata La Quimioterapia El Cáncer?"
              :active="activeAccordion === 'quimioterapia-cancer'"
              @toggle="toggleAccordion"
            >
              <p>
                La quimioterapia es tratada por un médico oncólogo y llega a
                todas las partes del cuerpo. Existen muchos tipos diferentes de
                quimioterapia que funcionan de distintas maneras para destruir
                las células cancerosas o impedir que estas crezcan más rápido.
                Una célula durante puede pasar a través de varias fases del
                ciclo celular.
              </p>
            </AccordionItem>
          </div>
        </div>

        <!-- Right Column: Image -->
        <div>
          <div class="overflow-hidden rounded-xl shadow-lg">
            <img
              src="/treatments/quimio.jpg"
              alt="Quimioterapia"
              class="h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </div>

      <!-- Additional Information -->
      <div class="mt-12 grid gap-8 md:grid-cols-3">
        <div class="rounded-xl bg-white p-6 shadow-md">
          <h3 class="mb-4 text-xl font-semibold text-slate-800">
            ¿Cuántos Ciclos Típicos Necesitaré?
          </h3>
          <p class="text-slate-600">
            El número de ciclos de quimioterapia varía según el tipo de cáncer,
            su etapa y la respuesta del paciente al tratamiento. Generalmente,
            los pacientes reciben entre 4 y 8 ciclos, pero esto puede variar
            significativamente según el plan de tratamiento personalizado.
          </p>
        </div>

        <div class="rounded-xl bg-white p-6 shadow-md">
          <h3 class="mb-4 text-xl font-semibold text-slate-800">
            ¿Cuánto Dura Un Ciclo?
          </h3>
          <p class="text-slate-600">
            Un ciclo de quimioterapia típicamente dura entre 2 y 4 semanas.
            Incluye el período de administración del medicamento seguido por un
            período de descanso para permitir que el cuerpo se recupere. La
            duración exacta depende del régimen específico de tratamiento.
          </p>
        </div>

        <div class="rounded-xl bg-white p-6 shadow-md">
          <h3 class="mb-4 text-xl font-semibold text-slate-800">
            Tipos De Quimioterapia
          </h3>
          <ul class="list-inside list-disc space-y-2 text-slate-600">
            <li>Quimioterapia oral (píldoras o cápsulas)</li>
            <li>Quimioterapia intravenosa (vena)</li>
            <li>Quimioterapia intratecal (líquido cefalorraquídeo)</li>
            <li>Quimioterapia intraarterial (arteria)</li>
            <li>Quimioterapia intraperitoneal (cavidad abdominal)</li>
          </ul>
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
            title="Inmunoterapia"
            description="Tratamiento que utiliza el sistema inmunitario para combatir el cáncer."
            image="/treatments/inmunoterapia.jpg"
            link="/tratamientos/inmunoterapia"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
