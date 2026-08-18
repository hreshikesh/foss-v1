import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LogoLoop from "./LogoLoop";

gsap.registerPlugin(ScrollTrigger);

const sponsorTiers = [
  {
    label: "TITLE PARTNERS",
    bg: "bg-neutral-950",
    fadeOutColor: "#0a0a0a", // Matches bg-neutral-950
    speed: 70,
    direction: "left",
    logoHeight: 36,
    gap: 64,
    sponsors: [
      { name: "LVMH", display: "LVMH", cls: "font-serif tracking-[0.15em] font-light" },
      { name: "PIRELLI", display: "PIRELLI", cls: "font-black italic tracking-tight" },
      { name: "ARAMCO", display: "aramco", cls: "font-sans lowercase tracking-tight font-medium" },
      { name: "HEINEKEN", display: "Heineken", cls: "font-serif italic" },
      { name: "AWS", display: "aws", cls: "font-sans lowercase font-bold tracking-tight" },
      { name: "LENOVO", display: "Lenovo", cls: "font-sans font-bold" },
      { name: "DHL", display: "DHL", cls: "font-black italic tracking-widest" },
      { name: "SALESFORCE", display: "salesforce", cls: "font-sans lowercase font-semibold italic" },
    ],
  },
  {
    label: "MAJOR PARTNERS",
    bg: "bg-neutral-900",
    fadeOutColor: "#171717", // Matches bg-neutral-900
    speed: 55,
    direction: "right",
    logoHeight: 30,
    gap: 56,
    sponsors: [
      { name: "LOUIS VUITTON", display: "LOUIS VUITTON", cls: "font-serif tracking-[0.2em] font-light" },
      { name: "TAG HEUER", display: "TAG HEUER", cls: "font-serif font-bold tracking-wide" },
      { name: "MOET HENNESSY", display: "Moët Hennessy", cls: "font-serif italic font-light" },
      { name: "AMERICAN EXPRESS", display: "AMERICAN EXPRESS", cls: "font-sans font-black tracking-tight" },
      { name: "PEPSICO", display: "pepsico", cls: "font-sans lowercase font-bold italic" },
      { name: "CRYPTO.COM", display: "crypto.com", cls: "font-sans lowercase font-medium" },
      { name: "SANTANDER", display: "Santander", cls: "font-sans font-medium tracking-tight" },
      { name: "MARSH", display: "MARSH", cls: "font-sans font-black tracking-wide" },
    ],
  },
  {
    label: "OFFICIAL PARTNERS",
    bg: "bg-neutral-800/60",
    fadeOutColor: "#262626", // Matches bg-neutral-800
    speed: 60,
    direction: "left",
    logoHeight: 26,
    gap: 48,
    sponsors: [
      { name: "PWC", display: "pwc", cls: "font-serif lowercase font-bold italic" },
      { name: "NESTLE", display: "Nestlé", cls: "font-serif italic font-medium" },
      { name: "BARILLA", display: "Barilla", cls: "font-serif italic font-bold" },
      { name: "LIQUI MOLY", display: "LIQUI MOLY", cls: "font-sans font-black tracking-tight leading-none" },
      { name: "PARAMOUNT+", display: "Paramount+", cls: "font-sans font-light tracking-wide" },
      { name: "PUMA", display: "PUMA", cls: "font-sans italic font-black tracking-tight" },
      { name: "AGGREKO", display: "aggreko", cls: "font-sans lowercase font-medium" },
      { name: "T-MOBILE", display: "T·Mobile", cls: "font-sans font-bold tracking-tight" },
    ],
  },
];

