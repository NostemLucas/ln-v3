<template>
  <div class="w-full">
    <!-- Navigation -->
    <header
      class="fixed top-0 right-0 left-0 z-50 h-auto min-h-[5rem] border-b border-gray-200 bg-white/95 backdrop-blur-xl transition-all duration-300"
      :class="{ 'shadow-md': isScrolled }"
    >
      <div class="mx-auto h-full w-full px-4 lg:container lg:px-6">
        <div class="flex h-full items-center justify-between py-4">
          <!-- Logo -->
          <div class="flex-shrink-0">
            <NuxtLink to="/" class="block" draggable="false">
              <NuxtImg
                src="logo.png"
                alt="Logo"
                width="240"
                draggable="false"
                class="h-auto w-auto max-h-12 max-w-[180px] sm:max-w-[240px]"
              />
            </NuxtLink>
          </div>

          <!-- Desktop Navigation -->
          <nav
            class="hidden items-center lg:flex lg:gap-0.5 xl:gap-1.5 2xl:gap-3"
          >
            <div
              v-for="(item, index) in navigationItems"
              :key="index"
              class="relative"
              @mouseenter="openMenu(index)"
              @mouseleave="closeMenuWithDelay(index)"
            >
              <!-- Botón con submenú -->
              <UButton
                variant="link"
                v-if="item.subItems"
                class="flex items-center gap-1.5 font-medium transition-colors duration-200 hover:text-primary text-gray-800 tracking-wider lg:text-xs lg:px-1.5 lg:py-1 xl:text-sm xl:px-2 xl:py-1 2xl:text-base 2xl:px-3 2xl:py-2"
              >
                {{ item.label }}
                <Icon
                  name="lucide:chevron-down"
                  class="h-4 w-4 transition-transform duration-300"
                  :class="{ 'rotate-180': activeMenus[index] }"
                />
                <span
                  class="absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300"
                  :class="{
                    'w-full': activeMenus[index],
                    'w-0': !activeMenus[index],
                  }"
                />
              </UButton>

              <!-- Enlace con url -->
              <UButton
                v-else-if="item.url"
                variant="link"
                :to="item.url || '#'"
                class="relative font-medium transition-colors duration-200 hover:text-primary text-gray-800 tracking-wide lg:text-xs lg:px-1.5 lg:py-1 xl:text-sm xl:px-2 xl:py-1 2xl:text-base 2xl:px-3 2xl:py-2"
                :class="{ 'text-primary': isActiveRoute(item.url) }"
              >
                {{ item.label }}
                <span
                  class="absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300"
                  :class="{
                    'w-0': !isActiveRoute(item.url) || !activeMenus[index],
                    'w-full': isActiveRoute(item.url) || activeMenus[index],
                  }"
                />
              </UButton>

              <!-- Botón con columnas -->
              <UButton
                variant="link"
                v-else-if="item.columns"
                class="flex items-center gap-1.5 font-medium transition-colors duration-200 hover:text-primary text-gray-800 lg:text-xs lg:px-1.5 lg:py-1 xl:text-sm xl:px-2 xl:py-1 2xl:text-base 2xl:px-3 2xl:py-2"
              >
                {{ item.label }}
                <Icon
                  name="lucide:chevron-down"
                  class="h-4 w-4 transition-transform duration-300"
                  :class="{ 'rotate-180': activeMenus[index] }"
                />
                <span
                  class="absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300"
                  :class="{
                    'w-full': activeMenus[index],
                    'w-0': !activeMenus[index],
                  }"
                />
              </UButton>

              <!-- Overlay para submenús  -->
              <div
                v-if="(item.subItems || item.columns) && activeMenus[index]"
                class="fixed left-0 right-0 bottom-0 top-[5rem] w-screen h-screen bg-black/30 backdrop-blur-sm z-40 transition-all duration-300"
                @mouseenter="closeAllMenus"
              />

              <!-- Submenu para subItems  -->
              <div
                v-if="item.subItems"
                class="absolute top-full left-0 z-50 mt-2 w-64 rounded-lg border border-gray-200 bg-white p-4 shadow-xl transition-all duration-300"
                :class="{
                  'opacity-100 visible translate-y-0': activeMenus[index],
                  'opacity-0 invisible -translate-y-2': !activeMenus[index],
                }"
              >
                <!-- Flecha del submenu -->
                <div
                  class="absolute -top-2 left-4 h-4 w-4 rotate-45 border-t border-l border-gray-200 bg-white"
                ></div>

                <!-- Título del submenu  -->
                <div class="mb-3 pb-2 border-b border-gray-100">
                  <h4
                    class="text-sm font-semibold text-gray-900 flex items-center"
                  >
                    <div
                      class="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 mr-2"
                    >
                      <Icon
                        name="lucide:list"
                        class="h-3.5 w-3.5 text-primary"
                      />
                    </div>
                    Opciones disponibles
                  </h4>
                </div>

                <ul class="space-y-2">
                  <li
                    v-for="(subItem, subIndex) in item.subItems"
                    :key="subIndex"
                    class="transition-all duration-200 hover:translate-x-1"
                  >
                    <NuxtLink
                      :to="subItem.url"
                      class="group relative flex items-center gap-2 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:text-primary rounded-md hover:bg-gray-50 px-2"
                      :class="{
                        '': isActiveRoute(subItem.url),
                      }"
                    >
                      <div
                        class="flex h-6 w-6 items-center justify-center rounded-full bg-primary/5"
                      >
                        <Icon
                          :name="getIconForSubItem(subItem.label)"
                          class="h-3.5 w-3.5 flex-shrink-0 text-primary/80"
                        />
                      </div>
                      {{ subItem.label }}
                      <span
                        class="absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300"
                        :class="{
                          'w-full': isActiveRoute(subItem.url),
                          'w-0 group-hover:w-full': !isActiveRoute(subItem.url),
                        }"
                      ></span>
                    </NuxtLink>
                  </li>
                </ul>

                <!-- Pie del submenu  -->
                <div
                  class="mt-3 pt-2 border-t border-gray-100 text-xs text-gray-500 flex justify-between items-center"
                >
                  <span class="italic">Información completa</span>
                  <button
                    class="text-primary hover:underline flex items-center gap-1"
                  >
                    <span>Ayuda</span>
                    <Icon name="lucide:help-circle" class="h-3 w-3" />
                  </button>
                </div>
              </div>

              <!-- Submenu para columns -->
              <div
                v-if="item.columns"
                class="absolute top-full left-1/2 z-50 mt-2 w-[650px] -translate-x-1/2 rounded-lg border border-gray-200 bg-white p-6 shadow-xl transition-all duration-300"
                :class="{
                  'opacity-100 visible translate-y-0': activeMenus[index],
                  'opacity-0 invisible -translate-y-2': !activeMenus[index],
                }"
              >
                <!-- Flecha del submenu -->
                <div
                  class="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-t border-l border-gray-200 bg-white"
                ></div>

                <!-- Título del megamenu  -->
                <div
                  class="mb-4 pb-2 border-b border-gray-100 flex justify-between items-center"
                >
                  <h4
                    class="text-sm font-semibold text-gray-900 flex items-center"
                  >
                    <div
                      class="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 mr-2"
                    >
                      <Icon
                        name="lucide:layout-grid"
                        class="h-3.5 w-3.5 text-primary"
                      />
                    </div>
                    Categorías disponibles
                  </h4>
                  <span class="text-xs text-gray-500"
                    >Información completa</span
                  >
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div
                    v-for="(column, colIndex) in item.columns"
                    :key="colIndex"
                    class="space-y-4"
                  >
                    <h3
                      class="flex items-center gap-2 text-sm font-semibold text-gray-800 border-b border-gray-100 pb-2"
                    >
                      <div
                        class="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10"
                      >
                        <Icon
                          :name="getIconForCategory(column.title)"
                          class="h-3.5 w-3.5 text-primary"
                        />
                      </div>
                      {{ column.title }}
                    </h3>
                    <ul class="space-y-3">
                      <li
                        v-for="(link, linkIndex) in column.links"
                        :key="linkIndex"
                        class="transition-all duration-200 hover:translate-x-1"
                      >
                        <NuxtLink
                          :to="link.url"
                          class="group relative flex items-center gap-2 py-1.5 text-sm text-gray-700 transition-colors duration-200 hover:text-primary rounded-md hover:bg-gray-50 px-2"
                          :class="{
                            'text-primary bg-gray-50': isActiveRoute(link.url),
                          }"
                        >
                          <div
                            class="flex h-5 w-5 items-center justify-center rounded-full bg-primary/5"
                          >
                            <Icon
                              :name="getIconForLink(link.label)"
                              class="h-3 w-3 flex-shrink-0 text-primary/80"
                            />
                          </div>
                          {{ link.label }}
                          <span
                            class="absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300"
                            :class="{
                              'w-full': isActiveRoute(link.url),
                              'w-0 group-hover:w-full': !isActiveRoute(
                                link.url
                              ),
                            }"
                          ></span>
                        </NuxtLink>
                      </li>
                    </ul>
                  </div>
                </div>

                <!-- Pie del megamenu -->
                <div
                  class="mt-4 pt-2 border-t border-gray-100 flex justify-between items-center"
                >
                  <span class="text-xs text-gray-500"
                    >Información detallada</span
                  >
                  <button
                    class="text-primary hover:underline flex items-center gap-1 text-xs"
                  >
                    <span>Centro de ayuda</span>
                    <Icon name="lucide:external-link" class="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </nav>

          <!-- Action Buttons -->
          <div class="hidden items-center lg:flex lg:gap-1 xl:gap-2">
            <UButton
              to="#"
              variant="outline"
              class="relative font-medium transition-colors duration-200 hover:text-primary rounded-full lg:text-xs lg:px-3 lg:py-1 xl:text-sm xl:px-4 xl:py-1.5 2xl:text-sm 2xl:px-5 2xl:py-2"
            >
              Solicita una cita
            </UButton>
            <NuxtLink
              to="/login"
              class="rounded-full border border-gray-400 font-medium transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white lg:text-xs lg:px-3 lg:py-1 xl:text-sm xl:px-4 xl:py-1.5 2xl:text-sm 2xl:px-5 2xl:py-2"
            >
              Iniciar Sesión
            </NuxtLink>
          </div>

          <!-- Mobile Menu Button -->
          <div class="lg:hidden">
            <button
              class="flex h-10 w-10 items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-100"
              @click="toggleMobileMenu"
              aria-label="Toggle menu"
            >
              <div class="relative h-5 w-5 flex items-center justify-center">
                <span
                  class="absolute left-0 h-0.5 w-5 bg-gray-800 transition-all duration-300"
                  :class="{
                    'rotate-45 top-1/2 -translate-y-1/2': isMobileMenuOpen,
                    'top-0': !isMobileMenuOpen,
                  }"
                ></span>
                <span
                  class="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-5 bg-gray-800 transition-all duration-300"
                  :class="{ 'opacity-0': isMobileMenuOpen }"
                ></span>
                <span
                  class="absolute left-0 h-0.5 w-5 bg-gray-800 transition-all duration-300"
                  :class="{
                    '-rotate-45 top-1/2 -translate-y-1/2': isMobileMenuOpen,
                    'top-[calc(100%-2px)]': !isMobileMenuOpen,
                  }"
                ></span>
              </div>
              <span class="sr-only">Toggle menu</span>
            </button>
          </div>
        </div>
      </div>
    </header>
    <div class="h-20" />

    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-10"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-10"
    >
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-0 z-40 top-[5rem] bg-white lg:hidden overflow-y-auto"
      >
        <div class="container mx-auto px-8 sm:px-4 py-6">
          <!-- Barra de búsqueda móvil -->
          <div class="mb-6">
            <div class="relative">
              <input
                type="text"
                placeholder="Buscar..."
                class="w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pl-4 pr-10 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button class="absolute right-3 top-1/2 -translate-y-1/2">
                <Icon name="lucide:search" class="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>

          <nav class="space-y-0">
            <div
              v-for="(item, index) in navigationItems"
              :key="index"
              class="border-b border-gray-100"
            >
              <NuxtLink
                :to="item.url || '#'"
                class="flex items-center justify-between py-4 cursor-pointer"
                @click="
                  item.url ? toggleMobileMenu() : toggleMobileSection(index)
                "
              >
                <span class="text-base font-medium">{{ item.label }}</span>
                <div
                  class="flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <Icon
                    v-if="item.subItems || item.columns"
                    name="lucide:chevron-down"
                    class="h-5 w-5 transition-transform duration-300"
                    :class="{ 'rotate-180': mobileOpenSections[index] }"
                  />
                </div>
              </NuxtLink>

              <!-- Submenu para subItems en móvil  -->
              <transition
                enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="max-h-0 opacity-0"
                enter-to-class="max-h-[500px] opacity-100"
                leave-active-class="transition-all duration-300 ease-in"
                leave-from-class="max-h-[500px] opacity-100"
                leave-to-class="max-h-0 opacity-0"
              >
                <div
                  v-if="item.subItems && mobileOpenSections[index]"
                  class="mb-4 space-y-0 bg-gray-50 rounded-lg overflow-hidden"
                >
                  <NuxtLink
                    v-for="(subItem, subIndex) in item.subItems"
                    :key="subIndex"
                    :to="subItem.url"
                    class="flex items-center gap-2 py-3 px-4 text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors duration-200"
                    :class="{
                      'text-primary bg-gray-100': isActiveRoute(subItem.url),
                    }"
                  >
                    <div
                      class="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10"
                    >
                      <Icon
                        :name="getIconForSubItem(subItem.label)"
                        class="h-3.5 w-3.5 text-primary/80"
                      />
                    </div>
                    {{ subItem.label }}
                  </NuxtLink>
                </div>
              </transition>

              <!-- Submenu para columns en móvil  -->
              <transition
                enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="max-h-0 opacity-0"
                enter-to-class="max-h-[1000px] opacity-100"
                leave-active-class="transition-all duration-300 ease-in"
                leave-from-class="max-h-[1000px] opacity-100"
                leave-to-class="max-h-0 opacity-0"
              >
                <div
                  v-if="item.columns && mobileOpenSections[index]"
                  class="mb-4 bg-gray-50 rounded-lg overflow-hidden"
                >
                  <div
                    v-for="(column, colIndex) in item.columns"
                    :key="colIndex"
                    class="mb-2 px-4 pt-3"
                  >
                    <h3
                      class="mb-2 flex items-center gap-2 font-medium text-sm text-gray-900"
                    >
                      <div
                        class="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10"
                      >
                        <Icon
                          :name="getIconForCategory(column.title)"
                          class="h-3.5 w-3.5 text-primary"
                        />
                      </div>
                      {{ column.title }}
                    </h3>
                    <div class="space-y-0">
                      <NuxtLink
                        v-for="(link, linkIndex) in column.links"
                        :key="linkIndex"
                        :to="link.url"
                        class="flex items-center gap-2 py-2.5 pl-6 text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors duration-200"
                        :class="{
                          'text-primary bg-gray-100': isActiveRoute(link.url),
                        }"
                      >
                        <div
                          class="flex h-5 w-5 items-center justify-center rounded-full bg-primary/5"
                        >
                          <Icon
                            :name="getIconForLink(link.label)"
                            class="h-3 w-3 text-primary/80"
                          />
                        </div>
                        {{ link.label }}
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
          </nav>

          <!-- Mobile Action Buttons -->
          <div class="mt-8 grid grid-cols-1 gap-3">
            <NuxtLink
              to="#"
              class="w-full rounded-lg bg-gray-100 px-4 py-3.5 text-center font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center"
            >
              <Icon name="lucide:calendar" class="h-4 w-4 mr-2" />
              Solicita una cita
            </NuxtLink>
            <NuxtLink
              to="/login"
              class="w-full rounded-lg bg-primary px-4 py-3.5 text-center font-medium text-white hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center"
            >
              <Icon name="lucide:log-in" class="h-4 w-4 mr-2" />
              Iniciar Sesión
            </NuxtLink>
          </div>

          <!-- Información de contacto en móvil -->
          <div class="mt-8 border-t border-gray-100 pt-6">
            <div class="grid grid-cols-1 gap-4">
              <NuxtLink
                to="tel:+123456789"
                class="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors"
              >
                <div
                  class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10"
                >
                  <Icon name="lucide:phone" class="h-4 w-4 text-primary" />
                </div>
                +123 456 789
              </NuxtLink>
              <NuxtLink
                to="mailto:info@example.com"
                class="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors"
              >
                <div
                  class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10"
                >
                  <Icon name="lucide:mail" class="h-4 w-4 text-primary" />
                </div>
                info@example.com
              </NuxtLink>
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <div
                  class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10"
                >
                  <Icon name="lucide:map-pin" class="h-4 w-4 text-primary" />
                </div>
                Calle Principal 123, Ciudad
              </div>
            </div>

            <!-- Redes sociales en móvil -->
            <div class="mt-6 flex items-center gap-3 justify-center">
              <NuxtLink
                to="https://www.facebook.com/OncoclinicBolivia/"
                class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-110"
              >
                <Icon name="lucide:facebook" class="h-5 w-5" />
              </NuxtLink>
              <NuxtLink
                to="#"
                class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-110"
              >
                <Icon name="lucide:twitter" class="h-5 w-5" />
              </NuxtLink>
              <NuxtLink
                to="#"
                class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-110"
              >
                <Icon name="lucide:instagram" class="h-5 w-5" />
              </NuxtLink>
              <NuxtLink
                to="#"
                class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-110"
              >
                <Icon name="lucide:tik" class="h-5 w-5" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import Icon from "@nuxt/ui/runtime/components/Icon.vue";
