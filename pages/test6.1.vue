<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Layout principal con panel lateral y área de contenido -->
    <div class="flex h-screen overflow-hidden">
      <!-- Panel lateral izquierdo con componentes -->
      <div class="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
        <div class="p-4 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-800">Constructor</h2>
        </div>

        <!-- Componentes arrastrables -->
        <div class="p-4 overflow-y-auto flex-grow">
          <h3
            class="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3"
          >
            Componentes
          </h3>
          <div class="space-y-2">
            <div
              v-for="component in availableComponents"
              :key="component.type"
              class="bg-gray-50 p-3 rounded-md cursor-move hover:bg-gray-100 transition-colors flex items-center gap-2 border border-gray-200"
              @click="addComponent(component.type as ComponentType)"
            >
              <Icon
                :name="getIcon(component.type)"
                class="h-5 w-5 text-gray-500"
              />
              <span class="text-sm">{{ component.label }}</span>
            </div>
          </div>
        </div>

        <!-- Botones de acción -->
        <div class="p-4 border-t border-gray-200">
          <button
            @click="exportContent"
            class="w-full py-2 px-4 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
          >
            <Icon name="lucide:download" class="h-4 w-4" />
            Exportar JSON
          </button>

          <button
            @click="showPreview = true"
            class="w-full mt-2 py-2 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
          >
            <Icon name="lucide:eye" class="h-4 w-4" />
            Vista Previa
          </button>
        </div>
      </div>

      <!-- Área principal de contenido -->
      <div class="flex-1 flex flex-col h-full overflow-hidden">
        <!-- Barra superior -->
        <div class="bg-white border-b border-gray-200 p-4">
          <h1 class="text-xl font-bold text-gray-800">
            Constructor de Contenido V4
          </h1>
        </div>

        <!-- Área de trabajo con scroll y panel de propiedades -->
        <div class="flex-1 flex overflow-hidden">
          <!-- Área de trabajo principal -->
          <div class="flex-1 overflow-y-auto p-6">
            <!-- Selección de plantilla -->
            <div
              class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6"
            >
              <h2 class="text-lg font-medium mb-3 text-gray-800">Plantillas</h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <!-- Opción sin plantilla -->
                <div
                  class="border rounded-md p-3 cursor-pointer hover:border-emerald-500 transition-colors"
                  :class="{
                    'border-emerald-500 bg-emerald-50':
                      selectedTemplate === 'none',
                  }"
                  @click="selectTemplate('none')"
                >
                  <div
                    class="aspect-video bg-gray-100 mb-2 overflow-hidden flex items-center justify-center"
                  >
                    <Icon
                      name="lucide:layout"
                      class="h-10 w-10 text-gray-400"
                    />
                  </div>
                  <p class="font-medium text-center">Sin Plantilla</p>
                </div>

                <!-- Plantillas predefinidas -->
                <div
                  v-for="template in templates"
                  :key="template.id"
                  class="border rounded-md p-3 cursor-pointer hover:border-emerald-500 transition-colors"
                  :class="{
                    'border-emerald-500 bg-emerald-50':
                      selectedTemplate === template.id,
                  }"
                  @click="selectTemplate(template.id)"
                >
                  <div class="aspect-video bg-gray-100 mb-2 overflow-hidden">
                    <img
                      :src="template.thumbnail"
                      alt="Vista previa de plantilla"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <p class="font-medium text-center">{{ template.name }}</p>
                </div>
              </div>
            </div>

            <!-- Campos fijos de la plantilla (si hay una plantilla seleccionada) -->
            <div
              v-if="selectedTemplate && selectedTemplate !== 'none'"
              class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6"
            >
              <h2 class="text-lg font-medium mb-3 text-gray-800">
                Información del Artículo
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Título
                  </label>
                  <input
                    v-model="fixedFields.title"
                    type="text"
                    class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    placeholder="Ingrese título del artículo"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Autor
                  </label>
                  <input
                    v-model="fixedFields.author"
                    type="text"
                    class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    placeholder="Ingrese nombre del autor"
                  />
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    URL de Imagen de Portada
                  </label>
                  <input
                    v-model="fixedFields.bannerImage"
                    type="text"
                    class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    placeholder="Ingrese URL de la imagen de portada"
                  />
                  <div v-if="fixedFields.bannerImage" class="mt-2 relative">
                    <img
                      :src="fixedFields.bannerImage"
                      alt="Vista previa de portada"
                      class="w-full h-48 object-cover rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Área de construcción de contenido -->
            <div
              class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6"
            >
              <!-- Template Header (si hay una plantilla seleccionada) -->
              <template v-if="selectedTemplate && selectedTemplate !== 'none'">
                <!-- Banner Template -->
                <div v-if="selectedTemplate === 'banner'" class="relative">
                  <img
                    :src="
                      fixedFields.bannerImage ||
                      '/placeholder.svg?height=400&width=1200'
                    "
                    alt="Banner"
                    class="w-full h-64 object-cover"
                  />
                  <div
                    class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6"
                  >
                    <h1 class="text-3xl font-bold text-white">
                      {{ fixedFields.title || "Título del artículo" }}
                    </h1>
                    <p class="text-white/80">
                      Por {{ fixedFields.author || "Nombre del autor" }}
                    </p>
                  </div>
                </div>

                <!-- Feature Template -->
                <div v-else-if="selectedTemplate === 'feature'" class="p-6">
                  <h1 class="text-4xl font-bold mb-2">
                    {{ fixedFields.title || "Título del artículo" }}
                  </h1>
                  <p class="text-gray-500 mb-4">
                    Por {{ fixedFields.author || "Nombre del autor" }}
                  </p>
                  <img
                    :src="
                      fixedFields.bannerImage ||
                      '/placeholder.svg?height=400&width=1200'
                    "
                    alt="Banner"
                    class="w-full h-64 object-cover rounded-md mb-6"
                  />
                </div>

                <!-- Minimal Template -->
                <div v-else-if="selectedTemplate === 'minimal'" class="p-6">
                  <div class="max-w-3xl mx-auto">
                    <h1 class="text-3xl font-bold mb-2 text-center">
                      {{ fixedFields.title || "Título del artículo" }}
                    </h1>
                    <p class="text-gray-500 mb-6 text-center">
                      Por {{ fixedFields.author || "Nombre del autor" }}
                    </p>
                    <img
                      :src="
                        fixedFields.bannerImage ||
                        '/placeholder.svg?height=400&width=1200'
                      "
                      alt="Banner"
                      class="w-full h-64 object-cover rounded-md mb-6"
                    />
                  </div>
                </div>
              </template>

              <!-- Content Grid with GridStack -->
              <div class="p-6 editor-area" ref="contentGridRef">
                <div
                  v-if="!hasBlocks"
                  class="min-h-[300px] border-2 border-dashed border-gray-200 rounded-md flex items-center justify-center"
                >
                  <div class="text-center">
                    <Icon
                      name="lucide:layout"
                      class="h-12 w-12 text-gray-300 mx-auto mb-2"
                    />
                    <p class="text-gray-400">
                      Haga clic en los componentes para añadirlos al contenido
                    </p>
                  </div>
                </div>
                <div v-else>
                  <div ref="gridStackContainer" class="grid-stack"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Panel de propiedades (aparece cuando hay un bloque seleccionado) -->
          <div
            v-if="selectedBlockId"
            class="w-80 bg-white border-l border-gray-200 overflow-y-auto"
          >
            <div
              class="p-4 border-b border-gray-200 flex justify-between items-center"
            >
              <h3 class="font-medium text-gray-800">Propiedades</h3>
              <button
                @click="selectedBlockId = null"
                class="text-gray-500 hover:text-gray-700"
              >
                <Icon name="lucide:x" class="h-4 w-4" />
              </button>
            </div>

            <div class="p-4">
              <div v-if="selectedBlock">
                <!-- Propiedades comunes -->
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Ancho (1-12)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="12"
                    :value="selectedBlock.width"
                    class="w-full"
                    @input="
                      updateBlockWidth(
                        parseInt(($event.target as HTMLInputElement).value)
                      )
                    "
                  />
                  <div class="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1</span>
                    <span>6</span>
                    <span>12</span>
                  </div>
                </div>

                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Alto (unidades)
                  </label>
                  <input
                    type="range"
                    min="1"
                    :max="10"
                    :value="selectedBlock.height"
                    class="w-full"
                    @input="
                      updateBlockHeight(
                        parseInt(($event.target as HTMLInputElement).value)
                      )
                    "
                  />
                  <div class="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1</span>
                    <span>5</span>
                    <span>10</span>
                  </div>
                </div>

                <!-- Propiedades específicas por tipo de bloque -->
                <div
                  v-if="
                    ['title', 'subtitle', 'text'].includes(selectedBlock.type)
                  "
                  class="mb-4"
                >
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Contenido
                  </label>
                  <textarea
                    :value="selectedBlock.content || ''"
                    class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    :rows="selectedBlock.type === 'text' ? 5 : 2"
                    @input="
                      updateBlockContent(
                        ($event.target as HTMLTextAreaElement).value
                      )
                    "
                  ></textarea>
                </div>

                <!-- Propiedades de imagen -->
                <div v-if="selectedBlock.type === 'image'">
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      URL de la imagen
                    </label>
                    <input
                      type="text"
                      :value="selectedBlock.content || ''"
                      class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                      placeholder="Ingrese URL de la imagen"
                      @input="
                        updateBlockContent(
                          ($event.target as HTMLInputElement).value
                        )
                      "
                    />
                  </div>

                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Texto alternativo
                    </label>
                    <input
                      type="text"
                      :value="selectedBlock.imageProps?.alt || ''"
                      class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                      placeholder="Descripción de la imagen"
                      @input="
                        updateImageProps({
                          alt: ($event.target as HTMLInputElement).value,
                        })
                      "
                    />
                  </div>

                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Ajuste de imagen
                    </label>
                    <select
                      :value="selectedBlock.imageProps?.objectFit || 'cover'"
                      class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                      @change="
                        updateImageProps({
                          objectFit: ($event.target as HTMLSelectElement)
                            .value as ObjectFitType,
                        })
                      "
                    >
                      <option value="cover">Cubrir (cover)</option>
                      <option value="contain">Contener (contain)</option>
                      <option value="fill">Llenar (fill)</option>
                      <option value="none">Ninguno (none)</option>
                    </select>
                  </div>
                </div>

                <!-- Propiedades de columnas -->
                <div v-if="selectedBlock.type === 'columns'">
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Número de columnas
                    </label>
                    <select
                      :value="selectedBlock.columns || 2"
                      class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                      @change="
                        updateColumnsCount(
                          selectedBlockId as string,
                          parseInt(($event.target as HTMLSelectElement).value)
                        )
                      "
                    >
                      <option value="2">2 columnas</option>
                      <option value="3">3 columnas</option>
                      <option value="4">4 columnas</option>
                      <option value="6">6 columnas</option>
                    </select>
                  </div>

                  <div
                    v-for="(content, index) in selectedBlock.columnContent ||
                    []"
                    :key="index"
                    class="mb-4"
                  >
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Contenido columna {{ index + 1 }}
                    </label>
                    <textarea
                      :value="content || ''"
                      class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                      rows="3"
                      @input="
                        updateColumnContent(
                          selectedBlockId as string,
                          index,
                          ($event.target as HTMLTextAreaElement).value
                        )
                      "
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Vista Previa con GridStack -->
    <div
      v-if="showPreview"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div
        class="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-auto"
      >
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">Vista Previa</h2>
            <button
              @click="showPreview = false"
              class="text-gray-500 hover:text-gray-700"
            >
              <Icon name="lucide:x" class="h-5 w-5" />
            </button>
          </div>

          <!-- Contenedor para la vista previa de GridStack -->
          <div ref="previewGridContainer" class="grid-stack preview-grid"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from "vue";
