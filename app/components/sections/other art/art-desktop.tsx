// MANUAL CONTENT MANAGEMENT
'use client';

import Image from 'next/image';
import { Reveal } from '../../reveal';
import Artpiece from './artpiece-section-desktop';
import Grid from '../../grid';

import { SectionReveal } from '../../section-reveal';
import Cat from '../../icons/cat-icon';


export default function Art({
    className = '',
 }: { 
    className?: string; 
 }) {

    const artCount = '[5 pieces in collection]';

    return (
        <SectionReveal
            fadeDistance={0}
            fadeStart={0}
            fadeEnd={0.7}
        >
            <Grid>
                {/* big text */}
                <div className='col-start-2 col-span-2 row-start-1 row-span-1 p-8 | ultrawide:p-12'>
                    <Reveal delay={0.15} className='flex flex-col justify-end'>
                        <h1 className='font-medium text-4xl max-w-5/6'>
                            Out of Office: my creations & mind.
                        </h1>
                    </Reveal>
                </div>

                {/* body text */}
                <div className='col-start-2 col-span-2 row-start-2 row-span-1 p-8 | ultrawide:p-12'>
                    <Reveal delay={0.25} className='flex flex-col gap-4'>
                        <p className='w-full sm:text-[10px] md:text-sm 2xl:text-base 3xl:text-lg 3xl:w-4/5'>
                            When I'm not designing digital experiences, I'm busy recreating the fantasy world of my dreams—literally.
                            These are a few of my proudest pieces; I hope they spark the same wistful longing in you, too.
                        </p>
                        <p className='text-(--light-mode-grey) w-full sm:text-[10px] md:text-sm 2xl:text-base 3xl:text-lg 3xl:w-4/5'>
                            {artCount}
                        </p>
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