<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-3"
  >
    <div
      class="w-[90%] sm:w-[85%] md:w-[60%] lg:w-[85%] xl:w-[80%] h-auto lg:h-[85vh] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row"
    >
      <!-- Left side with login form -->
      <div class="w-full lg:w-1/2 p-8 sm:p-6 lg:p-8 flex flex-col">
        <!-- Logo and navigation -->
        <div class="flex justify-between items-center mb-4 sm:mb-6">
          <div class="flex items-center">
            <div
              class="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-blue-500 flex items-center justify-center shadow-md"
            >
              <div
                class="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-blue-600 flex items-center justify-center"
              >
                <span class="text-white font-bold text-xs sm:text-sm">OC</span>
              </div>
            </div>
            <span class="ml-2 text-base sm:text-lg font-semibold text-gray-800">
              Oncoclinic
            </span>
          </div>
          <div class="hidden sm:flex space-x-6">
            <UButton
              variant="link"
              to="/"
              class="text-sm hover:text-blue-600 transition-colors font-medium"
            >
              Inicio
            </UButton>
            <UButton
              variant="link"
              to="/tratamientos"
              class="text-sm hover:text-blue-600 transition-colors font-medium"
            >
              Servicios
            </UButton>
            <UButton
              variant="link"
              to="/contactos"
              class="text-sm hover:text-blue-600 transition-colors font-medium"
            >
              Contacto
            </UButton>
          </div>
        </div>
        <!-- Form content -->
        <form
          class="flex-grow flex flex-col justify-center max-w-md mx-auto w-full py-4"
        >
          <div class="space-y-5 sm:space-y-6">
            <div>
              <div
                class="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 text-xs font-medium mb-2"
              >
                <Icon name="lucide:lock" class="h-3 w-3 mr-1" />
                Acceso Seguro
              </div>
              <h1 class="text-2xl sm:text-3xl font-bold mt-1 text-gray-800">
                Iniciar sesión
                <span class="text-blue-500">.</span>
              </h1>
              <p class="mt-1 text-sm text-gray-600">
                Accede a tu historial médico, citas y tratamientos
              </p>
            </div>

            <div class="space-y-4">
              <!-- Email field -->
              <div class="relative group">
                <label
                  class="text-xs text-gray-500 absolute top-1.5 left-3 transition-all group-focus-within:text-blue-600"
                >
                  Correo electrónico
                </label>
                <input
                  v-model="email"
                  type="email"
                  class="w-full bg-gray-50 rounded-lg border border-gray-200 pt-5 pb-1.5 px-3 text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="paciente@ejemplo.com"
                />
                <div
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  <Icon name="lucide:mail" class="h-4 w-4" />
                </div>
              </div>

              <!-- Password field -->
              <div class="relative group">
                <label
                  class="text-xs text-gray-500 absolute top-1.5 left-3 transition-all group-focus-within:text-blue-600"
                >
                  Contraseña
                </label>
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  class="w-full bg-gray-50 rounded-lg border border-gray-200 pt-5 pb-1.5 px-3 text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                />
                <button
                  @click="togglePasswordVisibility"
                  type="button"
                  class="absolute right-3 top-[55%] transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Icon
                    name="lucide:eye"
                    v-if="!showPassword"
                    class="h-4 w-4"
                  />
                  <Icon name="lucide:eye-off" v-else class="h-4 w-4" />
                </button>
              </div>

              <!-- Remember me and forgot password -->
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <input
                    v-model="rememberMe"
                    id="remember"
                    type="checkbox"
                    class="h-3.5 w-3.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    for="remember"
                    class="text-xs sm:text-sm text-gray-600"
                  >
                    Recordarme
                  </label>
                </div>
                <a
                  href="#"
                  class="text-xs sm:text-sm text-blue-600 hover:underline"
                >
                  ¿Olvidó su contraseña?
                </a>
              </div>
            </div>

            <!-- Action buttons -->
            <div class="space-y-3">
              <button
                type="button"
                @click="login"
                :disabled="!isFormValid"
                :class="[
                  'w-full px-4 py-2.5 text-white rounded-lg transition-all flex items-center justify-center gap-2 font-medium shadow-md hover:shadow-lg text-sm',
                  isFormValid
                    ? 'bg-blue-500 hover:bg-blue-600'
                    : 'bg-gray-300 cursor-not-allowed',
                ]"
              >
                <Icon name="lucide:log-in" class="h-4 w-4" />
                <span>Iniciar sesión</span>
              </button>

              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-200"></div>
                </div>
                <div class="relative flex justify-center text-xs">
                  <span class="px-2 bg-white text-gray-500">
                    o continuar con
                  </span>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <button
                  class="flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm hover:shadow text-xs sm:text-sm"
                >
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span>Google</span>
                </button>
                <button
                  class="flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm hover:shadow text-xs sm:text-sm"
                >
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-3.405 1.88-2.87 6.75.572 8.65z"
                    />
                  </svg>
                  <span>Apple</span>
                </button>
              </div>
            </div>

            <!-- Registration link -->
            <div class="text-center">
              <p class="text-xs sm:text-sm text-gray-600">
                ¿No tiene una cuenta?
                <a href="#" class="text-blue-600 hover:underline font-medium">
                  Regístrese aquí
                </a>
              </p>
            </div>
          </div>
        </form>

        <!-- Footer con badges -->
        <div class="hidden lg:block mt-4 sm:mt-6">
          <div class="flex justify-center items-center space-x-4 mb-3">
            <div class="flex items-center text-gray-500 text-xs">
              <Icon
                name="lucide:shield-check"
                class="h-3 w-3 mr-1 text-blue-500"
              />
              <span>Datos protegidos</span>
            </div>
            <div class="flex items-center text-gray-500 text-xs">
              <Icon name="lucide:lock" class="h-3 w-3 mr-1 text-blue-500" />
              <span>Conexión segura</span>
            </div>
            <div class="flex items-center text-gray-500 text-xs">
              <Icon name="lucide:clock" class="h-3 w-3 mr-1 text-blue-500" />
              <span>Soporte 24/7</span>
            </div>
          </div>
          <div class="text-center text-xs text-gray-500">
            © {{ currentYear }} Oncoclinic. Todos los derechos reservados.
          </div>
        </div>
      </div>

      <!-- Right side with carousel - hidden on mobile, shown on lg screens -->
      <div class="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <!-- Carousel container -->
        <div class="absolute inset-0">
          <!-- Carousel slides -->
          <div
            class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            v-for="(slide, index) in slides"
            :key="index"
            :class="{
              'opacity-100': currentSlide === index,
              'opacity-0': currentSlide !== index,
            }"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-blue-900/70 mix-blend-multiply"
            ></div>
            <img
              :src="slide.image"
              :alt="slide.title"
              class="object-cover h-full w-full"
            />

            <!-- Slide content -->
            <div class="absolute inset-0 flex flex-col justify-end p-8 pb-20">
              <div
                class="max-w-md space-y-3 transform transition-all duration-1000 ease-out"
                :class="{
                  'translate-y-0 opacity-100': currentSlide === index,
                  'translate-y-10 opacity-0': currentSlide !== index,
                }"
              >
                <div class="flex items-center space-x-2">
                  <div class="h-1 w-8 bg-blue-400"></div>
                  <span
                    class="text-blue-300 text-xs font-medium uppercase tracking-wider"
                  >
                    {{ slide.category }}
                  </span>
                </div>

                <h2 class="text-white text-2xl font-bold">{{ slide.title }}</h2>

                <p class="text-white/80 leading-relaxed text-sm">
                  {{ slide.description }}
                </p>
              </div>
            </div>
          </div>

          <!-- Carousel controls -->
          <div class="absolute bottom-8 left-8 flex space-x-2">
            <button
              v-for="(_, index) in slides"
              :key="index"
              @click="setSlide(index)"
              :class="[
                'h-1.5 rounded-full transition-all duration-300',
                currentSlide === index
                  ? 'w-6 bg-white'
                  : 'w-1.5 bg-white/50 hover:bg-white/70',
              ]"
            ></button>
          </div>

          <!-- Carousel navigation arrows -->
          <div
            class="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-3"
          >
            <button
              @click="prevSlide"
              class="h-8 w-8 rounded-full bg-black/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/30 transition-colors"
            >
              <Icon name="lucide:chevron-left" class="h-5 w-5" />
            </button>
            <button
              @click="nextSlide"
              class="h-8 w-8 rounded-full bg-black/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/30 transition-colors"
            >
              <Icon name="lucide:chevron-right" class="h-5 w-5" />
            </button>
          </div>
        </div>

        <!-- Medical symbols and decorative elements -->
        <div class="absolute top-8 left-8 z-10">
          <div
            class="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-2.5 py-1.5 rounded-lg"
          >
            <div
              class="h-7 w-7 rounded-full bg-blue-500/80 flex items-center justify-center"
            >
              <Icon name="lucide:activity" class="h-3.5 w-3.5 text-white" />
            </div>
            <div>
              <div class="text-white text-xs font-medium">Oncoclinic</div>
              <div class="text-white/70 text-xs">Centro especializado</div>
            </div>
          </div>
        </div>

        <!-- Pulse effect for medical emergency -->
        <div class="absolute top-8 right-8 z-10 flex items-center space-x-2">
          <span class="relative flex h-2.5 w-2.5">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"
            ></span>
            <span
              class="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"
            ></span>
          </span>
          <span
            class="text-white text-xs font-medium px-2 py-0.5 bg-black/30 backdrop-blur-sm rounded-full"
          >
            Emergencias 24/7
          </span>
        </div>
      </div>

      <!-- Mobile carousel - only visible on mobile -->
      <div
        class="block lg:hidden w-full h-48 sm:h-56 relative overflow-hidden rounded-b-2xl"
      >
        <!-- Carousel container -->
        <div class="absolute inset-0">
          <!-- Carousel slides -->
          <div
            class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            v-for="(slide, index) in slides"
            :key="index"
            :class="{
              'opacity-100': currentSlide === index,
              'opacity-0': currentSlide !== index,
            }"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-blue-900/70 mix-blend-multiply"
            />
            <NuxtImg
              draggable="false"
              :src="slide.image"
              :alt="slide.title"
              class="object-cover h-full w-full"
            />

            <!-- Slide content -->
            <div class="absolute inset-0 flex flex-col justify-end p-4 pb-7">
              <div
                class="space-y-1 transform transition-all duration-1000 ease-out"
                :class="{
                  'translate-y-0 opacity-100': currentSlide === index,
                  'translate-y-10 opacity-0': currentSlide !== index,
                }"
              >
                <div class="flex items-center space-x-1">
                  <div class="h-0.5 w-4 bg-blue-400"></div>
                  <span
                    class="text-blue-300 text-[10px] font-medium uppercase tracking-wider"
                  >
                    {{ slide.category }}
                  </span>
                </div>

                <h2 class="text-white text-base font-bold">
                  {{ slide.title }}
                </h2>

                <p class="text-white/80 text-xs leading-tight line-clamp-2">
                  {{ slide.description }}
                </p>
              </div>
            </div>
          </div>

          <!-- Carousel controls -->
          <div class="absolute bottom-3 left-4 flex space-x-1.5">
            <button
              v-for="(_, index) in slides"
              :key="index"
              @click="setSlide(index)"
              :class="[
                'h-1 rounded-full transition-all duration-300',
                currentSlide === index
                  ? 'w-4 bg-white'
                  : 'w-1 bg-white/50 hover:bg-white/70',
              ]"
            ></button>
          </div>

          <!-- Carousel navigation arrows -->
          <div
            class="absolute top-15 -translate-y-1/2 w-full flex justify-between px-2"
          >
            <button
              @click="prevSlide"
              class="h-6 w-6 rounded-full bg-black/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/30 transition-colors"
            >
              <Icon name="lucide:chevron-left" class="h-4 w-4" />
            </button>
            <button
              @click="nextSlide"
              class="h-6 w-6 rounded-full bg-black/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/30 transition-colors"
            >
              <Icon name="lucide:chevron-right" class="h-4 w-4" />
            </button>
          </div>
        </div>

        <!-- Pulse effect for mobile -->
        <div class="absolute top-3 right-3 z-10 flex items-center space-x-1.5">
          <span class="relative flex h-2 w-2">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"
            ></span>
            <span
              class="relative inline-flex rounded-full h-2 w-2 bg-red-500"
            ></span>
          </span>
          <span
            class="text-white text-[10px] font-medium px-1.5 py-0.5 bg-black/30 backdrop-blur-sm rounded-full"
          >
            Emergencias 24/7
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "login",
});

