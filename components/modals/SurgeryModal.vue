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
            class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-md bg-[#F39C12]"
          >
            <Icon icon="medical-icon:i-surgery" class="h-8 w-8 text-white" />
          </div>
          <h3 class="text-xl font-semibold text-white">
            Programa de Cirugías Solidarias
          </h3>
          <p class="mt-2 text-sm text-gray-300">
            Solicite información o evaluación para el programa
          </p>
        </div>

        <div class="mb-6">
          <label class="mb-2 block text-xs font-medium text-gray-300"
            >Información del paciente</label
          >
          <div class="space-y-3">
            <input
              v-model="patientName"
              type="text"
              class="w-full rounded-md border border-[#205295]/30 bg-[#144272]/20 px-4 py-2 text-sm text-white placeholder-gray-400 focus:border-[#F39C12] focus:outline-none focus:ring-1 focus:ring-[#F39C12]/50"
              placeholder="Nombre del paciente"
            />
            <input
              v-model="patientAge"
              type="number"
              class="w-full rounded-md border border-[#205295]/30 bg-[#144272]/20 px-4 py-2 text-sm text-white placeholder-gray-400 focus:border-[#F39C12] focus:outline-none focus:ring-1 focus:ring-[#F39C12]/50"
              placeholder="Edad"
              min="0"
              max="120"
            />
            <select
              v-model="surgeryType"
              class="w-full rounded-md border border-[#205295]/30 bg-[#144272]/20 px-4 py-2 text-sm text-white placeholder-gray-400 focus:border-[#F39C12] focus:outline-none focus:ring-1 focus:ring-[#F39C12]/50"
            >
              <option value="" disabled selected>
                Tipo de cirugía requerida
              </option>
              <option
                v-for="(type, index) in surgeryTypes"
                :key="index"
                :value="type"
              >
                {{ type }}
              </option>
            </select>
          </div>
        </div>

        <div class="mb-6">
          <label class="mb-2 block text-xs font-medium text-gray-300"
            >Información de contacto</label
          >
          <div class="space-y-3">
            <input
              v-model="contactName"
              type="text"
              class="w-full rounded-md border border-[#205295]/30 bg-[#144272]/20 px-4 py-2 text-sm text-white placeholder-gray-400 focus:border-[#F39C12] focus:outline-none focus:ring-1 focus:ring-[#F39C12]/50"
              placeholder="Nombre del contacto"
            />
            <input
              v-model="contactEmail"
              type="email"
              class="w-full rounded-md border border-[#205295]/30 bg-[#144272]/20 px-4 py-2 text-sm text-white placeholder-gray-400 focus:border-[#F39C12] focus:outline-none focus:ring-1 focus:ring-[#F39C12]/50"
              placeholder="Correo electrónico"
            />
            <input
              v-model="contactPhone"
              type="tel"
              class="w-full rounded-md border border-[#205295]/30 bg-[#144272]/20 px-4 py-2 text-sm text-white placeholder-gray-400 focus:border-[#F39C12] focus:outline-none focus:ring-1 focus:ring-[#F39C12]/50"
              placeholder="Teléfono"
            />
          </div>
        </div>

        <div class="mb-6">
          <label class="mb-2 block text-xs font-medium text-gray-300"
            >Información adicional</label
          >
          <textarea
            v-model="additionalInfo"
            rows="3"
            class="w-full rounded-md border border-[#205295]/30 bg-[#144272]/20 px-4 py-2 text-sm text-white placeholder-gray-400 focus:border-[#F39C12] focus:outline-none focus:ring-1 focus:ring-[#F39C12]/50"
            placeholder="Describa brevemente la situación del paciente"
          ></textarea>
        </div>

        <div class="mb-6 flex items-start gap-2">
          <input
            v-model="acceptPrivacy"
            type="checkbox"
            id="privacy"
            class="mt-0.5 h-4 w-4 rounded border-[#205295] bg-[#144272]/20 text-[#F39C12] focus:ring-[#F39C12]/50"
          />
          <label for="privacy" class="text-xs text-gray-300">
            Acepto la política de privacidad y el tratamiento de mis datos para
            la evaluación de la solicitud
          </label>
        </div>

        <button
          class="w-full rounded-md bg-[#F39C12] py-2.5 text-sm font-medium text-white transition-all hover:bg-[#E67E22] focus:outline-none focus:ring-2 focus:ring-[#F39C12]/50"
          @click="submitForm"
        >
          Enviar Solicitud
        </button>

        <p class="mt-4 text-center text-xs text-gray-400">
          Un miembro de nuestro equipo se pondrá en contacto con usted en un
          plazo de 48 horas.
        </p>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const emit = defineEmits(["close", "submit"]);

const patientName = ref("");
const patientAge = ref<number | null>(null);
const surgeryType = ref("");
const contactName = ref("");
const contactEmail = ref("");
const contactPhone = ref("");
const additionalInfo = ref("");
const acceptPrivacy = ref(false);

const surgeryTypes = [
  "Cirugía oncológica",
  "Cirugía reconstructiva",
  "Cirugía de cataratas",
  "Cirugía ortopédica",
  "Cirugía general",
  "Otra (especificar en información adicional)",
];

const submitForm = () => {
  if (!patientName.value || !patientAge.value || !surgeryType.value) {
    return;
  }

  if (!contactName.value || !contactEmail.value || !contactPhone.value) {
    return;
  }

  if (!validateEmail(contactEmail.value)) {
    return;
  }

  if (!acceptPrivacy.value) {
    return;
  }

  emit("submit", {
    patient: {
      name: patientName.value,
      age: patientAge.value,
      surgeryType: surgeryType.value,
    },
    contact: {
      name: contactName.value,
      email: contactEmail.value,
      phone: contactPhone.value,
    },
    additionalInfo: additionalInfo.value,
  });

  // Resetear formulario
  patientName.value = "";
  patientAge.value = null;
  surgeryType.value = "";
  contactName.value = "";
  contactEmail.value = "";
  contactPhone.value = "";
  additionalInfo.value = "";
  acceptPrivacy.value = false;

  // Cerrar modal
  emit("close");
};

const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};
</script>
