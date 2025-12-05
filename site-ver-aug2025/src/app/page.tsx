import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Portfolio from "./components/portfolio";
import Experience from "./components/experience";
import End from "./components/end";
import Footer from "./components/footer";

export default function Home() {
    return (
        <div className="relative h-screen overflow-hidden">
            <Navbar />

            <main className="h-full h-screen overflow-y-scroll scroll-smooth snap-y snap-mandatory snap-always">
                <section id="about" className="snap-start h-screen relative">
                    <Hero />
                </section>

                <section id="portfolio" className="h-screen snap-start relative">
                    <Portfolio />
                </section>

                <section id="experience" className="h-screen snap-start relative">
                    <Experience />
                </section>

                <section id="end" className="h-screen snap-start relative">
                    <End />
                </section>

                <section id="footer" className="h-auto snap-none relative">
                    <Footer />
                </section>
            </main>

        </div>
  );
}