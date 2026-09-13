import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DISTRICT_URL =
  "https://www.district.in/events/festival-of-sound-and-speed-2026-buy-tickets?utm_source=Partner&utm_medium=Ads&utm_campaign=festival-of-sound-and-speed-2026_Partner_Ads_260819&af_force_deeplink=true&c=festival-of-sound-and-speed-2026_Partner_Ads_260819&source_caller=api_v2&shortlink=t5781y8v&utm_id=97760_v0_s00_e0_tv3&utm_source=ig&utm_medium=social&is_retargeting=true&deep_link_value=edition%3A%2F%2Fresolve-onelink%3Flink_params%3D%257B%2522event_id%2522%253A%25226a84b276ad8ef8fd9ffd84ef%2522%252C%2522event_slug%2522%253A%2522festival-of-sound-and-speed-2026%2522%257D%26link_type%3Dopen_event_details_page%26utm_source%3DPartner%26utm_medium%3DAds%26utm_campaign%3Dfestival-of-sound-and-speed-2026_Partner_Ads_260819&fbclid=PAcGRvZgJleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAac9kQJA2x18zR4hgDrKwTwnE6DAAm0zcQt20r27mIzQ0OD6NNJyuPnfwEWhwg_aem_c8YBH5XM6u0kOlzCvYjB8Q&af_xp=custom&pid=Partner&af_click_lookback=7d&af_reengagement_window=7d&utm_content=link_in_bio";

function DistrictLogo({ className = "w-4 h-4" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  );
}

const passes = [
  {
    id: "general",
    tier: "OFFICIAL ACCESS",
    name: "Festival Pass",
    price: "₹2,500",
    priceSuffix: "onwards",
    duration: "Single / Multi Day Options",
    color: "#e10600",
    badge: "OFFICIAL SELECTION",
    featured: true,
    features: [
      "Access to performance zones",
      "Food & beverage experiences",
      "Live racing & sound arenas",
      "Select ticket options on District",
    ],
  },
];

export default function Tickets() {
  const [countdown, setCountdown] = useState({ d: 0, h: 0, m: 0, s: 0 });

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const bgTextRef = useRef(null);

  useEffect(() => {
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

      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          {
            opacity: 0,
            y: 50,
            rotationY: -10,
            transformPerspective: 1200,
          },
          {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 88%",
            },
          }
        );
      }

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

  const handleCardMove = (e) => {
    const card = cardRef.current;
    if (!card || window.innerWidth < 768) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -4;
    const rotY = ((x - cx) / cx) * 4;

    gsap.to(card, {
      rotationX: rotX,
      rotationY: rotY,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleCardLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const pass = passes[0];

  return (
    <section
      id="tickets"
      ref={sectionRef}
      className="relative py-12 sm:py-16 md:py-20 overflow-hidden bg-black text-white font-sans"
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
          DISTRICT · ACCESS · TICKETS ·
        </span>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER & COUNTDOWN */}
        <div
          ref={headerRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-10 sm:mb-16 items-end"
        >
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-red-600/40 bg-red-600/10 text-red-500 text-xs font-semibold tracking-widest uppercase">
              <DistrictLogo className="w-3.5 h-3.5 fill-red-500" />
              Official Ticketing Partner: District
            </div>
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
                  className="border border-white/10 bg-white/[0.02] p-2 sm:p-3 text-center"
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

            <p className="text-white/50 text-[10px] sm:text-xs mt-3 font-normal">
              ⚡ Tickets strictly available via District starting from ₹2,500 onwards.
            </p>
          </div>
        </div>

        {/* SINGLE OFFICIAL TICKETING CARD */}
        <div className="max-w-xl mx-auto" style={{ perspective: "1200px" }}>
          <div
            ref={cardRef}
            onMouseMove={handleCardMove}
            onMouseLeave={handleCardLeave}
            className="group relative cursor-pointer transition-all duration-300 will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Glow Accent */}
            <div className="absolute -inset-0.5 bg-red-600/20 blur-xl opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />

            {/* Card Container */}
            <div
              className="relative flex flex-col justify-between border border-red-600/60 bg-black/80 backdrop-blur-md p-6 sm:p-8"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Card Header & Badge */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="label text-white/50 text-xs tracking-widest font-normal">
                    {pass.tier}
                  </span>
                  <span className="flex items-center gap-1.5 bg-red-600 text-white px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase">
                    <DistrictLogo className="w-3 h-3 fill-white" />
                    {pass.badge}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-4xl uppercase leading-none font-normal tracking-tight mb-2">
                  Festival of Sound & Speed
                </h3>
                <div className="label text-xs sm:text-sm text-white/40 font-normal mb-6">
                  {pass.duration}
                </div>

                {/* Price Section */}
                <div className="py-4 border-y border-white/10 mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-4xl sm:text-6xl font-normal leading-none tracking-tight text-red-600">
                      {pass.price}
                    </span>
                    <span className="text-sm sm:text-base text-white/50 font-normal">
                      {pass.priceSuffix}
                    </span>
                  </div>
                  <div className="label text-white/30 text-xs mt-1 font-normal">
                    Official live pricing on District App
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {pass.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2.5 text-xs sm:text-sm text-white/80 font-normal"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* District Action */}
              <a
                href={DISTRICT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full bg-red-600 text-white py-4 text-center font-display text-xs sm:text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 font-normal"
              >
                <DistrictLogo className="w-4 h-4" />
                Book ₹2,500 Onwards on District →
              </a>

              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-red-600 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-red-600 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* BOTTOM QUICK REDIRECT BAR */}
        <div className="mt-10 sm:mt-16 border border-white/10 bg-black/60 backdrop-blur-md p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <DistrictLogo className="w-6 h-6 text-red-600 flex-shrink-0" />
              <div>
                <div className="font-display text-base sm:text-lg uppercase tracking-tight">
                  Official Ticketing Partner: District
                </div>
                <div className="text-white/40 text-xs">
                  All pass variants, seats, and tier upgrades are managed on District.
                </div>
              </div>
            </div>

            <a
              href={DISTRICT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs uppercase tracking-widest font-display transition-colors text-center whitespace-nowrap"
            >
              Open District App →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}