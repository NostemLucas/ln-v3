import type { ContentRow, FixedFields } from '@/types/content-builder';
import { computed, ref } from 'vue';

export function useExport(
	rows: { value: ContentRow[] },
	selectedTemplate: { value: string | null },
	fixedFields: { value: FixedFields },
	getWidthClass: (width: string) => string
) {
	const showPreview = ref(false);
	const showExportModal = ref(false);
	const codeCopied = ref(false);

	const exportContent = () => {
		const exportData = {
			template: selectedTemplate.value,
			fixedFields: fixedFields.value,
			rows: rows.value,
		};

		// Create a JSON blob and download it
		const blob = new Blob([JSON.stringify(exportData, null, 2)], {
			type: 'application/json',
		});
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'article-content.json';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	// Generar código Vue para renderizar el contenido
	const generatedVueCode = computed(() => {
		let code = `<template>
  <div class="content-page">
    <!-- Template Header -->
`;

		// Añadir el encabezado de la plantilla si existe
		if (selectedTemplate.value && selectedTemplate.value !== 'none') {
			if (selectedTemplate.value === 'banner') {
				code += `    <div class="relative">
      <img
        src="${fixedFields.value.bannerImage || '/placeholder.svg?height=400&width=1200'}"
        alt="Banner"
        class="w-full h-64 object-cover"
      />
      <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6">
        <h1 class="text-3xl font-bold text-white">
          ${fixedFields.value.title || 'Título del artículo'}
        </h1>
        <p class="text-white/80">
          Por ${fixedFields.value.author || 'Nombre del autor'}
        </p>
      </div>
    </div>\n`;
			} else if (selectedTemplate.value === 'feature') {
				code += `    <div class="p-6">
      <h1 class="text-4xl font-bold mb-2">
        ${fixedFields.value.title || 'Título del artículo'}
      </h1>
      <p class="text-gray-500 mb-4">
        Por ${fixedFields.value.author || 'Nombre del autor'}
      </p>
      <img
        src="${fixedFields.value.bannerImage || '/placeholder.svg?height=400&width=1200'}"
        alt="Banner"
        class="w-full h-64 object-cover rounded-md mb-6"
      />
    </div>\n`;
			} else if (selectedTemplate.value === 'minimal') {
				code += `    <div class="p-6">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-3xl font-bold mb-2 text-center">
          ${fixedFields.value.title || 'Título del artículo'}
        </h1>
        <p class="text-gray-500 mb-6 text-center">
          Por ${fixedFields.value.author || 'Nombre del autor'}
        </p>
        <img
          src="${fixedFields.value.bannerImage || '/placeholder.svg?height=400&width=1200'}"
          alt="Banner"
          class="w-full h-64 object-cover rounded-md mb-6"
        />
      </div>
    </div>\n`;
			}
		}

		// Añadir el contenido de las filas
		code += `
    <!-- Content -->
    <div class="container mx-auto px-4 py-8">
`;

		rows.value.forEach((row) => {
			code += `      <div class="grid grid-cols-12 gap-4 mb-8">
`;
			row.blocks.forEach((block) => {
				code += `        <div class="${getWidthClass(block.width)}">
`;

				if (block.type === 'title') {
					code += `          <h2 class="font-bold text-2xl md:text-3xl">${block.content || 'Título'}</h2>\n`;
				} else if (block.type === 'subtitle') {
					code += `          <h3 class="font-medium text-xl md:text-2xl">${block.content || 'Subtítulo'}</h3>\n`;
				} else if (block.type === 'text') {
					code += `          <p class="text-base">${block.content || 'Texto'}</p>\n`;
				} else if (block.type === 'divider') {
					code += `          <hr class="w-full border-t my-4" />\n`;
				} else if (block.type === 'image') {
					const imgProps = block.imageProps || {
						alt: 'Imagen descriptiva',
						objectFit: 'cover',
						height: 100,
					};
					code += `          <div class="w-full" style="height: ${imgProps.height}%">
            <img
              src="${block.content || '/placeholder.svg?height=300&width=600'}"
              alt="${imgProps.alt}"
              class="w-full h-full rounded-md"
              style="object-fit: ${imgProps.objectFit}"
            />
          </div>\n`;
				} else if (block.type === 'columns') {
					code += `          <div class="grid" style="grid-template-columns: repeat(${block.columns || 2}, 1fr); gap: 1rem">
`;
					(block.columnContent || []).forEach((content, index) => {
						code += `            <div class="p-2">
              ${content || `Contenido columna ${index + 1}`}
            </div>\n`;
					});
					code += `          </div>\n`;
				}

				code += `        </div>\n`;
			});
			code += `      </div>\n`;
		});

		code += `    </div>
  </div>
</template>

<style>
/* Estilos adicionales específicos para esta página */
.content-page {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
</style>`;

		return code;
	});

	const copyVueCode = () => {
		navigator.clipboard.writeText(generatedVueCode.value);
		codeCopied.value = true;
	};

	const downloadVueFile = () => {
		const blob = new Blob([generatedVueCode.value], {
			type: 'text/plain',
		});
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'ContentPage.vue';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	return {
		showPreview,
		showExportModal,
		codeCopied,
		exportContent,
		generatedVueCode,
		copyVueCode,
		downloadVueFile,
	};
}
