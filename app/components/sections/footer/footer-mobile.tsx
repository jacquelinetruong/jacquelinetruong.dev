'use client';

import Image from 'next/image';
import Grid from '@/app/components/grid';
import LinkArrow from '@/app/components/icons/link-arrow';
import { Reveal } from '@/app/components/reveal';
import CatSecret from '../../cat-secret';


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

                        <div className='relative w-full sm:w-3/4 aspect-2/1'>
                            <Reveal delay={0.8}>
                                <Image
                                    src='/thx4visiting.svg'
                                    alt='Thanks for visiting!'
                                    width={179}
                                    height={56.32}
                                    className='size-full p-4'
                                />
                            </Reveal>
                        </div>
                    </div>

                    {/* social links */}
                    <div className='font-regular text-white text-sm | xs:text-base w-fit 
                                    flex flex-row gap-4 sm:gap-6'>
                        <a target='_blank' href='/resume.pdf'>Resume</a>
                        <a target='_blank' href='https://www.linkedin.com/in/jacquellinetruong'>LinkedIn</a>
                        <a target='_blank' href='https://github.com/jacquelinetruong'>GitHub</a>
                        <a target='_blank' href='https://www.behance.net/jacqueltruong'>Behance</a>
                    </div>
                </div>

                <div className='w-full h-full flex flex-col gap-8'>
                    {/* easter egg */}
                    <div className='w-full h-full p-4'>
                        <CatSecret />
                    </div>

                    {/* copyright */}
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
                    <p className='text-sm | xs:text-base text-right text-(--light-mode-grey)'>© 2026 built & designed by jacqueline truong</p>
                </div>
            </div>
        </Grid>
    )
}