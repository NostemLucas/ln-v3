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
            class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-md bg-[#2C74B3]"
          >
            <Icon icon="mdi:hand-heart" class="h-8 w-8 text-white" />
          </div>
          <h3 class="text-xl font-semibold text-white">
            Formulario de Colaboración
          </h3>
          <p class="mt-2 text-sm text-gray-300">
            Seleccione la cantidad con la que desea contribuir
          </p>
        </div>

        <div class="mb-6 grid grid-cols-3 gap-3">
          <button
            v-for="amount in donationAmounts"
            :key="amount"
            :class="[
              'rounded-md border py-2.5 text-center text-sm font-medium transition-all',
              selectedAmount === amount
                ? 'border-[#2C74B3] bg-[#2C74B3]/20 text-white'
                : 'border-[#205295]/30 text-gray-300 hover:border-[#205295]/50 hover:bg-[#144272]/30',
            ]"
            @click="selectedAmount = amount"
          >
            {{ amount }} Bs
          </button>
        </div>

        <div class="mb-6">
          <label class="mb-2 block text-xs font-medium text-gray-300"
            >O especifique otra cantidad</label
          >
          <div class="relative">
            <input
              v-model="customAmount"
              type="number"
              class="w-full rounded-md border border-[#205295]/30 bg-[#144272]/20 px-4 py-2 pr-8 text-sm text-white placeholder-gray-400 focus:border-[#2C74B3] focus:outline-none focus:ring-1 focus:ring-[#2C74B3]/50"
              placeholder="Otra cantidad"
            />
            <span
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >Bs</span
            >
          </div>
        </div>

        <div class="mb-6">
          <label class="mb-2 block text-xs font-medium text-gray-300"
            >Información de contacto</label
          >
          <div class="space-y-3">
            <input
              v-model="donorName"
              type="text"
              class="w-full rounded-md border border-[#205295]/30 bg-[#144272]/20 px-4 py-2 text-sm text-white placeholder-gray-400 focus:border-[#2C74B3] focus:outline-none focus:ring-1 focus:ring-[#2C74B3]/50"
              placeholder="Nombre completo"
            />
            <input
              v-model="donorEmail"
              type="email"
              class="w-full rounded-md border border-[#205295]/30 bg-[#144272]/20 px-4 py-2 text-sm text-white placeholder-gray-400 focus:border-[#2C74B3] focus:outline-none focus:ring-1 focus:ring-[#2C74B3]/50"
              placeholder="Correo electrónico"
            />
          </div>
        </div>

        <div class="mb-6 flex items-start gap-2">
          <input
            v-model="isAnonymous"
            type="checkbox"
            id="anonymous"
            class="mt-0.5 h-4 w-4 rounded border-[#205295] bg-[#144272]/20 text-[#2C74B3] focus:ring-[#2C74B3]/50"
          />
          <label for="anonymous" class="text-xs text-gray-300">
            Deseo que mi colaboración sea anónima
          </label>
        </div>

        <button
          class="w-full rounded-md bg-[#2C74B3] py-2.5 text-sm font-medium text-white transition-all hover:bg-[#205295] focus:outline-none focus:ring-2 focus:ring-[#2C74B3]/50"
          @click="processDonation"
        >
          Confirmar Colaboración
        </button>

        <p class="mt-4 text-center text-xs text-gray-400">
          Su aportación es deducible fiscalmente. Recibirá un certificado en su
          correo electrónico.
        </p>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  donationAmounts: {
    type: Array as () => number[],
    default: () => [50, 100, 250],
  },
});

const emit = defineEmits(["close", "process"]);

const selectedAmount = ref(props.donationAmounts[0]);
const customAmount = ref<number | null>(null);
const donorName = ref("");
const donorEmail = ref("");
const isAnonymous = ref(false);

const processDonation = () => {
  const amount = customAmount.value || selectedAmount.value;

  if (!amount || amount <= 0) {
    return;
  }

  if (!donorName.value || !donorEmail.value) {
    return;
  }

  if (!validateEmail(donorEmail.value)) {
    return;
  }

  emit("process", {
    amount,
    name: donorName.value,
    email: donorEmail.value,
    anonymous: isAnonymous.value,
  });

  // Resetear formulario
  selectedAmount.value = props.donationAmounts[0];
  customAmount.value = null;
  donorName.value = "";
  donorEmail.value = "";
  isAnonymous.value = false;

  // Cerrar modal
  emit("close");
};

const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};
</script>
