<template>
  <footer class="font-sans">
    <!-- Selector de Banner -->
    <div v-if="currentBanner === 'research'" key="research">
      <ResearchBanner
        :donors-count="donorsCount"
        @show-modal="showDonationModal = true"
      />
    </div>

    <div v-else-if="currentBanner === 'event'" key="event">
      <EventBanner @show-modal="showEventModal = true" />
    </div>
    <div v-else-if="currentBanner === 'donation'" key="donation">
      <DonationBanner @show-modal="showDonationModal = true" />
    </div>
    <div v-else-if="currentBanner === 'surgery'" key="surgery">
      <SurgeryBanner @show-modal="showSurgeryModal = true" />
    </div>

    <!-- Contenido Principal del Footer -->
    <div class="bg-[#0A2647] px-4 py-12 text-white">
      <div class="mx-auto max-w-7xl">
        <div
          class="mb-12 flex flex-col items-center justify-between gap-6 border-b border-[#205295]/30 pb-8 md:flex-row"
        >
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-auto items-center justify-center rounded-md"
            >
              <img
                src="/logo.png"
                alt="Logo"
                class="h-auto w-auto max-h-12 max-w-[180px] sm:max-w-[240px] filter invert mix-blend-lighten"
              />
            </div>
          </div>
          <div class="flex flex-wrap items-center gap-1">
            <a
              v-for="link in mainLinks"
              :key="link.label"
              :href="link.url"
              class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-[#205295]/20 hover:text-white"
            >
              {{ link.label }}
            </a>
          </div>
        </div>

        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div class="space-y-4">
            <h3
              class="mb-5 text-sm font-semibold uppercase tracking-wider text-[#2C74B3]"
            >
              Acceso Rápido
            </h3>
            <div
              v-for="(quickLink, index) in quickLinks"
              :key="index"
              class="group cursor-pointer rounded-md border border-[#205295]/20 bg-[#144272]/20 p-3 transition-all hover:border-[#2C74B3]/40 hover:bg-[#144272]/30"
              @click="navigateTo(quickLink.url)"
            >
              <div class="flex items-center gap-3">
                <Icon :icon="quickLink.icon" class="h-5 w-5 text-[#2C74B3]" />
                <span class="text-sm font-medium">{{ quickLink.label }}</span>
                <Icon
                  icon="mdi:chevron-right"
                  class="ml-auto h-4 w-4 text-[#2C74B3] transition-transform group-hover:translate-x-1"
                />
              </div>
            </div>
          </div>

          <div
            v-for="(section, index) in footerSections"
            :key="index"
            class="px-1"
          >
            <h3
              class="mb-5 text-sm font-semibold uppercase tracking-wider text-[#2C74B3]"
            >
              {{ section.title }}
            </h3>
            <ul class="space-y-2.5">
              <li v-for="(item, itemIndex) in section.items" :key="itemIndex">
                <a
                  :href="item.url"
                  class="flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-white"
                >
                  <Icon
                    icon="mdi:chevron-right"
                    class="h-3.5 w-3.5 text-[#2C74B3]"
                  />
                  {{ item.label }}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          class="mt-12 grid gap-6 rounded-lg border border-[#205295]/20 bg-[#144272]/10 p-6 md:grid-cols-2"
        >
          <div class="rounded-md bg-[#0A2647]/50 p-4">
            <h3 class="text-lg font-semibold text-white">Contacto</h3>
            <div class="mt-4 space-y-3">
              <div class="flex items-start gap-3">
                <Icon
                  icon="mdi:map-marker"
                  class="mt-0.5 h-5 w-5 text-[#2C74B3]"
                />
                <div>
                  <p class="text-sm text-gray-200">
                    Avenida Costanería entre calles 5 y 6
                  </p>
                  <p class="text-sm text-gray-200">Nro 71 La Paz, Bolivia</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <Icon icon="mdi:phone" class="h-5 w-5 text-[#2C74B3]" />
                <p class="text-sm text-gray-200">+34 91 123 45 67</p>
              </div>
              <div class="flex items-center gap-3">
                <Icon icon="mdi:email-outline" class="h-5 w-5 text-[#2C74B3]" />
                <p class="text-sm text-gray-200">info@oncoclinic.com</p>
              </div>
            </div>
          </div>
          <div class="rounded-md bg-[#0A2647]/50 p-4">
            <h3 class="text-lg font-semibold text-white">
              Suscríbase a nuestro boletín
            </h3>
            <p class="mt-2 text-sm text-gray-300">
              Manténgase informado sobre los últimos avances en investigación
              oncológica.
            </p>
            <div class="mt-4 flex flex-col gap-3 sm:flex-row">
              <input
                v-model="emailSubscription"
                type="email"
                placeholder="Su correo electrónico"
                class="w-full rounded-md border border-[#205295]/30 bg-[#0A2647]/70 px-4 py-2 text-sm text-white placeholder-gray-400 focus:border-[#2C74B3] focus:outline-none focus:ring-1 focus:ring-[#2C74B3]/50"
              />
              <button
                class="whitespace-nowrap rounded-md bg-[#2C74B3] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#205295] focus:outline-none focus:ring-2 focus:ring-[#2C74B3]/50"
                @click="subscribeToNewsletter"
              >
                Suscribirse
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Inferior -->
    <div class="bg-[#051C39] px-4 py-6 text-white">
      <div class="mx-auto max-w-7xl">
        <div
          class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
        >
          <div class="flex items-center gap-4">
            <h4
              class="text-xs font-medium uppercase tracking-wider text-[#2C74B3]"
            >
              Redes sociales:
            </h4>
            <div class="flex gap-2">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.url"
                class="group flex h-8 w-8 items-center justify-center rounded-md bg-[#144272]/50 transition-all hover:bg-[#2C74B3]"
                :aria-label="social.name"
              >
                <Icon
                  :icon="social.icon"
                  class="h-4 w-4 text-gray-300 transition-colors group-hover:text-white"
                />
              </a>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <span
              class="text-xs font-medium uppercase tracking-wider text-[#2C74B3]"
              >Certificaciones:</span
            >
            <div class="flex items-center gap-3">
              <div
                class="flex h-10 items-center justify-center rounded-md bg-[#0A2647] px-3 shadow-inner"
              >
                <Icon
                  icon="mdi:certificate"
                  class="mr-2 h-4 w-4 text-[#2C74B3]"
                />
                <span class="text-xs text-gray-300">ISO 9001</span>
              </div>
              <div
                class="flex h-10 items-center justify-center rounded-md bg-[#0A2647] px-3 shadow-inner"
              >
                <Icon
                  icon="mdi:shield-check"
                  class="mr-2 h-4 w-4 text-[#2C74B3]"
                />
                <span class="text-xs text-gray-300">AENOR</span>
              </div>
            </div>
          </div>
        </div>

        <div
          class="mt-8 flex flex-wrap gap-4 border-t border-[#205295]/20 pt-6"
        >
          <a
            v-for="(link, index) in legalLinks"
            :key="index"
            :href="link.url"
            class="text-xs text-gray-400 transition-colors hover:text-white"
          >
            {{ link.label }}
          </a>
        </div>

        <div
          class="mt-6 flex flex-col items-start justify-between gap-4 text-xs text-gray-400 md:flex-row md:items-center"
        >
          <p>© {{ currentYear }} Oncoclinic. Todos los derechos reservados.</p>
          <div class="flex items-center gap-2">
            <span>Idioma:</span>
            <select
              v-model="selectedLanguage"
              class="cursor-pointer rounded-md border border-[#205295]/30 bg-[#0A2647]/70 px-2 py-1 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#2C74B3]"
              @change="changeLanguage"
            >
              <option
                v-for="lang in languages"
                :key="lang.code"
                :value="lang.code"
              >
                {{ lang.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Modales -->
    <DonationModal
      v-if="showDonationModal"
      :donation-amounts="donationAmounts"
      @close="showDonationModal = false"
      @process="processDonation"
    />

    <EventModal
      v-if="showEventModal"
      @close="showEventModal = false"
      @register="registerForEvent"
    />

    <SurgeryModal
      v-if="showSurgeryModal"
      @close="showSurgeryModal = false"
      @submit="submitSurgeryForm"
    />

    <!-- Toast de Notificación -->
    <div
      v-if="showToast"
      class="fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-md border border-[#205295]/30 bg-[#0A2647] px-4 py-3 text-white shadow-lg"
    >
      <Icon icon="mdi:check-circle" class="h-5 w-5 text-[#2C74B3]" />
      <span class="text-sm">{{ toastMessage }}</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Icon } from "@iconify/vue";
import ResearchBanner from "@/components/banners/ResearchBanner.vue";
import EventBanner from "@/components/banners/EventBanner.vue";
import DonationBanner from "@/components/banners/DonationBanner.vue";
import SurgeryBanner from "@/components/banners/SurgeryBanner.vue";
import DonationModal from "@/components/modals/DonationModal.vue";
import EventModal from "@/components/modals/EventModal.vue";
import SurgeryModal from "@/components/modals/SurgeryModal.vue";

// Tipos
interface FooterSection {
  title: string;
  items: { label: string; url: string }[];
}

interface SocialLink {
  name: string;
  icon: string;
  url: string;
}

interface QuickLink {
  label: string;
  icon: string;
  url: string;
}

interface Language {
  code: string;
  name: string;
}

// Estado reactivo
const emailSubscription = ref("");
const selectedLanguage = ref("es");
const showDonationModal = ref(false);
const showEventModal = ref(false);
const showSurgeryModal = ref(false);
const showToast = ref(false);
const toastMessage = ref("");
const donorsCount = ref(1247);

// Tipo de banner actual (puede cambiarse dinámicamente)
const currentBanner = ref("research"); // Opciones: research, event, donation, surgery

// Año actual para el copyright
const currentYear = computed(() => new Date().getFullYear());

// Datos del footer
const mainLinks = [
  { label: "Inicio", url: "#" },
  { label: "Sobre Nosotros", url: "#" },
  { label: "Servicios", url: "#" },
  { label: "Especialidades", url: "#" },
  { label: "Investigación", url: "#" },
  { label: "Contacto", url: "#" },
];

const quickLinks: QuickLink[] = [
  {
    label: "Buscar especialista",
    icon: "mdi:doctor",
    url: "/find-doctor",
  },
  { label: "Solicitar cita", icon: "mdi:calendar-clock", url: "/appointments" },
  {
    label: "Portal del paciente",
    icon: "mdi:account-details",
    url: "/patient-portal",
  },
  {
    label: "Centros médicos",
    icon: "mdi:hospital-building",
    url: "/locations",
  },
  { label: "Línea de atención", icon: "mdi:phone", url: "/contact" },
];

const footerSections: FooterSection[] = [
  {
    title: "Especialidades",
    items: [
      { label: "Oncología médica", url: "#" },
      { label: "Oncología radioterápica", url: "#" },
      { label: "Hematología oncológica", url: "#" },
      { label: "Cirugía oncológica", url: "#" },
      { label: "Medicina de precisión", url: "#" },
    ],
  },
  {
    title: "Investigación",
    items: [
      { label: "Ensayos clínicos", url: "#" },
      { label: "Laboratorio molecular", url: "#" },
      { label: "Publicaciones científicas", url: "#" },
      { label: "Colaboraciones internacionales", url: "#" },
      { label: "Becas y formación", url: "#" },
    ],
  },
  {
    title: "Pacientes",
    items: [
      { label: "Información para pacientes", url: "#" },
      { label: "Tratamientos disponibles", url: "#" },
      { label: "Apoyo psicológico", url: "#" },
      { label: "Preguntas frecuentes", url: "#" },
      { label: "Testimonios", url: "#" },
    ],
  },
];

const socialLinks: SocialLink[] = [
  { name: "Twitter", icon: "mdi:twitter", url: "#" },
  { name: "Facebook", icon: "mdi:facebook", url: "#" },
  { name: "LinkedIn", icon: "mdi:linkedin", url: "#" },
  { name: "YouTube", icon: "mdi:youtube", url: "#" },
  { name: "Instagram", icon: "mdi:instagram", url: "#" },
];

const legalLinks = [
  { label: "Términos y condiciones", url: "#" },
  { label: "Política de privacidad", url: "#" },
  { label: "Protección de datos", url: "#" },
  { label: "Política de cookies", url: "#" },
  { label: "Aviso legal", url: "#" },
  { label: "Accesibilidad", url: "#" },
];

const languages: Language[] = [
  { code: "es", name: "Español" },
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
];

const donationAmounts = [50, 100, 250];

// Métodos
const navigateTo = (url: string) => {
  console.log(`Navegando a: ${url}`);
  // Aquí iría la lógica de navegación real
  window.location.href = url;
};

const subscribeToNewsletter = () => {
  if (!emailSubscription.value || !validateEmail(emailSubscription.value)) {
    showToastMessage("Por favor, introduzca un correo electrónico válido");
    return;
  }

  // Aquí iría la lógica para guardar la suscripción
  console.log(`Suscrito: ${emailSubscription.value}`);
  showToastMessage("Gracias por suscribirse a nuestro boletín informativo");
  emailSubscription.value = "";
};

const changeLanguage = () => {
  // Aquí iría la lógica para cambiar el idioma
  console.log(`Idioma cambiado a: ${selectedLanguage.value}`);
  showToastMessage(
    `Idioma cambiado a: ${
      languages.find((l) => l.code === selectedLanguage.value)?.name
    }`
  );
};

const processDonation = (data: any) => {
  // Incrementar contador de donantes
  donorsCount.value++;

  // Mostrar mensaje
  showToastMessage("Gracias por su colaboración");
};

const registerForEvent = (data: any) => {
  showToastMessage("Gracias por registrarse al evento");
};

const submitSurgeryForm = (data: any) => {
  showToastMessage(
    "Su solicitud ha sido recibida. Nos pondremos en contacto con usted."
  );
};

const showToastMessage = (message: string) => {
  toastMessage.value = message;
  showToast.value = true;

  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Función para cambiar el banner (puede ser llamada desde un botón o automáticamente)
const changeBanner = (type: string) => {
  currentBanner.value = type;
};

// Para demostración, cambiar el banner cada 10 segundos
// Descomenta esto para activar la rotación automática

onMounted(() => {
  const banners = ["research", "event", "donation", "surgery"];
  let index = 0;

  setInterval(() => {
    index = (index + 1) % banners.length;
    currentBanner.value = banners[index];
  }, 10000);
});
</script>

<style scoped>
/* Estilos para el scrollbar personalizado */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(20, 66, 114, 0.1);
  border-radius: 6px;
}

::-webkit-scrollbar-thumb {
  background: rgba(44, 116, 179, 0.3);
  border-radius: 6px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(44, 116, 179, 0.5);
}

/* Transiciones suaves */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
