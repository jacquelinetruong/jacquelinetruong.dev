'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { useTheme } from '@/app/components/theme-context';
import { useActiveSection } from '@/app/components/active-section';

export default function NavbarDesktop({ isLoading }: { isLoading: boolean }) {
    const { theme, setTheme } = useTheme();
    const pathname = usePathname();

    const isProjectPage = pathname.startsWith('/work/');

    // only for work page (home page) theme changes
    const activeSection = useActiveSection(setTheme, {
        home: 'light',
        work: 'light',
        archive: 'dark',
        more: 'light',
    });

    // force default light mode when not home page
    useEffect(() => {
        if (pathname !== '/') {
            setTheme('light');
        }
    }, [pathname, setTheme]);

    const navItems = [
        { label: 'Work', href: '/' },
        { label: 'Process', href: '/work/process' },
        { label: 'About', href: '/about' },
        { label: 'Extras', href: '/extras' },
    ];

    return (
        <div
            className='font-medium xs:text-sm md:text-md
                        fixed top-0 left-0 w-full h-(--nav-height)
                        px-8 py-4 z-1000 | ultrawide:px-20
                        flex flex-row justify-between items-center backdrop-blur-sm
                        bg-gradient-to-t from-transparent via-(--bg-colour)/65 via-20% to-(--bg-colour)/95 to-35% 
                        transition-colors duration-500'
        >
            {/* left side */}
            <div className='flex flex-row items-center gap-12'>

                {/* site logo */}
                <Link
                    href='/'
                    className='relative w-[43.58px] h-[30px] | xl:w-[58.11px] xl:h-[40px]'
                >
                    {/* black logo */}
                    <Image
                        src='/jt-logo-black.svg'
                        alt='site logo'
                        fill
                        draggable={false}
                        className={`absolute transition-opacity duration-500 ease-in-out
                            ${
                                activeSection !== 'archive'
                                    ? 'opacity-100'
                                    : 'opacity-0'
                            }`}
                    />
                    {/* white logo */}
                    <Image
                        src='/jt-logo-white.svg'
                        alt='site logo'
                        fill
                        draggable={false}
                        className={`absolute transition-opacity duration-500 ease-in-out
                            ${
                                activeSection === 'archive'
                                    ? 'opacity-100'
                                    : 'opacity-0'
                            }`}
                    />
                </Link>

                {/* nav items */}
                <div className='navbar-items flex flex-row gap-8'>
                    {navItems.map((item) => {
                        const isActive =
                            pathname === item.href ||
                            (item.href === '/work/process' && isProjectPage);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`transition-colors duration-300 ${
                                    isActive
                                        ? 'text-(--text-colour)'
                                        : 'text-(--alt-text-colour) hover:text-(--dark-grey)'
                                }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* right side */}
            <div className='navbar-links flex flex-row gap-8'>
                <a
                    className='transition-colors duration-300 text-(--text-colour) hover:text-(--light-mode-grey)'
                    target='_blank'
                    href='/resume.pdf'
                    rel='noopener noreferrer'
                >
                    Resume
                </a>
                <a
                    className='transition-colors duration-300 text-(--text-colour) hover:text-(--light-mode-grey)'
                    target='_blank'
                    href='https://www.linkedin.com/in/jacquellinetruong'
                    rel='noopener noreferrer'
                >
                    LinkedIn
                </a>
                <a
                    className='transition-colors duration-300 text-(--text-colour) hover:text-(--light-mode-grey)'
                    target='_blank'
                    href='https://github.com/jacquelinetruong'
                    rel='noopener noreferrer'
                >
                    GitHub
                </a>
            </div>
        </div>
    );
}