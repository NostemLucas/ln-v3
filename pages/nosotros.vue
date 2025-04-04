<template>
	<div class="overflow-x-hidden">
		<!-- Sección Principal: Quiénes Somos -->
		<section class="bg-white py-16">
			<div class="container mx-auto px-4 md:px-8">
				<div class="grid items-start gap-12 lg:grid-cols-12">
					<!-- Text Content - Expanded -->
					<div class="lg:col-span-8 xl:col-span-8">
						<div class="mb-8">
							<div class="mb-4 h-1 w-20 bg-blue-600"></div>
							<h1 class="text-3xl font-bold text-gray-900 md:text-4xl">
								¿Quiénes somos?
							</h1>
						</div>

						<div class="space-y-4 leading-relaxed text-gray-700">
							<p>
								En
								<span class="font-semibold text-blue-700">Oncoclinic</span>
								, nos dedicamos con pasión a liderar en la lucha contra el
								cáncer, promoviendo la investigación, la educación y la
								conciencia sobre la enfermedad.
							</p>

							<p>
								Nuestro centro se propone alcanzar la excelencia en el campo de
								la prevención, diagnóstico y cura de tumores a través de la
								investigación clínico-científica e innovación en gestión,
								dirigida a la calidad del servicio para nuestros pacientes.
							</p>

							<p>
								Nuestro equipo está compuesto por especialistas altamente
								calificados y comprometidos con brindar el mejor cuidado médico
								y psicológico a nuestros pacientes y sus familias.
							</p>

							<p>
								Nuestros servicios incluyen diagnóstico preciso, tratamiento
								personalizado y atención de apoyo durante todas las etapas del
								proceso oncológico. Utilizamos tecnologías de vanguardia y
								enfoques multidisciplinarios para ofrecer la mejor atención
								posible y mejorar la calidad de vida de nuestros pacientes..
							</p>
							<p>
								Se implementa y desarrolla programas de proyectos innovadores de
								alto impacto que objetivamente aporten al mejoramiento de las
								condiciones de vida de los pacientes y las familias que luchan
								contra el cáncer, mediante el desarrollo de tecnología y de la
								investigación científica, el manejo sostenible de la lucha
								contra el cáncer en todos sus niveles y estratos sociales y la
								prestación de servicios de salud en oncología.
							</p>

							<blockquote
								class="my-4 border-l-4 border-blue-600 pl-4 text-xl text-blue-700 italic"
							>
								"Donde quiera que se ama el arte de la medicina se ama también a
								la humanidad."
								<p class="mt-2 text-right text-base text-gray-600">- Platón</p>
							</blockquote>
						</div>
					</div>

					<!-- Image Section - Compact -->
					<div class="group relative lg:col-span-4 xl:col-span-4">
						<div class="h-[700px] overflow-hidden rounded-xl shadow-lg">
							<NuxtImg
								src="/landing/monalisa.jpg"
								alt="Imagen institucional"
								class="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
							/>
							<div
								class="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-transparent opacity-30"
							></div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- Sección de Filosofía: Misión, Visión y Valores -->
		<section class="bg-gray-50 py-16">
			<div class="container mx-auto px-4 md:px-8">
				<div class="mb-12 text-center">
					<div class="mx-auto mb-2 h-1 w-16 bg-blue-600"></div>
					<h2 class="text-3xl font-bold text-gray-900">Nuestra Filosofía</h2>
					<p class="mt-4 text-gray-600">
						Conoce los principios que guían nuestro trabajo diario
					</p>
				</div>

				<!-- Tabs de navegación -->
				<div class="mb-10 flex flex-wrap justify-center gap-4">
					<button
						v-for="tab in tabs"
						:key="tab.id"
						@click="activeTab = tab.id"
						class="rounded-full px-8 py-3 text-sm font-medium transition-all duration-300"
						:class="
							activeTab === tab.id
								? 'bg-blue-600 text-white shadow-lg'
								: 'border border-blue-200 bg-white text-blue-600 hover:bg-blue-50'
						"
					>
						{{ tab.label }}
					</button>
				</div>

				<!-- Contenido de los tabs (sin card, con diseño más limpio) -->
				<div class="mx-auto max-w-4xl">
					<transition name="fade" mode="out-in">
						<!-- Misión -->
						<div
							v-if="activeTab === 'mission'"
							class="flex flex-col items-center"
						>
							<div
								class="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-blue-600"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-10 w-10"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<circle cx="12" cy="12" r="10"></circle>
									<circle cx="12" cy="12" r="6"></circle>
									<circle cx="12" cy="12" r="2"></circle>
								</svg>
							</div>
							<h3 class="mb-6 text-center text-2xl font-bold text-gray-900">
								Nuestra Misión
							</h3>
							<p
								class="max-w-2xl text-center text-lg leading-relaxed text-gray-700"
							>
								Abordar de manera integral la prevención, diagnóstico,
								tratamiento y seguimiento de pacientes con enfermedades
								oncológicas, brindando atención de excelencia, innovación médica
								y tecnología de vanguardia.
							</p>
						</div>

						<!-- Visión -->
						<div
							v-else-if="activeTab === 'vision'"
							class="flex flex-col items-center"
						>
							<div
								class="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-blue-600"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-10 w-10"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
									<circle cx="12" cy="12" r="3"></circle>
								</svg>
							</div>
							<h3 class="mb-6 text-center text-2xl font-bold text-gray-900">
								Nuestra Visión
							</h3>
							<p
								class="max-w-2xl text-center text-lg leading-relaxed text-gray-700"
							>
								Ser la Institución Oncológica de excelencia en la Argentina y
								referente de América Latina en investigación, docencia,
								prevención, diagnóstico, y tratamiento integral de Cáncer.
							</p>
						</div>

						<!-- Valores -->
						<div
							v-else-if="activeTab === 'values'"
							class="flex flex-col items-center"
						>
							<div
								class="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-blue-600"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-10 w-10"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
									></path>
								</svg>
							</div>
							<h3 class="mb-6 text-center text-2xl font-bold text-gray-900">
								Nuestros Valores
							</h3>

							<!-- Valores en diseño hexagonal -->
							<div class="flex flex-wrap justify-center gap-4">
								<div
									v-for="(value, index) in values"
									:key="index"
									class="flex h-32 w-32 flex-col items-center justify-center rounded-lg bg-white p-4 shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
								>
									<div class="mb-2 h-2 w-8 bg-blue-500"></div>
									<span class="text-center font-medium text-gray-800">
										{{ value }}
									</span>
								</div>
							</div>
						</div>
					</transition>
				</div>
			</div>
		</section>

		<!-- Sección de Cita (a 100vw) -->
		<section class="relative w-screen bg-blue-600 py-16 text-white">
			<div
				class="absolute top-0 left-0 h-full w-full bg-blue-700 opacity-10 mix-blend-overlay"
			></div>
			<div class="relative z-10 container mx-auto px-4">
				<div class="mx-auto max-w-3xl text-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="mx-auto mb-6 h-12 w-12 opacity-50"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
						/>
					</svg>
					<blockquote class="mb-6 text-2xl font-light italic md:text-3xl">
						"Soñar, querer que el arte se una al de la medicina es una tentativa
						a la humanidad."
					</blockquote>
					<p class="text-xl font-semibold">- Renoir</p>
				</div>
			</div>
		</section>

		<!-- Sección de Timeline (sin intersect) -->
		<section class="py-16">
			<div class="container mx-auto px-4 md:px-8">
				<div class="mb-12 text-center">
					<div class="mx-auto mb-2 h-1 w-16 bg-blue-600"></div>
					<h2 class="text-3xl font-bold text-gray-900">Nuestra Historia</h2>
					<p class="mt-4 text-gray-600">
						Conoce nuestra trayectoria y línea de crecimiento a lo largo del
						tiempo
					</p>
				</div>

				<div class="mx-auto max-w-4xl">
					<div class="relative">
						<!-- Línea vertical -->
						<div
							class="absolute left-1/2 h-full w-1 -translate-x-1/2 transform bg-blue-500"
						></div>

						<div class="space-y-16">
							<div
								v-for="(item, index) in timelineItems"
								:key="index"
								class="relative"
							>
								<div class="flex items-center justify-center">
									<div
										class="z-10 flex h-10 w-10 items-center justify-center rounded-full border-4 border-blue-500 bg-white transition-all duration-500 hover:scale-125 hover:border-blue-600 hover:bg-blue-100"
									></div>
								</div>

								<div
									class="absolute top-0 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-blue-600 px-6 py-2 font-bold text-white"
								>
									{{ item.year }}
								</div>

								<div
									:class="[
										'w-5/12 rounded-lg bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl',
										index % 2 === 0 ? 'mr-auto' : 'ml-auto',
									]"
								>
									<p class="text-gray-700">{{ item.content }}</p>
									<button
										@click="toggleTimelineContent(index)"
										class="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
									>
										<span>Ver alternativa</span>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="ml-1 h-4 w-4"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
										>
											<path d="M7 16V4m0 0L3 8m4-4l4 4"></path>
											<path d="M17 8v12m0 0l4-4m-4 4l-4-4"></path>
										</svg>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';

	// Estado para los tabs
	const activeTab = ref('mission');

	const tabs = [
		{ id: 'mission', label: 'Nuestra Misión' },
		{ id: 'vision', label: 'Nuestra Visión' },
		{ id: 'values', label: 'Nuestros Valores' },
	];

	// Valores
	const values = [
		'Bienestar del Paciente',
		'Integridad',
		'Responsabilidad',
		'Vocación',
		'Trabajo en Equipo',
	];

	// Datos para la línea de tiempo (sin usar refs para evitar problemas de renderizado)
	const timelineItems = [
		{
			year: '2025',
			content:
				'Expansión internacional y apertura de centros de investigación avanzada en tres continentes.',
			alternative:
				'Implementación de terapias personalizadas basadas en IA y medicina de precisión.',
		},
		{
			year: '2024',
			content:
				'Lanzamiento de programa de telemedicina oncológica para llegar a zonas rurales.',
			alternative:
				'Desarrollo de plataforma digital integrada para seguimiento de pacientes en tiempo real.',
		},
		{
			year: '2023',
			content:
				'Certificación internacional ISO para todos nuestros procesos y servicios.',
			alternative:
				'Alianza estratégica con universidades para programas de formación especializada.',
		},
		{
			year: '2022',
			content:
				'Incorporación de tecnología de vanguardia para diagnósticos no invasivos.',
			alternative:
				'Creación del departamento de bienestar integral y apoyo psicológico.',
		},
		{
			year: '2021',
			content:
				'Ampliación de instalaciones y apertura de nueva unidad de radioterapia.',
			alternative:
				'Implementación del programa de investigación en inmunoterapia oncológica.',
		},
		{
			year: '2020',
			content:
				'Desarrollo de protocolos propios de tratamiento con reconocimiento internacional.',
			alternative:
				'Adaptación de servicios durante la pandemia con protocolos de seguridad avanzados.',
		},
		{
			year: '2019',
			content:
				'Inicio de colaboraciones con centros oncológicos internacionales.',
			alternative:
				'Lanzamiento del programa de prevención comunitaria en escuelas y empresas.',
		},
		{
			year: '2018',
			content:
				'Implementación del sistema de historia clínica electrónica integrada.',
			alternative:
				'Creación del primer laboratorio de investigación genómica propio.',
		},
		{
			year: '2017',
			content:
				'Fundación del centro y primeras atenciones a pacientes oncológicos.',
			alternative:
				'Establecimiento de la visión, misión y valores que guían nuestra institución.',
		},
	];

	// Función para cambiar el contenido de la línea de tiempo
	const toggleTimelineContent = (index: number) => {
		const item = timelineItems[index];
		const temp = item.content;
		item.content = item.alternative;
		item.alternative = temp;
	};
</script>

<style scoped>
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.3s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}
</style>
