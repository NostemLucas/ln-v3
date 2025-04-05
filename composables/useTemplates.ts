import type { Template } from '@/types/content-builder';
import { ref } from 'vue';

export function useTemplates() {
	const templates = ref<Template[]>([
		{
			id: 'banner',
			name: 'Banner Header',
			thumbnail: '/placeholder.svg?height=100&width=200',
		},
		{
			id: 'feature',
			name: 'Feature Article',
			thumbnail: '/placeholder.svg?height=100&width=200',
		},
		{
			id: 'minimal',
			name: 'Minimal',
			thumbnail: '/placeholder.svg?height=100&width=200',
		},
	]);

	return { templates };
}
