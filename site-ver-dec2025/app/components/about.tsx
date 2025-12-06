'use client';

import Image from 'next/image';
import Grid from './grid';

import '../../public/me.jpg';
import '../../public/detail-arrow-black.svg';
import '../../public/coffee-icon-white.svg';
import '../../public/jt-grey.svg';
import '../../public/guide-arrow-black.svg';
import '../../public/cat.svg';


export default function About({ className = '' }: { className?: string }) {
    return(
        <Grid className={className}>
            {/* pic of me! */}
            <div className='col-start-1 col-span-1 row-start-2 row-span-2'>
                <Image 
                    src='/me.jpg'
                    alt='pic of me'
                    width={2000}
                    height={2508}
                    className='h-full object-cover'
                />
            </div>

            {/* about me content */}
            <div className='font-inter
                            col-start-2 col-span-2 row-start-2 row-span-2
                            flex flex-col justify-between
                            p-8'>
                {/* message */}
                <div className='flex flex-col gap-6'>
                    <p className='font-semibold text-3xl'>
                        Hey! Welcome to my portfolio site.
                    </p>
                    <p className='text-xl'>
                        I'm a newgrad designer who loves bringing ideas to life through clean, functional, high-impact products. Since I also code, I'm drawn to 
                        creating designs that aren't just beautiful, but realistic, buildable, and considerate of engineering workflows. By speaking in both "design"
                        and "dev" languages, I bridge the gap, crafting intuitive interactions, scalable UI, and shipping things that make a real difference.
                    </p>
                    <p className='text-xl'>
                        When I'm not designing or coding, I'm probably making my third iced coffee of the day, or playing video games!
                    </p>
                </div>

                {/* quick info */}
                <div className='flex flex-col gap-8'>
                    {/* current work */}
                    <div className='flex flex-col gap-1'>
                        <p className='font-medium text-xl text-[#888888]'>Currently</p>
                        <p className='font-semibold text-xl
                                        flex flex-row gap-2 items-center'>
                            <Image 
                                src='/detail-arrow-black.svg'
                                alt='arrow'
                                width={24}
                                height={24}
                            />
                            UX/UI Designer @ MobCoder,
                        </p>                        
                        <p className='font-semibold text-xl
                                        flex flex-row gap-2 items-center'>
                            <Image 
                                src='/detail-arrow-black.svg'
                                alt='arrow'
                                width={24}
                                height={24}
                            />
                            Chief Creative Officer @ Konfer
                        </p>
                    </div>

                    {/* education */}
                    <div className='flex flex-col gap-1'>
                        <p className='font-medium text-xl text-[#888888]'>Education</p>
                        <p className='font-semibold text-xl
                                        flex flex-row gap-2 items-center'>
                            <Image 
                                src='/detail-arrow-black.svg'
                                alt='arrow'
                                width={24}
                                height={24}
                            />
                            BSc Computer Science @ Wilfrid Laurier University, 2025
                        </p>
                    </div>
                </div>
            </div>
            
            {/* cta, intro section */}
            <div className='font-inter
                            col-start-4 col-span-2 row-start-2 row-span-1
                            flex flex-col justify-between items-end 
                            p-8'>
    
                {/* "say hi" button */}
                <a className='font-medium text-2xl text-white
                                flex flex-row gap-4 items-center
                                w-fit h-fit px-6 py-4 rounded-full
                                bg-[#292A2D]'
                    target='_blank' 
                    href='mailto:hello@jacquelinetruong.dev'
                >
                    <Image 
                        src='/coffee-icon-white.svg'
                        alt='coffee icon'
                        width={32}
                        height={32}
                    />
                    Say Hi!
                </a>
    
                {/* quick intro text */}
                <p className='font-semibold text-3xl text-right text-[#BEBEBE]'>
                    Product designer first, software engineer second. Focused on crafting digital experiences and turning everyday ideas into art.
                </p>
            </div>

            {/* big name */}
            <div className='col-start-4 col-span-2 row-start-3 row-span-1
                            flex flex-col items-end
                            p-8'>
                <Image 
                    src='/jt-grey.svg'
                    alt='jacqueline truong'
                    width={736}
                    height={259.52}
                    className='size-full'
                />
            </div>
            
            {/* project display #1 */}
            <div className='font-inter
                            col-start-2 col-span-1 row-start-4 row-span-1
                            border-2 border-[#FF0000]'>
                {/* add later: project component */}
            </div>

            {/* jump to 'experience' button */}
                    <div className='col-start-3 col-span-1 row-start-4 row-span-1
                                    flex flex-col justify-end items-center'>
                        <a className='font-inter font-medium
                                      flex flex-col items-center gap-2
                                      p-8'
                            href='#about'			  
                        >
                            My Experience
                            <Image
                                src='/guide-arrow-black.svg'
                                alt='arrow pointing down'
                                width={28}
                                height={28}
                            />
                        </a>
                    </div>

            {/* project display #2 */}
            <div className='font-inter
                            col-start-4 col-span-1 row-start-4 row-span-1
                            border-2 border-[#FF0000]'>
                {/* add later: project component */}
            </div>

            {/* city */}
            <div className='font-inter font-semibold text-3xl text-right text-[#BEBEBE]
                            col-start-5 col-span-1 row-start-4 row-span-1
                            flex flex-col md:gap-8 xl:justify-between
                            p-8'>
                <p>Based in Toronto, CA.</p>

                {/* cat! */}
                <div className=''>
                    <Image 
                        src='/cat.svg'
                        alt='hand-drawn cat'
                        width={250}
                        height={127.63}
                        className='size-full'
                    />
                </div>
            </div>
            
        </Grid>
    )
}