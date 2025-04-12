<template>
  <div>
    <div class="flex flex-col sm:flex-row gap-4">
      <!-- Calendar section -->
      <div class="flex-1">
        <div class="flex justify-between items-center mb-3">
          <div class="flex items-center">
            <Icon icon="mdi:calendar" class="w-4 h-4 text-emerald-600 mr-1.5" />
            <h3 class="text-sm font-medium text-slate-700">Seleccione fecha</h3>
          </div>
          <div class="flex space-x-1">
            <UButton
              @click="previousMonth"
              class="p-1 rounded hover:bg-slate-100 transition-colors"
              aria-label="Mes anterior"
            >
              <Icon
                icon="mdi:chevron-left"
                class="w-3.5 h-3.5 text-slate-600"
              />
            </UButton>
            <UButton
              @click="nextMonth"
              class="p-1 rounded hover:bg-slate-100 transition-colors"
              aria-label="Mes siguiente"
            >
              <Icon
                icon="mdi:chevron-right"
                class="w-3.5 h-3.5 text-slate-600"
              />
            </UButton>
          </div>
        </div>

        <div class="text-xs font-medium text-slate-700 mb-2">
          {{ months[currentMonth] }} {{ currentYear }}
        </div>

        <div
          class="bg-white rounded-md border border-slate-200 overflow-hidden shadow-sm"
        >
          <div
            class="grid grid-cols-7 text-center p-1 bg-slate-50 border-b border-slate-200"
          >
            <div
              v-for="day in weekDays"
              :key="day"
              class="text-[10px] font-semibold text-slate-500 py-1 uppercase tracking-wider"
            >
              {{ day }}
            </div>
          </div>
          <div class="grid grid-cols-7 p-1 gap-1">
            <UButton
              v-for="(day, index) in calendarDays"
              :key="index"
              :disabled="!day.available"
              @click="selectDate(day)"
              class="aspect-square flex items-center justify-center rounded text-xs transition-all duration-200 relative"
              :class="{
                'bg-slate-100 text-slate-400 cursor-not-allowed':
                  !day.available,
                'hover:bg-slate-100': day.available && !isSelectedDate(day),
                'bg-emerald-600 text-white': isSelectedDate(day),
                'text-slate-800': day.available && !isSelectedDate(day),
                'opacity-40': day.month !== currentMonth,
              }"
            >
              {{ day.day }}
              <span
                v-if="isToday(day)"
                class="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full"
                :class="isSelectedDate(day) ? 'bg-white' : 'bg-emerald-600'"
              />
            </UButton>
          </div>
        </div>
      </div>

      <!-- Time selector section -->
      <div class="flex-1">
        <div class="flex items-center mb-3">
          <Icon
            icon="mdi:clock-outline"
            class="w-4 h-4 text-emerald-600 mr-1.5"
          />
          <h3 class="text-sm font-medium text-slate-700">Seleccione hora</h3>
        </div>

        <div class="bg-white rounded-md border border-slate-200 p-3 h-full">
          <div
            v-if="!formData.date"
            class="flex items-center justify-center h-full text-xs text-slate-500"
          >
            <Icon icon="mdi:information-outline" class="w-4 h-4 mr-1.5" />
            Seleccione una fecha para ver horarios disponibles
          </div>
          <div v-else class="grid grid-cols-2 gap-2">
            <UButton
              v-for="time in availableTimes"
              :key="time"
              @click="formData.time = time"
              class="py-2 px-2 rounded text-xs transition-all duration-200 flex items-center justify-center border"
              :class="
                formData.time === time
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-300'
              "
            >
              <Icon icon="mdi:clock" class="mr-1.5 w-3 h-3" />
              {{ time }}
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="formData.date && formData.time"
      class="bg-green-50 rounded-md p-3 border border-green-100 mt-4"
    >
      <div class="flex">
        <Icon
          icon="mdi:calendar-check"
          class="text-green-500 w-4 h-4 mr-2 flex-shrink-0 mt-0.5"
        />
        <div>
          <h4 class="font-medium text-green-700 mb-0.5 text-xs">
            Cita seleccionada
          </h4>
          <p class="text-green-600 text-xs">
            {{ formatDate(formData.date) }} a las {{ formData.time }} con
            {{ getDoctorName(formData.doctor) }}
          </p>
        </div>
      </div>
    </div>

    <p v-if="errors.time" class="text-xs text-red-500 mt-2 flex items-center">
      <Icon icon="mdi:alert-circle" class="w-3 h-3 mr-1" />
      {{ errors.time }}
    </p>
  </div>
</template>

<script lang="ts" setup>
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
  // Set default values
  currentMonth.value = 3; // April (0-indexed)
  currentYear.value = 2025;
});
</script>
