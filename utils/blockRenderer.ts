import type { ContentBlock } from "~/types/content-builder";
import renderBlockControls from "./blocks/blockControls";
import renderDividerBlock from "./blocks/dividerBlock";
import renderImageBlock from "./blocks/imageRender.ts";
import renderVideoBlock from "./blocks/videoBlock";
import renderListBlock from "./blocks/listBlock";
import renderQuoteBlock from "./blocks/QuoteBlock";
import renderCodeBlock from "./blocks/codeBlock";
import renderTableBlock from "./blocks/tableBlock";

export function renderBlockContent(
  block: ContentBlock,
  isPreview = false
): string {
  // Contenedor general para el bloque
  let content = '<div class="p-3 h-full">';

  if (!isPreview) {
    content += renderBlockControls();
  }

  // TODO: SEPARAR LOGICA Aplicar propiedades de texto
  const textStyles = block.textProps
    ? `${block.textProps.bold ? "font-bold" : ""}
     ${block.textProps.italic ? "italic" : ""}
     ${block.textProps.underline ? "underline" : ""}
     ${block.textProps.color ? `color: ${block.textProps.color};` : ""}
     ${block.textProps.alignment ? `text-${block.textProps.alignment}` : ""}`
    : "";

  // Renderizar según el tipo de bloque
  switch (block.type) {
    case "title":
      content += `<div class="font-bold text-2xl md:text-3xl w-full ${textStyles}" style="${
        block.textProps?.color ? `color: ${block.textProps.color};` : ""
      }">${block.content || "Título"}</div>`;
      break;
    case "subtitle":
      content += `<div class="font-medium text-xl md:text-2xl w-full ${textStyles}" style="${
        block.textProps?.color ? `color: ${block.textProps.color};` : ""
      }">${block.content || "Subtítulo"}</div>`;
      break;
    case "text":
      content += `<div class="text-base w-full ${textStyles}" style="${
        block.textProps?.color ? `color: ${block.textProps.color};` : ""
      }">${block.content || "Texto"}</div>`;
      break;
    case "divider":
      content += renderDividerBlock(block);
      break;
    case "image":
      content += renderImageBlock(block);
      break;
    case "video":
      content += renderVideoBlock(block);
      break;
    case "list":
      content += renderListBlock(block);
      break;
    case "quote":
      content += renderQuoteBlock(block);
      break;
    case "code":
      content += renderCodeBlock(block);
      break;
    case "table":
      content += renderTableBlock(block);
      break;
    default:
      break;
  }
  content += "</div>";
  return content;
}
