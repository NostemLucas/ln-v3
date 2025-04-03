<template>
  <footer class="w-full">
    <!-- Donation Banner -->
    <div class="bg-[#0F0F2D] px-4 py-8 text-white">
      <div class="mx-auto max-w-7xl">
        <div
          class="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between"
        >
          <div class="flex items-start gap-4 md:items-center">
            <Heart class="h-8 w-8" />
            <div>
              <h2 class="text-xl font-bold">Participa en la campaña de ..</h2>
              <p class="mt-2 max-w-xl text-gray-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
                saepe accusamus sed distinctio. Neque porro odit quos sed
                pariatur accusantium atque nihil, consectetur tempora
                repellendus corporis, dolorum natus ipsam deserunt!
              </p>
            </div>
          </div>
          <button
            class="rounded-md bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700"
          >
            Para Participar
          </button>
        </div>
      </div>
    </div>

    <!-- Main Footer Content -->
    <div class="bg-[#002D5A] px-4 py-12 text-white">
      <div class="mx-auto max-w-7xl">
        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <!-- Quick Links Section -->
          <div class="space-y-4">
            <div
              class="flex items-center gap-2 rounded-md border border-white/20 p-4"
            >
              <Stethoscope class="h-5 w-5" />
              <span class="font-medium">Encuentra un médico</span>
              <ChevronRight class="ml-auto h-5 w-5" />
            </div>
            <div
              class="flex items-center gap-2 rounded-md border border-white/20 p-4"
            >
              <Briefcase class="h-5 w-5" />
              <span class="font-medium">Explora profesiones</span>
              <ChevronRight class="ml-auto h-5 w-5" />
            </div>
            <div
              class="flex items-center gap-2 rounded-md border border-white/20 p-4"
            >
              <Bell class="h-5 w-5" />
              <span class="font-medium">Regístrate para recibir boletines</span>
              <ChevronRight class="ml-auto h-5 w-5" />
            </div>
          </div>

          <!-- Navigation Columns -->
          <div v-for="(section, index) in footerSections" :key="index">
            <h3 class="text-primary-300 mb-4 text-lg font-bold">
              {{ section.title }}
            </h3>
            <ul class="space-y-2">
              <li v-for="(item, itemIndex) in section.items" :key="itemIndex">
                <a
                  :href="item.url"
                  class="text-sm text-gray-300 transition-colors hover:text-white"
                >
                  {{ item.label }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Footer -->
    <div class="bg-[#001F3F] px-4 py-6 text-white">
      <div class="mx-auto max-w-7xl">
        <div
          class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
        >
          <!-- Social Media Links -->
          <div class="flex items-center gap-4">
            <h4 class="text-primary-300 text-sm font-medium">
              Siguenos en nuestras redes:
            </h4>
            <div class="flex gap-3">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.url"
                class="rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20"
                :aria-label="social.name"
              >
                <component :is="social.icon" class="text-primary-300 h-4 w-4" />
              </a>
            </div>
          </div>

          <!-- App Store Buttons -->
          <div class="flex items-center gap-3">
            <a href="#" class="transition-opacity hover:opacity-80">
              <NuxtImg
                src="/logo.png"
                alt="Get it on Google Play"
                class="h-10"
              />
            </a>
          </div>
        </div>

        <!-- Legal Links -->
        <div
          class="mt-8 flex flex-wrap gap-4 border-t border-white/10 pt-6 text-sm text-gray-400"
        >
          <a
            v-for="(link, index) in legalLinks"
            :key="index"
            :href="link.url"
            class="transition-colors hover:text-white"
          >
            {{ link.label }}
          </a>
        </div>

        <!-- Copyright and Language -->
        <div
          class="mt-6 flex flex-col items-start justify-between gap-4 text-sm text-gray-400 md:flex-row md:items-center"
        >
          <p>
            © {{ new Date().getFullYear() }} Oncoclinic Todos los derechos
            reservados.
          </p>
          <div class="flex items-center gap-2">
            <span>Idioma:</span>
            <select class="rounded bg-transparent text-white">
              <option value="es">Español</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import {
  Heart,
  Stethoscope,
  Briefcase,
  Bell,
  ChevronRight,
  Twitter,
  Facebook,
  Youtube,
  Instagram,
  Linkedin,
} from "lucide-vue-next";

const footerSections = [
  {
    title: "Profesionales médicos",
    items: [
      { label: "Nuestros Profesionales", url: "#" },
      { label: "Ensayos clínicos", url: "#" },
      { label: "Nuestra Trayectoria", url: "#" },
      { label: "Para remitir un paciente", url: "#" },
    ],
  },
  {
    title: "Investigaciones",
    items: [
      { label: "Tratamientos", url: "#" },
      { label: "Laboratorios", url: "#" },
      { label: "Ensayos clínicos", url: "#" },
      { label: "Centros de investigación", url: "#" },
    ],
  },
  {
    title: "Estudiantes",
    items: [
      { label: "Requisitos para la admisión", url: "#" },
      { label: "Programas con obtención de título", url: "#" },
      { label: "Portal para estudiantes y profesores", url: "#" },
      { label: "Recursos educativos", url: "#" },
    ],
  },
];

const socialLinks = [
  { name: "Twitter", icon: Twitter, url: "#" },
  { name: "Facebook", icon: Facebook, url: "#" },
  { name: "YouTube", icon: Youtube, url: "#" },
  { name: "Instagram", icon: Instagram, url: "#" },
  { name: "LinkedIn", icon: Linkedin, url: "#" },
];

const legalLinks = [
  { label: "Términos y condiciones", url: "#" },
  { label: "Política de privacidad", url: "#" },
  { label: "Aviso sobre las prácticas de privacidad", url: "#" },
  { label: "Aviso sobre no discriminación", url: "#" },
  { label: "Declaración de accesibilidad", url: "#" },
  { label: "Política de publicidad y patrocinio", url: "#" },
  { label: "Mapa del sitio", url: "#" },
];
</script>
