// LenisSetup.jsx
import { useLayoutEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LenisSetup() {
  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    // ✅ Make it accessible everywhere (Nav uses window.lenis.scrollTo)
    window.lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const onResize = () => { lenis.resize(); ScrollTrigger.refresh(); };
    window.addEventListener("resize", onResize);

    return () => {
      gsap.ticker.remove(raf);
      window.removeEventListener("resize", onResize);
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  return null;
}