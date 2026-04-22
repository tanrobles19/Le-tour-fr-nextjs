"use client";

import { useState } from "react";

export function JerseyBikeFlipper({
  jerseySrc,
  bikeSrc,
  teamName,
}: {
  jerseySrc: string;
  bikeSrc: string | null;
  teamName: string;
}) {
  const [showBike, setShowBike] = useState(false);

  if (!bikeSrc) {
    return (
      <div className="relative w-full h-72 sm:h-96 bg-white/5 flex items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={jerseySrc}
          alt={`${teamName} jersey`}
          className="h-full w-auto max-w-full object-contain p-8"
        />
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-80 sm:h-[28rem] bg-white/5 cursor-pointer overflow-hidden"
      onClick={() => setShowBike((v) => !v)}
    >
      {/* Jersey — left side */}
      <div
        className="absolute top-1/2 transition-all duration-700 ease-out"
        style={{
          left: "15%",
          transform: `translateY(-50%) scale(${showBike ? 0.65 : 1.05})`,
          zIndex: showBike ? 10 : 20,
          opacity: showBike ? 0.3 : 1,
          filter: showBike ? "brightness(0.5)" : "brightness(1)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={jerseySrc}
          alt={`${teamName} jersey`}
          className="h-56 sm:h-80 w-auto object-contain drop-shadow-2xl"
        />
      </div>

      {/* Bike — right side, partially overlapping */}
      <div
        className="absolute top-1/2 transition-all duration-700 ease-out"
        style={{
          right: "5%",
          transform: `translateY(-50%) scale(${showBike ? 1.05 : 0.65})`,
          zIndex: showBike ? 20 : 10,
          opacity: showBike ? 1 : 0.3,
          filter: showBike ? "brightness(1)" : "brightness(0.5)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bikeSrc}
          alt={`${teamName} bike`}
          className="h-48 sm:h-72 w-auto object-contain drop-shadow-2xl"
        />
      </div>

      {/* Toggle hint */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        <span
          className={`px-2.5 py-1 rounded-full text-[10px] font-medium backdrop-blur-sm transition-all duration-300 ${
            !showBike
              ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
              : "bg-zinc-900/60 text-zinc-400 border border-white/5"
          }`}
        >
          Jersey
        </span>
        <span
          className={`px-2.5 py-1 rounded-full text-[10px] font-medium backdrop-blur-sm transition-all duration-300 ${
            showBike
              ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
              : "bg-zinc-900/60 text-zinc-400 border border-white/5"
          }`}
        >
          Bike
        </span>
      </div>
    </div>
  );
}
