import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

      // STATS COUNTER
      gsap.utils.toArray(".story-stat-num").forEach((el) => {
        const target = parseInt(el.dataset.value, 10);
        if (!isNaN(target)) {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
            onUpdate: () => {
              const suffix = el.dataset.suffix || "";
              el.textContent = Math.round(obj.val) + suffix;
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"                                           /* ✅ THE FIX — nav queries #story */
      ref={sectionRef}
      className="relative border-t border-white/8 bg-black overflow-hidden scroll-mt-20"  /* ✅ scroll-mt keeps title below fixed nav */
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
        {/* CHAPTER LABEL */}
        <div ref={chapterRef} className="flex items-center gap-3 mb-8 md:mb-12">
          <div className="h-px bg-accent" style={{ width: "clamp(24px, 4vw, 48px)" }} />
          <div className="label text-accent" style={{ fontSize: "clamp(9px, 1.3vw, 11px)" }}>
            The Story
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
                src="/placeholder.png"
                alt="Drift"
                onLoad={() => setImgLoaded(true)}
                className={`w-full h-full object-cover img-cin will-change-transform transition-opacity duration-700 ${
                  imgLoaded ? "opacity-100" : "opacity-0"
                }`}
                draggable={false}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

              <div className="absolute top-0 left-0 w-4 h-4 sm:w-6 sm:h-6 border-t-2 border-l-2 border-accent/50 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-4 h-4 sm:w-6 sm:h-6 border-b-2 border-r-2 border-accent/50 pointer-events-none" />
            </div>
          </div>

          {/* TEXT */}
          <div ref={textRef} className="col-span-12 md:col-span-5 order-1 md:order-2">
            <h2
              className="story-cascade font-display uppercase leading-[0.9] mb-5 sm:mb-6"
              style={{ fontSize: "clamp(36px, 7vw, 90px)", letterSpacing: "-0.02em" }}
            >
              Born on
              <br />
              the <span className="text-accent italic">edge</span>
            </h2>

            <p
              className="story-cascade text-white/70 leading-relaxed mb-4"
              style={{ fontSize: "clamp(13px, 1.6vw, 16px)", maxWidth: "42ch" }}
            >
              Rooted in the underground drift scene and amplified by India's
              rising music culture.
            </p>

            <p
              className="story-cascade text-white/45 leading-relaxed"
              style={{ fontSize: "clamp(11px, 1.4vw, 13px)", maxWidth: "42ch" }}
            >
              From the smoke of burning rubber to the light of a thousand
              flashes — every second is engineered to make you feel alive.
            </p>

            {/* Stats */}
            <div
              className="story-cascade grid grid-cols-3 mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-white/15"
              style={{ gap: "clamp(12px, 2vw, 24px)" }}
            >
              {[
                { num: "48", suffix: "h", label: "Duration" },
                { num: "12", suffix: "+", label: "Acts" },
                { num: "50", suffix: "k", label: "Crowd" },
              ].map((stat) => (
                <div key={stat.label} className="group">
                  <div
                    className="font-display leading-none tabular-nums group-hover:text-accent transition-colors duration-500"
                    style={{ fontSize: "clamp(24px, 4vw, 48px)" }}
                  >
                    <span
                      className="story-stat-num"
                      data-value={stat.num}
                      data-suffix={stat.suffix}
                    >
                      0{stat.suffix}
                    </span>
                  </div>
                  <div
                    className="label mt-1.5 sm:mt-2 text-white/40 group-hover:text-white/70 transition-colors duration-500"
                    style={{ fontSize: "clamp(9px, 1.1vw, 11px)" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="story-cascade mt-8 sm:mt-10">
              <a
                href="#experience"
                data-hover
                className="inline-flex items-center gap-2 label border-b border-white/30 pb-1 hover:border-accent hover:text-accent transition-colors group"
                style={{ fontSize: "clamp(10px, 1.3vw, 12px)" }}
              >
                <span>Explore the experience</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM META STRIP */}
        <div className="mt-16 sm:mt-20 pt-6 sm:pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            ["Origin", "Underground Drift"],
            ["Genre", "Motorsport × Music"],
            ["Vibe", "Raw · Loud · Live"],
            ["Year", "Est. 2026"],
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