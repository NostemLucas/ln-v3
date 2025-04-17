<script setup lang="ts">
const store = useEditorStore();
defineEmits(["close"]);
</script>

<template>
  <div class="flex flex-col gap-4 max-w-md py-4 px-3 w-full">
    <h1 class="text-2xl font-semibold">Encabezado del Blog</h1>
    <USeparator />
    <div class="grid grid-cols-4">
      <label class="col-span-1 text-sm font-bold"> Categoría</label>
      <UInput
        v-model="store.categoria"
        type="text"
        class="col-span-3"
        :ui="{
          base: 'bg-wild-sand-50 rounded-md',
        }"
      />
    </div>
    <USeparator />

    <div class="grid grid-cols-4">
      <label class="col-span-1 text-sm font-bold">Titulo</label>
      <UInput
        v-model="store.title"
        type="text"
        class="col-span-3"
        :ui="{
          base: 'bg-wild-sand-50 rounded-md',
        }"
      />
    </div>
    <USeparator />
    <div class="grid grid-cols-4">
      <label class="col-span-1 text-sm font-bold">Descripción</label>
      <UTextarea
        v-model="store.description"
        type="text"
        class="col-span-3"
        :ui="{
          base: 'bg-wild-sand-50 rounded-md',
        }"
        :rows="4"
        multiline
      />
    </div>
    <USeparator />
    <div>
      <UButton
        variant="solid"
        class="bg-wild-sand-900"
        label="Guardar Cambios"
        @click="$emit('close')"
      />
    </div>
  </div>
</template>
