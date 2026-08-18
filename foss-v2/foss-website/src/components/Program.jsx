import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const data = {
  "Day 01": {
    date: "05 · DEC",
    title: "The Ignition",
    theme: "Experience the Rush",
    events: [
      { time: "10:00", event: "Opening Ceremony", stage: "Main Stage", type: "Ceremony", duration: "60min", img: "/placeholder.png" },
      { time: "11:00", event: "Drift Show", stage: "Arena", type: "Motorsport", duration: "60min", img: "/placeholder.png" },
      { time: "12:00", event: "FMX Performance", stage: "Ramp", type: "Freestyle", duration: "60min", img: "/placeholder.png" },
      { time: "13:00", event: "Supercar Showcase", stage: "Display", type: "Display", duration: "90min", img: "/placeholder.png" },
      { time: "14:30", event: "College Band Battle", stage: "Stage B", type: "Music", duration: "150min", img: "/placeholder.png" },
      { time: "17:00", event: "Evening Live Set", stage: "Main Stage", type: "Music", duration: "90min", img: "/placeholder.png" },
      { time: "18:30", event: "Drift Taxi", stage: "Track", type: "Experience", duration: "60min", img: "/placeholder.png" },
      { time: "19:30", event: "Wheelie Show", stage: "Arena", type: "Motorsport", duration: "60min", img: "/placeholder.png" },
      { time: "20:30", event: "Band Finals", stage: "Stage B", type: "Music", duration: "60min", img: "/placeholder.png" },
      { time: "21:30", event: "Celebrity Set", stage: "Main Stage", type: "Headliner", duration: "90min", img: "/placeholder.png" },
    ],
  },
  "Day 02": {
    date: "06 · DEC",
    title: "The Legacy",
    theme: "Feel the Roar",
    events: [
      { time: "10:00", event: "Drift Show", stage: "Arena", type: "Motorsport", duration: "60min", img: "/placeholder.png" },
      { time: "11:00", event: "FMX Performance", stage: "Ramp", type: "Freestyle", duration: "60min", img: "/placeholder.png" },
      { time: "12:00", event: "Supercar Showcase", stage: "Display", type: "Display", duration: "90min", img: "/placeholder.png" },
      { time: "13:30", event: "College Band Comp.", stage: "Stage B", type: "Music", duration: "150min", img: "/placeholder.png" },
      { time: "16:00", event: "Evening Live Set", stage: "Main Stage", type: "Music", duration: "120min", img: "/placeholder.png" },
      { time: "18:30", event: "Drift Taxi", stage: "Track", type: "Experience", duration: "60min", img: "/placeholder.png" },
      { time: "19:30", event: "Wheelie Show", stage: "Arena", type: "Motorsport", duration: "60min", img: "/placeholder.png" },
      { time: "20:30", event: "Grand Finals", stage: "Stage B", type: "Music", duration: "60min", img: "/placeholder.png" },
      { time: "21:30", event: "Headline Act", stage: "Main Stage", type: "Headliner", duration: "60min", img: "/placeholder.png" },
      { time: "22:00", event: "Closing", stage: "Main Stage", type: "Ceremony", duration: "30min", img: "/placeholder.png" },
    ],
  },
};

const typeColors = {
  Motorsport: "#e10600",
  Freestyle: "#ff6b00",
  Music: "#00b4ff",
  Display: "#a855f7",
  Experience: "#facc15",
  Ceremony: "#ffffff",
  Headliner: "#e10600",
};

