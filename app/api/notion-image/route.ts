import { NextResponse } from 'next/server';

import { resolveNotionImageUrl } from '@/lib/notionFiles';
import type { NotionImageSource } from '@/lib/notionImage';

const IMAGE_HEADERS = {
	'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
};

async function fetchImage(url: string) {
	return fetch(url, {
		headers: {
			'User-Agent': 'Mozilla/5.0',
		},
		cache: 'no-store',
	});
}

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const source = searchParams.get('source') as NotionImageSource | null;
	const id = searchParams.get('id');
	const index = Number.parseInt(searchParams.get('index') ?? '0', 10);
	const legacyUrl = searchParams.get('url');

	let imageUrl: string | null = legacyUrl;

	if (source && id) {
		if (Number.isNaN(index) || index < 0) {
			return new NextResponse('Invalid image index', { status: 400 });
		}

		imageUrl = await resolveNotionImageUrl(source, id, index);
	}

	if (!imageUrl) {
		return new NextResponse('Missing or invalid image reference', { status: 400 });
	}

	let res = await fetchImage(imageUrl);

	// Signed Notion URLs can expire; resolve a fresh one and retry once.
	if (!res.ok && source && id) {
		const freshUrl = await resolveNotionImageUrl(source, id, index);
		if (freshUrl && freshUrl !== imageUrl) {
			imageUrl = freshUrl;
			res = await fetchImage(freshUrl);
		}
	}

	if (!res.ok) {
		return new NextResponse('Image fetch failed', { status: res.status });
	}

	return new NextResponse(res.body, {
		headers: {
			'Content-Type': res.headers.get('content-type') ?? 'image/png',
			...IMAGE_HEADERS,
		},
	});
}
