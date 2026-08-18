import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const videoWrapRef = useRef(null);
  const videoRef = useRef(null);
  const textRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Detect reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Detect mobile (skip heavy parallax on small screens)
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // ============ PIN SECTION ============
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=120%",
        pin: true,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
      });

      // ============ VIDEO PARALLAX (skip on reduced motion) ============
      if (!prefersReducedMotion && videoWrapRef.current) {
        gsap.fromTo(
          videoWrapRef.current,
          { scale: 1, yPercent: 0 },
          {
            scale: isMobile ? 1.15 : 1.25,
            yPercent: isMobile ? 8 : 12,
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

      // ============ TEXT FADE OUT ============
      if (textRef.current) {
        gsap.to(textRef.current, {
          y: isMobile ? -40 : -80,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "80% top",
            scrub: 1,
          },
        });
      }

      // ============ ENTRANCE ANIMATION ============
      gsap.from(".hero-line", {
        yPercent: 100,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power4.out",
        delay: 0.2,
      });

      gsap.from(".hero-meta", {
        opacity: 0,
        y: -20,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.1,
      });

      gsap.from(".hero-bottom", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.8,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[600px] overflow-hidden grain bg-black"
      style={{
        paddingTop: "env(safe-area-inset-top)",
      }}
    >
      {/* ============ VIDEO BACKGROUND ============ */}
      <div
        ref={videoWrapRef}
        className="absolute inset-0 will-change-transform"
      >
        {/* Fallback image (shown while video loads or on error) */}
        <img
          src="/placeholder.png"
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/placeholder.png"
          onLoadedData={() => setVideoLoaded(true)}
          onCanPlay={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src="/hero.mp4" type="video/mp4" />
          {/* Fallback source if hero.mp4 fails */}
          <source
            src="/placeholder.png"
            type="video/mp4"
          />
        </video>
      </div>

      {/* ============ GRADIENT OVERLAYS ============ */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/90 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30 pointer-events-none" />

      {/* Subtle red glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
        style={{
          background:
            "radial-gradient(circle at 20% 80%, rgba(225,6,0,0.4) 0%, transparent 50%)",
        }}
      />

      {/* ============ CONTENT ============ */}
      <div
        ref={textRef}
        className="relative z-10 h-full flex flex-col justify-between"
        style={{
          paddingLeft: "clamp(16px, 4vw, 40px)",
          paddingRight: "clamp(16px, 4vw, 40px)",
          paddingTop: "clamp(80px, 12vh, 120px)",
          paddingBottom: "clamp(20px, 4vh, 40px)",
        }}
      >
        {/* ============ TOP META ============ */}
        <div className="flex justify-between items-start gap-4">
          <div className="hero-meta">
           
            <div
              className="label text-white/85"
              style={{ fontSize: "clamp(9px, 1.3vw, 11px)" }}
            >
              Feel It
            </div>
          </div>

          <div className="hero-meta text-right">
            <div
              className="label text-white/30 mb-1"
              style={{ fontSize: "clamp(9px, 1.3vw, 11px)" }}
            >
              Dec 2026
            </div>
            <div
              className="label text-white/85"
              style={{ fontSize: "clamp(9px, 1.3vw, 11px)" }}
            >
              Bengaluru
            </div>
          </div>
        </div>

        {/* ============ MAIN TITLE ============ */}
        <div className="max-w-6xl">
          <div
            className="label text-accent mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3"
            style={{ fontSize: "clamp(9px, 1.3vw, 11px)" }}
          >
            <span className="w-6 sm:w-8 h-px bg-accent" />
            Festival of Sound & Speed
          </div>

          <h1
            className="font-display uppercase leading-[0.85]"
            style={{
              fontSize: "clamp(100px, 8vw, 150px)",
              letterSpacing: "-0.03em",
            }}
          >
            <div className="overflow-hidden">
              <div className="hero-line">
                Precision<span className="text-accent">.</span>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="hero-line">
                Power<span className="text-accent">.</span>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="hero-line">
                Pulse<span className="text-accent">.</span>
              </div>
            </div>
          </h1>
        </div>

        {/* ============ BOTTOM ROW ============ */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-6">
          <p
            className="hero-bottom text-white/60 leading-relaxed max-w-sm"
            style={{ fontSize: "clamp(11px, 1.4vw, 13px)" }}
          >
            Two days. Motorsport meets music.
            <br className="hidden sm:inline" />
            5—6 December 2026, Bengaluru.
            <br className="hidden sm:inline" />
            <span className="text-white/40">
              Presented by Motorsport Inc.
            </span>
          </p>

          {/* Scroll indicator */}
          <div className="hero-bottom flex items-center gap-3 label group cursor-pointer">
            <span
              className="text-white/60"
              style={{ fontSize: "clamp(9px, 1.3vw, 11px)" }}
            >
              Scroll
            </span>
            <span className="w-8 sm:w-10 h-px bg-white/30 group-hover:bg-accent group-hover:w-14 transition-all duration-500" />
            <span
              className="text-white/40 group-hover:text-accent transition-colors"
              style={{ fontSize: "clamp(12px, 1.5vw, 14px)" }}
            >
              ↓
            </span>
          </div>
        </div>
      </div>

      {/* ============ CORNER FRAMES ============ */}
      <div className="absolute top-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-t border-l border-white/15 pointer-events-none" />
      <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-t border-r border-white/15 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-b border-l border-white/15 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-b border-r border-white/15 pointer-events-none" />
    </section>
  );
}