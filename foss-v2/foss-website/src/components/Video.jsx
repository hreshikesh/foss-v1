import { useRef, useState, useEffect } from "react";
import logoSquareDark from "../assets/svg/logo-square-dark.svg";
import logoLargeWhite from "../assets/svg/logo-large-white.svg";

const demoVideos = [
  {
    id: 1,
    title: "The next chapter",
    instagramUrl: "https://www.instagram.com/reel/DdjWgPzv0JZ/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
    poster: logoLargeWhite,
    videoUrl: "https://res.cloudinary.com/k4uklwi4/video/upload/v1790577078/3991132667801191001_grjfqd.mp4",
  },
  {
    id: 2,
    title: "Hit The Gym With Power",
    instagramUrl: "https://www.instagram.com/reel/DcG-GD8TeOE/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
    poster: logoLargeWhite,
    videoUrl: "https://res.cloudinary.com/k4uklwi4/video/upload/v1790577102/3965129617379812228_w9o2u6.mp4",
  },
  {
    id: 3,
    title: "Gym Motivation",
    instagramUrl: "https://www.instagram.com/reel/Dcv8icKSEhz/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
    poster: logoLargeWhite,
    videoUrl: "https://res.cloudinary.com/k4uklwi4/video/upload/v1790577076/3976663245481592947_rnjrdd.mp4",
  },
  {
    id: 4,
    title: "Weight vs Cardio",
    instagramUrl: "https://www.instagram.com/reel/Ddb2zGnvdV7/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
    poster: logoLargeWhite,
    videoUrl: "https://res.cloudinary.com/k4uklwi4/video/upload/v1790577074/3989022901280822651_hfrbec.mp4",
  },
  {
    id: 5,
    title: "Raw Engine Sound",
    instagramUrl: "https://www.instagram.com/reel/DcoHJcbvUVd/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
    poster: logoLargeWhite,
    videoUrl: "https://res.cloudinary.com/k4uklwi4/video/upload/v1790577072/3974458106485491037_o2rtmo.mp4",
  },
  {
    id: 6,
    title: "Track Day Rush",
    instagramUrl: "https://www.instagram.com/reel/DcBljYDPAq0/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
    poster: logoLargeWhite,
    videoUrl: "https://res.cloudinary.com/k4uklwi4/video/upload/v1790577066/3544238_0_unfr0b.mp4",
  },
  {
    id: 7,
    title: "Apex Cornering",
    instagramUrl: "https://www.instagram.com/reel/Db5wkXbTqWJ/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
    poster: logoLargeWhite,
    videoUrl: "https://res.cloudinary.com/k4uklwi4/video/upload/v1790577060/2511782_0_ch8htz.mp4",
  },
  {
    id: 8,
    title: "Night Cruise",
    instagramUrl: "https://www.instagram.com/reel/Db8dM4bveWo/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
    poster: logoLargeWhite,
    videoUrl: "https://res.cloudinary.com/k4uklwi4/video/upload/v1790577058/9542877_0_lt8a7m.mp4",
  },
  {
    id: 9,
    title: "Paddock Vibe",
    instagramUrl: "https://www.instagram.com/reel/Db3Vu9ZToWi/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
    poster: logoLargeWhite,
    videoUrl: "https://res.cloudinary.com/k4uklwi4/video/upload/v1790577058/3535118_0_kkm55x.mp4",
  },
  {
    id: 10,
    title: "Speed Beast",
    instagramUrl: "https://www.instagram.com/reel/Db-90mhPvAE/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
    poster: logoLargeWhite,
    videoUrl: "https://res.cloudinary.com/k4uklwi4/video/upload/v1790577057/2405481_0_fekzil.mp4",
  },
];

