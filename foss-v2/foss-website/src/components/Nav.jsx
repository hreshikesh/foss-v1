import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

const navItems = [
  { label: "Story", href: "#story" },
  { label: "Experience", href: "#experience" },
  { label: "Program", href: "#program" },
   { label: "Tickets", href: "#tickets" },
  { label: "Reels", href: "#reels" },
  
  { label: "Venue", href: "#venue" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hidden, setHidden] = useState(false); // ✅ hide-on-scroll-down

  const mobileMenuRef = useRef(null);
  const lastScrollY = useRef(0);

  // ── SCROLL DETECTION ──────────────────────────────────────
  useEffect(() => {
    let rafId;

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY;

        setScrolled(y > 60);

        // ✅ Hide on scroll down, show on scroll up (only after threshold)
        if (y > 200) {
          setHidden(y > lastScrollY.current);
        } else {
          setHidden(false);
        }
        lastScrollY.current = y;

        // Progress
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? (y / totalHeight) * 100 : 0;
        setScrollProgress(Math.min(100, Math.max(0, progress)));

        // Active section — check midpoint of viewport
        const viewportMid = window.innerHeight / 2;
        let current = "";
        for (const item of navItems) {
          try {
            const el = document.querySelector(item.href);
            if (!el) continue;
            const rect = el.getBoundingClientRect();
            if (rect.top <= viewportMid && rect.bottom > viewportMid) {
              current = item.href;
              break;
            }
          } catch { /* ignore bad selector */ }
        }
        setActiveSection(current);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // ── LOCK BODY SCROLL ──────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // ── CLOSE ON ESC ──────────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ── MOBILE MENU GSAP ANIMATIONS ───────────────────────────
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    const ctx = gsap.context(() => {
      if (menuOpen) {
        const tl = gsap.timeline();
        tl.to(mobileMenuRef.current, {
          clipPath: "inset(0 0 0% 0)",
          duration: 0.6,
          ease: "power4.inOut",
        })
        .fromTo(".mobile-menu-item",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power3.out" },
          "-=0.2"
        )
        .fromTo(".mobile-menu-footer",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          "-=0.2"
        );
      } else {
        gsap.to(mobileMenuRef.current, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.5,
          ease: "power4.inOut",
        });
      }
    });

    return () => ctx.revert();
  }, [menuOpen]);

  // ── SMOOTH SCROLL TO SECTION (FIXED) ──────────────────────
  /*
    Why the old version failed:
    1. `setTimeout(150)` fired before Lenis / smooth-scroll had a chance —
       the target el sometimes hadn't rendered yet.
    2. `scrollIntoView` doesn't respect the fixed nav's height, so the
       section title got covered by the nav.
    3. On some pages the id was `story` but you queried `#story` inside
       a shadow-root or dynamically mounted node.

    Fix:
    - Wait for menu-close animation frame, then double-rAF to guarantee
      layout is committed.
    - Compute manual scroll offset using `getBoundingClientRect().top +
      window.scrollY - navHeight` so the section title lands *below* nav.
    - Support both Lenis (if present) and native `window.scrollTo`.
  */
  const handleNavClick = useCallback((href) => {
    const doScroll = () => {
      const el = document.querySelector(href);
      if (!el) {
        console.warn(`[Nav] No element found for ${href}`);
        return;
      }

      const navHeight = 80; // approx nav height + small breathing room
      const targetY = el.getBoundingClientRect().top + window.scrollY - navHeight;

      // ✅ If Lenis is on window, use it — otherwise fall back to native
      if (window.lenis?.scrollTo) {
        window.lenis.scrollTo(targetY, { duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 3) });
      } else {
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }

      // Update URL hash without triggering jump
      history.replaceState(null, "", href);
      setActiveSection(href);
    };

    if (menuOpen) {
      setMenuOpen(false);
      // Wait for close animation, then two rAFs to guarantee layout is settled
      setTimeout(() => {
        requestAnimationFrame(() => requestAnimationFrame(doScroll));
      }, 550); // matches clipPath close duration
    } else {
      doScroll();
    }
  }, [menuOpen]);

  return (
    <>
      {/* ── MAIN NAV ─────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-out
          ${hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"}
          ${scrolled || menuOpen
            ? "bg-black/85 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent border-b border-transparent"
          }`}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        {/* Scroll Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 overflow-hidden">
          <div
            className="h-full bg-accent origin-left will-change-transform"
            style={{
              transform: `scaleX(${scrollProgress / 100})`,
              transition: "transform 100ms linear",
            }}
          />
        </div>

        <div className="px-4 sm:px-6 md:px-10 py-3.5 md:py-4 flex justify-between items-center gap-4">
          {/* ── LOGO ── */}
          <a
            href="#top"
            className="flex items-center gap-2 flex-shrink-0 group"
            data-hover
            onClick={(e) => {
              e.preventDefault();
              if (window.lenis?.scrollTo) window.lenis.scrollTo(0);
              else window.scrollTo({ top: 0, behavior: "smooth" });
              setActiveSection("");
            }}
          >
            <div className="relative w-8 h-8 border border-white/60 group-hover:border-accent
              flex items-center justify-center text-xs font-bold transition-colors overflow-hidden">
              <span className="transition-transform duration-500 group-hover:-translate-y-full">F</span>
              <span className="absolute transition-transform duration-500 translate-y-full
                group-hover:translate-y-0 text-accent">F</span>
            </div>
            <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] sm:tracking-[0.3em] uppercase">
              FOSS
            </span>
          </a>

          {/* ── DESKTOP MENU ── */}
          <ul className="hidden lg:flex gap-8 xl:gap-10 items-center label">
            {navItems.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                    data-hover
                    className={`relative py-2 transition-colors duration-300 text-xs
                      ${isActive ? "text-white" : "text-white/50 hover:text-white"}`}
                  >
                    {item.label}
                    {/* Active underline */}
                    <span
                      className={`absolute -bottom-1 left-0 right-0 h-[2px] bg-accent
                        transition-transform duration-300 origin-left
                        ${isActive ? "scale-x-100" : "scale-x-0"}`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* ── RIGHT ── */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="#tickets"
              onClick={(e) => { e.preventDefault(); handleNavClick("#tickets"); }}
              data-hover
              className="hidden sm:inline-flex items-center gap-1.5 label border border-white/25
                px-4 py-2.5 hover:bg-accent hover:text-black hover:border-accent
                transition-all duration-300 text-[10px] group"
            >
              <span>Get Pass</span>
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </a>

            {/* ── HAMBURGER ── */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              data-hover
              aria-expanded={menuOpen}
              aria-label="Toggle navigation menu"
              className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-[110]"
            >
              <span
                className={`block w-6 h-[1.5px] bg-white transition-all duration-500 origin-center
                  ${menuOpen ? "rotate-45 translate-y-[3.5px]" : ""}`}
              />
              <span
                className={`block w-6 h-[1.5px] bg-white transition-all duration-500 origin-center
                  ${menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE FULLSCREEN MENU ───────────────────────────── */}
      <div
        ref={mobileMenuRef}
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-[90] bg-black lg:hidden overflow-y-auto
          ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        style={{
          clipPath: "inset(0 0 100% 0)",
          paddingTop: "env(safe-area-inset-top)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none opacity-40"
          style={{ background: "radial-gradient(circle at 80% 20%, rgba(225,6,0,0.15) 0%, transparent 50%)" }}
        />
        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative min-h-full flex flex-col justify-between px-6 pt-24 pb-8">
          {/* MENU ITEMS */}
          <div className="flex-1 flex flex-col justify-center py-8">
            <div className="label text-accent mb-6 flex items-center gap-3">
              <span className="w-6 h-px bg-accent" />
              Menu
            </div>

            <nav>
              <ul className="space-y-1">
                {navItems.map((item, i) => {
                  const isActive = activeSection === item.href;
                  return (
                    <li key={item.label}
                      className="mobile-menu-item overflow-hidden border-b border-white/[0.08]">
                      <a
                        href={item.href}
                        onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                        className="group flex items-center justify-between py-4 sm:py-5"
                      >
                        <div className="flex items-baseline gap-4">
                          <span className="font-mono text-xs text-white/25">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={`font-display text-4xl sm:text-5xl uppercase leading-none
                              transition-colors duration-300
                              ${isActive ? "text-accent" : "text-white group-hover:text-accent"}`}
                          >
                            {item.label}
                          </span>
                        </div>
                        <span
                          className={`text-2xl transition-all duration-500
                            ${isActive
                              ? "text-accent translate-x-0 opacity-100"
                              : "text-white/40 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                            }`}
                        >
                          →
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* FOOTER */}
          <div className="mobile-menu-footer space-y-6 pt-8 border-t border-white/10">
            <a
              href="#tickets"
              onClick={(e) => { e.preventDefault(); handleNavClick("#tickets"); }}
              className="block bg-accent text-black text-center py-4 font-display
                text-lg uppercase tracking-wider hover:bg-white transition-colors"
            >
              Get Your Pass →
            </a>

            <div className="grid grid-cols-2 gap-4 label text-white/40">
              <div>
                <div className="text-white/25 mb-1">Date</div>
                <div className="text-white">05·06 DEC 2026</div>
              </div>
              <div className="text-right">
                <div className="text-white/25 mb-1">Location</div>
                <div className="text-white">Bengaluru, IN</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
              <div className="flex gap-4 label">
                <a href="https://instagram.com/foss.in" target="_blank" rel="noreferrer"
                  className="text-white/50 hover:text-accent transition">Instagram ↗</a>
                <a href="#" className="text-white/50 hover:text-accent transition">YouTube ↗</a>
              </div>
              <div className="label text-white/25">© 2026</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}