<template>
  <div class="w-full h-screen overflow-hidden">
    <!-- TopBar fijo arriba -->
    <div class="fixed top-0 left-0 w-full h-16 z-20">
      <AdminTopBar />
    </div>
    <UDrawer
      v-if="smallerThanLg"
      :open="store.isOpen"
      direction="left"
      :dismissible="true"
    >
      <template #content>
        <AdminDrawer />
      </template>
    </UDrawer>
    <!-- Sidebar fijo a la izquierda -->
    <div
      v-else
      class="fixed left-0 h-screen transition-all duration-300 z-10 bg-white"
    >
      <AdminSidebar />
    </div>

    <!-- Contenido principal scrollable -->
    <main
      class="pt-16 h-full overflow-auto transition-all duration-300 ease-in"
      :class="!store.isOpen ? 'lg:pl-64' : 'lg:pl-20'"
    >
      <div class="px-9"><slot /></div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import AdminSidebar from "~/components/navigation/admin/AdminSidebar.vue";
import AdminTopBar from "~/components/navigation/admin/AdminTopBar.vue";
import AdminDrawer from "~/components/navigation/admin/AdminDrawer.vue";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
const breakpoints = useBreakpoints(breakpointsTailwind);

const smallerThanLg = breakpoints.smaller("lg");
const store = useSidebarStore();
</script>
