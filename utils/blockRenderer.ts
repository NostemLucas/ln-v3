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
        block.textProps?.color ? `color: '${block.textProps.color}';` : ""
      }">${block.content || "Título"}</div>`;
      break;
    case "subtitle":
      content += `<div class="font-medium text-xl md:text-2xl w-full ${textStyles}" style="${
        block.textProps?.color ? `color: ${block.textProps.color};` : ""
      }">${block.content || "Subtítulo"}</div>`;
      break;
    case "text":
      content += `
      <div>
        <div class="editor-toolbar" id="toolbar-${block.id}">
              <div class="toolbar-group">
                <button data-action="bold" class="toolbar-btn" title="Bold">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path></svg>
                </button>
                <button data-action="italic" class="toolbar-btn" title="Italic">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line></svg>
                </button>
                <button data-action="underline" class="toolbar-btn" title="Underline">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"></path><line x1="4" y1="21" x2="20" y2="21"></line></svg>
                </button>
                <button data-action="strike" class="toolbar-btn" title="Strike">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><path d="M16 6C16 6 16.5 8 13 8C9.5 8 7 9.5 7 13C7 16.5 10 18 13 18C16 18 16 16 16 16"></path></svg>
                </button>
              </div>
              
              <div class="toolbar-group">
                <button data-action="h1" class="toolbar-btn" title="Heading 1">H1</button>
                <button data-action="h2" class="toolbar-btn" title="Heading 2">H2</button>
                <button data-action="h3" class="toolbar-btn" title="Heading 3">H3</button>
                <button data-action="paragraph" class="toolbar-btn" title="Paragraph">¶</button>
              </div>
              
              <div class="toolbar-group">
                <button data-action="bulletList" class="toolbar-btn" title="Bullet List">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                </button>
                <button data-action="orderedList" class="toolbar-btn" title="Ordered List">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="10" y1="6" x2="21" y2="6"></line><line x1="10" y1="12" x2="21" y2="12"></line><line x1="10" y1="18" x2="21" y2="18"></line><path d="M4 6h1v4"></path><path d="M4 10h2"></path><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path></svg>
                </button>
                <button data-action="blockquote" class="toolbar-btn" title="Blockquote">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 11h-4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6c0 2.667-1.333 4.333-4 5"></path><path d="M19 11h-4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6c0 2.667-1.333 4.333-4 5"></path></svg>
                </button>
              </div>
              
              <div class="toolbar-group">
                <button data-action="alignLeft" class="toolbar-btn" title="Align Left">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="6" x2="3" y2="6"></line><line x1="15" y1="12" x2="3" y2="12"></line><line x1="17" y1="18" x2="3" y2="18"></line></svg>
                </button>
                <button data-action="alignCenter" class="toolbar-btn" title="Align Center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="6" x2="3" y2="6"></line><line x1="18" y1="12" x2="6" y2="12"></line><line x1="21" y1="18" x2="3" y2="18"></line></svg>
                </button>
                <button data-action="alignRight" class="toolbar-btn" title="Align Right">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="12" x2="9" y2="12"></line><line x1="21" y1="18" x2="7" y2="18"></line></svg>
                </button>
              </div>
              
              <div class="toolbar-group">
                <button data-action="undo" class="toolbar-btn" title="Undo">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7v6h6"></path><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"></path></svg>
                </button>
                <button data-action="redo" class="toolbar-btn" title="Redo">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 7v6h-6"></path><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"></path></svg>
                </button>
              </div>
            </div>
        <div class="tiptap-container" id="editor-${block.id}"/>
      </div>`;
      // content += `<div class="text-base w-full ${textStyles}" style="${
      //   block.textProps?.color ? `color: ${block.textProps.color};` : ""
      // }">${block.content || "Texto"}</div>`;
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
