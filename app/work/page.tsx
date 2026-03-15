// work home page

import Work from '../components/sections/work home/work-desktop';
import Archive from '../components/sections/archive/archive-desktop';
import Footer from '../components/sections/footer/footer';
import Grid from '../components/grid';
import Quickbar from '../components/quickbar';
import { getProjects } from '@/lib/getProjects';

export default async function Page() {

    // get case study projects
    const projects = await getProjects();
    
    return (
        <>
            <div className='pt-(--nav-height)'>
                <Quickbar />

                <section id='work' className='section data-hero'>
                    <Grid>
                        <Work projects={projects}/>
                    </Grid>
                </section>

                <section id='archive' className='section data-hero'>
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