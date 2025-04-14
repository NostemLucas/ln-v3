<template>
  <div class="w-full h-screen grid grid-cols-12 bg-amber-700">
    <nav
      class="w-full h-full bg-slate-100 flex justify-between flex-col p-4 col-span-2"
    >
      <div class="space-y-1">
        <UButton
          class="mb-4 font-bold"
          variant="ghost"
          icon="lucide:layout-dashboard"
          >Gestor de Noticias</UButton
        >

        <div v-for="item in options" :key="item.label">
          <UButton
            class="w-full text-slate-700 py-2 px-3 gap-3"
            variant="ghost"
            active-class="bg-slate-300/70 font-semibold"
            :icon="item.icon"
            :active="item.to === router.path"
            :label="item.label"
          />
        </div>
      </div>

      <div>
        <div v-for="item in ['Dashboard', 'Editor', 'Users']" :key="item">
          <UButton :to="`/admin/${item.toLowerCase()}`">{{ item }}</UButton>
        </div>
      </div>
    </nav>

    <div class="col-span-10 bg-amber-200">
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
</script>

<style>
/* * {
  border: 1px solid red;
} */
</style>
