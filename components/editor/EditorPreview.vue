<template>
  <div
    class="bg-white border-b border-gray-200 p-4 flex flex-col justify-between items-center"
  >
    <h2 class="text-xl font-bold flex items-center gap-2">
      <Icon name="lucide:eye" class="h-5 w-5 text-emerald-600" />
      Vista Previa
    </h2>
    <div class="flex items-center gap-2">
      <select
        v-model="previewMode"
        class="text-sm border rounded-md p-1.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
      >
        <option value="desktop">Escritorio</option>
        <option value="tablet">Tablet</option>
        <option value="mobile">Móvil</option>
      </select>
    </div>
    <!-- Contenedor para la vista previa -->
    <div class="p-6">
      <!-- Simulador de dispositivo -->
      <div class="flex justify-center">
        <div
          class="bg-white border shadow-md overflow-auto transition-all duration-300"
          :class="{
            'w-full': previewMode === 'desktop',
            'w-[768px]': previewMode === 'tablet',
            'w-[375px]': previewMode === 'mobile',
          }"
        >
          <!-- Banner de la plantilla -->
          <TemplateHeader
            v-if="selectedTemplate && selectedTemplate !== 'none'"
            :selected-template="selectedTemplate"
            :fixed-fields="fixedFields"
          />

          <!-- Contenedor para la vista previa de GridStack -->
          <div ref="previewGridContainer" class="grid-stack preview-grid" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GridStack } from "gridstack";
import TemplateHeader from "./TemplateHeader.vue";
import type { ContentBlock } from "~/types/content-builder";

const props = defineProps({
  blocks: {
    type: Array as () => ContentBlock[],
    required: true,
  },
  selectedTemplate: {
    type: String,
    default: null,
  },
  fixedFields: {
    type: Object,
    required: true,
  },
});

defineEmits(["close"]);

const previewMode = ref("desktop");
const previewGridContainer = ref<HTMLElement | null>(null);
const previewGridStack = ref<any>(null);

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

// Renderizar un bloque en la vista previa
const renderPreviewBlock = (block: ContentBlock) => {
  if (!previewGridStack.value) return;

  // Crear el contenido HTML del bloque para la vista previa (sin controles de edición)
  let content = '<div class="p-3 h-full">';

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
    content += `<div class="font-bold text-2xl md:text-3xl w-full ${textStyles}" style="${
      block.textProps?.color ? `color: ${block.textProps.color};` : ""
    }">${block.content || "Título"}</div>`;
  } else if (block.type === "subtitle") {
    content += `<div class="font-medium text-xl md:text-2xl w-full ${textStyles}" style="${
      block.textProps?.color ? `color: ${block.textProps.color};` : ""
    }">${block.content || "Subtítulo"}</div>`;
  } else if (block.type === "text") {
    content += `<div class="text-base w-full ${textStyles}" style="${
      block.textProps?.color ? `color: ${block.textProps.color};` : ""
    }">${block.content || "Texto"}</div>`;
  } else if (block.type === "divider") {
    const dividerProps = block.dividerProps || {
      style: "solid",
      thickness: 1,
      color: "#e5e5e5",
      width: 100,
      alignment: "center",
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
    <div class="w-full h-full">
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
  } else if (block.type === "list") {
    const listType = block.listProps?.type || "bullet";

    if (listType === "bullet") {
      content += '<ul class="list-disc pl-5 space-y-1">';
      (block.listProps?.items || ["Elemento 1", "Elemento 2"]).forEach(
        (item: string) => {
          content += `<li>${item}</li>`;
        }
      );
      content += "</ul>";
    } else if (listType === "numbered") {
      content += '<ol class="list-decimal pl-5 space-y-1">';
      (block.listProps?.items || ["Elemento 1", "Elemento 2"]).forEach(
        (item: string) => {
          content += `<li>${item}</li>`;
        }
      );
      content += "</ol>";
    } else if (listType === "check") {
      content += '<ul class="space-y-1">';
      (block.listProps?.items || ["Elemento 1", "Elemento 2"]).forEach(
        (item: string) => {
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
                  (header: string) =>
                    `<th class="border border-gray-300 px-4 py-2 text-left">${header}</th>`
                )
                .join("")}
            </tr>
          </thead>
          <tbody>
            ${data
              .map(
                (row: string[]) =>
                  `<tr>
                ${row
                  .map(
                    (cell: string) =>
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

  // Crear el elemento en la vista previa
  const newItem = document.createElement("div");
  newItem.setAttribute("gs-id", block.id);
  newItem.setAttribute("gs-x", block.x.toString());
  newItem.setAttribute("gs-y", block.y.toString());
  newItem.setAttribute("gs-w", block.width.toString());
  newItem.setAttribute("gs-h", block.height.toString());
  newItem.className = "grid-stack-item";
  newItem.innerHTML = `<div class="grid-stack-item-content border rounded-md bg-white shadow-sm">${content}</div>`;

  previewGridStack.value.makeWidget(newItem);
};

// Renderizar todos los bloques en la vista previa
const renderPreviewBlocks = () => {
  if (!previewGridStack.value) return;

  // Limpiar el grid de vista previa
  previewGridStack.value.removeAll();

  // Renderizar cada bloque en orden
  const sortedBlocks = [...props.blocks].sort((a, b) => a.y - b.y);
  sortedBlocks.forEach((block) => {
    renderPreviewBlock(block);
  });
};

onMounted(() => {
  initPreviewGridStack();
});

onUnmounted(() => {
  if (previewGridStack.value) {
    previewGridStack.value.destroy();
  }
});
</script>

<style scoped>
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

.preview-grid .grid-stack-item {
  cursor: default;
}
</style>
