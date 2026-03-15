// REQUIRES MANUAL CONTENT MANAGEMENT; not connected to Notion CMS
'use client';

import { Reveal } from '../../reveal';
import ArchivedProjectCard from '../../archived-projectcard';
import Grid from '../../grid';

import { SectionReveal } from '../../section-reveal';


export default function Archive({
    className = '',
 }: { 
	className?: string; 
 }) {

    return (
        <SectionReveal
			fadeDistance={0}
			fadeStart={0}
			fadeEnd={0.7}
		>
			<Grid>
				{/* title */}
				<div className='col-start-2 col-span-2 row-start-1 p-6'>
					<Reveal delay={0.2} className='flex flex-col gap-4 justify-end'>
						<h1 className='font-medium text-3xl w-full text-left'>Additional works</h1>
						<p className='text-(--off-white) text-base w-full text-left'>Full details available upon request.</p>
					</Reveal>
				</div>

				{/* archived project #1 */}
				<div className='col-start-1 row-start-1'>
					<Reveal delay={0.35}>
                        <ArchivedProjectCard
							image='/eg.webp'
                            title='Egyptian Real Estate Portal'
                            description='A cross-continental property marketplace connecting agents in Egypt and Canada with a multi-parameter search system for urban listings.'
                        />
					</Reveal>
				</div>

                {/* archived project #2 */}
				<div className='col-start-2 row-start-2'>
					<Reveal delay={0.7}>
                        <ArchivedProjectCard
							image='/sh.webp'
                            title='SpurHacks Landing'
                            description='A high-performance quantum event landing page designed with a strict mobile-first approach.'
                        />
					</Reveal>
				</div>

                {/* archived project #3 */}
				<div className='col-start-3 row-start-2'>
					<Reveal delay={0.85}>
                        <ArchivedProjectCard
							image='/port.webp'
                            title='Creative Writer Portfolio'
                            description='A minimalist, typography-focused digital portfolio designed to highlight narrative work and editorial projects.'
                        />
					</Reveal>
				</div>

                {/* archived project #4 */}
				<div className='col-start-1 row-start-3'>
					<Reveal delay={0.5}>
                        <ArchivedProjectCard
							image='/hh.webp'
                            title='Hackathon Auth Flow'
                            description='A streamlined, secure login and onboarding experience designed as part of a rapid-prototyping hackathon initiative.'
                        />
					</Reveal>
				</div>

                {/* archived project #5 */}
				<div className='col-start-3 row-start-3'>
					<Reveal delay={1}>
                        <ArchivedProjectCard
							image='/acc.webp'
                            title='Retail E-commerce Experience'
                            description='A full-funnel retail concept featuring dynamic product galleries, type-selection, and a conversion-optimized checkout flow.'
                        />
					</Reveal>
				</div>

                {/* archived project #6 */}
				<div className='col-start-4 row-start-3'>
					<Reveal delay={1.2}>
                        <ArchivedProjectCard
							image='/lcs.webp'
                            title='Club Brand & Web Identity'
                            description='A foundational digital ecosystem for a Computer Science organization, with established brand identity, custom assets, and a scalable design system.'
                        />
					</Reveal>
				</div>

			</Grid>
		</SectionReveal>
    )
}