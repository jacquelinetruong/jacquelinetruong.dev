// components/preload-lcp-image.tsx
'use client';

import { useEffect } from 'react';

export function PreloadLCPImage({ src }: { src: string }) {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    link.fetchPriority = 'high';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [src]);

  return null;
}