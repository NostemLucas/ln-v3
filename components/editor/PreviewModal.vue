<template>
	<div
		v-if="showPreview"
		class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
	>
		<div
			class="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-auto"
		>
			<!-- Template Header Preview -->
			<TemplateHeader
				:selected-template="selectedTemplate"
				:fixed-fields="fixedFields"
			/>

			<div class="p-6">
				<div class="flex justify-between items-center mb-4">
					<h2 class="text-xl font-bold">Vista Previa</h2>
					<button
						@click="$emit('close')"
						class="text-gray-500 hover:text-gray-700"
					>
						<X class="h-5 w-5" />
					</button>
				</div>

				<div>
					<div v-for="row in rows" :key="row.id" class="mb-4">
						<div class="grid grid-cols-12 gap-4">
							<template v-for="block in row.blocks" :key="block.id">
								<!-- Title Block Preview -->
								<div :class="getWidthClass(block.width as any)" class="p-2">
									<h2
										v-if="block.type === 'title'"
										class="font-bold text-2xl md:text-3xl"
									>
										{{ block.content || 'Ingrese título aquí' }}
									</h2>

									<h3
										v-else-if="block.type === 'subtitle'"
										class="font-medium text-xl md:text-2xl"
									>
										{{ block.content || 'Ingrese subtítulo aquí' }}
									</h3>

									<p v-else-if="block.type === 'text'" class="text-base">
										{{ block.content || 'Ingrese texto aquí' }}
									</p>

									<hr
										v-else-if="block.type === 'divider'"
										class="w-full border-t"
									/>

									<div v-else-if="block.type === 'image'" class="w-full">
										<div
											class="w-full"
											:style="{
												height: `${block.imageProps?.height || 100}%`,
											}"
										>
											<img
												:src="
													block.content ||
													'/placeholder.svg?height=300&width=600'
												"
												:alt="block.imageProps?.alt || 'Imagen descriptiva'"
												class="w-full h-full rounded-md"
												:style="{
													objectFit: block.imageProps?.objectFit || 'cover',
												}"
											/>
										</div>
									</div>

									<div v-else-if="block.type === 'columns'" class="w-full">
										<div
											class="w-full grid"
											:style="{
												gridTemplateColumns: `repeat(${block.columns || 2}, 1fr)`,
												gap: '1rem',
											}"
										>
											<div
												v-for="(_, colIndex) in Array.from({
													length: block.columns || 2,
												})"
												:key="colIndex"
												class="p-2"
											>
												{{
													block.columnContent && block.columnContent[colIndex]
														? block.columnContent[colIndex]
														: `Contenido columna ${colIndex + 1}`
												}}
											</div>
										</div>
									</div>
								</div>
							</template>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { X } from 'lucide-vue-next';
	import TemplateHeader from './TemplateHeader.vue';
	import type {
		ContentRow,
		FixedFields,
		ContentBlock,
	} from '@/types/content-builder';

	defineProps<{
		showPreview: boolean;
		selectedTemplate: string | null;
		fixedFields: FixedFields;
		rows: ContentRow[];
		getWidthClass: (width: ContentBlock['width']) => string;
	}>();

	defineEmits(['close']);
</script>