import "gridstack/dist/gridstack.min.css";
import { GridStack } from "gridstack";

// Define tipos para evitar errores de TypeScript
type ComponentType =
  | "title"
  | "subtitle"
  | "text"
  | "divider"
  | "image"
  | "columns";
type ObjectFitType = "cover" | "contain" | "fill" | "none";

interface Template {
  id: string;
  name: string;
  thumbnail: string;
}

interface FixedFields {
  title: string;
  author: string;
  bannerImage: string;
}

interface ImageProperties {
  alt: string;
  objectFit: ObjectFitType;
  height: number; // percentage of container
}

interface ContentBlock {
  id: string;
  type: ComponentType;
  content?: string;
  columns?: number;
  columnContent?: string[];
  imageProps?: ImageProperties;
  // GridStack properties
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ComponentDefinition {
  type: string;
  label: string;
}

// State
const templates = ref<Template[]>([
  {
    id: "banner",
    name: "Banner Header",
    thumbnail: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "feature",
    name: "Feature Article",
    thumbnail: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "minimal",
    name: "Minimal",
    thumbnail: "/placeholder.svg?height=100&width=200",
  },
]);

const selectedTemplate = ref<string | null>(null);
const fixedFields = ref<FixedFields>({
  title: "",
  author: "",
  bannerImage: "",
});

const blocks = ref<ContentBlock[]>([]);
const showPreview = ref(false);
const selectedBlockId = ref<string | null>(null);
const contentGridRef = ref<HTMLElement | null>(null);
const gridStackContainer = ref<HTMLElement | null>(null);
const previewGridContainer = ref<HTMLElement | null>(null);
const gridStack = ref<any>(null);
const previewGridStack = ref<any>(null);

// Computed para obtener el bloque seleccionado
const selectedBlock = computed(() => {
  if (!selectedBlockId.value) return null;
  return (
    blocks.value.find((block) => block.id === selectedBlockId.value) || null
  );
});

const availableComponents: ComponentDefinition[] = [
  { type: "title", label: "Título" },
  { type: "subtitle", label: "Subtítulo" },
  { type: "text", label: "Texto" },
  { type: "divider", label: "Divisor" },
  { type: "image", label: "Imagen" },
  { type: "columns", label: "Columnas" },
];

// Computed properties
const hasBlocks = computed(() => blocks.value.length > 0);

const sortedBlocks = computed(() => {
  return [...blocks.value].sort((a, b) => a.y - b.y);
});

// Helper functions
const getIcon = (type: string): string => {
  switch (type) {
    case "title":
      return "lucide:heading-1";
    case "subtitle":
      return "lucide:heading-2";
    case "text":
      return "lucide:text";
    case "divider":
      return "lucide:minus";
    case "image":
      return "lucide:image";
    case "columns":
      return "lucide:columns";
    default:
      return "lucide:text";
  }
};

// Initialize GridStack
const initGridStack = () => {
  if (!gridStackContainer.value) return;

  // Inicializar GridStack
  gridStack.value = GridStack.init(
    {
      column: 12,
      cellHeight: 50,
      margin: 10,
      float: true,
      animate: true,
      resizable: {
        handles: "e,se,s,sw,w",
      },
    },
    gridStackContainer.value
  );

  // Escuchar eventos de cambio
  gridStack.value.on("change", () => {
    updateBlocksFromGrid();
  });

  // Escuchar eventos de clic para seleccionar bloques
  gridStackContainer.value.addEventListener("click", (e) => {
    const gridItem = (e.target as HTMLElement).closest(".grid-stack-item");
    if (gridItem) {
      const blockId = gridItem.getAttribute("gs-id");
      if (blockId) {
        selectBlock(blockId);
      }
    }
  });
};

// Inicializar GridStack para la vista previa
const initPreviewGridStack = () => {
  if (!previewGridContainer.value) return;

  // Limpiar el contenedor si ya existe una instancia
  if (previewGridStack.value) {
    previewGridStack.value.destroy();
  }

  // Inicializar GridStack para la vista previa (solo lectura)
  previewGridStack.value = GridStack.init(
    {
      column: 12,
      cellHeight: 50,
      margin: 10,
      float: true,
      animate: false,
      staticGrid: true, // Solo lectura
      disableResize: true,
      disableDrag: true,
    },
    previewGridContainer.value
  );

  // Renderizar los bloques en la vista previa
  renderPreviewBlocks();
};

// Actualizar los bloques desde el grid
const updateBlocksFromGrid = () => {
  if (!gridStack.value) return;

  const gridItems = gridStack.value.getGridItems();

  gridItems.forEach((item: HTMLElement) => {
    const blockId = item.getAttribute("gs-id");
    if (!blockId) return;

    const blockIndex = blocks.value.findIndex((b) => b.id === blockId);
    if (blockIndex === -1) return;

    const x = parseInt(item.getAttribute("gs-x") || "0");
    const y = parseInt(item.getAttribute("gs-y") || "0");
    const width = parseInt(item.getAttribute("gs-w") || "12");
    const height = parseInt(item.getAttribute("gs-h") || "1");

    blocks.value[blockIndex] = {
      ...blocks.value[blockIndex],
      x,
      y,
      width,
      height,
    };
  });
};

// Renderizar un bloque en el grid
const renderBlock = (block: ContentBlock) => {
  if (!gridStack.value) return;

  // Crear el contenido HTML del bloque
  let content = "";

  // Controles del bloque
  content += `
  <div class="absolute right-2 top-2 flex space-x-1 bg-white shadow-sm rounded-md p-1 z-10">
    <button class="duplicate-btn p-1 hover:bg-gray-100 rounded">
      <Icon name="lucide:copy" class="w-4 h-4" /> DUPLICAR
    </button>
    <button class="remove-btn p-1 hover:bg-gray-100 rounded text-red-500">
      <Icon name="lucide:trash-2" class="w-4 h-4" />
    </button>
  </div>
`;

  content += '<div class="p-3 h-full">';

  // Contenido según el tipo de bloque
  if (block.type === "title") {
    content += `<div class="block-content font-bold text-2xl md:text-3xl outline-none w-full min-h-[40px]" contenteditable>${
      block.content || "Ingrese título aquí"
    }</div>`;
  } else if (block.type === "subtitle") {
    content += `<div class="block-content font-medium text-xl md:text-2xl outline-none w-full min-h-[36px]" contenteditable>${
      block.content || "Ingrese subtítulo aquí"
    }</div>`;
  } else if (block.type === "text") {
    content += `<div class="block-content text-base outline-none w-full min-h-[100px]" contenteditable>${
      block.content || "Ingrese texto aquí"
    }</div>`;
  } else if (block.type === "divider") {
    content += `<hr class="w-full border-t" />`;
  } else if (block.type === "image") {
    content += `
    <div class="w-full h-full relative">
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
      <div class="border border-dashed border-gray-200 p-2 min-h-[100px]">
        <div class="column-content outline-none h-full" data-column-index="${i}" contenteditable>
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

  // Crear o actualizar el elemento en el grid
  const existingItem = gridStack.value.el.querySelector(
    `.grid-stack-item[gs-id="${block.id}"]`
  );

  if (existingItem) {
    // Actualizar el contenido del elemento existente
    const contentEl = existingItem.querySelector(".grid-stack-item-content");
    if (contentEl) {
      contentEl.innerHTML = content;
    }

    // Actualizar la posición y tamaño si es necesario
    gridStack.value.update(existingItem, {
      x: block.x,
      y: block.y,
      w: block.width,
      h: block.height,
    });

    // Aplicar clase de selección si está seleccionado
    if (selectedBlockId.value === block.id) {
      existingItem.classList.add("ring-2", "ring-emerald-500");
    } else {
      existingItem.classList.remove("ring-2", "ring-emerald-500");
    }
  } else {
    // Crear un nuevo elemento
    const newItem = document.createElement("div");
    newItem.setAttribute("gs-id", block.id);
    newItem.setAttribute("gs-x", block.x.toString());
    newItem.setAttribute("gs-y", block.y.toString());
    newItem.setAttribute("gs-w", block.width.toString());
    newItem.setAttribute("gs-h", block.height.toString());
    newItem.className = "grid-stack-item";

    if (selectedBlockId.value === block.id) {
      newItem.classList.add("ring-2", "ring-emerald-500");
    }

    newItem.innerHTML = `<div class="grid-stack-item-content border rounded-md bg-white shadow-sm hover:shadow-md transition-shadow relative">${content}</div>`;

    gridStack.value.addWidget(newItem);
  }

  // Agregar event listeners a los botones y campos
  setupBlockEventListeners(block.id);
};

// Renderizar un bloque en la vista previa
const renderPreviewBlock = (block: ContentBlock) => {
  if (!previewGridStack.value) return;

  // Crear el contenido HTML del bloque para la vista previa (sin controles de edición)
  let content = '<div class="p-3 h-full">';

  // Contenido según el tipo de bloque
  if (block.type === "title") {
    content += `<div class="font-bold text-2xl md:text-3xl w-full">${
      block.content || "Título"
    }</div>`;
  } else if (block.type === "subtitle") {
    content += `<div class="font-medium text-xl md:text-2xl w-full">${
      block.content || "Subtítulo"
    }</div>`;
  } else if (block.type === "text") {
    content += `<div class="text-base w-full">${
      block.content || "Texto"
    }</div>`;
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
        ${
          block.columnContent && block.columnContent[i]
            ? block.columnContent[i]
            : `Contenido columna ${i + 1}`
        }
      </div>
    `;
    }

    content += "</div>";
  }