// Form state
const email = ref<string>("");
const password = ref<string>("");
const showPassword = ref<boolean>(false);
const rememberMe = ref<boolean>(false);
const currentYear = new Date().getFullYear();

// Form validation
const isFormValid = computed(() => {
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email.value);

  // All required fields filled and valid
  return isEmailValid && password.value.length > 0;
});

// Toggle password visibility
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

// Form submission
const login = async () => {
  // Submit login form (in a real app, you would call an API here)
  console.log("Login submitted", {
    email: email.value,
    password: password.value,
    rememberMe: rememberMe.value,
  });

  // Show success message or redirect
  if (email.value === "admin@gmail.com" && password.value === "admin") {
    await navigateTo("/admin/editor");
  }
};

// Carousel functionality
const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1080&auto=format&fit=crop",
    title: "Tecnología médica avanzada",
    description:
      "Contamos con equipos de última generación para diagnósticos precisos y tratamientos efectivos.",
    category: "Equipamiento",
  },
  {
    image:
      "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?q=80&w=1080&auto=format&fit=crop",
    title: "Equipo médico especializado",
    description:
      "Nuestros especialistas están altamente capacitados en las técnicas más innovadoras de tratamiento oncológico.",
    category: "Especialistas",
  },
  {
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1080&auto=format&fit=crop",
    title: "Atención personalizada",
    description:
      "Cada paciente recibe un plan de tratamiento adaptado a sus necesidades específicas y circunstancias personales.",
    category: "Pacientes",
  },
  {
    image:
      "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=1080&auto=format&fit=crop",
    title: "Investigación continua",
    description:
      "Participamos activamente en estudios clínicos para ofrecer las terapias más avanzadas contra el cáncer.",
    category: "Innovación",
  },
];

const currentSlide = ref(0);
let slideInterval: number | null = null;

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length;
};

const setSlide = (index: number) => {
  currentSlide.value = index;
  resetSlideInterval();
};

const resetSlideInterval = () => {
  if (slideInterval) {
    clearInterval(slideInterval);
  }
  slideInterval = window.setInterval(() => {
    nextSlide();
  }, 5000);
};

onMounted(() => {
  resetSlideInterval();
});

onBeforeUnmount(() => {
  if (slideInterval) {
    clearInterval(slideInterval);
  }
});
</script>
