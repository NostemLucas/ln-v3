<template>
  <header
    class="w-full relative transition-all duration-300 ease-in h-14 flex items-center justify-start"
    :class="[
      smallerThanLg ? 'px-6' : !store.isOpen ? 'ml-64' : 'ml-20',
      isScrolled ? 'bg-white shadow-md' : 'bg-white',
    ]"
  >
    <UButton
      v-if="smallerThanLg"
      label="Oncoclinic"
      icon="lucide:menu"
      size="xl"
      variant="link"
      class="font-medium text-wild-sand-600"
      @click="store.toggle"
    />

    <UButton
      v-else
      label="Ubicaciones"
      icon="lucide:chevron-left"
      size="xl"
      variant="link"
      class="font-medium text-wild-sand-600"
      @click="store.toggle"
    />
  </header>
</template>

<script lang="ts" setup>
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
const breakpoints = useBreakpoints(breakpointsTailwind);
const isScrolled = ref(false);
const handleScroll = (): void => {
  isScrolled.value = window.scrollY > 10;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);

  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
const smallerThanLg = breakpoints.smaller("lg");
const store = useSidebarStore();
</script>
