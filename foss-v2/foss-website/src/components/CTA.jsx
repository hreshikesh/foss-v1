import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const ref = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { scale: 1.3 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="tickets" ref={ref} className="relative min-h-[80vh] flex items-center overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={imgRef}
          src="/placeholder"
          alt=""
          className="w-full h-full object-cover img-cinematic will-change-transform"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 px-6 md:px-12 max-w-[1500px] mx-auto w-full py-24">
   
        <h2 className="font-display text-[10vw] md:text-[7vw] leading-[0.88] uppercase mb-10">
          Be there.<br />
          <span className="text-accent">Or hear about it.</span>
        </h2>
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <a href="#" className="bg-accent hover:bg-white hover:text-black transition-colors px-8 py-4 font-display text-lg uppercase tracking-wider">
            Book Your Pass →
          </a>
          <p className="text-white/60 text-sm max-w-xs">
            Early access opens November. Limited to 50,000 attendees.
          </p>
        </div>
      </div>
    </section>
  );
}