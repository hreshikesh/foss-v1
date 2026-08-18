import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    n: "01",
    title: "Drift Shows",
    tag: "Motorsport",
    desc: "Professional drivers pushing rubber and physics to their limits.",
    img: "/placeholder.png",
  },
  {
    n: "02",
    title: "FMX Stunts",
    tag: "Freestyle",
    desc: "Backflips, no-handers, and pure aerial chaos above the ramp.",
    img: "/placeholder.png",
  },
  {
    n: "03",
    title: "Live Concerts",
    tag: "Sound",
    desc: "Headline artists and college battles that echo till sunrise.",
    img: "/placeholder.png",
  },
  {
    n: "04",
    title: "Superbikes",
    tag: "Display",
    desc: "Machines built for velocity — up close and personal.",
    img: "/placeholder.png",
  },
];

export default function Showcase() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(".showcase-img");

      // Pin the whole section for the scroll duration
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${items.length * 100}%`,
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const idx = Math.min(
            items.length - 1,
            Math.floor(self.progress * items.length)
          );
          setActive(idx);
        },
      });

      // Each image reveals via clip-path as you scroll
      panels.forEach((panel, i) => {
        if (i === 0) return; // first is visible by default
        gsap.fromTo(
          panel,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `top+=${(i - 0.5) * window.innerHeight} top`,
              end: `top+=${i * window.innerHeight} top`,
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative h-screen overflow-hidden bg-black">
      {/* Stacked images */}
      <div className="absolute inset-0">
        {items.map((item, i) => (
          <div
            key={item.n}
            className="showcase-img absolute inset-0"
            style={{ zIndex: i }}
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-full object-cover img-cinematic"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}
      </div>

      {/* Fixed overlay content */}
      <div className="relative z-20 h-full flex flex-col justify-between px-6 md:px-12 py-24">
        <div className="label text-accent">— The Experience</div>

        <div className="max-w-2xl">
          <div className="label text-white/50 mb-4">
            {items[active].n} / 0{items.length} · {items[active].tag}
          </div>
          <h3 className="font-display text-5xl md:text-7xl uppercase leading-[0.9] mb-4">
            {items[active].title}
          </h3>
          <p className="text-white/70 text-sm md:text-base max-w-md">
            {items[active].desc}
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex gap-2">
          {items.map((_, i) => (
            <div
              key={i}
              className={`h-[2px] transition-all duration-500 ${
                i === active ? "w-12 bg-accent" : "w-6 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}