// get experience from notion db

import { notion } from './notion';
import type { Experience } from './experienceTypes';

export async function getExperience(): Promise<Experience[]> {
    const databaseId = process.env.NOTION_DB_EXPERIENCE_ID!;

    const response = await notion.databases.query({
        database_id: databaseId,
        sorts: [
            {
                // order of proficiencies
                property: 'order',
                direction: 'ascending',
            },
        ],
    });

    return response.results
        .filter((page): page is any => 'properties' in page)
        .map((page): Experience => ({
            id: page.id,
            order: page.properties.order.number ?? 0,
            category: page.properties.category.select?.name ?? 'work',
            menuTitle: 
                page.properties.menuTitle.title
                    .map((t: any) => t.plain_text)
                    .join('') ?? '',
            position: page.properties.position.select?.name ?? '',
            startDate: page.properties.startDate.date?.start ?? null,
            endDate: page.properties.endDate.date?.start ?? null,
            current: page.properties.current.checkbox ?? false,
            points: (() => {
                const richText = page.properties.points.rich_text ?? [];
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
        }));
}