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
                            My latest moments outside of work.
                        </h1>
                    </Reveal>
                </div>

                {/* body text */}
                <div className='col-start-1 col-span-2 row-start-2 row-span-1 p-8 | ultrawide:p-12'>
                    <Reveal delay={0.25}>
                        <p className='w-full sm:text-[10px] md:text-sm 2xl:text-base 3xl:text-lg 3xl:w-4/5'>
                            A collection of hobbies and favourites from my camera roll. 
                            Each photo represents a little bit of me, offline.
                        </p>
                    </Reveal>
                </div>

                {/* images */}
                <div className='col-start-4 row-start-1 w-full h-full relative'>
                    <Reveal delay={0.75}>
                        <Card
                            image='/summer-person.webp'
                            description='Capturing summer in motion.'
                        />
                    </Reveal>
                </div>
                <div className='col-start-5 row-start-1 w-full h-full relative'>
                    <Reveal delay={1.2}>
                        <Card
                            image='/tranquil-outdoors.webp'
                            description='On a constant quest to find tranquil escapes.'
                        />
                    </Reveal>
                </div>
                <div className='col-start-3 row-start-2 w-full h-full relative'>
                    <Reveal delay={0.6}>
                        <Card
                            image='/current-keyboard-built-by-me.webp'
                            description='A new hobby: tinkering with my latest keyboard build.'
                        />
                    </Reveal>
                </div>
                <div className='col-start-4 row-start-2 w-full h-full relative'>
                    <Reveal delay={1}>
                        <Card
                            image='/fav-nails-by-me.webp'
                            description='One of my creative outlets—a monthly nailset.'
                        />
                    </Reveal>
                </div>
                <div className='col-start-2 row-start-3 w-full h-full relative'>
                    <Reveal delay={0.35}>
                        <Card
                            image='/perfect-table-spread.webp'
                            description="Camera eats first (pics or it didn't happen)."
                        />
                    </Reveal>
                </div>
                <div className='col-start-4 row-start-3 w-full h-full relative'>
                    <Reveal delay={0.85}>
                        <Card
                            image='/always-matcha.webp'
                            description='Never skipping my daily matcha/coffee fix.'
                        />
                    </Reveal>
                </div>
                <div className='col-start-5 row-start-3 w-full h-full relative'>
                    <Reveal delay={1.4}>
                        <Card
                            image='/sweet-treats.webp'
                            description="There's always room for dessert."
                        />
                    </Reveal>
                </div>

                {/* cat */}
                <Reveal delay={1.4} className='col-start-1 row-start-3 p-8'>
                    <Cat className='text-(--nice-grey) place-self-center size-full xl:w-4/5'/>
                </Reveal>

			</Grid>
		</SectionReveal>
    )
}