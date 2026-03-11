// about page

import About from '../components/sections/about/about';
import ExperienceSection from '../components/sections/experience/experience';
import Footer from '../components/sections/footer/footer';
import Grid from '../components/grid';
import { getExperience } from '@/lib/getExperience';
import Quickbar from '../components/quickbar';

export default async function Page() {
    
    // get experience data
    const experience = await getExperience();
    const currentXP = experience.filter(e => e.category === 'work' && e.current === true);


    return (
        <>
            <div className='pt-(--nav-height)'>
                <Quickbar />
                
                <section id='about' className='section data-hero'>
                    <Grid>
                        <About 
                            experience={currentXP}
                        />
                    </Grid>
                </section>

                <section id='experience' className='section'>
                    <Grid>
                        <ExperienceSection
                            experience={experience}
                        />
                    </Grid>
                </section>

                <section id='contact' className='section'>
                    <Footer/>
                </section>
            </div>
        </>
    );
}