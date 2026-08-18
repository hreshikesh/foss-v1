import LenisSetup from "./components/LenisSetup";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import Story from "./components/Story";
import Divider from "./components/Divider";
import Experience from "./components/Experience";
import Gallery from "./components/Gallery";
import Program from "./components/Program";
import Tickets from "./components/Tickets";
import Footer from "./components/Footer";
import Reels from "./components/Reels";
import Sponsors from "./components/Sponsors";
import Venue from "./components/Venue";
import Preloader from "./components/Preloader";
import { useState,useLayoutEffect } from "react";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.history.replaceState(null, "", window.location.pathname);
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className="bg-black text-ink">
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}

      {/* Smooth scroll — start after preloader */}
      {loaded && <LenisSetup />}

      <Cursor />
      <Nav />
      <Hero />
      <Ticker />
      <Story />
      <Experience />  {/* ← Direct child */}
      <Gallery />
      <Program />
      <Tickets />
      <Reels />
      <Sponsors />
      <Venue />
      <Footer />
    </main>
  );
}