import { useRoute } from "vue-router";

interface Link {
  label: string;
  url: string;
  isActive?: boolean;
}

interface Column {
  title: string;
  links: Link[];
}

type NavigationItem = {
  label: string;
} & (
  | { url: string; subItems?: never; columns?: never }
  | { subItems: Link[]; url?: never; columns?: never }
  | { columns: Column[]; url?: never; subItems?: never }
);

const navigationItems: NavigationItem[] = [
  {
    label: "Inicio",
    url: "/",
  },
  {
    label: "Nosotros",
    url: "/nosotros",
  },
  {
    label: "Investigación",
    subItems: [
      { label: "Blogs", url: "/blogs" },
      { label: "Publicaciones", url: "/publicaciones" },
    ],
  },
  {
    label: "Nuestros Profesionales",
    url: "/profesionales",
  },
  {
    label: "Tratamientos y Diagnosticos",
    columns: [
      {
        title: "Tratamientos",
        links: [
          {
            label: "Transplante de Medula Osea",
            url: "/tratamientos/transplante-medula-osea",
          },
          { label: "Inmunoterapia", url: "/tratamientos/inmunoterapia" },
          { label: "Quimioterapia", url: "/tratamientos/quimioterapia" },
          {
            label: "Cirugía Oncológica",
            url: "/tratamientos/cirugia-oncologica",
          },
          {
            label: "Quimioterapia Metronómica",
            url: "/tratamientos/quimioterapia-metronomica",
          },
          {
            label: "Terapia Biológica",
            url: "/tratamientos/terapia-biologica",
          },
        ],
      },
      {
        title: "Diagnosticos",
        links: [
          { label: "Guías para Pacientes", url: "/anatomia-patologica" },
          { label: "Videos Informativos", url: "/genetica" },
          { label: "Charlas y Talleres", url: "/biolegia-molecular" },
          { label: "Charlas y Talleres", url: "/inmuno" },
        ],
      },
    ],
  },
  {
    label: "Contacto",
    url: "/contactos",
  },
];

