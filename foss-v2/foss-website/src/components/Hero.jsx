import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const videoWrapRef = useRef(null);
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const textRef = useRef(null);

  const [activeVideo, setActiveVideo] = useState(0);
  const [initialLoaded, setInitialLoaded] = useState(false);

  // Smooth cross-fade handlers
  const handleVideo0Ended = () => {
    if (video2Ref.current) {
      video2Ref.current.currentTime = 0;
      video2Ref.current.play().catch(() => {});
      setActiveVideo(1);
    }
  };

  const handleVideo1Ended = () => {
    if (video1Ref.current) {
      video1Ref.current.currentTime = 0;
      video1Ref.current.play().catch(() => {});
      setActiveVideo(0);
    }
  };

  useEffect(() => {
    // Start initial video playback
    if (video1Ref.current) {
      video1Ref.current.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // Pin Section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=120%",
        pin: true,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
      });

      // Video Parallax
      if (!prefersReducedMotion && videoWrapRef.current) {
        gsap.fromTo(
          videoWrapRef.current,
          { scale: 1, yPercent: 0 },
          {
            scale: isMobile ? 1.12 : 1.2,
            yPercent: isMobile ? 6 : 10,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=120%",
              scrub: true,
            },
          }
        );
      }

      // Text Fade Out
      if (textRef.current) {
        gsap.to(textRef.current, {
          y: isMobile ? -30 : -60,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "75% top",
            scrub: 1,
          },
        });
      }

      // Entrance Animation
      gsap.from(".hero-line", {
        yPercent: 100,
        opacity: 0,
        duration: 1.1,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.2,
      });

      gsap.from(".hero-meta", {
        opacity: 0,
        y: -15,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.1,
      });

      gsap.from(".hero-bottom", {
        opacity: 0,
        y: 15,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.7,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[650px] overflow-hidden grain bg-black text-white"
      style={{
        paddingTop: "env(safe-area-inset-top)",
      }}
    >
      {/* Inject Orbitron / Speed Racing Typography */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:ital,wght@1,900&display=swap');
        
        .racing-title-font {
          font-family: 'Orbitron', system-ui, -apple-system, sans-serif;
          font-style: italic;
          font-weight: 900;
          letter-spacing: 0.05em;
        }
      `}</style>

      {/* Background Video Wrapper */}
      <div
        ref={videoWrapRef}
        className="absolute inset-0 will-change-transform"
      >
        {/* Video 1 */}
        <video
          ref={video1Ref}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={handleVideo0Ended}
          onCanPlay={() => setInitialLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            activeVideo === 0 && initialLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        {/* Video 2 */}
        <video
          ref={video2Ref}
          muted
          playsInline
          preload="auto"
          onEnded={handleVideo1Ended}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            activeVideo === 1 ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src="/hero1.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/95 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40 pointer-events-none" />

      {/* Ambient Red Glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-15 mix-blend-overlay"
        style={{
          background:
            "radial-gradient(circle at 15% 85%, rgba(225,6,0,0.5) 0%, transparent 60%)",
        }}
      />

      {/* Hero Content */}
      <div
        ref={textRef}
        className="relative z-10 h-full flex flex-col justify-between"
        style={{
          paddingLeft: "clamp(20px, 5vw, 64px)",
          paddingRight: "clamp(20px, 5vw, 64px)",
          paddingTop: "clamp(80px, 12vh, 120px)",
          paddingBottom: "clamp(28px, 5vh, 48px)",
        }}
      >
        {/* Top Header Row */}
        <div className="flex justify-between items-start gap-4">
          <div className="hero-meta">
            <span className="text-[9px] sm:text-[11px] tracking-[0.3em] uppercase text-white/40 font-mono block">
              Presented By
            </span>
            <span className="text-xs sm:text-sm tracking-[0.2em] uppercase text-white font-normal mt-0.5 block">
              Motorsport Inc.
            </span>
          </div>

          <div className="hero-meta text-right">
            <span className="text-[9px] sm:text-[11px] tracking-[0.3em] uppercase text-white/40 font-mono block">
              Location
            </span>
            <span className="text-xs sm:text-sm tracking-[0.2em] uppercase text-white font-normal mt-0.5 block">
              Bengaluru, KA
            </span>
          </div>
        </div>

        {/* Main Title - Matches Image Style Exactly */}
        <div className="max-w-7xl my-auto py-6">
          <h1
            className="racing-title-font uppercase leading-none"
            style={{
              fontSize: "clamp(26px, 4.8vw, 76px)",
            }}
          >
            <span className="block overflow-hidden py-2">
              <span className="hero-line flex flex-wrap items-center gap-x-[0.35em] gap-y-2">
                {/* White / Dark Metallic Outline Text */}
                <span className="text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                  FESTIVAL OF
                </span>
                
                {/* Motorsport Red Accent Text */}
                <span className="text-[#e10600] drop-shadow-[0_0_20px_rgba(225,6,0,0.35)]">
                  SOUND & SPEED
                </span>
              </span>
            </span>
          </h1>
        </div>

        {/* Bottom Minimal Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-t border-white/10 pt-6">
          <div className="hero-bottom flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-1 text-xs sm:text-sm tracking-[0.2em] uppercase font-light text-white/90">
            <span>28 — 29 November 2026</span>
            <span className="text-white/20">•</span>
            <span className="text-white/60">Bengaluru</span>
          </div>

          {/* Scroll Indicator */}
          <div className="hero-bottom flex items-center gap-3 label group cursor-pointer">
            <span className="text-white/50 text-[10px] sm:text-xs tracking-[0.25em] uppercase font-mono">
              Explore
            </span>
            <span className="w-8 sm:w-12 h-[1px] bg-white/20 group-hover:bg-red-600 group-hover:w-16 transition-all duration-500" />
            <span className="text-white/40 group-hover:text-red-600 transition-colors text-xs sm:text-sm">
              ↓
            </span>
          </div>
        </div>
      </div>

      {/* Structural Corner Framing */}
      <div className="absolute top-0 left-0 w-6 h-6 sm:w-10 sm:h-10 border-t border-l border-white/15 pointer-events-none" />
      <div className="absolute top-0 right-0 w-6 h-6 sm:w-10 sm:h-10 border-t border-r border-white/15 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-6 h-6 sm:w-10 sm:h-10 border-b border-l border-white/15 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-10 sm:h-10 border-b border-r border-white/15 pointer-events-none" />
    </section>
  );
}