<template>
  <div>
    <div
      class="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[16px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px] flex flex-col"
    >
      <div class="overflow-auto p-2">
        <div class="min-w-[320px] scale-[0.2] origin-top-left">
          <slot />
        </div>
      </div>
    </div>
    <div
      class="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl h-[24px] max-w-[301px] md:h-[42px] md:max-w-[512px]"
    />
    <div
      class="relative mx-auto bg-gray-800 rounded-b-xl h-[55px] max-w-[83px] md:h-[95px] md:max-w-[142px]"
    ></div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
