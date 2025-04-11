import type { ContentBlock } from "~/types/content-builder";

export default function renderListBlock(block: ContentBlock): string {
  const listType = block.listProps?.type || "bullet";
  let listContent = "";

  if (listType === "bullet") {
    listContent += '<ul class="list-disc pl-5 space-y-1">';
    (block.listProps?.items || ["Elemento 1", "Elemento 2"]).forEach(
      (item: string) => {
        listContent += `<li>${item}</li>`;
      }
    );
    listContent += "</ul>";
  } else if (listType === "numbered") {
    listContent += '<ol class="list-decimal pl-5 space-y-1">';
    (block.listProps?.items || ["Elemento 1", "Elemento 2"]).forEach(
      (item: string) => {
        listContent += `<li>${item}</li>`;
      }
    );
    listContent += "</ol>";
  } else if (listType === "check") {
    listContent += '<ul class="space-y-1">';
    (block.listProps?.items || ["Elemento 1", "Elemento 2"]).forEach(
      (item: string) => {
        listContent += `
        <li class="flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
          <span>${item}</span>
        </li>
      `;
      }
    );
    listContent += "</ul>";
  }

  return listContent;
}
