<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto max-w-7xl px-4 py-6">
      <!-- Título principal con diseño mejorado -->
      <div class="mb-8 text-center">
        <h1 class="mb-2 text-3xl font-bold text-blue-900">
          CENTRO MÉDICO ESPECIALIZADO
        </h1>
        <p class="text-blue-700">
          Obrajes, Avenida Costanería entre calles 5 y 6 Nro 71.
          <br />
          La Paz – Bolivia
        </p>
      </div>

      <!-- Contenido principal: Tarjetas y Mapa -->
      <div class="mb-10 flex flex-col gap-6 lg:flex-row">
        <!-- Lista de ubicaciones -->
        <div class="w-full lg:w-2/5 xl:w-1/3">
          <div
            v-for="(location, index) in locations"
            :key="index"
            class="relative mb-4 cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg"
            @click="selectLocation(location)"
            :class="{
              'scale-[1.02] transform border-2 border-blue-500 shadow-xl':
                selectedLocation && selectedLocation.id === location.id,
            }"
          >
            <div class="relative">
              <img
                :src="location.image"
                :alt="location.title"
                class="h-48 w-full object-cover"
              />
              <!-- Overlay con gradiente azul -->
              <div
                class="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-blue-800/20 to-transparent"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-blue-900/70 via-transparent to-transparent"
              />

              <div class="absolute right-0 bottom-0 left-0 p-4">
                <h3 class="text-lg font-bold text-white">
                  {{ location.title }}
                </h3>
              </div>

              <!-- Badge de selección mejorado -->
              <div
                v-if="selectedLocation && selectedLocation.id === location.id"
                class="absolute top-3 right-3 flex items-center rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="mr-1 h-3 w-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Seleccionado
              </div>
            </div>

            <div class="p-4">
              <p class="text-gray-600">{{ location.address }}</p>
              <p class="text-gray-600">{{ location.city }}</p>
              <p class="mt-2 flex items-center font-bold text-blue-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="mr-1 h-4 w-4 text-blue-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                  ></path>
                </svg>
                {{ location.phone }}
              </p>
              <div class="mt-3 flex flex-wrap gap-2">
                <!-- WhatsApp - Diseño mejorado -->
                <UButton
                  :href="'https://wa.me/' + location.whatsapp"
                  target="_blank"
                  variant="outline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="mr-1 h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                    ></path>
                  </svg>
                  WhatsApp
                </UButton>
                <!-- Chat - Diseño mejorado -->
                <UButton
                  href="#"
                  variant="outline"
                  @click.prevent="openChat(location)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="mr-1 h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                    ></path>
                  </svg>
                  Chat
                </UButton>
                <!-- Google Maps - Diseño mejorado -->
                <UButton
                  variant="outline"
                  :href="getGoogleMapsUrl(location)"
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="mr-1 h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                    ></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  Google Maps
                </UButton>
              </div>
            </div>
          </div>
        </div>

        <!-- Mapa -->
        <div
          class="h-[689px] w-full overflow-hidden rounded-lg bg-white shadow-md lg:w-3/5 xl:w-2/3"
        >
          <div class="relative h-full" ref="mapContainer">
            <div
              id="map"
              class="h-full w-full"
              :class="mapType === 'map' ? 'grayscale-map' : ''"
            />

            <!-- Controles del mapa superpuestos - Diseño mejorado -->
            <div class="absolute top-4 left-4 z-10 flex flex-col space-y-2">
              <!-- Tipo de mapa -->
              <div
                class="overflow-hidden rounded-lg bg-white/90 shadow-md backdrop-blur-sm"
              >
                <button
                  :class="
                    mapType === 'map'
                      ? 'bg-blue-700 text-white'
                      : 'text-gray-700 hover:bg-blue-50'
                  "
                  @click="setMapType('map')"
                  class="flex w-full items-center px-3 py-2 text-sm font-medium transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="mr-2 h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polygon
                      points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"
                    ></polygon>
                    <line x1="8" y1="2" x2="8" y2="18"></line>
                    <line x1="16" y1="6" x2="16" y2="22"></line>
                  </svg>
                  Mapa
                </button>
                <button
                  @click="setMapType('satellite')"
                  class="flex items-center border-t border-gray-200 px-3 py-2 text-sm font-medium transition-colors"
                  :class="
                    mapType === 'satellite'
                      ? 'bg-blue-700 text-white'
                      : 'text-gray-700 hover:bg-blue-50'
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="mr-2 h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path
                      d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                    ></path>
                  </svg>
                  Satélite
                </button>
              </div>
            </div>

            <!-- Controles de zoom y pantalla completa - Diseño mejorado -->
            <div class="absolute top-4 right-4 z-10">
              <div
                class="overflow-hidden rounded-lg bg-white/90 shadow-md backdrop-blur-sm"
              >
                <button
                  @click="zoomIn"
                  class="block p-2 text-blue-700 transition-colors hover:bg-blue-50"
                  title="Acercar"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="11" y1="8" x2="11" y2="14"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                  </svg>
                </button>
                <button
                  @click="zoomOut"
                  class="block border-t border-gray-200 p-2 text-blue-700 transition-colors hover:bg-blue-50"
                  title="Alejar"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                  </svg>
                </button>
                <button
                  @click="toggleFullscreen"
                  class="block border-t border-gray-200 p-2 text-blue-700 transition-colors hover:bg-blue-50"
                  title="Pantalla completa"
                >
                  <svg
                    v-if="!isFullscreen"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"
                    ></path>
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Popup de información - Diseño mejorado -->
            <div
              v-if="showPopup && selectedLocation"
              class="absolute z-10 max-w-xs rounded-lg bg-white/95 p-4 shadow-lg backdrop-blur-sm"
              :style="popupStyle"
            >
              <div class="mb-2 flex items-start justify-between">
                <h3 class="text-lg font-bold text-blue-800">
                  {{ selectedLocation.title }}
                </h3>
                <button
                  @click="showPopup = false"
                  class="-mt-1 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <p class="mb-2 text-sm text-gray-700">
                {{ selectedLocation.address }}
              </p>
              <p
                class="mb-3 flex items-center text-sm font-medium text-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="mr-1 h-4 w-4 text-blue-700"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                  ></path>
                </svg>
                {{ selectedLocation.phone }}
              </p>
              <div class="flex justify-between space-x-2">
                <a
                  :href="'https://wa.me/' + selectedLocation.whatsapp"
                  target="_blank"
                  class="flex items-center rounded-md bg-green-50 px-2 py-1 text-xs text-green-700 shadow-sm transition-all hover:bg-green-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="mr-1 h-3 w-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                    ></path>
                  </svg>
                  WhatsApp
                </a>
                <a
                  href="#"
                  @click.prevent="openChat(selectedLocation)"
                  class="flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs text-blue-700 shadow-sm transition-all hover:bg-blue-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="mr-1 h-3 w-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                    ></path>
                  </svg>
                  Chat
                </a>
                <a
                  :href="getGoogleMapsUrl(selectedLocation)"
                  target="_blank"
                  class="flex items-center rounded-md bg-red-50 px-2 py-1 text-xs text-red-700 shadow-sm transition-all hover:bg-red-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="mr-1 h-3 w-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                    ></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sección de información mejorada con diseño profesional -->
      <div v-if="selectedLocation" class="mb-10">
        <div class="overflow-hidden rounded-lg bg-white shadow-lg">
          <!-- Cabecera con diseño mejorado -->
          <div
            class="relative bg-gradient-to-r from-blue-800 to-blue-600 px-6 py-5"
          >
            <!-- Elementos decorativos -->
            <div class="absolute inset-0 overflow-hidden opacity-20">
              <div
                class="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white"
              ></div>
              <div
                class="absolute right-1/4 top-1/3 h-16 w-16 rounded-full bg-white"
              ></div>
              <div
                class="absolute right-1/3 top-1/2 h-24 w-24 rounded-full bg-white"
              ></div>
            </div>

            <div class="relative flex items-center justify-between">
              <div>
                <h2 class="text-2xl font-bold text-white">
                  {{ selectedLocation.title }}
                </h2>
                <p class="mt-1 text-blue-100">
                  Transformando el cuidado de tu salud
                </p>
              </div>
              <a
                :href="getGoogleMapsUrl(selectedLocation)"
                target="_blank"
                class="flex items-center rounded-md bg-white/10 px-3 py-1.5 text-sm text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="mr-1.5 h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                  ></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Ver en Google Maps
              </a>
            </div>
          </div>

          <div class="p-6">
            <!-- Información principal con diseño mejorado -->
            <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
              <!-- Ubicación -->
              <div class="space-y-4">
                <h3
                  class="flex items-center border-b border-blue-100 pb-2 text-lg font-semibold text-blue-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="mr-2 h-5 w-5 text-blue-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                    ></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  Ubicación
                </h3>
                <div class="rounded-lg bg-blue-50 p-4 shadow-sm">
                  <p class="text-gray-700">{{ selectedLocation.address }}</p>
                  <p class="text-gray-700">{{ selectedLocation.city }}</p>
                  <p class="mt-2 flex items-center font-medium text-blue-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="mr-2 h-4 w-4 text-blue-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path
                        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                      ></path>
                    </svg>
                    {{ selectedLocation.phone }}
                  </p>
                </div>
              </div>

              <!-- Transporte -->
              <div class="space-y-4">
                <h3
                  class="flex items-center border-b border-blue-100 pb-2 text-lg font-semibold text-blue-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="mr-2 h-5 w-5 text-blue-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="1" y="3" width="15" height="13"></rect>
                    <polygon
                      points="16 8 20 8 23 11 23 16 16 16 16 8"
                    ></polygon>
                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                  </svg>
                  Transporte
                </h3>
                <div class="rounded-lg bg-blue-50 p-4 shadow-sm">
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="(bus, index) in selectedLocation.buses"
                      :key="index"
                      class="inline-block rounded-full bg-white px-3 py-1 text-sm font-medium text-blue-700 shadow-sm"
                    >
                      {{ bus }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Horarios -->
              <div class="space-y-4">
                <h3
                  class="flex items-center border-b border-blue-100 pb-2 text-lg font-semibold text-blue-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="mr-2 h-5 w-5 text-blue-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  Horarios
                </h3>
                <div class="rounded-lg bg-blue-50 p-4 shadow-sm">
                  <div class="space-y-2">
                    <div class="flex items-center justify-between">
                      <span class="text-gray-700">Lunes a Viernes</span>
                      <span class="font-medium text-blue-800">
                        {{ selectedLocation.hours.weekdays }}
                      </span>
                    </div>
                    <div class="flex items-center justify-between">
                      <span class="text-gray-700">Sábados</span>
                      <span class="font-medium text-blue-800">
                        {{ selectedLocation.hours.saturday }}
                      </span>
                    </div>
                    <div class="flex items-center justify-between">
                      <span class="text-gray-700">Domingos</span>
                      <span class="font-medium text-blue-800">
                        {{ selectedLocation.hours.sunday }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Servicios disponibles - Diseño mejorado -->
            <div class="mt-8">
              <h3
                class="flex items-center border-b border-blue-100 pb-2 text-lg font-semibold text-blue-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="mr-2 h-5 w-5 text-blue-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
                Servicios
              </h3>
              <div class="mt-4 rounded-lg bg-blue-50 p-4 shadow-sm">
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="(service, index) in selectedLocation.services"
                    :key="index"
                    class="inline-block rounded-full border border-blue-200 bg-white px-4 py-1.5 text-sm font-medium text-blue-700 shadow-sm"
                  >
                    {{ service }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Sección adicional: La recuperación empieza aquí - Diseño mejorado -->
            <div
              class="mt-8 rounded-lg bg-gradient-to-r from-blue-800 to-blue-600 p-6 text-white shadow-md"
            >
              <h3 class="mb-3 text-xl font-bold">
                La recuperación empieza aquí
              </h3>
              <p class="mb-4 text-blue-100">
                En {{ selectedLocation.title }}, combinamos experiencia médica
                con tecnología de vanguardia para ofrecerte la mejor atención
                personalizada para cada paciente.
              </p>
              <div class="flex flex-wrap gap-3">
                <a
                  href="#"
                  class="rounded-md bg-white px-4 py-2 text-sm font-medium text-blue-800 shadow-sm transition-colors hover:bg-blue-50"
                >
                  Agendar una cita
                </a>
                <a
                  href="#"
                  class="rounded-md bg-blue-500 bg-opacity-30 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-opacity-40"
                >
                  Conocer más
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal de chat - Diseño mejorado -->
      <div
        v-if="showChatModal && chatLocation"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      >
        <div class="mx-4 w-full max-w-md rounded-lg bg-white shadow-xl">
          <div
            class="flex items-center justify-between rounded-t-lg bg-blue-700 px-4 py-3 text-white"
          >
            <h3 class="font-bold">Chat con {{ chatLocation.title }}</h3>
            <button
              @click="showChatModal = false"
              class="text-white hover:text-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div class="h-64 overflow-y-auto bg-gray-50 p-4">
            <div class="flex flex-col space-y-2">
              <div
                class="max-w-xs self-start rounded-lg rounded-tl-none bg-blue-100 p-2 text-blue-800"
              >
                Hola, ¿en qué podemos ayudarte?
              </div>
              <div
                v-for="(message, index) in chatMessages"
                :key="index"
                :class="[
                  'max-w-xs rounded-lg p-2',
                  message.isUser
                    ? 'self-end rounded-tr-none bg-blue-600 text-white'
                    : 'self-start rounded-tl-none bg-blue-100 text-blue-800',
                ]"
              >
                {{ message.text }}
              </div>
            </div>
          </div>
          <div class="border-t p-4">
            <div class="flex">
              <input
                v-model="chatInput"
                type="text"
                placeholder="Escribe tu mensaje..."
                class="flex-1 rounded-l-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                @keyup.enter="sendChatMessage"
              />
              <button
                @click="sendChatMessage"
                class="rounded-r-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import { fromLonLat } from "ol/proj";

// Definición de tipos
interface LocationHours {
  weekdays: string;
  saturday: string;
  sunday: string;
}

interface Location {
  id: number;
  title: string;
  address: string;
  city: string;
  phone: string;
  whatsapp: string;
  image: string;
  coordinates: [number, number]; // [longitud, latitud]
  buses: string[];
  hours: LocationHours;
  services: string[];
}

interface PopupPosition {
  x: number;
  y: number;
}

interface ChatMessage {
  text: string;
  isUser: boolean;
}

type MapType = "map" | "satellite";

// Referencias para el DOM
const mapContainer = ref<HTMLElement | null>(null);

// Estado para el popup y tipo de mapa
const showPopup = ref<boolean>(false);
const popupPosition = ref<PopupPosition>({ x: 0, y: 0 });
const selectedLocation = ref<Location | null>(null);
const mapType = ref<MapType>("map");
const isFullscreen = ref<boolean>(false);

// Estado para el chat
const showChatModal = ref<boolean>(false);
const chatLocation = ref<Location | null>(null);
const chatMessages = ref<ChatMessage[]>([]);
const chatInput = ref<string>("");

// Variables para OpenLayers
let map: Map | null = null;
let osmLayer: TileLayer<OSM> | null = null;
let satelliteLayer: TileLayer<XYZ> | null = null;

// Estilo para el popup
const popupStyle = computed(() => {
  return {
    left: `${popupPosition.value.x}px`,
    top: `${popupPosition.value.y}px`,
    transform: "translate(-50%, -100%) translateY(-10px)",
  };
});

// Función para generar URL de Google Maps
const getGoogleMapsUrl = (location: Location): string => {
  const lat = location.coordinates[1];
  const lng = location.coordinates[0];
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
};

// Datos de ubicaciones (usando las coordenadas proporcionadas)
const locations = ref<Location[]>([
  {
    id: 1,
    title: "Oncoclinic Obrajes - Sede Central",
    address: "Avenida Costanería entre calles 5 y 6 Nro 71",
    city: "La Paz, Bolivia",
    phone: "+591 2 2222-3333",
    whatsapp: "59122223333",
    image: "/locations/sede-obrajes.jpg",
    coordinates: [-68.11105322436397, -16.52711826894523],
    buses: ["214", "245", "TELEFÉRICO NARANJA", "TELEFÉRICO ROJO"],
    hours: {
      weekdays: "08:00 a 18:00",
      saturday: "08:00 a 12:00",
      sunday: "Cerrado",
    },
    services: [
      "Oncología",
      "Radiología",
      "Laboratorio",
      "Farmacia",
      "Consulta Externa",
    ],
  },
  {
    id: 2,
    title: "Oncoclinic Sopocachi",
    address: "Av. 6 de Agosto Nº2255",
    city: "La Paz, Bolivia",
    phone: "+591 2 2444-5555",
    whatsapp: "59124445555",
    image: "/locations/sede-sopocachi.jpg",
    coordinates: [-68.12703295752024, -16.507985587243112],
    buses: ["301", "292", "298", "ACHUMAN", "CHACQUIÑAMPA"],
    hours: {
      weekdays: "08:00 a 18:00",
      saturday: "08:00 a 12:00",
      sunday: "Cerrado",
    },
    services: [
      "Oncología",
      "Radiología",
      "Laboratorio",
      "Farmacia",
      "Consulta Externa",
      "Emergencias",
      "Cirugía",
      "Hospitalización",
    ],
  },
]);

// Función para cambiar el tipo de mapa
const setMapType = (type: MapType): void => {
  mapType.value = type;

  if (map && osmLayer && satelliteLayer) {
    if (type === "map") {
      osmLayer.setVisible(true);
      satelliteLayer.setVisible(false);
    } else {
      osmLayer.setVisible(false);
      satelliteLayer.setVisible(true);
    }
  }
};

// Funciones para zoom
const zoomIn = (): void => {
  if (map) {
    const view = map.getView();
    const zoom = view.getZoom();
    if (zoom !== undefined) {
      view.animate({
        zoom: zoom + 1,
        duration: 250,
      });
    }
  }
};

const zoomOut = (): void => {
  if (map) {
    const view = map.getView();
    const zoom = view.getZoom();
    if (zoom !== undefined) {
      view.animate({
        zoom: zoom - 1,
        duration: 250,
      });
    }
  }
};

// Función para alternar pantalla completa
const toggleFullscreen = (): void => {
  const container = mapContainer.value;
  if (!container) return;

  if (!isFullscreen.value) {
    if (container.requestFullscreen) {
      container.requestFullscreen();
    } else if ((container as any).mozRequestFullScreen) {
      (container as any).mozRequestFullScreen();
    } else if ((container as any).webkitRequestFullscreen) {
      (container as any).webkitRequestFullscreen();
    } else if ((container as any).msRequestFullscreen) {
      (container as any).msRequestFullscreen();
    }
    isFullscreen.value = true;
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).mozCancelFullScreen) {
      (document as any).mozCancelFullScreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen();
    }
    isFullscreen.value = false;
  }
};

