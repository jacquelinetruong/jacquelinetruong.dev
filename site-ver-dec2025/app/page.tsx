'use client';

import { getProjects } from '../lib/getProjects'

import Navbar from './components/navbar';
import Hero from './components/hero';
import About from './components/about';
import Portfolio from './components/portfolio';
import Experience from './components/experience';
import Footer from './components/footer';

import Grid from './components/grid';


export default async function Home() {
  const projects = await getProjects();

  const heroProjects = projects.filter(p => p.section === "hero");

    return (
      <>
        <Navbar />
        <Grid>
          <Hero projects={heroProjects} className='col-span-5 row-start-1'/>
          <About className='col-span-5 row-start-4'/>
          <Portfolio className='col-span-5 row-start-7'/>
          <Experience className='col-span-5 row-start-9'/>
          <Footer className='col-span-5 row-start-12'/>
        </Grid>
      </>
  );
}