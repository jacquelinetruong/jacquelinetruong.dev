import Navbar from './components/navbar';
import Hero from './components/hero';
import About from './components/about';
import Portfolio from './components/portfolio';
import Experience from './components/experience';
import Footer from './components/footer';

import Grid from './components/grid';


export default function Home() {
    return (
      <>
        <Navbar />
        <Grid>
          <Hero className='col-span-5 row-start-1'/>
          <About className='col-span-5 row-start-4'/>
          <Portfolio className='col-span-5 row-start-7'/>
          <Experience className='col-span-5 row-start-9'/>
          <Footer className='col-span-5 row-start-12'/>
        </Grid>
      </>
  );
}