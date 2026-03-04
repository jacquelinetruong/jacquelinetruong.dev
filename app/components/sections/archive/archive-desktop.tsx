// REQUIRES MANUAL CONTENT MANAGEMENT; not connected to Notion CMS
'use client';

import { Reveal } from '../../reveal';
import ArchivedProjectCard from '../../archived-projectcard';
import Grid from '../../grid';

import { SectionReveal } from '../../section-reveal';


export default function MoreLinks({
    className = '',
	isLoading,
 }: { 
	className?: string; 
	isLoading: boolean;
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
                            title='Project Test 1'
                            description='This is a short description of the project.'
                        />
					</Reveal>
				</div>

                {/* archived project #2 */}
				<div className='col-start-2 row-start-2'>
					<Reveal delay={0.7}>
                        <ArchivedProjectCard
                            title='Project Test 1'
                            description='This is a short description of the project.'
                        />
					</Reveal>
				</div>

                {/* archived project #3 */}
				<div className='col-start-3 row-start-2'>
					<Reveal delay={0.85}>
                        <ArchivedProjectCard
                            title='Project Test 1'
                            description='This is a short description of the project.'
                        />
					</Reveal>
				</div>

                {/* archived project #4 */}
				<div className='col-start-1 row-start-3'>
					<Reveal delay={0.5}>
                        <ArchivedProjectCard
                            title='Project Test 1'
                            description='This is a short description of the project.'
                        />
					</Reveal>
				</div>

                {/* archived project #5 */}
				<div className='col-start-3 row-start-3'>
					<Reveal delay={1}>
                        <ArchivedProjectCard
                            title='Project Test 1'
                            description='This is a short description of the project.'
                        />
					</Reveal>
				</div>

                {/* archived project #6 */}
				<div className='col-start-4 row-start-3'>
					<Reveal delay={1.2}>
                        <ArchivedProjectCard
                            title='Project Test 1'
                            description='This is a short description of the project.'
                        />
					</Reveal>
				</div>

			</Grid>
		</SectionReveal>
    )
}