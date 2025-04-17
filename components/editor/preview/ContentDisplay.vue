<script setup lang="ts">
import Icon from "@nuxt/ui/runtime/components/Icon.vue";
import Plantilla from "../templates/nyt/plantilla.vue";
interface ContentDisplayProps {
  deviceType: "desktop" | "tablet" | "mobile";
}

const props = defineProps<ContentDisplayProps>();

const contentClass = computed(() => {
  if (props.deviceType === "mobile") {
    return "mx-auto flex flex-col gap-4 h-full font-horsham px-4 pt-6 pb-24";
  } else if (props.deviceType === "tablet") {
    return "mx-auto flex flex-col gap-4 h-full font-horsham max-w-xl px-6 pt-6 pb-24";
  } else {
    return "mx-auto flex flex-col gap-4 h-full font-horsham max-w-xl px-6 md:px-0 pt-6 pb-24";
  }
});

const titleClass = computed(() => {
  return props.deviceType === "mobile"
    ? "text-3xl font-semibold italic leading-10"
    : "text-4xl font-semibold italic leading-11";
});
</script>

<template>
  <Plantilla />
</template>
