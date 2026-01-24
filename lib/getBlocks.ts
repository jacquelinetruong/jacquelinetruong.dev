// get content blocks from notion db

import { notion } from './notion';
import type { Blocks } from './blocksTypes';

export async function getBlocks(projectId: string): Promise<Blocks[]> {
    if (!projectId) throw new Error('projectId is required for getBlocks');
    
    const databaseId = process.env.NOTION_DB_BLOCKS_ID!;

    const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
            property: 'project',
            relation: { contains: projectId },
        },
        sorts: [
            {
                // order of content blocks
                property: 'order',
                direction: 'ascending',
            },
        ],
    });

    return response.results
        .filter((page): page is any => 'properties' in page)
        .map((page): Blocks => ({
            id: page.id,
            section: page.properties.section.select?.name ?? '',
            order: page.properties.order.number ?? 0,
            block: page.properties.block.select?.name ?? '',
            label: page.properties.label?.rich_text ?? [],
            heading: page.properties.heading?.rich_text ?? [],
            text: (() => {
                const richText = page.properties.text?.rich_text ?? [];
                if (richText.length === 0) return [];
                
                // split text by newlines, group items by paragraph
                const paragraphs: any[][] = [];
                let currentParagraph: any[] = [];
                let isFirstParagraph = true;
                const stripLeadingDash = (text: string) =>text.replace(/^-\s*/, '');
                
                
                for (const item of richText) {
                    const text = item.plain_text;
                    const lines = text.split('\n');
                    
                    // current paragraph
                    if (lines[0]) {
                        let firstLine = lines[0];
                        // clean extra leading or trailing characters
                        if (isFirstParagraph) {
                            firstLine = stripLeadingDash(firstLine);
                        }
                        if (firstLine) {
                            currentParagraph.push({ ...item, plain_text: firstLine });
                        }
                    }
                    
                    // new paragraph
                    for (let i = 1; i < lines.length; i++) {
                        if (currentParagraph.length > 0) {
                            paragraphs.push(currentParagraph);
                            currentParagraph = [];
                        }
                        if (lines[i]) {
                            // clean extra leading or trailing characters
                            const cleaned = stripLeadingDash(lines[i]);
                            if (cleaned) {
                                currentParagraph.push({ ...item, plain_text: cleaned });
                            }
                        }
                    }
                }
                
                // last paragraph
                if (currentParagraph.length > 0) {
                    paragraphs.push(currentParagraph);
                }
                
                return paragraphs.filter(p => p.length > 0);
            })() ?? [],
            images:
                page.properties.images.files?.map((file: any) => {
                    if (file.type === 'file') return file.file.url;
                    if (file.type === 'external') return file.external.url;
                    return '';
                }).filter(Boolean) ?? [],
            alt: 
                page.properties.altText?.rich_text
                    .map((t: any) => t.plain_text)
                    .join('')
                    .split('\n')
                    .map((p: string) => p.replace(/^-\s*/, '').trim())
                    .filter(Boolean) ?? [],
        }));
}