// Escuchar eventos de cambio de pantalla completa
const handleFullscreenChange = (): void => {
  isFullscreen.value = !!(
    document.fullscreenElement ||
    (document as any).mozFullScreenElement ||
    (document as any).webkitFullscreenElement ||
    (document as any).msFullscreenElement
  );
};

// Función para seleccionar una ubicación
const selectLocation = (location: Location): void => {
  selectedLocation.value = location;

  // Centrar el mapa en la ubicación seleccionada
  if (map) {
    const coordinates = fromLonLat(location.coordinates);
    map.getView().animate({
      center: coordinates,
      zoom: 16,
      duration: 500,
    });

    // Mostrar el popup después de centrar
    setTimeout(() => {
      showLocationPopup(coordinates);
    }, 600);
  }
};

// Función para mostrar el popup en el mapa
const showLocationPopup = (coordinates: number[]): void => {
  if (!map) return;

  // Convertir coordenadas del mapa a píxeles
  const pixel = map.getPixelFromCoordinate(coordinates);

  if (pixel) {
    popupPosition.value = { x: pixel[0], y: pixel[1] };
    showPopup.value = true;
  }
};

// Funciones para el chat
const openChat = (location: Location): void => {
  chatLocation.value = location;
  chatMessages.value = [];
  showChatModal.value = true;
};

