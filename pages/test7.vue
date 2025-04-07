<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <!-- Content Viewer Header -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div class="flex justify-between items-center">
        <h1 class="text-xl font-bold text-gray-800">
          Visualizador de Contenido
        </h1>
        <div class="flex gap-2">
          <button
            @click="importContent"
            class="py-2 px-4 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors flex items-center gap-2"
          >
            <Icon name="lucide:upload" class="h-4 w-4" />
            Importar
          </button>
          <input
            type="file"
            ref="fileInput"
            accept=".json"
            class="hidden"
            @change="handleFileUpload"
          />
        </div>
      </div>
    </div>

    <!-- Content Display Area -->
    <div
      v-if="!contentData"
      class="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center"
    >
      <Icon
        name="lucide:layout-template"
        class="h-16 w-16 text-gray-300 mx-auto mb-4"
      />
      <h2 class="text-xl font-medium text-gray-700 mb-2">
        No hay contenido para mostrar
      </h2>
      <p class="text-gray-500 mb-4">
        Importe un archivo JSON exportado desde el constructor de contenido
      </p>
      <button
        @click="importContent"
        class="py-2 px-4 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors inline-flex items-center gap-2"
      >
        <Icon name="lucide:upload" class="h-4 w-4" />
        Importar Contenido
      </button>
    </div>

    <div
      v-else
      class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
    >
      <!-- Template Header (si hay una plantilla seleccionada) -->
      <template v-if="contentData.template && contentData.template !== 'none'">
        <!-- Banner Template -->
        <div v-if="contentData.template === 'banner'" class="relative">
          <img
            :src="
              contentData.fixedFields.bannerImage ||
              '/placeholder.svg?height=400&width=1200'
            "
            alt="Banner"
            class="w-full h-64 object-cover"
          />
          <div
            class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6"
          >
            <h1 class="text-3xl font-bold text-white">
              {{ contentData.fixedFields.title || "Título del artículo" }}
            </h1>
            <p class="text-white/80">
              Por {{ contentData.fixedFields.author || "Nombre del autor" }}
            </p>
          </div>
        </div>

        <!-- Feature Template -->
        <div v-else-if="contentData.template === 'feature'" class="p-6">
          <h1 class="text-4xl font-bold mb-2">
            {{ contentData.fixedFields.title || "Título del artículo" }}
          </h1>
          <p class="text-gray-500 mb-4">
            Por {{ contentData.fixedFields.author || "Nombre del autor" }}
          </p>
          <img
            :src="
              contentData.fixedFields.bannerImage ||
              '/placeholder.svg?height=400&width=1200'
            "
            alt="Banner"
            class="w-full h-64 object-cover rounded-md mb-6"
          />
        </div>

        <!-- Minimal Template -->
        <div v-else-if="contentData.template === 'minimal'" class="p-6">
          <div class="max-w-3xl mx-auto">
            <h1 class="text-3xl font-bold mb-2 text-center">
              {{ contentData.fixedFields.title || "Título del artículo" }}
            </h1>
            <p class="text-gray-500 mb-6 text-center">
              Por {{ contentData.fixedFields.author || "Nombre del autor" }}
            </p>
            <img
              :src="
                contentData.fixedFields.bannerImage ||
                '/placeholder.svg?height=400&width=1200'
              "
              alt="Banner"
              class="w-full h-64 object-cover rounded-md mb-6"
            />
          </div>
        </div>
      </template>

      <!-- GridStack Content Viewer -->
      <div class="p-6">
        <div ref="gridContainer" class="grid-stack"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";

interface ImageProperties {
  alt: string;
  objectFit: "cover" | "contain" | "fill" | "none";
  height: number;
}

