<template>
	<div class="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
		<div class="p-4 border-b border-gray-200">
			<h2 class="text-lg font-semibold text-gray-800">Constructor</h2>
		</div>

		<!-- Componentes arrastrables -->
		<div class="p-4 overflow-y-auto flex-grow">
			<h3
				class="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3"
			>
				Componentes
			</h3>
			<div class="space-y-2">
				<div
					v-for="component in availableComponents"
					:key="component.type"
					class="bg-gray-50 p-3 rounded-md cursor-move hover:bg-gray-100 transition-colors flex items-center gap-2 border border-gray-200"
					draggable="true"
					@dragstart="handleDragStart($event, component.type)"
				>
					<component
						:is="getIcon(component.type)"
						class="h-5 w-5 text-gray-500"
					/>
					<span class="text-sm">{{ component.label }}</span>
				</div>
			</div>
		</div>

		<!-- Botones de acción -->
		<div class="p-4 border-t border-gray-200">
			<button
				@click="exportContent"
				class="w-full py-2 px-4 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
			>
				<Download class="h-4 w-4" />
				Exportar
			</button>

			<button
				@click="$emit('show-preview')"
				class="w-full mt-2 py-2 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
			>
				<Eye class="h-4 w-4" />
				Vista Previa
			</button>

			<button
				@click="$emit('show-export-modal')"
				class="w-full mt-2 py-2 px-4 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
			>
				<Code class="h-4 w-4" />
				Código Vue
			</button>
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
		Eye,
		Download,
		Code,
		Columns,
	} from 'lucide-vue-next';

	const props = defineProps<{
		availableComponents: Array<{ type: string; label: string }>;
		handleDragStart: (event: DragEvent, componentType: string) => void;
		exportContent: () => void;
	}>();

	const emit = defineEmits(['show-preview', 'show-export-modal']);

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
</script>
