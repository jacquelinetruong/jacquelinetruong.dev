'use client';
import Image from 'next/image';

import Grid from '@/app/components/grid';
import { Reveal } from '@/app/components/reveal';

import Coffee from '@/app/components/icons/coffee';
import '@/public/hey.svg';
import '@/public/jt-black.svg';


export default function HeroDesktop({
    className = '',
    isLoading,
 }: { 
    className?: string; 
    isLoading: boolean;
 }) {
    return (
        <section className='relative font-inter'>
            <Grid>
                {/* hey! */}
                <div className='col-start-1 col-span-2 row-start-1 row-span-1 
                                w-full h-full relative flex justify-end'>
                    <Reveal delay={2}>
                        <Image
                            src='/hey.svg'
                            alt='Hey, welcome to my portfolio site!'
                            fill
                            className='p-4 '
                        />
                    </Reveal>
                </div>

                {/* name and title */}
                <div className='col-start-1 col-span-3 row-start-2 row-span-1 
                                w-full h-full p-4
                                flex flex-col justify-between items-end'>
                    <div className='w-full h-full relative'>
                        <Reveal delay={0.1}>
                            <Image
                                src='/jt-black.svg'
                                alt='my namestamp'
                                fill
                                className='object-contain object-right'
                            />
                        </Reveal>
                    </div>
                    <div className='w-full h-fit'>
                        <Reveal delay={0.1}>
                            <h2 className='text-lg text-right sm:text-xl'>Designer & Developer</h2>
                        </Reveal>
                    </div>
                </div>

                {/* text, cta */}
                <div className='col-start-1 col-span-3 row-start-3 row-span-1
                                flex flex-col justify-between items-end p-4'>
                        <Reveal delay={0.6}>
                            <h2 className='place-self-end text-base font-medium text-right sm:text-lg sm:w-6/8 sm:leading-[1.3]'>Focused on crafting digital experiences and turning everyday ideas into art.</h2>
                        </Reveal>
                    <div className='w-full h-fit flex flex-end justify-between items-center sm:justify-end sm:gap-8'>
                        <div className='w-fit'>
                            <Reveal delay={0.7}>
                                <h2 className='text-base sm:text-lg font-medium text-right'>Based in Toronto, CA.</h2>
                            </Reveal>
                        </div>

                        <div className='w-fit'>
                            <Reveal delay={1}>
                                <a 
                                    target='_blank'
                                    href='mailto:hello@jacquelinetruong.dev'
                                    className='flex flex-row gap-2 items-center place-self-end
                                                w-fit h-fit px-5 py-4 sm:px-6 sm:py-5 rounded-full
                                                bg-(--black) text-white text-xs sm:text-base'
                                >
                                    <Coffee className='size-[20px] sm:size-[24px]'/>
                                    Get in touch
                                </a>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </Grid>
        </section>
    )
 }