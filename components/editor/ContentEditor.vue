<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Layout principal con panel lateral y área de contenido -->
    <div class="flex h-screen overflow-hidden">
      <!-- Panel lateral izquierdo con componentes -->
      <ComponentsSidebar
        :available-components="availableComponents"
        @add-component="addComponent"
        @export-content="exportContent"
        @show-preview="showPreview = true"
      />

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
            @update-columns-count="updateColumnsCount"
            @update-column-content="updateColumnContent"
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
import type {
  ComponentType,
  Template,
  FixedFields,
  ContentBlock,
  ComponentDefinition,
  TextAlignment,
  DividerStyle,
} from "@/types/content-builder";
import type {
  CodeProperties,
  DividerProperties,
  ImageProperties,
  ListProperties,
  QuoteProperties,
  TableProperties,
} from "~/types/content-builder";

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
  { type: "image", label: "Imagen" },
  { type: "columns", label: "Columnas" },
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

  content += '<div class="p-3 h-full">';

  // Aplicar propiedades de texto
  const textStyles = block.textProps
    ? `${block.textProps.bold ? "font-bold" : ""} 
     ${block.textProps.italic ? "italic" : ""} 
     ${block.textProps.underline ? "underline" : ""} 
     ${block.textProps.color ? `color: ${block.textProps.color};` : ""} 
     ${block.textProps.alignment ? `text-${block.textProps.alignment}` : ""}`
    : "";

  // Contenido según el tipo de bloque
  if (block.type === "title") {
    content += `<div class="block-content font-bold text-2xl md:text-3xl outline-none w-full min-h-[40px] ${textStyles}" contenteditable style="${
      block.textProps?.color ? `color: ${block.textProps.color};` : ""
    }">${block.content || "Ingrese título aquí"}</div>`;
  } else if (block.type === "subtitle") {
    content += `<div class="block-content font-medium text-xl md:text-2xl outline-none w-full min-h-[36px] ${textStyles}" contenteditable style="${
      block.textProps?.color ? `color: ${block.textProps.color};` : ""
    }">${block.content || "Ingrese subtítulo aquí"}</div>`;
  } else if (block.type === "text") {
    content += `<div class="block-content text-base outline-none w-full min-h-[100px] ${textStyles}" contenteditable style="${
      block.textProps?.color ? `color: ${block.textProps.color};` : ""
    }">${block.content || "Ingrese texto aquí"}</div>`;
  } else if (block.type === "divider") {
    const dividerProps = block.dividerProps || {
      style: "solid" as DividerStyle,
      thickness: 1,
      color: "#e5e5e5",
      width: 100,
      alignment: "center" as TextAlignment,
    };

    const dividerAlignment =
      dividerProps.alignment === "left"
        ? "mr-auto"
        : dividerProps.alignment === "right"
        ? "ml-auto"
        : "mx-auto";

    content += `
      <div class="flex ${
        dividerAlignment === "mx-auto"
          ? "justify-center"
          : dividerAlignment === "ml-auto"
          ? "justify-end"
          : "justify-start"
      }">
        <hr class="${dividerAlignment}" style="
          border: 0;
          border-top-style: ${dividerProps.style};
          border-top-width: ${dividerProps.thickness}px;
          border-top-color: ${dividerProps.color};
          width: ${dividerProps.width}%;
        " />
      </div>
    `;
  } else if (block.type === "image") {
    content += `
    <div class="w-full h-full relative">
      <img
        src="${block.content || "/placeholder.svg?height=300&width=600"}"
        alt="${block.imageProps?.alt || "Imagen descriptiva"}"
        class="w-full h-full rounded-md"
        style="object-fit: ${block.imageProps?.objectFit || "cover"}"
      />
      ${
        block.imageProps?.caption
          ? `<p class="text-sm text-gray-500 mt-2 text-center">${block.imageProps.caption}</p>`
          : ""
      }
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
  } else if (block.type === "list") {
    const listType = block.listProps?.type || "bullet";

    if (listType === "bullet") {
      content += '<ul class="list-disc pl-5 space-y-1">';
      (block.listProps?.items || ["Elemento 1", "Elemento 2"]).forEach(
        (item) => {
          content += `<li>${item}</li>`;
        }
      );
      content += "</ul>";
    } else if (listType === "numbered") {
      content += '<ol class="list-decimal pl-5 space-y-1">';
      (block.listProps?.items || ["Elemento 1", "Elemento 2"]).forEach(
        (item) => {
          content += `<li>${item}</li>`;
        }
      );
      content += "</ol>";
    } else if (listType === "check") {
      content += '<ul class="space-y-1">';
      (block.listProps?.items || ["Elemento 1", "Elemento 2"]).forEach(
        (item) => {
          content += `
          <li class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
            <span>${item}</span>
          </li>
        `;
        }
      );
      content += "</ul>";
    }
  } else if (block.type === "quote") {
    const quoteStyle = block.quoteProps?.style || "default";

    if (quoteStyle === "default") {
      content += `
        <blockquote class="border-l-4 border-gray-300 pl-4 italic text-gray-700">
          <p>${block.content || "Ingrese texto de la cita aquí"}</p>
          ${
            block.quoteProps?.author
              ? `<footer class="mt-2 text-sm">— ${block.quoteProps.author}${
                  block.quoteProps.source
                    ? `, <cite>${block.quoteProps.source}</cite>`
                    : ""
                }</footer>`
              : ""
          }
        </blockquote>
      `;
    } else if (quoteStyle === "blockquote") {
      content += `
        <blockquote class="bg-gray-50 p-4 rounded-md border-l-4 border-emerald-500">
          <p class="text-lg">${
            block.content || "Ingrese texto de la cita aquí"
          }</p>
          ${
            block.quoteProps?.author
              ? `<footer class="mt-2 text-sm font-medium">— ${
                  block.quoteProps.author
                }${
                  block.quoteProps.source
                    ? `, <cite>${block.quoteProps.source}</cite>`
                    : ""
                }</footer>`
              : ""
          }
        </blockquote>
      `;
    } else if (quoteStyle === "pullquote") {
      content += `
        <div class="relative">
          <div class="text-6xl text-emerald-200 absolute -top-4 left-0">"</div>
          <blockquote class="text-xl font-medium text-center px-8 py-4">
            <p>${block.content || "Ingrese texto de la cita aquí"}</p>
            ${
              block.quoteProps?.author
                ? `<footer class="mt-4 text-sm font-normal text-gray-500">— ${
                    block.quoteProps.author
                  }${
                    block.quoteProps.source
                      ? `, <cite>${block.quoteProps.source}</cite>`
                      : ""
                  }</footer>`
                : ""
            }
          </blockquote>
          <div class="text-6xl text-emerald-200 absolute -bottom-10 right-0">"</div>
        </div>
      `;
    }
  } else if (block.type === "code") {
    const language = block.codeProps?.language || "javascript";
    content += `
      <div class="bg-gray-50 rounded-md overflow-hidden">
        <div class="bg-gray-200 px-4 py-1 text-xs font-mono flex justify-between items-center">
          <span>${language}</span>
        </div>
        <pre class="p-4 overflow-x-auto font-mono text-sm whitespace-pre-wrap">${
          block.content || "// Ingrese código aquí"
        }</pre>
      </div>
    `;
  } else if (block.type === "table") {
    const rows = block.tableProps?.rows || 2;
    const columns = block.tableProps?.columns || 2;
    const headers =
      block.tableProps?.headers || Array(columns).fill("Encabezado");
    const data =
      block.tableProps?.data || Array(rows).fill(Array(columns).fill("Celda"));

    content += `
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr class="bg-gray-100">
              ${headers
                .map(
                  (header) =>
                    `<th class="border border-gray-300 px-4 py-2 text-left">${header}</th>`
                )
                .join("")}
            </tr>
          </thead>
          <tbody>
            ${data
              .map(
                (row) =>
                  `<tr>
                ${row
                  .map(
                    (cell: any) =>
                      `<td class="border border-gray-300 px-4 py-2">${cell}</td>`
                  )
                  .join("")}
              </tr>`
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;
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
    case "columns":
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
    columns: componentType === "columns" ? 2 : undefined,
    columnContent: componentType === "columns" ? ["", ""] : undefined,
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
  background-color: #f0fdf4;
  border: 1px dashed #10b981;
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

/* Fix for content shifting when resizing */
.grid-stack > .grid-stack-item {
  min-width: 0;
}

.grid-stack > .grid-stack-item > .grid-stack-item-content {
  inset: 0;
  overflow: hidden;
}
</style>
