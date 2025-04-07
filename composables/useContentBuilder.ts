import type {
	ContentBlock,
	ContentRow,
	FixedFields,
	ImageProperties,
} from '@/types/content-builder';
import { ref } from 'vue';

export function useContentBuilder() {
	const selectedTemplate = ref<string | null>(null);
	const fixedFields = ref<FixedFields>({
		title: '',
		author: '',
		bannerImage: '',
	});
	const rows = ref<ContentRow[]>([]);
	const selectedBlockId = ref<string | null>(null);
	const showWidthMenu = ref<string | null>(null);

	// Helper functions
	const getWidthClass = (width: ContentBlock['width']) => {
		const widthClasses = {
			full: 'col-span-12',
			half: 'col-span-6',
			third: 'col-span-4',
			quarter: 'col-span-3',
			'two-thirds': 'col-span-8',
			'three-quarters': 'col-span-9',
		};
		return widthClasses[width];
	};

	// Actions
	const selectTemplate = (templateId: string) => {
		selectedTemplate.value = templateId;
	};

	const selectBlock = (blockId: string) => {
		selectedBlockId.value = blockId;
	};

	const handleDragStart = (event: DragEvent, componentType: string) => {
		if (event.dataTransfer) {
			event.dataTransfer.setData('componentType', componentType);
		}
	};

	const handleDrop = (event: DragEvent, rowId?: string) => {
		event.preventDefault();
		if (!event.dataTransfer) return;

		const componentType = event.dataTransfer.getData(
			'componentType'
		) as ContentBlock['type'];

		if (componentType) {
			// Default image properties
			const imageProps =
				componentType === 'image'
					? {
							alt: 'Imagen descriptiva',
							objectFit: 'cover' as const,
							height: 100,
						}
					: undefined;

			const newBlock: ContentBlock = {
				id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
				type: componentType,
				content: '',
				width: 'full',
				rowId:
					rowId ||
					`row-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
				columns: componentType === 'columns' ? 2 : undefined,
				columnContent: componentType === 'columns' ? ['', ''] : undefined,
				imageProps,
			};

			// If rowId is provided, add to existing row
			if (rowId) {
				rows.value = rows.value.map((row) =>
					row.id === rowId ? { ...row, blocks: [...row.blocks, newBlock] } : row
				);
			} else {
				// Create a new row with this block
				const newRow: ContentRow = {
					id: newBlock.rowId,
					blocks: [newBlock],
				};
				rows.value.push(newRow);
			}

			selectedBlockId.value = newBlock.id;
		}
	};

	const updateBlockContent = (blockId: string, content: string) => {
		rows.value = rows.value.map((row) => ({
			...row,
			blocks: row.blocks.map((block) =>
				block.id === blockId ? { ...block, content } : block
			),
		}));
	};

	const updateColumnContent = (
		blockId: string,
		columnIndex: number,
		content: string
	) => {
		rows.value = rows.value.map((row) => ({
			...row,
			blocks: row.blocks.map((block) => {
				if (block.id === blockId) {
					const columnContent = [...(block.columnContent || [])];
					columnContent[columnIndex] = content;
					return { ...block, columnContent };
				}
				return block;
			}),
		}));
	};

	const updateImageProps = (
		blockId: string,
		props: Partial<ImageProperties>
	) => {
		rows.value = rows.value.map((row) => ({
			...row,
			blocks: row.blocks.map((block) => {
				if (block.id === blockId && block.type === 'image') {
					return {
						...block,
						imageProps: {
							...(block.imageProps || {
								alt: '',
								objectFit: 'cover',
								height: 100,
							}),
							...props,
						},
					};
				}
				return block;
			}),
		}));
	};

	const updateColumnsCount = (blockId: string, columnsCount: number) => {
		rows.value = rows.value.map((row) => ({
			...row,
			blocks: row.blocks.map((block) => {
				if (block.id === blockId) {
					// Preserve existing column content and add empty strings for new columns
					const existingContent = block.columnContent || [];
					const newColumnContent = [...existingContent];

					// Add empty content for new columns
					while (newColumnContent.length < columnsCount) {
						newColumnContent.push('');
					}

					// Trim if reducing columns
					if (newColumnContent.length > columnsCount) {
						newColumnContent.length = columnsCount;
					}

					return {
						...block,
						columns: columnsCount,
						columnContent: newColumnContent,
					};
				}
				return block;
			}),
		}));
	};

	const removeBlock = (blockId: string) => {
		// First, find which row contains this block
		const updatedRows = rows.value.map((row) => ({
			...row,
			blocks: row.blocks.filter((block) => block.id !== blockId),
		}));

		// Remove any empty rows
		rows.value = updatedRows.filter((row) => row.blocks.length > 0);

		if (selectedBlockId.value === blockId) {
			selectedBlockId.value = null;
		}
	};

	const duplicateBlock = (blockId: string) => {
		// Find the block to duplicate
		let blockToDuplicate: ContentBlock | null = null;
		let rowId: string | null = null;

		for (const row of rows.value) {
			const block = row.blocks.find((b) => b.id === blockId);
			if (block) {
				blockToDuplicate = block;
				rowId = row.id;
				break;
			}
		}

		if (blockToDuplicate && rowId) {
			// Create a new block with the same properties but a new ID
			const newBlock: ContentBlock = {
				...JSON.parse(JSON.stringify(blockToDuplicate)),
				id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
				rowId,
			};

			// Add the new block to the same row
			rows.value = rows.value.map((row) =>
				row.id === rowId ? { ...row, blocks: [...row.blocks, newBlock] } : row
			);

			selectedBlockId.value = newBlock.id;
		}
	};

	const changeBlockWidth = (blockId: string, width: ContentBlock['width']) => {
		rows.value = rows.value.map((row) => ({
			...row,
			blocks: row.blocks.map((block) =>
				block.id === blockId ? { ...block, width } : block
			),
		}));

		showWidthMenu.value = null;
	};

	const moveBlockUp = (blockId: string) => {
		// Find the row and block index
		let rowIndex = -1;
		let blockIndex = -1;

		for (let i = 0; i < rows.value.length; i++) {
			const bIndex = rows.value[i].blocks.findIndex((b) => b.id === blockId);
			if (bIndex !== -1) {
				rowIndex = i;
				blockIndex = bIndex;
				break;
			}
		}

		if (rowIndex === -1 || blockIndex === -1) return;

		const currentRow = rows.value[rowIndex];

		// If it's the first block in the first row, can't move up
		if (rowIndex === 0 && blockIndex === 0) return;

		const newRows = [...rows.value];
		const blockToMove = currentRow.blocks[blockIndex];

		// Remove the block from its current position
		newRows[rowIndex] = {
			...currentRow,
			blocks: currentRow.blocks.filter((_, i) => i !== blockIndex),
		};

		// If it's the first block in a row (but not the first row)
		if (blockIndex === 0 && rowIndex > 0) {
			// Add to the end of the previous row
			newRows[rowIndex - 1] = {
				...newRows[rowIndex - 1],
				blocks: [...newRows[rowIndex - 1].blocks, blockToMove],
			};
		} else if (blockIndex > 0) {
			// Swap with the previous block in the same row
			const updatedBlocks = [...currentRow.blocks];
			updatedBlocks[blockIndex] = updatedBlocks[blockIndex - 1];
			updatedBlocks[blockIndex - 1] = blockToMove;
			newRows[rowIndex] = {
				...currentRow,
				blocks: updatedBlocks,
			};
		}

		// Remove any empty rows
		rows.value = newRows.filter((row) => row.blocks.length > 0);
	};

	const moveBlockDown = (blockId: string) => {
		// Find the row and block index
		let rowIndex = -1;
		let blockIndex = -1;

		for (let i = 0; i < rows.value.length; i++) {
			const bIndex = rows.value[i].blocks.findIndex((b) => b.id === blockId);
			if (bIndex !== -1) {
				rowIndex = i;
				blockIndex = bIndex;
				break;
			}
		}

		if (rowIndex === -1 || blockIndex === -1) return;

		const currentRow = rows.value[rowIndex];

		// If it's the last block in the last row, can't move down
		if (
			rowIndex === rows.value.length - 1 &&
			blockIndex === currentRow.blocks.length - 1
		)
			return;

		const newRows = [...rows.value];
		const blockToMove = currentRow.blocks[blockIndex];

		// Remove the block from its current position
		newRows[rowIndex] = {
			...currentRow,
			blocks: currentRow.blocks.filter((_, i) => i !== blockIndex),
		};

		// If it's the last block in a row (but not the last row)
		if (
			blockIndex === currentRow.blocks.length - 1 &&
			rowIndex < rows.value.length - 1
		) {
			// Add to the beginning of the next row
			newRows[rowIndex + 1] = {
				...newRows[rowIndex + 1],
				blocks: [blockToMove, ...newRows[rowIndex + 1].blocks],
			};
		} else if (blockIndex < currentRow.blocks.length - 1) {
			// Swap with the next block in the same row
			const updatedBlocks = [...currentRow.blocks];
			updatedBlocks[blockIndex] = updatedBlocks[blockIndex + 1];
			updatedBlocks[blockIndex + 1] = blockToMove;
			newRows[rowIndex] = {
				...currentRow,
				blocks: updatedBlocks,
			};
		}

		// Remove any empty rows
		rows.value = newRows.filter((row) => row.blocks.length > 0);
	};

	const moveRowUp = (rowId: string) => {
		const rowIndex = rows.value.findIndex((row) => row.id === rowId);
		if (rowIndex <= 0) return; // Can't move up if it's the first row

		const newRows = [...rows.value];
		const temp = newRows[rowIndex];
		newRows[rowIndex] = newRows[rowIndex - 1];
		newRows[rowIndex - 1] = temp;

		rows.value = newRows;
	};

	const moveRowDown = (rowId: string) => {
		const rowIndex = rows.value.findIndex((row) => row.id === rowId);
		if (rowIndex === -1 || rowIndex >= rows.value.length - 1) return; // Can't move down if it's the last row

		const newRows = [...rows.value];
		const temp = newRows[rowIndex];
		newRows[rowIndex] = newRows[rowIndex + 1];
		newRows[rowIndex + 1] = temp;

		rows.value = newRows;
	};

	const createNewRow = () => {
		const newRow: ContentRow = {
			id: `row-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
			blocks: [],
		};
		rows.value.push(newRow);
	};

	const updateCustomClasses = (blockId: string, customClasses: string) => {
		rows.value = rows.value.map((row) => ({
			...row,
			blocks: row.blocks.map((block) =>
				block.id === blockId ? { ...block, customClasses } : block
			),
		}));
	};

	return {
		selectedTemplate,
		fixedFields,
		rows,
		selectedBlockId,
		showWidthMenu,
		getWidthClass,
		selectTemplate,
		selectBlock,
		handleDragStart,
		handleDrop,
		updateBlockContent,
		updateColumnContent,
		updateImageProps,
		updateColumnsCount,
		removeBlock,
		duplicateBlock,
		changeBlockWidth,
		moveBlockUp,
		moveBlockDown,
		moveRowUp,
		moveRowDown,
		createNewRow,
		updateCustomClasses,
	};
}
