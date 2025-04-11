<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Layout principal con panel lateral y área de contenido -->
    <div class="flex h-screen overflow-hidden">
      <!-- Panel lateral izquierdo con componentes -->
      <div
        class="w-72 bg-white border-r border-gray-200 flex flex-col h-full shadow-md"
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

        <!-- Tabs para componentes e imágenes -->
        <div class="border-b border-gray-200">
          <div class="flex">
            <button
              @click="activeTab = 'components'"
              class="flex-1 py-2 px-4 text-center text-sm font-medium"
              :class="
                activeTab === 'components'
                  ? 'border-b-2 border-emerald-500 text-emerald-600'
                  : 'text-gray-500 hover:text-gray-700'
              "
            >
              <div class="flex items-center justify-center gap-1">
                <Icon name="lucide:components" class="h-4 w-4" />
                Componentes
              </div>
            </button>
            <button
              @click="activeTab = 'images'"
              class="flex-1 py-2 px-4 text-center text-sm font-medium"
              :class="
                activeTab === 'images'
                  ? 'border-b-2 border-emerald-500 text-emerald-600'
                  : 'text-gray-500 hover:text-gray-700'
              "
            >
              <div class="flex items-center justify-center gap-1">
                <Icon name="lucide:image" class="h-4 w-4" />
                Imágenes
              </div>
            </button>
          </div>
        </div>

        <!-- Contenido de la pestaña activa -->
        <div class="p-4 overflow-y-auto flex-grow">
          <!-- Componentes arrastrables -->
          <div v-if="activeTab === 'components'">
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
                class="bg-white p-3 rounded-md cursor-move hover:bg-gray-50 transition-colors flex items-center gap-2 border border-gray-200 shadow-sm hover:shadow-md hover:border-emerald-200"
                @click="addComponent(component.type as ComponentType)"
              >
                <Icon
                  :name="getIcon(component.type)"
                  class="h-5 w-5 text-emerald-600"
                />
                <span class="text-sm font-medium">{{ component.label }}</span>
              </div>
            </div>
          </div>

          <!-- Panel de imágenes -->
          <div v-if="activeTab === 'images'">
            <div class="flex justify-between items-center mb-3">
              <h3
                class="text-sm font-medium text-gray-500 uppercase tracking-wider flex items-center gap-1"
              >
                <Icon name="lucide:image" class="h-4 w-4" />
                Biblioteca de imágenes
              </h3>
              <label
                for="image-upload"
                class="text-xs text-emerald-600 hover:text-emerald-700 cursor-pointer flex items-center gap-1"
              >
                <Icon name="lucide:upload" class="h-3 w-3" />
                Subir
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                class="hidden"
                @change="uploadImage"
              />
            </div>

            <!-- Grid de imágenes -->
            <div class="grid grid-cols-2 gap-2">
              <div
                v-for="(image, index) in imageLibrary"
                :key="index"
                class="relative group aspect-square border rounded-md overflow-hidden"
              >
                <img
                  :src="image.url"
                  :alt="image.alt || 'Imagen de biblioteca'"
                  class="w-full h-full object-cover"
                />
                <div
                  class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2"
                >
                  <button
                    @click="insertImageFromLibrary(image)"
                    class="p-1 bg-white rounded-full"
                    title="Insertar imagen"
                  >
                    <Icon name="lucide:plus" class="h-4 w-4 text-emerald-600" />
                  </button>
                  <button
                    @click="removeImageFromLibrary(index)"
                    class="p-1 bg-white rounded-full"
                    title="Eliminar de la biblioteca"
                  >
                    <Icon name="lucide:trash-2" class="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </div>

              <!-- Placeholder cuando no hay imágenes -->
              <div
                v-if="imageLibrary.length === 0"
                class="col-span-2 aspect-video border border-dashed border-gray-300 rounded-md flex items-center justify-center p-4"
              >
                <div class="text-center">
                  <Icon
                    name="lucide:image-off"
                    class="h-8 w-8 text-gray-300 mx-auto mb-2"
                  />
                  <p class="text-xs text-gray-400">
                    No hay imágenes en la biblioteca
                  </p>
                  <label
                    for="image-upload-empty"
                    class="mt-2 text-xs text-emerald-600 hover:text-emerald-700 cursor-pointer inline-block"
                  >
                    Subir imagen
                  </label>
                  <input
                    id="image-upload-empty"
                    type="file"
                    accept="image/*"
                    class="hidden"
                    @change="uploadImage"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Botones de acción -->
        <div class="p-4 border-t border-gray-200 bg-gray-50 space-y-3">
          <div class="flex gap-2">
            <button
              @click="exportContent"
              class="flex-1 py-2 px-4 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Icon name="lucide:download" class="h-4 w-4" />
              Exportar
            </button>
            <label
              for="import-json"
              class="flex-1 py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <Icon name="lucide:upload" class="h-4 w-4" />
              Importar
            </label>
            <input
              id="import-json"
              type="file"
              accept="application/json"
              class="hidden"
              @change="importContent"
            />
          </div>

          <button
            @click="togglePreviewMode"
            class="w-full py-2.5 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <Icon
              :name="previewMode ? 'lucide:edit-3' : 'lucide:eye'"
              class="h-4 w-4"
            />
            {{ previewMode ? "Editar" : "Vista Previa" }}
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
          <div
            class="flex-1 overflow-y-auto bg-gray-50"
            :class="{ flex: previewMode }"
          >
            <!-- Modo editor -->
            <div v-if="!previewMode" class="p-6">
              <!-- Tabs para plantillas y contenido -->
              <div
                class="bg-white rounded-lg shadow-sm border border-gray-200 mb-6"
              >
                <div class="border-b border-gray-200">
                  <div class="flex">
                    <button
                      @click="editorActiveTab = 'template'"
                      class="py-3 px-4 text-center text-sm font-medium"
                      :class="
                        editorActiveTab === 'template'
                          ? 'border-b-2 border-emerald-500 text-emerald-600'
                          : 'text-gray-500 hover:text-gray-700'
                      "
                    >
                      <div class="flex items-center gap-1">
                        <Icon name="lucide:layout-template" class="h-4 w-4" />
                        Plantillas
                      </div>
                    </button>
                    <button
                      @click="editorActiveTab = 'properties'"
                      class="py-3 px-4 text-center text-sm font-medium"
                      :class="
                        editorActiveTab === 'properties'
                          ? 'border-b-2 border-emerald-500 text-emerald-600'
                          : 'text-gray-500 hover:text-gray-700'
                      "
                    >
                      <div class="flex items-center gap-1">
                        <Icon name="lucide:settings" class="h-4 w-4" />
                        Propiedades
                      </div>
                    </button>
                    <button
                      @click="editorActiveTab = 'content'"
                      class="py-3 px-4 text-center text-sm font-medium"
                      :class="
                        editorActiveTab === 'content'
                          ? 'border-b-2 border-emerald-500 text-emerald-600'
                          : 'text-gray-500 hover:text-gray-700'
                      "
                    >
                      <div class="flex items-center gap-1">
                        <Icon name="lucide:file-text" class="h-4 w-4" />
                        Contenido
                      </div>
                    </button>
                  </div>
                </div>

                <!-- Contenido de la pestaña activa -->
                <div class="p-6">
                  <!-- Selección de plantilla -->
                  <div v-if="editorActiveTab === 'template'">
                    <h2
                      class="text-lg font-medium mb-3 text-gray-800 flex items-center gap-2"
                    >
                      <Icon
                        name="lucide:layout-template"
                        class="h-5 w-5 text-emerald-600"
                      />
                      Plantillas
                    </h2>
                    <div
                      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
                    >
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
                        <div
                          class="aspect-video bg-gray-100 mb-2 overflow-hidden"
                        >
                          <img
                            :src="template.thumbnail"
                            alt="Vista previa de plantilla"
                            class="w-full h-full object-cover"
                          />
                        </div>
                        <p class="font-medium text-center">
                          {{ template.name }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <!-- Propiedades de la plantilla -->
                  <div
                    v-if="
                      editorActiveTab === 'properties' &&
                      selectedTemplate &&
                      selectedTemplate !== 'none'
                    "
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
                        <label
                          class="block text-sm font-medium text-gray-700 mb-1"
                        >
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
                        <label
                          class="block text-sm font-medium text-gray-700 mb-1"
                        >
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
                        <label
                          class="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Fecha de Publicación
                        </label>
                        <input
                          v-model="fixedFields.date"
                          type="date"
                          class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                        />
                      </div>
                      <div>
                        <label
                          class="block text-sm font-medium text-gray-700 mb-1"
                        >
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
                        <label
                          class="block text-sm font-medium text-gray-700 mb-1"
                        >
                          URL de Imagen de Portada
                        </label>
                        <div class="flex gap-2">
                          <input
                            v-model="fixedFields.bannerImage"
                            type="text"
                            class="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                            placeholder="Ingrese URL de la imagen de portada"
                          />
                          <button
                            @click="showImageLibraryModal = true"
                            class="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
                            title="Seleccionar de la biblioteca"
                          >
                            <Icon
                              name="lucide:image"
                              class="h-5 w-5 text-gray-600"
                            />
                          </button>
                        </div>
                        <div
                          v-if="fixedFields.bannerImage"
                          class="mt-2 relative"
                        >
                          <img
                            :src="fixedFields.bannerImage"
                            alt="Vista previa de portada"
                            class="w-full h-48 object-cover rounded-md"
                          />
                        </div>
                      </div>
                      <div class="md:col-span-2">
                        <label
                          class="block text-sm font-medium text-gray-700 mb-1"
                        >
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

                  <!-- Contenido del artículo -->
                  <div v-if="editorActiveTab === 'content'">
                    <!-- Template Header (si hay una plantilla seleccionada) -->
                    <template
                      v-if="selectedTemplate && selectedTemplate !== 'none'"
                    >
                      <!-- Banner Template -->
                      <div
                        v-if="selectedTemplate === 'banner'"
                        class="relative mb-6"
                      >
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
                                  ? new Date(
                                      fixedFields.date
                                    ).toLocaleDateString()
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
                      <div
                        v-else-if="selectedTemplate === 'feature'"
                        class="mb-6"
                      >
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
                                ? new Date(
                                    fixedFields.date
                                  ).toLocaleDateString()
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
                            {{
                              fixedFields.summary || "Resumen del artículo..."
                            }}
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
                      <div
                        v-else-if="selectedTemplate === 'minimal'"
                        class="mb-6"
                      >
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
                                ? new Date(
                                    fixedFields.date
                                  ).toLocaleDateString()
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
                            {{
                              fixedFields.summary || "Resumen del artículo..."
                            }}
                          </p>
                        </div>
                      </div>
                    </template>

                    <!-- Content Grid with GridStack -->
                    <div
                      class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                      ref="contentGridRef"
                    >
                      <div class="p-6 editor-area">
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
                              Haga clic en los componentes para añadirlos al
                              contenido
                            </p>
                          </div>
                        </div>
                        <div v-else>
                          <div
                            ref="gridStackContainer"
                            class="grid-stack"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Modo vista previa dividida -->
            <template v-if="previewMode">
              <!-- Editor en modo vista previa -->
              <div class="w-1/2 p-6 border-r border-gray-300 overflow-y-auto">
                <!-- Template Header (si hay una plantilla seleccionada) -->
                <template
                  v-if="selectedTemplate && selectedTemplate !== 'none'"
                >
                  <!-- Banner Template -->
                  <div
                    v-if="selectedTemplate === 'banner'"
                    class="relative mb-6"
                  >
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
                  <div v-else-if="selectedTemplate === 'feature'" class="mb-6">
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
                  <div v-else-if="selectedTemplate === 'minimal'" class="mb-6">
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
                <div
                  class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                >
                  <div class="p-6 editor-area">
                    <div ref="gridStackContainer" class="grid-stack"></div>
                  </div>
                </div>
              </div>

              <!-- Vista previa en tiempo real -->
              <div class="w-1/2 p-6 overflow-y-auto bg-white">
                <div
                  class="sticky top-0 bg-white z-10 mb-4 pb-2 border-b border-gray-200"
                >
                  <div class="flex justify-between items-center">
                    <h3 class="font-medium text-gray-800">Vista previa</h3>
                    <select
                      v-model="previewDeviceSize"
                      class="text-sm border rounded-md p-1.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    >
                      <option value="desktop">Escritorio</option>
                      <option value="tablet">Tablet</option>
                      <option value="mobile">Móvil</option>
                    </select>
                  </div>
                </div>

                <!-- Simulador de dispositivo -->
                <div class="flex justify-center">
                  <div
                    class="bg-white border shadow-md overflow-auto transition-all duration-300"
                    :class="{
                      'w-full': previewDeviceSize === 'desktop',
                      'w-[768px]': previewDeviceSize === 'tablet',
                      'w-[375px]': previewDeviceSize === 'mobile',
                    }"
                  >
                    <!-- Template Header (si hay una plantilla seleccionada) -->
                    <template
                      v-if="selectedTemplate && selectedTemplate !== 'none'"
                    >
                      <!-- Banner Template -->
                      <div
                        v-if="selectedTemplate === 'banner'"
                        class="relative"
                      >
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
                                  ? new Date(
                                      fixedFields.date
                                    ).toLocaleDateString()
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
                      <div
                        v-else-if="selectedTemplate === 'feature'"
                        class="p-6"
                      >
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
                                ? new Date(
                                    fixedFields.date
                                  ).toLocaleDateString()
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
                            {{
                              fixedFields.summary || "Resumen del artículo..."
                            }}
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
                      <div
                        v-else-if="selectedTemplate === 'minimal'"
                        class="p-6"
                      >
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
                                ? new Date(
                                    fixedFields.date
                                  ).toLocaleDateString()
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
                            {{
                              fixedFields.summary || "Resumen del artículo..."
                            }}
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
            </template>
          </div>

          <!-- Panel de propiedades (aparece cuando hay un bloque seleccionado) -->
          <div
            v-if="selectedBlockId && !previewMode"
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
                    <div class="relative">
                      <div
                        ref="richTextEditor"
                        class="w-full p-3 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none min-h-[120px] max-h-[300px] overflow-y-auto"
                        contenteditable="true"
                        @input="handleRichTextInput"
                        @keyup="updateSelectedTextFormatting"
                        @mouseup="updateSelectedTextFormatting"
                        v-html="selectedBlock.content || ''"
                      ></div>
                      <div
                        class="absolute bottom-3 right-3 flex bg-white border rounded-md shadow-sm"
                      >
                        <button
                          @click="applyFormatting('bold')"
                          class="p-1.5 hover:bg-gray-100 border-r"
                          :class="{ 'bg-gray-100': textFormatState.bold }"
                          title="Negrita"
                        >
                          <Icon name="lucide:bold" class="h-4 w-4" />
                        </button>
                        <button
                          @click="applyFormatting('italic')"
                          class="p-1.5 hover:bg-gray-100 border-r"
                          :class="{ 'bg-gray-100': textFormatState.italic }"
                          title="Cursiva"
                        >
                          <Icon name="lucide:italic" class="h-4 w-4" />
                        </button>
                        <button
                          @click="applyFormatting('underline')"
                          class="p-1.5 hover:bg-gray-100 border-r"
                          :class="{ 'bg-gray-100': textFormatState.underline }"
                          title="Subrayado"
                        >
                          <Icon name="lucide:underline" class="h-4 w-4" />
                        </button>
                        <button
                          @click="insertLineBreak()"
                          class="p-1.5 hover:bg-gray-100"
                          title="Salto de línea"
                        >
                          <Icon
                            name="lucide:corner-down-left"
                            class="h-4 w-4"
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Opciones de formato de texto para todo el bloque -->
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Formato de bloque
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

                  <!-- Alineación de texto -->
                  <div class="mb-4">
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
                    <div class="flex gap-2">
                      <input
                        type="text"
                        :value="selectedBlock.content || ''"
                        class="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                        placeholder="Ingrese URL de la imagen"
                        @input="
                          updateBlockContent(
                            ($event.target as HTMLInputElement).value
                          )
                        "
                      />
                      <button
                        @click="showImageLibraryModal = true"
                        class="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
                        title="Seleccionar de la biblioteca"
                      >
                        <Icon
                          name="lucide:image"
                          class="h-5 w-5 text-gray-600"
                        />
                      </button>
                    </div>
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

                <!-- Propiedades de video -->
                <div v-if="selectedBlock.type === 'video'">
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Proveedor de video
                    </label>
                    <select
                      :value="selectedBlock.videoProps?.provider || 'youtube'"
                      class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                      @change="
                        updateVideoProps({
                          provider: ($event.target as HTMLSelectElement)
                            .value as 'youtube' | 'vimeo' | 'dailymotion',
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
                        updateVideoProps({
                          videoId: ($event.target as HTMLInputElement).value,
                        })
                      "
                    />
                    <p class="text-xs text-gray-500 mt-1">
                      <template
                        v-if="selectedBlock.videoProps?.provider === 'youtube'"
                      >
                        ID de YouTube (ej: dQw4w9WgXcQ de
                        https://www.youtube.com/watch?v=dQw4w9WgXcQ)
                      </template>
                      <template
                        v-else-if="
                          selectedBlock.videoProps?.provider === 'vimeo'
                        "
                      >
                        ID de Vimeo (ej: 123456789 de
                        https://vimeo.com/123456789)
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
                        updateVideoProps({
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
                        updateVideoProps({
                          aspectRatio: ($event.target as HTMLSelectElement)
                            .value as '16:9' | '4:3' | '1:1',
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
                        updateVideoProps({
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
                        updateVideoProps({
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
                    <div
                      class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none min-h-[100px]"
                      contenteditable="true"
                      @input="(e) => updateColumnContentRich(selectedBlockId as string, index, (e.target as HTMLElement).innerHTML)"
                      v-html="content || ''"
                    ></div>
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

    <!-- Modal de selección de imagen de la biblioteca -->
    <div
      v-if="showImageLibraryModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div
        class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto shadow-xl"
      >
        <div
          class="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-10"
        >
          <h2 class="text-xl font-bold flex items-center gap-2">
            <Icon name="lucide:image" class="h-5 w-5 text-emerald-600" />
            Seleccionar imagen
          </h2>
          <button
            @click="showImageLibraryModal = false"
            class="text-gray-500 hover:text-gray-700"
          >
            <Icon name="lucide:x" class="h-5 w-5" />
          </button>
        </div>

        <div class="p-6">
          <!-- Grid de imágenes -->
          <div class="grid grid-cols-3 gap-3">
            <div
              v-for="(image, index) in imageLibrary"
              :key="index"
              class="relative group aspect-square border rounded-md overflow-hidden cursor-pointer"
              @click="selectImageFromLibrary(image)"
            >
              <img
                :src="image.url"
                :alt="image.alt || 'Imagen de biblioteca'"
                class="w-full h-full object-cover"
              />
              <div
                class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                <div class="text-white font-medium">Seleccionar</div>
              </div>
            </div>

            <!-- Placeholder cuando no hay imágenes -->
            <div
              v-if="imageLibrary.length === 0"
              class="col-span-3 aspect-video border border-dashed border-gray-300 rounded-md flex items-center justify-center p-4"
            >
              <div class="text-center">
                <Icon
                  name="lucide:image-off"
                  class="h-8 w-8 text-gray-300 mx-auto mb-2"
                />
                <p class="text-gray-400">No hay imágenes en la biblioteca</p>
                <label
                  for="image-upload-modal"
                  class="mt-2 text-sm text-emerald-600 hover:text-emerald-700 cursor-pointer inline-block"
                >
                  Subir imagen
                </label>
                <input
                  id="image-upload-modal"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="uploadImage"
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
  | "video"
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

interface VideoProperties {
  provider: "youtube" | "vimeo" | "dailymotion";
  videoId: string;
  title: string;
  aspectRatio: "16:9" | "4:3" | "1:1";
  autoplay: boolean;
  controls: boolean;
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
  videoProps?: VideoProperties;
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

interface ImageItem {
  url: string;
  alt?: string;
  date: Date;
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
const richTextEditor = ref<HTMLElement | null>(null);
const gridStack = ref<any>(null);
const previewGridStack = ref<any>(null);
const previewMode = ref<boolean>(false);
const previewDeviceSize = ref<"desktop" | "tablet" | "mobile">("desktop");
const showColorPicker = ref(false);
const customColor = ref("");
const customDividerColor = ref("");
const activeTab = ref<"components" | "images">("components");
const editorActiveTab = ref<"template" | "properties" | "content">("template");
const imageLibrary = ref<ImageItem[]>([]);
const showImageLibraryModal = ref(false);

// Estado para el formato de texto seleccionado
const textFormatState = ref({
  bold: false,
  italic: false,
  underline: false,
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
  { type: "video", label: "Video" },
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
    case "video":
      return "lucide:video";
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

// Funciones para el editor de texto enriquecido
const updateSelectedTextFormatting = () => {
  if (!window.getSelection) return;

  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  // Verificar si hay texto seleccionado
  if (selection.toString().length === 0) {
    textFormatState.value = {
      bold: false,
      italic: false,
      underline: false,
    };
    return;
  }

  // Obtener el estado de formato del texto seleccionado
  textFormatState.value.bold = document.queryCommandState("bold");
  textFormatState.value.italic = document.queryCommandState("italic");
  textFormatState.value.underline = document.queryCommandState("underline");
};

const applyFormatting = (format: "bold" | "italic" | "underline") => {
  document.execCommand(format, false);
  updateSelectedTextFormatting();

  // Actualizar el contenido del bloque
  if (richTextEditor.value && selectedBlockId.value) {
    updateBlockContent(richTextEditor.value.innerHTML);
  }
};

const insertLineBreak = () => {
  if (!richTextEditor.value) return;

  // Insertar un salto de línea en la posición actual del cursor
  document.execCommand("insertHTML", false, "<br>");

  // Actualizar el contenido del bloque
  if (richTextEditor.value && selectedBlockId.value) {
    updateBlockContent(richTextEditor.value.innerHTML);
  }
};

const handleRichTextInput = (e: Event) => {
  if (richTextEditor.value && selectedBlockId.value) {
    // Guardar la posición del cursor
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);

    // Actualizar el contenido del bloque
    updateBlockContent(richTextEditor.value.innerHTML);

    // Restaurar la posición del cursor si es posible
    if (range && selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
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
  } else if (block.type === "video") {
    const videoProps = block.videoProps || {
      provider: "youtube",
      videoId: "",
      title: "Video embebido",
      aspectRatio: "16:9",
      autoplay: false,
      controls: true,
    };

    let embedUrl = "";
    let aspectRatioClass = "aspect-video"; // 16:9 por defecto

    if (videoProps.aspectRatio === "4:3") {
      aspectRatioClass = "aspect-[4/3]";
    } else if (videoProps.aspectRatio === "1:1") {
      aspectRatioClass = "aspect-square";
    }

    if (videoProps.provider === "youtube") {
      embedUrl = `https://www.youtube.com/embed/${
        videoProps.videoId
      }?autoplay=${videoProps.autoplay ? 1 : 0}&controls=${
        videoProps.controls ? 1 : 0
      }`;
    } else if (videoProps.provider === "vimeo") {
      embedUrl = `https://player.vimeo.com/video/${
        videoProps.videoId
      }?autoplay=${videoProps.autoplay ? 1 : 0}&controls=${
        videoProps.controls ? 1 : 0
      }`;
    } else if (videoProps.provider === "dailymotion") {
      embedUrl = `https://www.dailymotion.com/embed/video/${
        videoProps.videoId
      }?autoplay=${videoProps.autoplay ? 1 : 0}&controls=${
        videoProps.controls ? 1 : 0
      }`;
    }

    content += `
  <div class="w-full h-full">
    <div class="${aspectRatioClass} w-full overflow-hidden rounded-md bg-gray-100">
      ${
        videoProps.videoId
          ? `<iframe 
            src="${embedUrl}" 
            title="${videoProps.title || "Video embebido"}" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
            class="w-full h-full"
          ></iframe>`
          : `<div class="w-full h-full flex items-center justify-center bg-gray-100">
            <div class="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-gray-500">Ingrese un ID de video</p>
            </div>
          </div>`
      }
    </div>
    ${
      videoProps.title
        ? `<p class="text-sm text-gray-500 mt-2">${videoProps.title}</p>`
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
  } else if (block.type === "video") {
    const videoProps = block.videoProps || {
      provider: "youtube",
      videoId: "",
      title: "Video embebido",
      aspectRatio: "16:9",
      autoplay: false,
      controls: true,
    };

    let embedUrl = "";
    let aspectRatioClass = "aspect-video"; // 16:9 por defecto

    if (videoProps.aspectRatio === "4:3") {
      aspectRatioClass = "aspect-[4/3]";
    } else if (videoProps.aspectRatio === "1:1") {
      aspectRatioClass = "aspect-square";
    }

    if (videoProps.provider === "youtube") {
      embedUrl = `https://www.youtube.com/embed/${
        videoProps.videoId
      }?autoplay=${videoProps.autoplay ? 1 : 0}&controls=${
        videoProps.controls ? 1 : 0
      }`;
    } else if (videoProps.provider === "vimeo") {
      embedUrl = `https://player.vimeo.com/video/${
        videoProps.videoId
      }?autoplay=${videoProps.autoplay ? 1 : 0}&controls=${
        videoProps.controls ? 1 : 0
      }`;
    } else if (videoProps.provider === "dailymotion") {
      embedUrl = `https://www.dailymotion.com/embed/video/${
        videoProps.videoId
      }?autoplay=${videoProps.autoplay ? 1 : 0}&controls=${
        videoProps.controls ? 1 : 0
      }`;
    }

    content += `
  <div class="w-full h-full">
    <div class="${aspectRatioClass} w-full overflow-hidden rounded-md bg-gray-100">
      ${
        videoProps.videoId
          ? `<iframe 
            src="${embedUrl}" 
            title="${videoProps.title || "Video embebido"}" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
            class="w-full h-full"
          ></iframe>`
          : `<div class="w-full h-full flex items-center justify-center bg-gray-100">
            <div class="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-gray-500">Ingrese un ID de video</p>
            </div>
          </div>`
      }
    </div>
    ${
      videoProps.title
        ? `<p class="text-sm text-gray-500 mt-2">${videoProps.title}</p>`
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
      const content = (e.target as HTMLElement).innerHTML || "";
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
          (e.target as HTMLElement).innerHTML || ""
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

// Funciones para la biblioteca de imágenes
const uploadImage = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) return;

  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = (event) => {
    if (event.target && event.target.result) {
      // Agregar la imagen a la biblioteca
      imageLibrary.value.push({
        url: event.target.result as string,
        alt: file.name,
        date: new Date(),
      });

      // Limpiar el input para permitir subir la misma imagen nuevamente
      input.value = "";
    }
  };

  reader.readAsDataURL(file);
};

const removeImageFromLibrary = (index: number) => {
  imageLibrary.value.splice(index, 1);
};

const insertImageFromLibrary = (image: ImageItem) => {
  // Crear un nuevo bloque de imagen con la imagen seleccionada
  addComponent("image");

  // Obtener el último bloque añadido (que debería ser la imagen)
  const lastBlock = blocks.value[blocks.value.length - 1];
  if (lastBlock && lastBlock.type === "image") {
    // Actualizar la URL de la imagen
    lastBlock.content = image.url;
    if (image.alt) {
      lastBlock.imageProps = {
        ...lastBlock.imageProps,
        alt: image.alt,
      };
    }

    // Renderizar el bloque actualizado
    renderBlock(lastBlock);
  }
};

const selectImageFromLibrary = (image: ImageItem) => {
  // Si estamos seleccionando para la imagen de portada
  if (showImageLibraryModal.value) {
    fixedFields.value.bannerImage = image.url;
    showImageLibraryModal.value = false;
    return;
  }

  // Si hay un bloque de imagen seleccionado, actualizar su URL
  if (selectedBlock.value && selectedBlock.value.type === "image") {
    updateBlockContent(image.url);
    if (image.alt) {
      updateImageProps({ alt: image.alt });
    }
  }
};

// Actions
const selectTemplate = (templateId: string) => {
  selectedTemplate.value = templateId;
};

const selectBlock = (blockId: string) => {
  selectedBlockId.value = blockId;
  showColorPicker.value = false;

  // Re-renderizar los bloques para mostrar/ocultar controles
  renderBlocks();
};

const togglePreviewMode = () => {
  previewMode.value = !previewMode.value;

  if (previewMode.value) {
    // Inicializar la vista previa
    nextTick(() => {
      initPreviewGridStack();
    });
  } else {
    // Volver al modo de edición
    nextTick(() => {
      renderBlocks();
    });
  }
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

  // Default video properties
  const videoProps =
    componentType === "video"
      ? {
          provider: "youtube" as const,
          videoId: "",
          title: "Video embebido",
          aspectRatio: "16:9" as const,
          autoplay: false,
          controls: true,
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
    case "video":
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
    videoProps,
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

  showColorPicker.value = false;
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

// Método para actualizar contenido de columna con formato enriquecido
const updateColumnContentRich = (
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

const clearAllBlocks = () => {
  if (confirm("¿Está seguro de que desea eliminar todos los bloques?")) {
    blocks.value = [];
    if (gridStack.value) {
      gridStack.value.removeAll();
    }
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
    imageLibrary: imageLibrary.value,
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

const importContent = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) return;

  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = (event) => {
    if (event.target && event.target.result) {
      try {
        const importData = JSON.parse(event.target.result as string);

        // Validar que el JSON tenga la estructura esperada
        if (importData.blocks && Array.isArray(importData.blocks)) {
          // Importar datos
          if (importData.template) {
            selectedTemplate.value = importData.template;
          }

          if (importData.fixedFields) {
            fixedFields.value = importData.fixedFields;
          }

          blocks.value = importData.blocks;

          // Importar biblioteca de imágenes si existe
          if (
            importData.imageLibrary &&
            Array.isArray(importData.imageLibrary)
          ) {
            imageLibrary.value = importData.imageLibrary;
          }

          // Renderizar los bloques
          nextTick(() => {
            if (gridStack.value) {
              renderBlocks();
            } else {
              initGridStack();
              renderBlocks();
            }
          });

          // Mostrar mensaje de éxito
          alert("Contenido importado correctamente");
        } else {
          alert("El archivo JSON no tiene el formato correcto");
        }
      } catch (error) {
        alert("Error al procesar el archivo JSON");
        console.error(error);
      }
    }

    // Limpiar el input para permitir importar el mismo archivo nuevamente
    input.value = "";
  };

  reader.readAsText(file);
};

// Observar cambios en los bloques para re-renderizar
watch(
  blocks,
  () => {
    if (gridStack.value) {
      renderBlocks();
    }

    // Si estamos en modo vista previa, actualizar también la vista previa
    if (previewMode.value && previewGridStack.value) {
      renderPreviewBlocks();
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
