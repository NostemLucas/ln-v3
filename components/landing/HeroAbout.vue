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
            class="absolute h-45 left-[15%] md:left-[20%] lg:left-[10%]"
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
              'absolute rounded-2xl shadow-2xl shadow-currentbg-cover bg-center bg-no-repeat z-20  aspect-square',
              'top-[30%]',
              'w-[65%] md:w-[48%] h-[35%]',
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
        <div class="text-secondary py-3 font-bold tracking-wide md:py-5">
          ¿Quiénes Somos?
        </div>
        <h2
          class="mt-2 mb-4 text-3xl font-medium text-slate-800 sm:text-4xl md:text-5xl"
        >
          Acerca de <span class="text-primary-300"> Nosotros</span>
        </h2>
        <div class="mb-4 h-1 w-20 rounded-full bg-primary-300 md:mb-6" />
        <p class="mb-4 text-gray-500">
          En ONCOCLINIC, nos esforzamos por ser líderes en la lucha contra el
          cáncer, promoviendo la investigación, la educación y la conciencia
          sobre la enfermedad. Nuestro compromiso es proporcionar esperanza,
          compasión y excelencia en el tratamiento del cáncer.
        </p>

        <p class="mb-6 text-gray-500">
          Nuestro centro se propone alcanzar la excelencia en el campo de la
          prevención, diagnóstico y cura de tumores a través de la investigación
          clínico-científica e innovación en gestión, dirigida a la calidad del
          servicio para nuestros pacientes.
        </p>

        <div class="flex flex-wrap items-center gap-4">
          <UButton
            class="rounded-full px-10 py-4 font-black ring-4 ring-primary-500"
            to="/nosotros"
            trailing-icon="i-lucide-arrow-right"
            variant="outline"
          >
            Ver Más
          </UButton>
          <NuxtLink
            href="tel:+59174846264"
            class="inline-flex items-center tracking-widest text-slate-700"
          >
            <Icon
              name="lucide:phone-call"
              size="2rem"
              class="mr-2 h-6 w-6 text-red-500 md:h-7 md:w-7"
            />
            <span class="font-bold mr-2">(+591)</span> 74846264
          </NuxtLink>
        </div>

        <!-- Services section -->
        <div class="mt-8 grid grid-cols-2 gap-4 md:mt-12 md:grid-cols-4">
          <div class="flex flex-col items-center text-center">
            <div
              class="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 p-3 md:h-20 md:w-20"
            >
              <Icon name="lucide:pill" size="2.4rem" class="text-primary-500" />
            </div>
            <div class="text-sm font-semibold md:text-base">
              Medicina y Atención Sanitaria
            </div>
          </div>

          <div class="flex flex-col items-center text-center">
            <div
              class="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 p-3 md:h-20 md:w-20"
            >
              <Icon
                name="lucide:stethoscope"
                size="2.4rem"
                class="text-primary-600"
              />
            </div>
            <div class="text-sm font-semibold md:text-base">
              Doctores y Enfermería
            </div>
          </div>

          <div class="flex flex-col items-center text-center text-primary-500">
            <div
              class="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 p-3 md:h-20 md:w-20"
            >
              <Icon name="lucide:bed" size="2.4rem" />
            </div>
            <div class="text-sm font-semibold md:text-base tracking-wide">
              Servicio de Internación
            </div>
          </div>

          <div class="flex flex-col items-center text-center">
            <div
              class="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 p-3 md:h-20 md:w-20"
            >
              <Icon
                name="lucide:microscope"
                size="2.4rem"
                class="text-primary-500"
              />
            </div>
            <div class="text-sm font-semibold md:text-base">
              Servicio de Laboratorios
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>