  content += "</div>";

  // Crear el elemento en la vista previa
  const newItem = document.createElement("div");
  newItem.setAttribute("gs-id", block.id);
  newItem.setAttribute("gs-x", block.x.toString());
  newItem.setAttribute("gs-y", block.y.toString());
  newItem.setAttribute("gs-w", block.width.toString());
  newItem.setAttribute("gs-h", block.height.toString());
  newItem.className = "grid-stack-item";
  newItem.innerHTML = `<div class="grid-stack-item-content border rounded-md bg-white shadow-sm">${content}</div>`;

  previewGridStack.value.addWidget(newItem);
};

// Renderizar todos los bloques en la vista previa
const renderPreviewBlocks = () => {
  if (!previewGridStack.value) return;

  // Limpiar el grid de vista previa
  previewGridStack.value.removeAll();

  // Renderizar cada bloque en orden
  sortedBlocks.value.forEach((block) => {
    renderPreviewBlock(block);
  });
};

// Configurar event listeners para los elementos dentro de un bloque
const setupBlockEventListeners = (blockId: string) => {
  if (!gridStackContainer.value) return;

  const gridItem = gridStackContainer.value.querySelector(
    `.grid-stack-item[gs-id="${blockId}"]`
  );
  if (!gridItem) return;

  // Botón de duplicar
  const duplicateBtn = gridItem.querySelector(".duplicate-btn");
  if (duplicateBtn) {
    duplicateBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      duplicateBlock(blockId);
    });
  }

  // Botón de eliminar
  const removeBtn = gridItem.querySelector(".remove-btn");
  if (removeBtn) {
    removeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      removeBlock(blockId);
    });
  }

  // Contenido editable
  const contentEl = gridItem.querySelector(".block-content");
  if (contentEl) {
    contentEl.addEventListener("blur", (e) => {
      const content = (e.target as HTMLElement).textContent || "";
      updateBlockContent2(blockId, content);
    });
  }

  // Campos específicos para columnas
  if (blocks.value.find((b) => b.id === blockId)?.type === "columns") {
    const columnContents = gridItem.querySelectorAll(".column-content");
    columnContents.forEach((el) => {
      el.addEventListener("blur", (e) => {
        const columnIndex = parseInt(
          (e.target as HTMLElement).getAttribute("data-column-index") || "0"
        );
        updateColumnContent(
          blockId,
          columnIndex,
          (e.target as HTMLElement).textContent || ""
        );
      });
    });
  }
};

