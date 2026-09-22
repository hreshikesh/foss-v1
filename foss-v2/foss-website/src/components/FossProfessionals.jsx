import React, { useState, useRef, useEffect } from "react";


import { fossProfessionals } from "../data/fossProfessionals";
const ProfessionalCard = ({ person }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      // Optional: reset video to beginning on mouse leave
      // videoRef.current.currentTime = 0; 
    }
  };

  return (
    <div
      className="group relative w-full aspect-[9/16] bg-[#070707] overflow-hidden rounded-md border border-[#373737]/30 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={isPlaying ? handleMouseLeave : handleMouseEnter} // Allows mobile tap-to-play
    >
      {/* High-res fallback poster */}
      <img
        src={person.poster}
        alt={person.name}
        className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${
          isPlaying ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Reel Video */}
      <video
        ref={videoRef}
        src={person.video}
        muted
        playsInline
        loop
        preload="metadata"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isPlaying ? "opacity-100 scale-105" : "opacity-0 scale-100"
        }`}
      />

      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

      {/* Text Content */}
      <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4 z-10 transition-transform duration-300 group-hover:-translate-y-1">
        <h3 className="text-[11px] sm:text-[14px] md:text-xl font-black italic uppercase text-white leading-[1.1] mb-1 drop-shadow-lg">
          {person.name}
        </h3>
        <p className="text-[9px] sm:text-[11px] md:text-sm text-[#DF2328] font-bold uppercase tracking-wide">
          {person.role}
        </p>
      </div>
    </div>
  );
};

export default function FossProfessionals() {
  return (
    <div className="min-h-screen bg-[#070707] py-12 px-2 sm:px-6 md:px-12 font-sans">
      
      {/* Header Section */}
      <div className="max-w-[1600px] mx-auto mb-8">
        <h2 className="text-3xl md:text-5xl font-black italic uppercase text-[#D9DAD8] tracking-wide border-b border-[#373737] pb-4 inline-block pr-12">
          Professionals
        </h2>
      </div>

      {/* 
        Grid Setup:
        - grid-cols-3: 3 columns on mobile (extremely tight, ultra responsive)
        - sm:grid-cols-4: 4 columns on tablets
        - lg:grid-cols-6: 6 columns on large desktop screens 
      */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4 lg:gap-6">
        {fossProfessionals.map((person) => (
          <ProfessionalCard key={person.id} person={person} />
        ))}
      </div>
      
    </div>
  );
}