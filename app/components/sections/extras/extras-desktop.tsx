// MANUAL CONTENT MANAGEMENT
'use client';

import Image from 'next/image';
import { Reveal } from '../../reveal';
import Card from '../../card';
import Grid from '../../grid';

import { SectionReveal } from '../../section-reveal';
import Cat from '../../icons/cat-icon';


export default function Extras({
    className = '',
	isLoading = false,
 }: { 
	className?: string; 
	isLoading?: boolean;
 }) {

    return (
        <SectionReveal
			fadeDistance={0}
			fadeStart={0}
			fadeEnd={0.7}
		>
			<Grid>
				{/* big text */}
                <div className='col-start-1 col-span-2 row-start-1 row-span-1 p-8 | ultrawide:p-12'>
                    <Reveal delay={0.15} className='flex flex-col justify-end'>
                        <h1 className='font-medium text-4xl max-w-5/6'>
                            My latest creations outside of work.
                        </h1>
                    </Reveal>
                </div>

                {/* body text */}
                <div className='col-start-1 col-span-2 row-start-2 row-span-1 p-8 | ultrawide:p-12'>
                    <Reveal delay={0.25}>
                        <p className='w-full sm:text-[10px] md:text-sm 2xl:text-base 3xl:text-lg 3xl:w-4/5'>
                            A collection of hobbies, small experiments, and quiet moments from my camera roll. 
                            Each photo holds a little joy for me — maybe they’ll spark something for you as well.
                        </p>
                    </Reveal>
                </div>

                {/* images */}
                <div className='col-start-4 row-start-1 w-full h-full relative'>
                    <Reveal delay={0.75}>
                        <Image 
                            src='/me.jpg'
                            alt='pic of me'
                            fill
                            className='object-cover object-center pointer-events-none'
                            draggable={false}
                        />
                    </Reveal>
                </div>
                <div className='col-start-5 row-start-1 w-full h-full relative'>
                    <Reveal delay={1.2}>
                        <Image 
                            src='/me.jpg'
                            alt='pic of me'
                            fill
                            className='object-cover object-center pointer-events-none'
                            draggable={false}
                        />
                    </Reveal>
                </div>
                <div className='col-start-3 row-start-2 w-full h-full relative'>
                    <Reveal delay={0.6}>
                        <Image 
                            src='/me.jpg'
                            alt='pic of me'
                            fill
                            className='object-cover object-center pointer-events-none'
                            draggable={false}
                        />
                    </Reveal>
                </div>
                <div className='col-start-4 row-start-2 w-full h-full relative'>
                    <Reveal delay={1}>
                        <Image 
                            src='/me.jpg'
                            alt='pic of me'
                            fill
                            className='object-cover object-center pointer-events-none'
                            draggable={false}
                        />
                    </Reveal>
                </div>
                <div className='col-start-2 row-start-3 w-full h-full relative'>
                    <Reveal delay={0.35}>
                        <Image 
                            src='/me.jpg'
                            alt='pic of me'
                            fill
                            className='object-cover object-center pointer-events-none'
                            draggable={false}
                        />
                    </Reveal>
                </div>
                <div className='col-start-4 row-start-3 w-full h-full relative'>
                    <Reveal delay={0.85}>
                        <Image 
                            src='/me.jpg'
                            alt='pic of me'
                            fill
                            className='object-cover object-center pointer-events-none'
                            draggable={false}
                        />
                    </Reveal>
                </div>
                <div className='col-start-5 row-start-3 w-full h-full relative'>
                    <Reveal delay={1.4}>
                        <Image 
                            src='/me.jpg'
                            alt='pic of me'
                            fill
                            className='object-cover object-center pointer-events-none'
                            draggable={false}
                        />
                    </Reveal>
                </div>

                {/* cat */}
                <div className='col-start-1 row-start-3 self-center place-self-center'>
                    <Reveal delay={1.4}>
                        <Cat className='text-(--nice-grey)'/>
                    </Reveal>
                </div>

			</Grid>
		</SectionReveal>
    )
}