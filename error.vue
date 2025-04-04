<template>
  <div
    class="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col"
  >
    <!-- Header with logo -->
    <header class="container mx-auto px-4 py-6">
      <div class="flex justify-between items-center">
        <div class="text-2xl font-bold text-teal-400">OncoClinic</div>
        <div class="flex space-x-4">
          <a
            href="#"
            class="hover:text-teal-400 transition-colors duration-300"
          >
            <Icon name="lucide:mail" class="h-5 w-5" />
          </a>
          <a
            href="#"
            class="hover:text-teal-400 transition-colors duration-300"
          >
            <Icon name="lucide:instagram" class="h-5 w-5" />
          </a>
          <a
            href="#"
            class="hover:text-teal-400 transition-colors duration-300"
          >
            <Icon name="lucide:x" class="h-5 w-5" />
          </a>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main class="flex-grow flex items-center justify-center px-4">
      <div class="max-w-3xl mx-auto text-center">
        <div class="relative mb-8 inline-block">
          <div
            class="absolute inset-0 bg-teal-400 blur-xl opacity-20 rounded-full"
          ></div>
          <span
            class="relative inline-block px-4 py-1 bg-teal-500/20 text-teal-300 rounded-full text-sm font-medium"
          >
            Próximamente
          </span>
        </div>

        <h1 class="text-4xl md:text-6xl font-bold mb-6">
          Estamos trabajando en algo
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400"
            >increíble</span
          >
        </h1>

        <p class="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
          Estamos desarrollando nuevas funcionalidades para mejorar su
          experiencia. Pronto podrá acceder a todos nuestros servicios en línea.
        </p>

        <!-- Countdown timer -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div
            v-for="(unit, index) in countdownUnits"
            :key="index"
            class="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700"
          >
            <div class="text-3xl md:text-4xl font-bold text-white mb-1">
              {{ unit.value }}
            </div>
            <div class="text-slate-400 text-sm">{{ unit.label }}</div>
          </div>
        </div>

        <!-- Email subscription -->
        <div class="max-w-md mx-auto">
          <h3 class="text-lg font-medium mb-4">
            Reciba notificaciones cuando estemos listos
          </h3>
          <div class="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              v-model="email"
              placeholder="Su correo electrónico"
              class="flex-grow px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-white"
            />
            <button
              @click="subscribeEmail"
              class="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg font-medium hover:from-teal-600 hover:to-emerald-600 transition-all duration-300 flex items-center justify-center"
            >
              <span>Notificarme</span>
              <Icon name="lucide:bell-ring" class="ml-2 h-4 w-4" />
            </button>
          </div>
          <p
            v-if="subscriptionMessage"
            class="mt-2 text-sm"
            :class="subscriptionSuccess ? 'text-teal-400' : 'text-red-400'"
          >
            {{ subscriptionMessage }}
          </p>
        </div>
      </div>
    </main>

    <!-- Construction animation -->
    <div
      class="absolute bottom-0 left-0 right-0 h-32 pointer-events-none overflow-hidden"
    >
      <div
        class="absolute bottom-0 left-1/4 transform -translate-x-1/2 animate-bounce-slow"
      >
        <Icon name="lucide:hard-hat" class="h-12 w-12 text-yellow-400" />
      </div>
      <div
        class="absolute bottom-0 right-1/4 transform translate-x-1/2 animate-pulse"
      >
        <Icon name="lucide:construction" class="h-16 w-16 text-orange-400" />
      </div>
    </div>

    <!-- Footer -->
    <footer
      class="container mx-auto px-4 py-6 text-center text-slate-400 text-sm"
    >
      <p>
        © {{ new Date().getFullYear() }} OncoClinic. Todos los derechos
        reservados.
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Countdown timer logic
const launchDate = new Date("2025-01-01T00:00:00");
const now = ref(new Date());
const timer = ref<number | null>(null);

const timeLeft = computed(() => {
  const difference = launchDate.getTime() - now.value.getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000),
  };
});

const countdownUnits = computed(() => [
  { label: "Días", value: timeLeft.value.days },
  { label: "Horas", value: timeLeft.value.hours },
  { label: "Minutos", value: timeLeft.value.minutes },
  { label: "Segundos", value: timeLeft.value.seconds },
]);

onMounted(() => {
  timer.value = window.setInterval(() => {
    now.value = new Date();
  }, 1000);
});

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value);
  }
});

// Email subscription
const email = ref("");
const subscriptionMessage = ref("");
const subscriptionSuccess = ref(false);

const subscribeEmail = () => {
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email.value) {
    subscriptionMessage.value = "Por favor, ingrese su correo electrónico.";
    subscriptionSuccess.value = false;
    return;
  }

  if (!emailRegex.test(email.value)) {
    subscriptionMessage.value =
      "Por favor, ingrese un correo electrónico válido.";
    subscriptionSuccess.value = false;
    return;
  }

  // Here you would typically send the email to your backend
  // For now, we'll just simulate success
  subscriptionMessage.value =
    "¡Gracias! Le notificaremos cuando estemos listos.";
  subscriptionSuccess.value = true;
  email.value = "";

  // Clear message after 5 seconds
  setTimeout(() => {
    subscriptionMessage.value = "";
  }, 5000);
};
</script>

<style scoped>
/* Custom animations */
.animate-bounce-slow {
  animation: bounce 3s infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(-5%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
</style>
