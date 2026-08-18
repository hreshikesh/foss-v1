import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Venue() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image parallax
      gsap.fromTo(
        imgRef.current,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      // Content slide in
      gsap.from(contentRef.current, {
        x: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="venue"
      ref={sectionRef}
      className="relative border-t border-white/10 overflow-hidden bg-black text-white"
    >
      <div className="grid grid-cols-12 min-h-[50vh] sm:min-h-[70vh]">
        {/* Image side - 7 columns */}
        <div className="col-span-12 md:col-span-7 relative overflow-hidden min-h-[250px]">
          <div ref={imgRef} className="absolute inset-[-10%]">
            <img
              src="/placeholder.png"
              alt="Festival Venue"
              className="w-full h-full object-cover img-cin opacity-80"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/30 to-black" />
        </div>

        {/* Content side - 5 columns */}
        <div
          ref={contentRef}
          className="col-span-12 md:col-span-5 flex flex-col justify-center p-6 sm:p-8 md:p-12 lg:p-16"
        >
          <div className="label text-red-600 mb-2 sm:mb-4 flex items-center gap-1.5 sm:gap-3 text-[9px] sm:text-xs tracking-widest uppercase font-normal">
            <span className="w-4 sm:w-8 h-[2px] bg-red-600 inline-block" />
            Location & Info
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[0.95] uppercase font-light tracking-tight mb-6 sm:mb-8">
            
            <span className="text-white/30">Bengaluru</span>
          </h2>

          <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
            {/* 1. VENUE */}
            <div className="flex gap-3 sm:gap-4 items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 border border-white/15 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-4 h-4 text-red-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <div className="text-[10px] sm:text-xs text-white/40 uppercase tracking-wider font-normal">
                  Venue
                </div>
                <div className="text-white text-xs sm:text-sm md:text-base font-medium">
                  To Be Announced
                </div>
              </div>
            </div>

            {/* 2. DATE */}
            <div className="flex gap-3 sm:gap-4 items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 border border-white/15 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-4 h-4 text-red-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div>
                <div className="text-[10px] sm:text-xs text-white/40 uppercase tracking-wider font-normal">
                  Date
                </div>
                <div className="text-white text-xs sm:text-sm md:text-base font-medium">
                  28–29 November 2026
                </div>
              </div>
            </div>

            {/* 3. PHONE NUMBER */}
            <div className="flex gap-3 sm:gap-4 items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 border border-white/15 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-4 h-4 text-red-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <div className="text-[10px] sm:text-xs text-white/40 uppercase tracking-wider font-normal">
                  Phone / Helpline
                </div>
                <a
                  href="tel:+9170190 33669"
                  className="text-white hover:text-red-600 transition-colors text-xs sm:text-sm md:text-base font-medium"
                >
                  +91 70190 33669
                </a>
              </div>
            </div>
          </div>

          {/* Directions Link
          <div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="inline-block w-full sm:w-auto bg-red-600 hover:bg-white hover:text-black transition-all px-6 py-3 font-display text-xs uppercase tracking-wider text-white text-center font-normal"
            >
              Get Directions →
            </a>
          </div> */}
        </div>
      </div>
    </section>
  );
}