// template component used for project card previews
'use client';

import { Project } from '@/lib/projectTypes';
import { useState, useRef, useEffect, useMemo, memo } from 'react';

import { useActiveSection } from './active-section';
import GalleryImage from '@/app/components/gallery-image';
import { notionImage } from '@/lib/notionImage';
import { useMediaQuery } from './media-query';
import LinkArrow from '@/app/components/icons/link-arrow';
import Link from 'next/link';


type ProjectCardProps = {
	project: Project;
	isNext?: boolean;
	className?: string;
	big?: boolean;
	onClick?: () => void;
	featured?: boolean;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
	action?: React.ReactNode;
};

function ProjectCard({
	project,
	isNext,
	className = '',
	big,
	onClick,
	featured = false,
	onMouseEnter,
	onMouseLeave,
	action,
 }: ProjectCardProps) { 

	// ------ VIEWPORT DISPLAY ------ //
	const isDesktop = useMediaQuery('(min-width: 1024px)');

	// ------ DESKTOP ------ //
		// tags for each project
		const allTags = useMemo(() => {
			return [...(project.category ?? []), ...(project.programs ?? [])];
		}, [project.category, project.programs]);

		// for tag collapsing
		const containerRef = useRef<HTMLDivElement>(null);
		const measurerRef = useRef<HTMLSpanElement>(null);

		const [visibleCount, setVisibleCount] = useState(allTags.length);

		// measure tag visibility
		useEffect(() => {
			if (!containerRef.current || !measurerRef.current) return;

			const measureTags = () => {
				window.requestAnimationFrame(() => {
					const containerWidth = containerRef.current!.clientWidth;
					let used = 0;
					let count = 0;

					const temp = measurerRef.current!;
					temp.innerHTML = '';

					for (let tag of allTags) {
						const span = document.createElement('span');
						span.className = 'inline-block px-3 py-1 border border-white rounded-full text-nowrap font-medium text-[10px] 2xl:text-xs';
						span.textContent = tag;
						temp.appendChild(span);

						const tagWidth = span.offsetWidth + 24;
						if (used + tagWidth > containerWidth) break;
						used += tagWidth;
						count++;
					}

					setVisibleCount(count);
				});
			};

			measureTags();
			window.addEventListener('resize', measureTags);
			return () => window.removeEventListener('resize', measureTags);
		}, [allTags]);

		// for hover prompts/messages
		const isHeroProject = project.hero === true;
		const activeSection = useActiveSection();

		// only open external link if featured portfolio card
		const handleClick = () => {
			onClick?.();
		};
	
	// ------ MOBILE ------ //
		// ------ MOBILE STATE ------
		const scrollerRef = useRef<HTMLDivElement>(null);
		const indicatorRef = useRef<HTMLDivElement>(null);

		const [showScrollbar, setShowScrollbar] = useState(false);
		const [scrollTimer, setScrollTimer] = useState<NodeJS.Timeout | null>(null);

		// calculate how much to move scrollbar given # project images
		const handleScroll = () => {
			const scroller = scrollerRef.current;
			const indicator = indicatorRef.current;
			if (!scroller || !indicator) return;

			const containerWidth = scroller.clientWidth;
			const scrollWidth = scroller.scrollWidth;
			const scrollLeft = scroller.scrollLeft;
			const numImages = project.images.length;

			const progress = scrollLeft / (scrollWidth - containerWidth);

			const indicatorWidth = containerWidth / numImages;

			const maxTranslate = containerWidth - indicatorWidth;

			indicator.style.width = `${indicatorWidth}px`;
			indicator.style.transform = `translateX(${progress * maxTranslate}px)`;

			// show scrollbar
			setShowScrollbar(true);

			// hide after 1.2s inactivity
			if (scrollTimer) clearTimeout(scrollTimer);
			const timer = setTimeout(() => setShowScrollbar(false), 1200);
			setScrollTimer(timer);
		};

		// reset timer after inactivity
		useEffect(() => {
			return () => {
				if (scrollTimer) clearTimeout(scrollTimer);
			};
		}, [scrollTimer]);

	return isDesktop ? (
		<Link
            href={`/${project.slug}`}
            className='relative block w-full h-full group overflow-hidden cursor-pointer'
        >
			<div onClick={handleClick}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				className={`relative w-full h-full ${className} group overflow-hidden container-type-inline-size ${featured ? 'cursor-default' : 'cursor-pointer'}`}
			>
				{/* preview - native img with fetchpriority */}
				<img
					src={notionImage(project.images[0])}
					alt={project.title}
					fetchPriority={project.hero || featured ? 'high' : 'low'}
					loading={project.hero || featured ? 'eager' : 'lazy'}
					decoding={project.hero || featured ? 'sync' : 'async'}
					className={`absolute inset-0 w-full h-full object-cover object-center
							transition-transform duration-500 ease-out
							${featured ? '' : 'group-hover:scale-115'}`}
					draggable={false}
				/>	

				{/* gradient for text readability */}
				<div className={`absolute inset-0 bg-gradient-to-t from-(--dark-black)/70 from-5% via-(--dark-black)/55 via-16% to-transparent to-40% point-events-none
								${!featured && 'bg-[#131319]/15 transition duration-300 group-hover:bg-[#131319]/40'}`}/>

				{/* title */}
				<div className='absolute bottom-0 left-0 w-full p-6
								flex justify-between items-end text-white'>
					<h3 className='font-medium text-md  w-2/3'>{project.title}</h3>
					{/* <span className='inline-block px-3 py-1 pointer-events-none
										bg-(--black)/20 backdrop-blur-[1px] border border-white rounded-full 
										text-nowrap text-[10px] 2xl:text-xs'
					>
						{project.title}
					</span> */}
					<LinkArrow className={`text-(--bg-colour) ${big ? 'size-[54px]' : 'size-[40px]'}`}/>
				</div>

				{/* hover: nav to project case study */}
				<div className='absolute inset-0 place-self-center
								text-white font-medium text-nowrap drop-shadow-md
								opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0
								transition-all duration-100'>	
					<p className='text-xs xl:text-sm'>View case study</p>
				</div>

				
			</div>
		</Link>
	): (
		// mobile
		<div className='relative w-full h-full overflow-hidden'>
			<div className='relative w-full aspect-4/3'>
			{/* horizontal scroll */}
				<div
					ref={scrollerRef}
					onScroll={handleScroll}
					className='flex flex-row gap-4 h-full
								overflow-x-auto snap-x snap-mandatory touch-pan-x overscroll-x-contain
								scrollbar-none scroll-smooth'
				>
					{/* project images */}
					{project.images.map((img, i) => (		
						<div
							key={i}
							className='relative min-w-full h-full snap-center snap-always bg-(--bg-colour)'
							>
								<GalleryImage
									src={notionImage(img)}
									alt={`${project.title} image ${i + 1}`}
									className='absolute object-contain object-bottom sm:object-cover sm:object-center'
									onHoverStart={onMouseEnter}
									onHoverEnd={onMouseLeave}
									priority={i === 0}
								/>
								{/* gradient for scrollbar visibility */}
								<div className={`absolute inset-0 mx-2 bg-gradient-to-t from-(--dark-black)/30 from-5% via-(--dark-black)/15 via-16% to-transparent to-40% point-events-auto`}/>
						</div>
					))}
					{/* progress bar */}
					{project.images.length > 1 && (
						<div className={`absolute bottom-6 left-0 w-full h-[6px] overflow-hidden transition-opacity duration-500
										${showScrollbar ? 'opacity-100' : 'opacity-0'}`}
						>
							<div
								ref={indicatorRef}
								className='drop-shadow-lg h-full rounded-full bg-white/70 transition-transform duration-100 ease-out'
							/>
						</div>
					)}
				</div>
			</div>
		</div>

	)
}

export default memo(ProjectCard);