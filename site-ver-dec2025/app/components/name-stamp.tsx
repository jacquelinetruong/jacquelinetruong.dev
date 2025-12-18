'use client';

import React, { useRef, useEffect, useState, act } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

import { useTheme } from './theme-context';
import { useActiveSection } from './section';
import { Reveal } from './reveal';
import Coffee from './icons/coffee';
import Cat from './icons/cat';


export default function NameStamp({ className = '--' }: { className?: string }) {
	const { theme, setTheme } = useTheme();

	const activeSection = useActiveSection(setTheme, {
        home: 'light',
        about: 'light',
        portfolio: 'dark',
        experience: 'light',
    });


	return (
		<div className={`fixed top-0 left-0 w-full h-full pointer-events-none z-100 
						${activeSection !== 'home' && activeSection !== 'about' ? 'hidden' : '--'}`}>
			<div className={`font-inter group
							grid grid-cols-5 grid-rows-3 h-full
							translate-y-(--nav-height)
							${activeSection === 'home' ? 'text-(--text-colour)' : 'text-(--grey)'}`}
			>
				
				{/* Say Hi button */}
				<div className='col-start-4 col-span-2 row-start-1 row-span-1 
								flex flex-col justify-between items-end px-6 py-4
								pointer-events-auto'>
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

				{/* Big name */}
				<div className='col-start-4 col-span-2 row-start-2 row-span-1 
								p-8
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

				<div className='col-start-5 col-span-1 row-start-3 row-span-1
								flex flex-col justify-end h-fit'>
					{/* City */}
					<Reveal delay={1.5}>
						<h2 className='font-semibold text-3xl text-right
										transition-colors duration-500'>
							Based in Toronto, CA.
						</h2>
					</Reveal>
			
					<Cat className={`size-fit transition-colors duration-500 ${activeSection === 'home' ? 'text-(--text-colour)' : 'text-(--grey)'}`}/>
				</div>
			</div>
		</div>
  	);
}
