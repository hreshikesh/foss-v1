import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    n: "01",
    title: "Drift Shows",
    tag: "Motorsport",
    desc: "Professional drivers pushing rubber and physics to their absolute limits. Tire smoke, controlled chaos, and precision at 100mph.",
    img: "/placeholder.png",
    stat: ["800°C", "Tire Temp"],
  },
  {
    n: "02",
    title: "FMX Stunts",
    tag: "Freestyle",
    desc: "Backflips, no-handers, and pure aerial chaos above the ramp. 40 feet in the air with nothing but adrenaline.",
    img: "/placeholder.png",
    stat: ["40ft", "Air Time"],
  },
  {
    n: "03",
    title: "Live Music",
    tag: "Sound",
    desc: "Headline artists and college battles that echo till sunrise. Bass you can feel in your chest.",
    img: "/placeholder.png",
    stat: ["120dB", "Peak Sound"],
  },
  {
    n: "04",
    title: "Superbikes",
    tag: "Display",
    desc: "Two-wheeled machines built for velocity — up close and personal. Machines that redefine what motion means.",
    img: "/placeholder.png",
    stat: ["300km/h", "Top Speed"],
  },
];

export default function Experience() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const imagesRef = useRef([]);
  const textsRef = useRef([]);
  const progressRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const total = items.length;

      // ===== INITIAL STATES =====
      imagesRef.current.forEach((img, i) => {
        gsap.set(img, {
          clipPath: i === 0 ? "inset(0% 0 0% 0)" : "inset(100% 0 0% 0)",
        });
      });

      textsRef.current.forEach((txt, i) => {
        gsap.set(txt, {
          autoAlpha: i === 0 ? 1 : 0,
          y: i === 0 ? 0 : 40,
        });
      });

      // ===== MAIN TIMELINE =====
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => "+=" + window.innerHeight * (total - 1) * 1.5,
          pin: pinRef.current,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(total - 1, Math.round(self.progress * (total - 1)));
            setActiveIndex(idx);
          },
        },
      });

      // Build sequence for each transition
      for (let i = 1; i < total; i++) {
        tl.addLabel(`step-${i}`, "+=0.1");

        tl.to(
          textsRef.current[i - 1],
          { autoAlpha: 0, y: -40, duration: 0.5, ease: "power2.in" },
          `step-${i}`
        );

        tl.to(
          imagesRef.current[i],
          { clipPath: "inset(0% 0 0% 0)", duration: 1.2, ease: "power3.inOut" },
          `step-${i}`
        );

        tl.to(
          textsRef.current[i],
          { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
          `step-${i}+=0.5`
        );
      }

      // Progress bar
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => "+=" + window.innerHeight * (total - 1) * 1.5,
          scrub: true,
        },
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative bg-black">
      {/* Pinned container */}
      <div
        ref={pinRef}
        className="relative h-[100svh] min-h-[560px] w-full overflow-hidden"
      >
        {/* ============ IMAGES STACK ============ */}
        <div className="absolute inset-0">
          {items.map((item, i) => (
            <div
              key={item.n}
              ref={(el) => (imagesRef.current[i] = el)}
              className="absolute inset-0 w-full h-full"
              style={{ zIndex: i + 1, willChange: "clip-path" }}
              data-hover
              data-cursor-text="EXPLORE"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover img-cin"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-black/70" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/50" />
            </div>
          ))}
        </div>

        {/* ============ TOP HEADER ============ */}
        <div
          className="absolute top-0 left-0 right-0 z-40 pointer-events-none"
          style={{
            paddingTop: "clamp(80px, 12vh, 120px)",
            paddingLeft: "clamp(16px, 4vw, 40px)",
            paddingRight: "clamp(16px, 4vw, 40px)",
          }}
        >
          <div className="max-w-[1400px] mx-auto flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <div
                className="label text-accent mb-2"
                style={{ fontSize: "clamp(9px, 1.3vw, 11px)" }}
              >
                — The Experience
              </div>
              <h2
                className="font-display uppercase leading-[0.9]"
                style={{
                  fontSize: "clamp(24px, 4.5vw, 56px)",
                  letterSpacing: "-0.02em",
                }}
              >
                Four Acts<span className="text-accent">.</span>
                <br />
                One Weekend<span className="text-accent">.</span>
              </h2>
            </div>

            {/* Counter */}
            <div className="text-right flex-shrink-0">
              <div
                className="text-accent font-display leading-none"
                style={{ fontSize: "clamp(20px, 3.5vw, 42px)" }}
              >
                {String(activeIndex + 1).padStart(2, "0")}
              </div>
              <div
                className="label text-white/40 mt-1"
                style={{ fontSize: "clamp(9px, 1.1vw, 11px)" }}
              >
                / {String(items.length).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>

        {/* ============ BOTTOM TEXT STACK ============ */}
        <div
          className="absolute bottom-0 left-0 right-0 z-40"
          style={{
            paddingBottom: "clamp(48px, 10vh, 100px)",
            paddingLeft: "clamp(16px, 4vw, 40px)",
            paddingRight: "clamp(16px, 4vw, 40px)",
          }}
        >
          <div
            className="max-w-[1400px] mx-auto relative"
            style={{
              minHeight: "clamp(220px, 32vh, 320px)",
            }}
          >
            {items.map((item, i) => (
              <div
                key={item.n}
                ref={(el) => (textsRef.current[i] = el)}
                className="absolute inset-0 grid grid-cols-12 items-end"
                style={{
                  willChange: "transform, opacity",
                  gap: "clamp(16px, 3vw, 40px)",
                }}
              >
                {/* Left — Title */}
                <div className="col-span-12 md:col-span-7">
                  <div
                    className="label text-accent mb-2 sm:mb-3"
                    style={{ fontSize: "clamp(9px, 1.3vw, 11px)" }}
                  >
                    {item.n} / {item.tag}
                  </div>
                  <h3
                    className="font-display uppercase leading-[0.85]"
                    style={{
                      fontSize: "clamp(42px, 11vw, 140px)",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {item.title}
                  </h3>
                </div>

                {/* Right — Description + Stat */}
                <div className="col-span-12 md:col-span-4 md:col-start-9">
                  <p
                    className="text-white/70 leading-relaxed mb-4 sm:mb-6"
                    style={{
                      fontSize: "clamp(12px, 1.5vw, 14px)",
                      maxWidth: "42ch",
                    }}
                  >
                    {item.desc}
                  </p>
                  <div
                    className="flex items-baseline border-t border-white/20 pt-3 sm:pt-4"
                    style={{ gap: "clamp(12px, 2vw, 24px)" }}
                  >
                    <div
                      className="font-display text-accent leading-none"
                      style={{ fontSize: "clamp(22px, 3.5vw, 42px)" }}
                    >
                      {item.stat[0]}
                    </div>
                    <div
                      className="label text-white/60"
                      style={{ fontSize: "clamp(9px, 1.1vw, 11px)" }}
                    >
                      {item.stat[1]}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============ PROGRESS BAR ============ */}
        <div className="absolute bottom-0 left-0 right-0 z-50 h-[2px] sm:h-[3px] bg-white/10">
          <div
            ref={progressRef}
            className="h-full bg-accent origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {/* ============ SIDE DOTS (Desktop only) ============ */}
        <div
          className="hidden md:flex absolute top-1/2 -translate-y-1/2 z-40 flex-col"
          style={{
            right: "clamp(20px, 2.5vw, 40px)",
            gap: "clamp(12px, 1.5vw, 20px)",
          }}
        >
          {items.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-500 ${
                activeIndex === i ? "bg-accent" : "bg-white/30"
              }`}
              style={{
                width: activeIndex === i ? "10px" : "6px",
                height: activeIndex === i ? "10px" : "6px",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}