// Renderizar todos los bloques
const renderBlocks = () => {
  if (!gridStack.value) return;

  // Limpiar el grid
  gridStack.value.removeAll();

  // Renderizar cada bloque
  blocks.value.forEach((block) => {
    renderBlock(block);
  });
};

// Actions
const selectTemplate = (templateId: string) => {
  selectedTemplate.value = templateId;
};

const selectBlock = (blockId: string) => {
  selectedBlockId.value = blockId;

  // Re-renderizar los bloques para mostrar/ocultar controles
  renderBlocks();
};

const addComponent = (componentType: ComponentType) => {
  // Generate a unique ID for the block
  const blockId = `block-${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 9)}`;

  // Default image properties
  const imageProps =
    componentType === "image"
      ? {
          alt: "Imagen descriptiva",
          objectFit: "cover" as const,
          height: 100,
        }
      : undefined;

  // Determine default width and height based on component type
  const defaultWidth = 12; // Full width by default
  let defaultHeight = 2; // Default height

  switch (componentType) {
    case "title":
    case "subtitle":
      defaultHeight = 1;
      break;
    case "text":
      defaultHeight = 3;
      break;
    case "divider":
      defaultHeight = 1;
      break;
    case "image":
      defaultHeight = 6;
      break;
    case "columns":
      defaultHeight = 4;
      break;
  }

  // Find the highest y-coordinate to place the new item at the bottom
  const maxY =
    blocks.value.length > 0
      ? Math.max(...blocks.value.map((item) => item.y + item.height))
      : 0;

  // Create the content block
  const newBlock: ContentBlock = {
    id: blockId,
    type: componentType,
    content: "",
    columns: componentType === "columns" ? 2 : undefined,
    columnContent: componentType === "columns" ? ["", ""] : undefined,
    imageProps,
    x: 0,
    y: maxY,
    width: defaultWidth,
    height: defaultHeight,
  };

  // Add the block to our blocks array
  blocks.value.push(newBlock);

  // Render the new block
  if (gridStack.value) {
    renderBlock(newBlock);
  } else {
    // Initialize GridStack if it doesn't exist yet
    nextTick(() => {
      initGridStack();
      renderBlocks();
    });
  }

  // Select the new block
  selectedBlockId.value = blockId;
};

