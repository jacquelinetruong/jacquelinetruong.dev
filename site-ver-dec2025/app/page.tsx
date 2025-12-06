import Navbar from './components/navbar';
import Hero from './components/hero';
import About from './components/about';
import Experience from './components/experience';
import Footer from './components/footer';

import Grid from './components/grid';

export default function Home() {
    return (
      <>
        <Navbar />
        <Grid>
          <Hero className='col-span-5 row-start-1'/>
          <About className='col-span-5 row-start-5'/>
          <Experience className='col-span-5 row-start-8'/>
          <Footer className='col-span-5 row-start-11'/>
        </Grid>
      </>
  );
}