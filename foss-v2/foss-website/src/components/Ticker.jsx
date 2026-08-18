import { useEffect, useRef } from "react";

export default function Ticker() {
  const trackRef1 = useRef(null);
  const trackRef2 = useRef(null);

  const items = [
    "DRIFT",
    "FMX",
    "SPEED",
    "SUPERCARS",
    "LIVE MUSIC",
    "WHEELIES",
    "SOUND",
    "STUNTS",
  ];

  const items2 = [
    "5·6 DEC 2026",
    "BENGALURU",
    "48 HOURS",
    "MOTORSPORT × MUSIC",
    "PURE ADRENALINE",
    "NON-STOP",
  ];

  // Duplicate for seamless loop
  const line1 = [...items, ...items, ...items];
  const line2 = [...items2, ...items2, ...items2];

  // Pause on hover
  const handleMouseEnter = (ref) => {
    if (ref.current) ref.current.style.animationPlayState = "paused";
  };
  const handleMouseLeave = (ref) => {
    if (ref.current) ref.current.style.animationPlayState = "running";
  };

  return (
    <section
      className="relative border-y border-white/8 overflow-hidden bg-black"
      style={{
        paddingTop: "clamp(20px, 3vw, 32px)",
        paddingBottom: "clamp(20px, 3vw, 32px)",
      }}
    >
      {/* ============ ROW 1 — LEFT SCROLL ============ */}
      <div
        className="ticker-container relative overflow-hidden"
        onMouseEnter={() => handleMouseEnter(trackRef1)}
        onMouseLeave={() => handleMouseLeave(trackRef1)}
      >
        <div
          ref={trackRef1}
          className="ticker-track ticker-left flex whitespace-nowrap will-change-transform"
        >
          {line1.map((it, i) => (
            <div
              key={`row1-${i}`}
              className="flex items-center flex-shrink-0"
              style={{ gap: "clamp(16px, 3vw, 32px)", paddingRight: "clamp(16px, 3vw, 32px)" }}
            >
              <span
                className="font-display uppercase leading-none tracking-tight"
                style={{
                  fontSize: "clamp(28px, 6vw, 56px)",
                }}
              >
                {it}
              </span>
              {/* Dot separator */}
              <span
                className="rounded-full bg-accent flex-shrink-0"
                style={{
                  width: "clamp(6px, 0.8vw, 10px)",
                  height: "clamp(6px, 0.8vw, 10px)",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ============ DIVIDER ============ */}
      <div
        className="mx-auto opacity-20"
        style={{
          height: "clamp(8px, 1.5vw, 16px)",
        }}
      />

      {/* ============ ROW 2 — RIGHT SCROLL (Opposite direction) ============ */}
      <div
        className="ticker-container relative overflow-hidden"
        onMouseEnter={() => handleMouseEnter(trackRef2)}
        onMouseLeave={() => handleMouseLeave(trackRef2)}
      >
        <div
          ref={trackRef2}
          className="ticker-track ticker-right flex whitespace-nowrap will-change-transform"
        >
          {line2.map((it, i) => (
            <div
              key={`row2-${i}`}
              className="flex items-center flex-shrink-0"
              style={{ gap: "clamp(12px, 2.5vw, 28px)", paddingRight: "clamp(12px, 2.5vw, 28px)" }}
            >
              <span
                className="font-mono text-white/50 uppercase tracking-widest"
                style={{
                  fontSize: "clamp(11px, 1.4vw, 14px)",
                }}
              >
                {it}
              </span>
              {/* Slash separator */}
              <span
                className="text-accent/60 font-display flex-shrink-0"
                style={{
                  fontSize: "clamp(14px, 2vw, 20px)",
                }}
              >
                /
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ============ EDGE FADES ============ */}
      <div className="absolute top-0 left-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 right-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />

      {/* ============ STYLES ============ */}
      <style>{`
        @keyframes ticker-scroll-left {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-33.333%, 0, 0); }
        }
        @keyframes ticker-scroll-right {
          from { transform: translate3d(-33.333%, 0, 0); }
          to { transform: translate3d(0, 0, 0); }
        }
        .ticker-left {
          animation: ticker-scroll-left 40s linear infinite;
        }
        .ticker-right {
          animation: ticker-scroll-right 30s linear infinite;
        }

        /* Faster on mobile for better feel */
        @media (max-width: 640px) {
          .ticker-left { animation-duration: 25s; }
          .ticker-right { animation-duration: 20s; }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .ticker-left, .ticker-right {
            animation-duration: 80s;
          }
        }
      `}</style>
    </section>
  );
}