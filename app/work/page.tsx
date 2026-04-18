// work home page

import Work from '../components/sections/work home/work-desktop';
import Archive from '../components/sections/archive/archive-desktop';
import Footer from '../components/sections/footer/footer';
import Grid from '../components/grid';
import Quickbar from '../components/quickbar';
import { getProjects } from '@/lib/getProjects';

// ISR: must match `PROJECTS_REVALIDATE_SECONDS` in `@/lib/getProjects`
export const revalidate = 300;

export default async function Page() {

    const allProjects = await getProjects();
    const projects = allProjects.slice(0, 8);
    
    return (
        <>
            <div className='pt-(--nav-height)'>
                <Quickbar />

                <section id='work' className='section data-hero'>
                    <Grid>
                        <Work projects={projects}/>
                    </Grid>
                </section>

                <section id='archive' className='section'>
                    <Grid>
                        <Archive />
                    </Grid>
                </section>

                <section id='contact' className='section'>
                    <Footer/>
                </section>
            </div>
        </>
    );
}