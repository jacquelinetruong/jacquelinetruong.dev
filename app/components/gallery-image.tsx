'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function GalleryImage({
	src,
	alt,
	className = '',
	onHoverStart,
	onHoverEnd,
}: {
	src: string;
	alt: string;
	className?: string;
	onHoverStart?: () => void;
	onHoverEnd?: () => void;
}) {
	// get notion image done state
	const [loaded, setLoaded] = useState(false);

	return (
		<div
			className="group relative w-full h-full overflow-hidden"
			onMouseEnter={onHoverStart}
			onMouseLeave={onHoverEnd}
		>
			{/* placeholder bg */}
			{!loaded && (
				<div className="absolute inset-0 bg-gradient-to-b from-[#D7D6DD]/5 from-35% via-[#D7D6DD]/15 via-75% to-[#D7D6DD]/30" />
			)}

			{/* gallery image */}
			<Image
				src={src}
				alt={alt}
				fill
				draggable={false}
				unoptimized
				onLoadingComplete={() => setLoaded(true)}
				className={`${loaded ? 'opacity-100' : 'opacity-0'} object-contain object-center transition-opacity duration-500 ease-out ${className}`}
			/>
		</div>
	);
}
