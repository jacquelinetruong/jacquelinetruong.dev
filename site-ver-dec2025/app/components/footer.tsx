'use client';

import Image from 'next/image';
import Grid from './grid';

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
                            col-start-2 col-span-3 row-start-2 row-span-1
                            flex flex-col gap-6 justify-end items-center
                            p-8'>
                <p className='font-semibold text-3xl'>Have a project idea? Let's make it happen.</p>
                <a className='font-medium text-xl text-white
                              flex flex-row gap-2 items-center
                              w-fit h-fit px-5 py-3 rounded-full
						      bg-[#292A2D]'>
                    Get Started
                    <Image
                        src='/link-arrow-white.svg'
                        alt='arrow'
                        width={28}
                        height={28}
                    />
                </a>
            </div>

            {/* signature name */}
            <div className='col-start-1 col-span-5 row-start-3 row-span-1
                            flex flex-col justify-end'>
                <Image 
                    src='/footer-jacqueline.svg'
                    alt='jacqueline'
                    width={1920}
                    height={260}
                    className='w-full'
                />
            </div>

            {/* real footer */}
            <div className='font-inter font-medium text-lg text-[#888888]
                            col-start-1 col-span-5 row-start-4 row-span-1
                            flex flex-col gap-16 p-8 pt-16 h-fit
                            bg-[#1B1C1D] border-t-[#1B1C1D]'>
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
                        />
                        <p className='text-[#888888] text-right'>Design and development by {"\n"} Jacqueline Truong</p>
                    </div>

                    {/* navigation pages */}
                    <div className='flex flex-col gap-2'>
                        <p className='text-white'>Pages</p>
                        <a href='#home'>Home</a>
                        <a href='#about'>About</a>
                        <a href='#portfolio'>Portfolio</a>
                        <a href='#experience'>Experience</a>
                    </div>

                    {/* links */}
                    <div className='flex flex-col gap-2'>
                        <p className='text-white'>Find More</p>
                        <a href=''>Resume</a>
                        <a target='_blank' href='https://www.linkedin.com/in/jacquellinetruong'>LinkedIn</a>
                        <a target='_blank' href='https://github.com/jacquelinetruong'>GitHub</a>
                    </div>

                    {/* cta */}
                    <div className='flex flex-col justify-between'>
                        <div className='flex flex-col gap-4'>
                            <p className='text-white'>Like my work?</p>
                            <a className='font-medium text-xl text-[#1B1C1D]
                                        flex flex-row gap-2 items-center
                                        w-fit h-fit px-5 py-3 rounded-full
                                        bg-white'
                                target='_blank'
                                href='mailto:hello@jacquelinetruong.dev'
                            >    
                                Let's Connect
                                <Image
                                    src='/link-arrow-black.svg'
                                    alt='arrow'
                                    width={28}
                                    height={28}
                                />
                            </a>
                        </div>
                        <Image 
                            src='/thats-all.svg'
                            alt='handwritten note'
                            width={320}
                            height={100.68}
                        />
                    </div>
                </div>
                
                {/* copyright */}
                <p className='text-[#888888]
                              flex flex-row justify-center'>
                    All rights reserved. © 2025
                </p>
            </div>
        </Grid>
    )
}