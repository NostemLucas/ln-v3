import type { ContentBlock } from "~/types/content-builder";

export default function renderQuoteBlock(block: ContentBlock): string {
  const quoteStyle = block.quoteProps?.style || "default";

  if (quoteStyle === "default") {
    return `
      <blockquote class="border-l-4 border-gray-300 pl-4 italic text-gray-700">
        <p>${block.content || "Ingrese texto de la cita aquí"}</p>
        ${
          block.quoteProps?.author
            ? `<footer class="mt-2 text-sm">— ${block.quoteProps.author}${
                block.quoteProps.source
                  ? `, <cite>${block.quoteProps.source}</cite>`
                  : ""
              }</footer>`
            : ""
        }
      </blockquote>
    `;
  } else if (quoteStyle === "blockquote") {
    return `
      <blockquote class="bg-gray-50 p-4 rounded-md border-l-4 border-emerald-500">
        <p class="text-lg">${
          block.content || "Ingrese texto de la cita aquí"
        }</p>
        ${
          block.quoteProps?.author
            ? `<footer class="mt-2 text-sm font-medium">— ${
                block.quoteProps.author
              }${
                block.quoteProps.source
                  ? `, <cite>${block.quoteProps.source}</cite>`
                  : ""
              }</footer>`
            : ""
        }
      </blockquote>
    `;
  } else if (quoteStyle === "pullquote") {
    return `
      <div class="relative">
        <div class="text-6xl text-emerald-200 absolute -top-4 left-0">"</div>
        <blockquote class="text-xl font-medium text-center px-8 py-4">
          <p>${block.content || "Ingrese texto de la cita aquí"}</p>
          ${
            block.quoteProps?.author
              ? `<footer class="mt-4 text-sm font-normal text-gray-500">— ${
                  block.quoteProps.author
                }${
                  block.quoteProps.source
                    ? `, <cite>${block.quoteProps.source}</cite>`
                    : ""
                }</footer>`
              : ""
          }
        </blockquote>
        <div class="text-6xl text-emerald-200 absolute -bottom-10 right-0">"</div>
      </div>
    `;
  }

  return "";
}
