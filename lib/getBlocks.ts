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
            label: 
                page.properties.label?.rich_text
                    .map((t: any) => t.plain_text)
                    .join('') ?? '',
            heading: 
                page.properties.heading?.rich_text
                    .map((t: any) => t.plain_text)
                    .join('') ?? '',
            text: 
                page.properties.text?.rich_text
                    .map((t: any) => t.plain_text)
                    .join('')
                    .split('\n')
                    .map((p: string) => p.replace(/^-\s*/, '').trim())
                    .filter(Boolean) ?? [],
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