const sendChatMessage = (): void => {
  if (!chatInput.value.trim()) return;

  // Añadir mensaje del usuario
  chatMessages.value.push({
    text: chatInput.value,
    isUser: true,
  });

  const userMessage = chatInput.value;
  chatInput.value = "";

  // Simular respuesta automática después de un breve retraso
  setTimeout(() => {
    let response = "";

    if (
      userMessage.toLowerCase().includes("cita") ||
      userMessage.toLowerCase().includes("turno")
    ) {
      response =
        "Para agendar una cita, puede llamarnos al " +
        chatLocation.value?.phone +
        " o visitarnos en horario de atención.";
    } else if (userMessage.toLowerCase().includes("horario")) {
      response =
        "Nuestros horarios son: Lunes a Viernes: " +
        chatLocation.value?.hours.weekdays +
        ", Sábados: " +
        chatLocation.value?.hours.saturday +
        ".";
    } else if (
      userMessage.toLowerCase().includes("ubicación") ||
      userMessage.toLowerCase().includes("dirección")
    ) {
      response =
        "Estamos ubicados en " +
        chatLocation.value?.address +
        ", " +
        chatLocation.value?.city +
        ".";
    } else {
      response =
        "Gracias por contactarnos. Un representante se comunicará con usted a la brevedad.";
    }

    chatMessages.value.push({
      text: response,
      isUser: false,
    });
  }, 1000);
};

