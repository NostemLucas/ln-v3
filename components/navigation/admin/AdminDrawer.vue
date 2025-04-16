<template>
  <nav
    class="fixed top-0 left-0 h-screen bg-wild-sand-50 z-50 flex flex-col justify-between p-4 overflow-y-auto transition-all duration-300 ease-in-out"
    :class="[
      isMobile
        ? isMobileOpen
          ? 'w-64'
          : 'w-0'
        : store.isOpen
        ? 'w-20'
        : 'w-64',
      isMobile ? 'lg:hidden' : 'hidden lg:flex',
    ]"
  >
    <div class="space-y-1">
      <UButton
        class="mb-4 font-bold text-[#2e2e2e] text-xl py-2 px-3"
        variant="link"
        icon="lucide:layout-dashboard"
        :label="!store.isOpen || isMobile ? 'OncoClinic' : ''"
      />

      <div v-for="item in options" :key="item.label">
        <UButton
          class="w-full text-wild-sand-800 py-2 px-3 gap-3 tracking-wide text-base font-medium"
          variant="ghost"
          :icon="item.icon"
          :class="
            item.to === router.path
              ? 'bg-wild-sand-200/60 font-bold text-wild-sand-900'
              : ''
          "
          :label="!store.isOpen || isMobile ? item.label : ''"
          :ui="{ base: !store.isOpen && !isMobile ? '' : 'pl-3.5' }"
        />
      </div>
    </div>

    <div class="space-y-1">
      <div v-for="item in configurations" :key="item.label">
        <UButton
          class="w-full text-wild-sand-900 py-2 px-3 gap-3 tracking-wide text-base"
          variant="ghost"
          active-class="bg-wild-sand-200/60 font-semibold text-wild-sand-900"
          :icon="item.icon"
          :active="item.to === router.path"
          :label="!store.isOpen || isMobile ? item.label : ''"
          :ui="{ base: !store.isOpen && !isMobile ? '' : 'pl-3.5' }"
        />
      </div>

      <UButton
        class="w-full text-[#5b5b5d] py-2 px-3 gap-3"
        variant="ghost"
        active-class="bg-[#e9e8ee] font-semibold text-[#343338]"
        :ui="{ base: !store.isOpen && !isMobile ? 'pl-1' : 'pl-2' }"
      >
        <UChip inset color="success">
          <UAvatar
            src="https://github.com/benjamincanac.png"
            alt="Benjamin Canac"
          />
        </UChip>
        <span v-if="!store.isOpen || isMobile" class="text-sm font-semibold">
          Benjamin Canac
        </span>
      </UButton>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const store = useSidebarStore();
const router = useRoute();

const breakpoints = useBreakpoints(breakpointsTailwind);
const isMobile = breakpoints.smaller("lg");

const isMobileOpen = ref(false);

const openMobile = () => {
  isMobileOpen.value = true;
};

const closeMobile = () => {
  isMobileOpen.value = false;
};

// Puedes exponer `openMobile()` para activarlo desde el topbar
defineExpose({ openMobile });

const options = [
  { label: "Inicio", icon: "lucide:house", to: "/admin/dashboard" },
  { label: "Blogs", icon: "lucide:notebook", to: "/admin/editor" },
  { label: "Users", icon: "lucide:users", to: "/admin/users" },
  { label: "Doctores", icon: "lucide:heart-pulse", to: "/admin/settings" },
];

const configurations = [
  { label: "Configuración", icon: "lucide:settings", to: "/admin/settings" },
  { label: "Marcas", icon: "lucide:martini", to: "/admin/editor" },
];
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
