'use client';
import Image from 'next/image';

import Grid from '../../grid';

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
                <div className='col-start-2 col-span-2 row-start-1 row-span-1 
                                w-full h-full relative flex justify-end'>
                    <Image
                        src='/hey.svg'
                        alt='Hey, welcome to my portfolio site!'
                        fill
                        className='p-4 '
                    />
                </div>

                {/* name and title */}
                <div className='col-start-1 col-span-3 row-start-2 row-span-1 
                                w-full h-full p-4
                                flex flex-col justify-between items-end'>
                    <div className='w-full h-fit relative'>
                        <Image
                            src='/jt-black.svg'
                            alt='my namestamp'
                            width={344}
                            height={121.3}
                            className='place-self-end'
                        />
                    </div>
                    <h2 className='text-lg'>Designer & Developer</h2>
                </div>

                {/* text, cta */}
                <div className='col-start-1 col-span-3 row-start-3 row-span-1
                                flex flex-col justify-between items-end p-4'>
                    <h3 className='text-base font-medium text-right'>Focused on crafting digital experiences and turning everyday ideas into art.</h3>

                    <div className='w-full h-fit flex flex-row justify-between items-center'>
                        <h3 className='text-base font-medium text-right'>Based in Toronto, CA.</h3>
                        <a 
                            target='_blank'
							href='mailto:hello@jacquelinetruong.dev'
                            className='flex flex-row gap-2 items-center 
                                        w-fit h-fit px-5 py-4 rounded-full
                                        bg-(--black) text-white text-xs'
                        >
                            <Coffee className='size-[20px]'/>
                            Get in touch
                        </a>
                    </div>
                </div>
            </Grid>
        </section>
    )
 }