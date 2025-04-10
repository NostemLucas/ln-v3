<template>
  <div class="bg-white">
    <div class="container mx-auto px-4 py-16 md:px-6 lg:py-20">
      <!-- Encabezado de la página -->
      <div class="mx-auto mb-16 max-w-3xl text-center">
        <h1 class="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
          Tratamientos
        </h1>
        <div class="mx-auto mb-6 h-1 w-20 bg-blue-600"></div>
        <p class="leading-relaxed text-gray-600">
          En OncoClinic ofrecemos tratamientos oncológicos avanzados y
          personalizados para cada paciente, utilizando las técnicas más
          innovadoras y respaldadas por la evidencia científica.
        </p>
      </div>

      <!-- Trasplante de Médula Ósea -->
      <section class="mb-20">
        <div class="flex flex-col gap-8 lg:flex-row">
          <div class="lg:w-1/2">
            <div class="mb-6">
              <span
                class="text-sm font-medium tracking-wider text-blue-600 uppercase"
              >
                Tratamiento
              </span>
              <h2 class="mt-1 text-2xl font-bold text-slate-600 md:text-3xl">
                Trasplante De Médula Ósea
              </h2>
            </div>

            <p class="mb-4 text-gray-600">
              Un trasplante de médula ósea es un procedimiento médico que
              reemplaza la médula ósea por células sanas. Las células de
              reemplazo pueden provenir del propio paciente o de un donante.
            </p>

            <p class="mb-6 text-gray-600">
              La médula ósea es el tejido esponjoso que se encuentra dentro de
              los huesos y que consideramos verdadero de células madre
              hematopoyéticas. El trasplante se puede utilizar para tratar
              ciertos tipos de cáncer, como la leucemia o el linfoma, o
              enfermedades que afectan la producción de células de la sangre que
              fabrica la médula ósea.
            </p>

            <!-- Acordeones -->
            <div class="space-y-4">
              <div
                class="accordion-item overflow-hidden rounded-md border border-gray-200"
              >
                <button
                  class="accordion-trigger flex w-full items-center justify-between bg-white p-4 text-left hover:bg-gray-50"
                  @click="toggleAccordion('celulas-madre')"
                >
                  <span class="font-medium text-slate-600">
                    ¿Qué son las células madre?
                  </span>
                  <Icon
                    name="lucide:chevron-down"
                    class="h-5 w-5 text-slate-600 transition-transform duration-200"
                    :class="{
                      'rotate-180': activeAccordion === 'celulas-madre',
                    }"
                  />
                </button>
                <div
                  class="accordion-content overflow-hidden transition-all duration-300"
                  :class="
                    activeAccordion === 'celulas-madre' ? 'max-h-96' : 'max-h-0'
                  "
                >
                  <div class="border-t border-gray-200 bg-gray-50 p-4">
                    <p class="text-gray-600">
                      Las células madre son células especiales que pueden
                      reproducirse a sí mismas y convertirse en distintos tipos
                      de células que el cuerpo necesita. Hay varios tipos de
                      células madre y se encuentran en diferentes partes del
                      cuerpo, incluyendo la médula ósea, la sangre y el cordón
                      umbilical.
                    </p>
                  </div>
                </div>
              </div>

              <div
                class="accordion-item overflow-hidden rounded-md border border-gray-200"
              >
                <button
                  class="accordion-trigger flex w-full items-center justify-between bg-white p-4 text-left hover:bg-gray-50"
                  @click="toggleAccordion('como-funciona')"
                >
                  <span class="font-medium text-slate-600">
                    ¿Cómo funciona un trasplante de células madre/médula ósea?
                  </span>
                  <Icon
                    name="lucide:chevron-down"
                    class="h-5 w-5 text-slate-600 transition-transform duration-200"
                    :class="{
                      'rotate-180': activeAccordion === 'como-funciona',
                    }"
                  />
                </button>
                <div
                  class="accordion-content overflow-hidden transition-all duration-300"
                  :class="
                    activeAccordion === 'como-funciona' ? 'max-h-96' : 'max-h-0'
                  "
                >
                  <div class="border-t border-gray-200 bg-gray-50 p-4">
                    <p class="text-gray-600">
                      En general, este proceso conlleva recolectar las células
                      madre del donante, la eliminación de tratamientos de
                      preparación para el cuerpo para el receptor, la infusión
                      de células y la monitorización posterior del recuperación.
                    </p>
                    <p class="mt-2 text-gray-600">
                      A menudo, se puede utilizar el trasplante en el que las
                      células que provienen directa el paciente de trasplante
                      (autólogo).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="lg:w-1/2">
            <div class="overflow-hidden rounded-xl shadow-lg">
              <NuxtImg
                src="/treatments/medula.jpeg"
                alt="Quimioterapia"
                class="h-full w-full object-cover object-center"
              />
              <div class="bg-white p-6">
                <h3 class="mb-4 text-lg font-semibold text-gray-800">
                  ¿Qué tipos de trasplante de células madre existen?
                </h3>

                <div class="space-y-3">
                  <!-- Reemplazando selects con acordeones para consistencia -->
                  <div
                    class="accordion-item overflow-hidden rounded-md border border-gray-200"
                  >
                    <button
                      class="accordion-trigger flex w-full items-center justify-between bg-white p-4 text-left hover:bg-gray-50"
                      @click="toggleAccordion('trasplante1')"
                    >
                      <span class="font-medium text-slate-600">
                        Trasplante Alogénico
                      </span>
                      <Icon
                        name="lucide:chevron-down"
                        class="h-5 w-5 text-slate-600 transition-transform duration-200"
                        :class="{
                          'rotate-180': activeAccordion === 'trasplante1',
                        }"
                      />
                    </button>
                    <div
                      class="accordion-content overflow-hidden transition-all duration-300"
                      :class="
                        activeAccordion === 'trasplante1'
                          ? 'max-h-96'
                          : 'max-h-0'
                      "
                    >
                      <div class="border-t border-gray-200 bg-gray-50 p-4">
                        <p class="text-gray-600">
                          El trasplante alogénico utiliza células madre de un
                          donante compatible, que puede ser un familiar o un
                          donante no relacionado. Este tipo de trasplante es
                          común para tratar leucemias y otros trastornos de la
                          sangre.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    class="accordion-item overflow-hidden rounded-md border border-gray-200"
                  >
                    <button
                      class="accordion-trigger flex w-full items-center justify-between bg-white p-4 text-left hover:bg-gray-50"
                      @click="toggleAccordion('trasplante2')"
                    >
                      <span class="font-medium text-slate-600">
                        Trasplante Autólogo
                      </span>
                      <Icon
                        name="lucide:chevron-down"
                        class="h-5 w-5 text-slate-600 transition-transform duration-200"
                        :class="{
                          'rotate-180': activeAccordion === 'trasplante2',
                        }"
                      />
                    </button>
                    <div
                      class="accordion-content overflow-hidden transition-all duration-300"
                      :class="
                        activeAccordion === 'trasplante2'
                          ? 'max-h-96'
                          : 'max-h-0'
                      "
                    >
                      <div class="border-t border-gray-200 bg-gray-50 p-4">
                        <p class="text-gray-600">
                          En el trasplante autólogo, se utilizan las propias
                          células madre del paciente. Estas se recolectan antes
                          de un tratamiento intensivo como quimioterapia o
                          radioterapia, y luego se reinfunden para restaurar la
                          función de la médula ósea.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    class="accordion-item overflow-hidden rounded-md border border-gray-200"
                  >
                    <button
                      class="accordion-trigger flex w-full items-center justify-between bg-white p-4 text-left hover:bg-gray-50"
                      @click="toggleAccordion('trasplante3')"
                    >
                      <span class="font-medium text-slate-600">
                        Trasplante de Cordón Umbilical
                      </span>
                      <Icon
                        name="lucide:chevron-down"
                        class="h-5 w-5 text-slate-600 transition-transform duration-200"
                        :class="{
                          'rotate-180': activeAccordion === 'trasplante3',
                        }"
                      />
                    </button>
                    <div
                      class="accordion-content overflow-hidden transition-all duration-300"
                      :class="
                        activeAccordion === 'trasplante3'
                          ? 'max-h-96'
                          : 'max-h-0'
                      "
                    >
                      <div class="border-t border-gray-200 bg-gray-50 p-4">
                        <p class="text-gray-600">
                          Este tipo de trasplante utiliza células madre de la
                          sangre del cordón umbilical de recién nacidos. Estas
                          células son inmaduras y pueden adaptarse mejor al
                          receptor, reduciendo el riesgo de rechazo.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Inmunoterapia -->
      <section class="mb-20">
        <div class="flex flex-col gap-8 lg:flex-row-reverse">
          <div class="lg:w-1/2">
            <div class="mb-6">
              <span
                class="text-sm font-medium tracking-wider text-blue-600 uppercase"
              >
                Tratamiento
              </span>
              <h2 class="mt-1 text-2xl font-bold text-slate-600 md:text-3xl">
                Inmunoterapia
              </h2>
            </div>

            <p class="mb-6 text-gray-600">
              La inmunoterapia es un tipo de tratamiento para el cáncer. Utiliza
              sustancias producidas por el cuerpo o en un laboratorio para
              mejorar el sistema inmunitario y ayudarlo a encontrar y destruir
              células cancerosas.
            </p>

            <!-- Acordeones -->
            <div class="space-y-4">
              <div
                class="accordion-item overflow-hidden rounded-md border border-gray-200"
              >
                <button
                  class="accordion-trigger flex w-full items-center justify-between bg-white p-4 text-left hover:bg-gray-50"
                  @click="toggleAccordion('inmunoterapia-cancer')"
                >
                  <span class="font-medium text-slate-600">
                    ¿Cómo Se Usa La Inmunoterapia Para Tratar El Cáncer?
                  </span>
                  <Icon
                    name="lucide:chevron-down"
                    class="h-5 w-5 text-slate-600 transition-transform duration-200"
                    :class="{
                      'rotate-180': activeAccordion === 'inmunoterapia-cancer',
                    }"
                  />
                </button>
                <div
                  class="accordion-content overflow-hidden transition-all duration-300"
                  :class="
                    activeAccordion === 'inmunoterapia-cancer'
                      ? 'max-h-96'
                      : 'max-h-0'
                  "
                >
                  <div class="border-t border-gray-200 bg-gray-50 p-4">
                    <p class="text-gray-600">
                      La inmunoterapia es un tratamiento que utiliza ciertas
                      partes del sistema inmunitario de una persona para
                      combatir enfermedades como el cáncer. Esto se puede hacer
                      de varias maneras: estimulando su propio sistema
                      inmunitario para que trabaje más intensamente o de manera
                      más específica para atacar las células cancerosas, o
                      administrando componentes del sistema inmunitario, como
                      proteínas producidas en el laboratorio, para atacar a las
                      células cancerosas.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-6 space-y-4">
              <!-- Reemplazando selects con acordeones para consistencia -->
              <div
                class="accordion-item overflow-hidden rounded-md border border-gray-200"
              >
                <button
                  class="accordion-trigger flex w-full items-center justify-between bg-white p-4 text-left hover:bg-gray-50"
                  @click="toggleAccordion('anticuerpos')"
                >
                  <span class="font-medium text-slate-600">
                    Anticuerpos Monoclonales Y Sus Efectos Secundarios
                  </span>
                  <Icon
                    name="lucide:chevron-down"
                    class="h-5 w-5 text-slate-600 transition-transform duration-200"
                    :class="{
                      'rotate-180': activeAccordion === 'anticuerpos',
                    }"
                  />
                </button>
                <div
                  class="accordion-content overflow-hidden transition-all duration-300"
                  :class="
                    activeAccordion === 'anticuerpos' ? 'max-h-96' : 'max-h-0'
                  "
                >
                  <div class="border-t border-gray-200 bg-gray-50 p-4">
                    <p class="text-gray-600">
                      Los anticuerpos monoclonales son proteínas creadas en
                      laboratorio diseñadas para atacar antígenos específicos en
                      las células cancerosas. Los efectos secundarios pueden
                      incluir reacciones alérgicas, fatiga, náuseas y riesgo de
                      infección. La gravedad varía según el tipo específico de
                      anticuerpo y la condición del paciente.
                    </p>
                  </div>
                </div>
              </div>

              <div
                class="accordion-item overflow-hidden rounded-md border border-gray-200"
              >
                <button
                  class="accordion-trigger flex w-full items-center justify-between bg-white p-4 text-left hover:bg-gray-50"
                  @click="toggleAccordion('inhibidores')"
                >
                  <span class="font-medium text-slate-600">
                    Inhibidores De Puntos De Control Inmunitario
                  </span>
                  <Icon
                    name="lucide:chevron-down"
                    class="h-5 w-5 text-slate-600 transition-transform duration-200"
                    :class="{
                      'rotate-180': activeAccordion === 'inhibidores',
                    }"
                  />
                </button>
                <div
                  class="accordion-content overflow-hidden transition-all duration-300"
                  :class="
                    activeAccordion === 'inhibidores' ? 'max-h-96' : 'max-h-0'
                  "
                >
                  <div class="border-t border-gray-200 bg-gray-50 p-4">
                    <p class="text-gray-600">
                      Estos medicamentos bloquean las proteínas que impiden que
                      el sistema inmunitario ataque las células cancerosas. Al
                      desactivar estos "frenos" del sistema inmunitario,
                      permiten que las células inmunitarias reconozcan y
                      destruyan las células cancerosas de manera más efectiva.
                    </p>
                  </div>
                </div>
              </div>

              <div
                class="accordion-item overflow-hidden rounded-md border border-gray-200"
              >
                <button
                  class="accordion-trigger flex w-full items-center justify-between bg-white p-4 text-left hover:bg-gray-50"
                  @click="toggleAccordion('terapias-t')"
                >
                  <span class="font-medium text-slate-600">
                    Terapias De Células T
                  </span>
                  <Icon
                    name="lucide:chevron-down"
                    class="h-5 w-5 text-slate-600 transition-transform duration-200"
                    :class="{
                      'rotate-180': activeAccordion === 'terapias-t',
                    }"
                  />
                </button>
                <div
                  class="accordion-content overflow-hidden transition-all duration-300"
                  :class="
                    activeAccordion === 'terapias-t' ? 'max-h-96' : 'max-h-0'
                  "
                >
                  <div class="border-t border-gray-200 bg-gray-50 p-4">
                    <p class="text-gray-600">
                      Las terapias de células T, como CAR-T, modifican
                      genéticamente las células T del paciente para que
                      reconozcan y ataquen las células cancerosas. Estas células
                      modificadas se multiplican en el cuerpo y pueden
                      proporcionar protección a largo plazo contra el cáncer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="lg:w-1/2">
            <div class="overflow-hidden rounded-xl shadow-lg">
              <NuxtImg
                src="/treatments/inmunoterapia.jpg"
                alt="Quimioterapia"
                class="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Quimioterapia -->
      <section>
        <div class="flex flex-col gap-8 lg:flex-row">
          <div class="lg:w-1/2">
            <div class="mb-6">
              <span
                class="text-sm font-medium tracking-wider text-blue-600 uppercase"
              >
                Tratamiento
              </span>
              <h2 class="mt-1 text-2xl font-bold text-slate-600 md:text-3xl">
                Quimioterapia
              </h2>
            </div>

            <p class="mb-4 text-gray-600">
              La quimioterapia es el uso de fármacos para destruir las células
              cancerosas. Este tipo de tratamiento contra el cáncer actúa sobre
              las células cancerosas, matando las células y frenando su avance.
            </p>

            <p class="mb-6 text-gray-600">
              La quimioterapia se puede usar como tratamiento principal o como
              terapia adyuvante (después de la cirugía o radioterapia). Existen
              varios tipos: "quimioterapia estándar", "quimioterapia
              tradicional" y "quimioterapia citotóxica".
            </p>

            <!-- Acordeones -->
            <div class="space-y-4">
              <div
                class="accordion-item overflow-hidden rounded-md border border-gray-200"
              >
                <button
                  class="accordion-trigger flex w-full items-center justify-between bg-white p-4 text-left hover:bg-gray-50"
                  @click="toggleAccordion('quimioterapia-cancer')"
                >
                  <span class="font-medium text-slate-600">
                    ¿Cómo Trata La Quimioterapia El Cáncer?
                  </span>
                  <Icon
                    name="lucide:chevron-down"
                    class="h-5 w-5 text-slate-600 transition-transform duration-200"
                    :class="{
                      'rotate-180': activeAccordion === 'quimioterapia-cancer',
                    }"
                  />
                </button>
                <div
                  class="accordion-content overflow-hidden transition-all duration-300"
                  :class="
                    activeAccordion === 'quimioterapia-cancer'
                      ? 'max-h-96'
                      : 'max-h-0'
                  "
                >
                  <div class="border-t border-gray-200 bg-gray-50 p-4">
                    <p class="text-gray-600">
                      La quimioterapia es tratada por un médico oncólogo y llega
                      a todas las partes del cuerpo. Existen muchos tipos
                      diferentes de quimioterapia que funcionan de distintas
                      maneras para destruir las células cancerosas o impedir que
                      estas crezcan más rápido. Una célula durante puede pasar a
                      través de varias fases del ciclo celular.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-6 space-y-4">
              <!-- Reemplazando selects con acordeones para consistencia -->
              <div
                class="accordion-item overflow-hidden rounded-md border border-gray-200"
              >
                <button
                  class="accordion-trigger flex w-full items-center justify-between bg-white p-4 text-left hover:bg-gray-50"
                  @click="toggleAccordion('ciclos')"
                >
                  <span class="font-medium text-slate-600">
                    ¿Cuántos Ciclos Típicos Necesitaré Quimioterapia?
                  </span>
                  <Icon
                    name="lucide:chevron-down"
                    class="h-5 w-5 text-slate-600 transition-transform duration-200"
                    :class="{
                      'rotate-180': activeAccordion === 'ciclos',
                    }"
                  />
                </button>
                <div
                  class="accordion-content overflow-hidden transition-all duration-300"
                  :class="activeAccordion === 'ciclos' ? 'max-h-96' : 'max-h-0'"
                >
                  <div class="border-t border-gray-200 bg-gray-50 p-4">
                    <p class="text-gray-600">
                      El número de ciclos de quimioterapia varía según el tipo
                      de cáncer, su etapa y la respuesta del paciente al
                      tratamiento. Generalmente, los pacientes reciben entre 4 y
                      8 ciclos, pero esto puede variar significativamente según
                      el plan de tratamiento personalizado.
                    </p>
                  </div>
                </div>
              </div>

              <div
                class="accordion-item overflow-hidden rounded-md border border-gray-200"
              >
                <button
                  class="accordion-trigger flex w-full items-center justify-between bg-white p-4 text-left hover:bg-gray-50"
                  @click="toggleAccordion('duracion')"
                >
                  <span class="font-medium text-slate-600">
                    ¿Cuánto Dura Un Ciclo De Quimioterapia?
                  </span>
                  <Icon
                    name="lucide:chevron-down"
                    class="h-5 w-5 text-slate-600 transition-transform duration-200"
                    :class="{
                      'rotate-180': activeAccordion === 'duracion',
                    }"
                  />
                </button>
                <div
                  class="accordion-content overflow-hidden transition-all duration-300"
                  :class="
                    activeAccordion === 'duracion' ? 'max-h-96' : 'max-h-0'
                  "
                >
                  <div class="border-t border-gray-200 bg-gray-50 p-4">
                    <p class="text-gray-600">
                      Un ciclo de quimioterapia típicamente dura entre 2 y 4
                      semanas. Incluye el período de administración del
                      medicamento seguido por un período de descanso para
                      permitir que el cuerpo se recupere. La duración exacta
                      depende del régimen específico de tratamiento.
                    </p>
                  </div>
                </div>
              </div>

              <div
                class="accordion-item overflow-hidden rounded-md border border-gray-200"
              >
                <button
                  class="accordion-trigger flex w-full items-center justify-between bg-white p-4 text-left hover:bg-gray-50"
                  @click="toggleAccordion('tipos-quimio')"
                >
                  <span class="font-medium text-slate-600">
                    ¿Qué Tipos Diferentes De Quimioterapia Hay?
                  </span>
                  <Icon
                    name="lucide:chevron-down"
                    class="h-5 w-5 text-slate-600 transition-transform duration-200"
                    :class="{
                      'rotate-180': activeAccordion === 'tipos-quimio',
                    }"
                  />
                </button>
                <div
                  class="accordion-content overflow-hidden transition-all duration-300"
                  :class="
                    activeAccordion === 'tipos-quimio' ? 'max-h-96' : 'max-h-0'
                  "
                >
                  <div class="border-t border-gray-200 bg-gray-50 p-4">
                    <p class="text-gray-600">
                      Existen varios tipos de quimioterapia, incluyendo:
                    </p>
                    <ul class="mt-2 list-inside list-disc text-gray-600">
                      <li>
                        Quimioterapia oral (en forma de píldoras o cápsulas)
                      </li>
                      <li>Quimioterapia intravenosa (a través de una vena)</li>
                      <li>
                        Quimioterapia intratecal (en el líquido cefalorraquídeo)
                      </li>
                      <li>Quimioterapia intraarterial (en una arteria)</li>
                      <li>
                        Quimioterapia intraperitoneal (en la cavidad abdominal)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="lg:w-1/2">
            <div class="overflow-hidden rounded-xl shadow-lg">
              <NuxtImg
                src="/treatments/quimio.jpg"
                alt="Quimioterapia"
                class="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// Estado para los acordeones
