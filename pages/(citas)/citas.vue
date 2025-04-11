<template>
  <div class="min-h-screen bg-slate-50 font-sans">
    <!-- Header móvil -->

    <div class="lg:flex">
      <!-- Sidebar (visible en desktop) -->
      <aside
        class="hidden lg:block lg:w-80 xl:w-96 bg-white border-r border-slate-200 h-screen sticky top-0 overflow-auto p-8"
      >
        <div class="mb-8">
          <h2 class="text-3xl font-bold text-slate-900 mb-2">
            Reserva Una Cita
          </h2>
          <p class="text-slate-500">
            Complete los pasos para agendar su consulta médica.
          </p>
        </div>

        <div class="space-y-8">
          <div>
            <h3
              class="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3"
            >
              Horarios
            </h3>
            <div class="space-y-3 text-slate-700">
              <div class="flex items-center p-3 bg-slate-50 rounded-lg">
                <Icon
                  icon="mdi:calendar-clock"
                  class="w-6 h-6 text-primary mr-3"
                />
                <div>
                  <div class="font-medium">Lunes – Viernes</div>
                  <div class="text-sm text-slate-500">08:00 am – 18:00 pm</div>
                </div>
              </div>
              <div class="flex items-center p-3 bg-slate-50 rounded-lg">
                <Icon
                  icon="mdi:calendar-weekend"
                  class="w-6 h-6 text-primary mr-3"
                />
                <div>
                  <div class="font-medium">Sábado</div>
                  <div class="text-sm text-slate-500">08:00 am – 12:00 pm</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3
              class="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3"
            >
              Dirección
            </h3>
            <div class="flex items-start p-3 bg-slate-50 rounded-lg">
              <Icon
                icon="mdi:map-marker"
                class="w-6 h-6 text-primary mr-3 mt-0.5 flex-shrink-0"
              />
              <div class="text-slate-700">
                Obrajes, Avenida Costanerita Oncoclinic<br />
                entre calles 5 y 6 N 71.<br />
                La Paz – Bolivia
              </div>
            </div>
          </div>

          <div class="p-4 bg-primary/10 rounded-xl border border-primary/20">
            <div class="flex items-start">
              <Icon
                icon="mdi:information-outline"
                class="text-primary w-6 h-6 mr-3 mt-0.5 flex-shrink-0"
              />
              <div>
                <h4 class="font-medium text-primary mb-1">
                  Información importante
                </h4>
                <p class="text-sm text-slate-600">
                  Recuerde llegar 15 minutos antes de su cita. Si necesita
                  cancelar, por favor hágalo con 24 horas de anticipación.
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Contenido principal -->
      <main class="flex-1 min-h-screen">
        <!-- Indicador de progreso -->
        <div
          class="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm lg:top-0"
        >
          <div class="container mx-auto px-4 py-1">
            <div class="flex items-center justify-between max-w-3xl mx-auto">
              <div
                v-for="(step, index) in steps"
                :key="index"
                class="flex flex-col items-center relative group"
                :class="{
                  'text-primary': currentStep >= index,
                  'text-slate-400': currentStep < index,
                }"
              >
                <div
                  class="flex items-center justify-center w-12 h-12 rounded-full bg-white mb-1 transition-all duration-300 z-10"
                  :class="{
                    'bg-primary text-white shadow-md shadow-primary/30':
                      currentStep > index,
                    'border-3 border-primary bg-white text-primary':
                      currentStep === index,
                    'border-3 border-slate-300 text-slate-400':
                      currentStep < index,
                  }"
                >
                  <Icon
                    v-if="currentStep <= index"
                    :icon="step.icon"
                    class="w-6 h-6"
                  />
                  <Icon v-else icon="mdi:check" class="w-6 h-6" />
                </div>
                <span class="text-xs font-medium whitespace-nowrap">{{
                  step.label
                }}</span>

                <!-- Línea conectora -->
                <div
                  v-if="index < steps.length - 1"
                  class="absolute h-1 w-[240px] left-1/2 top-6 -translate-y-1/2 z-0"
                  :class="currentStep > index ? 'bg-primary' : 'bg-slate-300'"
                  style="transform: translateX(0%)"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Contenido del paso actual -->
        <div class="container mx-auto px-4 py-3">
          <div class="max-w-3xl mx-auto">
            <!-- Título del paso actual -->
            <div class="mb-6">
              <div class="flex items-center">
                <button
                  v-if="currentStep > 0"
                  @click="currentStep--"
                  class="mr-3 p-2 rounded-full hover:bg-slate-100 transition-colors"
                  aria-label="Volver al paso anterior"
                >
                  <Icon icon="mdi:arrow-left" class="w-5 h-5 text-slate-600" />
                </button>
                <h2 class="text-2xl font-bold text-slate-800">
                  {{ steps[currentStep].label }}
                </h2>
              </div>
              <p class="text-slate-500 mt-1">
                {{ steps[currentStep].description }}
              </p>
            </div>

            <div
              class="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden transition-all duration-300"
            >
              <!-- Contenido del paso -->
              <div class="p-6 md:p-8">
                <!-- Paso 1: Selección de médico -->
                <div v-if="currentStep === 0" class="space-y-6">
                  <div class="space-y-4">
                    <label class="block text-base font-medium text-slate-700">
                      Seleccione un médico <span class="text-primary">*</span>
                    </label>
                    <div class="space-y-2">
                      <div
                        v-for="doctor in doctors"
                        :key="doctor.id"
                        @click="formData.doctor = doctor.id"
                        class="flex items-center px-4 py-1 border-2 rounded-xl cursor-pointer transition-all duration-200"
                        :class="{
                          'border-primary bg-primary/5 shadow-sm':
                            formData.doctor === doctor.id,
                          'border-slate-200 hover:border-slate-300 hover:bg-slate-50':
                            formData.doctor !== doctor.id,
                        }"
                      >
                        <div
                          class="w-14 h-14 rounded-full flex items-center justify-center mr-4 flex-shrink-0"
                          :class="{
                            'bg-primary text-white':
                              formData.doctor === doctor.id,
                            'bg-slate-100 text-slate-600':
                              formData.doctor !== doctor.id,
                          }"
                        >
                          <Icon icon="mdi:doctor" class="w-7 h-7" />
                        </div>
                        <div class="flex-1">
                          <div class="font-medium text-slate-800 text-lg">
                            {{ doctor.name }}
                          </div>
                          <div class="text-slate-500">
                            {{ doctor.specialty }}
                          </div>
                        </div>
                        <div
                          class="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                          :class="{
                            'border-primary bg-primary':
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
                      <Icon icon="mdi:alert-circle" class="w-4 h-4 mr-1" />
                      {{ errors.doctor }}
                    </p>
                  </div>

                  <div class="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <div class="flex">
                      <Icon
                        icon="mdi:information"
                        class="text-blue-500 w-6 h-6 mr-3 flex-shrink-0 mt-0.5"
                      />
                      <div>
                        <h4 class="font-medium text-blue-700 mb-1">
                          Especialistas disponibles
                        </h4>
                        <p class="text-blue-600">
                          Todos nuestros médicos son especialistas certificados
                          con amplia experiencia en su campo. Seleccione el
                          especialista que mejor se adapte a sus necesidades
                          médicas.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Paso 2: Selección de fecha y hora -->
                <div v-else-if="currentStep === 1" class="space-y-4">
                  <!-- Selector de mes y año -->
                  <div
                    class="flex flex-wrap justify-between items-center gap-3"
                  >
                    <div class="flex flex-wrap gap-3">
                      <div class="relative">
                        <select
                          v-model="currentMonth"
                          class="pl-10 pr-10 py-3 rounded-xl border-2 border-slate-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-20 bg-white text-base"
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
                          class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500"
                        />
                      </div>
                      <div class="relative">
                        <select
                          v-model="currentYear"
                          class="pl-10 pr-10 py-3 rounded-xl border-2 border-slate-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-20 bg-white text-base"
                        >
                          <option
                            v-for="year in years"
                            :key="year"
                            :value="year"
                          >
                            {{ year }}
                          </option>
                        </select>
                        <Icon
                          icon="mdi:calendar-today"
                          class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500"
                        />
                      </div>
                    </div>
                    <div class="flex space-x-2">
                      <button
                        @click="previousMonth"
                        class="p-3 rounded-xl hover:bg-slate-100 transition-colors border-2 border-slate-200"
                        aria-label="Mes anterior"
                      >
                        <Icon
                          icon="mdi:chevron-left"
                          class="w-5 h-5 text-slate-600"
                        />
                      </button>
                      <button
                        @click="nextMonth"
                        class="p-3 rounded-xl hover:bg-slate-100 transition-colors border-2 border-slate-200"
                        aria-label="Mes siguiente"
                      >
                        <Icon
                          icon="mdi:chevron-right"
                          class="w-5 h-5 text-slate-600"
                        />
                      </button>
                    </div>
                  </div>

                  <!-- Calendario -->
                  <div
                    class="bg-white rounded-xl border-2 border-slate-200 overflow-hidden shadow-sm"
                  >
                    <div
                      class="grid grid-cols-7 text-center p-3 bg-slate-50 border-b-2 border-slate-200"
                    >
                      <div
                        v-for="day in weekDays"
                        :key="day"
                        class="text-sm font-semibold text-slate-500 py-2 uppercase tracking-wider"
                      >
                        {{ day }}
                      </div>
                    </div>
                    <div class="grid grid-cols-7 p-3 gap-2">
                      <button
                        v-for="(day, index) in calendarDays"
                        :key="index"
                        :disabled="!day.available"
                        @click="selectDate(day)"
                        class="aspect-square flex items-center justify-center rounded-xl text-base transition-all duration-200 relative"
                        :class="{
                          'bg-slate-100 text-slate-400 cursor-not-allowed':
                            !day.available,
                          'hover:bg-slate-100 hover:scale-105':
                            day.available && !isSelectedDate(day),
                          'bg-primary text-white scale-105 shadow-md':
                            isSelectedDate(day),
                          'text-slate-800':
                            day.available && !isSelectedDate(day),
                          'opacity-40': day.month !== currentMonth,
                        }"
                      >
                        {{ day.day }}
                        <span
                          v-if="isToday(day)"
                          class="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                          :class="
                            isSelectedDate(day) ? 'bg-white' : 'bg-primary'
                          "
                        ></span>
                      </button>
                    </div>
                  </div>

                  <!-- Selector de hora -->
                  <div v-if="formData.date" class="space-y-4">
                    <h3
                      class="font-medium text-slate-700 flex items-center text-lg"
                    >
                      <Icon
                        icon="mdi:clock-outline"
                        class="mr-2 text-primary w-5 h-5"
                      />
                      Horarios disponibles
                    </h3>
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <button
                        v-for="time in availableTimes"
                        :key="time"
                        @click="formData.time = time"
                        class="py-3 px-3 rounded-xl text-base transition-all duration-200 flex items-center justify-center border-2"
                        :class="
                          formData.time === time
                            ? 'bg-primary text-white border-primary shadow-md'
                            : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-300'
                        "
                      >
                        <Icon icon="mdi:clock" class="mr-2 w-5 h-5" />
                        {{ time }}
                      </button>
                    </div>
                    <p
                      v-if="errors.time"
                      class="text-sm text-red-500 mt-2 flex items-center"
                    >
                      <Icon icon="mdi:alert-circle" class="w-4 h-4 mr-1" />
                      {{ errors.time }}
                    </p>
                  </div>

                  <div
                    v-if="formData.date && formData.time"
                    class="bg-green-50 rounded-xl p-4 border-2 border-green-100 mt-4"
                  >
                    <div class="flex">
                      <Icon
                        icon="mdi:calendar-check"
                        class="text-green-500 w-6 h-6 mr-3 flex-shrink-0 mt-0.5"
                      />
                      <div>
                        <h4 class="font-medium text-green-700 mb-1 text-lg">
                          Cita seleccionada
                        </h4>
                        <p class="text-green-600">
                          {{ formatDate(formData.date) }} a las
                          {{ formData.time }} con
                          {{ getDoctorName(formData.doctor) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Paso 3: Información personal -->
                <div v-else-if="currentStep === 2" class="space-y-8">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-2">
                      <label class="block text-base font-medium text-slate-700">
                        Nombre <span class="text-primary">*</span>
                      </label>
                      <div class="relative">
                        <input
                          v-model="formData.firstName"
                          type="text"
                          class="block w-full rounded-xl border-2 border-slate-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-20 pl-12 py-3 text-base"
                          placeholder="Ingrese su nombre"
                        />
                        <div
                          class="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center border-r-2 border-slate-200"
                        >
                          <Icon
                            icon="mdi:account"
                            class="w-5 h-5 text-slate-500"
                          />
                        </div>
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
                      <label class="block text-base font-medium text-slate-700">
                        Apellido
                      </label>
                      <div class="relative">
                        <input
                          v-model="formData.lastName"
                          type="text"
                          class="block w-full rounded-xl border-2 border-slate-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-20 pl-12 py-3 text-base"
                          placeholder="Ingrese su apellido"
                        />
                        <div
                          class="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center border-r-2 border-slate-200"
                        >
                          <Icon
                            icon="mdi:account-outline"
                            class="w-5 h-5 text-slate-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="space-y-2">
                    <label class="block text-base font-medium text-slate-700">
                      Teléfono <span class="text-primary">*</span>
                    </label>
                    <div class="flex">
                      <div class="w-32 relative">
                        <select
                          v-model="formData.countryCode"
                          class="block w-full rounded-l-xl border-2 border-slate-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-20 pl-10 py-3 text-base"
                        >
                          <option value="+591">🇧🇴 +591</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+34">🇪🇸 +34</option>
                        </select>
                        <div
                          class="absolute left-2 top-0 bottom-0 w-8 flex items-center justify-center"
                        >
                          <Icon
                            icon="mdi:earth"
                            class="w-5 h-5 text-slate-500"
                          />
                        </div>
                      </div>
                      <div class="flex-1 relative">
                        <input
                          v-model="formData.phone"
                          type="tel"
                          class="block w-full rounded-r-xl border-2 border-l-0 border-slate-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-20 pl-12 py-3 text-base"
                          placeholder="Número de teléfono"
                        />
                        <div
                          class="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center border-r-2 border-slate-200"
                        >
                          <Icon
                            icon="mdi:phone"
                            class="w-5 h-5 text-slate-500"
                          />
                        </div>
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
                    class="mt-4 bg-slate-50 rounded-xl p-5 border-2 border-slate-200"
                  >
                    <div class="flex items-start">
                      <Icon
                        icon="mdi:shield-check"
                        class="text-primary w-6 h-6 mr-3 flex-shrink-0 mt-0.5"
                      />
                      <div>
                        <h4 class="font-medium text-slate-700 mb-1 text-lg">
                          Protección de datos
                        </h4>
                        <p class="text-slate-600">
                          Sus datos personales están protegidos y solo serán
                          utilizados para gestionar su cita médica. No
                          compartiremos su información con terceros sin su
                          consentimiento.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Paso 4: Confirmación -->
                <div v-else-if="currentStep === 3" class="space-y-8">
                  <div class="flex justify-center mb-8">
                    <div
                      class="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center"
                    >
                      <Icon
                        icon="mdi:check-circle"
                        class="w-16 h-16 text-green-500"
                      />
                    </div>
                  </div>

                  <div class="text-center mb-8">
                    <h3 class="text-3xl font-bold text-slate-800 mb-2">
                      ¡Cita Confirmada!
                    </h3>
                    <p class="text-slate-500 text-lg">
                      Su cita ha sido agendada correctamente
                    </p>
                    <div
                      class="inline-block bg-primary/10 text-primary font-medium px-4 py-2 rounded-full text-base mt-3"
                    >
                      ID de cita: #{{ appointmentId }}
                    </div>
                  </div>

                  <div
                    class="bg-white rounded-xl border-2 border-slate-200 overflow-hidden shadow-md divide-y-2 divide-slate-100"
                  >
                    <div class="p-5 bg-slate-50">
                      <h4 class="font-semibold text-slate-800 text-lg">
                        Detalles de la cita
                      </h4>
                    </div>

                    <div class="p-5 flex justify-between items-center">
                      <span class="text-slate-500 flex items-center">
                        <Icon
                          icon="mdi:calendar"
                          class="mr-3 text-primary w-6 h-6"
                        />
                        Fecha:
                      </span>
                      <span class="font-medium text-slate-800 text-lg">{{
                        formatDate(formData.date)
                      }}</span>
                    </div>

                    <div class="p-5 flex justify-between items-center">
                      <span class="text-slate-500 flex items-center">
                        <Icon
                          icon="mdi:clock"
                          class="mr-3 text-primary w-6 h-6"
                        />
                        Hora:
                      </span>
                      <span class="font-medium text-slate-800 text-lg">{{
                        formData.time
                      }}</span>
                    </div>

                    <div class="p-5 flex justify-between items-center">
                      <span class="text-slate-500 flex items-center">
                        <Icon
                          icon="mdi:doctor"
                          class="mr-3 text-primary w-6 h-6"
                        />
                        Médico:
                      </span>
                      <span class="font-medium text-slate-800 text-lg">{{
                        getDoctorName(formData.doctor)
                      }}</span>
                    </div>

                    <div class="p-5 flex justify-between items-center">
                      <span class="text-slate-500 flex items-center">
                        <Icon
                          icon="mdi:hospital-building"
                          class="mr-3 text-primary w-6 h-6"
                        />
                        Centro médico:
                      </span>
                      <span class="font-medium text-slate-800 text-lg"
                        >Oncoclinic Bolivia</span
                      >
                    </div>
                  </div>

                  <div
                    class="bg-white rounded-xl border-2 border-slate-200 overflow-hidden shadow-md divide-y-2 divide-slate-100"
                  >
                    <div class="p-5 bg-slate-50">
                      <h4 class="font-semibold text-slate-800 text-lg">
                        Información del paciente
                      </h4>
                    </div>

                    <div class="p-5 flex justify-between items-center">
                      <span class="text-slate-500 flex items-center">
                        <Icon
                          icon="mdi:account"
                          class="mr-3 text-primary w-6 h-6"
                        />
                        Nombre:
                      </span>
                      <span class="font-medium text-slate-800 text-lg"
                        >{{ formData.firstName }} {{ formData.lastName }}</span
                      >
                    </div>

                    <div class="p-5 flex justify-between items-center">
                      <span class="text-slate-500 flex items-center">
                        <Icon
                          icon="mdi:email"
                          class="mr-3 text-primary w-6 h-6"
                        />
                        Email:
                      </span>
                      <span class="font-medium text-slate-800 text-lg">{{
                        formData.email
                      }}</span>
                    </div>

                    <div class="p-5 flex justify-between items-center">
                      <span class="text-slate-500 flex items-center">
                        <Icon
                          icon="mdi:phone"
                          class="mr-3 text-primary w-6 h-6"
                        />
                        Teléfono:
                      </span>
                      <span class="font-medium text-slate-800 text-lg"
                        >{{ formData.countryCode }} {{ formData.phone }}</span
                      >
                    </div>
                  </div>

                  <div class="space-y-4 mt-8">
                    <h4
                      class="font-medium text-slate-700 flex items-center text-lg"
                    >
                      <Icon
                        icon="mdi:calendar-plus"
                        class="mr-2 text-primary w-6 h-6"
                      />
                      Añadir al calendario
                    </h4>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <button
                        class="flex flex-col items-center justify-center p-5 border-2 border-slate-200 rounded-xl hover:bg-slate-50 transition-colors hover:border-primary group shadow-sm"
                      >
                        <Icon
                          icon="mdi:google"
                          class="w-10 h-10 text-[#4285F4] group-hover:scale-110 transition-transform"
                        />
                        <span
                          class="text-base mt-2 group-hover:text-primary transition-colors"
                          >Google</span
                        >
                      </button>
                      <button
                        class="flex flex-col items-center justify-center p-5 border-2 border-slate-200 rounded-xl hover:bg-slate-50 transition-colors hover:border-primary group shadow-sm"
                      >
                        <Icon
                          icon="mdi:microsoft-outlook"
                          class="w-10 h-10 text-[#0078D4] group-hover:scale-110 transition-transform"
                        />
                        <span
                          class="text-base mt-2 group-hover:text-primary transition-colors"
                          >Outlook</span
                        >
                      </button>
                      <button
                        class="flex flex-col items-center justify-center p-5 border-2 border-slate-200 rounded-xl hover:bg-slate-50 transition-colors hover:border-primary group shadow-sm"
                      >
                        <Icon
                          icon="mdi:yahoo"
                          class="w-10 h-10 text-[#6001D2] group-hover:scale-110 transition-transform"
                        />
                        <span
                          class="text-base mt-2 group-hover:text-primary transition-colors"
                          >Yahoo</span
                        >
                      </button>
                      <button
                        class="flex flex-col items-center justify-center p-5 border-2 border-slate-200 rounded-xl hover:bg-slate-50 transition-colors hover:border-primary group shadow-sm"
                      >
                        <Icon
                          icon="mdi:apple"
                          class="w-10 h-10 text-[#000000] group-hover:scale-110 transition-transform"
                        />
                        <span
                          class="text-base mt-2 group-hover:text-primary transition-colors"
                          >Apple</span
                        >
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Pie del paso -->
              <div
                class="p-6 md:p-8 border-t-2 border-slate-200 bg-slate-50 flex justify-between items-center"
              >
                <div class="text-sm text-slate-500 flex items-center">
                  <Icon
                    icon="mdi:shield-lock"
                    class="w-5 h-5 mr-2 text-primary"
                  />
                  Conexión segura
                </div>
                <button
                  v-if="currentStep < steps.length - 1"
                  @click="nextStep"
                  class="px-8 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors flex items-center shadow-md text-base font-medium"
                >
                  Continuar
                  <Icon icon="mdi:arrow-right" class="ml-2 w-5 h-5" />
                </button>
                <button
                  v-else
                  @click="finishBooking"
                  class="px-8 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors flex items-center shadow-md text-base font-medium"
                >
                  Finalizar
                  <Icon icon="mdi:check" class="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import personnel from "~/mocks/doctors";

// Tipos
interface Step {
  label: string;
  icon: string;
  description: string;
}

interface Doctor {
  id: number;
  name: string;
  specialty: string;
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
const appointmentId = ref(Math.floor(Math.random() * 9000) + 1000);
const mobileMenuOpen = ref(false);
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
const doctors = ref<Doctor[]>(personnel);

// Pasos del formulario
const steps = ref<Step[]>([
  {
    label: "Médicos",
    icon: "mdi:doctor",
    description: "Seleccione el especialista para su consulta",
  },
  {
    label: "Fecha y Hora",
    icon: "mdi:calendar-clock",
    description: "Elija el día y horario que prefiera",
  },
  {
    label: "Información",
    icon: "mdi:account-details",
    description: "Complete sus datos personales",
  },
  {
    label: "Confirmación",
    icon: "mdi:check-circle",
    description: "Revise y confirme su cita",
  },
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
  "9:00 a.m.",
  "10:00 a.m.",
  "11:00 a.m.",
  "12:00 p.m.",
  "2:00 p.m.",
  "3:00 p.m.",
  "4:00 p.m.",
  "5:00 p.m.",
];

// Métodos
const nextStep = () => {
  if (validateCurrentStep()) {
    currentStep.value++;
    // Scroll al inicio cuando cambia de paso
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Cerrar menú móvil si está abierto
    mobileMenuOpen.value = false;
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

  const doctor = doctors.value.find((d) => d.id === doctorId);
  return doctor ? doctor.name : "";
};

const finishBooking = () => {
  // Aquí iría la lógica para enviar los datos al servidor
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

<style scoped>
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

/* Estilos personalizados para mejorar la experiencia */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* Mejoras de accesibilidad */
button:focus,
input:focus,
select:focus {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

/* Animaciones sutiles */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-in-out;
}

/* Corrección para inputs */
input,
select {
  height: auto;
  line-height: 1.5;
}

/* Mejora de sombras */
.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Mejora de bordes redondeados */
.rounded-xl {
  border-radius: 0.75rem;
}
</style>
