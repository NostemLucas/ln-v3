<template>
  <div class="min-h-screen bg-gray-50 flex flex-col md:flex-row">
    <!-- Información de la clínica (siempre visible) -->
    <div class="bg-white p-6 md:w-1/4 md:min-h-screen shadow-md relative z-10">
      <div class="sticky top-6">
        <h2 class="text-gray-700 text-xl font-medium">Contáctanos</h2>
        <h1 class="text-primary text-3xl font-bold mb-6">Reserva Una Cita</h1>

        <div class="space-y-6">
          <div>
            <h3 class="text-gray-700 text-lg font-medium mb-2">Horarios</h3>
            <div class="space-y-1 text-gray-600">
              <div class="flex justify-between items-center">
                <div class="flex items-center">
                  <Icon icon="mdi:calendar-clock" class="mr-2 text-primary" />
                  <span>Lunes – Viernes</span>
                </div>
                <span>08:00 am – 18:00 pm</span>
              </div>
              <div class="flex justify-between items-center">
                <div class="flex items-center">
                  <Icon icon="mdi:calendar-weekend" class="mr-2 text-primary" />
                  <span>Sábado</span>
                </div>
                <span>08:00 am – 12:00 pm</span>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-gray-700 text-lg font-medium mb-2">Dirección</h3>
            <div class="flex items-start">
              <Icon
                icon="mdi:map-marker"
                class="mr-2 text-primary mt-1 flex-shrink-0"
              />
              <p class="text-gray-600">
                Obrajes, Avenida Costanerita Oncoclinic<br />
                entre calles 5 y 6 N 71.<br />
                La Paz – Bolivia
              </p>
            </div>
          </div>

          <div class="pt-4 hidden md:block">
            <div class="bg-primary/10 rounded-lg p-4">
              <div class="flex items-center mb-2">
                <Icon
                  icon="mdi:information-outline"
                  class="text-primary mr-2"
                />
                <h4 class="font-medium text-primary">Información</h4>
              </div>
              <p class="text-sm text-gray-600">
                Recuerde llegar 15 minutos antes de su cita. Si necesita
                cancelar, por favor hágalo con 24 horas de anticipación.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenido principal -->
    <div class="flex-1 flex flex-col">
      <!-- Barra de progreso -->
      <div class="bg-white shadow-sm">
        <div class="max-w-3xl mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <div
              v-for="(step, index) in steps"
              :key="index"
              class="flex items-center relative"
              :class="{
                'text-primary': currentStep >= index,
                'text-gray-400': currentStep < index,
              }"
            >
              <div
                class="flex items-center justify-center w-10 h-10 rounded-full mr-2 transition-all duration-300"
                :class="
                  currentStep > index
                    ? 'bg-primary text-white'
                    : currentStep === index
                    ? 'border-2 border-primary text-primary'
                    : 'border-2 border-gray-300 text-gray-400'
                "
              >
                <Icon
                  v-if="currentStep <= index"
                  :icon="step.icon"
                  class="w-5 h-5"
                />
                <Icon v-else icon="mdi:check" class="w-5 h-5" />
              </div>
              <span class="hidden md:inline font-medium">{{ step.label }}</span>

              <!-- Línea conectora -->
              <div
                v-if="index < steps.length - 1"
                class="hidden md:block absolute h-0.5 bg-gray-300 w-12 left-full top-1/2 -translate-y-1/2 ml-2"
                :class="{ 'bg-primary': currentStep > index }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contenido del paso actual -->
      <div class="flex-1 p-4">
        <div
          class="max-w-3xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300"
        >
          <!-- Cabecera del paso -->
          <div class="p-4 border-b flex items-center">
            <button
              v-if="currentStep > 0"
              @click="currentStep--"
              class="mr-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Icon icon="mdi:chevron-left" class="w-6 h-6 text-gray-500" />
            </button>
            <h2 class="text-xl font-semibold text-gray-800">
              {{ steps[currentStep].label }}
            </h2>
          </div>

          <!-- Contenido del paso -->
          <div class="p-6">
            <!-- Paso 1: Selección de médico -->
            <div v-if="currentStep === 0" class="space-y-4">
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">
                  Médico <span class="text-primary">*</span>
                </label>
                <div class="relative">
                  <select
                    v-model="formData.doctor"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-20 transition pl-10"
                  >
                    <option value="" disabled>Seleccione un médico</option>
                    <option
                      v-for="doctor in doctors"
                      :key="doctor.id"
                      :value="doctor.id"
                    >
                      {{ doctor.name }}
                    </option>
                  </select>
                  <Icon
                    icon="mdi:doctor"
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                  />
                  <Icon
                    icon="mdi:chevron-down"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                  />
                </div>
                <p
                  v-if="errors.doctor"
                  class="text-sm text-red-500 mt-1 flex items-center"
                >
                  <Icon icon="mdi:alert-circle" class="w-4 h-4 mr-1" />
                  {{ errors.doctor }}
                </p>
              </div>

              <div
                class="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-100"
              >
                <div class="flex">
                  <Icon
                    icon="mdi:information"
                    class="text-blue-500 w-5 h-5 mr-2 flex-shrink-0"
                  />
                  <div>
                    <h4 class="font-medium text-blue-700 mb-1">
                      Especialistas disponibles
                    </h4>
                    <p class="text-sm text-blue-600">
                      Todos nuestros médicos son especialistas certificados con
                      amplia experiencia en su campo.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Paso 2: Selección de fecha y hora -->
            <div v-else-if="currentStep === 1" class="space-y-6">
              <!-- Selector de mes y año -->
              <div class="flex justify-between items-center">
                <div class="flex space-x-2">
                  <div class="relative">
                    <select
                      v-model="currentMonth"
                      class="pl-10 pr-8 py-2 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-20"
                    >
                      <option
                        v-for="(month, index) in months"
                        :key="index"
                        :value="index"
                      >
                        {{ month }}
                      </option>
                    </select>
                    <Icon
                      icon="mdi:calendar-month"
                      class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
                    />
                  </div>
                  <div class="relative">
                    <select
                      v-model="currentYear"
                      class="pl-10 pr-8 py-2 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-20"
                    >
                      <option v-for="year in years" :key="year" :value="year">
                        {{ year }}
                      </option>
                    </select>
                    <Icon
                      icon="mdi:calendar-today"
                      class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
                    />
                  </div>
                </div>
                <div class="flex space-x-2">
                  <button
                    @click="previousMonth"
                    class="p-2 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <Icon
                      icon="mdi:chevron-left"
                      class="w-5 h-5 text-gray-500"
                    />
                  </button>
                  <button
                    @click="nextMonth"
                    class="p-2 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <Icon
                      icon="mdi:chevron-right"
                      class="w-5 h-5 text-gray-500"
                    />
                  </button>
                </div>
              </div>

              <!-- Calendario -->
              <div
                class="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                <div
                  class="grid grid-cols-7 gap-1 text-center p-2 bg-gray-50 border-b"
                >
                  <div
                    v-for="day in weekDays"
                    :key="day"
                    class="text-sm font-medium text-gray-500 py-1"
                  >
                    {{ day }}
                  </div>
                </div>
                <div class="grid grid-cols-7 gap-1 p-2">
                  <button
                    v-for="(day, index) in calendarDays"
                    :key="index"
                    :disabled="!day.available"
                    @click="selectDate(day)"
                    class="aspect-square flex items-center justify-center rounded-md text-sm transition-all duration-200"
                    :class="{
                      'bg-gray-100 text-gray-400 cursor-not-allowed':
                        !day.available,
                      'hover:bg-gray-100 hover:scale-105':
                        day.available && !isSelectedDate(day),
                      'bg-primary text-white scale-105 shadow-sm':
                        isSelectedDate(day),
                      'text-gray-800': day.available && !isSelectedDate(day),
                      'opacity-50': day.month !== currentMonth,
                    }"
                  >
                    {{ day.day }}
                  </button>
                </div>
              </div>

              <!-- Selector de hora -->
              <div v-if="formData.date" class="space-y-2">
                <h3 class="font-medium text-gray-700 flex items-center">
                  <Icon icon="mdi:clock-outline" class="mr-2 text-primary" />
                  Horarios disponibles
                </h3>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    v-for="time in availableTimes"
                    :key="time"
                    @click="formData.time = time"
                    class="py-2 px-3 rounded-md text-sm transition-all duration-200 flex items-center justify-center"
                    :class="
                      formData.time === time
                        ? 'bg-primary text-white shadow-sm scale-105'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    "
                  >
                    <Icon icon="mdi:clock" class="mr-1 w-4 h-4" />
                    {{ time }}
                  </button>
                </div>
                <p
                  v-if="errors.time"
                  class="text-sm text-red-500 mt-1 flex items-center"
                >
                  <Icon icon="mdi:alert-circle" class="w-4 h-4 mr-1" />
                  {{ errors.time }}
                </p>
              </div>
            </div>

            <!-- Paso 3: Información personal -->
            <div v-else-if="currentStep === 2" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">
                    Nombre <span class="text-primary">*</span>
                  </label>
                  <div class="relative">
                    <input
                      v-model="formData.firstName"
                      type="text"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-20 pl-10"
                      placeholder="Ingrese su nombre"
                    />
                    <Icon
                      icon="mdi:account"
                      class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    />
                  </div>
                  <p
                    v-if="errors.firstName"
                    class="text-sm text-red-500 mt-1 flex items-center"
                  >
                    <Icon icon="mdi:alert-circle" class="w-4 h-4 mr-1" />
                    {{ errors.firstName }}
                  </p>
                </div>
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">
                    Apellido
                  </label>
                  <div class="relative">
                    <input
                      v-model="formData.lastName"
                      type="text"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-20 pl-10"
                      placeholder="Ingrese su apellido"
                    />
                    <Icon
                      icon="mdi:account-outline"
                      class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    />
                  </div>
                </div>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">
                  Correo electrónico <span class="text-primary">*</span>
                </label>
                <div class="relative">
                  <input
                    v-model="formData.email"
                    type="email"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-20 pl-10"
                    placeholder="ejemplo@correo.com"
                  />
                  <Icon
                    icon="mdi:email-outline"
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  />
                </div>
                <p
                  v-if="errors.email"
                  class="text-sm text-red-500 mt-1 flex items-center"
                >
                  <Icon icon="mdi:alert-circle" class="w-4 h-4 mr-1" />
                  {{ errors.email }}
                </p>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">
                  Teléfono <span class="text-primary">*</span>
                </label>
                <div class="flex">
                  <div class="w-24 relative">
                    <select
                      v-model="formData.countryCode"
                      class="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-20 pl-8"
                    >
                      <option value="+591">🇧🇴 +591</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+34">🇪🇸 +34</option>
                    </select>
                    <Icon
                      icon="mdi:earth"
                      class="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                    />
                  </div>
                  <div class="flex-1 relative">
                    <input
                      v-model="formData.phone"
                      type="tel"
                      class="block w-full rounded-r-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-20 pl-10"
                      placeholder="Número de teléfono"
                    />
                    <Icon
                      icon="mdi:phone"
                      class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    />
                  </div>
                </div>
                <p
                  v-if="errors.phone"
                  class="text-sm text-red-500 mt-1 flex items-center"
                >
                  <Icon icon="mdi:alert-circle" class="w-4 h-4 mr-1" />
                  {{ errors.phone }}
                </p>
              </div>

              <div
                class="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200"
              >
                <div class="flex items-start">
                  <Icon
                    icon="mdi:shield-check"
                    class="text-green-500 w-5 h-5 mr-2 flex-shrink-0 mt-0.5"
                  />
                  <p class="text-sm text-gray-600">
                    Sus datos personales están protegidos y solo serán
                    utilizados para gestionar su cita médica.
                  </p>
                </div>
              </div>
            </div>

            <!-- Paso 4: Confirmación -->
            <div v-else-if="currentStep === 3" class="space-y-6">
              <div class="flex justify-center mb-6">
                <div
                  class="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center"
                >
                  <Icon
                    icon="mdi:check-circle"
                    class="w-12 h-12 text-green-500"
                  />
                </div>
              </div>

              <h3 class="text-2xl font-semibold text-center text-gray-800">
                ¡Enhorabuena!
              </h3>
              <p class="text-center text-gray-500">
                ID de cita #{{ appointmentId }}
              </p>

              <div
                class="bg-gray-50 rounded-lg p-5 space-y-3 border border-gray-200"
              >
                <div
                  class="flex justify-between items-center pb-2 border-b border-gray-200"
                >
                  <span class="text-gray-500 flex items-center">
                    <Icon icon="mdi:calendar" class="mr-2 text-primary" />
                    Fecha:
                  </span>
                  <span class="font-medium">{{
                    formatDate(formData.date)
                  }}</span>
                </div>
                <div
                  class="flex justify-between items-center pb-2 border-b border-gray-200"
                >
                  <span class="text-gray-500 flex items-center">
                    <Icon icon="mdi:clock" class="mr-2 text-primary" />
                    Hora local:
                  </span>
                  <span class="font-medium">{{ formData.time }}</span>
                </div>
                <div
                  class="flex justify-between items-center pb-2 border-b border-gray-200"
                >
                  <span class="text-gray-500 flex items-center">
                    <Icon icon="mdi:doctor" class="mr-2 text-primary" />
                    Servicio:
                  </span>
                  <span class="font-medium">{{
                    getDoctorName(formData.doctor)
                  }}</span>
                </div>
                <div
                  class="flex justify-between items-center pb-2 border-b border-gray-200"
                >
                  <span class="text-gray-500 flex items-center">
                    <Icon
                      icon="mdi:hospital-building"
                      class="mr-2 text-primary"
                    />
                    Empleado:
                  </span>
                  <span class="font-medium">Oncoclinic Bolivia</span>
                </div>
                <div class="pt-2"></div>
                <div
                  class="flex justify-between items-center pb-2 border-b border-gray-200"
                >
                  <span class="text-gray-500 flex items-center">
                    <Icon icon="mdi:account" class="mr-2 text-primary" />
                    Tu nombre:
                  </span>
                  <span class="font-medium"
                    >{{ formData.firstName }} {{ formData.lastName }}</span
                  >
                </div>
                <div
                  class="flex justify-between items-center pb-2 border-b border-gray-200"
                >
                  <span class="text-gray-500 flex items-center">
                    <Icon icon="mdi:email" class="mr-2 text-primary" />
                    Correo electrónico:
                  </span>
                  <span class="font-medium">{{ formData.email }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-500 flex items-center">
                    <Icon icon="mdi:phone" class="mr-2 text-primary" />
                    Número de teléfono:
                  </span>
                  <span class="font-medium"
                    >{{ formData.countryCode }} {{ formData.phone }}</span
                  >
                </div>
              </div>

              <div class="space-y-3 mt-4">
                <h4 class="font-medium text-gray-700 flex items-center">
                  <Icon icon="mdi:calendar-plus" class="mr-2 text-primary" />
                  Añadir al calendario
                </h4>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button
                    class="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 transition-colors hover:border-primary group"
                  >
                    <Icon
                      icon="mdi:google"
                      class="w-8 h-8 text-[#4285F4] group-hover:scale-110 transition-transform"
                    />
                    <span
                      class="text-sm mt-2 group-hover:text-primary transition-colors"
                      >Google</span
                    >
                  </button>
                  <button
                    class="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 transition-colors hover:border-primary group"
                  >
                    <Icon
                      icon="mdi:microsoft-outlook"
                      class="w-8 h-8 text-[#0078D4] group-hover:scale-110 transition-transform"
                    />
                    <span
                      class="text-sm mt-2 group-hover:text-primary transition-colors"
                      >Outlook</span
                    >
                  </button>
                  <button
                    class="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 transition-colors hover:border-primary group"
                  >
                    <Icon
                      icon="mdi:yahoo"
                      class="w-8 h-8 text-[#6001D2] group-hover:scale-110 transition-transform"
                    />
                    <span
                      class="text-sm mt-2 group-hover:text-primary transition-colors"
                      >Yahoo</span
                    >
                  </button>
                  <button
                    class="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 transition-colors hover:border-primary group"
                  >
                    <Icon
                      icon="mdi:apple"
                      class="w-8 h-8 text-[#000000] group-hover:scale-110 transition-transform"
                    />
                    <span
                      class="text-sm mt-2 group-hover:text-primary transition-colors"
                      >Apple</span
                    >
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Pie del paso -->
          <div
            class="p-4 border-t bg-gray-50 flex justify-between items-center"
          >
            <div class="text-sm text-gray-500 flex items-center">
              <Icon icon="mdi:shield-lock" class="w-4 h-4 mr-1 text-primary" />
              Conexión segura
            </div>
            <button
              v-if="currentStep < steps.length - 1"
              @click="nextStep"
              class="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors flex items-center"
            >
              Continuar
              <Icon icon="mdi:arrow-right" class="ml-1 w-5 h-5" />
            </button>
            <button
              v-else
              @click="finishBooking"
              class="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors flex items-center"
            >
              Terminar
              <Icon icon="mdi:check" class="ml-1 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { Icon } from "@iconify/vue";

// Tipos
interface Step {
  label: string;
  icon: string;
}

interface Doctor {
  id: number;
  name: string;
}

interface CalendarDay {
  day: number;
  month: number;
  year: number;
  available: boolean;
}

interface FormData {
  doctor: number | null;
  date: Date | null;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string;
}

// Estado
const currentStep = ref(0);
const appointmentId = ref(Math.floor(Math.random() * 1000) + 1000);
const formData = ref<FormData>({
  doctor: null,
  date: null,
  time: "",
  firstName: "",
  lastName: "",
  email: "",
  countryCode: "+591",
  phone: "",
});
const errors = ref({
  doctor: "",
  date: "",
  time: "",
  firstName: "",
  email: "",
  phone: "",
});

// Datos de ejemplo
const doctors = ref<Doctor[]>([
  { id: 1, name: "Dr. Daniel Eduardo Mercado Rodrigo" },
  { id: 2, name: "Dra. María Fernanda López Sánchez" },
  { id: 3, name: "Dr. Carlos Alberto Ramírez Torres" },
  { id: 4, name: "Dra. Ana Lucía Morales Vega" },
]);

// Pasos del formulario
const steps = ref<Step[]>([
  { label: "Médicos", icon: "mdi:doctor" },
  { label: "Fecha y Hora", icon: "mdi:calendar-clock" },
  { label: "Tu Información", icon: "mdi:account-details" },
  { label: "Confirmación", icon: "mdi:check-circle" },
]);

// Calendario
const currentMonth = ref(new Date().getMonth());
const currentYear = ref(new Date().getFullYear());
const weekDays = ["lun", "mar", "mié", "jue", "vie", "sáb", "dom"];
const months = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];
const years = [2025, 2026, 2027];
const availableTimes = [
  "9:00 a. m.",
  "10:00 a. m.",
  "11:00 a. m.",
  "12:00 p. m.",
  "2:00 p. m.",
  "3:00 p. m.",
  "4:00 p. m.",
  "5:00 p. m.",
];

