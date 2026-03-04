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
                            My latest moments and creations outside of work.
                        </h1>
                    </Reveal>
                </div>

                {/* body text */}
                <div className='col-start-1 col-span-2 row-start-2 row-span-1 p-8 | ultrawide:p-12'>
                    <Reveal delay={0.25}>
                        <p className='w-full sm:text-[10px] md:text-sm 2xl:text-base 3xl:text-lg 3xl:w-4/5'>
                            A collection of hobbies and subtle experiences from my camera roll. 
                            Each photo holds a little joy for me — maybe they’ll spark something for you as well.
                        </p>
                    </Reveal>
                </div>

                {/* images */}
                <div className='col-start-4 row-start-1 w-full h-full relative'>
                    <Reveal delay={0.75}>
                        <Image 
                            src='/summer-person.png'
                            alt='Beach photo'
                            fill
                            className='object-cover object-center pointer-events-none'
                            draggable={false}
                        />
                    </Reveal>
                </div>
                <div className='col-start-5 row-start-1 w-full h-full relative'>
                    <Reveal delay={1.2}>
                        <Image 
                            src='/tranquil-outdoors.png'
                            alt='Tranquil campsite'
                            fill
                            className='object-cover object-center pointer-events-none'
                            draggable={false}
                        />
                    </Reveal>
                </div>
                <div className='col-start-3 row-start-2 w-full h-full relative'>
                    <Reveal delay={0.6}>
                        <Image 
                            src='/current-keyboard-built-by-me.png'
                            alt='Built my custom keyboard'
                            fill
                            className='object-cover object-center pointer-events-none'
                            draggable={false}
                        />
                    </Reveal>
                </div>
                <div className='col-start-4 row-start-2 w-full h-full relative'>
                    <Reveal delay={1}>
                        <Image 
                            src='/fav-nails-by-me.png'
                            alt='Favourite nail set by me'
                            fill
                            className='object-cover object-center pointer-events-none'
                            draggable={false}
                        />
                    </Reveal>
                </div>
                <div className='col-start-2 row-start-3 w-full h-full relative'>
                    <Reveal delay={0.35}>
                        <Image 
                            src='/perfect-table-spread.png'
                            alt='Camera eats first'
                            fill
                            className='object-cover object-center pointer-events-none'
                            draggable={false}
                        />
                    </Reveal>
                </div>
                <div className='col-start-4 row-start-3 w-full h-full relative'>
                    <Reveal delay={0.85}>
                        <Image 
                            src='/always-matcha.png'
                            alt='Never skip my daily matcha'
                            fill
                            className='object-cover object-center pointer-events-none'
                            draggable={false}
                        />
                    </Reveal>
                </div>
                <div className='col-start-5 row-start-3 w-full h-full relative'>
                    <Reveal delay={1.4}>
                        <Image 
                            src='/sweet-treats.png'
                            alt='Always room for dessert'
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