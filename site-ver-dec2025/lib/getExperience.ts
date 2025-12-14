// get experience from notion db

import { notion } from './notion';
import type { Experience } from './experienceTypes';

export async function getExperience(): Promise<Experience[]> {
    const databaseId = process.env.NOTION_DB_EXPERIENCE_ID!;

    const response = await notion.databases.query({
        database_id: databaseId,
    });

    return response.results
        .filter((page): page is any => 'properties' in page)
        .map((page): Experience => ({
            id: page.id,
            category: page.properties.category.select?.name ?? 'work',
            menuTitle: 
                page.properties.menuTitle.title
                    .map((t: any) => t.plain_text)
                    .join('') ?? '',
            position: page.properties.position.select?.name ?? '',
            startDate: page.properties.startDate.date?.start ?? null,
            endDate: page.properties.endDate.date?.start ?? null,
            current: page.properties.current.checkbox ?? false,
            points: 
                page.properties.points.rich_text
                    .map((t: any) => t.plain_text)
                    .join('')
                    .split('\n')
                    .map((p: string) => p.replace(/^-\s*/, '').trim())
                    .filter(Boolean) ?? [],
        }));
}