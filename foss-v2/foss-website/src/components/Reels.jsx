import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reels = [
  {
    id: 1,
    video: "/placeholder.png",
    thumb: "/placeholder.png",
    caption: "Drift day madness 🔥",
    likes: "24.3K",
    tag: "#drift",
    handle: "@foss.in",
  },
  {
    id: 2,
    video: "/placeholder.png",
    thumb: "/placeholder.png",
    caption: "Superbike showcase ⚡",
    likes: "18.7K",
    tag: "#superbikes",
    handle: "@foss.in",
  },
  {
    id: 3,
    video: "/placeholder.png",
    thumb: "/placeholder.png",
    caption: "Crowd went WILD 🎸",
    likes: "42.1K",
    tag: "#livemusic",
    handle: "@foss.in",
  },
  {
    id: 4,
    video: "/placeholder.png",
    thumb: "/placeholder.png",
    caption: "Track heat check 🏁",
    likes: "31.5K",
    tag: "#trackday",
    handle: "@foss.in",
  },
  {
    id: 5,
    video: "/placeholder.png",
    thumb: "/placeholder.png",
    caption: "FMX defies gravity 🚀",
    likes: "56.8K",
    tag: "#fmx",
    handle: "@foss.in",
  },
];

// ── Icons ─────────────────────────────────────────
const MutedIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </svg>
);
const UnmutedIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
);
const HeartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);
const InstaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const PlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);
const ArrowIcon = ({ dir = "left" }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    style={{ transform: dir === "right" ? "rotate(180deg)" : "none" }}>
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

// ── Reel Card ─────────────────────────────────────
function ReelCard({ reel, index, total, isActive, isDragging, onSelect }) {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isActive && !isDragging) {
      video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      video.pause();
      setPlaying(false);
    }
  }, [isActive, isDragging]);

  const handleClick = (e) => {
    // Prevent click after drag
    if (isDragging) return;
    if (!isActive) { onSelect(index); return; }
    const video = videoRef.current;
    if (!video) return;
    if (playing) { video.pause(); setPlaying(false); }
    else { video.play().then(() => setPlaying(true)).catch(() => {}); }
  };

  return (
    <div
      onClick={handleClick}
      className="reel-card relative flex-1 min-w-0 select-none cursor-pointer"
      data-hover
    >
      <div className="relative w-full rounded-2xl md:rounded-[24px] overflow-hidden
        bg-neutral-800 border border-white/10 shadow-2xl group
        transition-transform duration-300 ease-out hover:scale-[1.03] hover:z-10"
        style={{ aspectRatio: "9/16" }}
      >
        {/* Video */}
        <video
          ref={videoRef}
          src={reel.video}
          poster={reel.thumb}
          loop muted={muted} playsInline preload="metadata" draggable={false}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/40 pointer-events-none" />

        {/* Play button — centered */}
        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/25 backdrop-blur-md
              flex items-center justify-center border border-white/40 text-white shadow-xl">
              <div className="translate-x-0.5"><PlayIcon /></div>
            </div>
          </div>
        )}

        {/* Top bar */}
        <div className="absolute top-3 md:top-4 left-3 md:left-4 right-3 md:right-4
          flex justify-between items-start z-10 pointer-events-none">
          <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-white font-semibold">REEL</span>
          </div>
          <div className="text-[10px] font-mono text-white bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full font-semibold">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
        </div>

        {/* Mute */}
        <button type="button" aria-label={muted ? "Unmute" : "Mute"}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => { e.stopPropagation(); setMuted((p) => !p); }}
          className="absolute top-12 md:top-14 right-3 md:right-4 w-8 h-8 md:w-9 md:h-9 rounded-full
            bg-black/50 backdrop-blur-md flex items-center justify-center text-white
            hover:bg-black/70 transition-colors z-20">
          {muted ? <MutedIcon /> : <UnmutedIcon />}
        </button>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 z-10 pointer-events-none">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 md:w-7 md:h-7 rounded-full flex-shrink-0
              bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 p-[2px]">
              <div className="w-full h-full rounded-full bg-black flex items-center
                justify-center text-[8px] md:text-[9px] font-bold text-white">F</div>
            </div>
            <span className="text-xs md:text-sm font-semibold text-white truncate">{reel.handle}</span>
            <span className="text-xs text-accent font-medium">• Follow</span>
          </div>
          <p className="text-sm mb-2.5 leading-snug text-white/95 line-clamp-2">{reel.caption}</p>
          <div className="flex items-center gap-3 md:gap-4">
            <div className="flex items-center gap-1.5 text-white">
              <span className="text-red-500"><HeartIcon /></span>
              <span className="text-xs md:text-sm font-semibold">{reel.likes}</span>
            </div>
            <div className="text-xs text-white/60 font-mono">{reel.tag}</div>
          </div>
        </div>

        {/* Progress */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 pointer-events-none z-30">
          <div className={`h-full bg-accent ${isActive && playing && !isDragging ? "animate-progress" : "w-0"}`} />
        </div>

        {/* Corner accents on hover */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-accent
          opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-accent
          opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>
    </div>
  );
}

