import type { ContentBlock } from "~/types/content-builder";

export default function renderImageBlock(block: ContentBlock): string {
  return `
    <div class="w-full h-full">
      <img
        src="${block.content || "/placeholder.svg?height=300&width=600"}"
        alt="${block.imageProps?.alt || "Imagen descriptiva"}"
        class="w-full h-full rounded-md"
        style="object-fit: ${block.imageProps?.objectFit || "cover"}"
      />
      ${
        block.imageProps?.caption
          ? `<p class="text-sm text-gray-500 mt-2 text-center">${block.imageProps.caption}</p>`
          : ""
      }
    </div>
  `;
}
