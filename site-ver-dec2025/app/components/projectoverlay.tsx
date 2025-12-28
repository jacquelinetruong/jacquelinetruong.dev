'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

import type { Project } from '@/lib/projectTypes';
import { Reveal } from './reveal';
import ProjectCard from './projectcard';

import GuideArrow from './icons/guide-arrow';
import Cat from './icons/cat';
import '../../public/caret-double-right-icon.svg';
import '../../public/caret-left-grey-icon.svg';
import '../../public/caret-right-icon.svg';


export default function ProjectOverlay({
	project,
	prevProject,
	nextProject,
	onPrev,
	onNext,
	onClose,
}: {
	project: Project;
	prevProject: Project | null;
	nextProject: Project | null;
	onPrev: () => void;
	onNext: () => void;
	onClose: () => void;
}) {

	// close modal
    useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};

		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, [onClose]);

	// scroll ref for project points
	const pointsRef = useRef<HTMLDivElement | null>(null);
	const [atBottom, setAtBottom] = useState(false);

	// check if at bottom of points container
	useEffect(() => {
		const el = pointsRef.current;

		if (!el) return;

		const onScroll = () => {
			const threshold = 8;
			const bottom = el.scrollTop + el.clientHeight >= el.scrollHeight - threshold;

			setAtBottom(bottom);
		};

		el.addEventListener('scroll', onScroll);
		onScroll();

		return () => el.removeEventListener('sroll', onScroll);
	}, []);

	return (
		<div className='fixed inset-0 z-500'>
			{/* unfocused backdrop  */}
			<motion.div
				className='absolute inset-0 z-500'
				onClick={onClose}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.25 }}
			/>

			{/* side panel */}
			<motion.aside
				className='absolute right-0 top-(--nav-height) z-500
							w-(--two-cell-width) h-full
							bg-(--bg-colour) border border-(--grid-line-colour)'
				initial={{ x: '100%' }}
				animate={{ x: 0 }}
				exit={{ x: '100%' }}
				transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
			>
				<div className='h-[calc(100dvh - var(--nav-height))] flex flex-col justify-between'>
					<div className='relative h-(--two-cell-height) font-inter flex flex-col py-8 px-6'>
						{/* close button */}
						<button
							onClick={onClose}
							className='w-fit h-fit p-2 rounded-2xl cursor-pointer
										hover:bg-(--grid-line-colour) transition-colors duration-200'
						>
							<Image 
								src='/caret-double-right-icon.svg'
								alt='close modal'
								width={20}
								height={20}
							/>
						</button>

						{/* title */}
						<div className='w-fit-h-fit'>
							<Reveal delay={0.1}>
								<h2 className='px-2 py-6 font-semibold sm:text-xl md:text-2xl '>{project.title}</h2>
							</Reveal>
						</div>

						{/* full project description */}
						<div 
							ref={pointsRef}
							className='relative px-2 flex flex-col gap-4
										overflow-y-auto overscroll-none'>

							{/* top gradient */}
							<span className={`absolute w-full  p-6
												bg-gradient-to-t from-transparent via-(--bg-colour)/80 via-75% to-(--bg-colour)
												transition-opacity duration-500
												${!atBottom ? 'opacity-100' : 'opacity-0'}`}/>

							{project.points?.map((point, i) => (
								<Reveal delay={0.1 + i * 0.1} className='w-fit h-fit'>
									<p key={i} className={`sm:text-sm md:text-base 2xl:text-lg
															${i === project.points?.length && 'pb-6'}`}>
										{point}
									</p>
								</Reveal>
							))} 

							{/* bottom gradient */}
							<span className={`absolute w-full left-0 bottom-0 p-6 
												bg-gradient-to-b from-transparent via-(--bg-colour)/80 via-25% to-(--bg-colour)
												transition-opacity duration-300
												${atBottom ? 'opacity-0' : 'opacity-100'}`}/>
						</div>

						{/* read more prompt */}
						{!!project.points?.length ? (
							<span className={`absolute w-full left-0 bottom-0 p-6 
											bg-gradient-to-b from-transparent via-(--bg-colour)/45 via-45% to-black/20 to-90%
											point-events-none
											flex flex-row justify-center align-center gap-1
											transition-opacity duration-300
											${atBottom ? 'opacity-0' : 'opacity-100'}`}>
									<p className='translate-y-2 font-inter text-xs lg:text-sm'>Read more</p>
									<GuideArrow className='size-[16px] lg:size-[18px] translate-y-2 '/>
							</span>
						): (
							<div className='flex flex-col gap-6'>
								<p className='px-2 text-(--light-mode-grey) sm:text-sm md:text-base 2xl:text-lg'>
									Oops, this project's expanded details are unavailable. Check out the external links for more info.
								</p>
								<Cat className='text-(--grid-line-colour)'/>
							</div>
						)}
					</div>

					{/* previous/next project prompts */}
					<div className='h-full bottom-0 bg-(--bg-colour)
									flex flex-row justify-between'>

						{/* prev/next buttons */}
						<div className='font-inter text-sm 2xl:text-base
										w-(--cell-width) h-(--cell-height)
										bottom-[calc(100vh - var(--cell-height))]
										flex flex-row justify-between items-end p-7'>
							<button 
								onClick={onPrev}
								className={`flex flex-row gap-1 px-2 py-1 rounded-2xl cursor-pointer
											hover:bg-(--grid-line-colour) transition-colors duration-200
											${!prevProject && 'hidden'}`}
							>
								<Image
									src='/caret-left-grey-icon.svg'
									alt='previous project'
									width={16}
									height={16}
								/>
								<p className='hidden md:block md:text-xs lg:text-sm font-medium text-nowrap text-(--light-mode-grey)'>Prev Project</p>
							</button>
							<button 
								onClick={onNext}
								className={`flex flex-row gap-1 px-2 py-1 rounded-2xl cursor-pointer
											hover:bg-(--grid-line-colour) transition-colors duration-200
											${!nextProject && 'hidden'}`}
							>
								<p className='hidden md:block md:text-xs lg:text-sm font-medium text-nowrap text-(--light-mode-grey)'>Next Project</p>
								<Image
									src='/caret-right-icon.svg'
									alt='previous project'
									width={16}
									height={16}
								/>
							</button>
						</div>

						<div className='w-(--cell-width) h-(--cell-height)'>
							{nextProject && (
								<ProjectCard
									project={nextProject}
									onClick={onNext}
								/>
							)}
						</div>
					</div>
				</div>
			</motion.aside>
		</div>
	);
}
