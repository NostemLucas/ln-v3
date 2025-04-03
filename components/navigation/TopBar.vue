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
              />
            </NuxtLink>
          </div>

          <!-- Desktop Navigation -->
          <nav class="hidden lg:flex lg:items-center lg:gap-2">
            <div
              v-for="(item, index) in navigationItems"
              :key="index"
              class="group relative"
            >
              <!-- Botón con submenú -->
              <UButton
                variant="link"
                v-if="item.subItems"
                class="flex items-center gap-1.5 font-medium transition-colors duration-200 hover:text-primary text-base text-gray-800 tracking-wider"
              >
                {{ item.label }}
                <Icon
                  name="lucide:chevron-down"
                  class="h-4 w-4 transition-transform duration-300 group-hover:rotate-180"
                />
                <span
                  class="absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 w-0 group-hover:w-full"
                />
              </UButton>

              <!-- Enlace con url -->
              <UButton
                v-else-if="item.url"
                variant="link"
                :to="item.url || '#'"
                class="group relative font-medium transition-colors duration-200 hover:text-primary text-base text-gray-800 tracking-wide"
                :class="{ 'text-primary': isActiveRoute(item.url) }"
              >
                {{ item.label }}
                <span
                  class="absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300"
                  :class="{
                    'w-full': isActiveRoute(item.url),
                    'w-0 group-hover:w-full': !isActiveRoute(item.url),
                  }"
                />
              </UButton>

              <!-- Botón con columnas -->
              <UButton
                variant="link"
                v-else-if="item.columns"
                class="flex items-center gap-1.5 font-medium transition-colors duration-200 hover:text-primary text-base text-gray-800"
              >
                {{ item.label }}
                <Icon
                  name="lucide:chevron-down"
                  class="h-4 w-4 transition-transform duration-300 group-hover:rotate-180"
                />
                <span
                  class="absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 w-0 group-hover:w-full"
                />
              </UButton>

              <!-- Overlay para submenús (corregido para que aparezca debajo del topbar) -->
              <div
                v-if="item.subItems || item.columns"
                class="fixed left-0 right-0 bottom-0 top-[5rem] bg-black/10 backdrop-blur-sm z-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
              ></div>

              <!-- Submenu para subItems (mejorado) -->
              <div
                v-if="item.subItems"
                class="absolute top-full left-0 z-50 mt-2 w-64 rounded-lg border border-gray-200 bg-white p-4 shadow-xl transition-all duration-300 opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0"
              >
                <!-- Flecha del submenu -->
                <div
                  class="absolute -top-2 left-4 h-4 w-4 rotate-45 border-t border-l border-gray-200 bg-white"
                ></div>

                <ul class="space-y-2">
                  <li
                    v-for="(subItem, subIndex) in item.subItems"
                    :key="subIndex"
                  >
                    <NuxtLink
                      :to="subItem.url"
                      class="group relative flex items-center gap-2 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:text-primary"
                      :class="{ 'text-primary': isActiveRoute(subItem.url) }"
                    >
                      <Icon
                        name="lucide:file-text"
                        class="h-4 w-4 flex-shrink-0 text-primary/70"
                      />
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
              </div>

              <!-- Submenu para columns (mejorado) -->
              <div
                v-if="item.columns"
                class="absolute top-full left-1/2 z-50 mt-2 w-[650px] -translate-x-1/2 rounded-lg border border-gray-200 bg-white p-8 shadow-xl transition-all duration-300 opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0"
              >
                <!-- Flecha del submenu -->
                <div
                  class="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-t border-l border-gray-200 bg-white"
                ></div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div
                    v-for="(column, colIndex) in item.columns"
                    :key="colIndex"
                    class="space-y-4"
                  >
                    <h3
                      class="flex items-center gap-2 text-sm font-semibold text-gray-800 border-b border-gray-100 pb-2"
                    >
                      <Icon name="lucide:folder" class="h-4 w-4 text-primary" />
                      {{ column.title }}
                    </h3>
                    <ul class="space-y-3">
                      <li
                        v-for="(link, linkIndex) in column.links"
                        :key="linkIndex"
                      >
                        <NuxtLink
                          :to="link.url"
                          class="group relative flex items-center gap-2 py-1 text-sm text-gray-700 transition-colors duration-200 hover:text-primary"
                          :class="{
                            'text-primary': isActiveRoute(link.url),
                          }"
                        >
                          <Icon
                            name="lucide:arrow-right"
                            class="h-3.5 w-3.5 flex-shrink-0 text-primary/70"
                          />
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
              </div>
            </div>
          </nav>

          <!-- Action Buttons (removed icons except where necessary) -->
          <div class="hidden items-center gap-5 lg:flex">
            <NuxtLink
              href="#"
              class="group relative text-sm font-medium transition-colors duration-200 hover:text-primary"
            >
              Solicita una cita
              <span
                class="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"
              ></span>
            </NuxtLink>
            <NuxtLink
              href="/login"
              class="rounded-full border border-gray-400 px-5 py-2 text-sm font-medium transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white"
            >
              Iniciar Sesión
            </NuxtLink>
          </div>

          <!-- Mobile Menu Button -->
          <div class="lg:hidden">
            <button
              class="flex h-10 w-10 items-center justify-center rounded-full p-0 transition-colors hover:bg-gray-100"
              @click="isMobileMenuOpen = !isMobileMenuOpen"
            >
              <Icon
                v-if="!isMobileMenuOpen"
                name="lucide:menu"
                class="h-5 w-5"
              />
              <Icon v-else name="lucide:x" class="h-5 w-5" />
              <span class="sr-only">Toggle menu</span>
            </button>
          </div>
        </div>
      </div>
    </header>
    <div class="h-24" />

    <!-- Mobile Menu (mejorado) -->
    <div
      v-if="isMobileMenuOpen"
      class="fixed inset-0 z-40 top-[5rem] bg-white lg:hidden overflow-y-auto"
    >
      <div class="container mx-auto px-4 py-6">
        <!-- Barra de búsqueda móvil (nueva) -->
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
            <div
              class="flex items-center justify-between py-4 cursor-pointer"
              @click="toggleMobileSection(index)"
            >
              <span class="text-base font-medium">{{ item.label }}</span>
              <Icon
                v-if="item.subItems || item.columns"
                name="lucide:chevron-down"
                class="h-5 w-5 transition-transform duration-300"
                :class="{ 'rotate-180': mobileOpenSections[index] }"
              />
            </div>

            <!-- Submenu para subItems en móvil (mejorado) -->
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
                <Icon name="lucide:file-text" class="h-4 w-4 text-primary/70" />
                {{ subItem.label }}
              </NuxtLink>
            </div>

            <!-- Submenu para columns en móvil (mejorado) -->
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
                  <Icon name="lucide:folder" class="h-4 w-4 text-primary" />
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
                    <Icon
                      name="lucide:arrow-right"
                      class="h-3.5 w-3.5 text-primary/70"
                    />
                    {{ link.label }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <!-- Mobile Action Buttons (mejorado) -->
        <div class="mt-8 grid grid-cols-1 gap-3">
          <a
            href="#"
            class="w-full rounded-lg bg-gray-100 px-4 py-3.5 text-center font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center"
          >
            <Icon name="lucide:calendar" class="h-4 w-4 mr-2" />
            Solicita una cita
          </a>
          <a
            href="#"
            class="w-full rounded-lg bg-primary px-4 py-3.5 text-center font-medium text-white hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center"
          >
            <Icon name="lucide:log-in" class="h-4 w-4 mr-2" />
            Iniciar Sesión
          </a>
        </div>

        <!-- Información de contacto en móvil (nueva) -->
        <div class="mt-8 border-t border-gray-100 pt-6">
          <div class="grid grid-cols-1 gap-4">
            <a
              href="tel:+123456789"
              class="flex items-center gap-2 text-sm text-gray-600"
            >
              <Icon name="lucide:phone" class="h-4 w-4 text-primary" />
              +123 456 789
            </a>
            <a
              href="mailto:info@example.com"
              class="flex items-center gap-2 text-sm text-gray-600"
            >
              <Icon name="lucide:mail" class="h-4 w-4 text-primary" />
              info@example.com
            </a>
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <Icon name="lucide:map-pin" class="h-4 w-4 text-primary" />
              Calle Principal 123, Ciudad
            </div>
          </div>

          <!-- Redes sociales en móvil (nueva) -->
          <div class="mt-4 flex items-center gap-4">
            <a
              href="#"
              class="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-primary hover:text-white transition-colors duration-200"
            >
              <Icon name="lucide:facebook" class="h-4 w-4" />
            </a>
            <a
              href="#"
              class="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-primary hover:text-white transition-colors duration-200"
            >
              <Icon name="lucide:twitter" class="h-4 w-4" />
            </a>
            <a
              href="#"
              class="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-primary hover:text-white transition-colors duration-200"
            >
              <Icon name="lucide:instagram" class="h-4 w-4" />
            </a>
            <a
              href="#"
              class="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-primary hover:text-white transition-colors duration-200"
            >
              <Icon name="lucide:linkedin" class="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from "@nuxt/ui/runtime/components/Icon.vue";
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";

interface Link {
  label: string;
  url: string;
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
      { label: "Blogs", url: "/" },
      { label: "Publicaciones", url: "/" },
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
          { label: "Ensayos Clínicos", url: "/" },
          { label: "Publicaciones", url: "/" },
          { label: "Conferencias Médicas", url: "/" },
        ],
      },
      {
        title: "Diagnosticos",
        links: [
          { label: "Guías para Pacientes", url: "/" },
          { label: "Videos Informativos", url: "/" },
          { label: "Charlas y Talleres", url: "/" },
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

const isActiveRoute = (url: string): boolean => {
  if (!url || url === "#") return false;
  return route.path === url;
};

const toggleMobileSection = (index: number): void => {
  mobileOpenSections.value = {
    ...mobileOpenSections.value,
    [index]: !mobileOpenSections.value[index],
  };
};

const handleScroll = (): void => {
  isScrolled.value = window.scrollY > 10;
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
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  if (typeof document !== "undefined") {
    document.body.style.overflow = "";
  }
});
</script>
