<template>
  <section class="container mx-auto max-w-7xl px-4 py-12 overflow-hidden">
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <!-- Image section with improved responsive behavior -->
      <div
        class="relative order-2 w-full h-[600px] md:aspect-square lg:order-1"
      >
        <!-- Image container with improved responsive sizing -->
        <div class="relative mx-auto h-full w-full max-w-[600px]">
          <NuxtImg
            src="landing/flecha.png"
            draggable="false"
            alt="Award trophy"
            :class="['absolute h-60 ']"
          />

          <NuxtImg
            src="landing/premio2.png"
            draggable="false"
            alt="Award trophy"
            :class="[
              'absolute',
              'rounded-2xl',
              'z-30 object-cover ',
              'shadow-xl shadow-current right-0  xl:max-w-[400px]',
            ]"
          />

          <NuxtImg
            src="landing/premio1.png"
            draggable="false"
            alt="Award trophy"
            :class="[
              'absolute z-20 lg:max-w-[400px] top-[40%]',
              'rounded-2xl object-cover shadow-xl shadow-current',
              'transition-all duration-300',
            ]"
          />

          <NuxtImg
            src="landing/principal.jpg"
            draggable="false"
            alt="Clinic building"
            :class="[
              'absolute right-0 bottom-0 z-10 aspect-video max-w-[400px]',
              'rounded-xl object-cover shadow-lg',
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
          Acerca De Nosotros
        </h2>
        <div class="mb-4 h-1 w-20 rounded-full bg-blue-600 md:mb-6" />
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
            class="rounded-full ring-4 px-10 py-4 font-black"
            to=""
            trailing-icon="i-lucide-phone-call"
            variant="outline"
          >
            Ver Más
          </UButton>
          <a
            href="tel:+59174846264"
            class="inline-flex items-center tracking-widest text-slate-700"
          >
            <PhoneCallIcon class="mr-2 h-6 w-6 text-red-500 md:h-7 md:w-7" />
            (+591) 74846264
          </a>
        </div>

        <!-- Services section -->
        <div class="mt-8 grid grid-cols-2 gap-4 md:mt-12 md:grid-cols-4">
          <div class="flex flex-col items-center text-center">
            <div
              class="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 p-3 md:h-20 md:w-20"
            >
              <NuxtImg
                src="medicine-icon.png"
                alt="Hospitalisation icon"
                draggable="false"
              />
            </div>
            <div class="text-sm font-semibold md:text-base">
              Medicina y Atención Sanitaria
            </div>
          </div>

          <div class="flex flex-col items-center text-center">
            <div
              class="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 p-3 md:h-20 md:w-20"
            >
              <NuxtImg
                src="stetoscop-icon.png"
                alt="Hospitalisation icon"
                draggable="false"
              />
            </div>
            <div class="text-sm font-semibold md:text-base">
              Doctores y Enfermería
            </div>
          </div>

          <div class="flex flex-col items-center text-center">
            <div
              class="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 p-3 md:h-20 md:w-20"
            >
              <NuxtImg
                src="hospitalisation-icon.png"
                alt="Hospitalisation icon"
              />
            </div>
            <div class="text-sm font-semibold md:text-base">
              Servicio de Internación
            </div>
          </div>

          <div class="flex flex-col items-center text-center">
            <div
              class="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 p-3 md:h-20 md:w-20"
            >
              <NuxtImg src="laboratory-icon.png" alt="Laboratory icon" />
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
