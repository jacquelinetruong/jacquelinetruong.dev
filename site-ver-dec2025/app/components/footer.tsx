'use client';

import Image from 'next/image';
import Grid from './grid';

import LinkArrow from './icons/link-arrow';

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
                            flex flex-col gap-6 justify-end items-center
                            p-8'>
                <h1 className='font-semibold text-3xl'>Have a project idea? Let's make it happen.</h1>
                <a className='font-medium text-xl text-(--bg-colour) hover:text-white
                              flex flex-row gap-2 items-center
                              w-fit h-fit px-5 py-3 rounded-full
						      bg-(--text-colour) hover:bg-(--dark-grey)
                              transition-colors duration-300
                              cursor-pointer'>
                    Get Started
                    <LinkArrow className='size-[28px] text-white'/>
                </a>
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
            <div className='font-inter font-medium text-lg text-(--alt-text-colour)
                            col-start-1 col-span-5 row-start-3 row-span-1
                            flex flex-col gap-16 p-8 pt-16 h-fit
                            bg-(--dark-black) border-t-(--dark-black)'>
                {/* content */}
                <div className='flex flex-row justify-between'>
                    {/* signature section */}
                    <div className='flex flex-col gap-6 '>
                        <Image 
                            src='/jt-white.svg'
                            alt='jacqueline truong'
                            width={320}
                            height={112.84}
                            className='w-full'
                            draggable={false}
                        />
                        <h5 className='text-(--alt-text-colour) text-right'>Design and development by {"\n"} Jacqueline Truong</h5>
                    </div>

                    {/* navigation pages */}
                    <div className='flex flex-col gap-2'>
                        <h5 className='text-white'>Pages</h5>
                        <a className='transition-colors duration-300 hover:text-(--grey)' href='#home'>Home</a>
                        <a className='transition-colors duration-300 hover:text-(--grey)' href='#about'>About</a>
                        <a className='transition-colors duration-300 hover:text-(--grey)' href='#portfolio'>Portfolio</a>
                        <a className='transition-colors duration-300 hover:text-(--grey)' href='#experience'>Experience</a>
                    </div>

                    {/* links */}
                    <div className='flex flex-col gap-2'>
                        <h5 className='text-white'>Find More</h5>
                        <a className='transition-colors duration-300 hover:text-(--grey)' href=''>Resume</a>
                        <a className='transition-colors duration-300 hover:text-(--grey)' target='_blank' href='https://www.linkedin.com/in/jacquellinetruong'>LinkedIn</a>
                        <a className='transition-colors duration-300 hover:text-(--grey)' target='_blank' href='https://github.com/jacquelinetruong'>GitHub</a>
                    </div>

                    {/* cta */}
                    <div className='flex flex-col justify-between'>
                        <div className='flex flex-col gap-4'>
                            <h5 className='text-white'>Like my work?</h5>
                            <a className='font-medium text-xl text-(--dark-black)
                                        flex flex-row gap-2 items-center
                                        w-fit h-fit px-5 py-3 rounded-full
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
                </div>
                
                {/* copyright */}
                <p className='text-(--alt-text-colour)
                              flex flex-row justify-center'>
                    All rights reserved. © 2025
                </p>
            </div>
        </Grid>
    )
}