export default function Program() {
  const [active, setActive] = useState("Day 01");
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const rowsRef = useRef([]);
  const bgLayersRef = useRef([]);
  const currentBgIndex = useRef(-1);

  // ============ SCROLL ANIMATIONS ============
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".header-cascade", {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // ============ ROW ANIMATIONS ON TAB CHANGE ============
  useEffect(() => {
    const ctx = gsap.context(() => {
      rowsRef.current.forEach((row, i) => {
        if (!row) return;
        gsap.fromTo(
          row,
          { opacity: 0, x: -80, skewY: 4 },
          {
            opacity: 1,
            x: 0,
            skewY: 0,
            duration: 0.9,
            delay: i * 0.05,
            ease: "expo.out",
            scrollTrigger: {
              trigger: row,
              start: "top 92%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [active]);

  // ============ BACKGROUND IMAGE SWAP ============
  useEffect(() => {
    if (hoveredIndex === null) {
      bgLayersRef.current.forEach((layer) => {
        if (!layer) return;
        gsap.to(layer, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.7,
          ease: "power3.inOut",
        });
      });
      currentBgIndex.current = -1;
      return;
    }

    const targetLayer = bgLayersRef.current[hoveredIndex];
    const previousLayer = bgLayersRef.current[currentBgIndex.current];

    if (targetLayer) {
      gsap.set(targetLayer, { zIndex: 2 });
      gsap.fromTo(
        targetLayer,
        { clipPath: "inset(0 0 100% 0)", scale: 1.15 },
        {
          clipPath: "inset(0 0 0% 0)",
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
        }
      );

      if (previousLayer && previousLayer !== targetLayer) {
        gsap.set(previousLayer, { zIndex: 1 });
      }
      currentBgIndex.current = hoveredIndex;
    }
  }, [hoveredIndex]);

  const currentDay = data[active];
  const hoveredEvent =
    hoveredIndex !== null ? currentDay.events[hoveredIndex] : null;
  const activeColor = hoveredEvent ? typeColors[hoveredEvent.type] : "#e10600";

  return (
    <section
      id="program"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-white/8 bg-black"
      style={{
        paddingTop: "clamp(60px, 12vw, 160px)",
        paddingBottom: "clamp(60px, 12vw, 160px)",
        minHeight: "100svh",
      }}
    >
      {/* ============ BACKGROUND IMAGE LAYERS ============ */}
      <div className="absolute inset-0 pointer-events-none">
        {currentDay.events.map((item, i) => (
          <div
            key={`bg-${active}-${i}`}
            ref={(el) => (bgLayersRef.current[i] = el)}
            className="absolute inset-0 will-change-transform"
            style={{
              clipPath: "inset(0 0 100% 0)",
              zIndex: 1,
            }}
          >
            <img
              src={item.img}
              alt=""
              className="w-full h-full object-cover"
              draggable={false}
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/70" />
            <div
              className="absolute inset-0 mix-blend-multiply opacity-30"
              style={{ backgroundColor: typeColors[item.type] }}
            />
          </div>
        ))}
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-[4]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* ============ MAIN CONTENT ============ */}
      <div
        className="relative z-10 max-w-[1400px] mx-auto"
        style={{
          paddingLeft: "clamp(16px, 4vw, 40px)",
          paddingRight: "clamp(16px, 4vw, 40px)",
        }}
      >
        {/* ============ HEADER ============ */}
        <div
          ref={headerRef}
          className="grid grid-cols-12 gap-6"
          style={{
            marginBottom: "clamp(40px, 8vw, 80px)",
          }}
        >
          <div className="col-span-12 md:col-span-8">
        
            <h2
              className="header-cascade font-display uppercase leading-[0.9]"
              style={{
                fontSize: "clamp(38px, 8vw, 110px)",
                letterSpacing: "-0.02em",
              }}
            >
              48 Hours
              <br />
              <span className="text-white/25">Non-Stop</span>
            </h2>
          </div>

          <div className="col-span-12 md:col-span-4 md:text-right flex flex-col justify-end">
            <p
              className="header-cascade text-white/70 leading-relaxed max-w-xs md:ml-auto mb-5 sm:mb-6"
              style={{ fontSize: "clamp(12px, 1.5vw, 14px)" }}
            >
              Every hour a new hit of adrenaline. From opening throttle to the
              final chord.
            </p>
            <div
              className="header-cascade flex md:justify-end"
              style={{ gap: "clamp(20px, 4vw, 40px)" }}
            >
              <div>
                <div
                  className="font-display leading-none"
                  style={{ fontSize: "clamp(22px, 3.5vw, 42px)" }}
                >
                  {data["Day 01"].events.length + data["Day 02"].events.length}
                </div>
                <div
                  className="label mt-1"
                  style={{ fontSize: "clamp(9px, 1.1vw, 11px)" }}
                >
                  Events
                </div>
              </div>
              <div>
                <div
                  className="font-display leading-none"
                  style={{ fontSize: "clamp(22px, 3.5vw, 42px)" }}
                >
                  6
                </div>
                <div
                  className="label mt-1"
                  style={{ fontSize: "clamp(9px, 1.1vw, 11px)" }}
                >
                  Stages
                </div>
              </div>
              <div>
                <div
                  className="font-display leading-none"
                  style={{
                    fontSize: "clamp(22px, 3.5vw, 42px)",
                    color: activeColor,
                    transition: "color 0.5s ease",
                  }}
                >
                  48h
                </div>
                <div
                  className="label mt-1"
                  style={{ fontSize: "clamp(9px, 1.1vw, 11px)" }}
                >
                  Runtime
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============ DAY SWITCHER ============ */}
        <div
          className="grid grid-cols-12 gap-4 border-b border-white/15 pb-1"
          style={{ marginBottom: "clamp(32px, 6vw, 60px)" }}
        >
          <div className="col-span-12 md:col-span-8 flex relative overflow-x-auto scrollbar-hide">
            {Object.keys(data).map((d) => {
              const dayData = data[d];
              const isActive = active === d;
              return (
                <button
                  key={d}
                  onClick={() => setActive(d)}
                  data-hover
                  className={`group relative text-left transition-all duration-500 flex-shrink-0 ${
                    isActive ? "opacity-100" : "opacity-40 hover:opacity-70"
                  }`}
                  style={{
                    paddingLeft: "clamp(12px, 2vw, 16px)",
                    paddingRight: "clamp(20px, 4vw, 40px)",
                    paddingTop: "clamp(12px, 2vw, 24px)",
                    paddingBottom: "clamp(12px, 2vw, 24px)",
                  }}
                >
                  <div className="flex items-baseline gap-2 sm:gap-3">
                    <div
                      className="label transition-colors"
                      style={{
                        color: isActive
                          ? activeColor
                          : "rgba(255,255,255,0.4)",
                        fontSize: "clamp(9px, 1.2vw, 11px)",
                      }}
                    >
                      {dayData.date}
                    </div>
                    <div
                      className="font-display uppercase text-white"
                      style={{ fontSize: "clamp(16px, 2.5vw, 26px)" }}
                    >
                      {d}
                    </div>
                  </div>
                  <div
                    className={`mt-1 transition-colors ${
                      isActive ? "text-white/70" : "text-white/30"
                    }`}
                    style={{ fontSize: "clamp(10px, 1.2vw, 12px)" }}
                  >
                    {dayData.theme}
                  </div>
                  {isActive && (
                    <div
                      className="absolute -bottom-[1px] left-0 right-0 transition-colors"
                      style={{
                        backgroundColor: activeColor,
                        height: "clamp(2px, 0.3vw, 3px)",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="col-span-12 md:col-span-4 md:text-right hidden md:flex md:justify-end items-center pb-2">
            <div
              className="flex items-center gap-3 label text-white/60"
              style={{ fontSize: "clamp(9px, 1.1vw, 11px)" }}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: activeColor }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ backgroundColor: activeColor }}
                />
              </span>
              <span>
                {currentDay.events.length} EVENTS ·{" "}
                {currentDay.title.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* ============ EVENTS LIST ============ */}
        <div className="relative">
          {currentDay.events.map((item, i) => {
            const isHovered = hoveredIndex === i;
            const otherHovered =
              hoveredIndex !== null && hoveredIndex !== i;
            const typeColor = typeColors[item.type];

            return (
              <div
                key={`${active}-${i}`}
                ref={(el) => (rowsRef.current[i] = el)}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative border-b border-white/15 cursor-pointer overflow-hidden"
                data-hover
              >
                {/* LEFT ACCENT LINE */}
                <div
                  className="absolute left-0 top-0 bottom-0 transition-transform duration-500 origin-center"
                  style={{
                    width: "clamp(2px, 0.3vw, 3px)",
                    backgroundColor: typeColor,
                    transform: isHovered ? "scaleY(1)" : "scaleY(0)",
                  }}
                />

                {/* ROW CONTENT */}
                <div
                  className={`relative grid grid-cols-12 items-center transition-all duration-700 ${
                    otherHovered ? "opacity-20" : "opacity-100"
                  }`}
                  style={{
                    paddingTop: "clamp(14px, 2vw, 24px)",
                    paddingBottom: "clamp(14px, 2vw, 24px)",
                    paddingLeft: isHovered
                      ? "clamp(20px, 3vw, 56px)"
                      : "0px",
                    gap: "clamp(8px, 1.5vw, 16px)",
                    transition: "padding 0.7s ease, opacity 0.7s ease",
                  }}
                >
                  {/* Time */}
                  <div className="col-span-2 md:col-span-1 flex flex-col min-w-0">
                    <span
                      className="font-mono transition-colors duration-500"
                      style={{
                        color: isHovered
                          ? typeColor
                          : "rgba(255,255,255,0.5)",
                        fontSize: "clamp(10px, 1.3vw, 14px)",
                      }}
                    >
                      {item.time}
                    </span>
                    <span
                      className="font-mono text-white/30 mt-0.5"
                      style={{ fontSize: "clamp(8px, 0.9vw, 10px)" }}
                    >
                      {item.duration}
                    </span>
                  </div>

                  {/* Index */}
                  <span
                    className="col-span-1 font-mono text-white/25 hidden md:inline"
                    style={{ fontSize: "clamp(10px, 1.1vw, 12px)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Event name */}
                  <div className="col-span-7 md:col-span-7 min-w-0">
                    <div
                      className="font-display uppercase transition-all duration-500 leading-[0.95]"
                      style={{
                        fontSize: isHovered
                          ? "clamp(20px, 5vw, 64px)"
                          : "clamp(15px, 2.5vw, 30px)",
                        color: isHovered
                          ? "#ffffff"
                          : "rgba(255,255,255,0.9)",
                      }}
                    >
                      {item.event}
                    </div>
                    {/* Type tag */}
                    <div
                      className="overflow-hidden transition-all duration-500"
                      style={{
                        maxHeight: isHovered ? "32px" : "0px",
                        marginTop: isHovered ? "12px" : "0px",
                        opacity: isHovered ? 1 : 0,
                      }}
                    >
                      <span
                        className="inline-block label px-2 py-0.5 border backdrop-blur-md"
                        style={{
                          color: typeColor,
                          borderColor: `${typeColor}60`,
                          backgroundColor: `${typeColor}20`,
                          fontSize: "clamp(8px, 1vw, 10px)",
                        }}
                      >
                        {item.type} · {item.stage}
                      </span>
                    </div>
                  </div>

                  {/* Stage — hidden on hover */}
                  <div className="col-span-2 md:col-span-2 text-right min-w-0">
                    <div
                      className="label transition-all duration-500 truncate"
                      style={{
                        color: isHovered
                          ? "transparent"
                          : "rgba(255,255,255,0.5)",
                        fontSize: "clamp(9px, 1.1vw, 11px)",
                      }}
                    >
                      {item.stage}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="col-span-1 flex justify-end">
                    <div
                      className="transition-all duration-500"
                      style={{
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered
                          ? "translateX(0)"
                          : "translateX(-16px)",
                        color: typeColor,
                        fontSize: "clamp(16px, 2vw, 22px)",
                      }}
                    >
                      →
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ============ FOOTER META ============ */}
        <div
          className="pt-6 sm:pt-8 border-t border-white/15 grid grid-cols-12 gap-6"
          style={{ marginTop: "clamp(48px, 8vw, 80px)" }}
        >
          <div className="col-span-12 md:col-span-6">
            <p
              className="font-display uppercase leading-tight text-white/70"
              style={{ fontSize: "clamp(18px, 3vw, 32px)" }}
            >
              Schedule subject to
              <br />
              <span
                className="italic"
                style={{
                  color: activeColor,
                  transition: "color 0.5s ease",
                }}
              >
                glorious chaos.
              </span>
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 md:text-right space-y-2">
            <div
              className="label text-white/50"
              style={{ fontSize: "clamp(9px, 1.1vw, 11px)" }}
            >
              Times in IST
            </div>
            <div
              className="label text-white/50"
              style={{ fontSize: "clamp(9px, 1.1vw, 11px)" }}
            >
              Full lineup drops November 2026
            </div>
          </div>
        </div>
      </div>

      {/* Scrollbar hide utility */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}