// Métodos para actualizar propiedades del bloque seleccionado
const updateBlockWidth = (width: number) => {
  if (!selectedBlock.value || !selectedBlockId.value) return;

  selectedBlock.value.width = width;
  updateSelectedBlockSize();
};

const updateBlockHeight = (height: number) => {
  if (!selectedBlock.value || !selectedBlockId.value) return;

  selectedBlock.value.height = height;
  updateSelectedBlockSize();
};

const updateBlockContent = (content: string) => {
  if (!selectedBlock.value || !selectedBlockId.value) return;

  selectedBlock.value.content = content;
  updateSelectedBlockContent();
};

const updateBlockContent2 = (blockId: string, content: string) => {
  const blockIndex = blocks.value.findIndex((b) => b.id === blockId);
  if (blockIndex !== -1) {
    blocks.value[blockIndex] = {
      ...blocks.value[blockIndex],
      content,
    };

    // Re-renderizar el bloque para actualizar la vista
    renderBlock(blocks.value[blockIndex]);
  }
};

const updateSelectedBlockContent = () => {
  if (selectedBlock.value && selectedBlockId.value) {
    // Re-renderizar el bloque para actualizar la vista
    renderBlock(selectedBlock.value);
  }
};

const updateSelectedBlockSize = () => {
  if (selectedBlock.value && selectedBlockId.value) {
    // Actualizar el tamaño en el grid
    const gridItem = gridStack.value.el.querySelector(
      `.grid-stack-item[gs-id="${selectedBlockId.value}"]`
    );

    if (gridItem) {
      gridStack.value.update(gridItem, {
        w: selectedBlock.value.width,
        h: selectedBlock.value.height,
      });
    }
  }
};

