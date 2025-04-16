<template>
  <div
    :class="`container mx-auto flex flex-col gap-4 w-full h-full font-sans scrollbar-hidden ${getContentPaddingClass()}`"
  >
    <!-- categoria -->
    <div :class="`font-bold uppercase ${device === 'mobile' ? 'text-sm' : ''}`">
      NEWS ANALYSIS
    </div>

    <!-- titulo principal -->
    <h2 :class="getTitleClass()">
      Nayib Bukele dice que no devolverá a EE. UU. al hombre deportado por error
      a El Salvador
    </h2>

    <!-- descripcion corta -->
    <div :class="getDescriptionClass()">
      La reunión en el Despacho Oval entre Donald Trump y el presidente de El
      Salvador, Nayib Bukele, fue un ejemplo contundente del desafío de Trump a
      los tribunales federales.
    </div>

    <!-- botones de accion -->
    <span class="border-t-2 border-gray-200 w-full h-1"></span>
    <div class="space-x-3">
      <button
        class="inline-flex items-center justify-center rounded-full p-2 border border-gray-300"
      >
        <svg
          :class="`w-5 h-5 ${getIconClass()}`"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
      </button>
      <button
        class="inline-flex items-center justify-center rounded-full p-2 border border-gray-300"
      >
        <svg
          :class="`w-5 h-5 ${getIconClass()}`"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
      </button>
    </div>

    <!-- Image -->
    <img
      src="https://images.unsplash.com/photo-1575996867527-90426fb118fe?q=80&w=1000&auto=format&fit=crop"
      alt="Trump and Bukele meeting"
      :class="getImageClass()"
    />

    <!-- texto -->
    <p :class="getBodyTextClass()">
      El presidente Donald Trump y el presidente de El Salvador, Nayib Bukele,
      mantuvieron el lunes una reunión bilateral en el Despacho Oval. "Por
      supuesto que no voy a hacerlo", dijo Bukele cuando los periodistas le
      preguntaron si estaba dispuesto a ayudar a devolver a un migrante
      deportado por error.Credit...Eric Lee/The New York Times
    </p>

    <!-- autor -->
    <div class="flex flex-row gap-4 items-center">
      <div :class="getAvatarClass()">
        <img
          src="https://images.unsplash.com/photo-1569913486515-b74bf7751574?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
          alt="Avatar"
          class="h-full w-full object-cover"
        />
      </div>
      <div class="flex flex-col">
        <p
          :class="`text-gray-700 ${
            device === 'mobile' ? 'text-sm' : 'text-base'
          }`"
        >
          Por: Nombre del autor
        </p>
        <p :class="device === 'mobile' ? 'text-xs' : 'text-sm'">
          repórtando desde
        </p>
      </div>
    </div>

    <!-- fecha de publicacion -->
    <div class="flex flex-row gap-2 items-center">
      <svg
        class="w-4 h-4 text-gray-700"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p
        :class="`text-gray-700 ${
          device === 'mobile' ? 'text-sm' : 'text-base'
        }`"
      >
        22 de noviembre, 2023
      </p>
    </div>

    <!-- texto principal -->
    <p :class="getBodyTextClass()">
      El mensaje de la reunión fue claro: ni Trump ni Bukele tenían intención
      alguna de devolver a Abrego Garcia, aunque la Corte Suprema haya
      dictaminado que debe regresar a Estados Unidos. El caso ha llegado a
      simbolizar el desafío de Trump a los tribunales y su voluntad de deportar
      <br />
      a personas sin el debido proceso. Trump también barajó la posibilidad de
      enviar a ciudadanos estadounidenses condenados por delitos violentos a
      prisión en El Salvador, aunque dijo que la fiscal general Pam Bondi aún
      estaba estudiando la legalidad de la propuesta. "Si se trata de un
      delincuente local, no tengo ningún problema", dijo Trump. "Estoy hablando
      de gente violenta. Hablo de gente realmente mala". Antes de que se
      <br />
      permitiera a todo el grupo de periodistas entrar en el Despacho Oval para
      la reunión, las cámaras de televisión captaron a Trump diciendo a Bukele
      que construyera más prisiones.
    </p>
  </div>
</template>

<script setup lang="ts">
import type { DeviceType, OrientationType } from "~/types/device";

const props = defineProps<{
  device: DeviceType;
  orientation: OrientationType;
}>();

// Computed classes based on device type
const getContentPaddingClass = () => {
  if (props.device === "mobile") {
    return "px-4 py-6";
  } else if (props.device === "tablet") {
    return "px-12 py-8";
  } else {
    return "px-16 py-12 max-w-4xl mx-auto";
  }
};

const getTitleClass = () => {
  if (props.device === "mobile") {
    return "text-2xl font-black italic";
  } else if (props.device === "tablet") {
    return "text-3xl font-black italic";
  } else {
    return "text-4xl font-black italic";
  }
};

const getDescriptionClass = () => {
  if (props.device === "mobile") {
    return "text-sm";
  } else if (props.device === "tablet") {
    return "text-base";
  } else {
    return "text-lg";
  }
};

const getBodyTextClass = () => {
  if (props.device === "mobile") {
    return "text-sm text-gray-600";
  } else if (props.device === "tablet") {
    return "text-base text-gray-600";
  } else {
    return "text-lg text-gray-600";
  }
};

const getImageClass = () => {
  if (props.device === "mobile") {
    return "rounded-sm h-48 w-full object-cover";
  } else if (props.device === "tablet") {
    return "rounded-sm h-64 w-full object-cover";
  } else {
    return "rounded-sm h-86 w-full object-cover";
  }
};

const getIconClass = () => {
  if (props.device === "mobile") {
    return "text-lg";
  } else {
    return "text-xl";
  }
};

const getAvatarClass = () => {
  if (props.device === "mobile") {
    return "h-12 w-12 rounded-full bg-gray-300 overflow-hidden";
  } else if (props.device === "tablet") {
    return "h-14 w-14 rounded-full bg-gray-300 overflow-hidden";
  } else {
    return "h-16 w-16 rounded-full bg-gray-300 overflow-hidden";
  }
};
</script>
