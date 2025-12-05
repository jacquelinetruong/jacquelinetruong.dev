import Navbar from './components/navbar';
import Hero from './components/hero';

import Grid from './components/grid';

export default function Home() {
    return (
        <Grid>
          <Navbar />
          <Hero />
        </Grid>
  );
}