<template>
  <div
    class="mx-auto flex flex-col gap-4 h-full font-horsham max-w-xl px-6 md:px-0 pt-6 pb-24 text-start"
  >
    <!-- categoria -->
    <div class="font-bold uppercase tracking-wider text-black">
      NEWS ANALYSIS
    </div>
    <!-- titulo principal -->
    <h2 class="text-4xl font-semibold italic leading-11 text-black">
      Nayib Bukele dice que no devolverá a EE. UU. al hombre deportado por error
      a El Salvador
    </h2>
    <!-- descripcion corta -->
    <div
      class="text-xl leading-7 text-wild-sand-800/80 font-horsham font-extralight"
    >
      La reunión en el Despacho Oval entre Donald Trump y el presidente de El
      Salvador, Nayib Bukele, fue un ejemplo contundente del desafío de Trump a
      los tribunales federales.
    </div>
    <!-- botones de accion -->
    <span class="border-t-2 border-wild-sand-100 w-full h-1" />
    <div class="space-x-3">
      <UButton
        variant="outline"
        size="xl"
        class="rounded-full text-black ring-wild-sand-400"
        icon="lucide:share-2"
      />
      <UButton
        variant="outline"
        size="xl"
        class="rounded-full text-black ring-wild-sand-400"
        icon="lucide:book-marked"
      >
      </UButton>
    </div>
    <!-- Image -->
    <NuxtImg
      placeholder="https://placehold.co/1400x400"
      class="rounded-sm h-86 w-full object-cover"
    />
    <!-- texto -->
    <p class="font-horsham text-md font-thin leading-5 text-gray-400">
      Los creadores de contenido erótico afirman que su trabajo debería
      despenalizarse, ya que se les pide que contribuyan a las arcas fiscales.
    </p>
    <!-- autor -->

    <div class="flex flex-row gap-4 items-center">
      <UAvatar
        src="https://placehold.co/100x100"
        size="lg"
        class="rounded-full"
        alt="Avatar"
      />
      <div class="flex flex-col">
        <p class="text-wild-sand-950 tracking-wide font-medium">
          Por Cassandra Vinograd
        </p>
        <p class="text-wild-sand-900 font-thin">
          Reportando desde Kiev Ukrania
        </p>
      </div>
    </div>
    <!-- fecha de publicacion -->

    <div class="flex flex-row gap-1 items-center">
      <Icon name="lucide:clock" class="text-wild-sand-950" />
      <p class="text-sm text-wild-sand-950 font-thin">
        16 de abril de 2025 a las 05:03 ET
      </p>
    </div>

    <!-- texto principal -->
    <p class="text-xl font-horsham font-thin leading-8 text-gray-950">
      El mensaje de la reunión fue claro: ni Trump ni Bukele tenían intención
      alguna de devolver a Abrego Garcia, aunque la Corte Suprema haya
      dictaminado que debe regresar a Estados Unidos. El caso ha llegado a
      simbolizar el desafío de Trump a los tribunales y su voluntad de deportar
    </p>
    <p class="text-xl font-horsham font-thin leading-8 text-gray-950">
      La reunión, las cámaras de televisión captaron a Trump diciendo a Bukele
      que construyera más prisiones. Trump invitó a algunos de sus principales
      funcionarios a la reunión del lunes, gran parte de la cual se celebró ante
      las cámaras de los medios de comunicación. Bondi y Stephen Miller, quien
      es el arquitecto de la agenda de inmigración de Trump, acusaron a Abrego
      Garcia de pertenecer a la banda MS-13. Advertisement
    </p>
    <p class="text-xl font-horsham font-thin leading-8 text-gray-950">
      La reunión, las cámaras de televisión captaron a Trump diciendo a Bukele
      que construyera más prisiones. Trump invitó a algunos de sus principales
      funcionarios a la reunión del lunes, gran parte de la cual se celebró ante
      las cámaras de los medios de comunicación. Bondi y Stephen Miller, quien
      es el arquitecto de la agenda de inmigración de Trump, acusaron a Abrego
      Garcia de pertenecer a la banda MS-13. Advertisement
    </p>
    <p class="text-xl font-horsham font-thin leading-8 text-gray-950">
      La reunión, las cámaras de televisión captaron a Trump diciendo a Bukele
      que construyera más prisiones. Trump invitó a algunos de sus principales
      funcionarios a la reunión del lunes, gran parte de la cual se celebró ante
      las cámaras de los medios de comunicación. Bondi y Stephen Miller, quien
      es el arquitecto de la agenda de inmigración de Trump, acusaron a Abrego
      Garcia de pertenecer a la banda MS-13. Advertisement
    </p>
    <p class="text-xl font-horsham font-thin leading-8 text-gray-950">
      La reunión, las cámaras de televisión captaron a Trump diciendo a Bukele
      que construyera más prisiones. Trump invitó a algunos de sus principales
      funcionarios a la reunión del lunes, gran parte de la cual se celebró ante
      las cámaras de los medios de comunicación. Bondi y Stephen Miller, quien
      es el arquitecto de la agenda de inmigración de Trump, acusaron a Abrego
      Garcia de pertenecer a la banda MS-13. Advertisement
    </p>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: "Plantilla",
  },
  description: {
    type: String,
    default: "Plantilla",
  },
  image: {
    type: String,
    default: "https://placehold.co/1400x400",
  },
  autor: {
    type: String,
    default: "Autor",
  },
  fecha: {
    type: String,
    default: "Fecha",
  },
  categoria: {
    type: String,
    default: "Categoria",
  },
  tags: {
    type: Array,
    default: () => ["tag1", "tag2"],
  },
  contenido: {
    type: String,
    default: "Contenido",
  },
  contenido2: {
    type: String,
    default: "Contenido",
  },
});
</script>

<style></style>
