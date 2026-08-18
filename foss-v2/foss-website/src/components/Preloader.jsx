import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const counterRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    // Lock body scroll during preloader
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Slide preloader up
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 0.9,
            ease: "power4.inOut",
            onComplete: () => {
              document.body.style.overflow = "";
              onComplete?.();
              // Refresh scroll triggers
              setTimeout(() => ScrollTrigger.refresh(), 100);
            },
          });
        },
      });

      // 1. Letters slide in
      tl.fromTo(
        ".preloader-letter",
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
        }
      );

      // 2. Subtitle fade in
      tl.fromTo(
        ".preloader-sub",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      );

      // 3. Counter animation
      const counterObj = { val: 0 };
      tl.to(
        counterObj,
        {
          val: 100,
          duration: 2,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = Math.round(counterObj.val);
            }
          },
        },
        "-=0.2"
      );

      // 4. Progress bar (in sync with counter)
      tl.to(
        barRef.current,
        { scaleX: 1, duration: 2, ease: "power2.inOut" },
        "<"
      );

      // 5. Hold briefly
      tl.to({}, { duration: 0.4 });

      // 6. Letters slide out
      tl.to(".preloader-letter", {
        yPercent: -120,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power3.in",
      });

      // 7. Subtitle + progress fade
      tl.to(
        [".preloader-sub", ".preloader-progress"],
        {
          opacity: 0,
          y: -20,
          duration: 0.4,
          ease: "power2.in",
        },
        "-=0.3"
      );
    }, containerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Top labels */}
      <div className="absolute top-6 md:top-8 left-6 md:left-8 label text-white/30">
        FOSS · 2026
      </div>
      <div className="absolute top-6 md:top-8 right-6 md:right-8 label text-white/30">
        Bengaluru, IN
      </div>

      {/* Main text with overflow wrapper */}
      <div className="flex overflow-hidden">
        <div className="flex">
          {["F", "O", "S", "S"].map((letter, i) => (
            <span
              key={i}
              className="preloader-letter inline-block font-display text-[20vw] md:text-[14vw] leading-none"
              style={{
                color: i >= 2  ? "#e10600" : "#fff",
        
              }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>

      {/* Subtitle */}
      <div className="preloader-sub mt-4 md:mt-6 label text-white/40 tracking-[0.4em] text-center px-4">
        FESTIVAL OF SOUND & SPEED
      </div>

      {/* Progress bar */}
      <div className="preloader-progress absolute bottom-8 md:bottom-10 left-6 md:left-8 right-6 md:right-8 flex items-center gap-4">
        <div className="flex-1 h-px bg-white/10 relative overflow-hidden">
          <div
            ref={barRef}
            className="absolute inset-0 bg-accent origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
        <div className="font-mono text-sm text-white/60 tabular-nums w-10 text-right flex items-baseline gap-0.5">
          <span ref={counterRef}>0</span>
          <span className="text-[10px] text-white/30">%</span>
        </div>
      </div>
    </div>
  );
}