export type ComponentType =
  | "title"
  | "subtitle"
  | "text"
  | "divider"
  | "video"
  | "image"
  | "list"
  | "quote"
  | "code"
  | "table";

export type Template = {
  id: string;
  name: string;
  thumbnail: string;
};

export type FixedFields = {
  title: string;
  author: string;
  bannerImage: string;
  date: string;
  category: string;
  summary: string;
};

export type TextAlignment = "left" | "center" | "right";

export type ImageProperties = {
  alt: string;
  objectFit: "cover" | "contain" | "fill";
  height: number;
};

export type VideoProperties = {
  provider: "youtube" | "vimeo";
  videoId: string;
  title: string;
  aspectRatio: "16:9" | "4:3" | "1:1";
  autoplay: boolean;
  controls: boolean;
};

export type ListProperties = {
  type: "bullet" | "numbered";
  items: string[];
};

export type QuoteProperties = {
  author: string;
  source: string;
  style: "default" | "alternative";
};

export type CodeProperties = {
  language: string;
};

export type TableProperties = {
  rows: number;
  columns: number;
  headers: string[];
  data: string[][];
};

export type DividerProperties = {
  style: "solid" | "dashed" | "dotted";
  thickness: number;
  color: string;
  width: number;
  alignment: "left" | "center" | "right";
};

export type ContentBlock = {
  id: string;
  type: ComponentType;
  content: string;
  imageProps?: ImageProperties;
  listProps?: ListProperties;
  quoteProps?: QuoteProperties;
  codeProps?: CodeProperties;
  tableProps?: TableProperties;
  textProps?: {
    bold: boolean;
    italic: boolean;
    underline: boolean;
    color?: string;
    alignment?: TextAlignment;
  };
  dividerProps?: DividerProperties;
  videoProps?: VideoProperties;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type ComponentDefinition = {
  type: ComponentType;
  label: string;
};

export type ImageItem = {
  id: string;
  url: string;
  alt?: string;
};
