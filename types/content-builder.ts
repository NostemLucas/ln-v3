export type ComponentType =
  | "title"
  | "subtitle"
  | "text"
  | "divider"
  | "image"
  | "video"
  | "list"
  | "quote"
  | "code"
  | "table";

export type ObjectFitType = "cover" | "contain" | "fill" | "none";
export type ListType = "bullet" | "numbered" | "check";
export type QuoteStyle = "default" | "blockquote" | "pullquote";
export type DividerStyle = "solid" | "dashed" | "dotted" | "double";
export type TextAlignment = "left" | "center" | "right" | "justify";

export interface Template {
  id: string;
  name: string;
  thumbnail: string;
}

export interface FixedFields {
  title: string;
  author: string;
  bannerImage: string;
  date: string;
  category: string;
  summary: string;
}

export interface ImageProperties {
  alt: string;
  objectFit: ObjectFitType;
  height: number;
  caption?: string;
}

export interface ListProperties {
  type: ListType;
  items: string[];
}

export interface QuoteProperties {
  author: string;
  source: string;
  style: QuoteStyle;
}

export interface CodeProperties {
  language: string;
}

export interface TableProperties {
  rows: number;
  columns: number;
  headers: string[];
  data: string[][];
}

export interface TextProperties {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: string;
  alignment?: TextAlignment;
}

export interface DividerProperties {
  style: DividerStyle;
  thickness: number;
  color: string;
  width: number;
  alignment: TextAlignment;
}

export interface VideoProperties {
  provider: "youtube" | "vimeo" | "dailymotion";
  videoId: string;
  title: string;
  aspectRatio: "16:9" | "4:3" | "1:1";
  autoplay: boolean;
  controls: boolean;
}
export interface ContentBlock {
  id: string;
  type: ComponentType;
  content?: string;
  imageProps?: ImageProperties;
  listProps?: ListProperties;
  quoteProps?: QuoteProperties;
  videoProps?: VideoProperties;
  codeProps?: CodeProperties;
  tableProps?: TableProperties;
  textProps?: TextProperties;
  dividerProps?: DividerProperties;
  // GridStack properties
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ComponentDefinition {
  type: string;
  label: string;
}

export interface TitleProperties {
  alignment?: TextAlignment;
  fontSize?: number;
}

export interface ImageItem {
  url: string;
  alt?: string;
  date: Date;
}
