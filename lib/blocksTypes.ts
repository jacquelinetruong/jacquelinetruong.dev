// types according to notion content blocks db

export type Blocks = {
    id: string;
    section: string;
    order: number;
    block: 'section-header' | 'text' | 'list' | 'left-text-image' | 'right-text-image' | 'image-1' | 'image-2' | 'image-3' | '2-col' | 'space' | 'divider';
    label: string;
    heading: string;
    text: string[];
    images: string[];
}