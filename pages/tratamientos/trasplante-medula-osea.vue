<template>
  <div class="bg-gradient-to-b from-slate-50 to-white">
    <div class="container mx-auto px-4 py-16 md:px-6 lg:py-20">
      <!-- Breadcrumb -->
      <Breadcumb />
      <!-- Treatment Header -->
      <div class="mb-12">
        <span
          class="inline-block rounded-full bg-teal-100 px-3 py-1 my-6 text-sm font-medium text-teal-800"
        >
          Tratamiento Especializado
        </span>
        <h1
          class="mb-4 text-3xl font-bold text-slate-800 md:text-4xl lg:text-5xl"
        >
          Trasplante De Médula Ósea
        </h1>
      </div>

      <!-- Main Content -->
      <div class="grid gap-12 lg:grid-cols-2">
        <!-- Left Column: Description and Accordions -->
        <div>
          <div class="prose prose-slate max-w-none">
            <p class="text-lg">
              Un trasplante de médula ósea es un procedimiento médico que
              reemplaza la médula ósea por células sanas. Las células de
              reemplazo pueden provenir del propio paciente o de un donante.
            </p>
            <p>
              La médula ósea es el tejido esponjoso que se encuentra dentro de
              los huesos y que consideramos verdadero de células madre
              hematopoyéticas. El trasplante se puede utilizar para tratar
              ciertos tipos de cáncer, como la leucemia o el linfoma, o
              enfermedades que afectan la producción de células de la sangre que
              fabrica la médula ósea.
            </p>
          </div>

          <!-- Accordions -->
          <div class="mt-8 space-y-4">
            <AccordionItem
              id="celulas-madre"
              title="¿Qué son las células madre?"
              :active="activeAccordion === 'celulas-madre'"
              @toggle="toggleAccordion"
            >
              <p>
                Las células madre son células especiales que pueden reproducirse
                a sí mismas y convertirse en distintos tipos de células que el
                cuerpo necesita. Hay varios tipos de células madre y se
                encuentran en diferentes partes del cuerpo, incluyendo la médula
                ósea, la sangre y el cordón umbilical.
              </p>
            </AccordionItem>

            <AccordionItem
              id="como-funciona"
              title="¿Cómo funciona un trasplante de células madre/médula ósea?"
              :active="activeAccordion === 'como-funciona'"
              @toggle="toggleAccordion"
            >
              <p>
                En general, este proceso conlleva recolectar las células madre
                del donante, la eliminación de tratamientos de preparación para
                el cuerpo para el receptor, la infusión de células y la
                monitorización posterior del recuperación.
              </p>
              <p class="mt-2">
                A menudo, se puede utilizar el trasplante en el que las células
                que provienen directa el paciente de trasplante (autólogo).
              </p>
            </AccordionItem>
          </div>
        </div>

        <!-- Right Column: Image and Types -->
        <div>
          <div class="overflow-hidden rounded-xl shadow-lg">
            <img
              src="/treatments/medula.jpeg"
              alt="Trasplante de Médula Ósea"
              class="h-full w-full object-cover object-center"
            />
          </div>

          <div class="mt-8 rounded-xl bg-white p-6 shadow-md">
            <h3 class="mb-4 text-xl font-semibold text-slate-800">
              ¿Qué tipos de trasplante de células madre existen?
            </h3>

            <div class="space-y-4">
              <AccordionItem
                id="trasplante1"
                title="Trasplante Alogénico"
                :active="activeAccordion === 'trasplante1'"
                @toggle="toggleAccordion"
              >
                <p>
                  El trasplante alogénico utiliza células madre de un donante
                  compatible, que puede ser un familiar o un donante no
                  relacionado. Este tipo de trasplante es común para tratar
                  leucemias y otros trastornos de la sangre.
                </p>
              </AccordionItem>

              <AccordionItem
                id="trasplante2"
                title="Trasplante Autólogo"
                :active="activeAccordion === 'trasplante2'"
                @toggle="toggleAccordion"
              >
                <p>
                  En el trasplante autólogo, se utilizan las propias células
                  madre del paciente. Estas se recolectan antes de un
                  tratamiento intensivo como quimioterapia o radioterapia, y
                  luego se reinfunden para restaurar la función de la médula
                  ósea.
                </p>
              </AccordionItem>

              <AccordionItem
                id="trasplante3"
                title="Trasplante de Cordón Umbilical"
                :active="activeAccordion === 'trasplante3'"
                @toggle="toggleAccordion"
              >
                <p>
                  Este tipo de trasplante utiliza células madre de la sangre del
                  cordón umbilical de recién nacidos. Estas células son
                  inmaduras y pueden adaptarse mejor al receptor, reduciendo el
                  riesgo de rechazo.
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
            title="Inmunoterapia"
            description="Tratamiento que utiliza el sistema inmunitario para combatir el cáncer."
            image="/treatments/inmunoterapia.jpg"
            link="/tratamientos/inmunoterapia"
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
import AccordionItem from "@/components/ui/AccordionItem.vue";
import TreatmentCard from "@/components/ui/TreatmentCard.vue";
import Breadcumb from "~/components/navigation/Breadcumb.vue";

const activeAccordion = ref<string | null>(null);

const toggleAccordion = (id: string) => {
  if (activeAccordion.value === id) {
    activeAccordion.value = null;
  } else {
    activeAccordion.value = id;
  }
};
</script>
