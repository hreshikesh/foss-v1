import { useEffect, useRef, useId } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Custom Motorsport Vector Letter Renderer
function FossLetter({ letter }) {
  const rawId = useId();
  // Sanitize ID for SVG mask reference
  const maskId = `slash-mask-${rawId.replace(/:/g, "")}`;

  return (
    <svg
      viewBox="0 0 125 100"
      className="w-full h-auto overflow-visible drop-shadow-[0_10px_20px_rgba(225,6,0,0.25)]"
      fill="currentColor"
    >
      <defs>
        <mask id={maskId}>
          <rect x="-30" y="-30" width="185" height="160" fill="white" />
          {/* Top-Right Speed Cut / Slash */}
          <polygon points="100,-10 106,-10 122,30 116,30" fill="black" />
          {/* Bottom-Left Speed Cut / Slash */}
          <polygon points="-6,68 0,68 16,108 10,108" fill="black" />
        </mask>
      </defs>

      <g transform="skewX(-18) translate(18, 0)" mask={`url(#${maskId})`}>
        {letter === "F" && (
          <path d="M 24,0 L 108,0 C 116,0 120,4 120,12 L 120,16 C 120,24 116,26 108,26 L 38,26 L 38,42 L 86,42 C 94,42 98,46 98,52 L 98,56 C 98,62 94,64 86,64 L 38,64 L 38,88 C 38,96 34,100 24,100 L 14,100 C 4,100 0,96 0,88 L 0,12 C 0,4 4,0 14,0 Z" />
        )}

        {letter === "O" && (
          <path
            fillRule="evenodd"
            d="M 28,0 L 92,0 C 112,0 120,8 120,28 L 120,72 C 120,92 112,100 92,100 L 28,100 C 8,100 0,92 0,72 L 0,28 C 0,8 8,0 28,0 Z M 36,26 L 84,26 C 90,26 94,28 94,34 L 94,66 C 94,72 90,74 84,74 L 36,74 C 30,74 26,72 26,66 L 26,34 C 26,28 30,26 36,26 Z"
          />
        )}

        {letter === "S" && (
          <path d="M 24,0 L 96,0 C 112,0 120,6 120,18 L 120,24 C 120,34 112,38 96,38 L 52,38 C 44,38 40,40 40,44 L 40,46 C 40,50 44,52 52,52 L 96,52 C 112,52 120,60 120,76 L 120,82 C 120,94 112,100 96,100 L 24,100 C 8,100 0,94 0,82 L 0,76 C 0,66 8,62 24,62 L 68,62 C 76,62 80,60 80,56 L 80,54 C 80,50 76,48 68,48 L 24,48 C 8,48 0,40 0,24 L 0,18 C 0,6 8,0 24,0 Z" />
        )}
      </g>
    </svg>
  );
}

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

      {/* Main vector logo with overflow wrapper */}
      <div className="flex overflow-hidden py-4 px-2">
        <div className="flex items-center justify-center gap-1.5 sm:gap-3 md:gap-4">
          {["F", "O", "S", "S"].map((letter, i) => (
            <span
              key={i}
              className="preloader-letter inline-block w-[18vw] max-w-[120px] sm:max-w-[150px] md:w-[13vw] md:max-w-[190px]"
              style={{
                color: "#e10600", // Racing Red matching image
              }}
            >
              <FossLetter letter={letter} />
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
            className="absolute inset-0 bg-[#e10600] origin-left"
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