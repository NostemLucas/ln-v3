<template>
  <div class="w-full h-screen flex flex-row text relative">
    <nav
      class="w-64 h-full bg-[#f5f5f7] flex justify-between flex-col p-4 absolute"
    >
      <div class="space-y-1">
        <UButton
          class="mb-4 font-bold text-[#2e2e2e] text-lg"
          variant="ghost"
          icon="lucide:layout-dashboard"
          >Gestor de Noticias</UButton
        >

        <div v-for="item in options" :key="item.label">
          <UButton
            class="w-full text-[#5b5b5d] py-2 px-3 gap-3"
            variant="ghost"
            active-class="bg-[#e9e8ee] font-semibold text-[#343338]"
            :icon="item.icon"
            :active="item.to === router.path"
            :label="item.label"
          />
        </div>
      </div>

      <div>
        <div v-for="item in configurations" :key="item.label">
          <UButton
            class="w-full text-[#5b5b5d] py-2 px-3 gap-3"
            variant="ghost"
            active-class="bg-[#e9e8ee] font-semibold text-[#343338]"
            :icon="item.icon"
            :active="item.to === router.path"
            :label="item.label"
          />
        </div>
      </div>
    </nav>

    <div class="flex justify-center items-center w-full h-full ml-64 px-4 py-2">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
const options = [
  {
    label: "Dashboard",
    icon: "mdi-home",
    to: "/admin/dashboard",
  },
  {
    label: "Editor",
    icon: "mdi-pencil",
    to: "/admin/editor",
  },
  {
    label: "Users",
    icon: "mdi-account",
    to: "/admin/users",
  },
  {
    label: "Settings",
    icon: "mdi-cog",
    to: "/admin/settings",
  },
];
const router = useRoute();

const configurations = [
  {
    label: "Dashboard",
    icon: "mdi-home",
    to: "/admin/dashboard",
  },
  {
    label: "Editor",
    icon: "mdi-pencil",
    to: "/admin/editor",
  },
  {
    label: "Users",
    icon: "mdi-account",
    to: "/admin/users",
  },
  {
    label: "Settings",
    icon: "mdi-cog",
    to: "/admin/settings",
  },
];
</script>

<style>
/* * {
  border: 1px solid red;
} */
</style>
