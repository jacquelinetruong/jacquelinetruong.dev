// extras page

import Extras from '../components/sections/extras/extras-desktop';
import Art from '../components/sections/other art/art-desktop';
import Artpiece from '../components/sections/other art/artpiece-section-desktop';
import Footer from '../components/sections/footer/footer';
import Grid from '../components/grid';
import Quickbar from '../components/quickbar';

export default async function Page() {

    return (
        <>
            <div className='pt-(--nav-height)'>
                <Quickbar />

                <section id='extras' className='section data-hero'>
                    <Grid>
                        <Extras />
                    </Grid>
                </section>

                <section id='art' className='section'>
                    <Grid>
                        <Art />
                    </Grid>
                </section>
                
                {/* art sections */}
                    <section id='artpiece-1' className='section'>
                        <Grid>
                            <Artpiece 
                                gridPosition='col-start-3 col-span-3 row-start-1 row-span-2'
                                image='/falls.webp'
                                title='Misted Metals'
                                description="Sent to collect ground data from the abandoned Earth, my original character, Cobalt, experiences what no one from her planet ever will—water. Part of my 'Discovery' work series."
                                medium='Digital. Adobe Photoshop.'
                            />
                        </Grid>
                    </section>

                    <section id='artpiece-2' className='section'>
                        <Grid>
                            <Artpiece 
                                gridPosition='col-start-3 col-span-3 row-start-1 row-span-3'
                                image='/pond.webp'
                                title='Serenity'
                                description="My original character, Tenebris, stumbles upon a hidden gem in the forest, finding himself a new emotion: serenity. Feels like he could stay here forever. Part of my 'Discovery' work series."
                                medium='Digital. Adobe Photoshop.'
                            />
                        </Grid>
                    </section>

                    <section id='artpiece-3' className='section'>
                        <Grid>
                            <Artpiece 
                                gridPosition='col-start-3 col-span-2 row-start-1 row-span-3'
                                image='/statue.webp'
                                title='A New Mission'
                                description="DX-52, my original character, starts to understand the key to saving his planet—leaving it untouched. Part of my 'Discovery' work series."
                                medium='Digital. Adobe Photoshop.'
                                className='object-bottom'
                            />
                        </Grid>
                    </section>

                    <section id='artpiece-4' className='section'>
                        <Grid>
                            <Artpiece 
                                gridPosition='col-start-3 col-span-3 row-start-1 row-span-3'
                                image='/acrylic.webp'
                                title='Leap Forward'
                                description='Love on opposing sides of the riverbed. However, one fails to take the leap past its fears.'
                                medium='Acrylic on canvas. 5 in x 7 in.'
                            />
                        </Grid>
                    </section>

                    <section id='artpiece-5' className='section'>
                        <Grid>
                            <Artpiece 
                                gridPosition='col-start-3 col-span-3 row-start-1 row-span-2'
                                image='/torii.webp'
                                title='Gate of the Mind'
                                description="Deep in your journey, you're met with a torii. You feel drawn to pass through, like it's the right thing to do. Your mind says otherwise."
                                medium='Digital. Adobe Photoshop.'
                                className='object-left'
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