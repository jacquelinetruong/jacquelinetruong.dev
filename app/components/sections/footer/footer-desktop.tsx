'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import LinkArrow from '@/app/components/icons/link-arrow';
import { Reveal } from '@/app/components/reveal';
import CatSecret from '../../cat-secret';

export default function FooterDesktop({ className = '' }: { className?: string }) {

    // determine theme from slug
    const pathname = usePathname();

    // dark mode footer for home page, work page
    const isDark = pathname === '/' || pathname === '/work';     

    return (
        <div className='grid grid-cols-5 grid-rows-2'>
            {/* signature name */}
            <div className='col-start-1 col-span-5 row-start-1 row-span-1
                            w-full h-full relative'>
                {isDark ? (
                    <Image 
                        src='/foot.svg'
                        alt=''
                        fill
                        className='object-contain object-bottom'
                        draggable={false}
                    />
                ) : (
                    <Image 
                        src='/404-jacqueline.svg'
                        alt=''
                        fill
                        className='object-contain object-bottom'
                        draggable={false}
                    />
                )}
                
            </div>

            {/* real footer */}
            <div className={`font-medium text-(--alt-text-colour) sm:text-sm md:text-base
                            col-start-1 col-span-5 row-start-2 
                            flex flex-row h-fit
                            pt-16 pb-6 | lg:pb-12 | ultrawide:pb-16
                            ${isDark ? 'bg-(--white)' : 'bg-(--dark-black)'}`}>
                {/* content */}
                    <div className='w-(--two-cell-width) h-(--cell-height)'>
                        {/* cta */}
                        <div className='w-full h-full px-8 | ultrawide:px-20'>
                            <Reveal delay={0.25} className='flex flex-col justify-between'>
                                <div className='flex flex-col gap-4 | 3xl:gap-6'>
                                    <h2 className='text-4xl leading-[1.3] text-(--bg-colour) text-wrap'>Let's work together</h2>
                                    <a
                                        className={`font-normal text-sm 3xl:text-lg text-(--text-colour) group
                                                flex flex-row gap-2 items-center
                                                w-fit h-fit px-5 py-4 rounded-full 2xl:px-6 2xl:py-4
                                                ${isDark ? 'bg-(--dark-black) hover:bg-(--black)' : 'bg-(--white) hover:bg-(--nice-grey) hover:text-black'}
                                                transition duration-300`}
                                        target='_blank'
                                        href='mailto:hello@jacquelinetruong.dev'
                                    >	
                                        Connect
                                        <LinkArrow className={`size-[24px] transition-colors duration-300 text-(--text-colour)`}/>
                                    </a>
                                </div>
                                
                                {/* socials */}
                                <div className='flex flex-col gap-2'>
                                    <h5 className={`${isDark ? 'text-(--grey)' : 'text-(--light-black)'}`}>Find More</h5>
                                    <div className='flex flex-row gap-6 | xl:gap-8'>
                                        <a 
                                            className={`w-fit transition-colors duration-300 ${isDark ? 'text-(--dark-grey) hover:text-(--light-mode-grey)' : 'hover:text-(--off-white)'}`} 
                                            target='_blank' 
                                            href='/resume.pdf' 
                                            rel='noopener noreferrer'>
                                                Resume
                                        </a>
                                        <a 
                                            className={`w-fit transition-colors duration-300 ${isDark ? 'text-(--dark-grey) hover:text-(--light-mode-grey)' : 'hover:text-(--off-white)'}`} 
                                            target='_blank' 
                                            href='https://www.linkedin.com/in/jacquelinetruong' 
                                            rel='noopener noreferrer'>
                                                LinkedIn
                                        </a>
                                        <a 
                                            className={`w-fit transition-colors duration-300 ${isDark ? 'text-(--dark-grey) hover:text-(--light-mode-grey)' : 'hover:text-(--off-white)'}`} 
                                            target='_blank' 
                                            href='https://github.com/jacquelinetruong' 
                                            rel='noopener noreferrer'>
                                                GitHub
                                        </a>
                                        <a 
                                            className={`w-fit transition-colors duration-300 ${isDark ? 'text-(--dark-grey) hover:text-(--light-mode-grey)' : 'hover:text-(--off-white)'}`} 
                                            target='_blank' 
                                            href='https://www.behance.net/jacquelinetruong' 
                                            rel='noopener noreferrer'>
                                                Behance
                                        </a>
                                    </div>
                                </div>
                            </Reveal>
                         </div>
                    </div>

                    {/* easter egg */}
                    <div className='w-(--cell-width) h-(--cell-height) p-8'>
                        <CatSecret />
                    </div>

                    {/* name section */}
                    <div className='w-(--two-cell-width) h-(--cell-height) px-8 | ultrawide:px-20'>
                        <Reveal 
                            delay={1} 
                            className='flex flex-col justify-end items-end gap-6 | ultrawide:gap-12'
                        >
                            {/* thanks for visiting */}
                            <div className='w-2/3 h-1/2 relative'>
                                {isDark ? (
                                    <Image 
                                        src='/thx4visiting-dark.svg'
                                        alt=''
                                        fill
                                        className='object-contain object-right'
                                        draggable={false}
                                    />
                                ) : (
                                    <Image 
                                        src='/thx4visiting-light.svg'
                                        alt=''
                                        fill
                                        className='object-contain object-right'
                                        draggable={false}
                                    />
                                )}
                            </div>
                            <h5 className={`${isDark ? 'text-(--dark-grey)' : 'text-(--light-mode-grey)'} text-right leading-5`}>© 2026 built & designed by jacqueline truong</h5>
                        </Reveal>
                    </div>
                
            </div>
        </div>
    )
}