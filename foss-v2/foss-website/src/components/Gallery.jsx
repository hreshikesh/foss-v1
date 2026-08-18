import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = [
  { id: "01", src: "/placeholder.png", label: "01 / 06" },
  { id: "02", src: "/placeholder.png", label: "02 / 06" },
  { id: "03", src: "/placeholder.png", label: "03 / 06" },
  { id: "04", src: "/placeholder.png", label: "04 / 06" },
  { id: "05", src: "/placeholder.png", label: "05 / 06" },
  { id: "06", src: "/placeholder.png", label: "06 / 06" },
];

export default function Gallery() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const imgRefs = useRef([]);

  imgRefs.current = [];
  const addToImgRefs = (el) => {
    if (el && !imgRefs.current.includes(el)) {
      imgRefs.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const getScrollAmount = () => track.scrollWidth - window.innerWidth;

      // Primary Horizontal Scroll Tween
      const horizontalTween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Individual Image Clip Reveals linked to horizontalScroll
      imgRefs.current.forEach((img) => {
        if (!img) return;

        gsap.fromTo(
          img,
          { clipPath: "inset(12% 12% 12% 12%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "power2.out",
            scrollTrigger: {
              trigger: img,
              containerAnimation: horizontalTween,
              start: "left 90%",
              end: "left 40%",
              scrub: 1,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black text-white flex flex-col justify-between py-6 sm:py-10 md:py-12"
    >
      {/* HEADER SECTION */}
      <div className="px-4 sm:px-8 lg:px-12 max-w-[1400px] w-full mx-auto z-10 flex-shrink-0 mb-3 sm:mb-6">
        <div className="label text-red-600 mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3 text-[9px] sm:text-xs tracking-widest uppercase font-normal">
          <span className="w-5 sm:w-8 h-[2px] bg-red-600 inline-block" />
          IN FRAMES
        </div>
        <h2 className="font-display text-2xl sm:text-5xl md:text-6xl uppercase tracking-tight font-light leading-none">
          Moments <span className="text-white/30 italic font-normal">captured</span>
        </h2>
      </div>

      {/* HORIZONTAL TRACK */}
      <div className="w-full flex-1 flex items-center">
        <div
          ref={trackRef}
          className="flex gap-3 sm:gap-6 lg:gap-8 px-4 sm:px-8 lg:px-12 will-change-transform items-center"
        >
          {images.map((img, i) => (
            <div
              key={img.id}
              ref={addToImgRefs}
              className="flex-shrink-0 w-[82vw] sm:w-[55vw] md:w-[42vw] lg:w-[32vw] h-[45vh] sm:h-[52vh] md:h-[58vh] relative overflow-hidden group border border-white/10 bg-white/[0.02]"
            >
              <img
                src={img.src}
                alt={`Gallery frame ${img.id}`}
                className="w-full h-full object-cover img-cin transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 label text-white/80 text-[8px] sm:text-xs tracking-widest font-normal mix-blend-difference">
                {img.label}
              </div>
            
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER BAR */}
      <div className="px-4 sm:px-8 lg:px-12 max-w-[1400px] w-full mx-auto flex items-center justify-between text-white/30 text-[9px] sm:text-xs font-mono uppercase tracking-widest flex-shrink-0 pt-2">
        <span>Scroll to Explore</span>
      </div>
    </section>
  );
}