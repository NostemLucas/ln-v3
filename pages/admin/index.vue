<script setup lang="ts">
import { ref, h } from "vue";
import { useFetch } from "#app";
import type { TableColumn } from "@nuxt/ui";

type MetaData = {
  author: string;
  estado: string;
  fecha: number;
  descripcion: string;
  banner: string;
};

// Reactive copy of the data
const dataRef = ref<MetaData[]>([]);

// Fetch data
const { data, refresh, status } = await useFetch<MetaData[]>(
  "http://localhost:3000/blogs",
  {
    key: "meta-data",
    transform: (data) => data || [],
    lazy: true,
  }
);

// Copy data into reactive ref once loaded
if (data.value) dataRef.value = data.value;

// Columns
const columns: TableColumn<MetaData>[] = [
  { accessorKey: "author", header: "Autor" },
  { accessorKey: "estado", header: "Estado" },
  {
    accessorKey: "fecha",
    header: "Fecha",
    cell: ({ row }) => new Date(row.original.fecha).toLocaleString(),
  },
  { accessorKey: "descripcion", header: "Descripción" },
  {
    accessorKey: "banner",
    header: "Banner",
    cell: ({ row }) =>
      h("img", {
        src: row.original.banner,
        alt: "Banner",
        class: "w-32 h-auto rounded-md",
      }),
  },
  {
    header: "Acciones",
    cell: ({ row }) =>
      h(
        "button",
        {
          class: "text-red-500 underline text-sm",
          onClick: () => removeRow(row.index),
        },
        "Eliminar"
      ),
  },
];

// Función para eliminar
const removeRow = (index: number) => {
  dataRef.value.splice(index, 1);
};

// Función para añadir
const addRow = async () => {
  navigateTo("/admin/editor");
};

// Función para recargar desde backend
const reload = async () => {
  await refresh();
  if (data.value) dataRef.value = data.value;
};
</script>

<template>
  <div class="flex flex-col gap-4 container mx-auto">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-bold">Noticias Publicadas</h2>
      <div class="flex gap-2 p-8">
        <UButton
          @click="addRow"
          class="bg-blue-500 text-white px-3 py-1 rounded"
          icon="lucide:plus"
        >
          Añadir
        </UButton>
        <UButton
          @click="reload"
          class="bg-gray-500 text-white px-3 py-1 rounded"
          icon="lucide:refresh-ccw"
        >
          Recargar
        </UButton>
      </div>
    </div>

    <UTable
      :data="dataRef"
      :columns="columns"
      :loading="status === 'pending'"
      class="flex-1"
    />
  </div>
</template>
