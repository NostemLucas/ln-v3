<template>
	<!-- Template Header (si hay una plantilla seleccionada) -->
	<template v-if="selectedTemplate && selectedTemplate !== 'none'">
		<!-- Banner Template -->
		<div v-if="selectedTemplate === 'banner'" class="relative">
			<img
				:src="
					fixedFields.bannerImage || '/placeholder.svg?height=400&width=1200'
				"
				alt="Banner"
				class="w-full h-64 object-cover"
			/>
			<div
				class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6"
			>
				<h1 class="text-3xl font-bold text-white">
					{{ fixedFields.title || 'Título del artículo' }}
				</h1>
				<p class="text-white/80">
					Por {{ fixedFields.author || 'Nombre del autor' }}
				</p>
			</div>
		</div>

		<!-- Feature Template -->
		<div v-else-if="selectedTemplate === 'feature'" class="p-6">
			<h1 class="text-4xl font-bold mb-2">
				{{ fixedFields.title || 'Título del artículo' }}
			</h1>
			<p class="text-gray-500 mb-4">
				Por {{ fixedFields.author || 'Nombre del autor' }}
			</p>
			<img
				:src="
					fixedFields.bannerImage || '/placeholder.svg?height=400&width=1200'
				"
				alt="Banner"
				class="w-full h-64 object-cover rounded-md mb-6"
			/>
		</div>

		<!-- Minimal Template -->
		<div v-else-if="selectedTemplate === 'minimal'" class="p-6">
			<div class="max-w-3xl mx-auto">
				<h1 class="text-3xl font-bold mb-2 text-center">
					{{ fixedFields.title || 'Título del artículo' }}
				</h1>
				<p class="text-gray-500 mb-6 text-center">
					Por {{ fixedFields.author || 'Nombre del autor' }}
				</p>
				<img
					:src="
						fixedFields.bannerImage || '/placeholder.svg?height=400&width=1200'
					"
					alt="Banner"
					class="w-full h-64 object-cover rounded-md mb-6"
				/>
			</div>
		</div>
	</template>
</template>

<script setup lang="ts">
	import type { FixedFields } from '@/types/content-builder';

	defineProps<{
		selectedTemplate: string | null;
		fixedFields: FixedFields;
	}>();
</script>
