<template>
  <div class="w-full h-full">
    <div class="flex flex-col md:flex-row gap-4 h-full">
      <div class="flex flex-col w-full md:w-[50%]">
        <!-- contenido de edicion -->
        <div v-if="selectedTab === 'informacion'">
          <div
            class="flex flex-row w-full bg-wild-sand-50 rounded p-4 gap-3 items-start"
          >
            <Icon
              name="lucide:clock"
              class="text-3xl mt-1 text-wild-sand-700"
            />
            <div class="flex flex-col">
              <h1 class="font-bold text-base">
                Se envió para revisión el 9 de abril
              </h1>
              <p class="text-sm text-wild-sand-700">
                Tu publicación está siendo revisada. El proceso de verificación
                puede tardar hasta cinco días. No se mostrará públicamente hasta
                que haya sido aprobada.
              </p>
            </div>
          </div>

          <div class="space-y-2 pt-3">
            <NuxtImg
              src="https://placehold.co/1400x400"
              class="w-full h-48 object-cover rounded-2xl"
            />
          </div>

          <div class="flex flex-row gap-2 mt-4">
            <UButton
              variant="solid"
              label="Actualizar logotipo"
              class="px-4 py-2 bg-wild-sand-100 text-wild-sand-950 hover:bg-wild-sand-200 transition-colors duration-400 ease-in"
            />

            <UButton
              variant="solid"
              label="Actualizar Foto de Portada"
              class="px-4 py-2 bg-wild-sand-100 text-wild-sand-950 hover:bg-wild-sand-200 transition-colors duration-400 ease-in"
            />
          </div>
          <div class="mt-4">
            <USeparator />
            <div class="grid grid-cols-6 gap-2.5 text-sm py-3">
              <div class="col-span-2 font-semibold">
                Nombre visible al publico
              </div>
              <div class="col-span-4">
                <UButton
                  label="Nombre la noticia"
                  variant="link"
                  class="flex flex-row justify-between items-center w-full text-wild-sand-950 hover:text-wild-sand-700"
                  trailing-icon="lucide:chevron-right"
                  @click="selectedTab = 'title'"
                />
              </div>
            </div>
          </div>
          <div class="">
            <USeparator />
            <div class="grid grid-cols-6 gap-2.5 text-sm py-3">
              <div class="col-span-2 font-semibold">Descripcion</div>
              <div class="col-span-4 text-wild-sand-600">
                Agregar una breve descripcion sobre esta publicación
              </div>
            </div>
          </div>
          <div class="">
            <USeparator />
            <div class="grid grid-cols-6 gap-2.5 text-sm py-3">
              <div class="col-span-2 font-semibold">Contenido</div>
              <div class="col-span-4 text-wild-sand-600">
                Contenido de la publicación
              </div>
            </div>
          </div>
          <div class="">
            <USeparator />
            <div class="grid grid-cols-6 gap-2.5 text-sm py-3">
              <div class="col-span-2 font-semibold">Fotos</div>
              <div class="col-span-4 text-wild-sand-600">
                2 Imagenes pendientes de revisión
              </div>
            </div>
          </div>
          <div class="">
            <USeparator />
            <div class="grid grid-cols-6 gap-2.5 text-sm py-3">
              <div class="col-span-2 font-semibold">Categorias</div>
              <div class="col-span-4 text-wild-sand-600">
                2 Categorias Pendientes de Revisión
              </div>
            </div>
          </div>
        </div>
        <div v-if="selectedTab === 'title'">
          <TitleProperty @close="selectedTab = 'informacion'" />
        </div>
      </div>

      <!-- Vista previa -->
      <div
        class="w-full md:w-[50%] p-4 rounded text-white h-full text-center overflow-hidden"
      >
        <DevicePreviewContainer />
        <!-- Texto 1: Descripción de la vista previa -->
        <p
          class="mt-8 text-sm font-semibold text-wild-sand-500 flex flex-col gap-1 justify-center items-center"
        >
          Vista previa de la información en vivo.
          <span
            class="border-t-3 border-wild-sand-400 border-dashed h-1 w-[55%]"
          />
        </p>

        <!-- Texto 2: Acción para abrir en nueva pestaña -->
        <UButton
          href="#"
          variant="link"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center gap-1 text-sm text-blue-500"
        >
          Ver en una nueva pestaña
          <Icon name="lucide:external-link" class="w-4 h-4" />
        </UButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Icon from "@nuxt/ui/runtime/components/Icon.vue";
import DevicePreviewContainer from "../preview/DevicePreviewContainer.vue";
import TitleProperty from "./properties/TitleProperty.vue";
const selectedTab = ref("informacion");
</script>
