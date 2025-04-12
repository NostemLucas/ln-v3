<template>
  <div
    class="bg-primary-500 bg-linear-120 from-primary-400 via-primary-500 to-primary-900 h-80"
  >
    <div
      class="flex flex-col justify-center items-start h-full container mx-auto px-4 md:p-0 gap-4"
    >
      <!-- Breadcrumb -->
      <Breadcrumb />
      <!-- Treatment Header -->
      <UBadge
        variant="solid"
        size="xl"
        label="Tratamiento Especializado"
        class="rounded-full bg-teal-200 font-semibold text-slate-800 my-3"
      />
      <h1
        class="mb-4 text-3xl font-bold text-slate-100 md:text-4xl lg:text-5xl text-shadow-xs text-shadow-black font-horsham tracking-wider"
      >
        {{ title }}
      </h1>
      <div class="flex justify-start items-center gap-2">
        <UButton
          class="text-slate-50 w-auto"
          variant="link"
          size="md"
          to="/citas"
          label="Solicita una cita"
          icon="lucide:calendar"
          :ui="{
            label: 'mt-1 tracking-wide ',
            base: 'hover:text-emerald-200',
          }"
        />
        <UButton
          class="text-slate-50 w-auto"
          variant="link"
          size="md"
          label="Nuestros Profesionales"
          icon="lucide:user"
          :ui="{
            label: 'mt-1 tracking-wide ',
            base: 'hover:text-emerald-200',
          }"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Breadcrumb from "@/components/navigation/Breadcumb.vue";

defineProps<{
  title: string;
}>();
</script>
