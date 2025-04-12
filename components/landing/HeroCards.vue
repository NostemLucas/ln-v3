<template>
  <div class="container mx-auto max-w-7xl px-4 py-12">
    <!-- Primera Tarjeta -->
    <div
      class="mb-16 flex flex-col items-stretch gap-8 overflow-hidden lg:flex-row"
    >
      <div class="flex flex-col justify-center p-8 lg:w-3/5 lg:p-10">
        <h2
          class="mb-4 text-3xl leading-tight font-bold text-gray-900 lg:text-4xl"
        >
          La recuperación
          <span class="text-primary-400">empieza aquí</span>
        </h2>
        <div class="mb-6 h-1 w-20 rounded-full bg-primary-300" />

        <p class="mb-2 font-medium text-gray-700">
          El éxito del tratamiento comienza con un diagnóstico preciso
        </p>
        <p class="mb-6 text-gray-700">
          En Oncoclinic Bolivia, combinamos experiencia médica con tecnología de
          vanguardia para detectar y tratar el cáncer de manera oportuna.
          Nuestro equipo multidisciplinario brinda una atención integral y
          personalizada para cada paciente
        </p>

        <div
          class="mb-6 rounded-br-lg rounded-tr-lg border-l-4 border-primary-500 bg-blue-50 p-4"
        >
          <p class="mb-2 font-semibold text-gray-700">
            Pioneros en el Trasplante de Médula Osea en Bolivia
          </p>
          <p class="mb-2 text-gray-600">
            Oncoclinic marcó un hito en la historia de la medicina boliviana al
            realizar por primera vez el trasplante autólogo en 2017 y el
            trasplante alogénico en adultos en 2023
            <!-- 	<span class="font-medium italic">..</span> -->
            .
          </p>
          <NuxtLink
            to="/tratamientos"
            class="inline-flex items-center font-medium text-primary-600 hover:underline"
          >
            Conozca más sobre el trasplante de médula ósea
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="ml-1 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </NuxtLink>
        </div>
        <div>
          <UButton
            variant="outline"
            size="xl"
            class="rounded-full py-4 px-6 hover:bg-primary-700 ring-2 transition-colors duration-500 hover:text-white group"
            label="¿Por qué elegir a Oncoclinic?"
            trailing-icon="i-lucide-arrow-right"
            :ui="{
              trailingIcon:
                'group-hover:translate-x-2 transition-transform duration-500',
            }"
          />
        </div>
      </div>
      <div class="relative overflow-hidden lg:w-2/5">
        <div
          class="absolute inset-0 z-10 rounded-lg bg-gradient-to-r from-blue-500/40 via-blue-300/40 to-transparent"
        />
        <NuxtImg
          src="/landing/close-up.jpg"
          alt="Doctor atendiendo a un paciente"
          class="h-full max-h-[80vh] w-full rounded-lg object-cover object-center"
        />
      </div>
    </div>

    <!-- Segunda Tarjeta -->
    <div
      class="flex flex-col-reverse items-stretch gap-8 overflow-hidden lg:flex-row"
    >
      <div class="relative overflow-hidden lg:w-2/5">
        <div
          class="absolute inset-0 z-10 rounded-lg bg-gradient-to-l from-blue-500/20 to-transparent"
        />
        <NuxtImg
          src="/landing/happy-mature.jpg"
          alt="Madre con bebé"
          class="h-full max-h-[80vh] w-full rounded-lg object-cover object-center"
        />
      </div>
      <div class="flex flex-col justify-center p-8 lg:w-3/5 lg:p-10">
        <h2
          class="mb-4 text-3xl leading-tight font-bold text-gray-900 lg:text-4xl"
        >
          El futuro de la oncología pasa por la
          <span class="text-primary-400"> medicina de precisión.</span>
        </h2>
        <div class="mb-6 h-1 w-20 rounded-full bg-primary-700" />

        <p class="mb-6 text-gray-700">
          Es una forma moderna de tratar el cáncer. En lugar de usar el mismo
          tratamiento para todos, estudiamos las características específicas del
          tumor de cada persona, como su genética, para elegir el tratamiento
          más adecuado.
        </p>

        <div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div class="flex items-start">
            <div class="mr-3 rounded-full bg-blue-100 p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-primary-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 class="font-bold tracking-wider text-gray-600">
                Tratamiento personalizado
              </h3>
              <p class="text-sm text-gray-600">
                Nuestros tratamientos se adaptan a ti y a tu tipo de cáncer.
              </p>
            </div>
          </div>
          <div class="flex items-start">
            <div class="mr-3 rounded-full bg-blue-100 p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-primary-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <div>
              <h3 class="font-bold tracking-wide text-gray-600">
                Diagnóstico molecular avanzado
              </h3>
              <p class="text-sm text-gray-600">
                Se utilizan pruebas como la secuenciación genética para
                identificar alteraciones específicas en el cáncer
              </p>
            </div>
          </div>
        </div>
        <div>
          <UButton
            variant="solid"
            size="xl"
            to="/tratamientos"
            class="rounded-full py-4 px-6 ring-2 transition-colors duration-500 group"
            label="Secuenciación Genética"
            trailing-icon="i-lucide-arrow-right"
            :ui="{
              trailingIcon:
                'group-hover:translate-x-2 transition-transform duration-500',
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>
