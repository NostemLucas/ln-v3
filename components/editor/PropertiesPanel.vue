<template>
	<div class="bg-white border-l border-gray-200 w-72 h-full overflow-y-auto">
		<div class="p-4 border-b border-gray-200">
			<h2 class="text-lg font-semibold text-gray-800">Propiedades</h2>
		</div>

		<div v-if="selectedBlock" class="p-4">
			<div class="mb-4">
				<h3
					class="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2"
				>
					Tipo de Componente
				</h3>
				<div class="bg-gray-50 p-2 rounded-md flex items-center gap-2">
					<component
						:is="getIcon(selectedBlock.type)"
						class="h-5 w-5 text-gray-500"
					/>
					<span>{{ getComponentLabel(selectedBlock.type) }}</span>
				</div>
			</div>

			<!-- Propiedades comunes -->
			<div class="mb-4">
				<h3
					class="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2"
				>
					Diseño
				</h3>
				<div class="space-y-3">
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">
							Ancho
						</label>
						<select
							:value="selectedBlock.width"
							@change="
								changeBlockWidth(
									selectedBlock.id,
									$event.target.value as ContentBlock['width']
								)
							"
							class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
						>
							<option value="full">Ancho completo</option>
							<option value="half">Mitad (1/2)</option>
							<option value="third">Un tercio (1/3)</option>
							<option value="quarter">Un cuarto (1/4)</option>
							<option value="two-thirds">Dos tercios (2/3)</option>
							<option value="three-quarters">Tres cuartos (3/4)</option>
						</select>
					</div>

					<!-- Propiedades específicas según el tipo -->
					<template v-if="selectedBlock.type === 'image'">
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-1">
								URL de la imagen
							</label>
							<input
								type="text"
								:value="selectedBlock.content || ''"
								@input="
									updateBlockContent(
										selectedBlock.id,
										($event.target as HTMLInputElement).value
									)
								"
								placeholder="Ingrese URL de la imagen"
								class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
							/>
						</div>

						<div>
							<label class="block text-sm font-medium text-gray-700 mb-1">
								Texto alternativo
							</label>
							<input
								type="text"
								:value="selectedBlock.imageProps?.alt || ''"
								@input="
									updateImageProps(selectedBlock.id, {
										alt: ($event.target as HTMLInputElement).value,
									})
								"
								placeholder="Descripción de la imagen"
								class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
							/>
						</div>

						<div>
							<label class="block text-sm font-medium text-gray-700 mb-1">
								Ajuste de imagen
							</label>
							<select
								:value="selectedBlock.imageProps?.objectFit || 'cover'"
								@change="
									updateImageProps(selectedBlock.id, {
										objectFit: ($event.target as HTMLSelectElement).value as
											| 'cover'
											| 'contain'
											| 'fill'
											| 'none',
									})
								"
								class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
							>
								<option value="cover">Cubrir (cover)</option>
								<option value="contain">Contener (contain)</option>
								<option value="fill">Llenar (fill)</option>
								<option value="none">Ninguno (none)</option>
							</select>
						</div>

						<div>
							<label class="block text-sm font-medium text-gray-700 mb-1">
								Altura ({{ selectedBlock.imageProps?.height || 100 }}%)
							</label>
							<input
								type="range"
								:value="selectedBlock.imageProps?.height || 100"
								@input="
									updateImageProps(selectedBlock.id, {
										height: parseInt(
											($event.target as HTMLInputElement).value || '100'
										),
									})
								"
								min="20"
								max="200"
								step="5"
								class="w-full accent-emerald-500"
							/>
						</div>
					</template>

					<template v-else-if="selectedBlock.type === 'columns'">
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-1">
								Número de columnas
							</label>
							<select
								:value="selectedBlock.columns || 2"
								@change="
									updateColumnsCount(
										selectedBlock.id,
										parseInt(($event.target as HTMLSelectElement).value || '2')
									)
								"
								class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
							>
								<option value="2">2 columnas</option>
								<option value="3">3 columnas</option>
								<option value="4">4 columnas</option>
								<option value="6">6 columnas</option>
							</select>
						</div>
					</template>

					<!-- Estilos personalizados con Tailwind -->
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">
							Clases de Tailwind
						</label>
						<input
							type="text"
							:value="selectedBlock.customClasses || ''"
							@input="
								updateCustomClasses(
									selectedBlock.id,
									($event.target as HTMLInputElement).value
								)
							"
							placeholder="p-4 bg-gray-100 rounded-lg"
							class="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
						/>
						<p class="text-xs text-gray-500 mt-1">
							Añade clases de Tailwind personalizadas separadas por espacios
						</p>
					</div>
				</div>
			</div>

			<!-- Acciones -->
			<div class="space-y-2 mt-6">
				<button
					@click="duplicateBlock(selectedBlock.id)"
					class="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
				>
					<Copy class="h-4 w-4" />
					Duplicar
				</button>
				<button
					@click="removeBlock(selectedBlock.id)"
					class="w-full py-2 px-4 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
				>
					<Trash2 class="h-4 w-4" />
					Eliminar
				</button>
			</div>
		</div>

		<div v-else class="p-4 text-center text-gray-500">
			<div class="py-8">
				<LayoutTemplate class="h-12 w-12 text-gray-300 mx-auto mb-2" />
				<p>Selecciona un componente para ver sus propiedades</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import {
		Type,
		Heading1,
		Heading2,
		AlignLeft,
		Image as ImageIcon,
		SeparatorHorizontal,
		Columns,
		Copy,
		Trash2,
		LayoutTemplate,
	} from 'lucide-vue-next';
	import type { ContentBlock, ImageProperties } from '@/types/content-builder';

	const props = defineProps<{
		selectedBlock: ContentBlock | null;
		changeBlockWidth: (blockId: string, width: ContentBlock['width']) => void;
		updateBlockContent: (blockId: string, content: string) => void;
		updateImageProps: (
			blockId: string,
			props: Partial<ImageProperties>
		) => void;
		updateColumnsCount: (blockId: string, columnsCount: number) => void;
		updateCustomClasses: (blockId: string, classes: string) => void;
		duplicateBlock: (blockId: string) => void;
		removeBlock: (blockId: string) => void;
	}>();

	const getIcon = (type: string) => {
		switch (type) {
			case 'title':
				return Heading1;
			case 'subtitle':
				return Heading2;
			case 'text':
				return AlignLeft;
			case 'divider':
				return SeparatorHorizontal;
			case 'image':
				return ImageIcon;
			case 'columns':
				return Columns;
			default:
				return Type;
		}
	};

	const getComponentLabel = (type: string) => {
		switch (type) {
			case 'title':
				return 'Título';
			case 'subtitle':
				return 'Subtítulo';
			case 'text':
				return 'Texto';
			case 'divider':
				return 'Divisor';
			case 'image':
				return 'Imagen';
			case 'columns':
				return 'Columnas';
			default:
				return 'Componente';
		}
	};
</script>
