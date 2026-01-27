'use client';

import Image from 'next/image';
import Grid from '@/app/components/grid';

import LinkArrow from '@/app/components/icons/link-arrow';
import { Reveal } from '@/app/components/reveal';
import Cat from '@/app/components/icons/cat-icon';
import CatSecret from '../../cat-secret';


export default function FooterDesktop({ className = '' }: { className?: string }) {
    return (
        <Grid>
            {/* signature name */}
            <div className='col-start-1 col-span-5 row-start-1 row-span-1
                            w-full h-full relative'>
                <Image 
                    src='/footer-jacqueline.svg'
                    alt='jacqueline'
                    fill
                    className='object-contain object-bottom'
                    draggable={false}
                />
            </div>

            {/* real footer */}
            <div className='font-medium text-(--alt-text-colour) sm:text-sm md:text-base
                            col-start-1 col-span-5 row-start-2 row-span-2
                            flex flex-row w-full h-full
                            pt-16 pb-6 | lg:pb-12 | ultrawide:pb-16
                            bg-(--dark-black) border-t-(--dark-black)'>
                {/* content */}
                    <div className='w-(--two-cell-width) h-full'>
                        {/* cta */}
                        <div className='w-full h-full px-8 | ultrawide:px-20'>
                            <Reveal delay={1} className='flex flex-col justify-between '>
                                <div className='flex flex-col gap-4 | 3xl:gap-6'>
                                    <h2 className='text-4xl leading-[1.3] text-white text-wrap'>Let's work together</h2>
                                    <a className='font-medium text-base 3xl:text-lg text-(--dark-black)
                                                flex flex-row gap-2 items-center
                                                w-fit h-fit px-6 py-3 rounded-full 2xl:px-8 2xl:py-4
                                                bg-white hover:bg-(--grey)
                                                transition-colors duration-300'
                                        target='_blank'
                                        href='mailto:hello@jacquelinetruong.dev'
                                    >    
                                        Connect
                                        <LinkArrow className='size-[24px] text-(--text-colour)'/>
                                    </a>
                                </div>
                                {/* thanks for visiting */}
                                <div className='w-1/2 h-1/3 relative'>
                                    <Image 
                                        src='/thx4visiting.svg'
                                        alt='handwritten note'
                                        fill
                                        draggable={false}
                                        className='object-contain object-left'
                                    />
                                </div>
                                {/* socials */}
                                <div className='flex flex-col gap-2'>
                                    <h5 className='text-white'>Find More</h5>
                                    <div className='flex flex-row gap-6 | xl:gap-8'>
                                        <a className='w-fit transition-colors duration-300 hover:text-(--grey)' target='_blank' href='/resume.pdf' rel='noopener noreferrer'>Resume</a>
                                        <a className='w-fit transition-colors duration-300 hover:text-(--grey)' target='_blank' href='https://www.linkedin.com/in/jacquellinetruong' rel='noopener noreferrer'>LinkedIn</a>
                                        <a className='w-fit transition-colors duration-300 hover:text-(--grey)' target='_blank' href='https://github.com/jacquelinetruong' rel='noopener noreferrer'>GitHub</a>
                                        <a className='w-fit transition-colors duration-300 hover:text-(--grey)' target='_blank' href='https://www.behance.net/jacqueltruong' rel='noopener noreferrer'>Behance</a>
                                    </div>
                                </div>
                            </Reveal>
                         </div>
                    </div>

                    {/* easter egg */}
                    <div className='w-(--cell-width) h-full p-8'>
                        <CatSecret />
                    </div>

                    {/* name section */}
                    <div className='w-(--two-cell-width) h-full px-8 | ultrawide:px-20'>
                        <Reveal 
                            delay={0.25} 
                            className='flex flex-col justify-end items-end gap-6 | ultrawide:gap-12'
                        >
                            <div className='relative w-full h-full | xl:max-w-2/3 xl:max-h-1/2'>
                                <Image 
                                    src='/jt-dark-grey.svg'
                                    alt='jacqueline truong'
                                    fill
                                    className='object-contain object-bottom-right'
                                    draggable={false}
                                />
                            </div>
                            <h5 className='text-(--alt-text-colour) text-right leading-5'>© 2026 built & designed by jacqueline truong</h5>
                        </Reveal>
                    </div>
                
            </div>
        </Grid>
    )
}