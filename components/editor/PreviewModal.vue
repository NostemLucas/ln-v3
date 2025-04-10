<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div
      class="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-auto shadow-xl"
    >
      <div
        class="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-10"
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
          <button
            @click="$emit('close')"
            class="text-gray-500 hover:text-gray-700"
          >
            <Icon name="lucide:x" class="h-5 w-5" />
          </button>
        </div>
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
            <div
              ref="previewGridContainer"
              class="grid-stack preview-grid"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
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
  const content = renderBlockContent(block, true);

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
