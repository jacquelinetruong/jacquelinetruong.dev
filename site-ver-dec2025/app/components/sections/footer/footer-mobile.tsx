'use client';

import Image from 'next/image';
import Grid from '@/app/components/grid';
import LinkArrow from '@/app/components/icons/link-arrow';
import { Reveal } from '@/app/components/reveal';

import '@/public/thats-all.svg';
import '@/public/footer-jacqueline-grey.svg';


export default function FooterMobile({ className = '' }:{ className?: string; }) {
    return (
        <Grid>
            {/* signature name */}
            <div className='col-start-1 col-span-3 row-start-1 row-span-1
                            flex flex-col justify-end '>
                <div className=''>
                    <Reveal delay={0.2} className=''>
                        <Image 
                            src='/footer-jacqueline.svg'
                            alt='jacqueline'
                            width={1920}
                            height={260}
                            className='w-full '
                            draggable={false}
                        />
                    </Reveal>
                </div>
            </div>

            {/* real footer */}
            <div className='col-start-1 col-span-3 row-start-2 row-span-3 bg-(--dark-black) px-4 pt-12 pb-8
                            flex flex-col gap-20 h-full'>
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

                        <div className='relative w-full sm:w-3/4 h-fit'>
                            <Reveal delay={0.8}>
                                <Image
                                    src='/thats-all.svg'
                                    alt='Thanks for visiting!'
                                    width={179}
                                    height={56.32}
                                    className='size-full'
                                />
                            </Reveal>
                        </div>
                    </div>

                    {/* social links */}
                    <div className='font-regular text-white text-sm | xs:text-base w-fit 
                                    flex flex-row gap-4 sm:gap-6'>
                        <a href=''>Resume</a>
                        <a target='_blank' href='https://www.linkedin.com/in/jacquellinetruong'>LinkedIn</a>
                        <a target='_blank' href='https://github.com/jacquelinetruong'>GitHub</a>
                    </div>
                </div>

                <div className='flex flex-col gap-8'>
                    {/* copyright */}
                    <div className='flex flex-col gap-2'>
                        <Reveal delay={1}>
                            <p className='text-sm | xs:text-base text-right text-(--light-mode-grey)'>Design and development by</p>
                            <div>
                                <Image
                                    src='/footer-jacqueline-grey.svg'
                                    alt='Jacqueline Truong'
                                    width={343}
                                    height={120.95}
                                    className='size-full'
                                />
                            </div>
                        </Reveal>
                    </div>
                    <p className='text-sm | xs:text-base text-right text-(--light-mode-grey)'>© 2025 jacqueline truong</p>
                </div>
            </div>
        </Grid>
    )
}