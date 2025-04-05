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
              draggable="true"
              @dragstart="handleDragStart($event, component.type)"
            >
              <component
                :is="getIcon(component.type)"
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
            <Download class="h-4 w-4" />
            Exportar
          </button>

          <button
            @click="showPreview = true"
            class="w-full mt-2 py-2 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
          >
            <Eye class="h-4 w-4" />
            Vista Previa
          </button>

          <button
            @click="showExportModal = true"
            class="w-full mt-2 py-2 px-4 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <Code class="h-4 w-4" />
            Código Vue
          </button>
        </div>
      </div>

      <!-- Área principal de contenido -->
      <div class="flex-1 flex flex-col h-full overflow-hidden">
        <!-- Barra superior -->
        <div class="bg-white border-b border-gray-200 p-4">
          <h1 class="text-xl font-bold text-gray-800">
            Constructor de Contenido Avanzado
          </h1>
        </div>

        <!-- Área de trabajo con scroll -->
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
                  <LayoutTemplate class="h-10 w-10 text-gray-400" />
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

            <!-- Content Grid -->
            <div class="p-6" ref="contentGridRef">
              <div
                v-if="rows.length === 0"
                class="min-h-[300px] border-2 border-dashed border-gray-200 rounded-md flex items-center justify-center"
                @dragover.prevent
                @drop="handleDrop($event)"
              >
                <div class="text-center">
                  <LayoutTemplate
                    class="h-12 w-12 text-gray-300 mx-auto mb-2"
                  />
                  <p class="text-gray-400">
                    Arrastre y suelte componentes aquí para construir su
                    contenido
                  </p>
                </div>
              </div>
              <template v-else>
                <div v-for="row in rows" :key="row.id" class="mb-4">
                  <div
                    class="grid grid-cols-12 gap-4 min-h-[50px] relative"
                    @dragover.prevent
                    @drop="handleDrop($event, row.id)"
                  >
                    <!-- Indicador de fila -->
                    <div
                      class="absolute -left-6 top-1/2 transform -translate-y-1/2 flex flex-col items-center opacity-30 hover:opacity-100"
                    >
                      <button
                        @click="moveRowUp(row.id)"
                        class="p-1 text-gray-500 hover:text-gray-700"
                      >
                        <ChevronUp class="h-4 w-4" />
                      </button>
                      <div class="h-4 w-1 bg-gray-300 rounded-full"></div>
                      <button
                        @click="moveRowDown(row.id)"
                        class="p-1 text-gray-500 hover:text-gray-700"
                      >
                        <ChevronDown class="h-4 w-4" />
                      </button>
                    </div>

                    <template v-for="block in row.blocks" :key="block.id">
                      <!-- Bloque de contenido -->
                      <div
                        :class="[
                          getWidthClass(block.width),
                          selectedBlockId === block.id
                            ? 'ring-2 ring-emerald-500'
                            : '',
                          'relative group p-2',
                        ]"
                        @click="selectBlock(block.id)"
                      >
                        <!-- Controles del bloque -->
                        <div
                          class="absolute right-2 top-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white shadow-sm rounded-md p-1 z-10"
                        >
                          <div class="relative">
                            <button
                              @click.stop="showWidthMenu = block.id"
                              class="p-1 hover:bg-gray-100 rounded"
                            >
                              <LayoutGrid class="h-4 w-4" />
                            </button>
                            <div
                              v-if="showWidthMenu === block.id"
                              class="absolute right-0 mt-1 w-40 bg-white shadow-lg rounded-md p-1 z-20"
                            >
                              <button
                                @click.stop="changeBlockWidth(block.id, 'full')"
                                class="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded-md"
                              >
                                Ancho completo
                              </button>
                              <button
                                @click.stop="changeBlockWidth(block.id, 'half')"
                                class="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded-md"
                              >
                                Mitad (1/2)
                              </button>
                              <button
                                @click.stop="
                                  changeBlockWidth(block.id, 'third')
                                "
                                class="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded-md"
                              >
                                Un tercio (1/3)
                              </button>
                              <button
                                @click.stop="
                                  changeBlockWidth(block.id, 'quarter')
                                "
                                class="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded-md"
                              >
                                Un cuarto (1/4)
                              </button>
                              <button
                                @click.stop="
                                  changeBlockWidth(block.id, 'two-thirds')
                                "
                                class="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded-md"
                              >
                                Dos tercios (2/3)
                              </button>
                              <button
                                @click.stop="
                                  changeBlockWidth(block.id, 'three-quarters')
                                "
                                class="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded-md"
                              >
                                Tres cuartos (3/4)
                              </button>
                            </div>
                          </div>
                          <button
                            @click.stop="moveBlockUp(block.id)"
                            class="p-1 hover:bg-gray-100 rounded"
                          >
                            <ChevronUp class="h-4 w-4" />
                          </button>
                          <button
                            @click.stop="moveBlockDown(block.id)"
                            class="p-1 hover:bg-gray-100 rounded"
                          >
                            <ChevronDown class="h-4 w-4" />
                          </button>
                          <button
                            @click.stop="duplicateBlock(block.id)"
                            class="p-1 hover:bg-gray-100 rounded"
                          >
                            <Copy class="h-4 w-4" />
                          </button>
                          <button
                            @click.stop="removeBlock(block.id)"
                            class="p-1 hover:bg-gray-100 rounded text-red-500"
                          >
                            <Trash2 class="h-4 w-4" />
                          </button>
                        </div>

                        <!-- Título -->
                        <div
                          v-if="block.type === 'title'"
                          class="font-bold text-2xl md:text-3xl outline-none w-full min-h-[40px]"
                          contenteditable
                          @blur="
                            updateBlockContent(
                              block.id,
                              $event.target.textContent || ''
                            )
                          "
                        >
                          {{ block.content || "Ingrese título aquí" }}
                        </div>

                        <!-- Subtítulo -->
                        <div
                          v-else-if="block.type === 'subtitle'"
                          class="font-medium text-xl md:text-2xl outline-none w-full min-h-[36px]"
                          contenteditable
                          @blur="
                            updateBlockContent(
                              block.id,
                              $event.target.textContent || ''
                            )
                          "
                        >
                          {{ block.content || "Ingrese subtítulo aquí" }}
                        </div>

                        <!-- Texto -->
                        <div
                          v-else-if="block.type === 'text'"
                          class="text-base outline-none w-full min-h-[100px]"
                          contenteditable
                          @blur="
                            updateBlockContent(
                              block.id,
                              $event.target.textContent || ''
                            )
                          "
                        >
                          {{ block.content || "Ingrese texto aquí" }}
                        </div>

                        <!-- Divisor -->
                        <hr
                          v-else-if="block.type === 'divider'"
                          class="w-full border-t"
                        />

                        <!-- Imagen -->
                        <div v-else-if="block.type === 'image'" class="w-full">
                          <div
                            class="w-full relative"
                            :style="{
                              height: `${block.imageProps?.height || 100}%`,
                            }"
                          >
                            <img
                              :src="
                                block.content ||
                                '/placeholder.svg?height=300&width=600'
                              "
                              :alt="
                                block.imageProps?.alt || 'Imagen descriptiva'
                              "
                              class="w-full h-full rounded-md"
                              :style="{
                                objectFit:
                                  block.imageProps?.objectFit || 'cover',
                              }"
                            />
                          </div>

                          <div
                            v-if="selectedBlockId === block.id"
                            class="mt-4 space-y-4 bg-gray-50 p-4 rounded-md"
                          >
                            <div>
                              <label
                                class="block text-sm font-medium text-gray-700 mb-1"
                              >
                                URL de la imagen
                              </label>
                              <input
                                type="text"
                                :value="block.content || ''"
                                @input="
                                  updateBlockContent(
                                    block.id,
                                    $event.target.value
                                  )
                                "
                                placeholder="Ingrese URL de la imagen"
                                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                              />
                            </div>

                            <div>
                              <label
                                class="block text-sm font-medium text-gray-700 mb-1"
                              >
                                Texto alternativo
                              </label>
                              <input
                                type="text"
                                :value="block.imageProps?.alt || ''"
                                @input="
                                  updateImageProps(block.id, {
                                    alt: $event.target.value,
                                  })
                                "
                                placeholder="Descripción de la imagen"
                                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                              />
                            </div>

                            <div>
                              <label
                                class="block text-sm font-medium text-gray-700 mb-1"
                              >
                                Ajuste de imagen
                              </label>
                              <select
                                :value="block.imageProps?.objectFit || 'cover'"
                                @change="
                                  updateImageProps(block.id, {
                                    objectFit: $event.target.value,
                                  })
                                "
                                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                              >
                                <option value="cover">Cubrir (cover)</option>
                                <option value="contain">
                                  Contener (contain)
                                </option>
                                <option value="fill">Llenar (fill)</option>
                                <option value="none">Ninguno (none)</option>
                              </select>
                            </div>

                            <div>
                              <label
                                class="block text-sm font-medium text-gray-700 mb-1"
                              >
                                Altura ({{ block.imageProps?.height || 100 }}%)
                              </label>
                              <input
                                type="range"
                                :value="block.imageProps?.height || 100"
                                @input="
                                  updateImageProps(block.id, {
                                    height: parseInt($event.target.value),
                                  })
                                "
                                min="20"
                                max="200"
                                step="5"
                                class="w-full accent-emerald-500"
                              />
                            </div>
                          </div>
                        </div>

                        <!-- Columnas -->
                        <div
                          v-else-if="block.type === 'columns'"
                          class="w-full"
                        >
                          <div
                            class="w-full grid"
                            :style="{
                              gridTemplateColumns: `repeat(${
                                block.columns || 2
                              }, 1fr)`,
                              gap: '1rem',
                            }"
                          >
                            <div
                              v-for="(_, colIndex) in Array.from({
                                length: block.columns || 2,
                              })"
                              :key="colIndex"
                              class="border border-dashed border-gray-200 p-2 min-h-[100px]"
                            >
                              <div
                                contenteditable
                                class="outline-none h-full"
                                @blur="
                                  updateColumnContent(
                                    block.id,
                                    colIndex,
                                    $event.target.textContent || ''
                                  )
                                "
                              >
                                {{
                                  block.columnContent &&
                                  block.columnContent[colIndex]
                                    ? block.columnContent[colIndex]
                                    : `Contenido columna ${colIndex + 1}`
                                }}
                              </div>
                            </div>
                          </div>

                          <div
                            v-if="selectedBlockId === block.id"
                            class="mt-4 bg-gray-50 p-4 rounded-md"
                          >
                            <label
                              class="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Número de columnas
                            </label>
                            <select
                              :value="block.columns || 2"
                              @change="
                                updateColumnsCount(
                                  block.id,
                                  parseInt($event.target.value)
                                )
                              "
                              class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                            >
                              <option value="2">2 columnas</option>
                              <option value="3">3 columnas</option>
                              <option value="4">4 columnas</option>
                              <option value="6">6 columnas</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </template>

                    <div
                      v-if="row.blocks.length === 0"
                      class="col-span-12 border-2 border-dashed border-gray-200 rounded-md flex items-center justify-center p-4"
                    >
                      <p class="text-gray-400">Suelte componentes aquí</p>
                    </div>
                  </div>
                </div>

                <button
                  @click="createNewRow"
                  class="mt-4 w-full py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus class="h-4 w-4" />
                  Agregar Nueva Fila
                </button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Vista Previa -->
    <div
      v-if="showPreview"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div
        class="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-auto"
      >
        <!-- Template Header Preview -->
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

        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">Vista Previa</h2>
            <button
              @click="showPreview = false"
              class="text-gray-500 hover:text-gray-700"
            >
              <X class="h-5 w-5" />
            </button>
          </div>

          <div>
            <div v-for="row in rows" :key="row.id" class="mb-4">
              <div class="grid grid-cols-12 gap-4">
                <template v-for="block in row.blocks" :key="block.id">
                  <!-- Title Block Preview -->
                  <div :class="getWidthClass(block.width)" class="p-2">
                    <h2
                      v-if="block.type === 'title'"
                      class="font-bold text-2xl md:text-3xl"
                    >
                      {{ block.content || "Ingrese título aquí" }}
                    </h2>

                    <h3
                      v-else-if="block.type === 'subtitle'"
                      class="font-medium text-xl md:text-2xl"
                    >
                      {{ block.content || "Ingrese subtítulo aquí" }}
                    </h3>

                    <p v-else-if="block.type === 'text'" class="text-base">
                      {{ block.content || "Ingrese texto aquí" }}
                    </p>

                    <hr
                      v-else-if="block.type === 'divider'"
                      class="w-full border-t"
                    />

                    <div v-else-if="block.type === 'image'" class="w-full">
                      <div
                        class="w-full"
                        :style="{
                          height: `${block.imageProps?.height || 100}%`,
                        }"
                      >
                        <img
                          :src="
                            block.content ||
                            '/placeholder.svg?height=300&width=600'
                          "
                          :alt="block.imageProps?.alt || 'Imagen descriptiva'"
                          class="w-full h-full rounded-md"
                          :style="{
                            objectFit: block.imageProps?.objectFit || 'cover',
                          }"
                        />
                      </div>
                    </div>

                    <div v-else-if="block.type === 'columns'" class="w-full">
                      <div
                        class="w-full grid"
                        :style="{
                          gridTemplateColumns: `repeat(${
                            block.columns || 2
                          }, 1fr)`,
                          gap: '1rem',
                        }"
                      >
                        <div
                          v-for="(_, colIndex) in Array.from({
                            length: block.columns || 2,
                          })"
                          :key="colIndex"
                          class="p-2"
                        >
                          {{
                            block.columnContent && block.columnContent[colIndex]
                              ? block.columnContent[colIndex]
                              : `Contenido columna ${colIndex + 1}`
                          }}
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Exportación de Código -->
    <div
      v-if="showExportModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div
        class="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-auto"
      >
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">Código Vue</h2>
            <button
              @click="showExportModal = false"
              class="text-gray-500 hover:text-gray-700"
            >
              <X class="h-5 w-5" />
            </button>
          </div>

          <div class="mb-4">
            <p class="mb-2">
              Contenido autogenerado para renderizar este contenido como una
              página nueva en Vue 3:
            </p>
            <div
              class="bg-gray-800 text-white p-4 rounded-md overflow-auto max-h-[400px]"
            >
              <pre><code>{{ generatedVueCode }}</code></pre>
            </div>
          </div>

          <div class="flex justify-between">
            <button
              @click="copyVueCode"
              class="py-2 px-4 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors flex items-center gap-2"
            >
              <ClipboardCopy class="h-4 w-4" />
              {{ codeCopied ? "Copiado!" : "Copiar Código" }}
            </button>
            <button
              @click="downloadVueFile"
              class="py-2 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center gap-2"
            >
              <Download class="h-4 w-4" />
              Descargar .vue
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import {
  Type,
  Heading1,
  Heading2,
  AlignLeft,
  Image as ImageIcon,
  SeparatorHorizontal,
  Trash2,
  X,
  Columns,
  ChevronUp,
  ChevronDown,
  LayoutGrid,
  LayoutTemplate,
  Eye,
  Download,
  Code,
  Plus,
  Copy,
  ClipboardCopy,
} from "lucide-vue-next";

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
  objectFit: "cover" | "contain" | "fill" | "none";
  height: number; // percentage of container
}

