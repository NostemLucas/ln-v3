<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-6 font-serif">
    <!-- Banner rediseñado con aspecto más profesional y médico -->
    <div
      class="relative mb-10 overflow-hidden rounded-xl bg-white border border-gray-200 shadow-md"
    >
      <div
        class="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-800/20 z-0"
      ></div>

      <!-- Patrón de fondo médico -->
      <div class="absolute inset-0 opacity-10 z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern
            id="medical-pattern"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M20 0 A20 20 0 0 1 20 40 A20 20 0 0 1 20 0"
              fill="none"
              stroke="#2563eb"
              stroke-width="1"
            />
            <circle cx="20" cy="20" r="2" fill="#2563eb" />
          </pattern>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#medical-pattern)"
          />
        </svg>
      </div>

      <!-- Contenido del banner -->
      <div class="grid md:grid-cols-2 gap-6 relative z-10">
        <div class="p-8 md:p-10 flex flex-col justify-center">
          <div
            class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4"
          >
            Centro de Información Oncológica
          </div>
          <h1
            class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight"
          >
            Noticias de <span class="text-blue-600">Oncología</span>
          </h1>
          <p class="text-lg text-gray-700 mb-6 max-w-lg">
            Mantente informado sobre los últimos avances en investigación,
            tratamientos y cuidados oncológicos de la mano de expertos.
          </p>

          <!-- Buscador rediseñado e integrado en el banner -->
          <div class="relative max-w-md">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 text-gray-400"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Buscar noticias, tratamientos, investigaciones..."
              class="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              @keyup.enter="search"
            />
            <button
              @click="search"
              class="absolute inset-y-0 right-0 flex items-center px-4 text-blue-600 font-medium"
            >
              Buscar
            </button>
          </div>
        </div>

        <div class="hidden md:flex items-center justify-center p-6">
          <div class="relative w-full h-full max-w-sm">
            <!-- Imagen médica estilizada -->
            <div
              class="absolute -right-4 -top-4 w-24 h-24 bg-blue-100 rounded-full z-0"
            ></div>
            <div
              class="absolute -left-4 -bottom-4 w-32 h-32 bg-blue-50 rounded-full z-0"
            ></div>

            <img
              src="https://v0.dev/placeholder.svg?height=300&width=300"
              alt="Investigación oncológica"
              class="relative z-10 rounded-lg shadow-lg object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Filtros rediseñados con aspecto más profesional -->
    <div
      class="mb-8 bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
    >
      <div class="p-6 border-b border-gray-200">
        <div
          class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div class="flex flex-col">
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-500">Mostrando</span>
              <span class="font-medium text-blue-600">{{ totalResults }}</span>
              <span class="text-sm text-gray-500">resultados</span>
              <span
                v-if="currentCategory !== 'Todas las noticias'"
                class="text-sm text-gray-500"
                >en</span
              >
              <span
                v-if="currentCategory !== 'Todas las noticias'"
                class="font-medium text-blue-600"
                >{{ currentCategory }}</span
              >
            </div>
            <h2 class="text-xl font-bold text-gray-900 mt-1">
              Últimas publicaciones
            </h2>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <div class="relative">
              <button
                class="flex items-center gap-1 text-sm font-medium bg-white hover:bg-blue-50 px-3 py-2 rounded-md transition-colors border border-gray-200 shadow-sm hover:text-blue-600"
                @click="toggleSortDropdown"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 mr-1"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25"
                  />
                </svg>
                {{ sortBy }}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 ml-1"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
              <div
                v-if="showSortDropdown"
                class="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200"
              >
                <div class="py-1">
                  <button
                    v-for="option in sortOptions"
                    :key="option"
                    @click="selectSortOption(option)"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    {{ option }}
                  </button>
                </div>
              </div>
            </div>

            <div class="relative">
              <button
                class="flex items-center gap-1 text-sm font-medium bg-white hover:bg-blue-50 px-3 py-2 rounded-md transition-colors border border-gray-200 shadow-sm hover:text-blue-600"
                @click="toggleCategoryDropdown"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 mr-1"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 6h.008v.008H6V6z"
                  />
                </svg>
                Categoría
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 ml-1"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
              <div
                v-if="showCategoryDropdown"
                class="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200"
              >
                <div class="py-1">
                  <button
                    v-for="category in categories"
                    :key="category"
                    @click="selectCategory(category)"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    {{ category }}
                  </button>
                </div>
              </div>
            </div>

            <div class="relative">
              <button
                class="flex items-center gap-1 text-sm font-medium bg-white hover:bg-blue-50 px-3 py-2 rounded-md transition-colors border border-gray-200 shadow-sm hover:text-blue-600"
                @click="toggleDateDropdown"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 mr-1"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  />
                </svg>
                Fecha
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 ml-1"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
              <div
                v-if="showDateDropdown"
                class="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200"
              >
                <div class="py-1">
                  <button
                    v-for="option in dateOptions"
                    :key="option"
                    @click="selectDateOption(option)"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    {{ option }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Chips de filtros activos -->
      <div
        v-if="hasActiveFilters"
        class="px-6 py-3 bg-gray-50 flex flex-wrap items-center gap-2"
      >
        <span class="text-sm text-gray-500">Filtros activos:</span>

        <div
          v-if="currentCategory !== 'Todas las noticias'"
          class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
        >
          {{ currentCategory }}
          <button
            @click="resetCategory"
            class="ml-1 text-blue-600 hover:text-blue-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div
          v-if="currentDateFilter !== 'Cualquier fecha'"
          class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
        >
          {{ currentDateFilter }}
          <button
            @click="resetDateFilter"
            class="ml-1 text-blue-600 hover:text-blue-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div
          v-if="searchQuery"
          class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
        >
          "{{ searchQuery }}"
          <button
            @click="clearSearch"
            class="ml-1 text-blue-600 hover:text-blue-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <button
          v-if="hasActiveFilters"
          @click="resetAllFilters"
          class="text-sm text-blue-600 hover:text-blue-800 hover:underline ml-2"
        >
          Limpiar todos
        </button>
      </div>
    </div>

    <!-- News articles (manteniendo el diseño que gustó) -->
    <div class="divide-y divide-gray-200 max-w-5xl mx-auto">
      <article
        v-for="(article, index) in paginatedArticles"
        :key="index"
        class="py-6 grid grid-cols-1 md:grid-cols-4 gap-6 hover:bg-gray-50 rounded-lg p-4 transition-colors"
      >
        <div class="md:col-span-3 space-y-2">
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-500">{{ article.date }}</span>
            <span
              class="text-xs px-2 py-0.5 bg-blue-50 rounded uppercase text-blue-600 font-medium"
            >
              {{ article.category }}
            </span>
          </div>
          <h2 class="text-xl font-semibold">
            <a
              :href="article.url"
              class="hover:text-blue-600 transition-colors"
            >
              {{ article.title }}
            </a>
          </h2>
          <p class="text-gray-700">
            {{ article.summary }}
          </p>
          <p class="text-sm text-gray-600">Por {{ article.author }}</p>
          <div class="pt-2">
            <div class="text-xs uppercase font-medium text-gray-600 mb-1">
              FUENTE
            </div>
            <a
              :href="article.sourceUrl"
              class="text-sm text-gray-700 hover:text-blue-600 hover:underline transition-colors"
            >
              {{ article.source }} | {{ article.date }}
            </a>
          </div>
        </div>
        <div class="md:col-span-1 flex items-center justify-center">
          <img
            :src="article.imageUrl"
            :alt="article.imageAlt"
            class="w-full h-auto rounded-lg shadow-sm object-cover border border-gray-200"
          />
        </div>
      </article>

      <!-- Empty state when no results -->
      <div v-if="paginatedArticles.length === 0" class="py-12 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-12 h-12 mx-auto text-gray-400 mb-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
          />
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          No se encontraron resultados
        </h3>
        <p class="text-gray-600 max-w-md mx-auto">
          No hay noticias que coincidan con tu búsqueda. Intenta con otros
          términos o filtros.
        </p>
      </div>
    </div>

    <!-- Pagination (manteniendo el diseño que gustó) -->
    <div class="mt-8 flex justify-center">
      <nav class="flex items-center gap-1" aria-label="Paginación">
        <button
          class="p-2 rounded-md hover:bg-blue-50 text-gray-500 disabled:opacity-50 disabled:pointer-events-none border border-gray-200"
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
          aria-label="Página anterior"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <!-- First page -->
        <button
          v-if="totalPages > 5 && currentPage > 3"
          class="px-3 py-1.5 rounded-md hover:bg-blue-50 hover:text-blue-600 border border-gray-200"
          @click="goToPage(1)"
        >
          1
        </button>

        <!-- Ellipsis if needed -->
        <span v-if="totalPages > 5 && currentPage > 3" class="px-2">...</span>

        <!-- Page numbers -->
        <template v-for="page in displayedPageNumbers" :key="page">
          <button
            :class="[
              'px-3 py-1.5 rounded-md border',
              currentPage === page
                ? 'bg-blue-600 text-white font-medium border-blue-600'
                : 'hover:bg-blue-50 hover:text-blue-600 border-gray-200',
            ]"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
        </template>

        <!-- Ellipsis if needed -->
        <span v-if="totalPages > 5 && currentPage < totalPages - 2" class="px-2"
          >...</span
        >

        <!-- Last page -->
        <button
          v-if="totalPages > 5 && currentPage < totalPages - 2"
          class="px-3 py-1.5 rounded-md hover:bg-blue-50 hover:text-blue-600 border border-gray-200"
          @click="goToPage(totalPages)"
        >
          {{ totalPages }}
        </button>

        <button
          class="p-2 rounded-md hover:bg-blue-50 text-gray-500 disabled:opacity-50 disabled:pointer-events-none border border-gray-200"
          :disabled="currentPage === totalPages"
          @click="goToPage(currentPage + 1)"
          aria-label="Página siguiente"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";

