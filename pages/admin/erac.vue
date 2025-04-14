<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Layout principal con panel lateral y área de contenido -->
    <div class="flex h-screen overflow-hidden">
      <!-- Panel lateral izquierdo con componentes -->
      <div
        class="w-72 bg-white border-r border-gray-200 flex flex-col h-full shadow-sm"
      >
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

        <!-- Componentes arrastrables -->
        <div class="p-4 overflow-y-auto flex-grow">
          <h3
            class="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1"
          >
            <Icon name="lucide:components" class="h-4 w-4" />
            Componentes
          </h3>
          <div class="space-y-2">
            <div
              v-for="component in availableComponents"
              :key="component.type"
              class="bg-white p-3 rounded-md cursor-move hover:bg-gray-50 transition-colors flex items-center gap-2 border border-gray-200 shadow-sm"
              @click="addComponent(component.type as ComponentType)"
            >
              <Icon
                :name="getIcon(component.type)"
                class="h-5 w-5 text-gray-500"
              />
              <span class="text-sm font-medium">{{ component.label }}</span>
            </div>
          </div>
        </div>

        <!-- Botones de acción -->
        <div class="p-4 border-t border-gray-200 bg-gray-50 space-y-2">
          <button
            @click="exportContent"
            class="w-full py-2 px-4 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <Icon name="lucide:download" class="h-4 w-4" />
            Exportar JSON
          </button>

          <button
            @click="showPreview = true"
            class="w-full py-2 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <Icon name="lucide:eye" class="h-4 w-4" />
            Vista Previa
          </button>
        </div>
      </div>

      <!-- Área principal de contenido -->
      <div class="flex-1 flex flex-col h-full overflow-hidden">
        <!-- Barra superior -->
        <div
          class="bg-white border-b border-gray-200 p-4 shadow-sm flex justify-between items-center"
        >
          <h1 class="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Icon name="lucide:newspaper" class="h-5 w-5 text-emerald-600" />
            Editor de Artículos
          </h1>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-500"
              >{{ blocks.length }} componentes</span
            >
            <button
              @click="clearAllBlocks"
              class="text-sm text-red-500 hover:text-red-700 flex items-center gap-1"
              v-if="blocks.length > 0"
            >
              <Icon name="lucide:trash-2" class="h-4 w-4" />
              Limpiar todo
            </button>
          </div>
        </div>

        <!-- Área de trabajo con scroll y panel de propiedades -->
        <div class="flex-1 flex overflow-hidden">
          <!-- Área de trabajo principal -->
          <div class="flex-1 overflow-y-auto p-6 bg-gray-50">
            <!-- Selección de plantilla -->
            <div
              class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6"
            >
              <h2
                class="text-lg font-medium mb-3 text-gray-800 flex items-center gap-2"
              >
                <Icon
                  name="lucide:layout-template"
                  class="h-5 w-5 text-emerald-600"
                />
                Plantillas
              </h2>
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
              <h2
                class="text-lg font-medium mb-3 text-gray-800 flex items-center gap-2"
              >
                <Icon
                  name="lucide:file-text"
                  class="h-5 w-5 text-emerald-600"
                />
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
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de Publicación
                  </label>
                  <input
                    v-model="fixedFields.date"
                    type="date"
                    class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Categoría
                  </label>
                  <select
                    v-model="fixedFields.category"
                    class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  >
                    <option value="">Seleccione una categoría</option>
                    <option value="noticias">Noticias</option>
                    <option value="ciencia">Ciencia</option>
                    <option value="tecnologia">Tecnología</option>
                    <option value="salud">Salud</option>
                    <option value="educacion">Educación</option>
                  </select>
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
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Resumen
                  </label>
                  <textarea
                    v-model="fixedFields.summary"
                    class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    rows="3"
                    placeholder="Breve resumen del artículo"
                  ></textarea>
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
                    <div class="max-w-4xl mx-auto">
                      <div class="text-white/80 mb-1">
                        {{
                          fixedFields.category
                            ? fixedFields.category.toUpperCase()
                            : "CATEGORÍA"
                        }}
                        |
                        {{
                          fixedFields.date
                            ? new Date(fixedFields.date).toLocaleDateString()
                            : "FECHA"
                        }}
                      </div>
                      <h1 class="text-3xl font-bold text-white">
                        {{ fixedFields.title || "Título del artículo" }}
                      </h1>
                      <p class="text-white/80 mt-2">
                        Por {{ fixedFields.author || "Nombre del autor" }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Feature Template -->
                <div v-else-if="selectedTemplate === 'feature'" class="p-6">
                  <div class="max-w-4xl mx-auto">
                    <div class="text-emerald-600 font-medium mb-1">
                      {{
                        fixedFields.category
                          ? fixedFields.category.toUpperCase()
                          : "CATEGORÍA"
                      }}
                      |
                      {{
                        fixedFields.date
                          ? new Date(fixedFields.date).toLocaleDateString()
                          : "FECHA"
                      }}
                    </div>
                    <h1 class="text-4xl font-bold mb-2">
                      {{ fixedFields.title || "Título del artículo" }}
                    </h1>
                    <p class="text-gray-500 mb-2">
                      Por {{ fixedFields.author || "Nombre del autor" }}
                    </p>
                    <p class="text-gray-700 mb-4">
                      {{ fixedFields.summary || "Resumen del artículo..." }}
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

                <!-- Minimal Template -->
                <div v-else-if="selectedTemplate === 'minimal'" class="p-6">
                  <div class="max-w-3xl mx-auto">
                    <div class="text-center text-gray-500 mb-1">
                      {{
                        fixedFields.category
                          ? fixedFields.category.toUpperCase()
                          : "CATEGORÍA"
                      }}
                      |
                      {{
                        fixedFields.date
                          ? new Date(fixedFields.date).toLocaleDateString()
                          : "FECHA"
                      }}
                    </div>
                    <h1 class="text-3xl font-bold mb-2 text-center">
                      {{ fixedFields.title || "Título del artículo" }}
                    </h1>
                    <p class="text-gray-500 mb-4 text-center">
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
                    <p class="text-gray-700 text-center italic mb-6">
                      {{ fixedFields.summary || "Resumen del artículo..." }}
                    </p>
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
            class="w-80 bg-white border-l border-gray-200 overflow-y-auto shadow-sm"
          >
            <div
              class="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50"
            >
              <h3 class="font-medium text-gray-800 flex items-center gap-2">
                <Icon
                  name="lucide:settings-2"
                  class="h-4 w-4 text-emerald-600"
                />
                Propiedades
              </h3>
              <button
                @click="selectedBlockId = null"
                class="text-gray-500 hover:text-gray-700"
              >
                <Icon name="lucide:x" class="h-4 w-4" />
              </button>
            </div>

            <div class="p-4">
              <div v-if="selectedBlock">
                <!-- Acciones del bloque -->
                <div class="mb-4 flex space-x-2">
                  <button
                    @click="duplicateBlock(selectedBlockId as string)"
                    class="flex-1 py-1.5 px-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center gap-1 text-sm"
                  >
                    <Icon name="lucide:copy" class="h-4 w-4" />
                    Duplicar
                  </button>
                  <button
                    @click="removeBlock(selectedBlockId as string)"
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
                    class="w-full accent-emerald-600"
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
                >
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Contenido
                    </label>
                    <!-- Usar TipTap para el componente de texto -->
                    <div
                      v-if="selectedBlock.type === 'text'"
                      class="border rounded-md"
                    >
                      <div
                        class="border-b border-gray-200 p-1 bg-gray-50 flex flex-wrap gap-1"
                      >
                        <button
                          @click="editor?.chain().focus().toggleBold().run()"
                          :class="{ 'bg-gray-200': editor?.isActive('bold') }"
                          class="p-1 rounded hover:bg-gray-100"
                        >
                          <Icon name="lucide:bold" class="h-4 w-4" />
                        </button>
                        <button
                          @click="editor?.chain().focus().toggleItalic().run()"
                          :class="{ 'bg-gray-200': editor?.isActive('italic') }"
                          class="p-1 rounded hover:bg-gray-100"
                        >
                          <Icon name="lucide:italic" class="h-4 w-4" />
                        </button>
                        <button
                          @click="
                            editor?.chain().focus().toggleUnderline().run()
                          "
                          :class="{
                            'bg-gray-200': editor?.isActive('underline'),
                          }"
                          class="p-1 rounded hover:bg-gray-100"
                        >
                          <Icon name="lucide:underline" class="h-4 w-4" />
                        </button>
                        <button
                          @click="editor?.chain().focus().toggleStrike().run()"
                          :class="{ 'bg-gray-200': editor?.isActive('strike') }"
                          class="p-1 rounded hover:bg-gray-100"
                        >
                          <Icon name="lucide:strikethrough" class="h-4 w-4" />
                        </button>
                        <span class="w-px h-6 bg-gray-300 mx-1"></span>
                        <button
                          @click="
                            editor
                              ?.chain()
                              .focus()
                              .toggleHeading({ level: 3 })
                              .run()
                          "
                          :class="{
                            'bg-gray-200': editor?.isActive('heading', {
                              level: 3,
                            }),
                          }"
                          class="p-1 rounded hover:bg-gray-100"
                        >
                          <Icon name="lucide:heading-3" class="h-4 w-4" />
                        </button>
                        <button
                          @click="
                            editor?.chain().focus().toggleBulletList().run()
                          "
                          :class="{
                            'bg-gray-200': editor?.isActive('bulletList'),
                          }"
                          class="p-1 rounded hover:bg-gray-100"
                        >
                          <Icon name="lucide:list" class="h-4 w-4" />
                        </button>
                        <button
                          @click="
                            editor?.chain().focus().toggleOrderedList().run()
                          "
                          :class="{
                            'bg-gray-200': editor?.isActive('orderedList'),
                          }"
                          class="p-1 rounded hover:bg-gray-100"
                        >
                          <Icon name="lucide:list-ordered" class="h-4 w-4" />
                        </button>
                        <span class="w-px h-6 bg-gray-300 mx-1"></span>
                        <button
                          @click="
                            editor?.chain().focus().setTextAlign('left').run()
                          "
                          :class="{
                            'bg-gray-200': editor?.isActive({
                              textAlign: 'left',
                            }),
                          }"
                          class="p-1 rounded hover:bg-gray-100"
                        >
                          <Icon name="lucide:align-left" class="h-4 w-4" />
                        </button>
                        <button
                          @click="
                            editor?.chain().focus().setTextAlign('center').run()
                          "
                          :class="{
                            'bg-gray-200': editor?.isActive({
                              textAlign: 'center',
                            }),
                          }"
                          class="p-1 rounded hover:bg-gray-100"
                        >
                          <Icon name="lucide:align-center" class="h-4 w-4" />
                        </button>
                        <button
                          @click="
                            editor?.chain().focus().setTextAlign('right').run()
                          "
                          :class="{
                            'bg-gray-200': editor?.isActive({
                              textAlign: 'right',
                            }),
                          }"
                          class="p-1 rounded hover:bg-gray-100"
                        >
                          <Icon name="lucide:align-right" class="h-4 w-4" />
                        </button>
                        <button
                          @click="
                            editor
                              ?.chain()
                              .focus()
                              .setTextAlign('justify')
                              .run()
                          "
                          :class="{
                            'bg-gray-200': editor?.isActive({
                              textAlign: 'justify',
                            }),
                          }"
                          class="p-1 rounded hover:bg-gray-100"
                        >
                          <Icon name="lucide:align-justify" class="h-4 w-4" />
                        </button>
                        <span class="w-px h-6 bg-gray-300 mx-1"></span>
                        <button
                          @click="
                            editor
                              ?.chain()
                              .focus()
                              .toggleLink({ href: '' })
                              .run()
                          "
                          :class="{ 'bg-gray-200': editor?.isActive('link') }"
                          class="p-1 rounded hover:bg-gray-100"
                        >
                          <Icon name="lucide:link" class="h-4 w-4" />
                        </button>
                        <button
                          @click="editor?.chain().focus().unsetLink().run()"
                          :disabled="!editor?.isActive('link')"
                          class="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
                        >
                          <Icon name="lucide:link-2-off" class="h-4 w-4" />
                        </button>
                      </div>
                      <div class="p-2 min-h-[150px]">
                        <editor-content
                          :editor="editor"
                          class="prose prose-sm max-w-none"
                        />
                      </div>
                    </div>
                    <textarea
                      v-else
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

                  <!-- Opciones de formato de texto (solo para título y subtítulo) -->
                  <div class="mb-4" v-if="selectedBlock.type !== 'text'">
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Formato de texto
                    </label>
                    <div class="flex flex-wrap gap-2">
                      <button
                        @click="toggleTextFormat('bold')"
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
                        @click="toggleTextFormat('italic')"
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
                        @click="toggleTextFormat('underline')"
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
                          @click="updateTextColor(color.value)"
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
                          @click="updateTextColor(customColor)"
                          class="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200"
                        >
                          Aplicar
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Alineación de texto (solo para título y subtítulo) -->
                  <div class="mb-4" v-if="selectedBlock.type !== 'text'">
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Alineación
                    </label>
                    <div class="flex gap-1">
                      <button
                        @click="updateTextAlignment('left')"
                        class="flex-1 p-1.5 border rounded-md hover:bg-gray-100"
                        :class="{
                          'bg-gray-100 ring-2 ring-emerald-500':
                            !selectedBlock.textProps?.alignment ||
                            selectedBlock.textProps?.alignment === 'left',
                        }"
                      >
                        <Icon
                          name="lucide:align-left"
                          class="h-4 w-4 mx-auto"
                        />
                      </button>
                      <button
                        @click="updateTextAlignment('center')"
                        class="flex-1 p-1.5 border rounded-md hover:bg-gray-100"
                        :class="{
                          'bg-gray-100 ring-2 ring-emerald-500':
                            selectedBlock.textProps?.alignment === 'center',
                        }"
                      >
                        <Icon
                          name="lucide:align-center"
                          class="h-4 w-4 mx-auto"
                        />
                      </button>
                      <button
                        @click="updateTextAlignment('right')"
                        class="flex-1 p-1.5 border rounded-md hover:bg-gray-100"
                        :class="{
                          'bg-gray-100 ring-2 ring-emerald-500':
                            selectedBlock.textProps?.alignment === 'right',
                        }"
                      >
                        <Icon
                          name="lucide:align-right"
                          class="h-4 w-4 mx-auto"
                        />
                      </button>
                      <button
                        @click="updateTextAlignment('justify')"
                        class="flex-1 p-1.5 border rounded-md hover:bg-gray-100"
                        :class="{
                          'bg-gray-100 ring-2 ring-emerald-500':
                            selectedBlock.textProps?.alignment === 'justify',
                        }"
                      >
                        <Icon
                          name="lucide:align-justify"
                          class="h-4 w-4 mx-auto"
                        />
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
                        updateDividerProps({
                          style: ($event.target as HTMLSelectElement)
                            .value as DividerStyle,
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
                        updateDividerProps({
                          thickness: parseInt(
                            ($event.target as HTMLInputElement).value
                          ),
                        })
                      "
                    />
                    <div
                      class="flex justify-between text-xs text-gray-500 mt-1"
                    >
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
                        @click="updateDividerProps({ color: color.value })"
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
                          updateDividerProps({ color: customDividerColor })
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
                        updateDividerProps({
                          width: parseInt(
                            ($event.target as HTMLInputElement).value
                          ),
                        })
                      "
                    />
                    <div
                      class="flex justify-between text-xs text-gray-500 mt-1"
                    >
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
                        @click="updateDividerProps({ alignment: 'left' })"
                        class="flex-1 p-1.5 border rounded-md hover:bg-gray-100"
                        :class="{
                          'bg-gray-100 ring-2 ring-emerald-500':
                            !selectedBlock.dividerProps?.alignment ||
                            selectedBlock.dividerProps?.alignment === 'left',
                        }"
                      >
                        <Icon
                          name="lucide:align-left"
                          class="h-4 w-4 mx-auto"
                        />
                      </button>
                      <button
                        @click="updateDividerProps({ alignment: 'center' })"
                        class="flex-1 p-1.5 border rounded-md hover:bg-gray-100"
                        :class="{
                          'bg-gray-100 ring-2 ring-emerald-500':
                            selectedBlock.dividerProps?.alignment === 'center',
                        }"
                      >
                        <Icon
                          name="lucide:align-center"
                          class="h-4 w-4 mx-auto"
                        />
                      </button>
                      <button
                        @click="updateDividerProps({ alignment: 'right' })"
                        class="flex-1 p-1.5 border rounded-md hover:bg-gray-100"
                        :class="{
                          'bg-gray-100 ring-2 ring-emerald-500':
                            selectedBlock.dividerProps?.alignment === 'right',
                        }"
                      >
                        <Icon
                          name="lucide:align-right"
                          class="h-4 w-4 mx-auto"
                        />
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
                        updateImageProps({
                          caption: ($event.target as HTMLInputElement).value,
                        })
                      "
                    />
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
                        updateListProps({
                          type: ($event.target as HTMLSelectElement)
                            .value as ListType,
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
                      class="block text-sm font-medium text-gray-700 mb-1 flex justify-between"
                    >
                      <span>Elementos de la lista</span>
                      <button
                        @click="addListItem()"
                        class="text-xs text-emerald-600 hover:text-emerald-700"
                      >
                        + Añadir elemento
                      </button>
                    </label>
                    <div
                      v-for="(item, index) in selectedBlock.listProps?.items ||
                      []"
                      :key="index"
                      class="flex items-center gap-2 mb-2"
                    >
                      <input
                        type="text"
                        :value="item"
                        class="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                        placeholder="Elemento de lista"
                        @input="
                          updateListItem(
                            index,
                            ($event.target as HTMLInputElement).value
                          )
                        "
                      />
                      <button
                        @click="removeListItem(index)"
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
                        updateBlockContent(
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
                        updateQuoteProps({
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
                        updateQuoteProps({
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
                        updateQuoteProps({
                          style: ($event.target as HTMLSelectElement)
                            .value as QuoteStyle,
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
                        updateBlockContent(
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
                        updateCodeProps({
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
                      class="block text-sm font-medium text-gray-700 mb-1 flex justify-between"
                    >
                      <span>Filas</span>
                      <button
                        @click="addTableRow()"
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
                        updateTableProps({
                          rows: parseInt(
                            ($event.target as HTMLInputElement).value
                          ),
                        })
                      "
                    />
                  </div>

                  <div class="mb-4">
                    <label
                      class="block text-sm font-medium text-gray-700 mb-1 flex justify-between"
                    >
                      <span>Columnas</span>
                      <button
                        @click="addTableColumn()"
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
                        updateTableProps({
                          columns: parseInt(
                            ($event.target as HTMLInputElement).value
                          ),
                        })
                      "
                    />
                  </div>

                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Encabezados
                    </label>
                    <div
                      v-for="(header, index) in selectedBlock.tableProps
                        ?.headers || []"
                      :key="`header-${index}`"
                      class="flex items-center gap-2 mb-2"
                    >
                      <input
                        type="text"
                        :value="header"
                        class="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                        placeholder="Encabezado"
                        @input="
                          updateTableHeader(
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
                      v-for="(row, rowIndex) in selectedBlock.tableProps
                        ?.data || []"
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
                          :placeholder="`Celda ${rowIndex + 1},${
                            cellIndex + 1
                          }`"
                          @input="
                            updateTableCell(
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
        </div>
      </div>
    </div>

    <!-- Modal de Vista Previa con GridStack -->
    <div
      v-if="showPreview"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
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
              @click="showPreview = false"
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
                    <div class="max-w-4xl mx-auto">
                      <div class="text-white/80 mb-1">
                        {{
                          fixedFields.category
                            ? fixedFields.category.toUpperCase()
                            : "CATEGORÍA"
                        }}
                        |
                        {{
                          fixedFields.date
                            ? new Date(fixedFields.date).toLocaleDateString()
                            : "FECHA"
                        }}
                      </div>
                      <h1 class="text-3xl font-bold text-white">
                        {{ fixedFields.title || "Título del artículo" }}
                      </h1>
                      <p class="text-white/80 mt-2">
                        Por {{ fixedFields.author || "Nombre del autor" }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Feature Template -->
                <div v-else-if="selectedTemplate === 'feature'" class="p-6">
                  <div class="max-w-4xl mx-auto">
                    <div class="text-emerald-600 font-medium mb-1">
                      {{
                        fixedFields.category
                          ? fixedFields.category.toUpperCase()
                          : "CATEGORÍA"
                      }}
                      |
                      {{
                        fixedFields.date
                          ? new Date(fixedFields.date).toLocaleDateString()
                          : "FECHA"
                      }}
                    </div>
                    <h1 class="text-4xl font-bold mb-2">
                      {{ fixedFields.title || "Título del artículo" }}
                    </h1>
                    <p class="text-gray-500 mb-2">
                      Por {{ fixedFields.author || "Nombre del autor" }}
                    </p>
                    <p class="text-gray-700 mb-4">
                      {{ fixedFields.summary || "Resumen del artículo..." }}
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

                <!-- Minimal Template -->
                <div v-else-if="selectedTemplate === 'minimal'" class="p-6">
                  <div class="max-w-3xl mx-auto">
                    <div class="text-center text-gray-500 mb-1">
                      {{
                        fixedFields.category
                          ? fixedFields.category.toUpperCase()
                          : "CATEGORÍA"
                      }}
                      |
                      {{
                        fixedFields.date
                          ? new Date(fixedFields.date).toLocaleDateString()
                          : "FECHA"
                      }}
                    </div>
                    <h1 class="text-3xl font-bold mb-2 text-center">
                      {{ fixedFields.title || "Título del artículo" }}
                    </h1>
                    <p class="text-gray-500 mb-4 text-center">
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
                    <p class="text-gray-700 text-center italic mb-6">
                      {{ fixedFields.summary || "Resumen del artículo..." }}
                    </p>
                  </div>
                </div>
              </template>

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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from "vue";
import "gridstack/dist/gridstack.min.css";
import { GridStack } from "gridstack";
import { Editor, EditorContent, useEditor } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";

// Define tipos para evitar errores de TypeScript
type ComponentType =
  | "title"
  | "subtitle"
  | "text"
  | "divider"
  | "image"
  | "columns"
  | "list"
  | "quote"
  | "code"
  | "table";
type ObjectFitType = "cover" | "contain" | "fill" | "none";
type ListType = "bullet" | "numbered" | "check";
type QuoteStyle = "default" | "blockquote" | "pullquote";
type DividerStyle = "solid" | "dashed" | "dotted" | "double";
type TextAlignment = "left" | "center" | "right" | "justify";

interface Template {
  id: string;
  name: string;
  thumbnail: string;
}

interface FixedFields {
  title: string;
  author: string;
  bannerImage: string;
  date: string;
  category: string;
  summary: string;
}

interface ImageProperties {
  alt: string;
  objectFit: ObjectFitType;
  height: number; // percentage of container
  caption?: string;
}

interface ListProperties {
  type: ListType;
  items: string[];
}

interface QuoteProperties {
  author: string;
  source: string;
  style: QuoteStyle;
}

interface CodeProperties {
  language: string;
}

interface TableProperties {
  rows: number;
  columns: number;
  headers: string[];
  data: string[][];
}

interface TextProperties {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: string;
  alignment?: TextAlignment;
}

interface DividerProperties {
  style: DividerStyle;
  thickness: number;
  color: string;
  width: number;
  alignment: TextAlignment;
}

interface ContentBlock {
  id: string;
  type: ComponentType;
  content?: string;
  columns?: number;
  columnContent?: string[];
  imageProps?: ImageProperties;
  listProps?: ListProperties;
  quoteProps?: QuoteProperties;
  codeProps?: CodeProperties;
  tableProps?: TableProperties;
  textProps?: TextProperties;
  dividerProps?: DividerProperties;
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

interface ColorOption {
  name: string;
  value: string;
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
  date: "",
  category: "",
  summary: "",
});

const blocks = ref<ContentBlock[]>([]);
const showPreview = ref(false);
const selectedBlockId = ref<string | null>(null);
const contentGridRef = ref<HTMLElement | null>(null);
const gridStackContainer = ref<HTMLElement | null>(null);
const previewGridContainer = ref<HTMLElement | null>(null);
const gridStack = ref<any>(null);
const previewGridStack = ref<any>(null);
const previewMode = ref<"desktop" | "tablet" | "mobile">("desktop");
const showColorPicker = ref(false);
const customColor = ref("");
const customDividerColor = ref("");

// TipTap Editor
const editor = useEditor({
  extensions: [
    StarterKit,
    Underline,
    Link.configure({
      openOnClick: false,
    }),
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
  ],
  content: "",
  onUpdate: ({ editor }) => {
    // Actualizar el contenido del bloque cuando cambia el editor
    if (selectedBlockId.value) {
      const html = editor.getHTML();
      updateBlockContent(html);
    }
  },
});

// Colores predefinidos para texto
const textColors: ColorOption[] = [
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
const dividerColors: ColorOption[] = [
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
    case "list":
      return "lucide:list";
    case "quote":
      return "lucide:quote";
    case "code":
      return "lucide:code";
    case "table":
      return "lucide:table";
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

// Modificar la función renderBlock para los bloques de tipo texto
const renderBlock = (block: ContentBlock) => {
  if (!gridStack.value) return;

  // Crear el contenido HTML del bloque
  let content = "";

  // Controles del bloque
  content += `
  <div class="absolute right-2 top-2 flex space-x-1 bg-white shadow-sm rounded-md p-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
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
    // Para el tipo texto, creamos un contenedor para el editor TipTap
    content += `<div class="block-content text-base w-full min-h-[100px]" data-block-id="${
      block.id
    }">
      <div class="tiptap-toolbar bg-gray-50 border-b border-gray-200 p-1 flex flex-wrap gap-1 rounded-t-md">
        <button class="tiptap-bold p-1 rounded hover:bg-gray-100" title="Negrita">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bold"><path d="M14 12a4 4 0 0 0 0-8H6v8"/><path d="M15 20a4 4 0 0 0 0-8H6v8Z"/></svg>
        </button>
        <button class="tiptap-italic p-1 rounded hover:bg-gray-100" title="Cursiva">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-italic"><line x1="19" x2="10" y1="4" y2="4"/><line x1="14" x2="5" y1="20" y2="20"/><line x1="15" x2="9" y1="4" y2="20"/></svg>
        </button>
        <button class="tiptap-underline p-1 rounded hover:bg-gray-100" title="Subrayado">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-underline"><path d="M6 4v6a6 6 0 0 0 12 0V4"/><line x1="4" x2="20" y1="20" y2="20"/></svg>
        </button>
        <span class="w-px h-6 bg-gray-300 mx-1"></span>
        <button class="tiptap-h3 p-1 rounded hover:bg-gray-100" title="Encabezado">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heading-3"><path d="M4 12h8"/><path d="M4 18V6"/><path d="M12 18V6"/><path d="M17.5 10.5c1.7-1 3.5 0 3.5 1.5a2 2 0 0 1-2 2"/><path d="M17 17.5c2 1.5 4 .3 4-1.5a2 2 0 0 0-2-2"/></svg>
        </button>
        <button class="tiptap-bullet-list p-1 rounded hover:bg-gray-100" title="Lista con viñetas">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
        </button>
        <button class="tiptap-ordered-list p-1 rounded hover:bg-gray-100" title="Lista numerada">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list-ordered"><line x1="10" x2="21" y1="6" y2="6"/><line x1="10" x2="21" y1="12" y2="12"/><line x1="10" x2="21" y1="18" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>
        </button>
        <span class="w-px h-6 bg-gray-300 mx-1"></span>
        <button class="tiptap-align-left p-1 rounded hover:bg-gray-100" title="Alinear a la izquierda">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-align-left"><line x1="21" x2="3" y1="6" y2="6"/><line x1="15" x2="3" y1="12" y2="12"/><line x1="17" x2="3" y1="18" y2="18"/></svg>
        </button>
        <button class="tiptap-align-center p-1 rounded hover:bg-gray-100" title="Centrar">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-align-center"><line x1="21" x2="3" y1="6" y2="6"/><line x1="17" x2="7" y1="12" y2="12"/><line x1="19" x2="5" y1="18" y2="18"/></svg>
        </button>
        <button class="tiptap-align-right p-1 rounded hover:bg-gray-100" title="Alinear a la derecha">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-align-right"><line x1="21" x2="3" y1="6" y2="6"/><line x1="21" x2="9" y1="12" y2="12"/><line x1="21" x2="7" y1="18" y2="18"/></svg>
        </button>
        <span class="w-px h-6 bg-gray-300 mx-1"></span>
        <button class="tiptap-link p-1 rounded hover:bg-gray-100" title="Insertar enlace">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
        </button>
      </div>
      <div class="tiptap-editor-container p-2 border border-t-0 rounded-b-md min-h-[150px]">
        <div class="tiptap-editor prose prose-sm max-w-none">${
          block.content || "Ingrese texto aquí"
        }</div>
      </div>
    </div>`;
  } else if (block.type === "divider") {
    // El resto del código para otros tipos de bloques permanece igual...
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

  // Inicializar TipTap para bloques de texto
  if (block.type === "text") {
    initTipTapForBlock(block.id);
  }
};

// Mapa para almacenar las instancias de TipTap por ID de bloque
const blockEditors = ref<Map<string, any>>(new Map());

// Función para inicializar TipTap en un bloque específico
const initTipTapForBlock = (blockId: string) => {
  if (!gridStackContainer.value) return;

  // Buscar el contenedor del editor
  const blockElement = gridStackContainer.value.querySelector(
    `.grid-stack-item[gs-id="${blockId}"] .tiptap-editor`
  );

  if (!blockElement) return;

  // Si ya existe un editor para este bloque, destruirlo primero
  if (blockEditors.value.has(blockId)) {
    blockEditors.value.get(blockId).destroy();
  }

  // Crear una nueva instancia de TipTap
  const blockEditor = new Editor({
    element: blockElement as HTMLElement,
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: blocks.value.find((b) => b.id === blockId)?.content || "",
    onUpdate: ({ editor }) => {
      // Actualizar el contenido del bloque cuando cambia el editor
      const blockIndex = blocks.value.findIndex((b) => b.id === blockId);
      if (blockIndex !== -1) {
        blocks.value[blockIndex].content = editor.getHTML();
      }
    },
  });

  // Guardar la instancia del editor en el mapa
  blockEditors.value.set(blockId, blockEditor);

  // Configurar los botones de la barra de herramientas
  setupTipTapToolbar(blockId);
};

// Configurar los botones de la barra de herramientas de TipTap
const setupTipTapToolbar = (blockId: string) => {
  if (!gridStackContainer.value) return;

  const editor = blockEditors.value.get(blockId);
  if (!editor) return;

  const blockElement = gridStackContainer.value.querySelector(
    `.grid-stack-item[gs-id="${blockId}"]`
  );
  if (!blockElement) return;

  // Botón de negrita
  const boldButton = blockElement.querySelector(".tiptap-bold");
  if (boldButton) {
    boldButton.addEventListener("click", () => {
      editor.chain().focus().toggleBold().run();
      updateToolbarButtonStates(blockId);
    });
  }

  // Botón de cursiva
  const italicButton = blockElement.querySelector(".tiptap-italic");
  if (italicButton) {
    italicButton.addEventListener("click", () => {
      editor.chain().focus().toggleItalic().run();
      updateToolbarButtonStates(blockId);
    });
  }

  // Botón de subrayado
  const underlineButton = blockElement.querySelector(".tiptap-underline");
  if (underlineButton) {
    underlineButton.addEventListener("click", () => {
      editor.chain().focus().toggleUnderline().run();
      updateToolbarButtonStates(blockId);
    });
  }

  // Botón de encabezado
  const h3Button = blockElement.querySelector(".tiptap-h3");
  if (h3Button) {
    h3Button.addEventListener("click", () => {
      editor.chain().focus().toggleHeading({ level: 3 }).run();
      updateToolbarButtonStates(blockId);
    });
  }

  // Botón de lista con viñetas
  const bulletListButton = blockElement.querySelector(".tiptap-bullet-list");
  if (bulletListButton) {
    bulletListButton.addEventListener("click", () => {
      editor.chain().focus().toggleBulletList().run();
      updateToolbarButtonStates(blockId);
    });
  }

  // Botón de lista numerada
  const orderedListButton = blockElement.querySelector(".tiptap-ordered-list");
  if (orderedListButton) {
    orderedListButton.addEventListener("click", () => {
      editor.chain().focus().toggleOrderedList().run();
      updateToolbarButtonStates(blockId);
    });
  }

  // Botones de alineación
  const alignLeftButton = blockElement.querySelector(".tiptap-align-left");
  if (alignLeftButton) {
    alignLeftButton.addEventListener("click", () => {
      editor.chain().focus().setTextAlign("left").run();
      updateToolbarButtonStates(blockId);
    });
  }

  const alignCenterButton = blockElement.querySelector(".tiptap-align-center");
  if (alignCenterButton) {
    alignCenterButton.addEventListener("click", () => {
      editor.chain().focus().setTextAlign("center").run();
      updateToolbarButtonStates(blockId);
    });
  }

  const alignRightButton = blockElement.querySelector(".tiptap-align-right");
  if (alignRightButton) {
    alignRightButton.addEventListener("click", () => {
      editor.chain().focus().setTextAlign("right").run();
      updateToolbarButtonStates(blockId);
    });
  }

  // Botón de enlace
  const linkButton = blockElement.querySelector(".tiptap-link");
  if (linkButton) {
    linkButton.addEventListener("click", () => {
      const url = prompt("URL del enlace:");
      if (url) {
        editor.chain().focus().setLink({ href: url }).run();
      } else if (editor.isActive("link")) {
        editor.chain().focus().unsetLink().run();
      }
      updateToolbarButtonStates(blockId);
    });
  }

  // Actualizar el estado inicial de los botones
  updateToolbarButtonStates(blockId);
};

// Actualizar el estado visual de los botones de la barra de herramientas
const updateToolbarButtonStates = (blockId: string) => {
  if (!gridStackContainer.value) return;

  const editor = blockEditors.value.get(blockId);
  if (!editor) return;

  const blockElement = gridStackContainer.value.querySelector(
    `.grid-stack-item[gs-id="${blockId}"]`
  );
  if (!blockElement) return;

  // Actualizar estado de los botones según el estado del editor
  const boldButton = blockElement.querySelector(".tiptap-bold");
  if (boldButton) {
    if (editor.isActive("bold")) {
      boldButton.classList.add("bg-gray-200");
    } else {
      boldButton.classList.remove("bg-gray-200");
    }
  }

  const italicButton = blockElement.querySelector(".tiptap-italic");
  if (italicButton) {
    if (editor.isActive("italic")) {
      italicButton.classList.add("bg-gray-200");
    } else {
      italicButton.classList.remove("bg-gray-200");
    }
  }

  const underlineButton = blockElement.querySelector(".tiptap-underline");
  if (underlineButton) {
    if (editor.isActive("underline")) {
      underlineButton.classList.add("bg-gray-200");
    } else {
      underlineButton.classList.remove("bg-gray-200");
    }
  }

  const h3Button = blockElement.querySelector(".tiptap-h3");
  if (h3Button) {
    if (editor.isActive("heading", { level: 3 })) {
      h3Button.classList.add("bg-gray-200");
    } else {
      h3Button.classList.remove("bg-gray-200");
    }
  }

  const bulletListButton = blockElement.querySelector(".tiptap-bullet-list");
  if (bulletListButton) {
    if (editor.isActive("bulletList")) {
      bulletListButton.classList.add("bg-gray-200");
    } else {
      bulletListButton.classList.remove("bg-gray-200");
    }
  }

  const orderedListButton = blockElement.querySelector(".tiptap-ordered-list");
  if (orderedListButton) {
    if (editor.isActive("orderedList")) {
      orderedListButton.classList.add("bg-gray-200");
    } else {
      orderedListButton.classList.remove("bg-gray-200");
    }
  }

  const alignLeftButton = blockElement.querySelector(".tiptap-align-left");
  if (alignLeftButton) {
    if (
      editor.isActive({ textAlign: "left" }) ||
      !editor.isActive("textAlign")
    ) {
      alignLeftButton.classList.add("bg-gray-200");
    } else {
      alignLeftButton.classList.remove("bg-gray-200");
    }
  }

  const alignCenterButton = blockElement.querySelector(".tiptap-align-center");
  if (alignCenterButton) {
    if (editor.isActive({ textAlign: "center" })) {
      alignCenterButton.classList.add("bg-gray-200");
    } else {
      alignCenterButton.classList.remove("bg-gray-200");
    }
  }

  const alignRightButton = blockElement.querySelector(".tiptap-align-right");
  if (alignRightButton) {
    if (editor.isActive({ textAlign: "right" })) {
      alignRightButton.classList.add("bg-gray-200");
    } else {
      alignRightButton.classList.remove("bg-gray-200");
    }
  }

  const linkButton = blockElement.querySelector(".tiptap-link");
  if (linkButton) {
    if (editor.isActive("link")) {
      linkButton.classList.add("bg-gray-200");
    } else {
      linkButton.classList.remove("bg-gray-200");
    }
  }
};

// Limpiar los editores cuando se elimina un bloque
const removeBlock = (blockId: string) => {
  // Destruir el editor TipTap si existe
  if (blockEditors.value.has(blockId)) {
    blockEditors.value.get(blockId).destroy();
    blockEditors.value.delete(blockId);
  }

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

// Limpiar todos los editores cuando se limpian todos los bloques
const clearAllBlocks = () => {
  if (confirm("¿Está seguro de que desea eliminar todos los bloques?")) {
    // Destruir todos los editores TipTap
    blockEditors.value.forEach((editor) => {
      editor.destroy();
    });
    blockEditors.value.clear();

    blocks.value = [];
    if (gridStack.value) {
      gridStack.value.removeAll();
    }
    selectedBlockId.value = null;
  }
};

// Duplicar un bloque también debe duplicar su editor
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

// Limpiar los editores cuando el componente se desmonta
onUnmounted(() => {
  if (gridStack.value) {
    gridStack.value.destroy();
  }
  if (previewGridStack.value) {
    previewGridStack.value.destroy();
  }

  // Destruir todos los editores TipTap
  blockEditors.value.forEach((editor) => {
    editor.destroy();
  });
  blockEditors.value.clear();

  if (editor.value) {
    editor.value.destroy();
  }
});

// El resto del código permanece igual...

const addComponent = (type: ComponentType) => {
  const newBlockId = `block-${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 9)}`;

  const newBlock: ContentBlock = {
    id: newBlockId,
    type: type,
    x: 0,
    y: sortedBlocks.value.length
      ? sortedBlocks.value[sortedBlocks.value.length - 1].y +
        sortedBlocks.value[sortedBlocks.value.length - 1].height
      : 0,
    width: type === "columns" ? 6 : 12,
    height: 1,
  };

  if (type === "columns") {
    newBlock.columns = 2;
    newBlock.columnContent = ["", ""];
  }

  blocks.value.push(newBlock);
  renderBlock(newBlock);
};

const updateBlockWidth = (width: number) => {
  if (!selectedBlockId.value) return;

  const blockIndex = blocks.value.findIndex(
    (b) => b.id === selectedBlockId.value
  );
  if (blockIndex === -1) return;

  blocks.value[blockIndex].width = width;

  const gridItem = gridStack.value.el.querySelector(
    `.grid-stack-item[gs-id="${selectedBlockId.value}"]`
  );
  if (gridItem) {
    gridStack.value.update(gridItem, { w: width });
  }
};

const updateBlockHeight = (height: number) => {
  if (!selectedBlockId.value) return;

  const blockIndex = blocks.value.findIndex(
    (b) => b.id === selectedBlockId.value
  );
  if (blockIndex === -1) return;

  blocks.value[blockIndex].height = height;

  const gridItem = gridStack.value.el.querySelector(
    `.grid-stack-item[gs-id="${selectedBlockId.value}"]`
  );
  if (gridItem) {
    gridStack.value.update(gridItem, { h: height });
  }
};

const updateBlockContent = (content: string) => {
  if (!selectedBlockId.value) return;

  const blockIndex = blocks.value.findIndex(
    (b) => b.id === selectedBlockId.value
  );
  if (blockIndex === -1) return;

  blocks.value[blockIndex].content = content;

  // Actualizar el contenido en la vista previa si está visible
  if (showPreview.value) {
    renderPreviewBlocks();
  }
};

const updateColumnsCount = (blockId: string, columnCount: number) => {
  const blockIndex = blocks.value.findIndex((b) => b.id === blockId);
  if (blockIndex === -1) return;

  blocks.value[blockIndex].columns = columnCount;
  blocks.value[blockIndex].columnContent = Array(columnCount).fill("");

  // Re-render the block
  renderBlock(blocks.value[blockIndex]);
};

const updateColumnContent = (
  blockId: string,
  columnIndex: number,
  content: string
) => {
  const blockIndex = blocks.value.findIndex((b) => b.id === blockId);
  if (blockIndex === -1) return;

  if (!blocks.value[blockIndex].columnContent) {
    blocks.value[blockIndex].columnContent = [];
  }

  blocks.value[blockIndex].columnContent![columnIndex] = content;

  // Actualizar el contenido en la vista previa si está visible
  if (showPreview.value) {
    renderPreviewBlocks();
  }
};

const updateImageProps = (props: Partial<ImageProperties>) => {
  if (!selectedBlockId.value) return;

  const blockIndex = blocks.value.findIndex(
    (b) => b.id === selectedBlockId.value
  );
  if (blockIndex === -1) return;

  blocks.value[blockIndex].imageProps = {
    ...blocks.value[blockIndex].imageProps,
    ...props,
  };

  // Re-render the block
  renderBlock(blocks.value[blockIndex]);

  // Actualizar el contenido en la vista previa si está visible
  if (showPreview.value) {
    renderPreviewBlocks();
  }
};

const updateListProps = (props: Partial<ListProperties>) => {
  if (!selectedBlockId.value) return;

  const blockIndex = blocks.value.findIndex(
    (b) => b.id === selectedBlockId.value
  );
  if (blockIndex === -1) return;

  blocks.value[blockIndex].listProps = {
    ...blocks.value[blockIndex].listProps,
    ...props,
  };

  // Re-render the block
  renderBlock(blocks.value[blockIndex]);

  // Actualizar el contenido en la vista previa si está visible
  if (showPreview.value) {
    renderPreviewBlocks();
  }
};

const addListItem = () => {
  if (!selectedBlockId.value) return;

  const blockIndex = blocks.value.findIndex(
    (b) => b.id === selectedBlockId.value
  );
  if (blockIndex === -1) return;

  if (!blocks.value[blockIndex].listProps) {
    blocks.value[blockIndex].listProps = {
      type: "bullet",
      items: [],
    };
  }

  if (!blocks.value[blockIndex].listProps!.items) {
    blocks.value[blockIndex].listProps!.items = [];
  }

  blocks.value[blockIndex].listProps!.items.push("Nuevo elemento");

  // Re-render the block
  renderBlock(blocks.value[blockIndex]);

  // Actualizar el contenido en la vista previa si está visible
  if (showPreview.value) {
    renderPreviewBlocks();
  }
};

const updateListItem = (index: number, value: string) => {
  if (!selectedBlockId.value) return;

  const blockIndex = blocks.value.findIndex(
    (b) => b.id === selectedBlockId.value
  );
  if (blockIndex === -1) return;

  if (
    !blocks.value[blockIndex].listProps ||
    !blocks.value[blockIndex].listProps!.items
  )
    return;

  blocks.value[blockIndex].listProps!.items[index] = value;

  // Re-render the block
  renderBlock(blocks.value[blockIndex]);

  // Actualizar el contenido en la vista previa si está visible
  if (showPreview.value) {
    renderPreviewBlocks();
  }
};

const removeListItem = (index: number) => {
  if (!selectedBlockId.value) return;

  const blockIndex = blocks.value.findIndex(
    (b) => b.id === selectedBlockId.value
  );
  if (blockIndex === -1) return;

  if (
    !blocks.value[blockIndex].listProps ||
    !blocks.value[blockIndex].listProps!.items
  )
    return;

  blocks.value[blockIndex].listProps!.items.splice(index, 1);

  // Re-render the block
  renderBlock(blocks.value[blockIndex]);

  // Actualizar el contenido en la vista previa si está visible
  if (showPreview.value) {
    renderPreviewBlocks();
  }
};

const updateQuoteProps = (props: Partial<QuoteProperties>) => {
  if (!selectedBlockId.value) return;

  const blockIndex = blocks.value.findIndex(
    (b) => b.id === selectedBlockId.value
  );
  if (blockIndex === -1) return;

  blocks.value[blockIndex].quoteProps = {
    ...blocks.value[blockIndex].quoteProps,
    ...props,
  };

  // Re-render the block
  renderBlock(blocks.value[blockIndex]);

  // Actualizar el contenido en la vista previa si está visible
  if (showPreview.value) {
    renderPreviewBlocks();
  }
};

const updateCodeProps = (props: Partial<CodeProperties>) => {
  if (!selectedBlockId.value) return;

  const blockIndex = blocks.value.findIndex(
    (b) => b.id === selectedBlockId.value
  );
  if (blockIndex === -1) return;

  blocks.value[blockIndex].codeProps = {
    ...blocks.value[blockIndex].codeProps,
    ...props,
  };

  // Re-render the block
  renderBlock(blocks.value[blockIndex]);

  // Actualizar el contenido en la vista previa si está visible
  if (showPreview.value) {
    renderPreviewBlocks();
  }
};

const updateTableProps = (props: Partial<TableProperties>) => {
  if (!selectedBlockId.value) return;

  const blockIndex = blocks.value.findIndex(
    (b) => b.id === selectedBlockId.value
  );
  if (blockIndex === -1) return;

  blocks.value[blockIndex].tableProps = {
    ...blocks.value[blockIndex].tableProps,
    ...props,
  };

  // Re-render the block
  renderBlock(blocks.value[blockIndex]);

  // Actualizar el contenido en la vista previa si está visible
  if (showPreview.value) {
    renderPreviewBlocks();
  }
};

const addTableRow = () => {
  if (!selectedBlockId.value) return;

  const blockIndex = blocks.value.findIndex(
    (b) => b.id === selectedBlockId.value
  );
  if (blockIndex === -1) return;

  if (!blocks.value[blockIndex].tableProps) {
    blocks.value[blockIndex].tableProps = {
      rows: 2,
      columns: 2,
      headers: ["Encabezado 1", "Encabezado 2"],
      data: [
        ["Celda 1,1", "Celda 1,2"],
        ["Celda 2,1", "Celda 2,2"],
      ],
    };
  }

  if (!blocks.value[blockIndex].tableProps!.data) {
    blocks.value[blockIndex].tableProps!.data = [];
  }

  const newRow = Array(blocks.value[blockIndex].tableProps!.columns || 2).fill(
    "Nueva celda"
  );
  blocks.value[blockIndex].tableProps!.data.push(newRow);

  blocks.value[blockIndex].tableProps!.rows =
    blocks.value[blockIndex].tableProps!.data.length;

  // Re-render the block
  renderBlock(blocks.value[blockIndex]);

  // Actualizar el contenido en la vista previa si está visible
  if (showPreview.value) {
    renderPreviewBlocks();
  }
};

const addTableColumn = () => {
  if (!selectedBlockId.value) return;

  const blockIndex = blocks.value.findIndex(
    (b) => b.id === selectedBlockId.value
  );
  if (blockIndex === -1) return;

  if (!blocks.value[blockIndex].tableProps) {
    blocks.value[blockIndex].tableProps = {
      rows: 2,
      columns: 2,
      headers: ["Encabezado 1", "Encabezado 2"],
      data: [
        ["Celda 1,1", "Celda 1,2"],
        ["Celda 2,1", "Celda 2,2"],
      ],
    };
  }

  const currentColumns = blocks.value[blockIndex].tableProps!.columns || 2;
  blocks.value[blockIndex].tableProps!.columns = currentColumns + 1;

  // Add a new header
  if (!blocks.value[blockIndex].tableProps!.headers) {
    blocks.value[blockIndex].tableProps!.headers = [];
  }
  blocks.value[blockIndex].tableProps!.headers.push(
    `Encabezado ${currentColumns + 1}`
  );

  // Add a new cell to each row
  if (blocks.value[blockIndex].tableProps!.data) {
    blocks.value[blockIndex].tableProps!.data.forEach((row) => {
      row.push(`Celda ${row.length + 1}`);
    });
  }

  // Re-render the block
  renderBlock(blocks.value[blockIndex]);

  // Actualizar el contenido en la vista previa si está visible
  if (showPreview.value) {
    renderPreviewBlocks();
  }
};

const updateTableHeader = (index: number, value: string) => {
  if (!selectedBlockId.value) return;

  const blockIndex = blocks.value.findIndex(
    (b) => b.id === selectedBlockId.value
  );
  if (blockIndex === -1) return;

  if (
    !blocks.value[blockIndex].tableProps ||
    !blocks.value[blockIndex].tableProps!.headers
  )
    return;

  blocks.value[blockIndex].tableProps!.headers[index] = value;

  // Re-render the block
  renderBlock(blocks.value[blockIndex]);

  // Actualizar el contenido en la vista previa si está visible
  if (showPreview.value) {
    renderPreviewBlocks();
  }
};

const updateTableCell = (
  rowIndex: number,
  cellIndex: number,
  value: string
) => {
  if (!selectedBlockId.value) return;

  const blockIndex = blocks.value.findIndex(
    (b) => b.id === selectedBlockId.value
  );
  if (blockIndex === -1) return;

  if (
    !blocks.value[blockIndex].tableProps ||
    !blocks.value[blockIndex].tableProps!.data ||
    !blocks.value[blockIndex].tableProps!.data[rowIndex]
  )
    return;

  blocks.value[blockIndex].tableProps!.data[rowIndex][cellIndex] = value;

  // Re-render the block
  renderBlock(blocks.value[blockIndex]);

  // Actualizar el contenido en la vista previa si está visible
  if (showPreview.value) {
    renderPreviewBlocks();
  }
};

const updateTextFormat = (format: string) => {
  if (!selectedBlockId.value) return;

  const blockIndex = blocks.value.findIndex(
    (b) => b.id === selectedBlockId.value
  );
  if (blockIndex === -1) return;

  if (!blocks.value[blockIndex].textProps) {
    blocks.value[blockIndex].textProps = {};
  }

  blocks.value[blockIndex].textProps![format] =
    !blocks.value[blockIndex].textProps![format];

  // Re-render the block
  renderBlock(blocks.value[blockIndex]);

  // Actualizar el contenido en la vista previa si está visible
  if (showPreview.value) {
    renderPreviewBlocks();
  }
};

const updateTextColor = (color: string) => {
  if (!selectedBlockId.value) return;

  const blockIndex = blocks.value.findIndex(
    (b) => b.id === selectedBlockId.value
  );
  if (blockIndex === -1) return;

  if (!blocks.value[blockIndex].textProps) {
    blocks.value[blockIndex].textProps = {};
  }

  blocks.value[blockIndex].textProps!.color = color;
  showColorPicker.value = false;

  // Re-render the block
  renderBlock(blocks.value[blockIndex]);

  // Actualizar el contenido en la vista previa si está visible
  if (showPreview.value) {
    renderPreviewBlocks();
  }
};

const updateTextAlignment = (alignment: TextAlignment) => {
  if (!selectedBlockId.value) return;

  const blockIndex = blocks.value.findIndex(
    (b) => b.id === selectedBlockId.value
  );
  if (blockIndex === -1) return;

  if (!blocks.value[blockIndex].textProps) {
    blocks.value[blockIndex].textProps = {};
  }

  blocks.value[blockIndex].textProps!.alignment = alignment;

  // Re-render the block
  renderBlock(blocks.value[blockIndex]);

  // Actualizar el contenido en la vista previa si está visible
  if (showPreview.value) {
    renderPreviewBlocks();
  }
};

const updateDividerProps = (props: Partial<DividerProperties>) => {
  if (!selectedBlockId.value) return;

  const blockIndex = blocks.value.findIndex(
    (b) => b.id === selectedBlockId.value
  );
  if (blockIndex === -1) return;

  blocks.value[blockIndex].dividerProps = {
    ...blocks.value[blockIndex].dividerProps,
    ...props,
  };

  // Re-render the block
  renderBlock(blocks.value[blockIndex]);

  // Actualizar el contenido en la vista previa si está visible
  if (showPreview.value) {
    renderPreviewBlocks();
  }
};

const selectBlock = (blockId: string) => {
  selectedBlockId.value = blockId;

  // Remove ring from all items
  const gridItems = gridStack.value.el.querySelectorAll(".grid-stack-item");
  gridItems.forEach((item: any) => {
    item.classList.remove("ring-2", "ring-emerald-500");
  });

  // Add ring to selected item
  const gridItem = gridStack.value.el.querySelector(
    `.grid-stack-item[gs-id="${blockId}"]`
  );
  if (gridItem) {
    gridItem.classList.add("ring-2", "ring-emerald-500");
  }
};

const setupBlockEventListeners = (blockId: string) => {
  if (!gridStackContainer.value) return;

  const blockElement = gridStackContainer.value.querySelector(
    `.grid-stack-item[gs-id="${blockId}"]`
  );
  if (!blockElement) return;

  // Duplicate button
  const duplicateButton = blockElement.querySelector(".duplicate-btn");
  if (duplicateButton) {
    duplicateButton.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent selecting the block
      duplicateBlock(blockId);
    });
  }

  // Remove button
  const removeButton = blockElement.querySelector(".remove-btn");
  if (removeButton) {
    removeButton.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent selecting the block
      removeBlock(blockId);
    });
  }

  // Content editable (title, subtitle)
  const blockContent = blockElement.querySelector(".block-content");
  if (blockContent) {
    blockContent.addEventListener("input", (e) => {
      const content = (e.target as HTMLElement).innerText;
      updateBlockContent(content);
    });
  }

  // Column content editable
  const columnContents = blockElement.querySelectorAll(".column-content");
  columnContents.forEach((columnContent: any) => {
    columnContent.addEventListener("input", (e: any) => {
      const columnIndex = columnContent.dataset.columnIndex;
      const content = e.target.innerText;
      updateColumnContent(blockId, columnIndex, content);
    });
  });
};

const renderPreviewBlocks = () => {
  if (!previewGridStack.value) return;

  // Limpiar el grid de vista previa
  previewGridStack.value.removeAll();

  // Renderizar cada bloque en el grid de vista previa
  blocks.value.forEach((block) => {
    // Crear el contenido HTML del bloque
    let content = "";

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
      content += `<div class="block-content font-bold text-2xl md:text-3xl outline-none w-full min-h-[40px] ${textStyles}" style="${
        block.textProps?.color ? `color: ${block.textProps.color};` : ""
      }">${block.content || "Ingrese título aquí"}</div>`;
    } else if (block.type === "subtitle") {
      content += `<div class="block-content font-medium text-xl md:text-2xl outline-none w-full min-h-[36px] ${textStyles}" style="${
        block.textProps?.color ? `color: ${block.textProps.color};` : ""
      }">${block.content || "Ingrese subtítulo aquí"}</div>`;
    } else if (block.type === "text") {
      content += `<div class="block-content text-base w-full min-h-[100px]">${
        block.content || "Ingrese texto aquí"
      }</div>`;
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
          <div class="column-content outline-none h-full">
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
        block.tableProps?.data ||
        Array(rows).fill(Array(columns).fill("Celda"));

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

    // Crear un nuevo elemento
    const newItem = document.createElement("div");
    newItem.setAttribute("gs-id", block.id);
    newItem.setAttribute("gs-x", block.x.toString());
    newItem.setAttribute("gs-y", block.y.toString());
    newItem.setAttribute("gs-w", block.width.toString());
    newItem.setAttribute("gs-h", block.height.toString());
    newItem.className = "grid-stack-item";
    newItem.innerHTML = `<div class="grid-stack-item-content border rounded-md bg-white shadow-sm">${content}</div>`;

    previewGridStack.value.addWidget(newItem);
  });
};

onMounted(() => {
  initGridStack();

  // Cargar los bloques existentes
  blocks.value.forEach((block) => {
    renderBlock(block);
  });
});

watch(showPreview, (newValue) => {
  if (newValue) {
    nextTick(() => {
      initPreviewGridStack();
    });
  }
});
</script>

<style scoped>
/* Estilos existentes... */

/* Estilos adicionales para TipTap en los bloques */
:deep(.tiptap-editor) {
  outline: none;
  min-height: 150px;
}

:deep(.tiptap-editor p) {
  margin-bottom: 0.75em;
}

:deep(.tiptap-editor h3) {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1em;
  margin-bottom: 0.5em;
}

:deep(.tiptap-editor ul) {
  list-style-type: disc;
  padding-left: 1.5em;
  margin-bottom: 0.75em;
}

:deep(.tiptap-editor ol) {
  list-style-type: decimal;
  padding-left: 1.5em;
  margin-bottom: 0.75em;
}

:deep(.tiptap-editor a) {
  color: #10b981;
  text-decoration: underline;
}

:deep(.tiptap-editor p[style*="text-align: center"]) {
  text-align: center;
}

:deep(.tiptap-editor p[style*="text-align: right"]) {
  text-align: right;
}

:deep(.tiptap-editor p[style*="text-align: justify"]) {
  text-align: justify;
}

/* Estilos para la barra de herramientas */
.tiptap-toolbar button {
  transition: background-color 0.2s;
}

.tiptap-toolbar button.bg-gray-200 {
  background-color: #e5e7eb;
}
</style>
