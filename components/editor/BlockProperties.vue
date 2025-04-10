<template>
  <div class="w-80 bg-white border-l border-gray-200 overflow-y-auto shadow-sm">
    <div
      class="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50"
    >
      <h3 class="font-medium text-gray-800 flex items-center gap-2">
        <Icon name="lucide:settings-2" class="h-4 w-4 text-emerald-600" />
        Propiedades
      </h3>
      <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
        <Icon name="lucide:x" class="h-4 w-4" />
      </button>
    </div>

    <div class="p-4">
      <div v-if="selectedBlock">
        <!-- Acciones del bloque -->
        <div class="mb-4 flex space-x-2">
          <button
            @click="$emit('duplicate', selectedBlock.id)"
            class="flex-1 py-1.5 px-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center gap-1 text-sm"
          >
            <Icon name="lucide:copy" class="h-4 w-4" />
            Duplicar
          </button>
          <button
            @click="$emit('remove', selectedBlock.id)"
            class="flex-1 py-1.5 px-3 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors flex items-center justify-center gap-1 text-sm"
          >
            <Icon name="lucide:trash-2" class="h-4 w-4" />
            Eliminar
          </button>
        </div>

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
            class="w-full accent-emerald-600"
            @input="
              $emit(
                'update-block-width',
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
            class="w-full accent-emerald-600"
            @input="
              $emit(
                'update-block-height',
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

        <div v-if="['title', 'subtitle'].includes(selectedBlock.type)">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Contenido
            </label>
            <textarea
              :value="selectedBlock.content || ''"
              class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              :rows="selectedBlock.type === 'text' ? 5 : 2"
              @input="
                $emit(
                  'update-block-content',
                  ($event.target as HTMLTextAreaElement).value
                )
              "
            ></textarea>
          </div>

          <!-- Opciones de formato de texto -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Formato de texto
            </label>
            <div class="flex flex-wrap gap-2">
              <button
                @click="$emit('toggle-text-format', 'bold')"
                class="p-1.5 border rounded-md hover:bg-gray-100"
                :class="{
                  'bg-gray-100 ring-2 ring-emerald-500':
                    selectedBlock.textProps?.bold,
                }"
                title="Negrita"
              >
                <Icon name="lucide:bold" class="h-4 w-4" />
              </button>
              <button
                @click="$emit('toggle-text-format', 'italic')"
                class="p-1.5 border rounded-md hover:bg-gray-100"
                :class="{
                  'bg-gray-100 ring-2 ring-emerald-500':
                    selectedBlock.textProps?.italic,
                }"
                title="Cursiva"
              >
                <Icon name="lucide:italic" class="h-4 w-4" />
              </button>
              <button
                @click="$emit('toggle-text-format', 'underline')"
                class="p-1.5 border rounded-md hover:bg-gray-100"
                :class="{
                  'bg-gray-100 ring-2 ring-emerald-500':
                    selectedBlock.textProps?.underline,
                }"
                title="Subrayado"
              >
                <Icon name="lucide:underline" class="h-4 w-4" />
              </button>
              <div class="flex-1"></div>
              <button
                @click="showColorPicker = !showColorPicker"
                class="p-1.5 border rounded-md hover:bg-gray-100 relative"
                title="Color de texto"
              >
                <Icon name="lucide:palette" class="h-4 w-4" />
                <div
                  v-if="selectedBlock.textProps?.color"
                  class="absolute bottom-0 right-0 w-2 h-2 rounded-full"
                  :style="{
                    backgroundColor: selectedBlock.textProps.color,
                  }"
                ></div>
              </button>
            </div>

            <!-- Selector de color -->
            <div
              v-if="showColorPicker"
              class="mt-2 p-2 border rounded-md bg-white shadow-md"
            >
              <div class="grid grid-cols-8 gap-1">
                <button
                  v-for="color in textColors"
                  :key="color.value"
                  @click="$emit('update-text-color', color.value)"
                  class="w-6 h-6 rounded-full border"
                  :style="{ backgroundColor: color.value }"
                  :title="color.name"
                ></button>
              </div>
              <div class="mt-2 flex items-center gap-2">
                <input
                  type="text"
                  v-model="customColor"
                  class="flex-1 p-1 text-xs border rounded"
                  placeholder="#RRGGBB"
                />
                <button
                  @click="$emit('update-text-color', customColor)"
                  class="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200"
                >
                  Aplicar
                </button>
              </div>
            </div>
          </div>

          <!-- Alineación de texto -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Alineación
            </label>
            <div class="flex gap-1">
              <button
                @click="$emit('update-text-alignment', 'left')"
                class="flex-1 p-1.5 border rounded-md hover:bg-gray-100"
                :class="{
                  'bg-gray-100 ring-2 ring-emerald-500':
                    !selectedBlock.textProps?.alignment ||
                    selectedBlock.textProps?.alignment === 'left',
                }"
              >
                <Icon name="lucide:align-left" class="h-4 w-4 mx-auto" />
              </button>
              <button
                @click="$emit('update-text-alignment', 'center')"
                class="flex-1 p-1.5 border rounded-md hover:bg-gray-100"
                :class="{
                  'bg-gray-100 ring-2 ring-emerald-500':
                    selectedBlock.textProps?.alignment === 'center',
                }"
              >
                <Icon name="lucide:align-center" class="h-4 w-4 mx-auto" />
              </button>
              <button
                @click="$emit('update-text-alignment', 'right')"
                class="flex-1 p-1.5 border rounded-md hover:bg-gray-100"
                :class="{
                  'bg-gray-100 ring-2 ring-emerald-500':
                    selectedBlock.textProps?.alignment === 'right',
                }"
              >
                <Icon name="lucide:align-right" class="h-4 w-4 mx-auto" />
              </button>
              <button
                @click="$emit('update-text-alignment', 'justify')"
                class="flex-1 p-1.5 border rounded-md hover:bg-gray-100"
                :class="{
                  'bg-gray-100 ring-2 ring-emerald-500':
                    selectedBlock.textProps?.alignment === 'justify',
                }"
              >
                <Icon name="lucide:align-justify" class="h-4 w-4 mx-auto" />
              </button>
            </div>
          </div>
        </div>

        <!-- Propiedades específicas por tipo de bloque -->
        <div v-else-if="['text'].includes(selectedBlock.type)">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Contenido
            </label>
            <textarea
              :value="selectedBlock.content || ''"
              class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              :rows="selectedBlock.type === 'text' ? 5 : 2"
              @input="
                $emit(
                  'update-block-content',
                  ($event.target as HTMLTextAreaElement).value
                )
              "
            ></textarea>
          </div>

          <!-- Opciones de formato de texto -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Formato de texto
            </label>
            <div class="flex flex-wrap gap-2">
              <button
                @click="$emit('toggle-text-format', 'bold')"
                class="p-1.5 border rounded-md hover:bg-gray-100"
                :class="{
                  'bg-gray-100 ring-2 ring-emerald-500':
                    selectedBlock.textProps?.bold,
                }"
                title="Negrita"
              >
                <Icon name="lucide:bold" class="h-4 w-4" />
              </button>
              <button
                @click="$emit('toggle-text-format', 'italic')"
                class="p-1.5 border rounded-md hover:bg-gray-100"
                :class="{
                  'bg-gray-100 ring-2 ring-emerald-500':
                    selectedBlock.textProps?.italic,
                }"
                title="Cursiva"
              >
                <Icon name="lucide:italic" class="h-4 w-4" />
              </button>
              <button
                @click="$emit('toggle-text-format', 'underline')"
                class="p-1.5 border rounded-md hover:bg-gray-100"
                :class="{
                  'bg-gray-100 ring-2 ring-emerald-500':
                    selectedBlock.textProps?.underline,
                }"
                title="Subrayado"
              >
                <Icon name="lucide:underline" class="h-4 w-4" />
              </button>
              <div class="flex-1"></div>
              <button
                @click="showColorPicker = !showColorPicker"
                class="p-1.5 border rounded-md hover:bg-gray-100 relative"
                title="Color de texto"
              >
                <Icon name="lucide:palette" class="h-4 w-4" />
                <div
                  v-if="selectedBlock.textProps?.color"
                  class="absolute bottom-0 right-0 w-2 h-2 rounded-full"
                  :style="{
                    backgroundColor: selectedBlock.textProps.color,
                  }"
                ></div>
              </button>
            </div>

            <!-- Selector de color -->
            <div
              v-if="showColorPicker"
              class="mt-2 p-2 border rounded-md bg-white shadow-md"
            >
              <div class="grid grid-cols-8 gap-1">
                <button
                  v-for="color in textColors"
                  :key="color.value"
                  @click="$emit('update-text-color', color.value)"
                  class="w-6 h-6 rounded-full border"
                  :style="{ backgroundColor: color.value }"
                  :title="color.name"
                ></button>
              </div>
              <div class="mt-2 flex items-center gap-2">
                <input
                  type="text"
                  v-model="customColor"
                  class="flex-1 p-1 text-xs border rounded"
                  placeholder="#RRGGBB"
                />
                <button
                  @click="$emit('update-text-color', customColor)"
                  class="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200"
                >
                  Aplicar
                </button>
              </div>
            </div>
          </div>

          <!-- Alineación de texto -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Alineación
            </label>
            <div class="flex gap-1">
              <button
                @click="$emit('update-text-alignment', 'left')"
                class="flex-1 p-1.5 border rounded-md hover:bg-gray-100"
                :class="{
                  'bg-gray-100 ring-2 ring-emerald-500':
                    !selectedBlock.textProps?.alignment ||
                    selectedBlock.textProps?.alignment === 'left',
                }"
              >
                <Icon name="lucide:align-left" class="h-4 w-4 mx-auto" />
              </button>
              <button
                @click="$emit('update-text-alignment', 'center')"
                class="flex-1 p-1.5 border rounded-md hover:bg-gray-100"
                :class="{
                  'bg-gray-100 ring-2 ring-emerald-500':
                    selectedBlock.textProps?.alignment === 'center',
                }"
              >
                <Icon name="lucide:align-center" class="h-4 w-4 mx-auto" />
              </button>
              <button
                @click="$emit('update-text-alignment', 'right')"
                class="flex-1 p-1.5 border rounded-md hover:bg-gray-100"
                :class="{
                  'bg-gray-100 ring-2 ring-emerald-500':
                    selectedBlock.textProps?.alignment === 'right',
                }"
              >
                <Icon name="lucide:align-right" class="h-4 w-4 mx-auto" />
              </button>
              <button
                @click="$emit('update-text-alignment', 'justify')"
                class="flex-1 p-1.5 border rounded-md hover:bg-gray-100"
                :class="{
                  'bg-gray-100 ring-2 ring-emerald-500':
                    selectedBlock.textProps?.alignment === 'justify',
                }"
              >
                <Icon name="lucide:align-justify" class="h-4 w-4 mx-auto" />
              </button>
            </div>
          </div>
        </div>

        <!-- Propiedades de divisor -->
        <div v-if="selectedBlock.type === 'divider'">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Estilo del divisor
            </label>
            <select
              :value="selectedBlock.dividerProps?.style || 'solid'"
              class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              @change="
                $emit('update-divider-props', {
                  style: ($event.target as HTMLSelectElement).value,
                })
              "
            >
              <option value="solid">Sólido</option>
              <option value="dashed">Discontinuo</option>
              <option value="dotted">Punteado</option>
              <option value="double">Doble</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Grosor (px)
            </label>
            <input
              type="range"
              min="1"
              max="10"
              :value="selectedBlock.dividerProps?.thickness || 1"
              class="w-full accent-emerald-600"
              @input="
                $emit('update-divider-props', {
                  thickness: parseInt(
                    ($event.target as HTMLInputElement).value
                  ),
                })
              "
            />
            <div class="flex justify-between text-xs text-gray-500 mt-1">
              <span>1px</span>
              <span>5px</span>
              <span>10px</span>
            </div>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Color
            </label>
            <div class="grid grid-cols-8 gap-1">
              <button
                v-for="color in dividerColors"
                :key="color.value"
                @click="$emit('update-divider-props', { color: color.value })"
                class="w-6 h-6 rounded-full border"
                :style="{ backgroundColor: color.value }"
                :title="color.name"
              ></button>
            </div>
            <div class="mt-2 flex items-center gap-2">
              <input
                type="text"
                v-model="customDividerColor"
                class="flex-1 p-1 text-xs border rounded"
                placeholder="#RRGGBB"
              />
              <button
                @click="
                  $emit('update-divider-props', { color: customDividerColor })
                "
                class="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200"
              >
                Aplicar
              </button>
            </div>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Ancho (%)
            </label>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              :value="selectedBlock.dividerProps?.width || 100"
              class="w-full accent-emerald-600"
              @input="
                $emit('update-divider-props', {
                  width: parseInt(($event.target as HTMLInputElement).value),
                })
              "
            />
            <div class="flex justify-between text-xs text-gray-500 mt-1">
              <span>10%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Alineación
            </label>
            <div class="flex gap-1">
              <button
                @click="$emit('update-divider-props', { alignment: 'left' })"
                class="flex-1 p-1.5 border rounded-md hover:bg-gray-100"
                :class="{
                  'bg-gray-100 ring-2 ring-emerald-500':
                    !selectedBlock.dividerProps?.alignment ||
                    selectedBlock.dividerProps?.alignment === 'left',
                }"
              >
                <Icon name="lucide:align-left" class="h-4 w-4 mx-auto" />
              </button>
              <button
                @click="$emit('update-divider-props', { alignment: 'center' })"
                class="flex-1 p-1.5 border rounded-md hover:bg-gray-100"
                :class="{
                  'bg-gray-100 ring-2 ring-emerald-500':
                    selectedBlock.dividerProps?.alignment === 'center',
                }"
              >
                <Icon name="lucide:align-center" class="h-4 w-4 mx-auto" />
              </button>
              <button
                @click="$emit('update-divider-props', { alignment: 'right' })"
                class="flex-1 p-1.5 border rounded-md hover:bg-gray-100"
                :class="{
                  'bg-gray-100 ring-2 ring-emerald-500':
                    selectedBlock.dividerProps?.alignment === 'right',
                }"
              >
                <Icon name="lucide:align-right" class="h-4 w-4 mx-auto" />
              </button>
            </div>
          </div>
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
                $emit(
                  'update-block-content',
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
                $emit('update-image-props', {
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
                $emit('update-image-props', {
                  objectFit: ($event.target as HTMLSelectElement).value,
                })
              "
            >
              <option value="cover">Cubrir (cover)</option>
              <option value="contain">Contener (contain)</option>
              <option value="fill">Llenar (fill)</option>
              <option value="none">Ninguno (none)</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Leyenda de la imagen
            </label>
            <input
              type="text"
              :value="selectedBlock.imageProps?.caption || ''"
              class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              placeholder="Leyenda debajo de la imagen"
              @input="
                $emit('update-image-props', {
                  caption: ($event.target as HTMLInputElement).value,
                })
              "
            />
          </div>
        </div>
        <div v-if="selectedBlock.type === 'video'">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Proveedor de video
            </label>
            <select
              :value="selectedBlock.videoProps?.provider || 'youtube'"
              class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              @change="
                $emit('update-video-props', {
                  provider: ($event.target as HTMLSelectElement).value as
                    | 'youtube'
                    | 'vimeo'
                    | 'dailymotion',
                })
              "
            >
              <option value="youtube">YouTube</option>
              <option value="vimeo">Vimeo</option>
              <option value="dailymotion">Dailymotion</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              ID del video
            </label>
            <input
              type="text"
              :value="selectedBlock.videoProps?.videoId || ''"
              class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              placeholder="Ej: dQw4w9WgXcQ (YouTube)"
              @input="
                $emit('update-video-props', {
                  videoId: ($event.target as HTMLInputElement).value,
                })
              "
            />
            <p class="text-xs text-gray-500 mt-1">
              <template v-if="selectedBlock.videoProps?.provider === 'youtube'">
                ID de YouTube (ej: dQw4w9WgXcQ de
                https://www.youtube.com/watch?v=dQw4w9WgXcQ)
              </template>
              <template
                v-else-if="selectedBlock.videoProps?.provider === 'vimeo'"
              >
                ID de Vimeo (ej: 123456789 de https://vimeo.com/123456789)
              </template>
              <template v-else>
                ID de Dailymotion (ej: x1234abc de
                https://www.dailymotion.com/video/x1234abc)
              </template>
            </p>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Título del video
            </label>
            <input
              type="text"
              :value="selectedBlock.videoProps?.title || ''"
              class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              placeholder="Título descriptivo del video"
              @input="
                $emit('update-video-props', {
                  title: ($event.target as HTMLInputElement).value,
                })
              "
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Relación de aspecto
            </label>
            <select
              :value="selectedBlock.videoProps?.aspectRatio || '16:9'"
              class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              @change="
                $emit('update-video-props', {
                  aspectRatio: ($event.target as HTMLSelectElement).value as
                    | '16:9'
                    | '4:3'
                    | '1:1',
                })
              "
            >
              <option value="16:9">16:9 (Panorámico)</option>
              <option value="4:3">4:3 (Estándar)</option>
              <option value="1:1">1:1 (Cuadrado)</option>
            </select>
          </div>

          <div class="mb-4 flex items-center">
            <input
              type="checkbox"
              :checked="selectedBlock.videoProps?.autoplay || false"
              class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              @change="
                $emit('update-video-props', {
                  autoplay: ($event.target as HTMLInputElement).checked,
                })
              "
              id="autoplay-checkbox"
            />
            <label
              for="autoplay-checkbox"
              class="ml-2 block text-sm text-gray-700"
            >
              Reproducción automática
            </label>
          </div>

          <div class="mb-4 flex items-center">
            <input
              type="checkbox"
              :checked="selectedBlock.videoProps?.controls || true"
              class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              @change="
                $emit('update-video-props', {
                  controls: ($event.target as HTMLInputElement).checked,
                })
              "
              id="controls-checkbox"
            />
            <label
              for="controls-checkbox"
              class="ml-2 block text-sm text-gray-700"
            >
              Mostrar controles
            </label>
          </div>
        </div>
        <!-- Propiedades de lista -->
        <div v-if="selectedBlock.type === 'list'">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Tipo de lista
            </label>
            <select
              :value="selectedBlock.listProps?.type || 'bullet'"
              class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              @change="
                $emit('update-list-props', {
                  type: ($event.target as HTMLSelectElement).value,
                })
              "
            >
              <option value="bullet">Viñetas</option>
              <option value="numbered">Numerada</option>
              <option value="check">Casillas de verificación</option>
            </select>
          </div>

          <div class="mb-4">
            <label
              class="text-sm font-medium text-gray-700 mb-1 flex justify-between"
            >
              <span>Elementos de la lista</span>
              <button
                @click="$emit('add-list-item')"
                class="text-xs text-emerald-600 hover:text-emerald-700"
              >
                + Añadir elemento
              </button>
            </label>
            <div
              v-for="(item, index) in selectedBlock.listProps?.items || []"
              :key="index"
              class="flex items-center gap-2 mb-2"
            >
              <input
                type="text"
                :value="item"
                class="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                placeholder="Elemento de lista"
                @input="
                  $emit(
                    'update-list-item',
                    index,
                    ($event.target as HTMLInputElement).value
                  )
                "
              />
              <button
                @click="$emit('remove-list-item', index)"
                class="text-red-500 hover:text-red-700"
              >
                <Icon name="lucide:x" class="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- Propiedades de cita -->
        <div v-if="selectedBlock.type === 'quote'">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Texto de la cita
            </label>
            <textarea
              :value="selectedBlock.content || ''"
              class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              rows="4"
              @input="
                $emit(
                  'update-block-content',
                  ($event.target as HTMLTextAreaElement).value
                )
              "
            ></textarea>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Autor de la cita
            </label>
            <input
              type="text"
              :value="selectedBlock.quoteProps?.author || ''"
              class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              placeholder="Nombre del autor"
              @input="
                $emit('update-quote-props', {
                  author: ($event.target as HTMLInputElement).value,
                })
              "
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Fuente
            </label>
            <input
              type="text"
              :value="selectedBlock.quoteProps?.source || ''"
              class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              placeholder="Origen o publicación"
              @input="
                $emit('update-quote-props', {
                  source: ($event.target as HTMLInputElement).value,
                })
              "
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Estilo de cita
            </label>
            <select
              :value="selectedBlock.quoteProps?.style || 'default'"
              class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              @change="
                $emit('update-quote-props', {
                  style: ($event.target as HTMLSelectElement).value,
                })
              "
            >
              <option value="default">Estándar</option>
              <option value="blockquote">Bloque</option>
              <option value="pullquote">Destacada</option>
            </select>
          </div>
        </div>

        <!-- Propiedades de código -->
        <div v-if="selectedBlock.type === 'code'">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Código
            </label>
            <textarea
              :value="selectedBlock.content || ''"
              class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none font-mono text-sm"
              rows="6"
              @input="
                $emit(
                  'update-block-content',
                  ($event.target as HTMLTextAreaElement).value
                )
              "
            ></textarea>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Lenguaje
            </label>
            <select
              :value="selectedBlock.codeProps?.language || 'javascript'"
              class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              @change="
                $emit('update-code-props', {
                  language: ($event.target as HTMLSelectElement).value,
                })
              "
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="csharp">C#</option>
              <option value="php">PHP</option>
              <option value="ruby">Ruby</option>
              <option value="go">Go</option>
              <option value="rust">Rust</option>
              <option value="sql">SQL</option>
              <option value="bash">Bash</option>
              <option value="markdown">Markdown</option>
              <option value="json">JSON</option>
              <option value="xml">XML</option>
            </select>
          </div>
        </div>

        <!-- Propiedades de tabla -->
        <div v-if="selectedBlock.type === 'table'">
          <div class="mb-4">
            <label
              class="text-sm font-medium text-gray-700 mb-1 flex justify-between"
            >
              <span>Filas</span>
              <button
                @click="$emit('add-table-row')"
                class="text-xs text-emerald-600 hover:text-emerald-700"
              >
                + Añadir fila
              </button>
            </label>
            <input
              type="number"
              :value="selectedBlock.tableProps?.rows || 2"
              min="1"
              max="10"
              class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              @input="
                $emit('update-table-props', {
                  rows: parseInt(($event.target as HTMLInputElement).value),
                })
              "
            />
          </div>

          <div class="mb-4">
            <label
              class="text-sm font-medium text-gray-700 mb-1 flex justify-between"
            >
              <span>Columnas</span>
              <button
                @click="$emit('add-table-column')"
                class="text-xs text-emerald-600 hover:text-emerald-700"
              >
                + Añadir columna
              </button>
            </label>
            <input
              type="number"
              :value="selectedBlock.tableProps?.columns || 2"
              min="1"
              max="6"
              class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              @input="
                $emit('update-table-props', {
                  columns: parseInt(($event.target as HTMLInputElement).value),
                })
              "
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Encabezados
            </label>
            <div
              v-for="(header, index) in selectedBlock.tableProps?.headers || []"
              :key="`header-${index}`"
              class="flex items-center gap-2 mb-2"
            >
              <input
                type="text"
                :value="header"
                class="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                placeholder="Encabezado"
                @input="
                  $emit(
                    'update-table-header',
                    index,
                    ($event.target as HTMLInputElement).value
                  )
                "
              />
            </div>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Datos de la tabla
            </label>
            <div
              v-for="(row, rowIndex) in selectedBlock.tableProps?.data || []"
              :key="`row-${rowIndex}`"
              class="mb-2"
            >
              <div class="text-xs text-gray-500 mb-1">
                Fila {{ rowIndex + 1 }}
              </div>
              <div
                v-for="(cell, cellIndex) in row"
                :key="`cell-${rowIndex}-${cellIndex}`"
                class="flex items-center gap-2 mb-1"
              >
                <input
                  type="text"
                  :value="cell"
                  class="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  :placeholder="`Celda ${rowIndex + 1},${cellIndex + 1}`"
                  @input="
                    $emit(
                      'update-table-cell',
                      rowIndex,
                      cellIndex,
                      ($event.target as HTMLInputElement).value
                    )
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";
import type { ContentBlock } from "~/types/content-builder";

defineProps<{
  selectedBlock: ContentBlock | null;
}>();

defineEmits([
  "close",
  "duplicate",
  "remove",
  "update-block-width",
  "update-block-height",
  "update-block-content",
  "toggle-text-format",
  "update-text-color",
  "update-text-alignment",
  "update-divider-props",
  "update-image-props",
  "update-video-props",
  "update-columns-count",
  "update-column-content",
  "update-list-props",
  "update-list-item",
  "add-list-item",
  "remove-list-item",
  "update-quote-props",
  "update-code-props",
  "update-table-props",
  "update-table-header",
  "update-table-cell",
  "add-table-row",
  "add-table-column",
]);

const showColorPicker = ref(false);
const customColor = ref("");
const customDividerColor = ref("");

// Colores predefinidos para texto
const textColors = [
  { name: "Negro", value: "#000000" },
  { name: "Gris oscuro", value: "#333333" },
  { name: "Gris", value: "#666666" },
  { name: "Gris claro", value: "#999999" },
  { name: "Rojo", value: "#e53e3e" },
  { name: "Naranja", value: "#ed8936" },
  { name: "Amarillo", value: "#ecc94b" },
  { name: "Verde", value: "#38a169" },
  { name: "Verde azulado", value: "#38b2ac" },
  { name: "Azul", value: "#3182ce" },
  { name: "Índigo", value: "#5a67d8" },
  { name: "Púrpura", value: "#805ad5" },
  { name: "Rosa", value: "#d53f8c" },
  { name: "Esmeralda", value: "#10b981" },
  { name: "Blanco", value: "#ffffff" },
  { name: "Transparente", value: "transparent" },
];

// Colores predefinidos para divisores
const dividerColors = [
  { name: "Negro", value: "#000000" },
  { name: "Gris oscuro", value: "#333333" },
  { name: "Gris", value: "#666666" },
  { name: "Gris claro", value: "#999999" },
  { name: "Gris más claro", value: "#e5e5e5" },
  { name: "Rojo", value: "#e53e3e" },
  { name: "Naranja", value: "#ed8936" },
  { name: "Amarillo", value: "#ecc94b" },
  { name: "Verde", value: "#38a169" },
  { name: "Verde azulado", value: "#38b2ac" },
  { name: "Azul", value: "#3182ce" },
  { name: "Índigo", value: "#5a67d8" },
  { name: "Púrpura", value: "#805ad5" },
  { name: "Rosa", value: "#d53f8c" },
  { name: "Esmeralda", value: "#10b981" },
];
</script>
