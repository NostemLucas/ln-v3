<template>
  <div class="bg-slate-50 font-sans text-slate-800 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
      <!-- Header -->
      <header class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-slate-900">
              Reserva de Citas Médicas
            </h1>
            <p class="text-sm text-slate-500 mt-1">Oncoclinic Bolivia</p>
          </div>
          <div class="hidden sm:flex items-center space-x-4 text-sm">
            <UBadge
              variant="soft"
              class="flex items-center text-slate-600 bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-200"
            >
              <Icon
                icon="mdi:calendar-clock"
                class="w-4 h-4 text-emerald-600 mr-1"
              />
              <span>Lun-Vie: 8:00-18:00</span>
            </UBadge>
          </div>
        </div>
      </header>

      <!-- Main card -->
      <div
        class="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden mb-8 px-6 py-8"
      >
        <!-- Stepper -->

        <UStepper :items="steps" v-model="currentStep" disabled>
          <template #medicos>
            <div class="space-y-4 p-6">
              <h2 class="text-lg font-semibold text-slate-900 mb-4">
                Seleccione un especialista
              </h2>

              <div class="grid sm:grid-cols-2 gap-3">
                <div
                  v-for="doctor in personnel"
                  :key="doctor.id"
                  @click="formData.doctor = doctor.id"
                  class="flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200 border-2"
                  :class="{
                    'border-emerald-600 bg-emerald-50/50 shadow-md':
                      formData.doctor === doctor.id,
                    'border-slate-200 hover:border-slate-300 hover:bg-slate-50':
                      formData.doctor !== doctor.id,
                  }"
                >
                  <div
                    class="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0 transition-all duration-200"
                    :class="{
                      'bg-emerald-600 text-white':
                        formData.doctor === doctor.id,
                      'bg-slate-100 text-slate-600':
                        formData.doctor !== doctor.id,
                    }"
                  >
                    <Icon icon="mdi:doctor" class="w-6 h-6" />
                  </div>
                  <div class="flex-1">
                    <div class="font-medium text-slate-900 text-base">
                      {{ doctor.name }}
                    </div>
                    <div class="text-slate-500 text-sm">
                      {{ doctor.specialty }}
                    </div>
                  </div>
                  <div
                    class="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200"
                    :class="{
                      'border-emerald-600 bg-emerald-600':
                        formData.doctor === doctor.id,
                      'border-slate-300': formData.doctor !== doctor.id,
                    }"
                  >
                    <Icon
                      v-if="formData.doctor === doctor.id"
                      icon="mdi:check"
                      class="w-4 h-4 text-white"
                    />
                  </div>
                </div>
              </div>

              <p
                v-if="errors.doctor"
                class="text-sm text-red-500 mt-2 flex items-center"
              >
                <Icon icon="mdi:alert-circle" class="w-4 h-4 mr-1.5" />
                {{ errors.doctor }}
              </p>
            </div>
          </template>
          <template #fecha>
            <div class="p-4">
              <h2 class="text-lg font-semibold text-slate-900 mb-4">
                Seleccione fecha y hora
              </h2>

              <div class="flex flex-col lg:flex-row gap-4">
                <!-- Calendar section -->
                <div class="flex-1">
                  <div
                    class="bg-white rounded-lg border-2 border-slate-200 overflow-hidden shadow-sm"
                  >
                    <!-- Calendar header -->
                    <div
                      class="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50"
                    >
                      <div class="text-base font-medium text-slate-900">
                        {{ months[currentMonth] }} {{ currentYear }}
                      </div>
                      <div class="flex space-x-1">
                        <button
                          @click="previousMonth"
                          class="p-1.5 rounded-md hover:bg-slate-200 transition-colors"
                          aria-label="Mes anterior"
                        >
                          <Icon
                            icon="mdi:chevron-left"
                            class="w-5 h-5 text-slate-600"
                          />
                        </button>
                        <button
                          @click="nextMonth"
                          class="p-1.5 rounded-md hover:bg-slate-200 transition-colors"
                          aria-label="Mes siguiente"
                        >
                          <Icon
                            icon="mdi:chevron-right"
                            class="w-5 h-5 text-slate-600"
                          />
                        </button>
                      </div>
                    </div>

                    <!-- Calendar grid -->
                    <div class="p-4">
                      <div class="grid grid-cols-7 text-center mb-2">
                        <div
                          v-for="day in weekDays"
                          :key="day"
                          class="text-xs font-semibold text-slate-500 py-1 uppercase"
                        >
                          {{ day }}
                        </div>
                      </div>
                      <div class="grid grid-cols-7 gap-1">
                        <button
                          v-for="(day, index) in calendarDays"
                          :key="index"
                          :disabled="!day.available"
                          @click="selectDate(day)"
                          class="aspect-square flex items-center justify-center rounded-md text-sm transition-all duration-200 relative"
                          :class="{
                            'bg-slate-100 text-slate-400 cursor-not-allowed':
                              !day.available,
                            'hover:bg-emerald-100 hover:text-emerald-700':
                              day.available && !isSelectedDate(day),
                            'bg-emerald-600 text-white font-medium shadow-md':
                              isSelectedDate(day),
                            'text-slate-800':
                              day.available && !isSelectedDate(day),
                            'opacity-40': day.month !== currentMonth,
                          }"
                        >
                          {{ day.day }}
                          <span
                            v-if="isToday(day)"
                            class="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full"
                            :class="
                              isSelectedDate(day)
                                ? 'bg-white'
                                : 'bg-emerald-600'
                            "
                          ></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Time selector section -->
                <div class="flex-1">
                  <div
                    class="bg-white rounded-lg border-2 border-slate-200 overflow-hidden shadow-sm h-full"
                  >
                    <div class="p-4 border-b border-slate-200 bg-slate-50">
                      <div
                        class="text-base font-medium text-slate-900 flex items-center"
                      >
                        <Icon
                          icon="mdi:clock-outline"
                          class="w-5 h-5 text-emerald-600 mr-2"
                        />
                        Horarios disponibles
                      </div>
                    </div>

                    <div class="p-4">
                      <div
                        v-if="!formData.date"
                        class="flex flex-col items-center justify-center h-48 text-sm text-slate-500"
                      >
                        <Icon
                          icon="mdi:calendar-blank"
                          class="w-12 h-12 text-slate-300 mb-3"
                        />
                        Seleccione una fecha para ver horarios disponibles
                      </div>
                      <div v-else class="grid grid-cols-2 gap-3">
                        <button
                          v-for="time in availableTimes"
                          :key="time"
                          @click="formData.time = time"
                          class="py-3 px-4 rounded-lg text-sm transition-all duration-200 flex items-center justify-center border-2"
                          :class="
                            formData.time === time
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-md font-medium'
                              : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-300'
                          "
                        >
                          <Icon icon="mdi:clock" class="mr-2 w-4 h-4" />
                          {{ time }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                v-if="formData.date && formData.time"
                class="bg-green-50 rounded-lg p-4 border-2 border-green-200 mt-6"
              >
                <div class="flex">
                  <Icon
                    icon="mdi:calendar-check"
                    class="text-green-600 w-5 h-5 mr-3 flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <h4 class="font-medium text-green-800 mb-1 text-sm">
                      Cita seleccionada
                    </h4>
                    <p class="text-green-700 text-sm">
                      {{ formatDate(formData.date) }} a las
                      {{ formData.time }} con
                      {{ getDoctorName(formData.doctor) }}
                    </p>
                  </div>
                </div>
              </div>

              <p
                v-if="errors.time"
                class="text-sm text-red-500 mt-2 flex items-center"
              >
                <Icon icon="mdi:alert-circle" class="w-4 h-4 mr-1.5" />
                {{ errors.time }}
              </p>
            </div>
          </template>
          <template #info>
            <div class="p-4">
              <h2 class="text-lg font-semibold text-slate-900 mb-4">
                Información personal
              </h2>

              <div
                class="bg-white rounded-lg border-2 border-slate-200 p-4 shadow-sm"
              >
                <div class="grid sm:grid-cols-2 gap-5">
                  <div class="space-y-1.5">
                    <label class="block text-sm font-medium text-slate-700">
                      Nombre <span class="text-emerald-600">*</span>
                    </label>
                    <div class="relative">
                      <UInput
                        v-model="formData.firstName"
                        type="text"
                        size="lg"
                        placeholder="Ingrese su nombre"
                        class="w-full"
                        icon="lucide:user"
                      />
                    </div>
                    <p
                      v-if="errors.firstName"
                      class="text-xs text-red-500 mt-0.5 flex items-center"
                    >
                      <Icon icon="mdi:alert-circle" class="w-3 h-3 mr-1" />
                      {{ errors.firstName }}
                    </p>
                  </div>

                  <div class="space-y-1.5">
                    <label class="block text-sm font-medium text-slate-700">
                      Apellido
                    </label>
                    <div class="relative">
                      <UInput
                        v-model="formData.lastName"
                        type="text"
                        size="lg"
                        class="w-full"
                        placeholder="Ingrese su apellido"
                        icon="lucide:user"
                      />
                    </div>
                  </div>

                  <div class="space-y-1.5">
                    <label class="block text-sm font-medium text-slate-700">
                      Teléfono <span class="text-emerald-600">*</span>
                    </label>
                    <div class="flex">
                      <div class="w-24 relative">
                        <USelect
                          v-model="formData.countryCode"
                          class="w-full"
                          :items="items"
                          size="lg"
                        />
                      </div>
                      <div class="flex-1 relative">
                        <UInput
                          v-model="formData.phone"
                          type="tel"
                          class="w-full"
                          size="lg"
                          placeholder="Número de teléfono"
                          icon="lucide:phone"
                        />
                      </div>
                    </div>
                    <p
                      v-if="errors.phone"
                      class="text-xs text-red-500 mt-0.5 flex items-center"
                    >
                      <Icon icon="mdi:alert-circle" class="w-3 h-3 mr-1" />
                      {{ errors.phone }}
                    </p>
                  </div>

                  <div class="space-y-1.5">
                    <label class="block text-sm font-medium text-slate-700">
                      Email
                    </label>
                    <div class="relative">
                      <UInput
                        v-model="formData.email"
                        type="email"
                        placeholder="Ingrese su email"
                        class="w-full"
                        size="lg"
                        icon="lucide:mail"
                      />
                    </div>
                  </div>
                </div>

                <div
                  class="mt-6 bg-slate-50 rounded-lg p-4 border border-slate-200"
                >
                  <div class="flex items-start">
                    <Icon
                      icon="mdi:shield-check"
                      class="text-emerald-600 w-5 h-5 mr-3 flex-shrink-0 mt-0.5"
                    />
                    <div>
                      <h4 class="font-medium text-slate-800 mb-1 text-sm">
                        Protección de datos
                      </h4>
                      <p class="text-slate-600 text-sm">
                        Sus datos personales están protegidos y solo serán
                        utilizados para gestionar su cita médica.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 4: Confirmation -->
          </template>
          <template #confirmacion>
            <div class="p-4">
              <div class="text-center mb-8">
                <div
                  class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4"
                >
                  <Icon
                    icon="mdi:check-circle"
                    class="w-12 h-12 text-green-600"
                  />
                </div>
                <h2 class="text-xl font-bold text-slate-900 mb-1">
                  ¡Cita Confirmada!
                </h2>
                <p class="text-slate-500 text-base">
                  Su cita ha sido agendada correctamente
                </p>
                <div
                  class="inline-block bg-emerald-50 text-emerald-700 font-medium px-4 py-1.5 rounded-full text-sm mt-3 border border-emerald-200"
                >
                  ID de cita: #{{ appointmentId }}
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-6">
                <div
                  class="bg-white rounded-lg border-2 border-slate-200 overflow-hidden shadow-sm"
                >
                  <div class="p-4 bg-slate-50 border-b border-slate-200">
                    <h4
                      class="font-semibold text-slate-800 text-base flex items-center"
                    >
                      <Icon
                        icon="mdi:calendar-check"
                        class="mr-2 text-emerald-600 w-5 h-5"
                      />
                      Detalles de la cita
                    </h4>
                  </div>

                  <div class="divide-y divide-slate-100">
                    <div class="p-4 flex justify-between items-center">
                      <span class="text-slate-500 flex items-center text-sm">
                        <Icon
                          icon="mdi:calendar"
                          class="mr-2 text-emerald-600 w-4 h-4"
                        />
                        Fecha:
                      </span>
                      <span class="font-medium text-slate-800 text-sm">{{
                        formatDate(formData.date)
                      }}</span>
                    </div>

                    <div class="p-4 flex justify-between items-center">
                      <span class="text-slate-500 flex items-center text-sm">
                        <Icon
                          icon="mdi:clock"
                          class="mr-2 text-emerald-600 w-4 h-4"
                        />
                        Hora:
                      </span>
                      <span class="font-medium text-slate-800 text-sm">{{
                        formData.time
                      }}</span>
                    </div>

                    <div class="p-4 flex justify-between items-center">
                      <span class="text-slate-500 flex items-center text-sm">
                        <Icon
                          icon="mdi:doctor"
                          class="mr-2 text-emerald-600 w-4 h-4"
                        />
                        Médico:
                      </span>
                      <span class="font-medium text-slate-800 text-sm">{{
                        getDoctorName(formData.doctor)
                      }}</span>
                    </div>

                    <div class="p-4 flex justify-between items-center">
                      <span class="text-slate-500 flex items-center text-sm">
                        <Icon
                          icon="mdi:hospital-building"
                          class="mr-2 text-emerald-600 w-4 h-4"
                        />
                        Centro médico:
                      </span>
                      <span class="font-medium text-slate-800 text-sm"
                        >Oncoclinic Bolivia</span
                      >
                    </div>
                  </div>
                </div>

                <div class="space-y-6">
                  <div
                    class="bg-white rounded-lg border-2 border-slate-200 overflow-hidden shadow-sm"
                  >
                    <div class="p-4 bg-slate-50 border-b border-slate-200">
                      <h4
                        class="font-semibold text-slate-800 text-base flex items-center"
                      >
                        <Icon
                          icon="mdi:account-details"
                          class="mr-2 text-emerald-600 w-5 h-5"
                        />
                        Información del paciente
                      </h4>
                    </div>

                    <div class="divide-y divide-slate-100">
                      <div class="p-4 flex justify-between items-center">
                        <span class="text-slate-500 flex items-center text-sm">
                          <Icon
                            icon="mdi:account"
                            class="mr-2 text-emerald-600 w-4 h-4"
                          />
                          Nombre:
                        </span>
                        <span class="font-medium text-slate-800 text-sm">
                          {{ formData.firstName }} {{ formData.lastName }}
                        </span>
                      </div>

                      <div class="p-4 flex justify-between items-center">
                        <span class="text-slate-500 flex items-center text-sm">
                          <Icon
                            icon="mdi:phone"
                            class="mr-2 text-emerald-600 w-4 h-4"
                          />
                          Teléfono:
                        </span>
                        <span class="font-medium text-slate-800 text-sm">
                          {{ formData.countryCode }} {{ formData.phone }}
                        </span>
                      </div>

                      <div
                        v-if="formData.email"
                        class="p-4 flex justify-between items-center"
                      >
                        <span class="text-slate-500 flex items-center text-sm">
                          <Icon
                            icon="mdi:email"
                            class="mr-2 text-emerald-600 w-4 h-4"
                          />
                          Email:
                        </span>
                        <span class="font-medium text-slate-800 text-sm">
                          {{ formData.email }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    class="bg-white rounded-lg border-2 border-slate-200 overflow-hidden shadow-sm"
                  >
                    <div class="p-4 bg-slate-50 border-b border-slate-200">
                      <h4
                        class="font-semibold text-slate-800 text-base flex items-center"
                      >
                        <Icon
                          icon="mdi:calendar-plus"
                          class="mr-2 text-emerald-600 w-5 h-5"
                        />
                        Añadir al calendario
                      </h4>
                    </div>
                    <div class="p-4 grid grid-cols-4 gap-3">
                      <button
                        class="flex flex-col items-center justify-center p-3 border-2 border-slate-200 rounded-lg hover:bg-slate-50 transition-colors hover:border-emerald-600 group shadow-sm"
                      >
                        <Icon
                          icon="mdi:google"
                          class="w-6 h-6 text-[#4285F4] group-hover:scale-110 transition-transform"
                        />
                        <span
                          class="text-xs mt-1 group-hover:text-emerald-600 transition-colors"
                          >Google</span
                        >
                      </button>
                      <button
                        class="flex flex-col items-center justify-center p-3 border-2 border-slate-200 rounded-lg hover:bg-slate-50 transition-colors hover:border-emerald-600 group shadow-sm"
                      >
                        <Icon
                          icon="mdi:microsoft-outlook"
                          class="w-6 h-6 text-[#0078D4] group-hover:scale-110 transition-transform"
                        />
                        <span
                          class="text-xs mt-1 group-hover:text-emerald-600 transition-colors"
                          >Outlook</span
                        >
                      </button>
                      <button
                        class="flex flex-col items-center justify-center p-3 border-2 border-slate-200 rounded-lg hover:bg-slate-50 transition-colors hover:border-emerald-600 group shadow-sm"
                      >
                        <Icon
                          icon="mdi:yahoo"
                          class="w-6 h-6 text-[#6001D2] group-hover:scale-110 transition-transform"
                        />
                        <span
                          class="text-xs mt-1 group-hover:text-emerald-600 transition-colors"
                          >Yahoo</span
                        >
                      </button>
                      <button
                        class="flex flex-col items-center justify-center p-3 border-2 border-slate-200 rounded-lg hover:bg-slate-50 transition-colors hover:border-emerald-600 group shadow-sm"
                      >
                        <Icon
                          icon="mdi:apple"
                          class="w-6 h-6 text-[#000000] group-hover:scale-110 transition-transform"
                        />
                        <span
                          class="text-xs mt-1 group-hover:text-emerald-600 transition-colors"
                          >Apple</span
                        >
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </UStepper>

        <!-- Step footer -->
        <div
          class="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center"
        >
          <div class="text-sm text-slate-500 flex items-center">
            <Icon
              icon="mdi:shield-lock"
              class="w-4 h-4 mr-2 text-emerald-600"
            />
            Conexión segura
          </div>
          <div class="flex items-center gap-3">
            <UButton
              v-if="currentStep > 0 && currentStep < steps.length - 1"
              leading-icon="i-lucide-arrow-left"
              @click="currentStep--"
              class="px-4 py-2"
            >
              Anterior
            </UButton>

            <UButton
              v-if="currentStep < steps.length - 1"
              @click="nextStep"
              variant="solid"
              class="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center shadow-md text-sm font-medium"
            >
              Continuar
              <Icon icon="mdi:arrow-right" class="ml-2 w-4 h-4" />
            </UButton>
            <UButton
              v-else
              trailing-icon="i-lucide-arrow-right"
              @click="finishBooking"
              class="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center shadow-md text-sm font-medium"
            >
              Finalizar
            </UButton>
          </div>
        </div>
      </div>

      <!-- Info cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div
          class="bg-white rounded-lg p-4 border-2 border-slate-200 shadow-sm"
        >
          <div class="flex items-start">
            <Icon
              icon="mdi:calendar-clock"
              class="w-5 h-5 text-emerald-600 mr-3 flex-shrink-0"
            />
            <div>
              <h4 class="font-medium text-slate-800 mb-1">
                Horarios de atención
              </h4>
              <p class="text-slate-600">
                Lunes – Viernes: 08:00 am – 18:00 pm<br />
                Sábado: 08:00 am – 12:00 pm
              </p>
            </div>
          </div>
        </div>

        <div
          class="bg-white rounded-lg p-4 border-2 border-slate-200 shadow-sm"
        >
          <div class="flex items-start">
            <Icon
              icon="mdi:map-marker"
              class="w-5 h-5 text-emerald-600 mr-3 flex-shrink-0"
            />
            <div>
              <h4 class="font-medium text-slate-800 mb-1">Dirección</h4>
              <p class="text-slate-600">
                Obrajes, Avenida Costanerita Oncoclinic<br />
                entre calles 5 y 6 N 71.<br />
                La Paz – Bolivia
              </p>
            </div>
          </div>
        </div>

        <div
          class="bg-white rounded-lg p-4 border-2 border-slate-200 shadow-sm"
        >
          <div class="flex items-start">
            <Icon
              icon="mdi:information-outline"
              class="w-5 h-5 text-emerald-600 mr-3 flex-shrink-0"
            />
            <div>
              <h4 class="font-medium text-slate-800 mb-1">
                Información importante
              </h4>
              <p class="text-slate-600">
                Recuerde llegar 15 minutos antes de su cita. Si necesita
                cancelar, por favor hágalo con 24 horas de anticipación.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import type { StepperItem } from "@nuxt/ui";
import personnel from "~/mocks/doctors";

const currentStep = ref(0);
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

const appointmentId = ref(Math.floor(Math.random() * 9000) + 1000);
const items = ref([
  {
    label: "BO +591",
    value: "591",
  },
  {
    label: "AR +54",
    value: "54",
  },
  {
    label: "PR +51",
    value: "51",
  },
]);

const formData = ref<FormData>({
  doctor: null,
  date: null,
  time: "",
  firstName: "",
  lastName: "",
  email: "",
  countryCode: items.value[0].value,
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

// Form steps
const steps = ref<StepperItem[]>([
  {
    title: "Médicos",
    icon: "mdi:doctor",
    description: "Seleccione el especialista para su consulta",
    slot: "medicos",
  },
  {
    title: "Fecha y Hora",
    icon: "mdi:calendar-clock",
    description: "Elija el día y horario que prefiera",
    slot: "fecha",
  },
  {
    title: "Información",
    icon: "mdi:account-details",
    description: "Complete sus datos personales",
    slot: "info",
  },
  {
    title: "Confirmación",
    icon: "mdi:check-circle",
    description: "Revise y confirme su cita",
    slot: "confirmacion",
  },
]);

// Calendar
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
const availableTimes = [
  "9:00 a.m.",
  "10:00 a.m.",
  "11:00 a.m.",
  "12:00 p.m.",
  "2:00 p.m.",
  "3:00 p.m.",
  "4:00 p.m.",
  "5:00 p.m.",
];

// Methods
const nextStep = () => {
  if (validateCurrentStep()) {
    currentStep.value++;
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
    if (!formData.value.phone) {
      errors.value.phone = "Por favor, ingrese su número de teléfono";
      isValid = false;
    }
  }

  return isValid;
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

const isToday = (day: CalendarDay) => {
  const today = new Date();
  return (
    day.day === today.getDate() &&
    day.month === today.getMonth() &&
    day.year === today.getFullYear()
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

  const doctor = personnel.find((d) => d.id === doctorId);
  return doctor ? doctor.name : "";
};

const finishBooking = () => {
  // Logic to send data to server would go here
  alert("¡Cita reservada con éxito!");
  currentStep.value = 0;
  formData.value = {
    doctor: null,
    date: null,
    time: "",
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+591",
    phone: "",
  };
};

// Computed calendar
const calendarDays = computed(() => {
  const days: CalendarDay[] = [];

  // First day of month (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const firstDay = new Date(currentYear.value, currentMonth.value, 1).getDay();
  // Adjust to start week on Monday (0 = Monday, ..., 6 = Sunday)
  const firstDayAdjusted = firstDay === 0 ? 6 : firstDay - 1;

  // Days from previous month
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

  // Days of current month
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

  // Days from next month to complete the grid
  const remainingDays = 42 - days.length; // 6 rows x 7 columns = 42 cells
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

// Initialization
onMounted(() => {
  currentMonth.value = 3;
  currentYear.value = 2025;
});
</script>
