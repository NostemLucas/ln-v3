<template>
  <div
    class="container mx-auto flex flex-col gap-4 w-full h-full font-horsham px-[30rem] py-20"
  >
    <!-- categoria -->
    <div class="font-bold uppercase">NEWS ANALYSIS</div>
    <!-- titulo principal -->
    <h2 class="text-4xl font-black italic">
      Nayib Bukele dice que no devolverá a EE. UU. al hombre deportado por error
      a El Salvador
    </h2>
    <!-- descripcion corta -->
    <div>
      La reunión en el Despacho Oval entre Donald Trump y el presidente de El
      Salvador, Nayib Bukele, fue un ejemplo contundente del desafío de Trump a
      los tribunales federales.
    </div>
    <!-- botones de accion -->
    <span class="border-t-2 border-wild-sand-500 w-full h-1" />
    <div class="space-x-3">
      <UButton
        variant="outline"
        size="xl"
        class="rounded-full"
        icon="lucide:share-2"
      />
      <UButton
        variant="outline"
        size="xl"
        class="rounded-full"
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
    <p>
      El presidente Donald Trump y el presidente de El Salvador, Nayib Bukele,
      mantuvieron el lunes una reunión bilateral en el Despacho Oval. “Por
      supuesto que no voy a hacerlo”, dijo Bukele cuando los periodistas le
      preguntaron si estaba dispuesto a ayudar a devolver a un migrante
      deportado por error.Credit...Eric Lee/The New York Times
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
        <p class="text-sm text-wild-sand-700">Por: Nombre del autor</p>
        <p>repórtando desde</p>
      </div>
    </div>
    <!-- fecha de publicacion -->

    <div class="flex flex-row gap-4 items-center">
      <Icon name="lucide:clock" class="text-wild-sand-700" />
      <p class="text-sm text-wild-sand-700">Fecha de publicación dededdsd</p>
    </div>

    <!-- texto principal -->
    <p>
      El mensaje de la reunión fue claro: ni Trump ni Bukele tenían intención
      alguna de devolver a Abrego Garcia, aunque la Corte Suprema haya
      dictaminado que debe regresar a Estados Unidos. El caso ha llegado a
      simbolizar el desafío de Trump a los tribunales y su voluntad de deportar
      <br />
      a personas sin el debido proceso. Trump también barajó la posibilidad de
      enviar a ciudadanos estadounidenses condenados por delitos violentos a
      prisión en El Salvador, aunque dijo que la fiscal general Pam Bondi aún
      estaba estudiando la legalidad de la propuesta. “Si se trata de un
      delincuente local, no tengo ningún problema”, dijo Trump. “Estoy hablando
      de gente violenta. Hablo de gente realmente mala”. Antes de que se
      <br />
      permitiera a todo el grupo de periodistas entrar en el Despacho Oval para
      la reunión, las cámaras de televisión captaron a Trump diciendo a Bukele
      que construyera más prisiones. Trump también barajó la posibilidad de
      enviar a ciudadanos estadounidenses condenados por delitos violentos a
      prisión en El Salvador, aunque dijo que la fiscal general Pam Bondi aún
      estaba estudiando la legalidad de la propuesta. “Si se trata de un
      delincuente local, no tengo ningún problema”, dijo Trump. “Estoy hablando
      de gente violenta. Hablo de gente realmente mala”. Antes de que se
      permitiera a todo el grupo de periodistas entrar en el Despacho Oval para
      <br />
      la reunión, las cámaras de televisión captaron a Trump diciendo a Bukele
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
