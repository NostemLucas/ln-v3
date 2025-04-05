export interface Template {
  id: string;
  name: string;
  thumbnail: string;
}

export interface FixedFields {
  title: string;
  author: string;
  bannerImage: string;
}

export interface ImageProperties {
  alt: string;
  objectFit: "cover" | "contain" | "fill" | "none";
  height: number;
}

export interface ContentBlock {
  id: string;
  type: "title" | "subtitle" | "text" | "divider" | "image" | "columns";
  content?: string;
  width:
    | "full"
    | "half"
    | "third"
    | "quarter"
    | "two-thirds"
    | "three-quarters";
  columns?: number;
  columnContent?: string[];
  rowId: string;
  imageProps?: ImageProperties;
  customClasses?: string;
}

export interface ContentRow {
  id: string;
  blocks: ContentBlock[];
}

export interface ContentBuilderState {
  selectedTemplate: string | null;
  fixedFields: FixedFields;
  rows: ContentRow[];
  selectedBlockId: string | null;
}
