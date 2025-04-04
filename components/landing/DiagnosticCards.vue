<template>
  <section class="relative overflow-hidden py-20">
    <!-- Fondo con patrón molecular sutil -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-white to-blue-50/40"
    ></div>

    <div class="relative z-10 container mx-auto px-4 md:px-6">
      <!-- Encabezado de sección con estilo consistente -->
      <div class="mx-auto mb-16 max-w-3xl text-center">
        <h2 class="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
          Nuestros Diagnósticos
        </h2>
        <div class="mx-auto mb-6 h-1 w-20 bg-blue-600"></div>
        <p class="leading-relaxed text-gray-600">
          En OncoClinic utilizamos métodos diagnósticos avanzados y tecnología
          de última generación para ofrecer resultados precisos que guían
          tratamientos personalizados para cada paciente.
        </p>
      </div>

      <!-- Diseño hexagonal innovador -->
      <div class="relative mx-auto max-w-6xl">
        <!-- Línea conectora central -->
        <div
          class="absolute top-8 bottom-8 left-1/2 hidden w-0.5 bg-gradient-to-b from-blue-200 via-blue-400 to-blue-200 lg:block"
        ></div>

        <!-- Contenedor de diagnósticos -->
        <div class="space-y-16 lg:space-y-32">
          <!-- Anatomía Patológica -->
          <div class="group">
            <div class="flex flex-col items-center lg:flex-row">
              <!-- Hexágono izquierdo (visible en desktop) -->
              <div class="hidden pr-16 text-right lg:block lg:w-1/2">
                <div
                  class="transform transition-transform duration-500 group-hover:translate-x-3 group-hover:-translate-y-2"
                >
                  <h3 class="mb-3 text-2xl font-bold text-gray-800">
                    Anatomía Patológica
                  </h3>
                  <p
                    class="mb-4 ml-auto max-w-lg leading-relaxed text-gray-600"
                  >
                    Es un procedimiento médico que consiste en reemplazar la
                    médula ósea dañada o defectuosa de un paciente con células
                    madre.
                  </p>
                  <a
                    href="#"
                    class="inline-flex items-center font-medium text-blue-600 transition-colors hover:text-blue-800"
                  >
                    Leer más
                    <Icon name="lucide:chevron-right" class="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>

              <!-- Hexágono central -->
              <div class="flex w-full justify-center lg:w-auto">
                <div
                  class="relative transition-transform duration-500 group-hover:scale-105"
                >
                  <!-- Forma hexagonal -->
                  <div
                    class="hexagon-outer bg-gradient-to-br from-blue-500 to-blue-700"
                  >
                    <div class="hexagon-inner bg-white">
                      <div
                        class="hexagon-content bg-gradient-to-br from-blue-500 to-blue-700"
                      >
                        <div
                          class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center opacity-30"
                        ></div>
                        <div
                          class="relative z-10 flex items-center justify-center"
                        >
                          <lucid
                            name="lucide:microscope"
                            class="h-16 w-16 text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Punto conector -->
                  <div
                    class="absolute top-1/2 left-1/2 z-20 hidden h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-4 border-blue-500 bg-white lg:block"
                  ></div>
                </div>
              </div>

              <!-- Texto para móvil y tablet + texto derecho para desktop -->
              <div
                class="mt-6 text-center lg:mt-0 lg:w-1/2 lg:pl-16 lg:text-left"
              >
                <!-- Visible solo en móvil/tablet -->
                <div class="lg:hidden">
                  <h3 class="mb-3 text-2xl font-bold text-gray-800">
                    Anatomía Patológica
                  </h3>
                  <p class="mb-4 leading-relaxed text-gray-600">
                    Es un procedimiento médico que consiste en reemplazar la
                    médula ósea dañada o defectuosa de un paciente con células
                    madre.
                  </p>
                  <a
                    href="#"
                    class="inline-flex items-center font-medium text-blue-600 transition-colors hover:text-blue-800"
                  >
                    Leer más
                    <Icon name="lucide:chevron-right" class="ml-1 h-4 w-4" />
                  </a>
                </div>

                <!-- Visible solo en desktop -->
                <div
                  class="hidden transform transition-transform duration-500 group-hover:-translate-x-3 group-hover:-translate-y-2 lg:block"
                >
                  <h4 class="mb-2 text-lg font-semibold text-blue-700">
                    Aplicaciones clínicas
                  </h4>
                  <ul class="space-y-2 text-gray-600">
                    <li class="flex items-start">
                      <div
                        class="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-100"
                      >
                        <Icon
                          name="lucide:check"
                          class="h-3 w-3 text-blue-600"
                        />
                      </div>
                      <span class="ml-2">Diagnóstico preciso de tumores</span>
                    </li>
                    <li class="flex items-start">
                      <div
                        class="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-100"
                      >
                        <Icon
                          name="lucide:check"
                          class="h-3 w-3 text-blue-600"
                        />
                      </div>
                      <span class="ml-2">Clasificación histológica</span>
                    </li>
                    <li class="flex items-start">
                      <div
                        class="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-100"
                      >
                        <Icon
                          name="lucide:check"
                          class="h-3 w-3 text-blue-600"
                        />
                      </div>
                      <span class="ml-2">
                        Evaluación de márgenes quirúrgicos
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Secuenciación Genética -->
          <div class="group">
            <div class="flex flex-col items-center lg:flex-row">
              <!-- Texto para móvil y tablet + texto izquierdo para desktop -->
              <div class="text-center lg:w-1/2 lg:pr-16 lg:text-right">
                <!-- Visible solo en móvil/tablet -->
                <div class="lg:hidden">
                  <h3 class="mb-3 text-2xl font-bold text-gray-800">
                    Secuenciación Genética
                  </h3>
                  <p class="mb-4 leading-relaxed text-gray-600">
                    Tratamiento innovador que ataca directamente las células
                    tumorales sin afectar a las células sanas. Ayuda al sistema
                    inmunitario a atacar las células tumorales.
                  </p>
                  <a
                    href="#"
                    class="inline-flex items-center font-medium text-teal-600 transition-colors hover:text-teal-800"
                  >
                    Leer más
                    <Icon name="lucide:chevron-right" class="ml-1 h-4 w-4" />
                  </a>
                </div>

                <!-- Visible solo en desktop -->
                <div
                  class="hidden transform transition-transform duration-500 group-hover:translate-x-3 group-hover:translate-y-2 lg:block"
                >
                  <h3 class="mb-3 text-2xl font-bold text-gray-800">
                    Secuenciación Genética
                  </h3>
                  <p
                    class="mb-4 ml-auto max-w-lg leading-relaxed text-gray-600"
                  >
                    Tratamiento innovador que ataca directamente las células
                    tumorales sin afectar a las células sanas. Ayuda al sistema
                    inmunitario a atacar las células tumorales.
                  </p>
                  <a
                    href="#"
                    class="inline-flex items-center font-medium text-teal-600 transition-colors hover:text-teal-800"
                  >
                    Leer más
                    <Icon name="lucide:chevron-right" class="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>

              <!-- Hexágono central -->
              <div class="mt-6 flex w-full justify-center lg:mt-0 lg:w-auto">
                <div
                  class="relative transition-transform duration-500 group-hover:scale-105"
                >
                  <!-- Forma hexagonal -->
                  <div
                    class="hexagon-outer bg-gradient-to-br from-teal-500 to-teal-700"
                  >
                    <div class="hexagon-inner bg-white">
                      <div
                        class="hexagon-content bg-gradient-to-br from-teal-500 to-teal-700"
                      >
                        <div
                          class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581093588401-fbb62a02f120?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center opacity-30"
                        ></div>
                        <div
                          class="relative z-10 flex items-center justify-center"
                        >
                          <Icon
                            name="lucide:dna"
                            class="h-16 w-16 text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Punto conector -->
                  <div
                    class="absolute top-1/2 left-1/2 z-20 hidden h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-4 border-teal-500 bg-white lg:block"
                  ></div>
                </div>
              </div>

              <!-- Texto derecho (visible en desktop) -->
              <div class="hidden lg:block lg:w-1/2 lg:pl-16">
                <div
                  class="transform transition-transform duration-500 group-hover:-translate-x-3 group-hover:translate-y-2"
                >
                  <h4 class="mb-2 text-lg font-semibold text-teal-700">
                    Beneficios clínicos
                  </h4>
                  <ul class="space-y-2 text-gray-600">
                    <li class="flex items-start">
                      <div
                        class="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-teal-100"
                      >
                        <Icon
                          name="lucide:check"
                          class="h-3 w-3 text-teal-600"
                        />
                      </div>
                      <span class="ml-2">Medicina personalizada</span>
                    </li>
                    <li class="flex items-start">
                      <div
                        class="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-teal-100"
                      >
                        <Icon
                          name="lucide:check"
                          class="h-3 w-3 text-teal-600"
                        />
                      </div>
                      <span class="ml-2">Identificación de mutaciones</span>
                    </li>
                    <li class="flex items-start">
                      <div
                        class="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-teal-100"
                      >
                        <Icon
                          name="lucide:check"
                          class="h-3 w-3 text-teal-600"
                        />
                      </div>
                      <span class="ml-2">Selección óptima de tratamientos</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Biología Molecular -->
          <div class="group">
            <div class="flex flex-col items-center lg:flex-row">
              <!-- Hexágono izquierdo (visible en desktop) -->
              <div class="hidden pr-16 text-right lg:block lg:w-1/2">
                <div
                  class="transform transition-transform duration-500 group-hover:translate-x-3 group-hover:-translate-y-2"
                >
                  <h3 class="mb-3 text-2xl font-bold text-gray-800">
                    Biología Molecular
                  </h3>
                  <p
                    class="mb-4 ml-auto max-w-lg leading-relaxed text-gray-600"
                  >
                    Es un tratamiento que se realiza a través de sustancias
                    químicas que atacan a células sanas y tumorales, que puede
                    usarse en combinación con otros tratamientos.
                  </p>
                  <a
                    href="#"
                    class="inline-flex items-center font-medium text-cyan-600 transition-colors hover:text-cyan-800"
                  >
                    Leer más
                    <Icon name="lucide:chevron-right" class="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>

              <!-- Hexágono central -->
              <div class="flex w-full justify-center lg:w-auto">
                <div
                  class="relative transition-transform duration-500 group-hover:scale-105"
                >
                  <!-- Forma hexagonal -->
                  <div
                    class="hexagon-outer bg-gradient-to-br from-cyan-500 to-cyan-700"
                  >
                    <div class="hexagon-inner bg-white">
                      <div
                        class="hexagon-content bg-gradient-to-br from-cyan-500 to-cyan-700"
                      >
                        <div
                          class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center opacity-30"
                        ></div>
                        <div
                          class="relative z-10 flex items-center justify-center"
                        >
                          <Icon
                            name="lucide:flask-conical"
                            class="h-16 w-16 text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Punto conector -->
                  <div
                    class="absolute top-1/2 left-1/2 z-20 hidden h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-4 border-cyan-500 bg-white lg:block"
                  ></div>
                </div>
              </div>

              <!-- Texto para móvil y tablet + texto derecho para desktop -->
              <div
                class="mt-6 text-center lg:mt-0 lg:w-1/2 lg:pl-16 lg:text-left"
              >
                <!-- Visible solo en móvil/tablet -->
                <div class="lg:hidden">
                  <h3 class="mb-3 text-2xl font-bold text-gray-800">
                    Biología Molecular
                  </h3>
                  <p class="mb-4 leading-relaxed text-gray-600">
                    Es un tratamiento que se realiza a través de sustancias
                    químicas que atacan a células sanas y tumorales, que puede
                    usarse en combinación con otros tratamientos.
                  </p>
                  <a
                    href="#"
                    class="inline-flex items-center font-medium text-cyan-600 transition-colors hover:text-cyan-800"
                  >
                    Leer más
                    <Icon name="lucide:chevron-right" class="ml-1 h-4 w-4" />
                  </a>
                </div>

                <!-- Visible solo en desktop -->
                <div
                  class="hidden transform transition-transform duration-500 group-hover:-translate-x-3 group-hover:-translate-y-2 lg:block"
                >
                  <h4 class="mb-2 text-lg font-semibold text-cyan-700">
                    Aplicaciones clínicas
                  </h4>
                  <ul class="space-y-2 text-gray-600">
                    <li class="flex items-start">
                      <div
                        class="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-cyan-100"
                      >
                        <Icon
                          name="lucide:check"
                          class="h-3 w-3 text-cyan-600"
                        />
                      </div>
                      <span class="ml-2">Detección de biomarcadores</span>
                    </li>
                    <li class="flex items-start">
                      <div
                        class="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-cyan-100"
                      >
                        <Icon
                          name="lucide:check"
                          class="h-3 w-3 text-cyan-600"
                        />
                      </div>
                      <span class="ml-2">Análisis de expresión génica</span>
                    </li>
                    <li class="flex items-start">
                      <div
                        class="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-cyan-100"
                      >
                        <Icon
                          name="lucide:check"
                          class="h-3 w-3 text-cyan-600"
                        />
                      </div>
                      <span class="ml-2">
                        Monitoreo de respuesta al tratamiento
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Inmuno Histoquímica -->
          <div class="group">
            <div class="flex flex-col items-center lg:flex-row">
              <!-- Texto para móvil y tablet + texto izquierdo para desktop -->
              <div class="text-center lg:w-1/2 lg:pr-16 lg:text-right">
                <!-- Visible solo en móvil/tablet -->
                <div class="lg:hidden">
                  <h3 class="mb-3 text-2xl font-bold text-gray-800">
                    Inmuno Histoquímica
                  </h3>
                  <p class="mb-4 leading-relaxed text-gray-600">
                    Método de laboratorio para el que se usan anticuerpos a fin
                    de determinar si hay ciertos antígenos (marcadores) en una
                    muestra de tejido.
                  </p>
                  <a
                    href="#"
                    class="inline-flex items-center font-medium text-indigo-600 transition-colors hover:text-indigo-800"
                  >
                    Leer más
                    <Icon name="lucide:chevron-right" class="ml-1 h-4 w-4" />
                  </a>
                </div>

                <!-- Visible solo en desktop -->
                <div
                  class="hidden transform transition-transform duration-500 group-hover:translate-x-3 group-hover:translate-y-2 lg:block"
                >
                  <h3 class="mb-3 text-2xl font-bold text-gray-800">
                    Inmuno Histoquímica
                  </h3>
                  <p
                    class="mb-4 ml-auto max-w-lg leading-relaxed text-gray-600"
                  >
                    Método de laboratorio para el que se usan anticuerpos a fin
                    de determinar si hay ciertos antígenos (marcadores) en una
                    muestra de tejido.
                  </p>
                  <a
                    href="#"
                    class="inline-flex items-center font-medium text-indigo-600 transition-colors hover:text-indigo-800"
                  >
                    Leer más
                    <Icon name="lucide:chevron-right" class="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>

              <!-- Hexágono central -->
              <div class="mt-6 flex w-full justify-center lg:mt-0 lg:w-auto">
                <div
                  class="relative transition-transform duration-500 group-hover:scale-105"
                >
                  <!-- Forma hexagonal -->
                  <div
                    class="hexagon-outer bg-gradient-to-br from-indigo-500 to-indigo-700"
                  >
                    <div class="hexagon-inner bg-white">
                      <div
                        class="hexagon-content bg-gradient-to-br from-indigo-500 to-indigo-700"
                      >
                        <div
                          class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80')] bg-cover bg-center opacity-30"
                        ></div>
                        <div
                          class="relative z-10 flex items-center justify-center"
                        >
                          <Icon
                            name="lucide:test-tube"
                            class="h-16 w-16 text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Punto conector -->
                  <div
                    class="absolute top-1/2 left-1/2 z-20 hidden h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-4 border-indigo-500 bg-white lg:block"
                  ></div>
                </div>
              </div>

              <!-- Texto derecho (visible en desktop) -->
              <div class="hidden lg:block lg:w-1/2 lg:pl-16">
                <div
                  class="transform transition-transform duration-500 group-hover:-translate-x-3 group-hover:translate-y-2"
                >
                  <h4 class="mb-2 text-lg font-semibold text-indigo-700">
                    Beneficios clínicos
                  </h4>
                  <ul class="space-y-2 text-gray-600">
                    <li class="flex items-start">
                      <div
                        class="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100"
                      >
                        <Icon
                          name="lucide:check"
                          class="h-3 w-3 text-indigo-600"
                        />
                      </div>
                      <span class="ml-2">
                        Identificación de tipos celulares
                      </span>
                    </li>
                    <li class="flex items-start">
                      <div
                        class="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100"
                      >
                        <Icon
                          name="lucide:check"
                          class="h-3 w-3 text-indigo-600"
                        />
                      </div>
                      <span class="ml-2">
                        Detección de proteínas específicas
                      </span>
                    </li>
                    <li class="flex items-start">
                      <div
                        class="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100"
                      >
                        <Icon
                          name="lucide:check"
                          class="h-3 w-3 text-indigo-600"
                        />
                      </div>
                      <span class="ml-2">
                        Evaluación de receptores hormonales
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Botón de acción con estilo consistente -->
      <div class="mt-16 text-center">
        <a
          href="#"
          class="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3 font-medium text-white shadow-md transition-colors hover:bg-blue-700 hover:shadow-lg"
        >
          Solicitar diagnóstico especializado
          <Icon name="lucide:chevron-right" class="ml-2 h-4 w-4" />
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Hexágono exterior */
.hexagon-outer {
  width: 160px;
  height: 160px;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(0deg);
}

/* Hexágono interior (borde blanco) */
.hexagon-inner {
  width: 150px;
  height: 150px;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Contenido del hexágono */
.hexagon-content {
  width: 140px;
  height: 140px;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Animación de hover para los grupos */
.group:hover .hexagon-outer {
  transform: rotate(5deg);
  transition: transform 0.5s ease;
}

/* Responsive para móvil */
@media (max-width: 1023px) {
  .hexagon-outer {
    width: 140px;
    height: 140px;
  }

  .hexagon-inner {
    width: 130px;
    height: 130px;
  }

  .hexagon-content {
    width: 120px;
    height: 120px;
  }
}
</style>
