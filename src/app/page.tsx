import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Footer from "./components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="snap-y snap-mandatory h-screen overflow-y-scroll hide-scrollbar">
        <Hero />
        <Footer />
      </main>
    </>
    
  );
}