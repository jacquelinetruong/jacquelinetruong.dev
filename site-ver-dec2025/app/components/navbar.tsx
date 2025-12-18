'use client';

import Image from 'next/image';

import { useTheme } from './theme-context';
import { useActiveSection } from './section';

import '../../public/jt-logo-black.svg';
import '../../public/jt-logo-white.svg';


export default function Navbar() {
    const { theme, setTheme } = useTheme();

    const activeSection = useActiveSection(setTheme, {
        home: 'light',
        about: 'light',
        portfolio: 'dark',
        experience: 'light',
    });

    return (
        <div className='font-inter font-medium text-xl
                        sticky top-0
                        p-4 z-100 
                        flex flex-row justify-between items-center'>
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
                    <a className={`transition-colors duration-300 
                        ${activeSection === 'home' ? 'text-(--text-colour)' : 'text-(--alt-text-colour) hover:text-(--dark-grey)'}
                        ${activeSection === 'portfolio' && 'text-(--alt-text-colour) hover:text-(--grey)'}`}    // dark mode colours
                        href='#home'
                    >
                        Home
                    </a>
                    <a className={`transition-colors duration-300 
                        ${activeSection === 'about' ? 'text-(--text-colour)' : 'text-(--alt-text-colour) hover:text-(--dark-grey)'}
                        ${activeSection === 'portfolio' && 'text-(--alt-text-colour) hover:text-(--grey)'}`}
                        href='#about'
                    >
                        About
                    </a>
                    <a className={`transition-colors duration-300 ${activeSection === 'portfolio' ? 'text-(--text-colour) hover:text-(--grey)' : 'text-(--alt-text-colour) hover:text-(--dark-grey)'}`}
                        href='#portfolio'
                    >
                        Portfolio
                    </a>
                    <a className={`transition-colors duration-300 
                        ${activeSection === 'experience' ? 'text-(--text-colour)' : 'text-(--alt-text-colour) hover:text-(--dark-grey)'}
                        ${activeSection === 'portfolio' && 'text-(--alt-text-colour) hover:text-(--grey)'}`}
                        href='#experience'
                    >
                        Experience
                    </a>
                    {/* <a href='#daily'>Daily</a> */}           {/* future page, maybe */}
                </div>
            </div>

            {/* right side */}
            <div className='navbar-links flex flex-row gap-8'>
                <a className='transition-colors duration-300 text-(--text-colour) hover:text-(--light-mode-grey)'
                    target='_blank' href=''>Resume</a>
                <a className='transition-colors duration-300 text-(--text-colour) hover:text-(--light-mode-grey)'
                    target='_blank' href='https://www.linkedin.com/in/jacquellinetruong'>LinkedIn</a>
                <a className='transition-colors duration-300 text-(--text-colour) hover:text-(--light-mode-grey)'
                    target='_blank' href='https://github.com/jacquelinetruong'>GitHub</a>
            </div>
        </div>
    );
}