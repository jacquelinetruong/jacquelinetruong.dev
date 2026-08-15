'use client'

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Reveal } from '@/app/components/reveal';

import Cat from '@/app/components/icons/cat-icon';

const navItems = [
	{ label: 'Home', href: '/' },
	{ label: 'Work', href: '/work' },
	{ label: 'About', href: '/about' },
	{ label: 'Extras', href: '/extras' },
];

export default function NavbarMobile({ isLoading }: { isLoading: boolean }) {
	const [menuState, setMenuState] = useState<'closed' | 'opening' | 'open' | 'closing'>('closed');
	const pathname = usePathname();

	// change menu state upon open or close
	const toggleMenu = () => {
		if (menuState === 'closed') {
			setMenuState('opening');
		} else if (menuState === 'open') {
			setMenuState('closing');
		};
	};

	// change state after animation finished
	const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
		if (e.target !== e.currentTarget) return;
		if (menuState === 'opening') {
			setMenuState('open');
		};

		if (menuState === 'closing') {
			setMenuState('closed');
		};
	};

	const closeMenu = () => {
		if (menuState === 'open' || menuState === 'opening') {
			setMenuState('closing');
		}
	};

	const isNavActive = (href: string) =>
		href === '/'
			? pathname === '/'
			: pathname === href || (href === '/work' && pathname.startsWith('/work/'));

	return (
		<div>
			{/* hamburger button */}
			<div className='fixed top-0 right-0 z-100 p-5'>
				<Reveal delay={6}>
					<button
						onClick={toggleMenu}
						className={`p-5 sm:p-6 rounded-full transition-colors duration-1000
									${menuState === 'opening' || menuState === 'open' ? 'bg-(--black)' : 'bg-(--nice-grey)'}`}
					>
						<Image
							src={`${menuState === 'opening' || menuState === 'open' ? '/menu-white.svg' : '/menu-black.svg'}`}
							alt='Menu'
							width={24}
							height={24}
							className={`sm:size-7 transition-opacity duration-400
										${menuState === 'closed' || menuState === 'open' ? 'opacity-100' :'opacity-50'}`}
						/>
					</button>
				</Reveal>
			</div>

			{/* overlay menu */}
			{menuState !== 'closed' && (
				<div className={`fixed w-full h-full z-40 pt-40 pb-16  bg-(--grey) pointer-events-auto
								flex flex-col items-center justify-between
								${menuState === 'opening' ? 'animate-open' : ''}
								${menuState === 'closing' ? 'animate-close': ''}`}
					onAnimationEnd={handleAnimationEnd}
				>
					<div className='overlay-content place-self-start'>
						{/* nav items */}
						<div className='mb-20'>
							<p className='px-5 pb-2 text-(--dark-grey) font-medium text-sm | xs:text-base | sm:text-md'>Navigation</p>
							{navItems.map(({ label, href }, i) => (
								<Link
									href={href}
									key={href}
									onClick={closeMenu}
									className={`nav-button block
												w-full h-fit px-5 py-1.5
												text-4xl sm: text-5xl font-[450] text-left
												transition-colors duration-300 place-self-end
												${isNavActive(href) ? 'text-(--light-black)' : 'text-white'}`}
									style={{ 
										animationDelay: `${0.1 + i * 0.08}s`, 
										animationDuration: `${0.4 + i * 0.12}s`,
									}}
								>
									{label}
									{isNavActive(href) && (
										' —' // lol it's a face!
									)}
								</Link>
							))}
						</div>

						{/* other links */}
						<div className='flex flex-col w-full h-fit sm:text-lg text-white p-5'>
							<Reveal delay={0.7}>
								<p className='pb-2 text-(--dark-grey) font-medium text-sm | xs:text-base | sm:text-md '>Find more</p>
							</Reveal>
							<div className='w-full h-fit xs:text-lg
											flex flex-row gap-5 justify-start'>
								<a
									target='_blank'
									href='/resume.pdf'
									rel='noopener noreferrer'
								>
									<Reveal delay={0.8}>Resume</Reveal>
								</a>
								<a
									target='_blank'
									href='https://www.linkedin.com/in/jacquelinetruong'
								>
									<Reveal delay={0.9}>LinkedIn</Reveal>
								</a>
								<a
									target='_blank'
									href='https://github.com/jacquelinetruong'
								>
									<Reveal delay={1}>Github</Reveal>
								</a>
							</div>
						</div>

						
					</div>
					{/* cat */}
						<div className='w-full h-fit px-5 place-self-end'>
							<Reveal delay={1}>
								<Cat className='w-4/6 sm:w-1/2 h-fit place-self-end text-(--off-white)'/>
							</Reveal>
						</div>
				</div>
			)}
		</div>
	)
}
