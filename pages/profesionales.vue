<template>
	<div class="min-h-screen bg-white">
		<div class="container mx-auto px-4 py-8">
			<!-- Mobile doctor selector with improved design -->
			<div class="mb-8 block lg:hidden">
				<div class="relative mb-6 flex items-center">
					<div class="flex-grow border-t border-gray-300"></div>
					<h2
						class="text-primary-700 flex-shrink-0 bg-white px-4 text-xl font-bold tracking-wider uppercase"
					>
						Nuestros Profesionales
					</h2>
					<div class="flex-grow border-t border-gray-300"></div>
				</div>

				<!-- Mobile doctor cards instead of dropdown -->
				<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
					<div
						v-for="doctor in doctors"
						:key="doctor.id"
						class="flex cursor-pointer items-center border p-3 transition-all"
						:class="{
							'border-primary-600 bg-primary-50':
								selectedDoctorId === doctor.id,
							'hover:border-primary-300 border-gray-200 hover:bg-gray-50':
								selectedDoctorId !== doctor.id,
						}"
						@click="selectDoctor(doctor.id)"
					>
						<div
							class="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border-2"
							:class="{
								'border-primary-500': selectedDoctorId === doctor.id,
								'border-gray-200': selectedDoctorId !== doctor.id,
							}"
						>
							<NuxtImg
								:src="doctor.image"
								:alt="doctor.name"
								class="h-full w-full object-cover"
							/>
						</div>
						<div class="ml-3">
							<div
								class="font-medium"
								:class="{
									'text-primary-700': selectedDoctorId === doctor.id,
									'text-gray-800': selectedDoctorId !== doctor.id,
								}"
							>
								{{ doctor.name }}
							</div>
							<div class="text-sm text-gray-600">{{ doctor.specialty }}</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Main content with improved responsive layout -->
			<div class="flex flex-col lg:flex-row">
				<!-- Sidebar with providers list (hidden on mobile) -->
				<div
					class="hidden border-r border-gray-200 pr-6 lg:block lg:w-1/4 xl:w-1/5"
				>
					<div class="sticky top-4">
						<div class="mb-4 border-b border-gray-300 pb-2">
							<h2
								class="text-primary-700 text-xl font-bold tracking-wider uppercase"
							>
								Nuestros Profesionales
							</h2>
						</div>
						<div class="max-h-[600px] overflow-y-auto pr-2">
							<div
								v-for="doctor in doctors"
								:key="doctor.id"
								class="group mb-2 flex cursor-pointer items-center border-l-4 p-3 transition-all"
								:class="{
									'bg-primary-50 border-l-primary-600':
										selectedDoctorId === doctor.id,
									'hover:border-l-primary-200 border-l-transparent hover:bg-gray-50':
										selectedDoctorId !== doctor.id,
								}"
								@click="selectDoctor(doctor.id)"
							>
								<div
									class="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full border-2 shadow-sm"
									:class="{
										'border-primary-500': selectedDoctorId === doctor.id,
										'border-white': selectedDoctorId !== doctor.id,
									}"
								>
									<NuxtImg
										:src="doctor.image"
										:alt="doctor.name"
										class="h-full w-full object-cover"
									/>
								</div>
								<div class="ml-3">
									<div
										class="font-medium"
										:class="{
											'text-primary-700': selectedDoctorId === doctor.id,
											'text-gray-800': selectedDoctorId !== doctor.id,
										}"
									>
										{{ doctor.name }}
									</div>
									<div class="text-sm text-gray-600">
										{{ doctor.specialty }}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Main content area with improved spacing -->
				<div class="w-full lg:w-3/4 lg:pl-8 xl:w-4/5">
					<!-- Doctor video/image section -->
					<div class="relative mb-6">
						<div class="relative">
							<div v-if="!isVideoPlaying" class="relative">
								<NuxtImg
									:src="selectedDoctor.videoThumbnail || selectedDoctor.image"
									:alt="selectedDoctor.name"
									class="h-[250px] w-full object-cover sm:h-[300px] md:h-[500px]"
								/>
								<div
									v-if="selectedDoctor.videoUrl"
									class="absolute inset-0 flex cursor-pointer items-center justify-center"
									@click="playVideo"
								>
									<!-- Video button styled like the reference image -->
									<div
										class="border border-white bg-transparent px-4 py-2 text-2xl font-medium text-white transition-all hover:bg-white"
									>
										VER VIDEO
									</div>
								</div>
							</div>
							<div
								v-else
								class="h-[250px] w-full object-cover sm:h-[300px] md:h-[500px]"
							>
								<iframe
									class="h-full w-full"
									:src="videoSrc"
									frameborder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowfullscreen
								></iframe>
							</div>
						</div>

						<!-- Doctor name and specialty with horizontal line like reference -->
						<div class="mt-4 border-b border-gray-300 pb-2">
							<h1 class="text-primary-800 text-2xl font-bold sm:text-3xl">
								{{ selectedDoctor.name }}
							</h1>
							<h2 class="text-primary-600 mt-1 text-lg sm:text-xl">
								<a href="#" class="hover:underline">
									{{ selectedDoctor.specialty }}
								</a>
							</h2>
						</div>
					</div>

					<!-- Action buttons with improved responsive layout -->
					<div class="mb-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
						<a
							href="#"
							class="flex items-center justify-center border border-teal-700 bg-teal-600 px-6 py-2 font-medium text-white transition-all hover:bg-teal-700"
						>
							Solicite Cita
						</a>
						<a
							href="#"
							class="bg-primary-600 hover:bg-primary-700 border-primary-700 flex items-center justify-center border px-6 py-2 font-medium text-white transition-all"
						>
							Referir Paciente
						</a>
					</div>

					<!-- All content sections with improved section headers -->
					<!-- About section -->
					<div class="mb-10">
						<div class="relative mb-6 flex flex-col items-center">
							<div class="h1 flex-grow border-t border-gray-300" />
							<h3
								class="text-primary-700 w-full flex-shrink-0 text-3xl font-semibold tracking-wider uppercase"
							>
								Conozca a Nuestro Profesional
							</h3>
						</div>
						<div class="space-y-4 px-1 text-gray-700">
							<p
								v-for="(paragraph, index) in selectedDoctor.about"
								:key="index"
								class="leading-relaxed"
							>
								{{ paragraph }}
							</p>
						</div>
						<div class="mt-6 flex items-center px-1 text-gray-700">
							<span class="font-semibold">Idioma:</span>
							<span class="ml-2">
								{{ selectedDoctor.languages.join(', ') }}
							</span>
						</div>
					</div>

					<!-- Specialties section -->
					<div class="mb-10">
						<USeparator class="pb-8" />
						<div class="relative mb-6 flex">
							<h3
								class="text-primary-700 w-full flex-shrink-0 bg-white text-start text-3xl font-bold tracking-wider"
							>
								ESPECIALIDADES Y SERVICIOS
							</h3>
						</div>
						<ul class="list-disc space-y-2 pl-8 text-gray-700">
							<li
								v-for="(specialty, index) in selectedDoctor.specialities"
								:key="index"
								class="pl-1"
							>
								<a href="#" class="text-primary-600 hover:underline">
									{{ specialty }}
								</a>
							</li>
						</ul>
					</div>

					<!-- Location section -->
					<div class="mb-10">
						<div class="relative mb-6 flex flex-col items-center">
							<USeparator class="pb-8" />
							<div class="relative mb-6 flex w-full items-center">
								<h3
									class="text-primary-700 w-full flex-shrink-0 text-start text-3xl font-bold tracking-wider uppercase"
								>
									UBICACIÓN
								</h3>
							</div>
						</div>
						<div class="flex flex-col px-1 md:flex-row md:gap-6">
							<div class="mb-4 md:mb-0 md:w-1/2">
								<div class="text-gray-700">
									<h4 class="text-lg font-semibold">
										{{ selectedDoctor.location.name }}
									</h4>
									<p>{{ selectedDoctor.location.address }}</p>
									<p>{{ selectedDoctor.location.city }}</p>
									<p class="mt-4">{{ selectedDoctor.location.phone }}</p>
								</div>
							</div>
							<div class="md:w-1/2">
								<div class="h-64 w-full overflow-hidden border border-gray-200">
									<!-- Placeholder for map -->
									<div
										class="flex h-full items-center justify-center bg-gray-100"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-12 w-12 text-gray-400"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
											/>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
											/>
										</svg>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Education section -->
					<div>
						<USeparator class="pb-8" />
						<div class="relative mb-6 flex items-center">
							<h3
								class="text-primary-700 flex-shrink-0 bg-white text-3xl font-bold tracking-wider uppercase"
							>
								EDUCACIÓN
							</h3>
						</div>
						<div
							class="grid grid-cols-1 gap-x-6 gap-y-4 px-1 text-gray-700 md:grid-cols-2"
						>
							<template
								v-for="(value, key) in selectedDoctor.education"
								:key="key"
							>
								<div class="text-primary-800 font-semibold">{{ key }}:</div>
								<div>{{ value }}</div>
							</template>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { NuxtImg, USeparator } from '#components';
	import { ref, computed, onMounted, onUnmounted } from 'vue';
	import type { Doctor } from '~/mocks/doctors';
	import personnel from '~/mocks/doctors';

	// Video playing state
	const isVideoPlaying = ref(false);

	// Sample data for doctors
	const doctors = ref<Doctor[]>(personnel);

	// Selected doctor state
	const selectedDoctorId = ref<number>(1);

	// Computed property to get the selected doctor
	const selectedDoctor = computed(() => {
		return (
			doctors.value.find((doctor) => doctor.id === selectedDoctorId.value) ||
			doctors.value[0]
		);
	});

	// Computed property for video source with autoplay parameter
	const videoSrc = computed(() => {
		if (!selectedDoctor.value.videoUrl) return '';

		// Add autoplay parameter to URL if it's YouTube
		if (selectedDoctor.value.videoUrl.includes('youtube.com')) {
			// Handle YouTube URLs
			const url = new URL(selectedDoctor.value.videoUrl);
			url.searchParams.set('autoplay', '1');
			return url.toString();
		} else if (selectedDoctor.value.videoUrl.includes('vimeo.com')) {
			// Handle Vimeo URLs
			return `${selectedDoctor.value.videoUrl}${selectedDoctor.value.videoUrl.includes('?') ? '&' : '?'}autoplay=1`;
		}

		return selectedDoctor.value.videoUrl;
	});

	// Function to select a doctor
	const selectDoctor = (id: number) => {
		selectedDoctorId.value = id;
		isVideoPlaying.value = false;

		// Scroll to top on mobile when changing doctors
		if (window.innerWidth < 1024) {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	};

	const playVideo = () => {
		if (selectedDoctor.value.videoUrl) {
			isVideoPlaying.value = true;
		}
	};

	// Handle resize events to ensure proper layout
	onMounted(() => {
		const handleResize = () => {
			// Reset video if window is resized
			if (isVideoPlaying.value) {
				isVideoPlaying.value = false;
				setTimeout(() => {
					isVideoPlaying.value = true;
				}, 300);
			}
		};

		window.addEventListener('resize', handleResize);

		// Clean up event listener
		onUnmounted(() => {
			window.removeEventListener('resize', handleResize);
		});
	});
</script>

<style>
	/* Smooth transitions for doctor selection */
	.border-l-4 {
		transition: border-color 0.3s ease;
	}

	/* Smooth animation for content changes */
	@keyframes fadeIn {
		from {
			opacity: 0.7;
		}
		to {
			opacity: 1;
		}
	}

	/* Apply animation to content when doctor changes */
	.container {
		animation: fadeIn 0.4s ease-in-out;
	}

	/* Smooth hover transitions */
	a,
	button,
	.cursor-pointer {
		transition: all 0.2s ease-in-out;
	}
</style>