onMounted(() => {
  // Coordenadas para La Paz, Bolivia (centro aproximado entre las dos ubicaciones)
  const laPazCoordinates = fromLonLat([-68.119, -16.517]);

  // Crear capa de mapa estándar (OSM) con filtro grayscale
  osmLayer = new TileLayer({
    source: new OSM(),
    visible: true,
  });

  // Crear capa de satélite (sin filtro grayscale)
  satelliteLayer = new TileLayer({
    source: new XYZ({
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      maxZoom: 19,
    }),
    visible: false,
  });

  // Crear el mapa
  map = new Map({
    target: "map",
    layers: [osmLayer, satelliteLayer],
    view: new View({
      center: laPazCoordinates,
      zoom: 14,
    }),
    controls: [], // Eliminar controles predeterminados para usar los personalizados
  });

  // Crear marcadores para todas las ubicaciones con mejor estilo
  const features = locations.value.map((location) => {
    const marker = new Feature({
      geometry: new Point(fromLonLat(location.coordinates)),
      locationId: location.id,
    });

    // Estilo del marcador mejorado - Diseño profesional
    marker.setStyle(
      new Style({
        image: new Icon({
          src:
            "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(
              '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#1e40af" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>'
            ),
          scale: 1.5,
          anchor: [0.5, 1],
        }),
        zIndex: 100, // Asegurar que esté por encima del filtro
      })
    );

    return marker;
  });

  // Capa de vectores para los marcadores
  const vectorSource = new VectorSource({
    features: features,
  });

  const vectorLayer = new VectorLayer({
    source: vectorSource,
    zIndex: 10, // Asegura que los marcadores estén por encima de las capas del mapa
  });

  // Agregar la capa de vectores al mapa
  map.addLayer(vectorLayer);

  // Agregar interacción de clic para mostrar información
  map.on("click", function (evt) {
    const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
      return feature;
    });

    if (feature && feature.get("locationId")) {
      const locationId = feature.get("locationId");
      const location = locations.value.find((loc) => loc.id === locationId);

      if (location) {
        selectedLocation.value = location;
        popupPosition.value = { x: evt.pixel[0], y: evt.pixel[1] };
        showPopup.value = true;
      }
    } else {
      showPopup.value = false;
    }
  });

  // Cambiar el cursor al pasar sobre los marcadores
  map.on("pointermove", function (evt) {
    const pixel = map.getEventPixel(evt.originalEvent);
    const hit = map.hasFeatureAtPixel(pixel);
    map.getViewport().style.cursor = hit ? "pointer" : "";
  });

  // Cerrar el popup cuando se hace zoom o se mueve el mapa
  map.on("movestart", function () {
    showPopup.value = false;
  });

  // Actualizar posición del popup cuando cambia el tamaño de la ventana
  window.addEventListener("resize", function () {
    if (showPopup.value && selectedLocation.value) {
      const coordinates = fromLonLat(selectedLocation.value.coordinates);
      const pixel = map.getPixelFromCoordinate(coordinates);

      if (pixel) {
        popupPosition.value = { x: pixel[0], y: pixel[1] };
      }
    }
  });

  // Agregar listeners para pantalla completa
  document.addEventListener("fullscreenchange", handleFullscreenChange);
  document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
  document.addEventListener("mozfullscreenchange", handleFullscreenChange);
  document.addEventListener("MSFullscreenChange", handleFullscreenChange);

  // Seleccionar la primera ubicación por defecto
  if (locations.value.length > 0) {
    selectLocation(locations.value[0]);
  }
});

