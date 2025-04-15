<template>
  <nav
    class="h-full bg-wild-sand-50 flex justify-between flex-col p-4 absolute overflow-hidden transition-all duration-300"
    :class="store.isOpen ? 'w-20 ease-in' : 'w-64 ease-in'"
  >
    <div class="space-y-1">
      <UButton
        class="mb-4 font-bold text-[#2e2e2e] text-xl py-2 px-3"
        variant="link"
        icon="lucide:layout-dashboard"
        :label="!store.isOpen ? 'OncoClinic' : ''"
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
          :label="!store.isOpen ? item.label : ''"
          :ui="{
            base: !store.isOpen ? '' : 'pl-3.5',
          }"
        />
      </div>
    </div>

    <div class="space-y-1">
      <div v-for="item in configurations" :key="item.label">
        <UButton
          class="w-full text-wild-sand-900 py-2 px-3 gap-3 tracking-wide text-base"
          variant="ghost"
          active-class="bg-wild-sand-200/60 font-semibold text-wild-sand-900 "
          :icon="item.icon"
          :active="item.to === router.path"
          :label="!store.isOpen ? item.label : ''"
          :ui="{
            base: !store.isOpen ? '' : 'pl-3.5',
          }"
        />
      </div>

      <UButton
        class="w-full text-[#5b5b5d] py-2 px-3 gap-3"
        variant="ghost"
        active-class="bg-[#e9e8ee] font-semibold text-[#343338]"
        :ui="{
          base: !store.isOpen ? 'pl-1' : 'pl-2',
        }"
      >
        <UChip inset color="success">
          <UAvatar
            src="https://github.com/benjamincanac.png"
            alt="Benjamin Canac"
          />
        </UChip>
        <span v-if="!store.isOpen" class="text-sm font-semibold"
          >Benjamin Canac</span
        >
      </UButton>
    </div>
  </nav>
</template>

<script lang="ts" setup>
const options = [
  {
    label: "Inicio",
    icon: "lucide:house",
    to: "/admin/dashboard",
  },
  {
    label: "Blogs",
    icon: "lucide:notebook",
    to: "/admin/editor",
  },
  {
    label: "Users",
    icon: "lucide:users",
    to: "/admin/users",
  },
  {
    label: "Doctores",
    icon: "lucide:heart-pulse",
    to: "/admin/settings",
  },
];
const router = useRoute();

const configurations = [
  {
    label: "  Configuración",
    icon: "lucide:settings",
    to: "/admin/settings",
  },
  {
    label: "Marcas",
    icon: "lucide:martini",
    to: "/admin/editor",
  },
];

const store = useSidebarStore();
</script>
