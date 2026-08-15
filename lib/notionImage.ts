export type NotionImageSource = 'project' | 'block';

export function notionProjectImage(projectId: string, index = 0) {
	return `/api/notion-image?source=project&id=${encodeURIComponent(projectId)}&index=${index}`;
}

export function notionBlockImage(blockId: string, index = 0) {
	return `/api/notion-image?source=block&id=${encodeURIComponent(blockId)}&index=${index}`;
}

/** @deprecated Prefer notionProjectImage / notionBlockImage for stable first-load URLs. */
export const notionImage = (url: string) => `/api/notion-image?url=${encodeURIComponent(url)}`;
