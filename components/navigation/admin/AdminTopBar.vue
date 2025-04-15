<template>
  <header
    class="w-full absolute pt-2 transition-all duration-300 ease-in"
    :class="!store.isOpen ? 'pl-64' : 'pl-20'"
  >
    <UButton
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
const store = useSidebarStore();
</script>
