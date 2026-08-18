import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ImageReveal({
  src,
  alt = "",
  className = "",
  parallax = true,
  direction = "bottom", // "bottom" | "top" | "left" | "right"
  duration = 1.4,
  scale = 1.4,
  parallaxAmount = 12,
  delay = 0,
  loading = "lazy",
  placeholder = "/placeholder.png",
  cinematic = true,
  onLoad,
}) {
  const wrapRef = useRef(null);
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Clip-path direction map
  const clipStart = {
    bottom: "inset(100% 0% 0% 0%)",
    top: "inset(0% 0% 100% 0%)",
    left: "inset(0% 100% 0% 0%)",
    right: "inset(0% 0% 0% 100%)",
  };

  useEffect(() => {
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const initialClip = clipStart[direction] || clipStart.bottom;

      // Set initial state
      gsap.set(wrapRef.current, {
        clipPath: prefersReducedMotion ? "inset(0%)" : initialClip,
      });

      if (imgRef.current) {
        gsap.set(imgRef.current, {
          scale: prefersReducedMotion ? 1 : scale,
        });
      }

      // Skip animations for reduced motion
      if (prefersReducedMotion) return;

      // Clip-path reveal
      gsap.to(wrapRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration,
        delay,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // Inner image scale-down
      if (imgRef.current) {
        gsap.to(imgRef.current, {
          scale: 1,
          duration: duration * 1.15,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }

      // Parallax on scroll
      if (parallax && imgRef.current) {
        gsap.to(imgRef.current, {
          yPercent: parallaxAmount,
          ease: "none",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, wrapRef);

    return () => ctx.revert();
  }, [parallax, direction, duration, scale, parallaxAmount, delay]);

  const handleLoad = () => {
    setLoaded(true);
    onLoad?.();
    // Refresh ScrollTrigger after image loads (in case dimensions change)
    setTimeout(() => ScrollTrigger.refresh(), 100);
  };

  const handleError = () => {
    setError(true);
    setLoaded(true);
  };

  return (
    <div
      ref={wrapRef}
      className={`relative overflow-hidden bg-white/5 ${className}`}
      style={{ willChange: "clip-path" }}
    >
      {/* Loading skeleton */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white/10 border-t-white/40 rounded-full animate-spin" />
        </div>
      )}

      {/* Fallback for error */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <div className="text-white/30 text-xs uppercase tracking-widest">
            Image unavailable
          </div>
        </div>
      )}

      {/* Main image */}
      <img
        ref={imgRef}
        src={error ? placeholder : src}
        alt={alt}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover will-change-transform transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${cinematic ? "img-cinematic" : ""}`}
        draggable={false}
      />
    </div>
  );
}