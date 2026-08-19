import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import logoSvgRaw from "../assets/svg/logo-large-white.svg?raw";

gsap.registerPlugin(ScrollTrigger);

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const counterRef = useRef(null);
  const barRef = useRef(null);
  const svgWrapperRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Slide up preloader overlay to reveal main content
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 0.8,
            ease: "power4.inOut",
            onComplete: () => {
              document.body.style.overflow = "";
              onComplete?.();
              setTimeout(() => ScrollTrigger.refresh(), 100);
            },
          });
        },
      });

      // 1. Extract and horizontally sort all vector shapes (Left to Right sequence)
      const svgNodes = Array.from(
        svgWrapperRef.current.querySelectorAll("path, polygon, rect, circle")
      );

      // Sort elements strictly by their X-coordinate box position
      svgNodes.sort((a, b) => {
        const boxA = a.getBBox ? a.getBBox().x : 0;
        const boxB = b.getBBox ? b.getBBox().x : 0;
        return boxA - boxB;
      });

      // Prepare stroke properties for laser tracing
      svgNodes.forEach((node) => {
        const length = node.getTotalLength ? node.getTotalLength() : 300;
        gsap.set(node, {
          strokeDasharray: length,
          strokeDashoffset: length,
          stroke: "#e10600",
          strokeWidth: 2,
          fillOpacity: 0,
          transformOrigin: "50% 50%",
        });
      });

      // Initial Container Entry
      tl.fromTo(
        svgWrapperRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3 }
      );

      // 2. Letter-by-Letter High Speed Trace & Fill Sequence
      tl.to(svgNodes, {
        strokeDashoffset: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
      })
        .to(
          svgNodes,
          {
            fillOpacity: 1,
            strokeWidth: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: "power1.inOut",
          },
          "-=0.5"
        )
        // Spring letter impact with velocity skew
        .fromTo(
          svgNodes,
          { y: -15, skewX: -20, filter: "brightness(2)" },
          {
            y: 0,
            skewX: 0,
            filter: "brightness(1)",
            duration: 0.5,
            stagger: 0.06,
            ease: "back.out(1.7)",
          },
          "-=0.6"
        );

      // 3. Subtitle & Red Velocity Laser Line
      tl.fromTo(
        ".preloader-laser-line",
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.2"
      ).fromTo(
        ".preloader-sub",
        { opacity: 0, y: 15, letterSpacing: "0.2em" },
        { opacity: 1, y: 0, letterSpacing: "0.4em", duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );

      // 4. Counter & Red Glow Ramp
      const counterObj = { val: 0 };
      tl.to(
        counterObj,
        {
          val: 100,
          duration: 1.8,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counterRef.current) counterRef.current.textContent = Math.round(counterObj.val);
          },
        },
        "-=0.3"
      )
        .to(barRef.current, { scaleX: 1, duration: 1.8, ease: "power2.inOut" }, "<")
        .to(
          svgWrapperRef.current,
          {
            filter: "drop-shadow(0 0 30px rgba(225,6,0,0.9))",
            duration: 0.9,
            yoyo: true,
            repeat: 1,
            ease: "sine.inOut",
          },
          "<"
        );

      // 5. Brief Hold
      tl.to({}, { duration: 0.2 });

      // 6. High-Speed Nitro Launch Exit
      tl.to(svgWrapperRef.current, {
        scaleX: 1.8,
        scaleY: 0.6,
        y: -120,
        opacity: 0,
        filter: "blur(12px)",
        duration: 0.45,
        ease: "power4.in",
      });

      tl.to(
        [".preloader-sub", ".preloader-laser-line", ".preloader-progress"],
        {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: "power2.in",
        },
        "-=0.35"
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
      className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center overflow-hidden select-none"
    >
      {/* Top Motorsport Badges */}
      <div className="absolute top-6 md:top-8 left-6 md:left-8 text-[11px] font-mono tracking-[0.25em] text-white/30 uppercase">
        FOSS · 2026
      </div>
      <div className="absolute top-6 md:top-8 right-6 md:right-8 text-[11px] font-mono tracking-[0.25em] text-white/30 uppercase">
        Bengaluru, IN
      </div>

      {/* SVG Container */}
      <div
        ref={svgWrapperRef}
        className="relative w-[85vw] max-w-[500px] sm:max-w-[620px] md:max-w-[780px] px-4 py-2 text-white fill-current drop-shadow-[0_10px_30px_rgba(225,6,0,0.3)]"
        dangerouslySetInnerHTML={{ __html: logoSvgRaw }}
      />

      {/* Red Laser Accent Line */}
      <div className="preloader-laser-line w-[60vw] max-w-[400px] h-[1px] bg-gradient-to-r from-transparent via-[#e10600] to-transparent my-3 origin-center" />

  
      {/* Progress Bar & Counter */}
      <div className="preloader-progress absolute bottom-8 md:bottom-10 left-6 md:left-8 right-6 md:right-8 flex items-center gap-4">
        <div className="flex-1 h-px bg-white/10 relative overflow-hidden">
          <div
            ref={barRef}
            className="absolute inset-0 bg-[#e10600] origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
        <div className="font-mono text-sm text-white/70 tabular-nums w-12 text-right flex items-baseline justify-end gap-0.5 font-bold">
          <span ref={counterRef}>0</span>
          <span className="text-[10px] text-white/30">%</span>
        </div>
      </div>
    </div>
  );
}