// Types
interface Article {
  id: number;
  title: string;
  summary: string;
  content: string;
  author: string;
  date: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
  url: string;
  source: string;
  sourceUrl: string;
}

// State
const articles = ref<Article[]>([]);
const currentPage = ref(1);
const itemsPerPage = ref(5);
const totalResults = ref(0);
const searchQuery = ref("");
const showSortDropdown = ref(false);
const showCategoryDropdown = ref(false);
const showDateDropdown = ref(false);
const sortBy = ref("Más recientes");
const currentCategory = ref("Todas las noticias");
const currentDateFilter = ref("Cualquier fecha");

// Computed for active filters
const hasActiveFilters = computed(() => {
  return (
    searchQuery.value !== "" ||
    currentCategory.value !== "Todas las noticias" ||
    currentDateFilter.value !== "Cualquier fecha"
  );
});

// Options for dropdowns
const sortOptions = ["Más recientes", "Más relevantes", "Más leídos"];
const categories = [
  "Todas las noticias",
  "Investigación",
  "Tratamientos",
  "Prevención",
  "Testimonios",
  "Avances médicos",
];
const dateOptions = [
  "Cualquier fecha",
  "Hoy",
  "Esta semana",
  "Este mes",
  "Este año",
];

// Sample data - in a real app, this would come from an API
const fetchArticles = () => {
  // Simulating API call
  const sampleArticles: Article[] = [
    {
      id: 1,
      title:
        "Nuevo tratamiento inmunoterapéutico muestra resultados prometedores en cáncer de pulmón avanzado",
      summary:
        "Un estudio reciente revela que la combinación de inmunoterapia con quimioterapia tradicional aumenta significativamente la tasa de supervivencia en pacientes con cáncer de pulmón en etapa avanzada.",
      content: "Contenido completo del artículo...",
      author: "Dr. Carlos Martínez",
      date: "12 abril, 2024",
      category: "Tratamientos",
      imageUrl: "https://v0.dev/placeholder.svg?height=150&width=250",
      imageAlt: "Tratamiento de inmunoterapia",
      url: "#articulo-1",
      source: "Revista Oncología Clínica",
      sourceUrl: "#fuente-1",
    },
    {
      id: 2,
      title:
        "Descubren biomarcador que predice la respuesta a la terapia en cáncer de mama",
      summary:
        "Investigadores identifican un nuevo biomarcador que podría ayudar a determinar qué pacientes con cáncer de mama responderán mejor a determinados tratamientos, permitiendo una medicina más personalizada.",
      content: "Contenido completo del artículo...",
      author: "Dra. Laura Sánchez",
      date: "3 abril, 2024",
      category: "Investigación",
      imageUrl: "https://v0.dev/placeholder.svg?height=150&width=250",
      imageAlt: "Investigación de biomarcadores",
      url: "#articulo-2",
      source: "Journal of Cancer Research",
      sourceUrl: "#fuente-2",
    },
    {
      id: 3,
      title:
        "La inteligencia artificial mejora la precisión en la detección temprana del cáncer colorrectal",
      summary:
        "Un nuevo sistema basado en IA ha demostrado una precisión del 94% en la identificación de pólipos precancerosos durante colonoscopias, superando significativamente la tasa de detección humana.",
      content: "Contenido completo del artículo...",
      author: "Dr. Miguel Ángel Rodríguez",
      date: "28 marzo, 2024",
      category: "Avances médicos",
      imageUrl: "https://v0.dev/placeholder.svg?height=150&width=250",
      imageAlt: "IA en detección de cáncer",
      url: "#articulo-3",
      source: "Tech & Medicine Journal",
      sourceUrl: "#fuente-3",
    },
    {
      id: 4,
      title:
        "Estudio revela la importancia de la nutrición en pacientes oncológicos durante el tratamiento",
      summary:
        "Una investigación multicéntrica confirma que una nutrición adecuada y personalizada puede reducir los efectos secundarios de la quimioterapia y mejorar la calidad de vida durante el tratamiento.",
      content: "Contenido completo del artículo...",
      author: "Dra. Ana García",
      date: "20 marzo, 2024",
      category: "Tratamientos",
      imageUrl: "https://v0.dev/placeholder.svg?height=150&width=250",
      imageAlt: "Nutrición oncológica",
      url: "#articulo-4",
      source: "Revista de Nutrición Clínica",
      sourceUrl: "#fuente-4",
    },
    {
      id: 5,
      title:
        "Nuevas pautas para el cribado del cáncer de próstata recomiendan enfoque más personalizado",
      summary:
        "Las nuevas directrices sugieren que el cribado del cáncer de próstata debe adaptarse al perfil de riesgo individual, en lugar de aplicar un enfoque universal basado únicamente en la edad.",
      content: "Contenido completo del artículo...",
      author: "Dr. Javier López",
      date: "15 marzo, 2024",
      category: "Prevención",
      imageUrl: "https://v0.dev/placeholder.svg?height=150&width=250",
      imageAlt: "Cribado de cáncer de próstata",
      url: "#articulo-5",
      source: "Asociación Europea de Urología",
      sourceUrl: "#fuente-5",
    },
    {
      id: 6,
      title:
        "Terapia CAR-T muestra remisión completa en pacientes con linfoma resistente",
      summary:
        "Un ensayo clínico fase III reporta que el 83% de los pacientes con linfoma resistente a tratamientos convencionales experimentaron remisión completa tras recibir terapia con células CAR-T.",
      content: "Contenido completo del artículo...",
      author: "Dra. Elena Martín",
      date: "8 marzo, 2024",
      category: "Tratamientos",
      imageUrl: "https://v0.dev/placeholder.svg?height=150&width=250",
      imageAlt: "Terapia CAR-T",
      url: "#articulo-6",
      source: "New England Journal of Medicine",
      sourceUrl: "#fuente-6",
    },
    {
      id: 7,
      title:
        "Mi vida después del diagnóstico: la historia de superación de María",
      summary:
        "María Gómez comparte su experiencia tras ser diagnosticada con cáncer de mama a los 34 años y cómo ha transformado su vida después de superar la enfermedad.",
      content: "Contenido completo del artículo...",
      author: "Patricia Hernández",
      date: "1 marzo, 2024",
      category: "Testimonios",
      imageUrl: "https://v0.dev/placeholder.svg?height=150&width=250",
      imageAlt: "Historia de superación",
      url: "#articulo-7",
      source: "Revista Vida y Salud",
      sourceUrl: "#fuente-7",
    },
    {
      id: 8,
      title:
        "Estudio genómico identifica nuevas dianas terapéuticas para el cáncer de páncreas",
      summary:
        "Un análisis genómico a gran escala ha identificado varias mutaciones específicas que podrían servir como dianas para nuevos tratamientos contra el cáncer de páncreas, uno de los más agresivos.",
      content: "Contenido completo del artículo...",
      author: "Dr. Roberto Fernández",
      date: "25 febrero, 2024",
      category: "Investigación",
      imageUrl: "https://v0.dev/placeholder.svg?height=150&width=250",
      imageAlt: "Investigación genómica",
      url: "#articulo-8",
      source: "Science Translational Medicine",
      sourceUrl: "#fuente-8",
    },
    {
      id: 9,
      title:
        "La exposición a la contaminación atmosférica aumenta el riesgo de cáncer de pulmón en no fumadores",
      summary:
        "Un estudio epidemiológico de 15 años confirma que la exposición prolongada a partículas finas de contaminación atmosférica incrementa significativamente el riesgo de desarrollar cáncer de pulmón, incluso en personas que nunca han fumado.",
      content: "Contenido completo del artículo...",
      author: "Dra. Sofía Ramírez",
      date: "18 febrero, 2024",
      category: "Prevención",
      imageUrl: "https://v0.dev/placeholder.svg?height=150&width=250",
      imageAlt: "Contaminación atmosférica",
      url: "#articulo-9",
      source: "Environmental Health Perspectives",
      sourceUrl: "#fuente-9",
    },
    {
      id: 10,
      title:
        "Avances en radioterapia de precisión reducen daños a tejidos sanos",
      summary:
        "Una nueva técnica de radioterapia guiada por imágenes en tiempo real permite dirigir la radiación con mayor precisión, reduciendo hasta en un 60% el daño a tejidos sanos circundantes.",
      content: "Contenido completo del artículo...",
      author: "Dr. Alberto Torres",
      date: "10 febrero, 2024",
      category: "Avances médicos",
      imageUrl: "https://v0.dev/placeholder.svg?height=150&width=250",
      imageAlt: "Radioterapia de precisión",
      url: "#articulo-10",
      source: "International Journal of Radiation Oncology",
      sourceUrl: "#fuente-10",
    },
    {
      id: 11,
      title:
        "Descubren mecanismo que permite a las células cancerígenas evadir el sistema inmune",
      summary:
        "Científicos identifican una proteína específica que las células cancerígenas utilizan para camuflarse y evitar ser detectadas por el sistema inmunológico, abriendo nuevas vías para tratamientos.",
      content: "Contenido completo del artículo...",
      author: "Dr. Fernando Gutiérrez",
      date: "3 febrero, 2024",
      category: "Investigación",
      imageUrl: "https://v0.dev/placeholder.svg?height=150&width=250",
      imageAlt: "Células cancerígenas",
      url: "#articulo-11",
      source: "Nature Immunology",
      sourceUrl: "#fuente-11",
    },
    {
      id: 12,
      title:
        "Ejercicio físico moderado reduce el riesgo de recaída en supervivientes de cáncer",
      summary:
        "Un estudio con más de 5,000 supervivientes de cáncer demuestra que realizar al menos 150 minutos semanales de ejercicio físico moderado reduce en un 40% el riesgo de recaída.",
      content: "Contenido completo del artículo...",
      author: "Dra. Carmen Vázquez",
      date: "28 enero, 2024",
      category: "Prevención",
      imageUrl: "https://v0.dev/placeholder.svg?height=150&width=250",
      imageAlt: "Ejercicio físico",
      url: "#articulo-12",
      source: "Journal of Clinical Oncology",
      sourceUrl: "#fuente-12",
    },
  ];

  articles.value = sampleArticles;
  totalResults.value = sampleArticles.length;
};

