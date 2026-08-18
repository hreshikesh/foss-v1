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
      ref={sectionRef}
      className="relative border-t border-white/10 overflow-hidden bg-black text-white"
    >
      {/* Retained 7/5 split layout consistently across all screen sizes */}
      <div className="grid grid-cols-12 min-h-[60vh] sm:min-h-[80vh]">
        {/* Image side - locked to 7 columns */}
        <div className="col-span-7 relative overflow-hidden min-h-[250px]">
          <div ref={imgRef} className="absolute inset-[-10%]">
            <img
              src="/placeholder.png"
              alt="Venue"
              className="w-full h-full object-cover img-cin opacity-80"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/30 to-black" />
         
        </div>

        {/* Content side - locked to 5 columns */}
        <div
          ref={contentRef}
          className="col-span-5 flex flex-col justify-center p-3 sm:p-8 md:p-12 lg:p-16"
        >
          <div className="label text-red-600 mb-2 sm:mb-6 flex items-center gap-1.5 sm:gap-3 text-[9px] sm:text-xs tracking-widest uppercase font-normal">
            <span className="w-4 sm:w-8 h-[2px] bg-red-600 inline-block" />
            Location
          </div>

          <h2 className="font-display text-base sm:text-3xl md:text-5xl lg:text-6xl leading-[0.95] uppercase font-light tracking-tight mb-3 sm:mb-8">
            Bengaluru
            <br />
            <span className="text-white/30">International</span>
            <br />
            <span className="text-white/30">Expo Centre</span>
          </h2>

          <div className="space-y-2.5 sm:space-y-6 mb-4 sm:mb-10">
            {/* Address */}
            <div className="flex gap-2 sm:gap-4 items-start">
              <div className="w-6 h-6 sm:w-10 sm:h-10 border border-white/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 text-white/80"
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
                <div className="text-[10px] sm:text-sm font-normal mb-0.5 sm:mb-1 text-white">
                  Address
                </div>
                <div className="text-white/50 text-[8px] sm:text-xs leading-tight sm:leading-relaxed font-normal">
                  100 Feet Road, Whitefield,
                  <br />
                  Bengaluru, KA 560066
                </div>
              </div>
            </div>

            {/* Gates Open */}
            <div className="flex gap-2 sm:gap-4 items-start">
              <div className="w-6 h-6 sm:w-10 sm:h-10 border border-white/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 text-white/80"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <div className="text-[10px] sm:text-sm font-normal mb-0.5 sm:mb-1 text-white">
                  Gates Open
                </div>
                <div className="text-white/50 text-[8px] sm:text-xs leading-tight sm:leading-relaxed font-normal">
                  09:00 AM — Both Days
                  <br />
                  Show ends 22:30 PM
                </div>
              </div>
            </div>

            {/* Getting There */}
            <div className="flex gap-2 sm:gap-4 items-start">
              <div className="w-6 h-6 sm:w-10 sm:h-10 border border-white/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 text-white/80"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="1" y="3" width="15" height="13" rx="2" ry="2" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <div>
                <div className="text-[10px] sm:text-sm font-normal mb-0.5 sm:mb-1 text-white">
                  Getting There
                </div>
                <div className="text-white/50 text-[8px] sm:text-xs leading-tight sm:leading-relaxed font-normal">
                  15 min from Whitefield Metro
                  <br />
                  Free parking for 2,000+ cars
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <a
              href="/placeholder.png"
              target="_blank"
              rel="noreferrer"
              className="bg-red-600 hover:bg-white hover:text-black transition-all px-2.5 py-1.5 sm:px-6 sm:py-3 font-display text-[9px] sm:text-xs uppercase tracking-wider text-white text-center font-normal"
            >
              Get Directions →
            </a>
            <a
              href="#"
              className="border border-white/20 hover:border-white px-2.5 py-1.5 sm:px-6 sm:py-3 font-display text-[9px] sm:text-xs uppercase tracking-wider text-white/70 hover:text-white transition-all text-center font-normal"
            >
              Venue Map
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}