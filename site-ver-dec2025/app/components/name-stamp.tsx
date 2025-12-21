'use client';

import React, { useRef, useEffect, useState, act } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';

import { useActiveSection } from './active-theme';
import { SectionReveal } from './section-reveal';
import { Reveal } from './reveal';
import Coffee from './icons/coffee';
import Cat from './icons/cat';


export default function NameStamp({ className = '--' }: { className?: string }) {
	const activeSection = useActiveSection();
	const [opacity, setOpacity] = useState(1);

	const { scrollY } = useScroll();

	// colour transition from hero -> about
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
		<div className={`fixed top-0 left-0 pointer-events-none
						transition-opacity duration-400 ${activeSection === 'home' || activeSection === 'about' ? 'opacity-100 z-99' : 'opacity-0 z-0'}`}>
			<div className={`font-inter group
							grid grid-cols-5 grid-rows-3
							translate-y-(--nav-height)
							${activeSection === 'home' ? 'text-(--text-colour)' : 'text-(--grey)'}`}
			>
				
				
				<div className='col-start-4 col-span-2 row-start-1 row-span-1 w-(--two-cell-width) h-(--cell-height)
								flex flex-col justify-between items-end p-8
								pointer-events-auto'>
					{/* "say hi" button */}
					<Reveal delay={1.75} className='flex justify-end'>
						<a
							className='font-medium text-2xl text-white
										flex flex-row gap-4 items-center
										w-fit h-fit px-6 py-4 rounded-full
										bg-(--text-colour) hover:bg-(--dark-grey)
										transition-colors duration-300'
							target='_blank'
							href='mailto:hello@jacquelinetruong.dev'
						>	
							<Coffee className='size-[24px]'/>
							Say Hi!
						</a>
					</Reveal>

					<Reveal delay={1}>
						<h1 className='font-semibold text-3xl text-right transition-colors duration-500'>
							Product designer first, software engineer second. Focused on crafting digital experiences and turning everyday ideas into art.
						</h1>
					</Reveal>
				</div>

				{/* big name */}
				<div className='col-start-4 col-span-2 row-start-2 row-span-1 w-(--two-cell-width) h-(--cell-height)
								relative'>
					<Reveal delay={2}>
						<div className=''>
							<Image
								src='/jt-black.svg'
								alt='jacqueline truong'
								fill
								className={`absolute inset-0 transition-opacity duration-500 ${activeSection === 'home' ? 'opacity-100' : 'opacity-0'}`}
								draggable={false}
							/>
							<Image
								src='/jt-grey.svg'
								alt='jacqueline truong'
								fill
								className={`absolute inset-0 transition-opacity duration-500 ${activeSection === 'about' ? 'opacity-100' : 'opacity-0'}`}
								draggable={false}
							/>
						</div>
					</Reveal>
				</div>

				<div className='col-start-5 col-span-1 row-start-3 row-span-1 w-(--cell-width) h-(--cell-height)
								flex flex-col justify-end p-8'>
					{/* city */}
					<Reveal delay={1.5}>
						<h2 className='font-semibold text-3xl text-right
										transition-colors duration-500'>
							Based in Toronto, CA.
						</h2>
					</Reveal>
			
					<Reveal delay={.75}>
						<Cat className={`size-fit transition-colors duration-500 ${activeSection === 'home' ? 'text-(--text-colour)' : 'text-(--grey)'}`}/>
					</Reveal>
				</div>
			</div>
		</div>
	</motion.div>
  	);
}
