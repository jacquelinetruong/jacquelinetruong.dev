import { notion } from './notion';
import type { NotionImageSource } from './notionImage';

export function extractFileUrls(files: unknown[] | undefined): string[] {
	if (!files) return [];

	return files
		.map((file: any) => {
			if (file.type === 'file') return file.file.url as string;
			if (file.type === 'external') return file.external.url as string;
			return '';
		})
		.filter(Boolean);
}

export async function resolveNotionImageUrl(
	source: NotionImageSource,
	id: string,
	index: number,
): Promise<string | null> {
	const page = await notion.pages.retrieve({ page_id: id });
	const properties = (page as { properties?: { images?: { files?: unknown[] } } }).properties;
	const urls = extractFileUrls(properties?.images?.files);

	return urls[index] ?? null;
}