export default function Sponsors() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header elements reveal
      gsap.from(".sponsor-header-el", {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Tier rows reveal
      gsap.utils.toArray(".sponsor-tier").forEach((tier, i) => {
        gsap.from(tier, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: tier,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        });
      });

      // Hashtag CTA reveal
      gsap.from(".hashtag-line", {
        opacity: 0,
        x: -60,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".hashtag-cta",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sponsors"
      className="relative border-t border-white/10 bg-black overflow-hidden scroll-mt-20"
      style={{
        paddingTop: "clamp(60px, 10vw, 100px)",
        paddingBottom: "clamp(60px, 10vw, 128px)",
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-0 pointer-events-none opacity-[0.04] z-0"
        style={{
          width: "50vw",
          height: "50vw",
          background: "radial-gradient(circle, rgba(225,6,0,1) 0%, transparent 70%)",
          transform: "translate(-20%, -20%)",
        }}
      />

      {/* ── HEADER ── */}
      <div
        className="relative z-10 max-w-[1600px] mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
        style={{
          paddingLeft: "clamp(16px, 4vw, 40px)",
          paddingRight: "clamp(16px, 4vw, 40px)",
          marginBottom: "clamp(40px, 6vw, 72px)",
        }}
      >
        <div className="flex items-center gap-3 sm:gap-5">
          {/* FOSS mark */}
          <div className="sponsor-header-el relative flex-shrink-0">
            <div
              className="border-2 border-accent flex items-center justify-center font-display font-black text-accent"
              style={{
                width: "clamp(48px, 6vw, 72px)",
                height: "clamp(48px, 6vw, 72px)",
                fontSize: "clamp(18px, 2.5vw, 28px)",
              }}
            >
              F
            </div>
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-accent" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-accent" />
          </div>

          <div className="min-w-0">
            <div
              className="sponsor-header-el label text-accent mb-1 sm:mb-2 flex items-center gap-2"
              style={{ fontSize: "clamp(9px, 1.1vw, 11px)" }}
            >
              <span className="w-4 sm:w-6 h-px bg-accent" />
              FOSS × Partners
            </div>
            <h2
              className="sponsor-header-el font-display uppercase leading-[0.85] font-black tracking-tight"
              style={{ fontSize: "clamp(28px, 6vw, 84px)", letterSpacing: "-0.03em" }}
            >
              Our <span className="text-accent italic">Partners</span>
            </h2>
          </div>
        </div>

        <a
          href="#partners-all"
          data-hover
          className="sponsor-header-el group inline-flex items-center gap-2 text-white hover:text-accent transition-colors flex-shrink-0 self-start sm:self-end"
          style={{ fontSize: "clamp(11px, 1.3vw, 14px)" }}
        >
          <span className="font-semibold">View all</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </a>
      </div>

      {/* ── TIERS WITH LOGO LOOP ── */}
      {sponsorTiers.map((tier, tierIdx) => {
        // Map sponsor array to LogoLoop compatible React nodes
        const formattedLogos = tier.sponsors.map((s) => ({
          title: s.name,
          node: (
            <span
              className={`${s.cls} text-white/70 hover:text-white transition-all duration-300 whitespace-nowrap cursor-pointer inline-block`}
              style={{
                fontSize:
                  tierIdx === 0
                    ? "clamp(18px, 2.2vw, 30px)"
                    : tierIdx === 1
                    ? "clamp(16px, 1.8vw, 24px)"
                    : "clamp(14px, 1.5vw, 20px)",
              }}
              data-hover
              data-cursor-text="VISIT"
            >
              {s.display}
            </span>
          ),
        }));

        return (
          <div key={tier.label} className={`sponsor-tier relative ${tier.bg} py-6 sm:py-8`}>
            {/* Tier label */}
            <div
              className="max-w-[1600px] mx-auto mb-4 sm:mb-6"
              style={{
                paddingLeft: "clamp(16px, 4vw, 40px)",
                paddingRight: "clamp(16px, 4vw, 40px)",
              }}
            >
              <div className="flex items-center gap-2">
                <span className="w-4 sm:w-6 h-px bg-white/25" />
                <span
                  className="label text-white/40 font-mono tracking-[0.25em]"
                  style={{ fontSize: "clamp(8px, 0.95vw, 10px)" }}
                >
                  {tier.label}
                </span>
              </div>
            </div>

            {/* Infinite LogoLoop marquee */}
            <div
              className="max-w-[1600px] mx-auto"
              style={{
                paddingLeft: "clamp(16px, 4vw, 40px)",
                paddingRight: "clamp(16px, 4vw, 40px)",
              }}
            >
              <LogoLoop
                logos={formattedLogos}
                speed={tier.speed}
                direction={tier.direction}
                logoHeight={tier.logoHeight}
                gap={tier.gap}
                hoverSpeed={0}
                scaleOnHover
                fadeOut
                fadeOutColor={tier.fadeOutColor}
                ariaLabel={tier.label}
              />
            </div>
          </div>
        );
      })}

      {/* ── HASHTAG CTA ── */}
      <div
        className="hashtag-cta relative z-10 max-w-[1600px] mx-auto"
        style={{
          paddingLeft: "clamp(16px, 4vw, 40px)",
          paddingRight: "clamp(16px, 4vw, 40px)",
          marginTop: "clamp(48px, 8vw, 96px)",
        }}
      >
        <div className="border-t border-white/10 pt-8 sm:pt-12 md:pt-16">
          <h3
            className="font-display uppercase leading-[0.9] font-black tracking-tight"
            style={{
              fontSize: "clamp(28px, 5.5vw, 72px)",
              letterSpacing: "-0.02em",
            }}
          >
            <div className="hashtag-line">
              TAG <span className="text-accent">#FOSS2026</span>
            </div>
            <div className="hashtag-line">TO FEATURE ON OUR PAGE</div>
          </h3>

          <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
            <div>
              <div
                className="label text-white/40 mb-1 font-mono tracking-widest"
                style={{ fontSize: "clamp(9px, 1.1vw, 10px)" }}
              >
                PARTNERSHIP INQUIRIES
              </div>
              <p
                className="text-white/70"
                style={{ fontSize: "clamp(12px, 1.4vw, 14px)" }}
              >
                Want to power the movement? Let's build something loud.
              </p>
            </div>

            <a
              href="mailto:partners@foss.in"
              data-hover
              className="group inline-flex items-center gap-3 border border-white/20
                hover:border-accent hover:bg-accent hover:text-black
                transition-all duration-300 font-display uppercase tracking-wider font-bold
                text-white whitespace-nowrap self-start sm:self-auto"
              style={{
                padding: "clamp(12px, 1.5vw, 16px) clamp(20px, 3vw, 32px)",
                fontSize: "clamp(10px, 1.2vw, 12px)",
              }}
            >
              <span>partners@foss.in</span>
              <span className="group-hover:translate-x-1 transition-transform">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}