interface ContentBlock {
  id: string;
  type: "title" | "subtitle" | "text" | "divider" | "image" | "columns";
  content?: string;
  columns?: number;
  columnContent?: string[];
  imageProps?: ImageProperties;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface FixedFields {
  title: string;
  author: string;
  bannerImage: string;
}

interface ContentData {
  template: string | null;
  fixedFields: FixedFields;
  blocks: ContentBlock[];
}

const contentData = ref<ContentData | null>(null);
const gridContainer = ref<HTMLElement | null>(null);
const gridStack = ref<any>(null);
const fileInput = ref<HTMLInputElement | null>(null);

// Inicializar GridStack en modo de solo visualización
const initGridStack = () => {
  if (!gridContainer.value || !contentData.value) return;

  // Limpiar el contenedor si ya existe una instancia
  if (gridStack.value) {
    gridStack.value.destroy();
  }

  // Inicializar GridStack en modo estático (no editable)
  gridStack.value = GridStack.init(
    {
      column: 12,
      cellHeight: 50,
      margin: 10,
      disableResize: true,
      disableDrag: true,
      staticGrid: true, // Modo estático para visualización
    },
    gridContainer.value
  );

  // Renderizar los bloques
  renderBlocks();
};

// Renderizar los bloques en el grid
const renderBlocks = () => {
  if (!gridStack.value || !contentData.value) return;

  // Limpiar el grid
  gridStack.value.removeAll();

  // Renderizar cada bloque
  contentData.value.blocks.forEach((block) => {
    renderBlock(block);
  });
};

// Renderizar un bloque individual
const renderBlock = (block: ContentBlock) => {
  if (!gridStack.value) return;

  // Crear el contenido HTML del bloque
  let content = '<div class="p-3 h-full">';

  // Contenido según el tipo de bloque
  if (block.type === "title") {
    content += `<div class="font-bold text-2xl md:text-3xl">${
      block.content || "Título"
    }</div>`;
  } else if (block.type === "subtitle") {
    content += `<div class="font-medium text-xl md:text-2xl">${
      block.content || "Subtítulo"
    }</div>`;
  } else if (block.type === "text") {
    content += `<div class="text-base">${block.content || "Texto"}</div>`;
  } else if (block.type === "divider") {
    content += `<hr class="w-full border-t" />`;
  } else if (block.type === "image") {
    content += `
      <div class="w-full h-full">
        <img
          src="${block.content || "/placeholder.svg?height=300&width=600"}"
          alt="${block.imageProps?.alt || "Imagen descriptiva"}"
          class="w-full h-full rounded-md"
          style="object-fit: ${block.imageProps?.objectFit || "cover"}"
        />
      </div>
    `;
  } else if (block.type === "columns") {
    content += `
      <div class="w-full grid h-full" style="grid-template-columns: repeat(${
        block.columns || 2
      }, 1fr); gap: 1rem;">
    `;

    const columnCount = block.columns || 2;
    for (let i = 0; i < columnCount; i++) {
      content += `
        <div class="p-2">
          <div>
            ${
              block.columnContent && block.columnContent[i]
                ? block.columnContent[i]
                : `Contenido columna ${i + 1}`
            }
          </div>
        </div>
      `;
    }

    content += "</div>";
  }

  content += "</div>";

  // Crear el elemento en el grid
  const newItem = document.createElement("div");
  newItem.setAttribute("gs-id", block.id);
  newItem.setAttribute("gs-x", block.x.toString());
  newItem.setAttribute("gs-y", block.y.toString());
  newItem.setAttribute("gs-w", block.width.toString());
  newItem.setAttribute("gs-h", block.height.toString());
  newItem.className = "grid-stack-item";
  newItem.innerHTML = `<div class="grid-stack-item-content border rounded-md bg-white shadow-sm">${content}</div>`;

  gridStack.value.makeWidget(newItem);
};

// Importar contenido desde un archivo JSON
const importContent = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

// Manejar la carga del archivo
const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files || target.files.length === 0) return;

  const file = target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    try {
      const result = e.target?.result as string;
      contentData.value = JSON.parse(result);

      // Inicializar GridStack después de cargar los datos
      nextTick(() => {
        initGridStack();
      });
    } catch (error) {
      console.error("Error al parsear el archivo JSON:", error);
      alert("El archivo no tiene un formato válido.");
    }
  };

  reader.readAsText(file);
};

// Lifecycle hooks
onMounted(() => {
  // Si hay datos de contenido almacenados en localStorage, cargarlos
  const savedContent = localStorage.getItem("gridstack-content");
  if (savedContent) {
    try {
      contentData.value = JSON.parse(savedContent);
      nextTick(() => {
        initGridStack();
      });
    } catch (error) {
      console.error("Error al cargar contenido guardado:", error);
    }
  }
});

onUnmounted(() => {
  // Limpiar GridStack cuando el componente se desmonta
  if (gridStack.value) {
    gridStack.value.destroy();
  }
});
</script>

<style>
.grid-stack {
  min-height: 300px;
  padding: 0;
}

.grid-stack-item-content {
  overflow-y: auto;
  padding: 0;
  border: none;
  background: none;
}

/* Estilos adicionales para el modo de visualización */
.grid-stack-static .grid-stack-item {
  cursor: default;
}
</style>
