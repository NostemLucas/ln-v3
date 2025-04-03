<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-[#051C39]/90 px-4"
    >
      <div
        class="relative max-h-[90vh] w-full max-w-md overflow-auto rounded-lg border border-[#205295]/30 bg-[#0A2647] p-6 shadow-xl"
      >
        <button
          class="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:bg-[#144272] hover:text-white"
          @click="$emit('close')"
        >
          <Icon icon="mdi:close" class="h-5 w-5" />
        </button>

        <div class="mb-6 text-center">
          <div
            class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-md bg-[#3A97D4]"
          >
            <Icon icon="mdi:calendar-star" class="h-8 w-8 text-white" />
          </div>
          <h3 class="text-xl font-semibold text-white">
            Inscripción al Evento
          </h3>
          <p class="mt-2 text-sm text-gray-300">
            Jornada de Puertas Abiertas - 15 de Mayo, 2025
          </p>
        </div>

        <div class="mb-6">
          <label class="mb-2 block text-xs font-medium text-gray-300"
            >Información personal</label
          >
          <div class="space-y-3">
            <input
              v-model="name"
              type="text"
              class="w-full rounded-md border border-[#205295]/30 bg-[#144272]/20 px-4 py-2 text-sm text-white placeholder-gray-400 focus:border-[#3A97D4] focus:outline-none focus:ring-1 focus:ring-[#3A97D4]/50"
              placeholder="Nombre completo"
            />
            <input
              v-model="email"
              type="email"
              class="w-full rounded-md border border-[#205295]/30 bg-[#144272]/20 px-4 py-2 text-sm text-white placeholder-gray-400 focus:border-[#3A97D4] focus:outline-none focus:ring-1 focus:ring-[#3A97D4]/50"
              placeholder="Correo electrónico"
            />
            <input
              v-model="phone"
              type="tel"
              class="w-full rounded-md border border-[#205295]/30 bg-[#144272]/20 px-4 py-2 text-sm text-white placeholder-gray-400 focus:border-[#3A97D4] focus:outline-none focus:ring-1 focus:ring-[#3A97D4]/50"
              placeholder="Teléfono"
            />
          </div>
        </div>

        <div class="mb-6">
          <label class="mb-2 block text-xs font-medium text-gray-300"
            >Seleccione las actividades de interés</label
          >
          <div class="space-y-2">
            <div
              v-for="(activity, index) in activities"
              :key="index"
              class="flex items-start gap-2"
            >
              <input
                :id="`activity-${index}`"
                v-model="selectedActivities"
                :value="activity"
                type="checkbox"
                class="mt-0.5 h-4 w-4 rounded border-[#205295] bg-[#144272]/20 text-[#3A97D4] focus:ring-[#3A97D4]/50"
              />
              <label :for="`activity-${index}`" class="text-xs text-gray-300">
                {{ activity }}
              </label>
            </div>
          </div>
        </div>

        <div class="mb-6 flex items-start gap-2">
          <input
            v-model="acceptTerms"
            type="checkbox"
            id="terms"
            class="mt-0.5 h-4 w-4 rounded border-[#205295] bg-[#144272]/20 text-[#3A97D4] focus:ring-[#3A97D4]/50"
          />
          <label for="terms" class="text-xs text-gray-300">
            Acepto recibir información sobre este y futuros eventos
          </label>
        </div>

        <button
          class="w-full rounded-md bg-[#3A97D4] py-2.5 text-sm font-medium text-white transition-all hover:bg-[#2980B9] focus:outline-none focus:ring-2 focus:ring-[#3A97D4]/50"
          @click="register"
        >
          Confirmar Inscripción
        </button>

        <p class="mt-4 text-center text-xs text-gray-400">
          Recibirá un correo electrónico con la confirmación de su inscripción.
        </p>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const emit = defineEmits(["close", "register"]);

const name = ref("");
const email = ref("");
const phone = ref("");
const acceptTerms = ref(false);
const selectedActivities = ref<string[]>([]);

const activities = [
  "Visita guiada a las instalaciones",
  "Charla sobre prevención del cáncer",
  "Taller de nutrición oncológica",
  "Consulta informativa con especialistas",
  "Demostración de equipos médicos",
];

const register = () => {
  if (!name.value || !email.value || !phone.value) {
    return;
  }

  if (!validateEmail(email.value)) {
    return;
  }

  if (!acceptTerms.value) {
    return;
  }

  emit("register", {
    name: name.value,
    email: email.value,
    phone: phone.value,
    activities: selectedActivities.value,
    acceptTerms: acceptTerms.value,
  });

  // Resetear formulario
  name.value = "";
  email.value = "";
  phone.value = "";
  selectedActivities.value = [];
  acceptTerms.value = false;

  // Cerrar modal
  emit("close");
};

const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};
</script>
