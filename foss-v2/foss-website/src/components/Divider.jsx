import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Divider({ text = "SOUND · SPEED · SOUL" }) {
  const ref = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(textRef.current, {
        xPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 md:py-40 overflow-hidden border-y border-white/8">
      <div ref={textRef} className="whitespace-nowrap will-change-transform">
        <span className="font-display text-[15vw] uppercase leading-none">
          {text} · {text} · {text}
        </span>
      </div>
    </section>
  );
}