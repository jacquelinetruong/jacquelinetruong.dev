import Navbar from './components/navbar';
import Hero from './components/hero';
import About from './components/about';

import Grid from './components/grid';

export default function Home() {
    return (
        <Grid>
          <Navbar />
          <About />
        </Grid>
  );
}