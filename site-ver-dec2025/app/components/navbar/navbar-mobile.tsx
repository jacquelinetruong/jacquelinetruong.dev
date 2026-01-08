'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useLenis } from 'lenis/react'

import { useTheme } from '@/app/components/theme-context'
import { useActiveSection } from '@/app/components/active-theme'

import Cat from '@/app/components/icons/cat'
import '@/public/menu.svg';

export default function NavbarMobile({ isLoading }: { isLoading: boolean }) {
	const { theme, setTheme } = useTheme()
	const lenis = useLenis()
	const [menuOpen, setMenuOpen] = useState(false)

	// section themes
	const activeSection = useActiveSection(setTheme, {
		home: 'light',
		about: 'light',
		portfolio: 'dark',
		experience: 'light',
	})

	// smooth scroll to section
	const scrollToSection = (id: string) => (e?: React.MouseEvent) => {
		e?.preventDefault()
		const el = document.getElementById(id)
		if (!el) return

		const y = el.getBoundingClientRect().top + (lenis?.scroll ?? window.scrollY)

		if (lenis) {
			lenis.scrollTo(y, {
				duration: 0.8,
				easing: (t) => 1 - Math.pow(1 - t, 3),
			})
		} else {
			window.scrollTo({ top: y, behavior: 'smooth' })
		}

		// close menu after click
		setMenuOpen(false)
	}

	const navLinks = ['home', 'about', 'portfolio', 'experience', 'contact']

	return (
		<>
			{/* hamburger button */}
			<div className='fixed top-0 left-0 z-100 p-4'>
				<button
					onClick={() => setMenuOpen((prev) => !prev)}
					className='p-4 bg-(--nice-grey) rounded-full'
				>
					<Image
						src='/menu.svg'
						alt='Menu'
						width={24}
						height={24}
					/>
				</button>
			</div>

			{/* overlay menu */}
			{menuOpen && (
				<div className='fixed inset-0 z-40 pt-40 pb-16 bg-[#A6A5B0] font-inter
								flex flex-col items-center justify-between'>
					{/* nav items */}
					<div className='mb-20'>
						{navLinks.map((id) => (
							<button
								key={id}
								onClick={scrollToSection(id)}
								className={`w-full h-fit px-4 py-1.5
											text-4xl font-[450] text-left text-white
											transition-colors duration-300 place-self-end
											${activeSection === id && 'text-(--dark-black)'}`}
							>
								{id.charAt(0).toUpperCase() + id.slice(1)}
							</button>
						))}
					</div>

					{/* other links */}
					<div className='flex flex-col w-full h-fit text-white px-4'>
						<p className='text-sm text-(--nice-grey)'>Find more</p>
						<div className='w-full h-fit
										flex flex-row gap-4 justify-start'>
							<a
								target='_blank'
								href='/resume.pdf'
								rel='noopener noreferrer'
							>
								Resume
							</a>
							<a
								target='_blank'
								href='https://www.linkedin.com/in/jacquellinetruong'
							>
								LinkedIn
							</a>
							<a
								target='_blank'
								href='https://github.com/jacquelinetruong'
							>
								GitHub
							</a>
						</div>
					</div>

					{/* cat */}
					<div className='w-full h-fit px-4'>
						<Cat className='w-4/6 h-fit place-self-end text-[#C6C5D0]'/>
					</div>
				</div>
			)}
		</>
	)
}
