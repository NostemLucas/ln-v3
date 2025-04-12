<template>
  <div v-if="currentStep === 0" class="grid sm:grid-cols-2 gap-3">
    <div
      v-for="doctor in doctors"
      :key="doctor.id"
      @click="formData.doctor = doctor.id"
      class="flex items-center p-3 border rounded-md cursor-pointer transition-all duration-200"
      :class="{
        'border-emerald-600 bg-emerald-50 shadow-sm':
          formData.doctor === doctor.id,
        'border-slate-200 hover:border-slate-300 hover:bg-slate-50':
          formData.doctor !== doctor.id,
      }"
    >
      <div
        class="w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
        :class="{
          'bg-emerald-600 text-white': formData.doctor === doctor.id,
          'bg-slate-100 text-slate-600': formData.doctor !== doctor.id,
        }"
      >
        <Icon icon="mdi:doctor" class="w-5 h-5" />
      </div>
      <div class="flex-1">
        <div class="font-medium text-slate-800 text-sm">
          {{ doctor.name }}
        </div>
        <div class="text-slate-500 text-xs">
          {{ doctor.specialty }}
        </div>
      </div>
      <div
        class="w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0"
        :class="{
          'border-emerald-600 bg-emerald-600': formData.doctor === doctor.id,
          'border-slate-300': formData.doctor !== doctor.id,
        }"
      >
        <Icon
          v-if="formData.doctor === doctor.id"
          icon="mdi:check"
          class="w-3 h-3 text-white"
        />
      </div>
    </div>
    <p
      v-if="errors.doctor"
      class="text-xs text-red-500 mt-1 flex items-center col-span-2"
    >
      <Icon icon="mdi:alert-circle" class="w-3 h-3 mr-1" />
      {{ errors.doctor }}
    </p>
  </div>
</template>

<script lang="ts" setup>
interface Props {}

defineProps(Props);
</script>
