// types according to notion content blocks db

import type { RichTextItem } from './richText';

export type Blocks = {
    id: string;
    section: string;
    order: number;
    block: 'section-header' | 'text' | 'list' | 'left-text-image' | 'right-text-image' | 'image-1' | 'image-2' | 'image-3' | 'divider';
    label: RichTextItem[];
    heading: RichTextItem[];
    text: RichTextItem[][]; // Array of rich text items per paragraph
    images: string[];
    alt: string[];
}