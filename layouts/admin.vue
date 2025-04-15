<template>
  <div class="w-full min-h-screen flex flex-col relative">
    <AdminTopBar />

    <div class="flex flex-row flex-1">
      <AdminSidebar />

      <div
        class="flex justify-center items-center flex-1 px-9 pt-15 transition-all duration-300 ease-in"
        :class="store.isOpen ? 'ml-20' : 'ml-64'"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AdminSidebar from "~/components/navigation/admin/AdminSidebar.vue";
import AdminTopBar from "~/components/navigation/admin/AdminTopBar.vue";
const store = useSidebarStore();
</script>
