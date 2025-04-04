<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-6 font-serif">
    <!-- Search header with improved styling -->
    <div class="mb-8 bg-white rounded-lg shadow-sm p-5">
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div class="flex flex-col">
          <p class="text-sm text-gray-600 mb-1">
            Showing
            <span class="font-medium">771</span>
            results for:
          </p>
          <h1 class="text-3xl font-bold text-gray-900">sds</h1>
        </div>
        <div class="flex flex-wrap items-center gap-4">
          <button
            class="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
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
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-700">Sort by</span>
            <div class="relative inline-block">
              <button
                class="flex items-center gap-1 text-sm font-medium bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-md transition-colors"
              >
                Relevance
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
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-700">Search in</span>
            <div class="relative inline-block">
              <button
                class="flex items-center gap-1 text-sm font-medium bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-md transition-colors"
              >
                English
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
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Filter options with improved styling -->
      <div class="flex flex-wrap mt-5 pt-4 border-t border-gray-200 gap-4">
        <div class="mr-4">
          <button
            class="flex items-center text-sm bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-md transition-colors"
          >
            Date Range
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
        </div>
        <div class="mr-4">
          <button
            class="flex items-center text-sm bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-md transition-colors"
          >
            Section
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
        </div>
        <div>
          <button
            class="flex items-center text-sm bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-md transition-colors"
          >
            Type
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
        </div>
      </div>
    </div>

    <!-- Search results with improved styling and centering -->
    <div class="divide-y divide-gray-200 max-w-5xl mx-auto">
      <!-- Article 1 -->
      <article
        class="py-6 grid grid-cols-1 md:grid-cols-4 gap-6 hover:bg-gray-50 rounded-lg p-4 transition-colors"
      >
        <div class="md:col-span-3 space-y-2">
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-500">Dec. 24, 2023</span>
            <span
              class="text-xs px-2 py-0.5 bg-gray-100 rounded uppercase text-gray-600 font-medium"
            >
              U.S.
            </span>
          </div>
          <h2 class="text-xl font-semibold">
            <a href="#" class="hover:text-gray-600 transition-colors">
              In Campus Protests Over Gaza, Echoes of Outcry Over Vietnam
            </a>
          </h2>
          <p class="text-gray-700">
            The war in Vietnam ignited a protest movement that helped define a
            generation. Is the war between Israel and Hamas doing the same
            thing?
          </p>
          <p class="text-sm text-gray-600">By Michael Wines</p>
          <div class="pt-2">
            <div class="text-xs uppercase font-medium text-gray-600 mb-1">
              PRINT EDITION
            </div>
            <a
              href="#"
              class="text-sm text-gray-700 hover:text-gray-900 hover:underline transition-colors"
            >
              College Protests Over Gaza Echo Vietnam Strife | December 26,
              2023, Page A1
            </a>
          </div>
        </div>
        <div class="md:col-span-1 flex items-center justify-center">
          <img
            src="https://v0.dev/placeholder.svg?height=130&width=200"
            alt="Campus protest"
            class="w-full h-auto rounded-lg shadow-sm object-cover"
          />
        </div>
      </article>

      <!-- Article 2 -->
      <article
        class="py-6 grid grid-cols-1 md:grid-cols-4 gap-6 hover:bg-gray-50 rounded-lg p-4 transition-colors"
      >
        <div class="md:col-span-3 space-y-2">
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-500">April 30, 2024</span>
            <span
              class="text-xs px-2 py-0.5 bg-gray-100 rounded uppercase text-gray-600 font-medium"
            >
              POLITICS
            </span>
          </div>
          <h2 class="text-xl font-semibold">
            <a href="#" class="hover:text-gray-600 transition-colors">
              A Bystander to '60s Protests, Biden Now Becomes a Target
            </a>
          </h2>
          <p class="text-gray-700">
            For President Biden, the campus unrest over the Gaza war recalls
            peace protests of his youth. But this time he cannot easily bypass
            the turmoil.
          </p>
          <p class="text-sm text-gray-600">By Peter Baker</p>
          <div class="pt-2">
            <div class="text-xs uppercase font-medium text-gray-600 mb-1">
              PRINT EDITION
            </div>
            <a
              href="#"
              class="text-sm text-gray-700 hover:text-gray-900 hover:underline transition-colors"
            >
              Echo of 1968 Haunts Biden In Unrest Now | May 1, 2024, Page A1
            </a>
          </div>
        </div>
        <div class="md:col-span-1 flex items-center justify-center">
          <img
            src="https://v0.dev/placeholder.svg?height=130&width=200"
            alt="President Biden"
            class="w-full h-auto rounded-lg shadow-sm object-cover"
          />
        </div>
      </article>

      <!-- Article 3 -->
      <article
        class="py-6 grid grid-cols-1 md:grid-cols-4 gap-6 hover:bg-gray-50 rounded-lg p-4 transition-colors"
      >
        <div class="md:col-span-3 space-y-2">
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-500">Aug. 17, 2024</span>
            <span
              class="text-xs px-2 py-0.5 bg-gray-100 rounded uppercase text-gray-600 font-medium"
            >
              U.S.
            </span>
          </div>
          <h2 class="text-xl font-semibold">
            <a href="#" class="hover:text-gray-600 transition-colors">
              The Next Stop for Denver Campus Protesters Is the Democratic
              Convention
            </a>
          </h2>
          <p class="text-gray-700">
            Students in Denver behind one of the longest-running encampments in
            protest of the Israel-Hamas war disbanded the camp in May. They
            spent the rest of the summer planning for what comes next.
          </p>
          <p class="text-sm text-gray-600">
            By Audra D. S. Burch and Kelley Manley
          </p>
          <div class="pt-2">
            <div class="text-xs uppercase font-medium text-gray-600 mb-1">
              PRINT EDITION
            </div>
            <a
              href="#"
              class="text-sm text-gray-700 hover:text-gray-900 hover:underline transition-colors"
            >
              Next Stop for Protesters: Democratic Convention | August 18, 2024,
              Page A17
            </a>
          </div>
        </div>
        <div class="md:col-span-1 flex items-center justify-center">
          <img
            src="https://v0.dev/placeholder.svg?height=130&width=200"
            alt="Denver skyline"
            class="w-full h-auto rounded-lg shadow-sm object-cover"
          />
        </div>
      </article>
    </div>

    <!-- Pagination -->
    <div class="mt-8 flex justify-center">
      <nav class="flex items-center gap-1">
        <button class="p-2 rounded-md hover:bg-gray-100 text-gray-500">
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
        <button
          class="px-3 py-1.5 rounded-md bg-gray-900 text-white font-medium"
        >
          1
        </button>
        <button class="px-3 py-1.5 rounded-md hover:bg-gray-100">2</button>
        <button class="px-3 py-1.5 rounded-md hover:bg-gray-100">3</button>
        <span class="px-2">...</span>
        <button class="px-3 py-1.5 rounded-md hover:bg-gray-100">12</button>
        <button class="p-2 rounded-md hover:bg-gray-100 text-gray-500">
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

<script setup>
// Component state could be added here for interactivity
// For example:
import { ref } from "vue";

const searchQuery = ref("sds");
const totalResults = ref(771);
const currentPage = ref(1);
const sortBy = ref("Relevance");
const searchLanguage = ref("English");

// These could be expanded with methods for filtering, sorting, etc.
</script>

<style>
/* Custom transitions and animations */
.transition-colors {
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* You can add any additional custom styles here */
</style>
