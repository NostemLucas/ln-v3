import type { ContentBlock } from "~/types/content-builder";

export default function renderCodeBlock(block: ContentBlock): string {
  const language = block.codeProps?.language || "javascript";
  return `
    <div class="bg-gray-50 rounded-md overflow-hidden">
      <div class="bg-gray-200 px-4 py-1 text-xs font-mono flex justify-between items-center">
        <span>${language}</span>
      </div>
      <pre class="p-4 overflow-x-auto font-mono text-sm whitespace-pre-wrap">${
        block.content || "// Ingrese código aquí"
      }</pre>
    </div>
  `;
}