// Filter articles based on search and filters
const filteredArticles = computed(() => {
  let result = [...articles.value];

  // Apply search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.summary.toLowerCase().includes(query) ||
        article.author.toLowerCase().includes(query)
    );
  }

  // Apply category filter
  if (currentCategory.value !== "Todas las noticias") {
    result = result.filter(
      (article) => article.category === currentCategory.value
    );
  }

  // Apply date filter (simplified for demo)
  if (currentDateFilter.value !== "Cualquier fecha") {
    const today = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = 7 * oneDay;
    const oneMonth = 30 * oneDay;
    const oneYear = 365 * oneDay;

    result = result.filter((article) => {
      const articleDate = new Date(article.date);
      const timeDiff = today.getTime() - articleDate.getTime();

      switch (currentDateFilter.value) {
        case "Hoy":
          return timeDiff < oneDay;
        case "Esta semana":
          return timeDiff < oneWeek;
        case "Este mes":
          return timeDiff < oneMonth;
        case "Este año":
          return timeDiff < oneYear;
        default:
          return true;
      }
    });
  }

  // Apply sorting
  if (sortBy.value === "Más recientes") {
    result.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } else if (sortBy.value === "Más relevantes") {
    // In a real app, this would use a relevance algorithm
    // For demo purposes, we'll just randomize
    result.sort(() => Math.random() - 0.5);
  } else if (sortBy.value === "Más leídos") {
    // In a real app, this would sort by view count
    // For demo, we'll sort by ID as a proxy for popularity
    result.sort((a, b) => a.id - b.id);
  }

  return result;
});