// ── Main Section ─────────────────────────────────
export default function Reels() {
  const [activeReel, setActiveReel] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const rowRef = useRef(null);
  const bgTextRef = useRef(null);

  // Drag pan state — moves whole row via transform
  const [panX, setPanX] = useState(0);
  const panXRef = useRef(0);
  const dragState = useRef({
    isDown: false, startX: 0, startPan: 0, lastX: 0, lastTime: 0,
    velocity: 0, hasMoved: false, momentumId: null,
  });

  // ✅ Clamp helper — allows drag but with resistance at edges
  const clampPan = useCallback((val) => {
    const row = rowRef.current;
    if (!row) return val;
    const maxPan = row.scrollWidth - row.clientWidth;
    const overshoot = 60; // how much you can pull past edge
    if (val > overshoot) return overshoot;
    if (val < -(maxPan + overshoot)) return -(maxPan + overshoot);
    return val;
  }, []);

  // Apply pan to row via transform
  const applyPan = useCallback((val) => {
    panXRef.current = val;
    setPanX(val);
  }, []);

  const handleNext = useCallback(() => {
    setActiveReel((p) => Math.min(reels.length - 1, p + 1));
  }, []);
  const handlePrev = useCallback(() => {
    setActiveReel((p) => Math.max(0, p - 1));
  }, []);

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleNext, handlePrev]);

  // Drag handlers — via transform, no scrollbar
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const onDown = (e) => {
      if (e.button !== undefined && e.button !== 0) return;
      const clientX = e.clientX ?? e.touches?.[0]?.clientX;
      if (clientX === undefined) return;
      dragState.current = {
        isDown: true, hasMoved: false,
        startX: clientX, startPan: panXRef.current,
        lastX: clientX, lastTime: Date.now(), velocity: 0,
        momentumId: null,
      };
      if (dragState.current.momentumId) cancelAnimationFrame(dragState.current.momentumId);
      row.style.cursor = "grabbing";
    };

    const onMove = (e) => {
      if (!dragState.current.isDown) return;
      const clientX = e.clientX ?? e.touches?.[0]?.clientX;
      if (clientX === undefined) return;
      const dx = clientX - dragState.current.startX;

      if (!dragState.current.hasMoved && Math.abs(dx) > 5) {
        dragState.current.hasMoved = true;
        setIsDragging(true);
      }

      if (dragState.current.hasMoved) {
        if (e.cancelable) e.preventDefault();
        applyPan(clampPan(dragState.current.startPan + dx));

        const now = Date.now();
        const dt = now - dragState.current.lastTime;
        if (dt > 0) dragState.current.velocity = (clientX - dragState.current.lastX) / dt;
        dragState.current.lastX = clientX;
        dragState.current.lastTime = now;
      }
    };

    const onUp = () => {
      if (!dragState.current.isDown) return;
      dragState.current.isDown = false;
      row.style.cursor = "grab";

      if (dragState.current.hasMoved) {
        setTimeout(() => setIsDragging(false), 50);
        // Momentum
        let v = dragState.current.velocity * 18;
        const momentum = () => {
          if (Math.abs(v) < 0.4) {
            // Snap back if past edge
            const maxPan = row.scrollWidth - row.clientWidth;
            let target = panXRef.current;
            if (target > 0) target = 0;
            else if (target < -maxPan) target = -maxPan;

            if (target !== panXRef.current) {
              gsap.to({ v: panXRef.current }, {
                v: target, duration: 0.5, ease: "power3.out",
                onUpdate: function () { applyPan(this.targets()[0].v); },
              });
            }
            dragState.current.momentumId = null;
            return;
          }
          applyPan(clampPan(panXRef.current + v));
          v *= 0.94;
          dragState.current.momentumId = requestAnimationFrame(momentum);
        };
        momentum();
      }
    };

    row.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    row.style.cursor = "grab";
    row.style.touchAction = "pan-y";

    return () => {
      row.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      if (dragState.current.momentumId) cancelAnimationFrame(dragState.current.momentumId);
    };
  }, [applyPan, clampPan]);

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 60, opacity: 0, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
      });
      gsap.from(".reel-card", {
        y: 80, opacity: 0, scale: 0.92,
        duration: 0.9, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: rowRef.current, start: "top 85%" },
      });
      if (bgTextRef.current) {
        gsap.to(bgTextRef.current, {
          xPercent: -25, ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom", end: "bottom top", scrub: 1,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="reels"
      ref={sectionRef}
      className="relative py-16 sm:py-24 md:py-32 lg:py-40 overflow-hidden bg-black border-t border-white/10 text-white"
    >
      {/* Background text */}
      <div ref={bgTextRef}
        className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap
          pointer-events-none select-none opacity-[0.04] will-change-transform z-0">
        <span className="font-display text-[22vw] uppercase leading-none">
          REELS · MOMENTS · REELS ·
        </span>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10">

        {/* ── HEADER ── */}
        <div ref={headerRef} className="mb-10 sm:mb-14 md:mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-10 mb-8 sm:mb-10 md:mb-12">
            <div>
          
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.9] uppercase">
                Live from<br />
                <span className="italic text-accent">@foss.in</span>
              </h2>
            </div>
            <div className="lg:text-right max-w-md">
              <p className="text-white/50 text-xs sm:text-sm leading-relaxed mb-4">
                Behind-the-scenes chaos, drift smoke, and unfiltered moments. Follow the ride.
              </p>
              <a href="https://instagram.com/foss.in" target="_blank" rel="noreferrer"
                data-hover data-cursor-text="FOLLOW"
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3
                  border border-white/20 hover:border-accent hover:bg-accent
                  hover:text-black transition-all group
                  text-[10px] sm:text-xs font-semibold tracking-wider uppercase">
                <InstaIcon />
                <span>@foss.in</span>
                <span className="text-base group-hover:translate-x-1 transition-transform">↗</span>
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 border-y border-white/10 py-4 sm:py-6">
            {[
              ["24K", "Followers"], ["892", "Posts"], ["1.2M", "Views"],
              ["48K", "Likes"], ["96%", "Engagement"], ["150+", "Reels"],
            ].map(([n, l]) => (
              <div key={l} className="text-center md:text-left">
                <div className="font-display text-xl sm:text-2xl md:text-3xl text-accent">{n}</div>
                <div className="label text-[9px] sm:text-[10px] md:text-xs text-white/50
                  tracking-wider uppercase mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CAROUSEL — full row of cards, drag only ── */}
        <div className="relative">

          {/* Prev arrow */}
          <button type="button" aria-label="Previous reel" onClick={handlePrev}
            disabled={activeReel === 0}
            className="hidden md:flex absolute -left-2 lg:-left-4 top-1/2 -translate-y-1/2 z-30
              w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-black/70 border border-white/20
              backdrop-blur-md items-center justify-center text-white
              hover:bg-accent hover:text-black hover:border-accent transition-all
              disabled:opacity-20 disabled:cursor-not-allowed shadow-xl" data-hover>
            <ArrowIcon dir="left" />
          </button>

          {/* Next arrow */}
          <button type="button" aria-label="Next reel" onClick={handleNext}
            disabled={activeReel === reels.length - 1}
            className="hidden md:flex absolute -right-2 lg:-right-4 top-1/2 -translate-y-1/2 z-30
              w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-black/70 border border-white/20
              backdrop-blur-md items-center justify-center text-white
              hover:bg-accent hover:text-black hover:border-accent transition-all
              disabled:opacity-20 disabled:cursor-not-allowed shadow-xl" data-hover>
            <ArrowIcon dir="right" />
          </button>

          {/* Row viewport — hides overflow */}
          <div className="reels-viewport overflow-hidden">
            {/* Row — pans via transform */}
            <div
              ref={rowRef}
              className="reels-row flex gap-3 sm:gap-4 md:gap-5
                select-none will-change-transform"
              style={{
                transform: `translate3d(${panX}px, 0, 0)`,
                transition: isDragging ? "none" : "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {reels.map((reel, i) => (
                <ReelCard
                  key={reel.id}
                  reel={reel}
                  index={i}
                  total={reels.length}
                  isActive={activeReel === i}
                  isDragging={isDragging}
                  onSelect={setActiveReel}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Dots + hint ── */}
        <div className="mt-6 sm:mt-8 flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-2 text-[10px] sm:text-xs
            tracking-widest text-white/40 uppercase select-none">
            <span>DRAG</span>
            <span className="w-10 sm:w-16 h-px bg-white/20" />
            <span>TO EXPLORE</span>
          </div>
          <div className="flex sm:hidden items-center gap-2 text-[10px]
            tracking-widest text-white/40 uppercase select-none">
            ← DRAG →
          </div>
          <div className="flex gap-1.5 items-center">
            {reels.map((_, i) => (
              <button key={i} type="button" aria-label={`Focus reel ${i + 1}`}
                onClick={() => setActiveReel(i)}
                className={`h-1 sm:h-1.5 rounded-full transition-all duration-500 hover:bg-accent
                  ${activeReel === i ? "w-6 sm:w-8 bg-accent" : "w-2 sm:w-3 bg-white/20"}`}
                data-hover />
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="mt-10 sm:mt-14 md:mt-16 pt-6 sm:pt-8 border-t border-white/10
          flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
          <p className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl uppercase leading-tight">
            Tag <span className="text-accent">#FOSS2026</span>
            <br />
            to feature on our page
          </p>
          <a href="https://instagram.com/foss.in" target="_blank" rel="noreferrer" data-hover
            className="inline-block bg-accent hover:bg-white hover:text-black transition-all
              px-6 sm:px-8 py-3 sm:py-4 font-display text-xs sm:text-sm uppercase
              tracking-widest text-black font-bold text-center w-full sm:w-auto">
            See all reels →
          </a>
        </div>
      </div>

      <style>{`
        /*
          Each card takes an equal share of the row width so all 5 fit side-by-side.
          On smaller screens, cards become slightly wider than 1/5 so they overflow
          and can be dragged.
        */
        .reels-row > .reel-card {
          flex: 0 0 calc((100% - 4 * 1.25rem) / 5);
        }
        @media (max-width: 1024px) {
          .reels-row > .reel-card { flex: 0 0 calc((100% - 3 * 1rem) / 4); }
        }
        @media (max-width: 768px) {
          .reels-row > .reel-card { flex: 0 0 calc((100% - 2 * 1rem) / 3); }
        }
        @media (max-width: 640px) {
          .reels-row > .reel-card { flex: 0 0 calc((100% - 1 * 0.75rem) / 2); }
        }
        @media (max-width: 480px) {
          .reels-row > .reel-card { flex: 0 0 70%; }
        }

        @keyframes progress {
          from { width: 0%; }
          to   { width: 100%; }
        }
        .animate-progress { animation: progress 8s linear infinite; }
      `}</style>
    </section>
  );
}