const route = useRoute();
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);
const mobileOpenSections = ref<Record<number, boolean>>({});
const windowWidth = ref(
  typeof window !== "undefined" ? window.innerWidth : 1280
);

// Estado para controlar los menús activos
const activeMenus = ref<Record<number, boolean>>({});
const menuTimeouts = ref<Record<number, number>>({});

// Función para abrir un menú
const openMenu = (index: number): void => {
  // Limpiar cualquier timeout existente para este menú
  if (menuTimeouts.value[index]) {
    clearTimeout(menuTimeouts.value[index]);
  }

  // Activar este menú
  activeMenus.value = {
    ...activeMenus.value,
    [index]: true,
  };
};

// Función para cerrar un menú con retraso
const closeMenuWithDelay = (index: number): void => {
  // Crear un timeout para cerrar el menú después de un breve retraso
  menuTimeouts.value[index] = setTimeout(() => {
    activeMenus.value = {
      ...activeMenus.value,
      [index]: false,
    };
  }, 150) as unknown as number;
};

// Función para cerrar todos los menús
const closeAllMenus = (): void => {
  // Cerrar todos los menús activos
  activeMenus.value = {};
  // Limpiar todos los timeouts pendientes
  Object.keys(menuTimeouts.value).forEach((key) => {
    clearTimeout(menuTimeouts.value[Number(key)]);
  });
};

