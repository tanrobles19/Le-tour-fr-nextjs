"use client";

import { useState, useEffect } from "react";

const RACE_START = new Date("2026-07-04T12:00:00+02:00").getTime();

function calcRemaining() {
  const diff = Math.max(0, RACE_START - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, total: diff };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center shadow-lg shadow-black/30">
          <span className="text-2xl sm:text-4xl font-bold text-white tabular-nums">
            {String(value).padStart(2, "0")}
          </span>
        </div>
        <div className="absolute left-0 right-0 top-1/2 h-px bg-white/5" />
      </div>
      <span className="mt-1.5 sm:mt-2 text-[9px] sm:text-xs text-zinc-400 uppercase tracking-widest font-medium">
        {label}
      </span>
    </div>
  );
}

interface CountdownDict {
  days: string;
  hours: string;
  min: string;
  sec: string;
  raceUnderway: string;
}

export function Countdown({ dict }: { dict?: CountdownDict }) {
  const labels = dict || { days: "Days", hours: "Hours", min: "Min", sec: "Sec", raceUnderway: "The race is underway!" };
  const [time, setTime] = useState(calcRemaining);

  useEffect(() => {
    const id = setInterval(() => setTime(calcRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  if (time.total <= 0) {
    return (
      <p className="text-xl font-bold text-amber-400 animate-pulse">
        {labels.raceUnderway}
      </p>
    );
  }

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <Unit value={time.days} label={labels.days} />
      <span className="text-xl sm:text-2xl font-bold text-zinc-300 mt-[-1.5rem]">:</span>
      <Unit value={time.hours} label={labels.hours} />
      <span className="text-xl sm:text-2xl font-bold text-zinc-300 mt-[-1.5rem]">:</span>
      <Unit value={time.minutes} label={labels.min} />
      <span className="text-xl sm:text-2xl font-bold text-zinc-300 mt-[-1.5rem]">:</span>
      <Unit value={time.seconds} label={labels.sec} />
    </div>
  );
}
