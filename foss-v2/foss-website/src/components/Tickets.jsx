import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const passes = [
  {
    id: "day",
    tier: "01",
    name: "Day Pass",
    price: "₹1,499",
    duration: "Single Day",
    color: "#888888",
    badge: "STARTER",
    districtUrl: "https://www.district.in/events/day-pass",
    features: [
      "Full access to one day",
      "All performance zones",
      "Food & beverage zones",
      "Standard viewing",
    ],
  },
  {
    id: "weekend",
    tier: "02",
    name: "Weekend",
    price: "₹2,499",
    duration: "Both Days",
    color: "#e10600",
    badge: "POPULAR",
    featured: true,
    districtUrl: "https://www.district.in/events/weekend-pass",
    features: [
      "Full 2-day access",
      "All performance zones",
      "Priority entry lanes",
      "Exclusive merch drop",
      "Meet & greet lottery",
    ],
  },
  {
    id: "vip",
    tier: "03",
    name: "VIP Grid",
    price: "₹6,999",
    duration: "Premium 2-Day",
    color: "#d4af37",
    badge: "LIMITED",
    districtUrl: "https://www.district.in/events/vip-grid-pass",
    features: [
      "Pit lane access",
      "VIP lounge & bar",
      "Guaranteed meet & greet",
      "Premium viewing deck",
      "Complimentary parking",
      "Signed merchandise",
    ],
  },
];

