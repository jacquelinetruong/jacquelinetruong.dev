'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

import Grid from './grid';
import RightArrow from '@/app/components/icons/right-arrow';
import { notionImage } from '@/lib/notionImage';
import { Project } from '@/lib/projectTypes';

type CarouselImage = {
	id?: string;
	image: string;
	title?: string;
	description?: string;
	href?: string;
	alt?: string;
};

type CarouselSlide = {
	id: string;
	image: string;
	alt: string;
	title?: string;
	description?: string;
	href?: string;
};

type CarouselProps = {
	className?: string;
	projects?: Project[];
	images?: CarouselImage[];
	projectType?: Project['type'] | 'all';
	section?: string | null;
	title?: string | ((slide: CarouselSlide) => string);
	description?: string | null;
	cardBgClassName?: string;
	gradient?: boolean;
	mailable?: boolean;
	ctaLink?: string;
	ctaMail?: string;
};

export default function Carousel({
	className = '',
	projects = [],
	images = [],
	projectType = 'all',
	section,
	title,
	description,
	cardBgClassName = 'bg-(--nice-grey)/50',
	gradient = true,
	mailable = false,
	ctaLink = 'Take me there',
	ctaMail = 'Contact me for details',
}: CarouselProps) {
	const scrollerRef = useRef<HTMLDivElement>(null);
	const [activeIndex, setActiveIndex] = useState(0);

	const slides = useMemo(
		() => {
			if (projects.length > 0) {
				return projects
					.filter(
						(project) =>
							project.images?.length > 0 && (projectType === 'all' || project.type === projectType),
					)
					.map((project) => ({
						id: project.id,
						image: notionImage(project.images[0]),
						alt: project.title,
						title: project.title,
						description: project.description,
						href: `/work/${project.slug}`,
					}));
			}

			return images.map((image, index) => ({
				id: image.id ?? `image-slide-${index}`,
				image: image.image,
				alt: image.alt ?? image.title ?? `Carousel image ${index + 1}`,
				title: image.title,
				description: image.description,
				href: image.href,
			}));
		},
		[projects, projectType, images],
	);
	const activeSlide = slides[activeIndex];

	useEffect(() => {
		const scroller = scrollerRef.current;
		if (!scroller) return;

		const onScroll = () => {
			const firstSlide = scroller.firstElementChild as HTMLElement | null;
			if (!firstSlide) return;

			const styles = window.getComputedStyle(scroller);
			const gap = Number.parseFloat(styles.columnGap || styles.gap || '0');
			const step = firstSlide.offsetWidth + gap;
			if (!step) return;

			const index = Math.round(scroller.scrollLeft / step);
			setActiveIndex(Math.max(0, Math.min(index, slides.length - 1)));
		};

		scroller.addEventListener('scroll', onScroll, { passive: true });
		return () => scroller.removeEventListener('scroll', onScroll);
	}, [slides.length]);

	const goToSlide = (index: number) => {
		const scroller = scrollerRef.current;
		if (!scroller) return;

		const clamped = Math.max(0, Math.min(index, slides.length - 1));
		const firstSlide = scroller.firstElementChild as HTMLElement | null;
		const styles = window.getComputedStyle(scroller);
		const gap = Number.parseFloat(styles.columnGap || styles.gap || '0');
		const step = (firstSlide?.offsetWidth ?? scroller.clientWidth) + gap;

		scroller.scrollTo({ left: step * clamped, behavior: 'smooth' });
		setActiveIndex(clamped);
	};

	if (!slides.length) return null;

	const resolvedTitle = typeof title === 'function' ? title(activeSlide) : title ?? activeSlide?.title ?? '';

	return (
		<Grid>
			{/* title */}
			<div className='col-start-1 col-span-3 row-start-1 px-5 py-6 self-end'>
				{section ? <p className='text-(--grey) text-2xl font-normal'>{section}</p> : null}
				<div>
					<h2 className='text-(--text-colour) text-3xl font-medium'>{resolvedTitle}</h2>
					{description && (
						<p className='mt-2 text-sm text-(--light-black)'>{description}</p>
					)}
				</div>
			</div>

			<div className='col-start-1 col-span-3 row-start-2 row-span-2'>
				<div
					ref={scrollerRef}
					className='w-full h-full flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none scroll-smooth'
				>
					{slides.map((slide) => (
						<article
							key={slide.id}
							className={`relative w-[85%] shrink-0 snap-start ${cardBgClassName}`}
						>
							<div className='w-full h-full aspect-4/3 overflow-hidden'>
								<img
									src={slide.image}
									alt={slide.alt}
									className='relative h-full w-full object-cover object-center'
									draggable={false}
								/>
								{gradient ? (
									<div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-(--dark-black)/70 from-5% via-(--dark-black)/55 via-16% to-transparent to-40%' />
								) : null}

								{slide.href ? (
									<a 
										className='absolute inset-0 p-4 flex items-end gap-3'
										href={mailable ? 'mailto:hello@jacquelinetruong.dev' : slide.href}
										aria-label={`Open ${slide.title ?? 'slide'}`}>
										<span
											
											className='rounded-full border border-(--off-white) px-4 py-2 text-xs text-(--off-white)'
										>
											{mailable ? ctaMail : ctaLink}
										</span>
										<div className='ml-auto text-(--off-white)'>
											{mailable ? <></> : <RightArrow className='size-8'/>}
										</div>
									</a>
								) : null}
							</div>
						</article>
					))}
				</div>
			</div>

			<div className='col-start-1 col-span-3 row-start-4 flex justify-center gap-2 py-4'>
				{slides.map((slide, index) => (
					<button
						key={slide.id}
						type='button'
						onClick={() => goToSlide(index)}
						aria-label={`Go to ${slide.title ?? `slide ${index + 1}`}`}
						aria-current={activeIndex === index}
						className={`size-2 rounded-full transition-colors ${
							activeIndex === index ? 'bg-(--dark-black)' : 'bg-(--grey)'
						}`}
					/>
				))}
			</div>
		</Grid>
	);
}