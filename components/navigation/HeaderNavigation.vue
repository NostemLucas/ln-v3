<template>
  <div
    class="bg-primary-500 bg-linear-120 from-primary-400 via-primary-500 to-primary-900 h-80"
  >
    <div
      class="flex flex-col justify-center items-start h-full container mx-auto px-4 md:p-0 gap-4"
    >
      <Breadcrumb />
      <h1
        class="mb-4 text-3xl font-bold text-slate-100 md:text-4xl lg:text-5xl text-shadow-xs text-shadow-black font-horsham tracking-wider"
      >
        {{ title }}
      </h1>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, facere?
      Nam quia accusamus placeat, ipsam ex voluptas adipisci quis nihil culpa
      veniam? Suscipit officiis, exercitationem harum corporis ratione est
      quibusdam. Deleniti illum sequi magni eum sapiente nulla esse
      exercitationem perspiciatis reiciendis incidunt placeat, temporibus
      voluptatum optio laborum inventore maiores totam ex saepe, eaque sunt
      aspernatur eius officia. A, hic quidem! Excepturi eum error debitis
      veritatis ratione. Voluptate repellendus porro, vitae explicabo, quis
      voluptatum accusantium sit ducimus eaque sint maiores quod quam fuga
      voluptates reiciendis quasi! Incidunt aliquam quos ducimus porro? Ipsa
      pariatur repellendus quaerat, atque reprehenderit delectus est vero fugit
      ad repudiandae suscipit nihil debitis esse autem nam quis sequi ut
      provident unde doloremque mollitia? Provident autem iusto quasi eius?
    </div>
  </div>
</template>

<script lang="ts" setup>
import Breadcrumb from "@/components/navigation/Breadcumb.vue";

defineProps<{
  title: string;
}>();
</script>
