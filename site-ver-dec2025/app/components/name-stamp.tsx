'use client';

import React, { useRef, useEffect, useState, act } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';

import { useActiveSection } from './active-section';
import { Reveal } from './reveal';
import Coffee from './icons/coffee';
import Cat from './icons/cat-icon';


export default function NameStamp({ className = '' }: { className?: string }) {
    const activeSection = useActiveSection();
    const [opacity, setOpacity] = useState(1);

    const { scrollY } = useScroll();

    // colour transition from home -> about
    const color = useTransform(scrollY, [0, 500], ['#292A2D', '#BEBEBE']);
    const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 20 });

    useEffect(() => {
		const homeEl = document.getElementById('home');
		const aboutEl = document.getElementById('about');
		if (!homeEl || !aboutEl) return;

		const startFade = homeEl.offsetTop;
		const endFade = aboutEl.getBoundingClientRect().bottom + window.scrollY;
		const span = endFade - startFade;
		const fadeStartOffset = 0; 

		const unsubscribe = scrollY.onChange((y) => {
			let progress = (y - startFade) / span;
			progress = Math.min(Math.max(progress, 0), 1);

			let newOpacity;
			if (progress < fadeStartOffset) {
				newOpacity = 1;
			} else {
				newOpacity = 1 - (progress - fadeStartOffset) / (1 - fadeStartOffset);
			}

			setOpacity(newOpacity);
		});

		return () => unsubscribe();
  }, [scrollY]);

    return (
		<motion.div
				style={{ 
					color,
					opacity: smoothOpacity
				}}
		>
			<div className={`fixed w-screen top-0 right-0 pointer-events-none 
								transition-opacity duration-400 ${activeSection === 'home' || activeSection === 'about' ? 'opacity-100 z-99' : 'opacity-0 z-0'}`}>
				<div className={`group
								grid grid-cols-5 grid-rows-3 w-screen
								translate-y-(--nav-height)
								${activeSection === 'home' ? 'text-(--text-colour)' : 'text-(--grey)'}`}
				>
					<div className='col-start-4 col-span-2 row-start-1 row-span-1 w-(--two-cell-width) h-(--cell-height)
									flex flex-col justify-between right-0 p-8 | ultrawide:px-20 
									pointer-events-auto'>
						{/* "say hi" button */}
						<Reveal delay={2.75} className='flex justify-end'>
							<a
								className='font-medium text-base 3xl:text-lg text-white
										flex flex-row gap-2 items-center
										w-fit h-fit px-6 py-3 rounded-full 2xl:px-8 2xl:py-4
										bg-(--text-colour) hover:bg-(--dark-grey)
										transition-colors duration-300'
								target='_blank'
								href='mailto:hello@jacquelinetruong.dev'
							>	
								<Coffee className='size-[24px]'/>
								Say Hi!
							</a>
						</Reveal>

						<Reveal delay={2.25} className='w-fit h-fit'>
							<h2 className='font-semibold text-right place-self-end
											sm:text-lg md:text-xl 2xl:text-2xl 2xl:w-4/5 
											transition-colors duration-500'>
								Product designer first, software engineer second. Focused on crafting digital experiences and turning everyday ideas into art.
							</h2>
						</Reveal>
					</div>

					{/* big name */}
					<div className='col-start-4 col-span-2 row-start-2 row-span-1 w-(--two-cell-width) h-(--cell-height) relative'>				
						<Reveal delay={0.5}>
							<Image
								src='/jt-black.svg'
								alt='jacqueline truong'
								fill
								className={`pr-8 | ultrawide:pr-20 object-contain object-right transition-opacity duration-500 ${activeSection === 'home' ? 'opacity-100' : 'opacity-0'}`}
								draggable={false}
							/>
							<Image
								src='/jt-grey.svg'
								alt='jacqueline truong'
								fill
								className={`pr-8 | ultrawide:pr-20 object-contain object-right transition-opacity duration-500 ${activeSection === 'about' ? 'opacity-100' : 'opacity-0'}`}
								draggable={false}
							/>
						</Reveal>
					</div>

					<div className='col-start-5 col-span-1 row-start-3 row-span-1 w-(--cell-width) h-(--cell-height)
									flex flex-col justify-between p-8 | ultrawide:px-20 '>
					{/* city */}
					<Reveal delay={1.85}>
						<h2 className='font-semibold text-right text-nowrap place-self-end
										sm:text-lg md:text-xl 2xl:text-2xl
										transition-colors duration-500'>
							Based in Toronto, CA.
						</h2>
					</Reveal>
				
					<Reveal delay={1.6}>
						<Cat className={`place-self-end size-full xl:w-4/5 transition-colors duration-500 ${activeSection === 'home' ? 'text-(--text-colour)' : 'text-(--grey)'}`}/>
					</Reveal>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
