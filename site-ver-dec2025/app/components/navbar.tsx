'use client';

import Image from 'next/image';

import { useTheme } from './theme-context';

import '../../public/jt-logo-black.svg';
import '../../public/jt-logo-white.svg';


export default function Navbar() {
    const theme = useTheme();
    // styling effects
    const transitionLink = 'transition-colors transition-opacity duration-300';
    const activeLink = 'text-(--text-colour)';
    const inactiveLink = 'text-(--alt-text-colour)';

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
                            ${theme === 'light' ? 'opacity-100' : 'opacity-0'}`}
                    />
                    {/* white logo (dark theme) */}
                    <Image
                        src='/jt-logo-white.svg'
                        alt='site logo'
                        fill
                        draggable={false}
                        className={`absolute inset-0 transition-opacity duration-500 ease-in-out
                            ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}
                    />
                </a>

                {/* nav items */}
                <div className='navbar-items flex flex-row gap-8'>
                    <a href='#home'
                        className={``}>
                        Home
                    </a>
                    <a href='#about'
                        className={``}
                    >
                        About
                    </a>
                    <a href='#portfolio'
                        className={``}
                    >
                        Portfolio
                    </a>
                    <a href='#experience'
                        className={``}
                    >
                        Experience
                    </a>
                    {/* <a href='#daily'>Daily</a> */}           {/* future page, maybe */}
                </div>
            </div>

            {/* right side */}
            <div className='navbar-links flex flex-row gap-8'>
                <a target='_blank' href=''>Resume</a>
                <a target='_blank' href='https://www.linkedin.com/in/jacquellinetruong'>LinkedIn</a>
                <a target='_blank' href='https://github.com/jacquelinetruong'>GitHub</a>
            </div>
        </div>
    );
}