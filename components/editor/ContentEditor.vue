<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Layout principal con panel lateral y área de contenido -->
    <div class="flex h-screen overflow-hidden">
      <!-- Panel lateral izquierdo con componentes -->
      <div class="w-72 border-r border-gray-200 h-full shadow-sm">
        <div class="p-4 border-b border-gray-200 bg-gray-50">
          <h2
            class="text-lg font-semibold text-gray-800 flex items-center gap-2"
          >
            <Icon
              name="lucide:layout-template"
              class="h-5 w-5 text-emerald-600"
            />
            Constructor de Contenido
          </h2>
        </div>
        <UTabs
          :items="items"
          variant="link"
          class="gap-4 w-full"
          :ui="{
            trigger: 'flex-1',
          }"
        >
          <template #components>
            <ComponentsSidebar
              :available-components="availableComponents"
              @add-component="addComponent"
              @export-content="exportContent"
              @show-preview="showPreview = true"
            />
          </template>
          <template #galery>
            <SidebarImage />
          </template>
        </UTabs>
      </div>

      <!-- Área principal de contenido -->
      <div class="flex-1 flex flex-col h-full overflow-hidden">
        <!-- Barra superior -->
        <EditorHeader
          :blocks-count="blocks.length"
          @clear-all="clearAllBlocks"
        />

        <!-- Área de trabajo con scroll y panel de propiedades -->
        <div class="flex-1 flex overflow-hidden">
          <!-- Área de trabajo principal -->
          <div class="flex-1 overflow-y-auto p-6 bg-gray-50">
            <!-- Selección de plantilla -->
            <TemplateSelector
              :templates="templates"
              :selected-template="selectedTemplate"
              @select-template="selectTemplate"
            />

            <!-- Campos fijos de la plantilla (si hay una plantilla seleccionada) -->
            <TemplateFields
              v-if="selectedTemplate && selectedTemplate !== 'none'"
              v-model:fixed-fields="fixedFields"
            />

            <!-- Área de construcción de contenido -->
            <div
              class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6"
            >
              <!-- Template Header (si hay una plantilla seleccionada) -->
              <TemplateHeader
                v-if="selectedTemplate && selectedTemplate !== 'none'"
                :selected-template="selectedTemplate"
                :fixed-fields="fixedFields"
              />

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
          <BlockProperties
            v-if="selectedBlockId"
            :selected-block="selectedBlock"
            @close="selectedBlockId = null"
            @duplicate="duplicateBlock"
            @remove="removeBlock"
            @update-block-width="updateBlockWidth"
            @update-block-height="updateBlockHeight"
            @update-block-content="updateBlockContent"
            @toggle-text-format="toggleTextFormat"
            @update-text-color="updateTextColor"
            @update-text-alignment="updateTextAlignment"
            @update-divider-props="updateDividerProps"
            @update-image-props="updateImageProps"
            @update-video-props="updateVideoProps"
            @update-list-props="updateListProps"
            @update-list-item="updateListItem"
            @add-list-item="addListItem"
            @remove-list-item="removeListItem"
            @update-quote-props="updateQuoteProps"
            @update-code-props="updateCodeProps"
            @update-table-props="updateTableProps"
            @update-table-header="updateTableHeader"
            @update-table-cell="updateTableCell"
            @add-table-row="addTableRow"
            @add-table-column="addTableColumn"
          />
        </div>
      </div>
    </div>

    <!-- Modal de Vista Previa con GridStack -->
    <PreviewModal
      v-if="showPreview"
      :blocks="blocks"
      :selected-template="selectedTemplate"
      :fixed-fields="fixedFields"
      @close="showPreview = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from "vue";
import "gridstack/dist/gridstack.min.css";
import { GridStack } from "gridstack";
import ComponentsSidebar from "./ComponentSidebar.vue";
import EditorHeader from "./EditorHeader.vue";
import TemplateSelector from "./TemplateSelector.vue";
import TemplateFields from "./TemplateFields.vue";
import TemplateHeader from "./TemplateHeader.vue";
import BlockProperties from "./BlockProperties.vue";
import PreviewModal from "./PreviewModal.vue";
import SidebarImage from "./SidebarImage.vue";
import type {
  ComponentType,
  Template,
  FixedFields,
  ContentBlock,
  ComponentDefinition,
  TextAlignment,
  CodeProperties,
  DividerProperties,
  ImageProperties,
  ListProperties,
  VideoProperties,
  QuoteProperties,
  TableProperties,
} from "@/types/content-builder";
import type { TabsItem } from "@nuxt/ui";

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

