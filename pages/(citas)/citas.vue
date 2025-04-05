<template>
  <div
    class="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-5xl mx-auto">
      <!-- Logo and header -->
      <div class="text-center mb-8">
        <div class="flex justify-center items-center mb-4">
          <div class="bg-white p-3 rounded-full shadow-md">
            <svg
              class="w-10 h-10 text-teal-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              ></path>
            </svg>
          </div>
        </div>
        <h1 class="text-3xl font-bold text-gray-800">
          Centro Médico Especializado
        </h1>
        <p class="text-gray-600 mt-2">Sistema de reserva de citas en línea</p>
      </div>

      <!-- Main card with appointment form -->
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
        <!-- Progress bar -->
        <div class="relative h-2 bg-gray-100">
          <div
            class="absolute top-0 left-0 h-full bg-teal-500 transition-all duration-500 ease-in-out"
            :style="{ width: `${(currentStep / (steps.length - 1)) * 100}%` }"
          ></div>
        </div>

        <!-- Step indicators -->
        <div class="px-6 pt-6 pb-4">
          <div class="flex justify-between">
            <div
              v-for="(step, index) in steps"
              :key="index"
              class="flex flex-col items-center"
              :class="{ 'w-1/4': true }"
            >
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300"
                :class="[
                  currentStep > index
                    ? 'bg-teal-500 text-white'
                    : currentStep === index
                    ? 'bg-teal-100 text-teal-700 border-2 border-teal-500'
                    : 'bg-gray-100 text-gray-400',
                ]"
              >
                <span v-if="currentStep > index">
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </span>
                <span v-else>{{ index + 1 }}</span>
              </div>
              <span
                class="text-xs text-center font-medium transition-colors duration-300"
                :class="[
                  currentStep >= index ? 'text-teal-700' : 'text-gray-400',
                ]"
              >
                {{ step }}
              </span>
            </div>
          </div>
        </div>

        <!-- Form content with transitions -->
        <div class="px-6 py-6">
          <transition name="fade-slide" mode="out-in">
            <div>
              <!-- Step 1: Personal Information -->
              <div v-if="currentStep === 0" key="personal" class="space-y-6">
                <div class="flex items-center space-x-3 mb-6">
                  <div class="bg-teal-100 p-2 rounded-full">
                    <svg
                      class="w-6 h-6 text-teal-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                  </div>
                  <h2 class="text-2xl font-bold text-gray-800">
                    Información Personal
                  </h2>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Nombre Completo</label
                    >
                    <div class="relative">
                      <div
                        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                      >
                        <svg
                          class="h-5 w-5 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <input
                        v-model="patient.name"
                        type="text"
                        class="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Ingrese su nombre completo"
                      />
                    </div>
                    <p v-if="errors.name" class="mt-1 text-sm text-red-600">
                      {{ errors.name }}
                    </p>
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Correo Electrónico</label
                    >
                    <div class="relative">
                      <div
                        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                      >
                        <svg
                          class="h-5 w-5 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <input
                        v-model="patient.email"
                        type="email"
                        class="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Ingrese su correo electrónico"
                      />
                    </div>
                    <p v-if="errors.email" class="mt-1 text-sm text-red-600">
                      {{ errors.email }}
                    </p>
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Teléfono</label
                    >
                    <div class="relative">
                      <div
                        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                      >
                        <svg
                          class="h-5 w-5 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <input
                        v-model="patient.phone"
                        type="tel"
                        class="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Ingrese su número de teléfono"
                      />
                    </div>
                    <p v-if="errors.phone" class="mt-1 text-sm text-red-600">
                      {{ errors.phone }}
                    </p>
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Fecha de Nacimiento</label
                    >
                    <div class="relative">
                      <div
                        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                      >
                        <svg
                          class="h-5 w-5 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <input
                        v-model="patient.dateOfBirth"
                        type="date"
                        class="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                    <p
                      v-if="errors.dateOfBirth"
                      class="mt-1 text-sm text-red-600"
                    >
                      {{ errors.dateOfBirth }}
                    </p>
                  </div>
                </div>

                <div class="bg-blue-50 p-4 rounded-lg mt-6">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <svg
                        class="h-5 w-5 text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div class="ml-3">
                      <p class="text-sm text-blue-700">
                        Toda su información personal está protegida y solo será
                        utilizada para fines médicos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 2: Medical History -->
              <div v-if="currentStep === 1" key="medical" class="space-y-6">
                <div class="flex items-center space-x-3 mb-6">
                  <div class="bg-teal-100 p-2 rounded-full">
                    <svg
                      class="w-6 h-6 text-teal-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                  </div>
                  <h2 class="text-2xl font-bold text-gray-800">
                    Historial Médico
                  </h2>
                </div>

                <div class="space-y-6">
                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Condiciones Médicas Existentes</label
                    >
                    <textarea
                      v-model="patient.medicalHistory.conditions"
                      rows="3"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Liste cualquier condición médica que tenga (diabetes, hipertensión, etc.)"
                    ></textarea>
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Medicamentos Actuales</label
                    >
                    <textarea
                      v-model="patient.medicalHistory.medications"
                      rows="3"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Liste los medicamentos que toma actualmente, incluyendo dosis"
                    ></textarea>
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Alergias</label
                    >
                    <textarea
                      v-model="patient.medicalHistory.allergies"
                      rows="2"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Liste cualquier alergia que tenga (medicamentos, alimentos, etc.)"
                    ></textarea>
                  </div>

                  <div class="bg-gray-50 p-4 rounded-lg">
                    <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input
                          v-model="patient.medicalHistory.previousVisit"
                          type="checkbox"
                          class="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                        />
                      </div>
                      <div class="ml-3 text-sm">
                        <label class="font-medium text-gray-700"
                          >He visitado esta clínica anteriormente</label
                        >
                      </div>
                    </div>

                    <transition name="fade">
                      <div
                        v-if="patient.medicalHistory.previousVisit"
                        class="mt-4"
                      >
                        <label class="block text-sm font-medium text-gray-700"
                          >Fecha de la última visita</label
                        >
                        <input
                          v-model="patient.medicalHistory.lastVisitDate"
                          type="date"
                          class="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                        />
                      </div>
                    </transition>
                  </div>
                </div>
              </div>

              <!-- Step 3: Appointment Selection -->
              <div v-if="currentStep === 2" key="appointment" class="space-y-6">
                <div class="flex items-center space-x-3 mb-6">
                  <div class="bg-teal-100 p-2 rounded-full">
                    <svg
                      class="w-6 h-6 text-teal-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                  <h2 class="text-2xl font-bold text-gray-800">
                    Seleccionar Cita
                  </h2>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Tipo de Cita</label
                    >
                    <div class="relative">
                      <select
                        v-model="appointment.type"
                        class="appearance-none w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 bg-white"
                      >
                        <option value="">Seleccione un tipo de cita</option>
                        <option
                          v-for="type in appointmentTypes"
                          :key="type.id"
                          :value="type.id"
                        >
                          {{ type.name }} ({{ type.duration }} min)
                        </option>
                      </select>
                      <div
                        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                      >
                        <svg
                          class="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                          />
                        </svg>
                      </div>
                    </div>
                    <p
                      v-if="errors.appointmentType"
                      class="mt-1 text-sm text-red-600"
                    >
                      {{ errors.appointmentType }}
                    </p>
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Fecha de la Cita</label
                    >
                    <div class="relative">
                      <div
                        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                      >
                        <svg
                          class="h-5 w-5 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <input
                        v-model="appointment.date"
                        type="date"
                        class="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                        :min="minDate"
                      />
                    </div>
                    <p
                      v-if="errors.appointmentDate"
                      class="mt-1 text-sm text-red-600"
                    >
                      {{ errors.appointmentDate }}
                    </p>
                  </div>
                </div>

                <transition name="fade">
                  <div v-if="appointment.date && appointment.type" class="mt-6">
                    <div class="flex items-center justify-between mb-4">
                      <h3 class="text-lg font-medium text-gray-900">
                        Horarios Disponibles
                      </h3>
                      <span class="text-sm text-gray-500">{{
                        formatDate(appointment.date)
                      }}</span>
                    </div>

                    <div class="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      <button
                        v-for="slot in availableSlots"
                        :key="slot.id"
                        @click="selectTimeSlot(slot)"
                        class="relative px-4 py-3 border rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105"
                        :class="[
                          appointment.timeSlot === slot.id
                            ? 'bg-teal-500 text-white border-teal-500 shadow-md'
                            : 'border-gray-300 text-gray-700 hover:border-teal-300 hover:bg-teal-50',
                        ]"
                      >
                        <span>{{ slot.time }}</span>
                        <transition name="scale">
                          <svg
                            v-if="appointment.timeSlot === slot.id"
                            class="absolute top-1 right-1 w-4 h-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </transition>
                      </button>
                    </div>
                    <p v-if="errors.timeSlot" class="mt-2 text-sm text-red-600">
                      {{ errors.timeSlot }}
                    </p>
                  </div>
                </transition>

                <div
                  v-if="appointment.type"
                  class="mt-6 bg-gray-50 p-4 rounded-lg"
                >
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <svg
                        class="h-5 w-5 text-teal-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div class="ml-3">
                      <p class="text-sm text-gray-700">
                        {{ getAppointmentTypeName(appointment.type) }}:
                        {{ getAppointmentTypeDescription(appointment.type) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 4: Confirmation -->
              <div
                v-if="currentStep === 3"
                key="confirmation"
                class="space-y-6"
              >
                <div class="flex items-center space-x-3 mb-6">
                  <div class="bg-teal-100 p-2 rounded-full">
                    <svg
                      class="w-6 h-6 text-teal-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <h2 class="text-2xl font-bold text-gray-800">
                    Confirmar Cita
                  </h2>
                </div>

                <div
                  class="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
                >
                  <div class="px-6 py-4 bg-teal-500 text-white">
                    <div class="flex items-center justify-between">
                      <h3 class="text-lg font-semibold">Detalles de la Cita</h3>
                      <span class="text-sm opacity-90"
                        >Ref: #{{ generateReference() }}</span
                      >
                    </div>
                  </div>

                  <div class="p-6 space-y-6">
                    <div class="flex items-start">
                      <div class="flex-shrink-0">
                        <div class="bg-teal-100 p-2 rounded-full">
                          <svg
                            class="w-6 h-6 text-teal-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <div class="ml-4">
                        <h4 class="text-lg font-medium text-gray-900">
                          {{ getAppointmentTypeName(appointment.type) }}
                        </h4>
                        <div class="mt-1 flex items-center">
                          <span class="text-gray-600 mr-3">{{
                            formatDate(appointment.date)
                          }}</span>
                          <span
                            class="bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-0.5 rounded"
                          >
                            {{ getTimeSlot(appointment.timeSlot) }}
                          </span>
                        </div>
                        <p class="mt-1 text-sm text-gray-500">
                          Duración:
                          {{ getAppointmentTypeDuration(appointment.type) }}
                          minutos
                        </p>
                      </div>
                    </div>

                    <div class="border-t border-gray-200 pt-4">
                      <div class="flex items-start">
                        <div class="flex-shrink-0">
                          <div class="bg-blue-100 p-2 rounded-full">
                            <svg
                              class="w-6 h-6 text-blue-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              ></path>
                            </svg>
                          </div>
                        </div>
                        <div class="ml-4">
                          <h4 class="text-lg font-medium text-gray-900">
                            Información del Paciente
                          </h4>
                          <div
                            class="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2"
                          >
                            <div class="flex">
                              <span class="text-sm text-gray-500 w-20"
                                >Nombre:</span
                              >
                              <span class="text-sm text-gray-900">{{
                                patient.name
                              }}</span>
                            </div>
                            <div class="flex">
                              <span class="text-sm text-gray-500 w-20"
                                >Email:</span
                              >
                              <span class="text-sm text-gray-900">{{
                                patient.email
                              }}</span>
                            </div>
                            <div class="flex">
                              <span class="text-sm text-gray-500 w-20"
                                >Teléfono:</span
                              >
                              <span class="text-sm text-gray-900">{{
                                patient.phone
                              }}</span>
                            </div>
                            <div class="flex">
                              <span class="text-sm text-gray-500 w-20"
                                >Nacimiento:</span
                              >
                              <span class="text-sm text-gray-900">{{
                                formatDate(patient.dateOfBirth)
                              }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  class="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
                >
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <svg
                        class="h-5 w-5 text-yellow-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    </div>
                    <div class="ml-3">
                      <h3 class="text-sm font-medium text-yellow-800">
                        Importante
                      </h3>
                      <div class="mt-1 text-sm text-yellow-700">
                        <p>
                          Por favor llegue 15 minutos antes de su cita. Si
                          necesita cancelar, hágalo con al menos 24 horas de
                          anticipación.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mt-4">
                  <label class="flex items-start">
                    <input
                      v-model="agreement"
                      type="checkbox"
                      class="h-5 w-5 mt-1 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    />
                    <span class="ml-3 text-sm text-gray-700">
                      Acepto los términos y condiciones y confirmo que la
                      información proporcionada es correcta. Entiendo que se
                      aplicarán cargos por cancelación tardía.
                    </span>
                  </label>
                  <p v-if="errors.agreement" class="mt-1 text-sm text-red-600">
                    {{ errors.agreement }}
                  </p>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <!-- Navigation buttons -->
        <div
          class="px-6 py-4 bg-gray-50 flex justify-between items-center border-t border-gray-200"
        >
          <transition name="fade">
            <button
              v-if="currentStep > 0"
              @click="prevStep"
              class="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200"
            >
              <svg
                class="mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Anterior
            </button>
            <div v-else></div>
          </transition>

          <div class="flex items-center">
            <div class="hidden sm:flex items-center mr-4">
              <span class="text-sm text-gray-500"
                >Paso {{ currentStep + 1 }} de {{ steps.length }}</span
              >
            </div>

            <button
              v-if="currentStep < steps.length - 1"
              @click="nextStep"
              class="flex items-center px-5 py-2 bg-teal-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200"
            >
              Siguiente
              <svg
                class="ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <button
              v-else
              @click="submitAppointment"
              class="flex items-center px-5 py-2 bg-teal-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting" class="flex items-center">
                <svg
                  class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Procesando...
              </span>
              <span v-else>Confirmar Cita</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Doctor information card -->
      <div
        v-if="currentStep === 2 && appointment.type"
        class="mt-8 bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 transform hover:scale-[1.02]"
      >
        <div class="md:flex">
          <div class="md:flex-shrink-0">
            <img
              class="h-48 w-full object-cover md:w-48"
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
              alt="Doctor"
            />
          </div>
          <div class="p-8">
            <div
              class="uppercase tracking-wide text-sm text-teal-500 font-semibold"
            >
              {{ getDoctorSpecialty(appointment.type) }}
            </div>
            <h2 class="mt-1 text-xl font-semibold text-gray-900">
              {{ getDoctorName(appointment.type) }}
            </h2>
            <p class="mt-2 text-gray-600">
              {{ getDoctorBio(appointment.type) }}
            </p>
            <div class="mt-4 flex items-center">
              <div class="flex">
                <svg
                  class="w-4 h-4 text-yellow-400 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  ></path>
                </svg>
                <svg
                  class="w-4 h-4 text-yellow-400 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  ></path>
                </svg>
                <svg
                  class="w-4 h-4 text-yellow-400 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  ></path>
                </svg>
                <svg
                  class="w-4 h-4 text-yellow-400 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  ></path>
                </svg>
                <svg
                  class="w-4 h-4 text-yellow-400 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  ></path>
                </svg>
              </div>
              <span class="ml-2 text-sm text-gray-600">128 valoraciones</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal with animation -->
    <transition name="modal">
      <div
        v-if="showSuccessModal"
        class="fixed inset-0 z-50 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
        >
          <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          ></div>
          <span
            class="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
            >&#8203;</span
          >
          <div
            class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
          >
            <div>
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
              <div class="mt-3 text-center sm:mt-5">
                <h3
                  class="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  ¡Cita Confirmada!
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Su cita ha sido reservada exitosamente para el
                    {{ formatDate(appointment.date) }} a las
                    {{ getTimeSlot(appointment.timeSlot) }}. Hemos enviado un
                    correo electrónico de confirmación a {{ patient.email }} con
                    todos los detalles.
                  </p>
                </div>
                <div class="mt-4 bg-blue-50 p-4 rounded-lg">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <svg
                        class="h-5 w-5 text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div class="ml-3">
                      <p class="text-sm text-blue-700">
                        Por favor llegue 15 minutos antes de su cita y traiga su
                        identificación.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-5 sm:mt-6">
              <button
                @click="resetForm"
                class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:text-sm"
              >
                Volver al Inicio
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
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
  description: string;
}

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  bio: string;
}

interface Errors {
  [key: string]: string;
}

// State
const steps = [
  "Datos Personales",
  "Historial Médico",
  "Agendar Cita",
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
const appointmentTypes: AppointmentType[] = [
  {
    id: "general",
    name: "Consulta General",
    duration: 30,
    description:
      "Consulta médica general para evaluación de síntomas, diagnóstico y tratamiento de condiciones comunes.",
  },
  {
    id: "specialist",
    name: "Especialista",
    duration: 45,
    description:
      "Consulta con médico especialista para condiciones específicas que requieren atención especializada.",
  },
  {
    id: "followup",
    name: "Seguimiento",
    duration: 20,
    description:
      "Consulta de seguimiento para revisar progreso de tratamiento y ajustar según sea necesario.",
  },
  {
    id: "emergency",
    name: "Urgencia",
    duration: 60,
    description:
      "Atención inmediata para condiciones que requieren intervención urgente pero no son amenazantes para la vida.",
  },
];

// Mock data for doctors
const doctors: Doctor[] = [
  {
    id: "general",
    name: "Dra. María Rodríguez",
    specialty: "Medicina General",
    bio: "Especialista en medicina familiar con más de 15 años de experiencia. Enfoque en medicina preventiva y atención integral.",
  },
  {
    id: "specialist",
    name: "Dr. Carlos Mendoza",
    specialty: "Cardiología",
    bio: "Cardiólogo certificado con experiencia en diagnóstico y tratamiento de enfermedades cardiovasculares complejas.",
  },
  {
    id: "followup",
    name: "Dra. Ana Gómez",
    specialty: "Medicina Interna",
    bio: "Especialista en seguimiento de pacientes con condiciones crónicas. Enfoque en mejorar calidad de vida.",
  },
  {
    id: "emergency",
    name: "Dr. Javier Sánchez",
    specialty: "Medicina de Emergencia",
    bio: "Especialista en atención de urgencias médicas con amplia experiencia en situaciones críticas.",
  },
];

// Mock data for available time slots
const mockTimeSlots: TimeSlot[] = [
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
    // Scroll to top when changing steps
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const prevStep = () => {
  currentStep.value--;
  // Scroll to top when changing steps
  window.scrollTo({ top: 0, behavior: "smooth" });
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

const getAppointmentTypeDescription = (typeId: string): string => {
  const type = appointmentTypes.find((t) => t.id === typeId);
  return type ? type.description : "";
};

const getAppointmentTypeDuration = (typeId: string): number => {
  const type = appointmentTypes.find((t) => t.id === typeId);
  return type ? type.duration : 0;
};

const getTimeSlot = (slotId: string): string => {
  const slot = mockTimeSlots.find((s) => s.id === slotId);
  return slot ? slot.time : "";
};

const getDoctorName = (typeId: string): string => {
  const doctor = doctors.find((d) => d.id === typeId);
  return doctor ? doctor.name : "";
};

const getDoctorSpecialty = (typeId: string): string => {
  const doctor = doctors.find((d) => d.id === typeId);
  return doctor ? doctor.specialty : "";
};

const getDoctorBio = (typeId: string): string => {
  const doctor = doctors.find((d) => d.id === typeId);
  return doctor ? doctor.bio : "";
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

const generateReference = (): string => {
  // Generate a random reference number for the appointment
  return (
    "CM" +
    Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")
  );
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
</script>

<style>
/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.2s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0);
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