// Limpiar listeners al desmontar el componente
onUnmounted(() => {
  document.removeEventListener("fullscreenchange", handleFullscreenChange);
  document.removeEventListener(
    "webkitfullscreenchange",
    handleFullscreenChange
  );
  document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
  document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
});
</script>

<style scoped>
/* Aplicar filtro grayscale solo al mapa de calles, no al satélite */
.grayscale-map {
  filter: grayscale(100%) hue-rotate(0deg) invert(10%) sepia(0%) saturate(100%);
}

/* Estilos adicionales */
h1,
h2,
h3,
h4 {
  font-family: "Arial", sans-serif;
}

/* Animación para el popup */
[v-if="showPopup"] {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, -90%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -100%) translateY(-10px);
  }
}

/* Transiciones suaves */
.transition-all {
  transition: all 0.3s ease;
}

/* Estilos para los botones */
button {
  transition: all 0.2s ease;
}

button:active {
  transform: scale(0.97);
}

/* Personalización de OpenLayers */
.ol-attribution {
  bottom: 0.5rem;
  right: 0.5rem;
  font-size: 0.7rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
}

/* Estilos para pantalla completa */
:fullscreen .absolute.top-4 {
  top: 1rem;
}

:-webkit-full-screen .absolute.top-4 {
  top: 1rem;
}

:-moz-full-screen .absolute.top-4 {
  top: 1rem;
}

:-ms-fullscreen .absolute.top-4 {
  top: 1rem;
}
</style>