interface ContentBlock {
  id: string;
  type: "title" | "subtitle" | "text" | "divider" | "image" | "columns";
  content?: string;
  width:
    | "full"
    | "half"
    | "third"
    | "quarter"
    | "two-thirds"
    | "three-quarters";
  columns?: number;
  columnContent?: string[];
  rowId: string;
  imageProps?: ImageProperties;
}

interface ContentRow {
  id: string;
  blocks: ContentBlock[];
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

const rows = ref<ContentRow[]>([]);
const showPreview = ref(false);
const showExportModal = ref(false);
const selectedBlockId = ref<string | null>(null);
const showWidthMenu = ref<string | null>(null);
const contentGridRef = ref<HTMLElement | null>(null);
const codeCopied = ref(false);

const availableComponents = [
  { type: "title", label: "Título" },
  { type: "subtitle", label: "Subtítulo" },
  { type: "text", label: "Texto" },
  { type: "divider", label: "Divisor" },
  { type: "image", label: "Imagen" },
  { type: "columns", label: "Columnas" },
];

// Close width menu when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  if (showWidthMenu.value) {
    showWidthMenu.value = null;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

// Reset copied state after 2 seconds
watch(codeCopied, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      codeCopied.value = false;
    }, 2000);
  }
});

// Helper functions
const getIcon = (type: string) => {
  switch (type) {
    case "title":
      return Heading1;
    case "subtitle":
      return Heading2;
    case "text":
      return AlignLeft;
    case "divider":
      return SeparatorHorizontal;
    case "image":
      return ImageIcon;
    case "columns":
      return Columns;
    default:
      return Type;
  }
};

