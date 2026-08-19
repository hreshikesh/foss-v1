import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import aboutImage from "../assets/about.png";
gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  const sectionRef = useRef(null);
  const imageWrapRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const chapterRef = useRef(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      // IMAGE CLIP REVEAL
      if (!prefersReducedMotion) {
        gsap.fromTo(
          imageWrapRef.current,
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: imageWrapRef.current,
              start: "top 85%",
              end: "top 40%",
              scrub: 1,
            },
          }
        );

        // Image parallax
        gsap.fromTo(
          imageRef.current,
          { scale: 1.3, yPercent: -5 },
          {
            scale: 1,
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }

      // CHAPTER LABEL SLIDE IN
      gsap.from(chapterRef.current, {
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: chapterRef.current,
          start: "top 90%",
        },
      });

      // TEXT CASCADE
      gsap.from(".story-cascade", {
        opacity: 0,
        y: 30,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative border-t border-white/8 bg-black overflow-hidden scroll-mt-20"
      style={{
        paddingTop: "clamp(60px, 12vw, 160px)",
        paddingBottom: "clamp(60px, 12vw, 160px)",
        paddingLeft: "clamp(16px, 4vw, 40px)",
        paddingRight: "clamp(16px, 4vw, 40px)",
      }}
    >
      {/* Subtle background accent */}
      <div
        className="absolute top-0 right-0 pointer-events-none opacity-[0.03]"
        style={{
          width: "60vw",
          height: "60vw",
          background:
            "radial-gradient(circle, rgba(225,6,0,1) 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto">
        {/* CHAPTER LABEL & HUD HEADER BAR */}
        <div
          ref={chapterRef}
          className="flex flex-wrap items-center justify-between gap-4 mb-8 md:mb-12 pb-6 border-b border-white/10"
        >
          <div className="flex items-center gap-3">
            <div className="h-px bg-accent" style={{ width: "clamp(24px, 4vw, 48px)" }} />
            <div className="label text-accent" style={{ fontSize: "clamp(9px, 1.3vw, 11px)" }}>
              The Story
            </div>
          </div>

          {/* Telemetry Date & Location Badge */}
          <div className="flex items-center gap-3 sm:gap-6 text-xs font-mono bg-white/[0.03] border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-white font-bold tracking-wider">28–29 NOV</span>
            </div>

            <span className="text-white/20">|</span>

            <div className="flex items-center gap-2 group cursor-default">
              <span className="text-white/50 group-hover:text-accent transition-colors">📍</span>
              <span className="text-white/80 font-medium tracking-wide">BENGALURU</span>
              
            </div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-12 items-center" style={{ gap: "clamp(24px, 4vw, 60px)" }}>
          {/* IMAGE */}
          <div className="col-span-12 md:col-span-7 order-2 md:order-1">
            <div
              ref={imageWrapRef}
              className="relative overflow-hidden bg-white/5"
              style={{ height: "clamp(280px, 60vh, 700px)" }}
              data-hover
              data-cursor-text="STORY"
            >
              {!imgLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-white/10 border-t-white/40 rounded-full animate-spin" />
                </div>
              )}

              <img
                ref={imageRef}
                src={aboutImage}
                alt="Festival of Sound and Speed"
                onLoad={() => setImgLoaded(true)}
                className={`w-full h-full object-cover img-cin will-change-transform transition-opacity duration-700 ${imgLoaded ? "opacity-100" : "opacity-0"
                  }`}
                draggable={false}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 sm:w-6 sm:h-6 border-t-2 border-l-2 border-accent/50 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-4 h-4 sm:w-6 sm:h-6 border-b-2 border-r-2 border-accent/50 pointer-events-none" />

              {/* Sound & Speed Telemetry Pulse Waveform */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none bg-black/40 backdrop-blur-sm p-3 rounded border border-white/10">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest font-bold">
                  <span className="text-white">Sound</span>
                  <span className="text-accent">&</span>
                  <span className="text-accent">Speed</span>
                </div>

                <svg className="h-5 w-24 sm:w-32" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0 12H30L35 4L42 20L48 8L54 16L60 12H120"
                    stroke="currentColor"
                    className="text-accent"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* TEXT */}
          <div ref={textRef} className="col-span-12 md:col-span-5 order-1 md:order-2 flex flex-col justify-center">
            <h2
              className="story-cascade font-display uppercase leading-[0.9] mb-6"
              style={{ fontSize: "clamp(32px, 6.5vw, 80px)", letterSpacing: "-0.01em" }}
            >
              Where
              <br />
              <span className="text-white">Speed</span> Meets <span className="text-accent italic font-black">Sound</span>
            </h2>

            <p
              className="story-cascade text-white/80 leading-relaxed mb-4 text-base sm:text-lg font-medium"
              style={{ maxWidth: "42ch" }}
            >
              India’s high-energy experiential event that combines the thrill of
              motorsport with the electrifying atmosphere of live music.
            </p>

            <p
              className="story-cascade text-white/50 leading-relaxed mb-8 text-sm sm:text-base"
              style={{ maxWidth: "42ch" }}
            >
              A first-of-its-kind 2-day festival built for adrenaline seekers, auto enthusiasts, youth audiences, and entertainment lovers.
            </p>


          </div>
        </div>

        {/* BOTTOM META STRIP */}
        <div className="mt-16 sm:mt-20 pt-6 sm:pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            ["Dates", "28–29 November 2026"],
            ["Location", "Bengaluru, India"],
            ["Format", "Motorsport × Live Music"],
          ].map(([label, val]) => (
            <div key={label}>
              <div className="label text-white/30 mb-1" style={{ fontSize: "clamp(9px, 1.1vw, 10px)" }}>
                {label}
              </div>
              <div className="text-white/70" style={{ fontSize: "clamp(11px, 1.4vw, 13px)" }}>
                {val}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}