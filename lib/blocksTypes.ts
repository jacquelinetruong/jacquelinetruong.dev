// types according to notion content blocks db

import type { RichTextItem } from './richText';

export type Blocks = {
    id: string;
    section: string;
    order: number;
    block: 'section-title' | 'heading' | 'subheading' | 'text' | 'list' | 'left-text-image' | 'right-text-image' | 'image-1' | 'image-2' | 'image-3' | 'carousel' | 'divider';
    label: RichTextItem[];
    heading: RichTextItem[];
    text: RichTextItem[][];
    images: string[];
    alt: string[];
    caption: string[];
}