const updateColumnContent = (
  blockId: string,
  columnIndex: number,
  content: string
) => {
  const blockIndex = blocks.value.findIndex((b) => b.id === blockId);
  if (blockIndex !== -1 && blocks.value[blockIndex].columnContent) {
    const columnContent = [...blocks.value[blockIndex].columnContent!];
    columnContent[columnIndex] = content;

    blocks.value[blockIndex] = {
      ...blocks.value[blockIndex],
      columnContent,
    };

    // Re-renderizar el bloque para actualizar la vista
    renderBlock(blocks.value[blockIndex]);
  }
};

const updateImageProps = (props: Partial<ImageProperties>) => {
  if (!selectedBlockId.value) return;

  const blockIndex = blocks.value.findIndex(
    (b) => b.id === selectedBlockId.value
  );
  if (blockIndex !== -1 && blocks.value[blockIndex].type === "image") {
    blocks.value[blockIndex] = {
      ...blocks.value[blockIndex],
      imageProps: {
        ...(blocks.value[blockIndex].imageProps || {
          alt: "",
          objectFit: "cover",
          height: 100,
        }),
        ...props,
      },
    };

    // Re-renderizar el bloque para actualizar la vista
    renderBlock(blocks.value[blockIndex]);
  }
};

const updateColumnsCount = (blockId: string, columnsCount: number) => {
  const blockIndex = blocks.value.findIndex((b) => b.id === blockId);
  if (blockIndex !== -1) {
    // Preserve existing column content and add empty strings for new columns
    const existingContent = blocks.value[blockIndex].columnContent || [];
    const newColumnContent = [...existingContent];

    // Add empty content for new columns
    while (newColumnContent.length < columnsCount) {
      newColumnContent.push("");
    }

    // Trim if reducing columns
    if (newColumnContent.length > columnsCount) {
      newColumnContent.length = columnsCount;
    }

    blocks.value[blockIndex] = {
      ...blocks.value[blockIndex],
      columns: columnsCount,
      columnContent: newColumnContent,
    };

    // Re-renderizar el bloque para actualizar la vista
    renderBlock(blocks.value[blockIndex]);
  }
};

