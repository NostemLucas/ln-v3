<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div
      class="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden"
    >
      <div class="p-6 bg-primary text-white">
        <h1 class="text-2xl font-bold">{{ $t("appointmentBooking") }}</h1>
        <p>{{ $t("bookingDescription") }}</p>
      </div>

      <!-- Multi-step form -->
      <div class="p-6">
        <!-- Step indicator -->
        <div class="flex mb-8">
          <div
            v-for="(step, index) in steps"
            :key="index"
            class="flex-1 relative"
          >
            <div
              class="h-2 rounded-full transition-colors duration-300"
              :class="[
                currentStep > index
                  ? 'bg-primary'
                  : currentStep === index
                  ? 'bg-primary-light'
                  : 'bg-gray-200',
              ]"
            ></div>
            <div class="mt-2 text-xs text-center">{{ step }}</div>
          </div>
        </div>

        <!-- Step 1: Personal Information -->
        <div v-if="currentStep === 0">
          <h2 class="text-xl font-semibold mb-4">{{ $t("personalInfo") }}</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{
                $t("fullName")
              }}</label>
              <input
                v-model="patient.name"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                :placeholder="$t('enterFullName')"
              />
              <p v-if="errors.name" class="mt-1 text-sm text-red-600">
                {{ errors.name }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{
                $t("email")
              }}</label>
              <input
                v-model="patient.email"
                type="email"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                :placeholder="$t('enterEmail')"
              />
              <p v-if="errors.email" class="mt-1 text-sm text-red-600">
                {{ errors.email }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{
                $t("phone")
              }}</label>
              <input
                v-model="patient.phone"
                type="tel"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                :placeholder="$t('enterPhone')"
              />
              <p v-if="errors.phone" class="mt-1 text-sm text-red-600">
                {{ errors.phone }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{
                $t("dateOfBirth")
              }}</label>
              <input
                v-model="patient.dateOfBirth"
                type="date"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p v-if="errors.dateOfBirth" class="mt-1 text-sm text-red-600">
                {{ errors.dateOfBirth }}
              </p>
            </div>
          </div>
        </div>

        <!-- Step 2: Medical History -->
        <div v-if="currentStep === 1">
          <h2 class="text-xl font-semibold mb-4">{{ $t("medicalHistory") }}</h2>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">{{
              $t("existingConditions")
            }}</label>
            <textarea
              v-model="patient.medicalHistory.conditions"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              :placeholder="$t('listConditions')"
            ></textarea>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">{{
              $t("medications")
            }}</label>
            <textarea
              v-model="patient.medicalHistory.medications"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              :placeholder="$t('listMedications')"
            ></textarea>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">{{
              $t("allergies")
            }}</label>
            <textarea
              v-model="patient.medicalHistory.allergies"
              rows="2"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              :placeholder="$t('listAllergies')"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">{{
              $t("previousVisits")
            }}</label>
            <div class="flex items-center">
              <input
                v-model="patient.medicalHistory.previousVisit"
                type="checkbox"
                class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <span class="ml-2">{{ $t("visitedBefore") }}</span>
            </div>

            <div v-if="patient.medicalHistory.previousVisit" class="mt-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">{{
                $t("lastVisitDate")
              }}</label>
              <input
                v-model="patient.medicalHistory.lastVisitDate"
                type="date"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        <!-- Step 3: Appointment Selection -->
        <div v-if="currentStep === 2">
          <h2 class="text-xl font-semibold mb-4">
            {{ $t("selectAppointment") }}
          </h2>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">{{
              $t("appointmentType")
            }}</label>
            <select
              v-model="appointment.type"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">{{ $t("selectType") }}</option>
              <option
                v-for="type in appointmentTypes"
                :key="type.id"
                :value="type.id"
              >
                {{ type.name }}
              </option>
            </select>
            <p v-if="errors.appointmentType" class="mt-1 text-sm text-red-600">
              {{ errors.appointmentType }}
            </p>
          </div>

          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-1">{{
              $t("appointmentDate")
            }}</label>
            <input
              v-model="appointment.date"
              type="date"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              :min="minDate"
            />
            <p v-if="errors.appointmentDate" class="mt-1 text-sm text-red-600">
              {{ errors.appointmentDate }}
            </p>
          </div>

          <div v-if="appointment.date && appointment.type">
            <h3 class="text-lg font-medium mb-2">{{ $t("availableSlots") }}</h3>
            <div class="grid grid-cols-3 sm:grid-cols-4 gap-2">
              <button
                v-for="slot in availableSlots"
                :key="slot.id"
                @click="selectTimeSlot(slot)"
                class="px-3 py-2 border rounded-md text-sm transition-colors duration-200"
                :class="[
                  appointment.timeSlot === slot.id
                    ? 'bg-primary text-white border-primary'
                    : 'border-gray-300 hover:bg-gray-50',
                ]"
              >
                {{ slot.time }}
              </button>
            </div>
            <p v-if="errors.timeSlot" class="mt-1 text-sm text-red-600">
              {{ errors.timeSlot }}
            </p>
          </div>
        </div>

        <!-- Step 4: Confirmation -->
        <div v-if="currentStep === 3">
          <h2 class="text-xl font-semibold mb-4">
            {{ $t("confirmAppointment") }}
          </h2>

          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <h3 class="font-medium text-lg mb-2">
              {{ $t("appointmentDetails") }}
            </h3>
            <div class="grid grid-cols-2 gap-2">
              <div class="text-sm text-gray-500">
                {{ $t("appointmentType") }}:
              </div>
              <div class="text-sm">
                {{ getAppointmentTypeName(appointment.type) }}
              </div>

              <div class="text-sm text-gray-500">{{ $t("date") }}:</div>
              <div class="text-sm">{{ formatDate(appointment.date) }}</div>

              <div class="text-sm text-gray-500">{{ $t("time") }}:</div>
              <div class="text-sm">{{ getTimeSlot(appointment.timeSlot) }}</div>
            </div>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg">
            <h3 class="font-medium text-lg mb-2">
              {{ $t("patientInformation") }}
            </h3>
            <div class="grid grid-cols-2 gap-2">
              <div class="text-sm text-gray-500">{{ $t("name") }}:</div>
              <div class="text-sm">{{ patient.name }}</div>

              <div class="text-sm text-gray-500">{{ $t("email") }}:</div>
              <div class="text-sm">{{ patient.email }}</div>

              <div class="text-sm text-gray-500">{{ $t("phone") }}:</div>
              <div class="text-sm">{{ patient.phone }}</div>
            </div>
          </div>

          <div class="mt-4">
            <label class="flex items-center">
              <input
                v-model="agreement"
                type="checkbox"
                class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <span class="ml-2 text-sm">{{ $t("agreementText") }}</span>
            </label>
            <p v-if="errors.agreement" class="mt-1 text-sm text-red-600">
              {{ errors.agreement }}
            </p>
          </div>
        </div>

        <!-- Navigation buttons -->
        <div class="mt-8 flex justify-between">
          <button
            v-if="currentStep > 0"
            @click="prevStep"
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {{ $t("previous") }}
          </button>
          <div v-else></div>

          <button
            v-if="currentStep < steps.length - 1"
            @click="nextStep"
            class="px-4 py-2 bg-primary border border-transparent rounded-md text-sm font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {{ $t("next") }}
          </button>

          <button
            v-else
            @click="submitAppointment"
            class="px-4 py-2 bg-primary border border-transparent rounded-md text-sm font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting">{{ $t("submitting") }}...</span>
            <span v-else>{{ $t("confirmBooking") }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div
      v-if="showSuccessModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <div class="text-center">
          <div
            class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100"
          >
            <svg
              class="h-6 w-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 class="mt-2 text-lg font-medium text-gray-900">
            {{ $t("appointmentConfirmed") }}
          </h3>
          <p class="mt-2 text-sm text-gray-500">
            {{ $t("confirmationMessage") }}
          </p>
          <div class="mt-4">
            <button
              @click="resetForm"
              class="w-full px-4 py-2 bg-primary border border-transparent rounded-md text-sm font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {{ $t("done") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from "vue";

// Types
interface Patient {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  medicalHistory: {
    conditions: string;
    medications: string;
    allergies: string;
    previousVisit: boolean;
    lastVisitDate: string;
  };
}

interface Appointment {
  type: string;
  date: string;
  timeSlot: string;
}

interface AppointmentType {
  id: string;
  name: string;
  duration: number;
}

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface Errors {
  [key: string]: string;
}

// State
const steps = [
  "Información Personal",
  "Historial Médico",
  "Seleccionar Cita",
  "Confirmación",
];
const currentStep = ref(0);
const isSubmitting = ref(false);
const showSuccessModal = ref(false);
const agreement = ref(false);
const errors = reactive<Errors>({});

// Patient information
const patient = reactive<Patient>({
  name: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  medicalHistory: {
    conditions: "",
    medications: "",
    allergies: "",
    previousVisit: false,
    lastVisitDate: "",
  },
});

// Appointment information
const appointment = reactive<Appointment>({
  type: "",
  date: "",
  timeSlot: "",
});

// Mock data for appointment types
const appointmentTypes = [
  { id: "general", name: "Consulta General", duration: 30 },
  { id: "specialist", name: "Especialista", duration: 45 },
  { id: "followup", name: "Seguimiento", duration: 20 },
  { id: "emergency", name: "Urgencia", duration: 60 },
];

// Mock data for available time slots
const mockTimeSlots = [
  { id: "1", time: "09:00", available: true },
  { id: "2", time: "09:30", available: true },
  { id: "3", time: "10:00", available: false },
  { id: "4", time: "10:30", available: true },
  { id: "5", time: "11:00", available: true },
  { id: "6", time: "11:30", available: false },
  { id: "7", time: "12:00", available: true },
  { id: "8", time: "12:30", available: true },
  { id: "9", time: "15:00", available: true },
  { id: "10", time: "15:30", available: true },
  { id: "11", time: "16:00", available: true },
  { id: "12", time: "16:30", available: false },
];

// Computed properties
const minDate = computed(() => {
  const today = new Date();
  return today.toISOString().split("T")[0];
});

const availableSlots = computed(() => {
  // In a real app, this would fetch from an API based on the selected date and appointment type
  return mockTimeSlots.filter((slot) => slot.available);
});

// Methods
const nextStep = () => {
  if (validateCurrentStep()) {
    currentStep.value++;
  }
};

const prevStep = () => {
  currentStep.value--;
};

const validateCurrentStep = () => {
  errors.name = "";
  errors.email = "";
  errors.phone = "";
  errors.dateOfBirth = "";
  errors.appointmentType = "";
  errors.appointmentDate = "";
  errors.timeSlot = "";
  errors.agreement = "";

  if (currentStep.value === 0) {
    if (!patient.name) errors.name = "El nombre es requerido";
    if (!patient.email) {
      errors.email = "El email es requerido";
    } else if (!isValidEmail(patient.email)) {
      errors.email = "Email inválido";
    }
    if (!patient.phone) errors.phone = "El teléfono es requerido";
    if (!patient.dateOfBirth)
      errors.dateOfBirth = "La fecha de nacimiento es requerida";

    return (
      !errors.name && !errors.email && !errors.phone && !errors.dateOfBirth
    );
  }

  if (currentStep.value === 2) {
    if (!appointment.type)
      errors.appointmentType = "Seleccione un tipo de cita";
    if (!appointment.date) errors.appointmentDate = "Seleccione una fecha";
    if (appointment.date && appointment.type && !appointment.timeSlot) {
      errors.timeSlot = "Seleccione un horario disponible";
    }

    return (
      !errors.appointmentType && !errors.appointmentDate && !errors.timeSlot
    );
  }

  if (currentStep.value === 3) {
    if (!agreement.value) {
      errors.agreement = "Debe aceptar los términos para continuar";
      return false;
    }
  }

  return true;
};

const isValidEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const selectTimeSlot = (slot: TimeSlot) => {
  appointment.timeSlot = slot.id;
};

const getAppointmentTypeName = (typeId: string): string => {
  const type = appointmentTypes.find((t) => t.id === typeId);
  return type ? type.name : "";
};

const getTimeSlot = (slotId: string): string => {
  const slot = mockTimeSlots.find((s) => s.id === slotId);
  return slot ? slot.time : "";
};

const formatDate = (dateString: string): string => {
  if (!dateString) return "";

  const date = new Date(dateString);
  return new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

const submitAppointment = async () => {
  if (!validateCurrentStep()) return;

  isSubmitting.value = true;

  try {
    // In a real app, this would be an API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Show success modal
    showSuccessModal.value = true;
  } catch (error) {
    console.error("Error submitting appointment:", error);
    // Handle error (show error message, etc.)
  } finally {
    isSubmitting.value = false;
  }
};

const resetForm = () => {
  // Reset all form data
  patient.name = "";
  patient.email = "";
  patient.phone = "";
  patient.dateOfBirth = "";
  patient.medicalHistory.conditions = "";
  patient.medicalHistory.medications = "";
  patient.medicalHistory.allergies = "";
  patient.medicalHistory.previousVisit = false;
  patient.medicalHistory.lastVisitDate = "";

  appointment.type = "";
  appointment.date = "";
  appointment.timeSlot = "";

  agreement.value = false;
  currentStep.value = 0;
  showSuccessModal.value = false;
};

// i18n mock (in a real app, use vue-i18n)
const $t = (key: string): string => {
  const translations: Record<string, string> = {
    appointmentBooking: "Reserva de Citas",
    bookingDescription: "Complete el formulario para agendar su cita médica",
    personalInfo: "Información Personal",
    fullName: "Nombre Completo",
    enterFullName: "Ingrese su nombre completo",
    email: "Correo Electrónico",
    enterEmail: "Ingrese su correo electrónico",
    phone: "Teléfono",
    enterPhone: "Ingrese su número de teléfono",
    dateOfBirth: "Fecha de Nacimiento",
    medicalHistory: "Historial Médico",
    existingConditions: "Condiciones Médicas Existentes",
    listConditions: "Liste cualquier condición médica que tenga",
    medications: "Medicamentos",
    listMedications: "Liste los medicamentos que toma actualmente",
    allergies: "Alergias",
    listAllergies: "Liste cualquier alergia que tenga",
    previousVisits: "Visitas Previas",
    visitedBefore: "He visitado esta clínica anteriormente",
    lastVisitDate: "Fecha de la última visita",
    selectAppointment: "Seleccionar Cita",
    appointmentType: "Tipo de Cita",
    selectType: "Seleccione un tipo de cita",
    appointmentDate: "Fecha de la Cita",
    availableSlots: "Horarios Disponibles",
    confirmAppointment: "Confirmar Cita",
    appointmentDetails: "Detalles de la Cita",
    date: "Fecha",
    time: "Hora",
    patientInformation: "Información del Paciente",
    name: "Nombre",
    agreementText:
      "Acepto los términos y condiciones y confirmo que la información proporcionada es correcta",
    previous: "Anterior",
    next: "Siguiente",
    submitting: "Enviando",
    confirmBooking: "Confirmar Reserva",
    appointmentConfirmed: "¡Cita Confirmada!",
    confirmationMessage:
      "Su cita ha sido reservada exitosamente. Recibirá un correo electrónico con los detalles de su cita.",
    done: "Listo",
  };

  return translations[key] || key;
};
</script>

<!-- <style>
:root {
  --color-primary: #10b981;
  --color-primary-dark: #059669;
  --color-primary-light: #6ee7b7;
}

.bg-primary {
  background-color: var(--color-primary);
}

.bg-primary-light {
  background-color: var(--color-primary-light);
}

.text-primary {
  color: var(--color-primary);
}

.border-primary {
  border-color: var(--color-primary);
}

.hover\:bg-primary-dark:hover {
  background-color: var(--color-primary-dark);
}

.focus\:ring-primary:focus {
  --tw-ring-color: var(--color-primary);
}
</style>
 -->
