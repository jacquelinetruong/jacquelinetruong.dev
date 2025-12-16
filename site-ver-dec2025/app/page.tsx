import { getProjects } from '../lib/getProjects'
import { getExperience } from '../lib/getExperience';

import Navbar from './components/navbar';
import Hero from './components/hero';
import About from './components/about';
import Portfolio from './components/portfolio';
import ExperienceSection from './components/experience';
import Footer from './components/footer';

import Grid from './components/grid';


export default async function Home() {
  
  // get projects for each section
  const projects = await getProjects();
  const heroProjects = projects.filter(p => p.section === "hero");
  const aboutProjects = projects.filter(p => p.section === "about");
  const portfolioProjects = projects.filter(p => p.section === "portfolio");
  const experienceProjects = projects.filter(p => p.section === "experience");

  // get experience data
  const experience = await getExperience();
  const currentXP = experience.filter(e => e.category === 'work' && e.current === true);
  
    return (
      <>
        <Navbar />

        <section id='home'>
          <Grid>
            <Hero 
              projects={heroProjects} 
              className='col-span-5 row-start-1 row-span-4'/>
          </Grid>
        </section>

        <section id='about'>
          <Grid>
            <About 
              projects={aboutProjects} 
              experience={currentXP} 
              className='col-span-5 row-start-1 row-span-4'/>
          </Grid>
        </section>

        <section id='portfolio'>
          <Grid>
            <Portfolio 
              projects={portfolioProjects} 
              className='col-span-5 row-start-1 row-span-3'/>
          </Grid>
        </section>

        <section id='experience'>
          <Grid>
            <ExperienceSection 
              projects={experienceProjects} 
              experience={experience} 
              className='col-span-5 row-start- row-span-4'/>
          </Grid>
        </section>
        
        <Grid>
          <Footer className='col-span-5 row-start-1'/>
        </Grid>
      </>
  );
}