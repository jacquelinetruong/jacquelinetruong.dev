'use client';

import { useState, memo } from 'react';

interface GalleryImageProps {
	src: string;
	alt: string;
	className?: string;
	onHoverStart?: () => void;
	onHoverEnd?: () => void;
	priority?: boolean;
}

function GalleryImage({
	src,
	alt,
	className = '',
	onHoverStart,
	onHoverEnd,
	priority = false,
}: GalleryImageProps) {
	// get notion image done state
	const [loaded, setLoaded] = useState(false);

	return (
		<div
			className='group relative w-full h-full overflow-hidden'
			onMouseEnter={onHoverStart}
			onMouseLeave={onHoverEnd}
		>
			{/* placeholder bg */}
			{!loaded && (
				<div className='absolute inset-0 bg-gradient-to-b from-[#D7D6DD]/5 from-35% via-[#D7D6DD]/15 via-75% to-[#D7D6DD]/30' />
			)}

			{/* gallery image */}
			<img
				src={src}
				alt={alt}
				fetchPriority={priority ? 'high' : 'low'}
				loading={priority ? 'eager' : 'lazy'}
				decoding={priority ? 'sync' : 'async'}
				draggable={false}
				onLoad={() => setLoaded(true)}
				className={`absolute inset-0 w-full h-full ${loaded ? 'opacity-100' : 'opacity-0'} object-contain object-center transition-opacity duration-500 ease-out ${className}`}
			/>
		</div>
	);
}

export default memo(GalleryImage);