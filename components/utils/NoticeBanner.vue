<template>
  <!-- Donation Banner -->
  <div class="bg-[#0F0F2D] px-4 py-8 text-white">
    <div class="mx-auto max-w-7xl">
      <div
        class="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between"
      >
        <div class="flex items-start gap-4 md:items-center">
          <Heart class="h-8 w-8" />
          <div>
            <h2 class="text-xl font-bold">Participa en la campaña de ..</h2>
            <p class="mt-2 max-w-xl text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
              saepe accusamus sed distinctio. Neque porro odit quos sed pariatur
              accusantium atque nihil, consectetur tempora repellendus corporis,
              dolorum natus ipsam deserunt!
            </p>
          </div>
        </div>
        <button
          class="rounded-md bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700"
        >
          Para Participar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  id: {
    type: [String, null],
    required: true,
  },
});
</script>
