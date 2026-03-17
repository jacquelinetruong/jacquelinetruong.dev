// TODO: MOBILE
// template component used for card previews (used by archive section & extras page)
'use client';
import { Cal_Sans } from 'next/font/google';
import Grid from '../../grid';
import { useMediaQuery } from '../../media-query';
import { Reveal } from '../../reveal';
import { SectionReveal } from '../../section-reveal';
import Cat from '../../icons/cat-icon';
import { lazy } from 'react';


type ArtpieceProps = {
    className?: string;
    gridPosition: string;
    image: string;
    title: string;
    description: string;
    medium: string;
};

export default function Artpiece({
    className,
    gridPosition = '',
    image,
    title,
    description,
    medium,
 }: ArtpieceProps) { 

    // ------ VIEWPORT DISPLAY ------ //
    const isDesktop = useMediaQuery('(min-width: 1024px)');

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
                            {title}
                        </h1>
                    </Reveal>
                </div>

                {/* body text */}
                <div className='col-start-1 col-span-2 row-start-2 row-span-1 p-8 | ultrawide:p-12'>
                    <Reveal delay={0.25} className='flex flex-col justify-between'>
                        <p className='w-full sm:text-[10px] md:text-sm 2xl:text-base 3xl:text-lg 3xl:w-4/5'>
                            {description}
                        </p>
                        <p className='text-(--light-mode-grey) w-full sm:text-[10px] md:text-sm 2xl:text-base 3xl:text-lg 3xl:w-4/5'>
                            {medium}
                        </p>
                    </Reveal>
                </div>

                {/* cover image */}
                <a 
                    target='_blank'
                    href={image}
                    className={`${gridPosition} relative overflow-hidden group`}
                >
                    <img
                        src={image}
                        alt={`${title} preview`}
                        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-115 ${className}`}
                        draggable={false}
                        loading='lazy'
                        decoding='async'
                    />

                    {/* hover: card details */}
                    <div className='absolute inset-0 bg-[#131319]/15 transition duration-300 group-hover:bg-[#131319]/50'/>
                    <p className='absolute inset-0 p-6 place-self-center flex flex-col gap-2 w-4/5
                                    text-sm xl:text-sm text-(--true-white) font-medium text-center text-wrap drop-shadow-lg
                                    opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0
                                    transition-all duration-200'>
                        View full screen
                    </p>
                </a>

                {/* cat */}
                <Reveal delay={1.4} className='col-start-1 row-start-3 p-8'>
                    <Cat className='text-(--nice-grey) place-self-center size-full xl:w-4/5'/>
                </Reveal>
            </Grid>
        </SectionReveal>
    )
}