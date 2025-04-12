<template>
  <!-- Related Treatments -->
  <div class="container mx-auto px-8 md:px-6">
    <div>
      <h2
        class="mb-8 text-2xl font-bold text-slate-800 flex justify-between items-center"
      >
        Otros tratamientos relacionados
      </h2>
    </div>
    <div class="grid gap-8 md:grid-cols-3">
      <TreatmentCard
        title="Inmunoterapia"
        description="Tratamiento que utiliza el sistema inmunitario para combatir el cáncer."
        image="/treatments/inmunoterapia.jpg"
        link="/tratamientos/inmunoterapia"
        time="24 minutos"
      />
      <TreatmentCard
        title="Quimioterapia"
        description="Uso de fármacos para destruir las células cancerosas."
        image="/treatments/quimio.jpg"
        link="/tratamientos/quimioterapia"
        time="24 minutos"
      />
      <TreatmentCard
        title="Quimioterapia"
        description="Uso de fármacos para destruir las células cancerosas."
        image="/treatments/quimio.jpg"
        link="/tratamientos/quimioterapia"
        time="24 minutos"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import TreatmentCard from "../ui/TreatmentCard.vue";

const items = [{}];
</script>