// Métodos
const nextStep = () => {
  if (validateCurrentStep()) {
    currentStep.value++;
    // Scroll al inicio cuando cambia de paso
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const validateCurrentStep = () => {
  errors.value = {
    doctor: "",
    date: "",
    time: "",
    firstName: "",
    email: "",
    phone: "",
  };

  let isValid = true;

  if (currentStep.value === 0) {
    if (!formData.value.doctor) {
      errors.value.doctor = "Por favor, seleccione un médico";
      isValid = false;
    }
  } else if (currentStep.value === 1) {
    if (!formData.value.date) {
      errors.value.date = "Por favor, seleccione una fecha";
      isValid = false;
    }
    if (!formData.value.time) {
      errors.value.time = "Por favor, seleccione una hora";
      isValid = false;
    }
  } else if (currentStep.value === 2) {
    if (!formData.value.firstName) {
      errors.value.firstName = "Por favor, ingrese su nombre";
      isValid = false;
    }
    if (!formData.value.email) {
      errors.value.email = "Por favor, ingrese su correo electrónico";
      isValid = false;
    } else if (!validateEmail(formData.value.email)) {
      errors.value.email = "Por favor, ingrese un correo electrónico válido";
      isValid = false;
    }
    if (!formData.value.phone) {
      errors.value.phone = "Por favor, ingrese su número de teléfono";
      isValid = false;
    }
  }

  return isValid;
};

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const previousMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
};

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
};

