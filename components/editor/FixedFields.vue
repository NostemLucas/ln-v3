<template>
	<div
		v-if="selectedTemplate && selectedTemplate !== 'none'"
		class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6"
	>
		<h2 class="text-lg font-medium mb-3 text-gray-800">
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
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { FixedFields } from '@/types/content-builder';

	defineProps<{
		selectedTemplate: string | null;
		fixedFields: FixedFields;
	}>();
</script>
