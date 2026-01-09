'use client';

import Image from 'next/image';
import { useLenis } from 'lenis/react';

import { useTheme } from '@/app/components/theme-context';
import { useActiveSection } from '@/app/components/active-section';

import '@/public/jt-logo-black.svg';
import '@/public/jt-logo-white.svg';


export default function NavbarDesktop({ isLoading }: { isLoading: boolean }) {
    const { theme, setTheme } = useTheme();
    const lenis = useLenis();

    // section themes
    const activeSection = useActiveSection(setTheme, {
        home: 'light',
        about: 'light',
        portfolio: 'dark',
        experience: 'light',
    });

    // smooth scroll to section
    const scrollToSection = (id: string) => (e: React.MouseEvent) => {
        e.preventDefault();

        const el = document.getElementById(id);
        if (!el) return;

        const navHeight = parseFloat(
				getComputedStyle(document.documentElement).getPropertyValue('--nav-height')
        ) || 0;

        const y = el.getBoundingClientRect().top + (lenis?.scroll ?? window.scrollY) - navHeight;

        if (lenis) {
            lenis.scrollTo(y, {
                duration: 0.8,
                easing: t => 1 - Math.pow(1 - t, 3),
            });
        } else {
            // default
            window.scrollTo({top: y, behavior: 'smooth'});
        }
    };

    return (
        <div className='font-inter font-medium xs:text-sm md:text-md
                        sticky top-0
                        px-8 py-4 z-1000 
                        flex flex-row justify-between items-center
                        bg-gradient-to-t from-transparent via-(--bg-colour)/50 via-30% to-(--bg-colour) to-60%
                        transition-colors duration-500'>
            {/* left side */}
            <div className='flex flex-row gap-16 items-center'>

                {/* site logo */}
                <a href='#home'
                    className='relative w-[72.64px] h-[50px]'>
                    {/* black logo (light theme) */}
                    <Image
                        src='/jt-logo-black.svg'
                        alt='site logo'
                        fill
                        draggable={false}
                        className={`absolute inset-0 transition-opacity duration-500 ease-in-out
                            ${activeSection !== 'portfolio' ? 'opacity-100' : 'opacity-0'}`}
                    />
                    {/* white logo (dark theme) */}
                    <Image
                        src='/jt-logo-white.svg'
                        alt='site logo'
                        fill
                        draggable={false}
                        className={`absolute inset-0 transition-opacity duration-500 ease-in-out
                            ${activeSection === 'portfolio' ? 'opacity-100' : 'opacity-0'}`}
                    />
                </a>

                {/* nav items */}
                <div className='navbar-items flex flex-row gap-8'>
                    {['home', 'about', 'portfolio', 'experience'].map((id) => (
                        <a
                        key={id}
                        href={`#${id}`}
                        onClick={scrollToSection(id)}
                        className={`transition-colors duration-300 ${
                            activeSection === id
                            ? 'text-(--text-colour)'
                            : 'text-(--alt-text-colour) hover:text-(--dark-grey)'
                        } ${activeSection === 'portfolio' && id !== 'portfolio' ? 'text-(--alt-text-colour) hover:text-(--grey)' : ''}`}
                        >
                        {id.charAt(0).toUpperCase() + id.slice(1)}
                        </a>
                    ))}
                    {/* <a href='#daily'>Daily</a> */}           {/* future page, maybe */}
                </div>
            </div>

            {/* right side */}
            <div className='navbar-links flex flex-row gap-8'>
                <a className='transition-colors duration-300 text-(--text-colour) hover:text-(--light-mode-grey)'
                    target='_blank' href='/resume.pdf' rel='noopener noreferrer'>Resume</a>
                <a className='transition-colors duration-300 text-(--text-colour) hover:text-(--light-mode-grey)'
                    target='_blank' href='https://www.linkedin.com/in/jacquellinetruong'>LinkedIn</a>
                <a className='transition-colors duration-300 text-(--text-colour) hover:text-(--light-mode-grey)'
                    target='_blank' href='https://github.com/jacquelinetruong'>GitHub</a>
            </div>
        </div>
    );
}