const getWidthClass = (width: ContentBlock["width"]) => {
  const widthClasses = {
    full: "col-span-12",
    half: "col-span-6",
    third: "col-span-4",
    quarter: "col-span-3",
    "two-thirds": "col-span-8",
    "three-quarters": "col-span-9",
  };
  return widthClasses[width];
};

// Actions
const selectTemplate = (templateId: string) => {
  selectedTemplate.value = templateId;
};

const selectBlock = (blockId: string) => {
  selectedBlockId.value = blockId;
};

const handleDragStart = (event: DragEvent, componentType: string) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData("componentType", componentType);
  }
};

const handleDrop = (event: DragEvent, rowId?: string) => {
  event.preventDefault();
  if (!event.dataTransfer) return;

  const componentType = event.dataTransfer.getData(
    "componentType"
  ) as ContentBlock["type"];

  if (componentType) {
    // Default image properties
    const imageProps =
      componentType === "image"
        ? {
            alt: "Imagen descriptiva",
            objectFit: "cover" as const,
            height: 100,
          }
        : undefined;

    const newBlock: ContentBlock = {
      id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: componentType,
      content: "",
      width: "full",
      rowId:
        rowId || `row-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      columns: componentType === "columns" ? 2 : undefined,
      columnContent: componentType === "columns" ? ["", ""] : undefined,
      imageProps,
    };

    // If rowId is provided, add to existing row
    if (rowId) {
      rows.value = rows.value.map((row) =>
        row.id === rowId ? { ...row, blocks: [...row.blocks, newBlock] } : row
      );
    } else {
      // Create a new row with this block
      const newRow: ContentRow = {
        id: newBlock.rowId,
        blocks: [newBlock],
      };
      rows.value.push(newRow);
    }

    selectedBlockId.value = newBlock.id;
  }
};

const updateBlockContent = (blockId: string, content: string) => {
  rows.value = rows.value.map((row) => ({
    ...row,
    blocks: row.blocks.map((block) =>
      block.id === blockId ? { ...block, content } : block
    ),
  }));
};

const updateColumnContent = (
  blockId: string,
  columnIndex: number,
  content: string
) => {
  rows.value = rows.value.map((row) => ({
    ...row,
    blocks: row.blocks.map((block) => {
      if (block.id === blockId) {
        const columnContent = [...(block.columnContent || [])];
        columnContent[columnIndex] = content;
        return { ...block, columnContent };
      }
      return block;
    }),
  }));
};

const updateImageProps = (blockId: string, props: Partial<ImageProperties>) => {
  rows.value = rows.value.map((row) => ({
    ...row,
    blocks: row.blocks.map((block) => {
      if (block.id === blockId && block.type === "image") {
        return {
          ...block,
          imageProps: {
            ...(block.imageProps || {
              alt: "",
              objectFit: "cover",
              height: 100,
            }),
            ...props,
          },
        };
      }
      return block;
    }),
  }));
};

const updateColumnsCount = (blockId: string, columnsCount: number) => {
  rows.value = rows.value.map((row) => ({
    ...row,
    blocks: row.blocks.map((block) => {
      if (block.id === blockId) {
        // Preserve existing column content and add empty strings for new columns
        const existingContent = block.columnContent || [];
        const newColumnContent = [...existingContent];

        // Add empty content for new columns
        while (newColumnContent.length < columnsCount) {
          newColumnContent.push("");
        }

        // Trim if reducing columns
        if (newColumnContent.length > columnsCount) {
          newColumnContent.length = columnsCount;
        }

        return {
          ...block,
          columns: columnsCount,
          columnContent: newColumnContent,
        };
      }
      return block;
    }),
  }));
};

const removeBlock = (blockId: string) => {
  // First, find which row contains this block
  const updatedRows = rows.value.map((row) => ({
    ...row,
    blocks: row.blocks.filter((block) => block.id !== blockId),
  }));

  // Remove any empty rows
  rows.value = updatedRows.filter((row) => row.blocks.length > 0);

  if (selectedBlockId.value === blockId) {
    selectedBlockId.value = null;
  }
};

const duplicateBlock = (blockId: string) => {
  // Find the block to duplicate
  let blockToDuplicate: ContentBlock | null = null;
  let rowId: string | null = null;

  for (const row of rows.value) {
    const block = row.blocks.find((b) => b.id === blockId);
    if (block) {
      blockToDuplicate = block;
      rowId = row.id;
      break;
    }
  }

  if (blockToDuplicate && rowId) {
    // Create a new block with the same properties but a new ID
    const newBlock: ContentBlock = {
      ...JSON.parse(JSON.stringify(blockToDuplicate)),
      id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      rowId,
    };

    // Add the new block to the same row
    rows.value = rows.value.map((row) =>
      row.id === rowId ? { ...row, blocks: [...row.blocks, newBlock] } : row
    );

    selectedBlockId.value = newBlock.id;
  }
};

const changeBlockWidth = (blockId: string, width: ContentBlock["width"]) => {
  rows.value = rows.value.map((row) => ({
    ...row,
    blocks: row.blocks.map((block) =>
      block.id === blockId ? { ...block, width } : block
    ),
  }));

  showWidthMenu.value = null;
};

const moveBlockUp = (blockId: string) => {
  // Find the row and block index
  let rowIndex = -1;
  let blockIndex = -1;

  for (let i = 0; i < rows.value.length; i++) {
    const bIndex = rows.value[i].blocks.findIndex((b) => b.id === blockId);
    if (bIndex !== -1) {
      rowIndex = i;
      blockIndex = bIndex;
      break;
    }
  }

  if (rowIndex === -1 || blockIndex === -1) return;

  const currentRow = rows.value[rowIndex];

  // If it's the first block in the first row, can't move up
  if (rowIndex === 0 && blockIndex === 0) return;

  const newRows = [...rows.value];
  const blockToMove = currentRow.blocks[blockIndex];

  // Remove the block from its current position
  newRows[rowIndex] = {
    ...currentRow,
    blocks: currentRow.blocks.filter((_, i) => i !== blockIndex),
  };

  // If it's the first block in a row (but not the first row)
  if (blockIndex === 0 && rowIndex > 0) {
    // Add to the end of the previous row
    newRows[rowIndex - 1] = {
      ...newRows[rowIndex - 1],
      blocks: [...newRows[rowIndex - 1].blocks, blockToMove],
    };
  } else if (blockIndex > 0) {
    // Swap with the previous block in the same row
    const updatedBlocks = [...currentRow.blocks];
    updatedBlocks[blockIndex] = updatedBlocks[blockIndex - 1];
    updatedBlocks[blockIndex - 1] = blockToMove;
    newRows[rowIndex] = {
      ...currentRow,
      blocks: updatedBlocks,
    };
  }

  // Remove any empty rows
  rows.value = newRows.filter((row) => row.blocks.length > 0);
};

const moveBlockDown = (blockId: string) => {
  // Find the row and block index
  let rowIndex = -1;
  let blockIndex = -1;

  for (let i = 0; i < rows.value.length; i++) {
    const bIndex = rows.value[i].blocks.findIndex((b) => b.id === blockId);
    if (bIndex !== -1) {
      rowIndex = i;
      blockIndex = bIndex;
      break;
    }
  }

  if (rowIndex === -1 || blockIndex === -1) return;

  const currentRow = rows.value[rowIndex];

  // If it's the last block in the last row, can't move down
  if (
    rowIndex === rows.value.length - 1 &&
    blockIndex === currentRow.blocks.length - 1
  )
    return;

  const newRows = [...rows.value];
  const blockToMove = currentRow.blocks[blockIndex];

  // Remove the block from its current position
  newRows[rowIndex] = {
    ...currentRow,
    blocks: currentRow.blocks.filter((_, i) => i !== blockIndex),
  };

  // If it's the last block in a row (but not the last row)
  if (
    blockIndex === currentRow.blocks.length - 1 &&
    rowIndex < rows.value.length - 1
  ) {
    // Add to the beginning of the next row
    newRows[rowIndex + 1] = {
      ...newRows[rowIndex + 1],
      blocks: [blockToMove, ...newRows[rowIndex + 1].blocks],
    };
  } else if (blockIndex < currentRow.blocks.length - 1) {
    // Swap with the next block in the same row
    const updatedBlocks = [...currentRow.blocks];
    updatedBlocks[blockIndex] = updatedBlocks[blockIndex + 1];
    updatedBlocks[blockIndex + 1] = blockToMove;
    newRows[rowIndex] = {
      ...currentRow,
      blocks: updatedBlocks,
    };
  }

  // Remove any empty rows
  rows.value = newRows.filter((row) => row.blocks.length > 0);
};

const moveRowUp = (rowId: string) => {
  const rowIndex = rows.value.findIndex((row) => row.id === rowId);
  if (rowIndex <= 0) return; // Can't move up if it's the first row

  const newRows = [...rows.value];
  const temp = newRows[rowIndex];
  newRows[rowIndex] = newRows[rowIndex - 1];
  newRows[rowIndex - 1] = temp;

  rows.value = newRows;
};

const moveRowDown = (rowId: string) => {
  const rowIndex = rows.value.findIndex((row) => row.id === rowId);
  if (rowIndex === -1 || rowIndex >= rows.value.length - 1) return; // Can't move down if it's the last row

  const newRows = [...rows.value];
  const temp = newRows[rowIndex];
  newRows[rowIndex] = newRows[rowIndex + 1];
  newRows[rowIndex + 1] = temp;

  rows.value = newRows;
};

const createNewRow = () => {
  const newRow: ContentRow = {
    id: `row-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    blocks: [],
  };
  rows.value.push(newRow);
};

const exportContent = () => {
  const exportData = {
    template: selectedTemplate.value,
    fixedFields: fixedFields.value,
    rows: rows.value,
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

// Generar código Vue para renderizar el contenido
const generatedVueCode = computed(() => {
  let code = `<template>
  <div class="content-page">
    <!-- Template Header -->
`;

  // Añadir el encabezado de la plantilla si existe
  if (selectedTemplate.value && selectedTemplate.value !== "none") {
    if (selectedTemplate.value === "banner") {
      code += `    <div class="relative">
      <img
        src="${
          fixedFields.value.bannerImage ||
          "/placeholder.svg?height=400&width=1200"
        }"
        alt="Banner"
        class="w-full h-64 object-cover"
      />
      <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6">
        <h1 class="text-3xl font-bold text-white">
          ${fixedFields.value.title || "Título del artículo"}
        </h1>
        <p class="text-white/80">
          Por ${fixedFields.value.author || "Nombre del autor"}
        </p>
      </div>
    </div>\n`;
    } else if (selectedTemplate.value === "feature") {
      code += `    <div class="p-6">
      <h1 class="text-4xl font-bold mb-2">
        ${fixedFields.value.title || "Título del artículo"}
      </h1>
      <p class="text-gray-500 mb-4">
        Por ${fixedFields.value.author || "Nombre del autor"}
      </p>
      <img
        src="${
          fixedFields.value.bannerImage ||
          "/placeholder.svg?height=400&width=1200"
        }"
        alt="Banner"
        class="w-full h-64 object-cover rounded-md mb-6"
      />
    </div>\n`;
    } else if (selectedTemplate.value === "minimal") {
      code += `    <div class="p-6">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-3xl font-bold mb-2 text-center">
          ${fixedFields.value.title || "Título del artículo"}
        </h1>
        <p class="text-gray-500 mb-6 text-center">
          Por ${fixedFields.value.author || "Nombre del autor"}
        </p>
        <img
          src="${
            fixedFields.value.bannerImage ||
            "/placeholder.svg?height=400&width=1200"
          }"
          alt="Banner"
          class="w-full h-64 object-cover rounded-md mb-6"
        />
      </div>
    </div>\n`;
    }
  }

  // Añadir el contenido de las filas
  code += `
    <!-- Content -->
    <div class="container mx-auto px-4 py-8">
`;

  rows.value.forEach((row) => {
    code += `      <div class="grid grid-cols-12 gap-4 mb-8">
`;
    row.blocks.forEach((block) => {
      code += `        <div class="${getWidthClass(block.width)}">
`;

      if (block.type === "title") {
        code += `          <h2 class="font-bold text-2xl md:text-3xl">${
          block.content || "Título"
        }</h2>\n`;
      } else if (block.type === "subtitle") {
        code += `          <h3 class="font-medium text-xl md:text-2xl">${
          block.content || "Subtítulo"
        }</h3>\n`;
      } else if (block.type === "text") {
        code += `          <p class="text-base">${
          block.content || "Texto"
        }</p>\n`;
      } else if (block.type === "divider") {
        code += `          <hr class="w-full border-t my-4" />\n`;
      } else if (block.type === "image") {
        const imgProps = block.imageProps || {
          alt: "Imagen descriptiva",
          objectFit: "cover",
          height: 100,
        };
        code += `          <div class="w-full" style="height: ${
          imgProps.height
        }%">
            <img
              src="${block.content || "/placeholder.svg?height=300&width=600"}"
              alt="${imgProps.alt}"
              class="w-full h-full rounded-md"
              style="object-fit: ${imgProps.objectFit}"
            />
          </div>\n`;
      } else if (block.type === "columns") {
        code += `          <div class="grid" style="grid-template-columns: repeat(${
          block.columns || 2
        }, 1fr); gap: 1rem">
`;
        (block.columnContent || []).forEach((content, index) => {
          code += `            <div class="p-2">
              ${content || `Contenido columna ${index + 1}`}
            </div>\n`;
        });
        code += `          </div>\n`;
      }

      code += `        </div>\n`;
    });
    code += `      </div>\n`;
  });

  code += `    </div>
  </div>
</template>

<style>
/* Estilos adicionales específicos para esta página */
.content-page {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
</style>`;

  return code;
});

const copyVueCode = () => {
  navigator.clipboard.writeText(generatedVueCode.value);
  codeCopied.value = true;
};

const downloadVueFile = () => {
  const blob = new Blob([generatedVueCode.value], {
    type: "text/plain",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "ContentPage.vue";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
</script>

<style>
[contenteditable] {
  outline: none;
}

.accent-emerald-500::-webkit-slider-thumb {
  background-color: #10b981;
}

.accent-emerald-500::-moz-range-thumb {
  background-color: #10b981;
}
</style>
