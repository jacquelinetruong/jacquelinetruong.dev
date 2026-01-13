// template component used for project card previews
'use client';

import { Project } from '@/lib/projectTypes';
import { useState, useRef, useEffect, useMemo } from 'react';
import Image from 'next/image';

import { notionImage } from '@/lib/notionImage';

import LinkArrow from './icons/link-arrow';
import { useMediaQuery } from './media-query';


type ProjectCardProps = {
	project: Project;
	isNext?: boolean;
	className?: string;
	onClick?: () => void;
	featured?: boolean;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
	action?: React.ReactNode;
};

export default function ProjectCard({
	project,
	isNext,
	className = '',
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
			return [...(project.languages ?? []), ...(project.programs ?? [])];
		}, [project.languages, project.programs]);

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
						span.className = 'inline-block px-3 py-1 border border-white rounded-full text-nowrap text-[10px] 2xl:text-xs';
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

		// show prompt if NOT portfolio card
		const showIcon = !featured && project.section !== 'portfolio';
		
		// only open external link if featured portfolio card
		const handleClick = () => {
			onClick?.();
		};

	
	// ------ MOBILE ------ //
		const [activeIndex, setActiveIndex] = useState(0);
		const scrollerRef = useRef<HTMLDivElement>(null);

		// carousel indicator/progress bar
		const handleScroll = () => {
			const el = scrollerRef.current;
			if (!el) return;

			const index = Math.round(el.scrollLeft / el.clientWidth);
			setActiveIndex(index);
		};
	
	return isDesktop ? (
		<div onClick={handleClick}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			className={`relative w-full h-full ${className} group overflow-hidden cursor-pointer container-type-inline-size`}
		>
			{/* preview */}
			<Image
				src={notionImage(project.images[0])}
				alt={project.title}
				fill
				className='object-cover object-center
						   transition-transform duration-500 ease-out
						   group-hover:scale-115'
				draggable={false}
				unoptimized
			/>	

			{/* gradient for text readability */}
			<div className={`absolute inset-0 bg-gradient-to-t from-(--dark-black)/70 from-5% via-(--dark-black)/55 via-16% to-transparent to-40% point-events-none
							${!featured && 'bg-[#13131B]/15 transition duration-300 group-hover:bg-[#13131B]/40'}`}/>

			{/* project details section */}
			<div className='text-white
							flex flex-row justify-between items-end
							absolute bottom-0 left-0 w-full p-6'>

				{/* content */}
				<div className='flex flex-col gap-1 flex-grow min-w-0 pr-6'>

					{/* tags */}
					{allTags.length > 0 && (
						<div 
							ref={containerRef}
							className='text-[10px] 2xl:text-xs
							  		   flex flex-nowrap gap-2 justify-start items-center
									   w-full'
						>
							{/* show tags that fit */}
							{allTags.slice(0, visibleCount).map(tag => (
								<span key={tag} className='inline-block px-3 py-1 pointer-events-none
															bg-(--black)/20 backdrop-blur-[1px] border border-white rounded-full 
															text-nowrap text-[10px] 2xl:text-xs'
								>
									{tag}
								</span>
							))}

							{/* show number of tags that don't fit */}
							{visibleCount < allTags.length && (
								<span className='inline-block px-3 py-1 pointer-events-none
													bg-(--black)/20 backdrop-blur-[1px] border border-white rounded-full 
													text-nowrap text-[10px] 2xl:text-xs'
								>
									+{allTags.length - visibleCount}
								</span>		
							)}

							{/* hidden element span */}
							<span
								ref={measurerRef}
								className='absolute opacity-0 px-3 py-1 pointer-events-none
											bg-(--black)/20 backdrop-blur-[1px] border border-white rounded-full 
											text-nowrap text-[10px] 2xl:text-xs'
								>
							</span>
						</div>
					)}
					{/* project title */}
					{!featured && <h3 className='font-medium text-md truncate'>{project.title}</h3>}
				</div>
			</div>

			{/* hover message (non-portfolio section project) */}
				{showIcon && (
					<div className='absolute inset-0 place-self-center
									text-white font-medium text-nowrap drop-shadow-md
									opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0
									transition-all duration-100'>	
						<p className='text-xs xl:text-sm'>Scroll to Project</p>
					</div>
				)}

			{/* hover: show hint message (only show IFF portfolio project card, and NOT next project in overlay) */}
			{!showIcon && !featured && !isNext && (
				<span className='font-medium text-white
									absolute inset-0 p-6
									opacity-0 translate-y-1
									group-hover:opacity-100 group-hover:translate-y-0
									transition-all duration-200
									whitespace-nowrap
									bg-gradient-to-t from-transparent via-black/15 via-70%  to-black/50 to-90% point-events-none'>
					
					<div className='flex flex-row gap-1'>
						<Image
							src='/caret-left-icon.svg'
							alt='caret left icon'
							width={14}
							height={14}
							draggable={false}
						/>
						<p className='text-xs xl:text-sm'>Focus project</p>
					</div>
				</span>
			)}

			{/* next project card in overlay */}
			{isNext && (
				<span className='font-medium text-white
									absolute inset-0 p-6
									opacity-100
									transition-all duration-200
									whitespace-nowrap
									bg-gradient-to-t from-transparent via-black/20 via-70%  to-black/60 to-90% point-events-none'>					
					<p className='text-xs xl:text-sm'>Next Project</p>
				</span>
			)}

			{/* render any actions if I want */}
			{featured && action && (
				<div className='absolute bottom-4 right-4 z-20'>
					{action}
				</div>
			)}
		</div>
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
							className='relative min-w-full h-full snap-center snap-always'
							>
								<Image
									src={notionImage(img)}
									alt={`${project.title} image ${i + 1}`}
									fill
									className='absolute object-contain object-bottom sm:object-cover sm:object-center'
									draggable={false}
									unoptimized
								/>

							{/* progress bar */}
							{project.images.length > 1 && (
							<div className='absolute place-self-end w-full h-fit
											items-center pointer-events-none'
							>
								<div className='w-full h-[6px] bg-(--nice-grey) relative overflow-hidden'>
									<div
										className='absolute inset-0 left-0 rounded-tr-full rounded-br-full bg-(--black) transition-all duration-300'
										style={{ width: `${((activeIndex + 1) / project.images.length) * 100}%`, }}
									/>
								</div>
							</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>

	)
}