const selectDate = (day: CalendarDay) => {
  if (day.available) {
    formData.value.date = new Date(day.year, day.month, day.day);
    // Resetear la hora seleccionada cuando se cambia la fecha
    formData.value.time = "";
  }
};

const isSelectedDate = (day: CalendarDay) => {
  if (!formData.value.date) return false;

  return (
    formData.value.date.getDate() === day.day &&
    formData.value.date.getMonth() === day.month &&
    formData.value.date.getFullYear() === day.year
  );
};

const formatDate = (date: Date | null) => {
  if (!date) return "";

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("es-ES", options);
};

const getDoctorName = (doctorId: number | null) => {
  if (!doctorId) return "";

  const doctor = doctors.value.find((d) => d.id === doctorId);
  return doctor ? doctor.name : "";
};

const finishBooking = () => {
  // Aquí iría la lógica para enviar los datos al servidor
  alert("¡Cita reservada con éxito!");
};

// Calendario computado
const calendarDays = computed(() => {
  const days: CalendarDay[] = [];

  // Primer día del mes (0 = Domingo, 1 = Lunes, ..., 6 = Sábado)
  const firstDay = new Date(currentYear.value, currentMonth.value, 1).getDay();
  // Ajustar para que la semana comience en lunes (0 = Lunes, ..., 6 = Domingo)
  const firstDayAdjusted = firstDay === 0 ? 6 : firstDay - 1;

  // Días del mes anterior
  const daysInPrevMonth = new Date(
    currentYear.value,
    currentMonth.value,
    0
  ).getDate();
  for (let i = firstDayAdjusted - 1; i >= 0; i--) {
    const prevMonth = currentMonth.value === 0 ? 11 : currentMonth.value - 1;
    const prevYear =
      currentMonth.value === 0 ? currentYear.value - 1 : currentYear.value;

    days.push({
      day: daysInPrevMonth - i,
      month: prevMonth,
      year: prevYear,
      available: false,
    });
  }

  // Días del mes actual
  const daysInMonth = new Date(
    currentYear.value,
    currentMonth.value + 1,
    0
  ).getDate();
  const today = new Date();

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentYear.value, currentMonth.value, i);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const isPast =
      date < new Date(today.getFullYear(), today.getMonth(), today.getDate());

    days.push({
      day: i,
      month: currentMonth.value,
      year: currentYear.value,
      available: !isWeekend && !isPast,
    });
  }

  // Días del mes siguiente para completar la cuadrícula
  const remainingDays = 42 - days.length; // 6 filas x 7 columnas = 42 celdas
  for (let i = 1; i <= remainingDays; i++) {
    const nextMonth = currentMonth.value === 11 ? 0 : currentMonth.value + 1;
    const nextYear =
      currentMonth.value === 11 ? currentYear.value + 1 : currentYear.value;

    days.push({
      day: i,
      month: nextMonth,
      year: nextYear,
      available: false,
    });
  }

  return days;
});

// Inicialización
onMounted(() => {
  // Establecer valores predeterminados
  currentMonth.value = 3; // Abril (0-indexed)
  currentYear.value = 2025;
});
</script>

<style>
:root {
  --primary: #2563eb;
  --primary-dark: #1d4ed8;
}

.text-primary {
  color: var(--primary);
}

.bg-primary {
  background-color: var(--primary);
}

.border-primary {
  border-color: var(--primary);
}

.hover\:bg-primary-dark:hover {
  background-color: var(--primary-dark);
}

.hover\:border-primary:hover {
  border-color: var(--primary);
}

.focus\:border-primary:focus {
  border-color: var(--primary);
}

.focus\:ring-primary:focus {
  --tw-ring-color: var(--primary);
}

.group-hover\:text-primary:hover {
  color: var(--primary);
}

/* Animaciones y transiciones */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.transition-colors {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

.transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}
</style>
