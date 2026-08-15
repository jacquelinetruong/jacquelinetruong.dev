'use client';

import Image from 'next/image';
import Grid from '@/app/components/grid';
import LinkArrow from '@/app/components/icons/link-arrow';
import { Reveal } from '@/app/components/reveal';
import CatSecret from '../../cat-secret';
import { usePathname } from 'next/navigation';


export default function FooterMobile({ className = '' }:{ className?: string; }) {
    // determine theme from slug
    const pathname = usePathname();

    // dark mode footer for home page, work page
    const isDark = pathname === '/' || pathname === '/work'; 
    
    return (
        <Grid>
            {/* real footer */}
            <div className='col-start-1 col-span-3 row-start-2 row-span-3 bg-(--dark-black) px-4 pt-12 pb-8
                            flex flex-col gap-12 h-full'>
                <div className='flex flex-col gap-8'>
                    {/* cta */}
                    <div className='flex flex-row gap-4'>
                        <div className='flex flex-col gap-4'>
                            <h2 className='text-xl sm:text-2xl leading-[1.3] text-white text-wrap'>Let's work together</h2>

                            <a className='text-sm | xs:text-base sm:font-medium text-(--black) bg-white
                                        flex flex-row gap-2 items-center
                                        w-fit h-fit px-6 py-3 sm:px-6 sm:py-4 rounded-full'
                                target='_blank'
                                href=''
                                rel='noopener noreferrer'
                            >    
                                Connect
                                <LinkArrow className='size-[20px] sm:size-[22px] text-(--black) group-transition-colors group:duration-300'/>
                            </a>
                        </div>

                        <div className='w-2/3 h-2/3 relative'>
                            <Reveal delay={0.8}>
                                {/* thanks for visiting */}
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
                            </Reveal>
                        </div>
                    </div>

                    {/* social links */}
                    <div className='font-regular text-white text-sm | xs:text-base w-fit 
                                    flex flex-row gap-4 sm:gap-6'>
                        <a target='_blank' href='/resume.pdf' rel='noopener noreferrer'>Resume</a>
                        <a target='_blank' href='https://www.linkedin.com/in/jacquelinetruong' rel='noopener noreferrer'>LinkedIn</a>
                        <a target='_blank' href='https://github.com/jacquelinetruong' rel='noopener noreferrer'>GitHub</a>
                        <a target='_blank' href='https://www.behance.net/jacqueltruong' rel='noopener noreferrer'>Behance</a>
                    </div>
                </div>

                <div className='w-full h-full flex flex-col gap-8'>
                    {/* easter egg */}
                    <div className='w-full h-full p-4'>
                        <CatSecret />
                    </div>

                    {/* copyright */}
                    <p className='text-sm | xs:text-base text-right text-(--light-mode-grey)'>© 2026 built & designed by jacqueline truong</p>
                    <Reveal delay={1}>
                        <div className='w-full h-full relative'>
                            <Image
                                src='/jt-dark-grey.svg'
                                alt='Jacqueline Truong'
                                fill
                                className='object-contain object-bottom-right'
                            />
                        </div>
                    </Reveal>
                </div>
            </div>
        </Grid>
    )
}