const activeAccordion = ref<string | null>(null);

// Función para alternar acordeones
const toggleAccordion = (id: string) => {
  if (activeAccordion.value === id) {
    activeAccordion.value = null;
  } else {
    activeAccordion.value = id;
  }
};

// Cerrar acordeones al hacer clic fuera
const handleClickOutside = (event: MouseEvent) => {
  if (
    activeAccordion.value &&
    !(event.target as Element).closest(".accordion-item")
  ) {
    activeAccordion.value = null;
  }
};

// Agregar/eliminar event listener para cerrar acordeones al hacer clic fuera
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
/* Estilos para los acordeones */
.accordion-content {
  transition: max-height 0.3s ease-in-out;
}

/* Asegurar que los acordeones estén por encima de otros elementos */
.accordion-item {
  position: relative;
  z-index: 5;
}

/* Estilos para el contenedor */
.container {
  max-width: 1200px;
}

/* Estilos responsivos */
@media (max-width: 1023px) {
  .lg\:w-1\/2 {
    width: 100%;
  }

  .lg\:flex-row,
  .lg\:flex-row-reverse {
    flex-direction: column;
  }

  /* Mejorar espaciado en móvil */
  section {
    margin-bottom: 3rem;
  }

  h2 {
    font-size: 1.75rem;
  }

  .accordion-trigger {
    padding: 0.75rem;
  }
}

/* Mejoras de accesibilidad */
.accordion-trigger:focus {
  outline: 2px solid rgba(59, 130, 246, 0.5);
  outline-offset: -2px;
}

/* Animación suave para todos los elementos interactivos */
button {
  transition: all 0.2s ease-in-out;
}
</style>
