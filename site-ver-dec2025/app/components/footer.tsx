'use client';

import Image from 'next/image';
import Grid from './grid';

import LinkArrow from './icons/link-arrow';
import { Reveal } from './reveal';

import '../../public/link-arrow-white.svg';
import '../../public/link-arrow-black.svg';
import '../../public/jt-white.svg';
import '../../public/jt-logo-grey.svg';
import '../../public/thats-all.svg';
import '../../public/footer-jacqueline.svg';


export default function Footer({ className = '' }: { className?: string }) {
    return (
        <Grid className={className}>
            {/* cta */}
            <div className='font-inter
                            col-start-2 col-span-3 row-start-1 row-span-1 
                            place-self-center p-8'>
                <Reveal delay={0.25} className='flex flex-col gap-6 place-items-center'>
                    <h1 className='font-semibold sm:text-xl md:text-2xl'>Have a project idea? Let's make it happen.</h1>
                
                    <a className='font-medium text-(--bg-colour) hover:text-white
                                flex flex-row gap-2 items-center
                                w-fit h-fit px-4 py-2 rounded-full
                                bg-(--text-colour) hover:bg-(--dark-grey)
                                transition-colors duration-300
                                cursor-pointer'>
                        Get Started
                        <LinkArrow className='size-[28px] text-white'/>
                    </a>
                </Reveal>
            </div>

            {/* signature name */}
            <div className='col-start-1 col-span-5 row-start-2 row-span-1
                            flex flex-col justify-end'>
                    <Image 
                        src='/footer-jacqueline.svg'
                        alt='jacqueline'
                        width={1920}
                        height={260}
                        className='w-full'
                        draggable={false}
                    />
            </div>

            {/* real footer */}
            <div className='font-inter font-medium text-(--alt-text-colour) sm:text-sm md:text-base 2xl:text-lg
                            col-start-1 col-span-5 row-start-3 row-span-1
                            flex flex-col gap-16 pt-16 pb-6 h-fit
                            bg-(--dark-black) border-t-(--dark-black)'>
                {/* content */}
                
                <div className='flex flex-row justify-between'>
                    {/* name section */}
                    <Reveal delay={0.25}>
                    <div className='flex flex-col gap-6 w-(--cell-width) pl-8 pr-8'>
                        <Image 
                            src='/jt-white.svg'
                            alt='jacqueline truong'
                            width={320}
                            height={112.84}
                            className='size-full'
                            draggable={false}
                        />
                        <h5 className='text-(--alt-text-colour) text-right'>Design and development by {"\n"} Jacqueline Truong</h5>
                    </div>
                    </Reveal>

                    {/* imaginary empty grid cell */}
                    <div className='w-full'></div>

                    {/* navigation pages */}
                    <Reveal delay={0.5}>
                    <div className='flex flex-col gap-2 w-(--cell-width) pl-8 pr-8'>
                        <h5 className='text-white'>Pages</h5>
                        <a className='w-fit transition-colors duration-300 hover:text-(--grey)' href='#home'>Home</a>
                        <a className='w-fit transition-colors duration-300 hover:text-(--grey)' href='#about'>About</a>
                        <a className='w-fit transition-colors duration-300 hover:text-(--grey)' href='#portfolio'>Portfolio</a>
                        <a className='w-fit transition-colors duration-300 hover:text-(--grey)' href='#experience'>Experience</a>
                    </div>
                    </Reveal>

                    {/* links */}
                    <Reveal delay={0.75}>
                    <div className='flex flex-col gap-2 w-(--cell-width) pl-8 pr-8'>
                        <h5 className='text-white'>Find More</h5>
                        <a className='w-fit transition-colors duration-300 hover:text-(--grey)' href=''>Resume</a>
                        <a className='w-fit transition-colors duration-300 hover:text-(--grey)' target='_blank' href='https://www.linkedin.com/in/jacquellinetruong'>LinkedIn</a>
                        <a className='w-fit transition-colors duration-300 hover:text-(--grey)' target='_blank' href='https://github.com/jacquelinetruong'>GitHub</a>
                    </div>
                    </Reveal>

                    {/* cta */}
                    <Reveal delay={1}>
                    <div className='flex flex-col justify-between w-(--cell-width) pl-8 pr-8'>
                        <div className='flex flex-col gap-4'>
                            <h5 className='text-white'>Like my work?</h5>
                            <a className='font-medium text-(--dark-black)
                                        flex flex-row gap-2 items-center
                                        w-fit h-fit px-4 py-2 rounded-full
                                        bg-white hover:bg-(--grey)
                                        transition-colors duration-300'
                                target='_blank'
                                href='mailto:hello@jacquelinetruong.dev'
                            >    
                                Let's Connect
                                <LinkArrow className='size-[28px] text-(--text-colour)'/>
                            </a>
                        </div>
                        <Image 
                            src='/thats-all.svg'
                            alt='handwritten note'
                            width={320}
                            height={100.68}
                            draggable={false}
                        />
                    </div>
                    </Reveal>
                </div>
                
                <Reveal delay={1}>
                {/* copyright */}
                <p className='xs:text-sx sm:text-sm text-(--alt-text-colour)
                              flex flex-row justify-center'>
                    All rights reserved. © 2025
                </p>
                </Reveal>
            </div>
        </Grid>
    )
}