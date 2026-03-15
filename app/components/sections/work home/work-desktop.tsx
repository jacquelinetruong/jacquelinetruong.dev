// MANUAL CONTENT MANAGEMENT
'use client';

import Image from 'next/image';
import { Reveal } from '../../reveal';
import Card from '../../card';
import Grid from '../../grid';

import { SectionReveal } from '../../section-reveal';
import type { Project } from '@/lib/projectTypes';


export default function Work({
    className = '',
    projects,
 }: { 
    className?: string; 
    projects: Project[];
 }) {

    
    
    return (
        <SectionReveal
            fadeDistance={0}
            fadeStart={0}
            fadeEnd={0.7}
        >
            <Grid>
                {/* big title */}
                <div className='col-start-1 col-span-2 row-start-1
                                flex flex-col justify-end
                                px-8 py-4 | ultrawide:pr-20 ultrawide:py-8'>
                    <div className='w-full h-full relative'>
                        <Reveal delay={0.25}>
                            <Image 
                                src='/portfolio.svg'
                                alt=''
                                fill
                                className='object-contain object-left bottom-0'
                                draggable={false}
                            />
                        </Reveal>
                    </div>
                </div>
            </Grid>
        </SectionReveal>
    )
}