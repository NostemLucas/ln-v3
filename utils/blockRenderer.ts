import type { ContentBlock } from "~/types/content-builder";

export function renderBlockContent(
  block: ContentBlock,
  isPreview = false
): string {
  // Contenedor general para el bloque
  let content = '<div class="p-3 h-full">';

  // Aplicar propiedades de texto
  const textStyles = block.textProps
    ? `${block.textProps.bold ? "font-bold" : ""}
     ${block.textProps.italic ? "italic" : ""}
     ${block.textProps.underline ? "underline" : ""}
     ${block.textProps.color ? `color: ${block.textProps.color};` : ""}
     ${block.textProps.alignment ? `text-${block.textProps.alignment}` : ""}`
    : "";

  // Renderizar según el tipo de bloque
  if (block.type === "title") {
    content += `<div class="font-bold text-2xl md:text-3xl w-full ${textStyles}" style="${
      block.textProps?.color ? `color: ${block.textProps.color};` : ""
    }">${block.content || "Título"}</div>`;
  } else if (block.type === "subtitle") {
    content += `<div class="font-medium text-xl md:text-2xl w-full ${textStyles}" style="${
      block.textProps?.color ? `color: ${block.textProps.color};` : ""
    }">${block.content || "Subtítulo"}</div>`;
  } else if (block.type === "text") {
    content += `<div class="text-base w-full ${textStyles}" style="${
      block.textProps?.color ? `color: ${block.textProps.color};` : ""
    }">${block.content || "Texto"}</div>`;
  } else if (block.type === "divider") {
    content += renderDividerBlock(block);
  } else if (block.type === "image") {
    content += renderImageBlock(block);
  } else if (block.type === "video") {
    content += renderVideoBlock(block);
  } else if (block.type === "list") {
    content += renderListBlock(block);
  } else if (block.type === "quote") {
    content += renderQuoteBlock(block);
  } else if (block.type === "code") {
    content += renderCodeBlock(block);
  } else if (block.type === "table") {
    content += renderTableBlock(block);
  }

  content += "</div>";
  return content;
}

// Funciones auxiliares para cada tipo específico de bloque

function renderDividerBlock(block: ContentBlock): string {
  const dividerProps = block.dividerProps || {
    style: "solid",
    thickness: 1,
    color: "#e5e5e5",
    width: 100,
    alignment: "center",
  };

  const dividerAlignment =
    dividerProps.alignment === "left"
      ? "mr-auto"
      : dividerProps.alignment === "right"
      ? "ml-auto"
      : "mx-auto";

  return `
    <div class="flex ${
      dividerAlignment === "mx-auto"
        ? "justify-center"
        : dividerAlignment === "ml-auto"
        ? "justify-end"
        : "justify-start"
    }">
      <hr class="${dividerAlignment}" style="
        border: 0;
        border-top-style: ${dividerProps.style};
        border-top-width: ${dividerProps.thickness}px;
        border-top-color: ${dividerProps.color};
        width: ${dividerProps.width}%;
      " />
    </div>
  `;
}

function renderImageBlock(block: ContentBlock): string {
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

function renderVideoBlock(block: ContentBlock): string {
  const videoProps = block.videoProps || {
    provider: "youtube",
    videoId: "",
    title: "Video embebido",
    aspectRatio: "16:9",
    autoplay: false,
    controls: true,
  };

  let embedUrl = "";
  let aspectRatioClass = "aspect-video"; // 16:9 por defecto

  if (videoProps.aspectRatio === "4:3") {
    aspectRatioClass = "aspect-[4/3]";
  } else if (videoProps.aspectRatio === "1:1") {
    aspectRatioClass = "aspect-square";
  }

  if (videoProps.provider === "youtube") {
    embedUrl = `https://www.youtube.com/embed/${videoProps.videoId}?autoplay=${
      videoProps.autoplay ? 1 : 0
    }&controls=${videoProps.controls ? 1 : 0}`;
  } else if (videoProps.provider === "vimeo") {
    embedUrl = `https://player.vimeo.com/video/${videoProps.videoId}?autoplay=${
      videoProps.autoplay ? 1 : 0
    }&controls=${videoProps.controls ? 1 : 0}`;
  } else if (videoProps.provider === "dailymotion") {
    embedUrl = `https://www.dailymotion.com/embed/video/${
      videoProps.videoId
    }?autoplay=${videoProps.autoplay ? 1 : 0}&controls=${
      videoProps.controls ? 1 : 0
    }`;
  }

  return `
    <div class="w-full h-full">
      <div class="${aspectRatioClass} w-full overflow-hidden rounded-md bg-gray-100">
        ${
          videoProps.videoId
            ? `<iframe 
                src="${embedUrl}" 
                title="${videoProps.title || "Video embebido"}" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
                class="w-full h-full"
              ></iframe>`
            : `<div class="w-full h-full flex items-center justify-center bg-gray-100">
                <div class="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p class="text-gray-500">Ingrese un ID de video</p>
                </div>
              </div>`
        }
      </div>
      ${
        videoProps.title
          ? `<p class="text-sm text-gray-500 mt-2">${videoProps.title}</p>`
          : ""
      }
    </div>
  `;
}

function renderListBlock(block: ContentBlock): string {
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

function renderQuoteBlock(block: ContentBlock): string {
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

function renderCodeBlock(block: ContentBlock): string {
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

function renderTableBlock(block: ContentBlock): string {
  const rows = block.tableProps?.rows || 2;
  const columns = block.tableProps?.columns || 2;
  const headers =
    block.tableProps?.headers || Array(columns).fill("Encabezado");
  const data =
    block.tableProps?.data || Array(rows).fill(Array(columns).fill("Celda"));

  return `
    <div class="overflow-x-auto">
      <table class="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-100">
            ${headers
              .map(
                (header: string) =>
                  `<th class="border border-gray-300 px-4 py-2 text-left">${header}</th>`
              )
              .join("")}
          </tr>
        </thead>
        <tbody>
          ${data
            .map(
              (row: string[]) =>
                `<tr>
              ${row
                .map(
                  (cell: string) =>
                    `<td class="border border-gray-300 px-4 py-2">${cell}</td>`
                )
                .join("")}
            </tr>`
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}
