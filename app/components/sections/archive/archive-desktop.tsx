// REQUIRES MANUAL CONTENT MANAGEMENT; not connected to Notion CMS
'use client';

import Image from 'next/image';
import { Reveal } from '../../reveal';
import Card from '../../card';
import Grid from '../../grid';
import { SectionReveal } from '../../section-reveal';
import Cat from '../../icons/cat-icon';
import Coffee from '../../icons/coffee';


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
				{/* big title */}
				<div className='col-start-4 col-span-2 row-start-1
								flex flex-col justify-between items-end
								px-8 pt-8 | ultrawide:p-8 ultrawide:pr-20'>

					<div className='w-fit h-fit'>
						<Reveal delay={2.75}>
							<a
								className='font-normal text-sm 3xl:text-lg text-(--bg-colour) group
											flex flex-row gap-2 items-center place-self-end
											w-fit h-fit px-5 py-4 rounded-full 2xl:px-6 2xl:py-4
											bg-(--text-colour) hover:bg-(--nice-grey)
											transition-colors duration-300'
								target='_blank'
								href='mailto:hello@jacquelinetruong.dev'
							>	
								<Coffee className={`size-[24px] transition-colors duration-300 text-(--bg-colour)`}/>
								Get in touch
							</a>
						</Reveal>
					</div>

					<Reveal delay={0.25} className='relative'>
						<Image 
							src='/archive.svg'
							alt=''
							fill
							className='object-contain object-right-bottom'
							draggable={false}
						/>
					</Reveal>
				</div>

				{/* text */}
				<Reveal delay={0.2} className='col-start-4 col-span-2 row-start-2 p-8 | ultrawide:pr-20'>
					<p className='text-(--off-white) text-base w-full text-right'>My range of professional design works. Full details available upon request.</p>
				</Reveal>

				{/* archived project #1 */}
				<div className='col-start-1 row-start-1'>
					<Reveal delay={0.35}>
                        <Card
							image='/eg.webp'
                            title='Real Estate Marketplace'
                            description='A property marketplace with a multi-parameter search system for urban listings in Egypt.'
							gradient
                        />
					</Reveal>
				</div>

				{/* archived project #2 */}
				<div className='col-start-2 row-start-1'>
					<Reveal delay={0.7}>
                        <Card
							image='/sh.webp'
                            title='Hackathon Mobile Landing'
                            description='A high-performance quantum event landing page designed with a mobile-first approach.'
							gradient
                        />
					</Reveal>
				</div>

                {/* archived project #3 */}
				<div className='col-start-2 row-start-2'>
					<Reveal delay={0.7}>
                        <Card
							image='/port.webp'
                            title='Creative Writer Portfolio'
                            description='A minimalist, typography-focused digital portfolio designed to highlight narrative work and editorial projects.'
							gradient
                        />
					</Reveal>
				</div>

                {/* archived project #4 */}
				<div className='col-start-3 row-start-2'>
					<Reveal delay={0.85}>
                        <Card
							image='/hh.webp'
                            title='Hackathon Auth Flow'
                            description='A streamlined, secure login and onboarding experience designed for a hackathon initiative.'
							gradient
                        />
					</Reveal>
				</div>

                {/* archived project #5 */}
				<div className='col-start-1 row-start-3'>
					<Reveal delay={0.5}>
                        <Card
							image='/acc.webp'
                            title='Retail E-commerce Experience'
                            description='A digital store featuring dynamic product galleries, type-selection, and a conversion-optimized checkout flow.'
							gradient
                        />
					</Reveal>
				</div>

                {/* archived project #6 */}
				<div className='col-start-2 row-start-3'>
					<Reveal delay={1}>
                        <Card
							image='/lcs.webp'
                            title='Club Brand & Web Identity'
                            description='A foundational digital ecosystem for a Computer Science organization, with established brand identity, custom assets, and a scalable design system.'
							gradient
                        />
					</Reveal>
				</div>

                {/* archived project #7 */}
				<div className='col-start-4 row-start-3'>
					<Reveal delay={1.2}>
                        <Card
							image='/ak.webp'
                            title='Digital Art Gallery'
                            description='A transformation of visual identity from a Kazakh art history & culture book into a full web experience.'
							gradient
                        />
					</Reveal>
				</div>

				{/* cat */}
				<Reveal delay={2} className='col-start-5 row-start-3 p-8'>
					<Cat className={`place-self-center size-full xl:w-4/5 text-(--light-black)`}/>
				</Reveal>
			</Grid>
		</SectionReveal>
    )
}