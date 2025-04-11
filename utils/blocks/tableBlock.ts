import type { ContentBlock } from "~/types/content-builder";

export default function renderTableBlock(block: ContentBlock): string {
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