const items = [
  {
    label: "Componentes",
    icon: "i-lucide-layout-grid",
    slot: "components",
  },
  {
    label: "Galeria",
    icon: "i-lucide-image",
    slot: "galery",
  },
] satisfies TabsItem[];

const selectedTemplate = ref<string | undefined>(undefined);
const fixedFields = ref<FixedFields>({
  title: "",
  author: "",
  bannerImage: "",
  date: "",
  category: "",
  summary: "",
});

const blocks = ref<ContentBlock[]>([]);
const showPreview = ref(false);
const selectedBlockId = ref<string | null>(null);
const contentGridRef = ref<HTMLElement | null>(null);
const gridStackContainer = ref<HTMLElement | null>(null);
const gridStack = ref<any>(null);

// Computed properties
const hasBlocks = computed(() => blocks.value.length > 0);

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
  { type: "video", label: "Video" },
  { type: "image", label: "Imagen" },
  { type: "list", label: "Lista" },
  { type: "quote", label: "Cita" },
  { type: "code", label: "Código" },
  { type: "table", label: "Tabla" },
];

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

  // Controles del bloque (se puden adiconar mas pero en este)
  content += `
  <div class="absolute right-2 top-0 flex space-x-1 bg-white shadow-sm rounded-md p-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
    <button class="duplicate-btn p-1 hover:bg-gray-100 rounded" title="Duplicar">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
    </button>
    <button class="remove-btn p-1 hover:bg-gray-100 rounded text-red-500" title="Eliminar">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
    </button>
  </div>
`;

  content += renderBlockContent(block, true);

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

    newItem.innerHTML = `<div class="grid-stack-item-content border rounded-md bg-white shadow-sm hover:shadow-md transition-shadow relative group">${content}</div>`;

    gridStack.value.addWidget(newItem);
  }

  // Agregar event listeners a los botones y campos
  setupBlockEventListeners(block.id);
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
    .slice(2, 11)}`;
  // Default image properties
  const imageProps =
    componentType === "image"
      ? {
          alt: "Imagen descriptiva",
          objectFit: "cover" as const,
          height: 100,
        }
      : undefined;

  // Default list properties
  const listProps =
    componentType === "list"
      ? {
          type: "bullet" as const,
          items: ["Elemento 1", "Elemento 2", "Elemento 3"],
        }
      : undefined;

  // Default quote properties
  const quoteProps =
    componentType === "quote"
      ? {
          author: "",
          source: "",
          style: "default" as const,
        }
      : undefined;

  // Default code properties
  const codeProps =
    componentType === "code"
      ? {
          language: "javascript",
        }
      : undefined;

  // Default table properties
  const tableProps =
    componentType === "table"
      ? {
          rows: 2,
          columns: 2,
          headers: ["Encabezado 1", "Encabezado 2"],
          data: [
            ["Celda 1,1", "Celda 1,2"],
            ["Celda 2,1", "Celda 2,2"],
          ],
        }
      : undefined;

  // Default text properties
  const textProps = ["title", "subtitle", "text"].includes(componentType)
    ? {
        bold: false,
        italic: false,
        underline: false,
        color: undefined,
        alignment: "left" as const,
      }
    : undefined;

  // Default divider properties
  const dividerProps =
    componentType === "divider"
      ? {
          style: "solid" as const,
          thickness: 1,
          color: "#e5e5e5",
          width: 100,
          alignment: "center" as const,
        }
      : undefined;

  // Determine default width and height based on component type
  const defaultWidth = 12; // Full width by default
  let defaultHeight = 2; // Default height

  switch (componentType) {
    case "title":
    case "subtitle":
      defaultHeight = 2;
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
    case "video":
      defaultHeight = 4;
      break;
    case "list":
      defaultHeight = 3;
      break;
    case "quote":
      defaultHeight = 3;
      break;
    case "code":
      defaultHeight = 4;
      break;
    case "table":
      defaultHeight = 5;
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
    imageProps,
    listProps,
    quoteProps,
    codeProps,
    tableProps,
    textProps,
    dividerProps,
    x: 0,
    y: maxY,
    width: defaultWidth,
    height: defaultHeight,
  };

  // Add the block to our blocks array
  /*   blocks.value.push(newBlock);

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
  selectedBlockId.value = blockId; */
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

// Métodos para actualizar propiedades de texto
const toggleTextFormat = (format: "bold" | "italic" | "underline") => {
  if (!selectedBlock.value || !selectedBlockId.value) return;

  const blockIndex = blocks.value.findIndex(
    (b) => b.id === selectedBlockId.value
  );
  if (blockIndex === -1) return;

  const currentTextProps = blocks.value[blockIndex].textProps || {
    bold: false,
    italic: false,
    underline: false,
    alignment: "left" as TextAlignment,
  };

  blocks.value[blockIndex] = {
    ...blocks.value[blockIndex],
    textProps: {
      ...currentTextProps,
      [format]: !currentTextProps[format],
    },
  };

  renderBlock(blocks.value[blockIndex]);
};

const updateTextColor = (color: string) => {
  if (!selectedBlock.value || !selectedBlockId.value) return;

  const blockIndex = blocks.value.findIndex(
    (b) => b.id === selectedBlockId.value
  );
  if (blockIndex === -1) return;

  const currentTextProps = blocks.value[blockIndex].textProps || {
    bold: false,
    italic: false,
    underline: false,
    alignment: "left" as TextAlignment,
  };

  blocks.value[blockIndex] = {
    ...blocks.value[blockIndex],
    textProps: {
      ...currentTextProps,
      color: color,
    },
  };

  renderBlock(blocks.value[blockIndex]);
};

const updateTextAlignment = (alignment: TextAlignment) => {
  if (!selectedBlock.value || !selectedBlockId.value) return;

  const blockIndex = blocks.value.findIndex(
    (b) => b.id === selectedBlockId.value
  );
  if (blockIndex === -1) return;

  const currentTextProps = blocks.value[blockIndex].textProps || {
    bold: false,
    italic: false,
    underline: false,
  };

  blocks.value[blockIndex] = {
    ...blocks.value[blockIndex],
    textProps: {
      ...currentTextProps,
      alignment: alignment,
    },
  };

  renderBlock(blocks.value[blockIndex]);
};

// Métodos para actualizar propiedades de divisor
const updateDividerProps = (props: Partial<DividerProperties>) => {
  if (!selectedBlockId.value) return;

  const blockIndex = blocks.value.findIndex(
    (b) => b.id === selectedBlockId.value
  );
  if (blockIndex !== -1 && blocks.value[blockIndex].type === "divider") {
    blocks.value[blockIndex] = {
      ...blocks.value[blockIndex],
      dividerProps: {
        ...(blocks.value[blockIndex].dividerProps || {
          style: "solid",
          thickness: 1,
          color: "#e5e5e5",
          width: 100,
          alignment: "center",
        }),
        ...props,
      },
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

const updateVideoProps = (props: Partial<VideoProperties>) => {
  if (!selectedBlockId.value) return;

  const blockIndex = blocks.value.findIndex(
    (b) => b.id === selectedBlockId.value
  );
  if (blockIndex !== -1 && blocks.value[blockIndex].type === "video") {
    blocks.value[blockIndex] = {
      ...blocks.value[blockIndex],
      videoProps: {
        ...(blocks.value[blockIndex].videoProps || {
          provider: "youtube",
          videoId: "",
          title: "Video embebido",
          aspectRatio: "16:9",
          autoplay: false,
          controls: true,
        }),
        ...props,
      },
    };

    // Re-renderizar el bloque para actualizar la vista
    renderBlock(blocks.value[blockIndex]);
  }
};
const updateListProps = (props: Partial<ListProperties>) => {
  if (!selectedBlockId.value) return;

  const blockIndex = blocks.value.findIndex(
    (b) => b.id === selectedBlockId.value
  );
  if (blockIndex !== -1 && blocks.value[blockIndex].type === "list") {
    blocks.value[blockIndex] = {
      ...blocks.value[blockIndex],
      listProps: {
        ...(blocks.value[blockIndex].listProps || {
          type: "bullet",
          items: ["Elemento 1", "Elemento 2"],
        }),
        ...props,
      },
    };

    // Re-renderizar el bloque para actualizar la vista
    renderBlock(blocks.value[blockIndex]);
  }
};

const updateListItem = (index: number, content: string) => {
  if (!selectedBlockId.value) return;

  const blockIndex = blocks.value.findIndex(
    (b) => b.id === selectedBlockId.value
  );
  if (
    blockIndex !== -1 &&
    blocks.value[blockIndex].type === "list" &&
    blocks.value[blockIndex].listProps
  ) {
    const items = [...blocks.value[blockIndex].listProps!.items];
    items[index] = content;

    blocks.value[blockIndex] = {
      ...blocks.value[blockIndex],
      listProps: {
        ...blocks.value[blockIndex].listProps!,
        items,
      },
    };

    // Re-renderizar el bloque para actualizar la vista
    renderBlock(blocks.value[blockIndex]);
  }
};

const addListItem = () => {
  if (!selectedBlockId.value) return;

  const blockIndex = blocks.value.findIndex(
    (b) => b.id === selectedBlockId.value
  );
  if (
    blockIndex !== -1 &&
    blocks.value[blockIndex].type === "list" &&
    blocks.value[blockIndex].listProps
  ) {
    const items = [
      ...blocks.value[blockIndex].listProps!.items,
      "Nuevo elemento",
    ];

    blocks.value[blockIndex] = {
      ...blocks.value[blockIndex],
      listProps: {
        ...blocks.value[blockIndex].listProps!,
        items,
      },
    };

    // Re-renderizar el bloque para actualizar la vista
    renderBlock(blocks.value[blockIndex]);
  }
};

const removeListItem = (index: number) => {
  if (!selectedBlockId.value) return;

  const blockIndex = blocks.value.findIndex(
    (b) => b.id === selectedBlockId.value
  );
  if (
    blockIndex !== -1 &&
    blocks.value[blockIndex].type === "list" &&
    blocks.value[blockIndex].listProps
  ) {
    const items = [...blocks.value[blockIndex].listProps!.items];
    if (items.length > 1) {
      items.splice(index, 1);

      blocks.value[blockIndex] = {
        ...blocks.value[blockIndex],
        listProps: {
          ...blocks.value[blockIndex].listProps!,
          items,
        },
      };

      // Re-renderizar el bloque para actualizar la vista
      renderBlock(blocks.value[blockIndex]);
    }
  }
};

const updateQuoteProps = (props: Partial<QuoteProperties>) => {
  if (!selectedBlockId.value) return;

  const blockIndex = blocks.value.findIndex(
    (b) => b.id === selectedBlockId.value
  );
  if (blockIndex !== -1 && blocks.value[blockIndex].type === "quote") {
    blocks.value[blockIndex] = {
      ...blocks.value[blockIndex],
      quoteProps: {
        ...(blocks.value[blockIndex].quoteProps || {
          author: "",
          source: "",
          style: "default",
        }),
        ...props,
      },
    };

    // Re-renderizar el bloque para actualizar la vista
    renderBlock(blocks.value[blockIndex]);
  }
};

const updateCodeProps = (props: Partial<CodeProperties>) => {
  if (!selectedBlockId.value) return;

  const blockIndex = blocks.value.findIndex(
    (b) => b.id === selectedBlockId.value
  );
  if (blockIndex !== -1 && blocks.value[blockIndex].type === "code") {
    blocks.value[blockIndex] = {
      ...blocks.value[blockIndex],
      codeProps: {
        ...(blocks.value[blockIndex].codeProps || {
          language: "javascript",
        }),
        ...props,
      },
    };

    // Re-renderizar el bloque para actualizar la vista
    renderBlock(blocks.value[blockIndex]);
  }
};

const updateTableProps = (props: Partial<TableProperties>) => {
  if (!selectedBlockId.value) return;

  const blockIndex = blocks.value.findIndex(
    (b) => b.id === selectedBlockId.value
  );
  if (blockIndex !== -1 && blocks.value[blockIndex].type === "table") {
    const currentProps = blocks.value[blockIndex].tableProps || {
      rows: 2,
      columns: 2,
      headers: ["Encabezado 1", "Encabezado 2"],
      data: [
        ["Celda 1,1", "Celda 1,2"],
        ["Celda 2,1", "Celda 2,2"],
      ],
    };

    // Handle rows change
    if (props.rows !== undefined && props.rows !== currentProps.rows) {
      const newData = [...currentProps.data];
      if (props.rows > currentProps.rows) {
        // Add rows
        for (let i = currentProps.rows; i < props.rows; i++) {
          newData.push(Array(currentProps.columns).fill(""));
        }
      } else if (props.rows < currentProps.rows) {
        // Remove rows
        newData.length = props.rows;
      }
      currentProps.data = newData;
    }

    // Handle columns change
    if (props.columns !== undefined && props.columns !== currentProps.columns) {
      // Update headers
      const newHeaders = [...currentProps.headers];
      if (props.columns > currentProps.columns) {
        // Add headers
        for (let i = currentProps.columns; i < props.columns; i++) {
          newHeaders.push(`Encabezado ${i + 1}`);
        }
      } else if (props.columns < currentProps.columns) {
        // Remove headers
        newHeaders.length = props.columns;
      }
      currentProps.headers = newHeaders;

      // Update data
      const newData = currentProps.data.map((row) => {
        const newRow = [...row];
        if (props.columns! > row.length) {
          // Add cells
          for (let i = row.length; i < props.columns!; i++) {
            newRow.push("");
          }
        } else if (props.columns! < row.length) {
          // Remove cells
          newRow.length = props.columns!;
        }
        return newRow;
      });
      currentProps.data = newData;
    }

    blocks.value[blockIndex] = {
      ...blocks.value[blockIndex],
      tableProps: {
        ...currentProps,
        ...props,
      },
    };

    // Re-renderizar el bloque para actualizar la vista
    renderBlock(blocks.value[blockIndex]);
  }
};

const updateTableHeader = (index: number, content: string) => {
  if (!selectedBlockId.value) return;

  const blockIndex = blocks.value.findIndex(
    (b) => b.id === selectedBlockId.value
  );
  if (
    blockIndex !== -1 &&
    blocks.value[blockIndex].type === "table" &&
    blocks.value[blockIndex].tableProps
  ) {
    const headers = [...blocks.value[blockIndex].tableProps!.headers];
    headers[index] = content;

    blocks.value[blockIndex] = {
      ...blocks.value[blockIndex],
      tableProps: {
        ...blocks.value[blockIndex].tableProps!,
        headers,
      },
    };

    // Re-renderizar el bloque para actualizar la vista
    renderBlock(blocks.value[blockIndex]);
  }
};

const updateTableCell = (
  rowIndex: number,
  cellIndex: number,
  content: string
) => {
  if (!selectedBlockId.value) return;

  const blockIndex = blocks.value.findIndex(
    (b) => b.id === selectedBlockId.value
  );
  if (
    blockIndex !== -1 &&
    blocks.value[blockIndex].type === "table" &&
    blocks.value[blockIndex].tableProps
  ) {
    const data = [...blocks.value[blockIndex].tableProps!.data];
    data[rowIndex] = [...data[rowIndex]];
    data[rowIndex][cellIndex] = content;

    blocks.value[blockIndex] = {
      ...blocks.value[blockIndex],
      tableProps: {
        ...blocks.value[blockIndex].tableProps!,
        data,
      },
    };

    // Re-renderizar el bloque para actualizar la vista
    renderBlock(blocks.value[blockIndex]);
  }
};

const addTableRow = () => {
  if (!selectedBlockId.value) return;

  const blockIndex = blocks.value.findIndex(
    (b) => b.id === selectedBlockId.value
  );
  if (
    blockIndex !== -1 &&
    blocks.value[blockIndex].type === "table" &&
    blocks.value[blockIndex].tableProps
  ) {
    const tableProps = blocks.value[blockIndex].tableProps!;
    const newRow = Array(tableProps.columns).fill("");
    const newData = [...tableProps.data, newRow];

    blocks.value[blockIndex] = {
      ...blocks.value[blockIndex],
      tableProps: {
        ...tableProps,
        rows: tableProps.rows + 1,
        data: newData,
      },
    };

    // Re-renderizar el bloque para actualizar la vista
    renderBlock(blocks.value[blockIndex]);
  }
};

const addTableColumn = () => {
  if (!selectedBlockId.value) return;

  const blockIndex = blocks.value.findIndex(
    (b) => b.id === selectedBlockId.value
  );
  if (
    blockIndex !== -1 &&
    blocks.value[blockIndex].type === "table" &&
    blocks.value[blockIndex].tableProps
  ) {
    const tableProps = blocks.value[blockIndex].tableProps!;
    const newHeaders = [
      ...tableProps.headers,
      `Encabezado ${tableProps.columns + 1}`,
    ];
    const newData = tableProps.data.map((row) => [...row, ""]);

    blocks.value[blockIndex] = {
      ...blocks.value[blockIndex],
      tableProps: {
        ...tableProps,
        columns: tableProps.columns + 1,
        headers: newHeaders,
        data: newData,
      },
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

  // Reinicializar GridStack si eliminamos el último bloque
  if (blocks.value.length === 0) {
    nextTick(() => {
      if (gridStack.value) {
        gridStack.value.destroy();
        gridStack.value = null;
      }
      // El área vacía se mostrará automáticamente gracias al v-if en el template
    });
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

const clearAllBlocks = () => {
  if (confirm("¿Está seguro de que desea eliminar todos los bloques?")) {
    blocks.value = [];
    if (gridStack.value) {
      gridStack.value.removeAll();
    }
    selectedBlockId.value = null;
  }
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
// Observar cambios en los bloques para re-renderizar
watch(
  blocks,
  () => {
    if (blocks.value.length > 0) {
      if (gridStack.value) {
        renderBlocks();
      } else {
        nextTick(() => {
          initGridStack();
          renderBlocks();
        });
      }
    } else {
      // No hay bloques, asegurémonos de que el área vacía se muestre
      if (gridStack.value) {
        gridStack.value.removeAll();
      }
    }
  },
  { deep: true }
);

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
});
</script>
