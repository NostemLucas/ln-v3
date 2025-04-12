<template>
  <div class="bg-gradient-to-b from-slate-50 to-white">
    <HeaderNavigation title="Transplante de Medula Osea" />
    <div class="container mx-auto px-4 py-16 md:px-6 lg:py-20 text-justify">
      <!-- Main Content -->
      <div class="grid gap-12 lg:grid-cols-2">
        <!-- Left Column: Description and Accordions -->
        <div>
          <div class="prose prose-slate max-w-none flex flex-col gap-6">
            <p class="text-md">
              Este tratamiento reemplaza células dañadas o enfermas por células
              madre sanas, que ayudan a regenerar la médula ósea y a restaurar
              la producción normal de células sanguíneas.
            </p>
            <p>
              Desde el 2017, nuestro equipo ha sido pionero en Bolivia en el
              desarrollo de nuevas técnicas en trasplantes de médula ósea y
              procedimientos con células madre.
            </p>
            <p class="text-lg font-semibold">
              ¿Porqué elegir oncoclinic para un transplante de medula osea?
            </p>
            <p>
              Cuando se enfrenta a un cáncer de la sangre o un trastorno de la
              médula ósea, elegir dónde recibir atención médica puede ser una
              decisión que salve su vida. El Programa de Trasplante de Médula
              Ósea & Terapias Celulares de Oncoclinic, es resultado de un
              trabajo en conjunto de la Global Bone Marrow Trasnplantation de la
              universidad de Chicago Illinois, Estados Unidos, que ofrece
              terapias avanzadas de un equipo de expertos clínicos
            </p>
            <p>
              Entendemos que someterse a un trasplante de médula ósea puede ser
              un proceso abrumador. Nuestro equipo lo guiará en cada paso del
              tratamiento, desde el diagnóstico hasta el trasplante y la
              recuperación. Algunos aspectos destacados de nuestro programa
              incluyen:
            </p>

            <p class="text-lg font-semibold">Historia de Innovación</p>

            <p>
              Realizamos uno de los primeros trasplantes exitosos de Bolivia en
              el 2017, marcando un hito en la medicina de nuestro país. Nuestros
              especialistas incorporan las últimas investigaciones y terapias en
              sus protocolos, asegurando que siempre reciba las opciones más
              actualizadas.
            </p>
            <div
              class="border border-slate-400 px-6 py-3 rounded-2xl bg-slate-200"
            >
              <UAccordion :items="itemsHistory" />
            </div>
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

          <div class="mt-4 rounded-xl p-6">
            <div class="px-6 py-3 border border-slate-300 rounded-2xl">
              <UAccordion :items="itemsCare" collapsible v-model="active" />
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
import TreatmentCard from "@/components/ui/TreatmentCard.vue";
import type { AccordionItem } from "@nuxt/ui";
import HeaderNavigation from "~/components/navigation/HeaderNavigation.vue";

const itemsHistory: AccordionItem[] = [
  {
    label: "2017 - Primer Trasplante de Médula Ósea Autólogo en Bolivia",
    icon: "i-lucide-heart-pulse",
    content:
      "Fuimos la primera clínica en Bolivia en realizar un trasplante de médula ósea autólogo.",
  },
  {
    label:
      "2023 - Primer Trasplante de Médula Ósea Alogénico en Adultos en Bolivia",
    icon: "i-lucide-heart",
    content:
      "Realizamos con éxito el primer trasplante de médula ósea alogénico en pacientes adultos en Bolivia.",
  },
];

const itemsCare = [
  {
    label: "Acceso a Tratamientos Innovadores",
    icon: "i-lucide-flask-conical",
    content: `
Como centro médico de referencia, ofrecemos una amplia gama de tratamientos para enfermedades oncohematológicas. Participamos en estudios internacionales como COBALT, que demostró el uso de sangre de cordón umbilical como fuente de células madre para trasplantes. Además, fuimos pioneros en EE. UU. en aplicar terapias CAR-T para tratar DLBCL y LLA.
    `,
  },
  {
    label: "Enfoque Colaborativo",
    icon: "i-lucide-users",
    content: `
Nuestro equipo está conformado por especialistas en oncología, oncohematología, secuenciación genómica y enfermedades infecciosas. Todos trabajan en conjunto para diseñar planes personalizados que optimizan los resultados para cada paciente.
    `,
  },
  {
    label: "Cuidado Integral",
    icon: "i-lucide-hospital",
    content: `
Acompañamos al paciente desde el diagnóstico hasta la recuperación post-trasplante. Contamos con hospitalización tradicional y también atención en nuestro Day Hospital, que brinda tratamiento de alta complejidad en un entorno ambulatorio.
    `,
  },
] satisfies AccordionItem[];

const active = ref("0");

// Note: This is for demonstration purposes only. Don't do this at home.
onMounted(() => {
  setInterval(() => {
    active.value = String((Number(active.value) + 1) % itemsCare.length);
  }, 8000);
});
</script>