export default function Tickets() {
  const [selectedPass, setSelectedPass] = useState("weekend");
  const [countdown, setCountdown] = useState({ d: 0, h: 0, m: 0, s: 0 });

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const videoRef = useRef(null);
  const bgTextRef = useRef(null);

  cardsRef.current = [];

  const addToCardsRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    // Countdown set to Event Start Date: Nov 28, 2026 at 09:00 AM IST
    const target = new Date("2026-11-28T09:00:00").getTime();
    const tick = () => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff > 0) {
        setCountdown({
          d: Math.floor(diff / (1000 * 60 * 60 * 24)),
          h: Math.floor((diff / (1000 * 60 * 60)) % 24),
          m: Math.floor((diff / (1000 * 60)) % 60),
          s: Math.floor((diff / 1000) % 60),
        });
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (videoRef.current) {
        gsap.fromTo(
          videoRef.current,
          { scale: 1.15, yPercent: -5 },
          {
            scale: 1,
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }

      if (headerRef.current) {
        gsap.from(headerRef.current, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          },
        });
      }

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 50,
            rotationY: -15,
            transformPerspective: 1200,
          },
          {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
            },
          }
        );
      });

      if (bgTextRef.current) {
        gsap.to(bgTextRef.current, {
          xPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardMove = (e, index) => {
    const card = cardsRef.current[index];
    if (!card || window.innerWidth < 768) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -5;
    const rotY = ((x - cx) / cx) * 5;

    gsap.to(card, {
      rotationX: rotX,
      rotationY: rotY,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleCardLeave = (index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const activePass = passes.find((p) => p.id === selectedPass) || passes[1];

  return (
    <section
      id="tickets"
      ref={sectionRef}
      className="relative py-12 sm:py-14 md:py-10 overflow-hidden bg-black text-white font-sans"
    >
      {/* VIDEO BACKGROUND */}
      <div ref={videoRef} className="absolute inset-0 will-change-transform pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          poster="/placeholder.png"
        >
          <source src="/placeholder.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
      </div>

      {/* BACKGROUND TEXT */}
      <div
        ref={bgTextRef}
        className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none select-none opacity-[0.03] z-[1] will-change-transform"
      >
        <span className="font-display text-[25vw] uppercase leading-none tracking-tight font-light">
          PASSES · TICKETS · ACCESS ·
        </span>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-10">
        {/* HEADER & COUNTDOWN */}
        <div
          ref={headerRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-8 sm:mb-16 items-end"
        >
          <div className="lg:col-span-7">
            <h2 className="font-display text-3xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] uppercase font-light tracking-tight">
              Be there<span className="text-red-600">.</span>
              <br />
              <span className="text-white/30">Or hear</span>
              <br />
              <span className="text-white/30">about it.</span>
            </h2>
          </div>

          {/* COUNTDOWN */}
          <div className="lg:col-span-5 w-full">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <div className="label text-white/70 text-[10px] sm:text-xs tracking-widest uppercase font-semibold">
                EVENT STARTS NOVEMBER 28, 2026
              </div>
            </div>

            <div className="grid grid-cols-4 gap-1.5 sm:gap-3">
              {[
                ["DAYS", countdown.d],
                ["HRS", countdown.h],
                ["MIN", countdown.m],
                ["SEC", countdown.s],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="border border-white/10 bg-white/[0.02] p-1.5 sm:p-3 text-center"
                >
                  <div className="font-display text-lg sm:text-3xl md:text-4xl leading-none tabular-nums font-light">
                    {String(value).padStart(2, "0")}
                  </div>
                  <div className="label mt-1 text-[8px] sm:text-[10px] text-white/40 tracking-wider font-normal">
                    {label}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-white/50 text-[10px] sm:text-xs mt-2 sm:mt-3 font-normal">
              ⚡ Festival gates open 09:00 AM on Nov 28 in Bengaluru. Book on District to reserve your slot.
            </p>
          </div>
        </div>

        {/* PASS CARDS */}
        <div
          className="grid grid-cols-3 gap-2 sm:gap-5 lg:gap-8 items-stretch"
          style={{ perspective: "1200px" }}
        >
          {passes.map((pass, i) => {
            const isSelected = selectedPass === pass.id;
            const isFeatured = pass.featured;

            return (
              <div
                key={pass.id}
                ref={addToCardsRef}
                onClick={() => setSelectedPass(pass.id)}
                onMouseMove={(e) => handleCardMove(e, i)}
                onMouseLeave={() => handleCardLeave(i)}
                className="group relative cursor-pointer transition-all duration-300 will-change-transform flex flex-col"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Glow Accent */}
                {isFeatured && (
                  <div className="absolute -inset-0.5 bg-red-600/10 blur-lg opacity-50 group-hover:opacity-80 transition-opacity pointer-events-none" />
                )}

                {/* Card Container */}
                <div
                  className={`relative flex-1 flex flex-col justify-between border backdrop-blur-md transition-all duration-300 ${
                    isSelected
                      ? "border-red-600 bg-black/90"
                      : isFeatured
                      ? "border-red-600/40 bg-black/60 hover:border-red-600/80"
                      : "border-white/10 bg-black/40 hover:border-white/30"
                  }`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Card Header & Badge */}
                  <div>
                    <div className="p-2 sm:p-5 lg:p-7 border-b border-white/10 relative">
                      <div className="flex items-center justify-between mb-1 sm:mb-3">
                        <div className="label text-white/40 text-[8px] sm:text-[11px] tracking-widest font-normal">
                          TIER {pass.tier}
                        </div>
                        <div
                          className={`label px-1 sm:px-2 py-0.5 text-[7px] sm:text-[10px] font-normal tracking-wider ${
                            isFeatured
                              ? "bg-red-600 text-white"
                              : "bg-white/10 text-white/70"
                          }`}
                        >
                          {pass.badge}
                        </div>
                      </div>

                      <h3 className="font-display text-sm sm:text-2xl lg:text-3xl uppercase leading-tight font-normal tracking-tight mb-0.5">
                        {pass.name}
                      </h3>
                      <div className="label text-[9px] sm:text-xs text-white/40 font-normal">
                        {pass.duration}
                      </div>
                    </div>

                    {/* Price Section */}
                    <div className="p-2 sm:p-5 lg:p-7 border-b border-white/10">
                      <div className="flex items-baseline">
                        <span
                          className="font-display text-base sm:text-3xl md:text-4xl lg:text-5xl font-normal leading-none tracking-tight"
                          style={{
                            color: isFeatured || isSelected ? pass.color : "#ffffff",
                          }}
                        >
                          {pass.price}
                        </span>
                      </div>
                      <div className="label text-white/30 text-[7px] sm:text-[11px] mt-1 font-normal">
                        Per attendee
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="p-2 sm:p-5 lg:p-7">
                      <ul className="space-y-1.5 sm:space-y-2.5 mb-2 sm:mb-6">
                        {pass.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-1.5 text-[9px] sm:text-xs lg:text-sm text-white/70 font-normal leading-tight"
                          >
                            <span
                              className="mt-1 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full flex-shrink-0 opacity-80"
                              style={{ backgroundColor: pass.color }}
                            />
                            <span className="truncate sm:whitespace-normal">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* District Direct Buy Link */}
                  <div className="p-2 sm:p-5 lg:p-7 mt-auto">
                    <a
                      href={pass.districtUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={`block w-full py-2 sm:py-3 text-center font-display text-[9px] sm:text-xs uppercase tracking-widest transition-all duration-300 font-normal ${
                        isSelected
                          ? "bg-red-600 text-white hover:bg-red-700"
                          : "border border-white/20 hover:border-white text-white/70 hover:text-white bg-transparent"
                      }`}
                    >
                      Buy on District →
                    </a>
                  </div>

                  {/* Accents */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-red-600/60 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-red-600/60 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>

        {/* CHECKOUT BAR */}
        <div className="mt-6 sm:mt-12 border border-white/10 bg-black/80 p-3 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-5">
              <div className="label text-white/40 text-[10px] sm:text-xs mb-0.5 font-normal">
                Selected Pass
              </div>
              <div className="font-display text-lg sm:text-2xl uppercase font-normal tracking-tight">
                {activePass.name}
                <span className="text-red-600 ml-2">{activePass.price}</span>
              </div>
            </div>

            <div className="hidden sm:block md:col-span-4 label text-xs text-white/50 space-y-1 font-normal">
              <div>🎟️ Official ticketing partner: District</div>
              <div>⚡ Event dates: 28–29 Nov 2026</div>
            </div>

            <div className="md:col-span-3">
              <a
                href={activePass.districtUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative overflow-hidden bg-red-600 text-white py-3 sm:py-4 text-center group"
              >
                <span className="relative z-10 font-display text-xs sm:text-sm uppercase tracking-widest font-normal group-hover:text-black transition-colors duration-300">
                  Book on District →
                </span>
                <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}