const removeBlock = (blockId: string) => {
  // Remove from blocks array
  blocks.value = blocks.value.filter((b) => b.id !== blockId);

  // Remove from grid
  if (gridStack.value) {
    const gridItem = gridStack.value.el.querySelector(
      `.grid-stack-item[gs-id="${blockId}"]`
    );
    if (gridItem) {
      gridStack.value.removeWidget(gridItem);
    }
  }

  if (selectedBlockId.value === blockId) {
    selectedBlockId.value = null;
  }
};

const duplicateBlock = (blockId: string) => {
  const blockIndex = blocks.value.findIndex((b) => b.id === blockId);
  if (blockIndex === -1) return;

  const block = blocks.value[blockIndex];

  // Create a new block ID
  const newBlockId = `block-${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 9)}`;

  // Clone the block
  const newBlock: ContentBlock = JSON.parse(JSON.stringify(block));
  newBlock.id = newBlockId;
  newBlock.y = block.y + block.height; // Place below the original

  blocks.value.push(newBlock);

  // Render the new block
  renderBlock(newBlock);

  // Select the new block
  selectedBlockId.value = newBlockId;
};

const exportContent = () => {
  // Solo exportar el JSON para que GridStack lo renderice
  const exportData = {
    template: selectedTemplate.value,
    fixedFields: fixedFields.value,
    blocks: blocks.value,
  };

  // Create a JSON blob and download it
  const blob = new Blob([JSON.stringify(exportData, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "article-content.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Observar cambios en los bloques para re-renderizar
watch(
  blocks,
  () => {
    if (gridStack.value) {
      renderBlocks();
    }
  },
  { deep: true }
);

// Observar cambios en showPreview para inicializar la vista previa
watch(showPreview, (newValue) => {
  if (newValue) {
    nextTick(() => {
      initPreviewGridStack();
    });
  }
});

// Inicializar GridStack cuando el componente se monta
onMounted(() => {
  nextTick(() => {
    if (blocks.value.length > 0) {
      initGridStack();
      renderBlocks();
    }
  });
});

// Limpiar GridStack cuando el componente se desmonta
onUnmounted(() => {
  if (gridStack.value) {
    gridStack.value.destroy();
  }
  if (previewGridStack.value) {
    previewGridStack.value.destroy();
  }
});
</script>

<style scoped>
[contenteditable] {
  outline: none;
}

.grid-stack {
  background: #f9fafb;
  min-height: 300px;
}

.grid-stack-item-content {
  overflow-y: auto;
  padding: 0;
}

.grid-stack-placeholder > .placeholder-content {
  background-color: #f0f9ff;
  border: 1px dashed #60a5fa;
}

.grid-stack-item.ui-draggable-dragging,
.grid-stack-item.ui-resizable-resizing {
  opacity: 0.8;
  z-index: 100;
}

.grid-stack-item.ring-2 {
  z-index: 10;
}

/* Estilos específicos para elementos pequeños como divisores */
.grid-stack-item[gs-id^="block"][gs-h="1"] {
  min-height: 50px !important;
}

/* Estilos para la vista previa */
.preview-grid .grid-stack-item {
  cursor: default;
}

/* Estilos para distinguir entre editor y preview */
.editor-area {
  position: relative;
}

.editor-area::before {
  content: "EDITOR";
  position: absolute;
  top: 0;
  right: 0;
  background-color: #f3f4f6;
  color: #6b7280;
  font-size: 0.75rem;
  padding: 2px 6px;
  border-radius: 0 0 0 4px;
  z-index: 5;
}

.preview-grid::before {
  content: "PREVIEW";
  position: absolute;
  top: 0;
  right: 0;
  background-color: #f0fdf4;
  color: #16a34a;
  font-size: 0.75rem;
  padding: 2px 6px;
  border-radius: 0 0 0 4px;
  z-index: 5;
}

/* Fix for content shifting when resizing */
.grid-stack > .grid-stack-item {
  min-width: 0;
}

.grid-stack > .grid-stack-item > .grid-stack-item-content {
  inset: 0;
  overflow: hidden;
}
</style>