// Pagination
const totalPages = computed(() => {
  return Math.ceil(filteredArticles.value.length / itemsPerPage.value);
});

const paginatedArticles = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return filteredArticles.value.slice(startIndex, endIndex);
});

// Calculate which page numbers to display
const displayedPageNumbers = computed(() => {
  if (totalPages.value <= 5) {
    return Array.from({ length: totalPages.value }, (_, i) => i + 1);
  }

  // Show 5 pages centered around current page when possible
  let start = Math.max(currentPage.value - 2, 1);
  let end = start + 4;

  if (end > totalPages.value) {
    end = totalPages.value;
    start = Math.max(end - 4, 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

// Methods
const goToPage = (page: number) => {
  currentPage.value = page;
  // In a real app, you might want to scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const search = () => {
  currentPage.value = 1; // Reset to first page when searching
};

const toggleSortDropdown = () => {
  showSortDropdown.value = !showSortDropdown.value;
  showCategoryDropdown.value = false;
  showDateDropdown.value = false;
};

const toggleCategoryDropdown = () => {
  showCategoryDropdown.value = !showCategoryDropdown.value;
  showSortDropdown.value = false;
  showDateDropdown.value = false;
};

const toggleDateDropdown = () => {
  showDateDropdown.value = !showDateDropdown.value;
  showSortDropdown.value = false;
  showCategoryDropdown.value = false;
};

const selectSortOption = (option: string) => {
  sortBy.value = option;
  showSortDropdown.value = false;
  currentPage.value = 1; // Reset to first page when changing sort
};

const selectCategory = (category: string) => {
  currentCategory.value = category;
  showCategoryDropdown.value = false;
  currentPage.value = 1; // Reset to first page when changing category
};

const selectDateOption = (option: string) => {
  currentDateFilter.value = option;
  showDateDropdown.value = false;
  currentPage.value = 1; // Reset to first page when changing date filter
};

// Reset filter methods
const resetCategory = () => {
  currentCategory.value = "Todas las noticias";
  currentPage.value = 1;
};

const resetDateFilter = () => {
  currentDateFilter.value = "Cualquier fecha";
  currentPage.value = 1;
};

const clearSearch = () => {
  searchQuery.value = "";
  currentPage.value = 1;
};

const resetAllFilters = () => {
  resetCategory();
  resetDateFilter();
  clearSearch();
};

// Close dropdowns when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest("button")) {
    showSortDropdown.value = false;
    showCategoryDropdown.value = false;
    showDateDropdown.value = false;
  }
};

// Watch for filter changes to update results count
watch(filteredArticles, (newValue) => {
  totalResults.value = newValue.length;
});

// Lifecycle hooks
onMounted(() => {
  fetchArticles();
  document.addEventListener("click", handleClickOutside);

  // Clean up event listener
  return () => {
    document.removeEventListener("click", handleClickOutside);
  };
});
</script>

<style scoped>
/* Custom transitions and animations */
.transition-colors {
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Custom scrollbar for a more professional look */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #2563eb; /* blue-600 */
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #1d4ed8; /* blue-700 */
}

/* Fade in animation for articles */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

article {
  animation: fadeIn 0.3s ease-out forwards;
}

/* Subtle box shadow for cards */
.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Improved focus styles */
button:focus,
a:focus,
input:focus {
  outline: 2px solid rgba(37, 99, 235, 0.5);
  outline-offset: 2px;
}

/* Improved hover effects */
a:hover,
button:hover {
  transition: all 0.2s ease;
}
</style>
