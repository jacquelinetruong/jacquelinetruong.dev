'use client';

import Grid from '@/app/components/grid';
import Carousel from '@/app/components/carousel';
import { Project } from '@/lib/projectTypes';


export default function FeaturedMobile({
    className = '',
    featuredProjects,
 }: { 
    className?: string; 
    featuredProjects: Project[];
 }) {
    return (
        <section className='relative'>
            <Grid>
                <div className='col-start-1 col-span-3 row-start-1 row-span-4'>
                    <Carousel 
                        projects={featuredProjects} 
                        section='featured'
                    />
                </div>
            </Grid>
        </section>
    )
 }