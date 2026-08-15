'use client';

import Grid from '@/app/components/grid';
import Carousel from '@/app/components/carousel';


export default function MoreMobile({
    className = '',
 }: { 
    className?: string; 
 }) {
    return (
        <section className='relative'>
            <Grid>
                <div className='col-start-1 col-span-3 row-start-1 row-span-4'>
                    <Carousel 
                        section='more'
                        images={[
                            {   image: '/me.jpg', 
                                title: 'About me', 
                                description: '...', 
                                href: '/about',
                                alt: 'Find out more about what I do!'
                            },
                            {   image: '/office.webp', 
                                title: 'Work experience', 
                                description: '...', 
                                href: '/about#experience',
                                alt: 'More on my career.'
                            },
                            {   image: '/blurrypreview.webp', 
                                title: 'Currently building', 
                                description: '...', 
                                href: '/work/current',
                                alt: "My current project in the works!"
                            },
                            {   image: '/skills.webp', 
                                title: 'Skills', 
                                description: '...', 
                                href: '/about#skills',
                                alt: 'My skills & proficiencies'
                            },
                            {   image: '/summer-person.webp', 
                                title: 'Extras', 
                                description: '...', 
                                href: '/extras',
                                alt: 'What I do outside of work.'
                            },
                        ]}
                    />
                </div>
            </Grid>
        </section>
    )
 }