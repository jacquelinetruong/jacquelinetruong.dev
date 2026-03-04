// extras page

import Extras from '../components/sections/extras/extras-desktop';
import Footer from '../components/sections/footer/footer';
import Grid from '../components/grid';
import Quickbar from '../components/quickbar';

export default async function Page() {

    return (
        <>
            <div className='pt-(--nav-height)'>
                <Quickbar />

                <section id='about' className='section data-hero'>
                    <Grid>
                        <Extras />
                    </Grid>
                </section>

                <section id='contact' className='section'>
                    <Footer/>
                </section>
            </div>
        </>
    );
}