import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get('url');

    if (!url) {
        return new NextResponse('Missing URL', { status: 400 });
    }

    const res = await fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0',
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        return new NextResponse('Image fetch failed', { status: res.status });
    }

    return new NextResponse(res.body, {
        headers: {
            'Content-Type': res.headers.get('content-type') ?? 'image/png',
            'Cache-Control': 'public, max-age=86400',
        },
    });
}