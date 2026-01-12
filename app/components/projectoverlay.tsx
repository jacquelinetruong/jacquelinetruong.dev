'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { createPortal } from 'react-dom';

import type { Project } from '@/lib/projectTypes';
import { Reveal } from './reveal';
import ProjectCard from './projectcard';

import GuideArrow from './icons/guide-arrow';
import Cat from './icons/cat-icon';
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
	imagesRef,
	buttonsRef,
}: {
	project: Project;
	prevProject: Project | null;
	nextProject: Project | null;
	onPrev: () => void;
	onNext: () => void;
	onClose: () => void;
	imagesRef: React.RefObject<HTMLDivElement | null>;
	buttonsRef: React.RefObject<HTMLDivElement | null>;
}) {

	// close modal with esc key
    useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};

		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, [onClose]);

	// close modal if user clicks outside
	const panelRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handlePointerDown = (e: PointerEvent) => {
			const target =  e.target as Node;

			// ignore clicks inside side panel
			if (panelRef.current?.contains(target)) return;

			// ignore clicks on project images
			if (imagesRef.current?.contains(target)) return;

			// ignore clicks on external buttons
			if (buttonsRef?.current?.contains(target)) return;

			onClose();
		};

		document.addEventListener('pointerdown', handlePointerDown);
		return() => document.removeEventListener('pointerdown', handlePointerDown);
	}, [onClose, imagesRef, buttonsRef]);

	// scroll ref for project points
	const pointsRef = useRef<HTMLDivElement | null>(null);
	const [atBottom, setAtBottom] = useState(false);
	const [atTop, setAtTop] = useState(true);

	// check if at top/bottom of points scroll container
	useEffect(() => {
		const el = pointsRef.current;

		if (!el) return;

		const threshold = 8;

		const onScroll = () => {	
			const top = el.scrollTop <= threshold;
			const bottom = el.scrollTop + el.clientHeight >= el.scrollHeight - threshold;

			setAtTop(top);
			setAtBottom(bottom);
		};

		el.addEventListener('scroll', onScroll);
		onScroll();

		return () => el.removeEventListener('scroll', onScroll);
	}, []);


	return (
		<div className='fixed right-0 top-(--nav-height) w-(--two-cell-width) h-full pointer-events-none z-40'>
			{/* unfocused backdrop  */}
			<motion.div
				className='absolute right-(--two-cell-width) h-full z-30'
				onClick={onClose}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.25 }}
			/>

			{/* side panel */}
			<motion.aside
				ref={panelRef}
				className='absolute right-0 top-0 pointer-events-auto
							w-(--two-cell-width) h-full
							bg-(--bg-colour) border border-(--grid-line-colour) z-40'
				initial={{ x: '100%' }}
				animate={{ x: 0 }}
				exit={{ x: '100%' }}
				transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
			>
				<div className='h-[calc(100dvh - var(--nav-height))] flex flex-col justify-between'>
					<div className='relative h-(--two-cell-height) flex flex-col py-8 px-6'>
						{/* close button */}
						<button
							onClick={onClose}
							className='relative w-fit h-fit p-2 rounded-xl cursor-pointer group
										hover:bg-(--grid-line-colour) transition-colors duration-200'
						>
							<Image 
								src='/caret-double-right-icon.svg'
								alt='close modal'
								width={20}
								height={20}
							/>
							{/* tooltip */}
							<span className='absolute translate-y-4 -translate-x-2
										w-fit h-fit px-3 py-2 rounded-xl 
										flex flex-col items-start gap-0
										bg-(--dark-black)/80 border border-(--dark-grey) shadow-lg backdrop-blur-sm
										opacity-0 group-hover:opacity-100
										transition-opacity duration-100'>
								<p className='font-medium text-sm text-white '>Close</p>
								<p className='text-sm text-(--grey) '>Esc</p>
							</span>
						</button>

						{/* title */}
						<div className='w-fit-h-fit'>
							<Reveal delay={0.1}>
								<h2 className='px-2 py-6 font-semibold sm:text-xl md:text-2xl '>{project.title}</h2>
							</Reveal>
						</div>

						{/* full project description */}
						{!!project.points?.length ? (
						<div 
							ref={pointsRef}
							className='relative px-2 flex flex-col gap-4 3xl:gap-8 py-0
										overflow-y-auto overscroll-none'>

							{/* top gradient */}
							<span className={`top-0 left-0 w-full p-6 
												bg-gradient-to-t from-transparent via-(--bg-colour)/80 via-75% to-(--bg-colour)
												transition-opacity duration-300
												${atTop ? 'opacity-0 hidden' : 'opacity-100 sticky'}`}/>

							{project.points?.map((point, i) => (
								<Reveal delay={0.1 + i * 0.1} className='w-fit h-fit'>
									<p key={i} className={`sm:text-[10px] md:text-sm 2xl:text-base 3xl:text-lg 3xl:w-4/5
															${i === project.points?.length && 'pb-6'}`}>
										{point}
									</p>
								</Reveal>
							))} 

							{/* bottom gradient */}
							<span className={`absolute w-full left-0 bottom-0 p-6 
													bg-gradient-to-b from-transparent via-(--bg-colour)/80 via-85% to-(--bg-colour)
													transition-opacity duration-300
													${atBottom ? 'opacity-0' : 'opacity-100'}`}/>
						</div>
						) : (
							<div className='flex flex-col gap-6'>
								<p className='px-2 text-(--light-mode-grey) sm:text-sm md:text-base 2xl:text-lg'>
									Oops, this project's expanded details are unavailable. Check out the external links for more info.
								</p>
								<Cat className='text-(--grid-line-colour)'/>
							</div>
						)}

						{/* read more prompt */}
						{!!project.points?.length && (
							<>
								<span className={`absolute w-full left-0 bottom-0 p-6 
												bg-gradient-to-b from-transparent via-black/45 via-45% to-black/20 to-95% 
												point-events-none
												flex flex-row justify-center align-center gap-1
												transition-opacity duration-300
												${atBottom ? 'opacity-0' : 'opacity-100'}`}>
										<p className='translate-y-2 text-xs lg:text-sm'>Read more</p>
										<GuideArrow className='size-[16px] lg:size-[18px] translate-y-2 '/>
								</span>
								{/* extra gradient to blend */}
								<span className={`absolute w-full left-0 bottom-0 p-6 
													bg-gradient-to-b from-transparent from-80% via-(--bg-colour)/50 via-90% to-(--bg-colour)
													transition-opacity duration-300
													${atBottom ? 'opacity-0' : 'opacity-100'}`}/>
							</>
						)}
					</div>

					{/* previous/next project prompts */}
					<div className='h-full bottom-0 bg-(--bg-colour)
									flex flex-row justify-between'>

						{/* prev/next buttons */}
						<div className='text-sm 2xl:text-base
										w-(--cell-width) h-(--cell-height)
										bottom-[calc(100vh - var(--cell-height))]
										flex flex-row justify-between items-end p-7'>
							<button 
								onClick={onPrev}
								className={`flex flex-row gap-1 px-2 py-1 rounded-2xl cursor-pointer group
											hover:bg-(--grid-line-colour) transition-colors duration-200
											${!prevProject && 'hidden'}`}
							>
								<Image
									src='/caret-left-grey-icon.svg'
									alt='previous project'
									width={16}
									height={16}
								/>
								<p className='transition-colors duration-200 hidden md:block md:text-xs lg:text-sm font-medium text-nowrap text-(--light-mode-grey) group-hover:text-(--grey) pr-1'>Previous</p>
							</button>
							<button 
								onClick={onNext}
								className={`flex flex-row gap-1 px-2 py-1 rounded-2xl cursor-pointer group
											hover:bg-(--grid-line-colour) transition-colors duration-200
											${!nextProject && 'hidden'}`}
							>
								<p className='transition-colors duration-200  hidden md:block md:text-xs lg:text-sm font-medium text-nowrap text-(--light-mode-grey) group-hover:text-(--grey) pl-1'>Next</p>
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
									isNext
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