function VideoCard({ item, activePlayingId, setActivePlayingId }) {
  const videoRef = useRef(null);
  const isPlaying = activePlayingId === item.id;

  useEffect(() => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.muted = false;
      videoRef.current
        .play()
        .catch((error) => {
          console.warn("Unmuted autoplay restricted by browser policies:", error);
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch((err) => {
              console.error("Playback failed completely:", err);
              setActivePlayingId(null);
            });
          }
        });
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isPlaying, setActivePlayingId]);

  return (
    <div
      className="flex-shrink-0 snap-center w-[240px] sm:w-[280px] bg-[#121212] rounded-2xl p-3 sm:p-4 flex flex-col justify-between border border-white/5 hover:border-white/20 transition-all duration-300 group cursor-pointer"
      onMouseEnter={() => setActivePlayingId(item.id)}
      onMouseLeave={() => setActivePlayingId(null)}
      onClick={() => setActivePlayingId(isPlaying ? null : item.id)}
    >
      <div className="relative w-full aspect-[9/16] rounded-xl overflow-hidden bg-neutral-900 flex items-center justify-center">
        {/* Top Left Logo Overlay */}
        <div className="absolute top-3 left-3 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-black/40 backdrop-blur-md p-1 border border-white/10 shadow-md pointer-events-none">
          <img
            src={logoSquareDark}
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Cover Poster overlay */}
        <div
          className={`absolute inset-0 z-10 flex items-center justify-center p-6 bg-neutral-900 transition-opacity duration-300 pointer-events-none ${
            isPlaying ? "opacity-0" : "opacity-100"
          }`}
        >
          <img
            src={logoLargeWhite}
            alt="Logo Cover"
            className="w-32 sm:w-40 max-h-24 object-contain opacity-80"
          />
        </div>

        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          loop
          disablePictureInPicture
          controlsList="nodownload no-out-of-picture"
          preload="metadata"
          onEnded={() => setActivePlayingId(null)}
        >
          <source src={item.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="mt-4 px-1">
        <h3 className="text-white font-medium text-sm sm:text-base line-clamp-1 mb-2">
          {item.title}
        </h3>

        <div className="flex items-center justify-between gap-2 border-t border-white/5 pt-2">
          <a
            href={item.instagramUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram Profile"
            className="text-white/70 hover:text-accent transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>

          <a
            href={item.instagramUrl}
            target="_blank"
            rel="noreferrer"
            data-hover
            onClick={(e) => e.stopPropagation()}
            className="text-accent hover:underline text-xs sm:text-sm font-medium inline-flex items-center gap-1 transition-opacity hover:opacity-80"
          >
            Watch on Instagram →
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Video() {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activePlayingId, setActivePlayingId] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const handleScroll = () => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const cardWidth = container.children[0]?.clientWidth || 280;
    const gap = 16;
    const currentIndex = Math.round(container.scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(Math.max(currentIndex, 0), demoVideos.length - 1));
  };

  const scrollToCard = (index) => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const cardWidth = container.children[0]?.clientWidth || 280;
    const gap = 16;

    container.scrollTo({
      left: index * (cardWidth + gap),
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  const handleArrowNext = () => {
    if (activeIndex < demoVideos.length - 1) {
      scrollToCard(activeIndex + 1);
    }
  };

  const handleArrowPrev = () => {
    if (activeIndex > 0) {
      scrollToCard(activeIndex - 1);
    }
  };

  useEffect(() => {
    if (!isInView || isHovered || activePlayingId !== null) return;

    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % demoVideos.length;
      scrollToCard(nextIndex);
    }, 3500);

    return () => clearInterval(interval);
  }, [activeIndex, isInView, isHovered, activePlayingId]);

  const isAtFirst = activeIndex === 0;
  const isAtLast = activeIndex === demoVideos.length - 1;

  return (
    <section
      id="video"
      ref={sectionRef}
      className="relative bg-black py-20 px-0 sm:px-12 lg:px-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-0">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="label text-accent mb-2 flex items-center gap-3">
              <span className="w-6 h-px bg-accent" />
              <span>Highlights</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl uppercase tracking-wider text-white">
              Reels & Clips
            </h2>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs sm:text-sm font-medium self-start md:self-auto">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span>Hover or tap card to play</span>
          </div>
        </div>

        <div
          className="relative group/carousel"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left Arrow Button - Hidden on Mobile */}
          <button
            onClick={handleArrowPrev}
            disabled={isAtFirst}
            aria-label="Previous video"
            data-hover
            className={`hidden sm:flex absolute -left-6 sm:-left-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/80 backdrop-blur-md border border-white/20 items-center justify-center text-white transition-all duration-300 shadow-xl ${
              isAtFirst
                ? "opacity-30 cursor-not-allowed pointer-events-none"
                : "hover:border-accent hover:text-accent hover:bg-black"
            }`}
          >
            ←
          </button>

          {/* Right Arrow Button - Hidden on Mobile */}
          <button
            onClick={handleArrowNext}
            disabled={isAtLast}
            aria-label="Next video"
            data-hover
            className={`hidden sm:flex absolute -right-6 sm:-right-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/80 backdrop-blur-md border border-white/20 items-center justify-center text-white transition-all duration-300 shadow-xl ${
              isAtLast
                ? "opacity-30 cursor-not-allowed pointer-events-none"
                : "hover:border-accent hover:text-accent hover:bg-black"
            }`}
          >
            →
          </button>

          {/* Carousel Track */}
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none scroll-smooth pb-4 select-none snap-x snap-mandatory px-[calc(50vw-120px-1.5rem)] sm:px-0"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {demoVideos.map((item) => (
              <VideoCard
                key={item.id}
                item={item}
                activePlayingId={activePlayingId}
                setActivePlayingId={setActivePlayingId}
              />
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {demoVideos.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                aria-label={`Go to video ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "w-8 bg-accent"
                    : "w-2.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}