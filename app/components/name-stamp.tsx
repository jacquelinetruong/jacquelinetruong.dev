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

    // colour transition from work -> about
    const color = useTransform(scrollY, [0, 500], ['#292A2D', '#D7D6DD']);
    const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 20 });

    useEffect(() => {
		const heroEl = document.getElementById('home-hero');
		const featuredEl = document.getElementById('featured');
		const moreEl = document.getElementById('more');
		if (!heroEl || !featuredEl || !moreEl) return;

		const startFade = heroEl.offsetTop;
		const endFade = featuredEl.getBoundingClientRect().bottom + window.scrollY;
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
								transition-opacity duration-400 ${activeSection === 'contact' ? 'opacity-0 z-0' : 'opacity-100 z-99'}`}>
				<div className={`grid grid-cols-5 grid-rows-3 w-screen
									translate-y-(--nav-height)
									${activeSection === 'home-hero' ? 'text-(--text-colour)' : 'text-(--nice-grey)'}`}
				>
					<div className='col-start-4 col-span-2 row-start-1 row-span-1 w-(--two-cell-width) h-(--cell-height)
									flex flex-col justify-between right-0 p-8 | ultrawide:px-20 
									pointer-events-auto'>
						{/* contact button */}
						<Reveal delay={2.75} className='flex justify-end'>
							<a
								className={`font-normal text-sm 3xl:text-lg text-(--bg-colour) group
										flex flex-row gap-2 items-center
										w-fit h-fit px-5 py-4 rounded-full 2xl:px-6 2xl:py-4
										${activeSection === 'home-hero' 
											? 'bg-(--text-colour) hover:bg-(--light-black)' 
											: activeSection === 'more' 
												? 'bg-(--white) text-(--dark-black) hover:bg-(--true-black)' 
												: 'bg-(--white) text-(--dark-black) hover:bg-(--dark-black) hover:text-(--white)'}
										transition-colors duration-300`}
								target='_blank'
								href='mailto:hello@jacquelinetruong.dev'
							>	
								<Coffee className={`size-[24px] transition-colors duration-300 ${activeSection === 'home-hero' ? 'text-(--bg-colour) group-hover:text-(--white)' : 'text-(--dark-black) group-hover:text-(--white)'}`}/>
								Get in touch
							</a>
						</Reveal>

						<Reveal delay={2.25} className='w-fit h-fit'>
							<h2 className={`font-semibold text-right place-self-end
											${activeSection === 'more' ? 'text-[#3F3F44]' : ''}
											sm:text-lg md:text-xl 2xl:text-2xl ultrawide:w-4/5
											transition-colors duration-500`}>
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
								className={`px-8 | ultrawide:px-20 object-contain object-right transition-opacity duration-500 ${activeSection === 'home-hero' ? 'opacity-100' : 'opacity-0'}`}
								draggable={false}
							/>
							<Image
								src='/jt-dark-grey.svg'
								alt='jacqueline truong'
								fill
								className={`px-8 | ultrawide:px-20 object-contain object-right transition-opacity duration-500 ${activeSection === 'more' ? 'opacity-100' : 'opacity-0'}`}
								draggable={false}
							/>
							<Image
								src='/jt-grey.svg'
								alt='jacqueline truong'
								fill
								className={`px-8 | ultrawide:px-20 object-contain object-right transition-opacity duration-500 ${activeSection === 'featured' ? 'opacity-100' : 'opacity-0'}`}
								draggable={false}
							/>
						</Reveal>
					</div>

					<div className='col-start-5 col-span-1 row-start-3 row-span-1 w-(--cell-width) h-(--cell-height)
									flex flex-col justify-between p-8 | ultrawide:px-20 '>
						{/* city */}
						<Reveal delay={1.85}>
							<h2 className={`font-semibold text-right text-nowrap place-self-end
											${activeSection === 'more' ? 'text-[#3F3F44]' : ''}
											sm:text-lg md:text-xl 2xl:text-2xl
											transition-colors duration-500`}>
								Based in Toronto, CA.
							</h2>
						</Reveal>
					
						<Reveal delay={1.6}>
							<Cat className={`place-self-end size-full xl:w-4/5 transition-colors duration-500 ${activeSection === 'more' ? 'text-[#3F3F44]' : ''}`}/>
						</Reveal>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
