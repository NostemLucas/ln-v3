import type { ContentBlock } from "~/types/content-builder";

export default function renderDividerBlock(block: ContentBlock): string {
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
