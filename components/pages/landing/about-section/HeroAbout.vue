<template>
  <section class="container mx-auto max-w-7xl px-8 py-28 overflow-hidden">
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <!-- Image section with improved responsive behavior -->
      <div
        class="relative order-2 w-full h-[600px] md:aspect-square lg:order-1"
      >
        <!-- Image container with improved responsive sizing -->
        <div class="relative mx-auto h-full w-full">
          <NuxtImg
            src="landing/flecha.png"
            draggable="false"
            alt="Award trophy"
            class="absolute h-45 left-[10%] md:left-[20%] lg:left-[10%]"
          />

          <NuxtImg
            src="landing/premio2.png"
            draggable="false"
            alt="Award trophy"
            :class="[
              'absolute rounded-2xl shadow-xl shadow-current z-30 bg-cover  bg-center bg-no-repeat',
              'top-10 right-0',
              'w-[50%] md:w-[48%] h-[35%]',
            ]"
          />

          <NuxtImg
            src="landing/principal.jpg"
            draggable="false"
            alt="Award trophy"
            :class="[
              'absolute rounded-2xl shadow-2xl shadow-current bg-cover bg-center bg-no-repeat z-20 aspect-square',
              'top-[30%]',
              'w-[65%] md:w-[58%] h-[35%]',
            ]"
          />

          <NuxtImg
            src="landing/premio1.png"
            draggable="false"
            alt="Clinic building"
            :class="[
              'absolute rounded-2xl aspect-video shadow-xl shadow-current object-cover z.10',
              'right-0 md:right-10 bottom-10',
              'w-[66%] h-[40%] ',
            ]"
          />
        </div>
      </div>

      <!-- Right side with content -->
      <div class="order-1 flex flex-col justify-center lg:order-2">
        <div class="text-primary-500 py-3 font-bold tracking-wide md:py-2">
          ¿Quiénes Somos?
        </div>
        <h2
          class="mt-2 mb-4 text-3xl font-medium text-slate-800 sm:text-4xl md:text-5xl"
        >
          Acerca de <span class="text-primary-300"> Nosotros</span>
        </h2>
        <div class="mb-4 h-1 w-20 rounded-full bg-primary-300 md:mb-6" />
        <p class="mb-4 text-gray-500">
          En
          <span class="text-primary-400 uppercase"> Oncoclinic </span>trabajamos
          con un firme compromiso para convertirnos en referentes en la lucha
          contra el cáncer, promoviendo la investigación, la educación y la
          concientización sobre esta enfermedad. Buscamos la excelencia con
          humanidad, guiados por la empatía, el rigor científico y una atención
          centrada en las necesidades únicas de cada paciente.
        </p>

        <p class="mb-6 text-gray-500">
          Nuestra misión es alcanzar los más altos estándares en prevención,
          diagnóstico y tratamiento oncológico, apoyándonos en la investigación
          clínico-científica y la innovación en gestión. Todo ello con un único
          objetivo: ofrecer a nuestros pacientes una atención de calidad
          excepcional.
        </p>

        <div class="flex flex-wrap items-center gap-4">
          <UButton
            class="rounded-full px-10 py-4 font-black ring-2 hover:bg-primary-500 hover:text-white transition-colors duration-500 ease-in-out"
            to="/nosotros"
            trailing-icon="i-lucide-arrow-right"
            variant="outline"
          >
            Ver Más
          </UButton>
          <UButton
            variant="link"
            type="button"
            size="xl"
            href="tel:+59174846264"
            class="tracking-widest text-slate-700 text-2xl"
            target="_blank"
            aria-label="Llamar a la clínica"
            icon="lucide:phone-call"
            label="(+591) 74846264"
            :ui="{
              leadingIcon: 'text-red-600',
              label: 'text-base',
            }"
          />
        </div>

        <!-- Seccion de Servicios -->
        <div class="mt-8 grid grid-cols-2 gap-4 md:mt-10 md:grid-cols-4">
          <div
            v-for="especiality in especialities"
            :key="especiality.title + 'item'"
            class="flex flex-col items-center text-center"
          >
            <div
              class="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 p-3 md:h-20 md:w-20"
            >
              <Icon
                :name="especiality.icon"
                size="2.4rem"
                class="text-primary-400"
              />
            </div>
            <div class="text-sm font-semibold md:text-base">
              {{ especiality.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const especialities = [
  {
    title: "Medicina y Atención Sanitaria",
    icon: "lucide:pill",
  },
  {
    title: "Doctores y Enfermería",
    icon: "lucide:stethoscope",
  },
  {
    title: "Servicio de Internación",
    icon: "lucide:bed",
  },
  {
    title: "Servicio de Laboratorios",
    icon: "lucide:microscope",
  },
];
</script>