// Función para comprobar si una ruta está activa
const isActiveRoute = (url: string): boolean => {
  if (!url || url === "#") return false;
  return route.path === url;
};

// Función para alternar secciones móviles
const toggleMobileSection = (index: number): void => {
  mobileOpenSections.value = {
    ...mobileOpenSections.value,
    [index]: !mobileOpenSections.value[index],
  };
};

// Función para alternar el menú móvil con animación
const toggleMobileMenu = (): void => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// Función para manejar el scroll
const handleScroll = (): void => {
  isScrolled.value = window.scrollY > 10;
};

// Función para manejar el cambio de tamaño de la ventana
const handleResize = (): void => {
  windowWidth.value = window.innerWidth;

  // Si la pantalla es grande y el menú móvil está abierto, cerrarlo
  if (windowWidth.value >= 1024 && isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false;
  }
};

// Función para obtener iconos específicos para cada elemento del submenú
const getIconForSubItem = (label: string): string => {
  const iconMap: Record<string, string> = {
    Blogs: "lucide:book-open",
    Publicaciones: "lucide:file-text",
    "Ensayos Clínicos": "lucide:flask-conical",
    "Conferencias Médicas": "lucide:presentation",
    "Guías para Pacientes": "lucide:clipboard-list",
    "Videos Informativos": "lucide:video",
    "Charlas y Talleres": "lucide:users",
  };

  return iconMap[label] || "lucide:file";
};

