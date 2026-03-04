'use client';

import { Reveal } from '../../reveal';
import Card from '../../card';
import Grid from '../../grid';

import { SectionReveal } from '../../section-reveal';


export default function MoreLinks({
    className = '',
	isLoading = false,
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
				<div className='col-start-2 col-span-2 row-start-1 w-full h-full p-6'>
					<Reveal delay={0.5} className='flex flex-col justify-end'>
						<h1 className='font-medium text-3xl w-full text-left'>More about me</h1>
					</Reveal>
				</div>

				{/* work experience link card */}
				<div className='col-start-1 row-start-1'>
					<Reveal delay={1.2}>
                        <Card
                            coverImage='/office.png'
                            altText='Work experience'
							hrefId='/about#experience'
                        />
					</Reveal>
				</div>

				{/* current build link card */}
				<div className='col-start-1 row-start-2'>
					<Reveal delay={1.2}>
                        <Card
                            coverImage='/me.jpg'
                            altText='Currently building'
							hrefId='/'
                        />
					</Reveal>
				</div>

				{/* about me link card */}
				<div className='col-start-2 col-span-2 row-start-2 row-span-2'>
					<Reveal delay={1.2}>
                        <Card
                            coverImage='/me.jpg'
                            altText='About me'
							hrefId='/about'
							big
                        />
					</Reveal>
				</div>

				{/* extras link card */}
				<div className='col-start-4 row-start-3'>
					<Reveal delay={1.2}>
                        <Card
                            coverImage='/summer-person.png'
                            altText='More me, offline'
							hrefId='/extras'
                        />
					</Reveal>
				</div>

			</Grid>
		</SectionReveal>
    )
}