// Función para obtener iconos específicos para categorías
const getIconForCategory = (title: string): string => {
  const iconMap: Record<string, string> = {
    Tratamientos: "lucide:stethoscope",
    Diagnosticos: "lucide:microscope",
    Investigación: "lucide:flask",
    Educación: "lucide:graduation-cap",
  };

  return iconMap[title] || "lucide:folder";
};

// Función para obtener iconos específicos para enlaces
const getIconForLink = (label: string): string => {
  const iconMap: Record<string, string> = {
    "Ensayos Clínicos": "lucide:flask-conical",
    Publicaciones: "lucide:file-text",
    "Conferencias Médicas": "lucide:presentation",
    "Guías para Pacientes": "lucide:clipboard-list",
    "Videos Informativos": "lucide:video",
    "Charlas y Talleres": "lucide:users",
  };

  return iconMap[label] || "lucide:arrow-right";
};

// Gestión del overflow del body cuando el menú móvil está abierto
watch(isMobileMenuOpen, (newValue) => {
  if (typeof document !== "undefined") {
    document.body.style.overflow = newValue ? "hidden" : "";
  }
});

// Configuración de eventos
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleResize);
  handleScroll();
  handleResize();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", handleResize);
  if (typeof document !== "undefined") {
    document.body.style.overflow = "";
  }

  // Limpiar todos los timeouts pendientes
  Object.keys(menuTimeouts.value).forEach((key) => {
    clearTimeout(menuTimeouts.value[Number(key)]);
  });
});
</script>
<style scoped>
/* Estilos adicionales para mejorar las animaciones */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Mejora para las transiciones de los submenús */
.opacity-100.visible.translate-y-0 {
  transition-delay: 0.1s;
}

/* Efecto de sombra para los submenús */
.absolute.top-full {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

/* Efecto de hover para los elementos de los submenús */
.transition-all.hover\:translate-x-1:hover {
  transform: translateX(0.25rem);
}

/* Mejora para los bordes de los submenús */
.absolute.top-full {
  border-color: rgba(229, 231, 235, 0.8);
}
</style>
