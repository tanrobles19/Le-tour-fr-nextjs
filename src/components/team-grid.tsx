"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import { LayoutGrid, GalleryHorizontal, ChevronLeft, ChevronRight } from "lucide-react";

interface Team {
  team_name: string;
  uci_code: string;
  country: string;
  team_category: string;
  jerseySrc: string | null;
}

// Team brand colors for fallback badges
const teamColors: Record<string, { bg: string; text: string }> = {
  ADC: { bg: "bg-blue-600", text: "text-white" },
  DAT: { bg: "bg-blue-700", text: "text-white" },
  EFE: { bg: "bg-pink-500", text: "text-white" },
  GFC: { bg: "bg-blue-500", text: "text-white" },
  IGD: { bg: "bg-red-800", text: "text-white" },
  LTK: { bg: "bg-red-600", text: "text-white" },
  IWA: { bg: "bg-red-500", text: "text-white" },
  MOV: { bg: "bg-blue-900", text: "text-white" },
  NSN: { bg: "bg-teal-600", text: "text-white" },
  RBH: { bg: "bg-yellow-500", text: "text-white" },
  SOQ: { bg: "bg-blue-600", text: "text-white" },
  TBV: { bg: "bg-red-600", text: "text-white" },
  JAY: { bg: "bg-emerald-600", text: "text-white" },
  TPP: { bg: "bg-orange-500", text: "text-white" },
  UAD: { bg: "bg-red-700", text: "text-white" },
  UNX: { bg: "bg-orange-600", text: "text-white" },
  TVL: { bg: "bg-yellow-400", text: "text-white" },
  XAT: { bg: "bg-cyan-600", text: "text-white" },
  CRS: { bg: "bg-green-600", text: "text-white" },
  COF: { bg: "bg-red-500", text: "text-white" },
  PIN: { bg: "bg-zinc-700", text: "text-white" },
  TTE: { bg: "bg-red-600", text: "text-white" },
  TUD: { bg: "bg-blue-700", text: "text-white" },
};

const countryFlags: Record<string, string> = {
  Belgium: "\u{1F1E7}\u{1F1EA}",
  France: "\u{1F1EB}\u{1F1F7}",
  "United States": "\u{1F1FA}\u{1F1F8}",
  "United Kingdom": "\u{1F1EC}\u{1F1E7}",
  Spain: "\u{1F1EA}\u{1F1F8}",
  Switzerland: "\u{1F1E8}\u{1F1ED}",
  Germany: "\u{1F1E9}\u{1F1EA}",
  Bahrain: "\u{1F1E7}\u{1F1ED}",
  Australia: "\u{1F1E6}\u{1F1FA}",
  Netherlands: "\u{1F1F3}\u{1F1F1}",
  "United Arab Emirates": "\u{1F1E6}\u{1F1EA}",
  Norway: "\u{1F1F3}\u{1F1F4}",
  Kazakhstan: "\u{1F1F0}\u{1F1FF}",
  Italy: "\u{1F1EE}\u{1F1F9}",
};

type ViewMode = "grid" | "carousel";

function TeamJersey({ team, size = "sm" }: { team: Team; size?: "sm" | "lg" }) {
  const colors = teamColors[team.uci_code] || {
    bg: "bg-zinc-700",
    text: "text-white",
  };

  const sizeClasses = size === "lg" ? "w-32 h-40" : "w-20 h-20";

  if (team.jerseySrc) {
    return (
      <div className={`relative ${sizeClasses} rounded-2xl overflow-hidden bg-white/5 border border-white/5 flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-110`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={team.jerseySrc}
          alt={`${team.team_name} jersey`}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center ${sizeClasses} rounded-2xl ${colors.bg} ${colors.text} border border-white/5 font-bold text-xl tracking-wider transition-transform duration-500 ease-out group-hover:scale-110`}
    >
      {team.uci_code}
    </div>
  );
}

function TeamCard({ team, variant, animationDelay, lang }: { team: Team; variant: "world" | "pro"; animationDelay?: string; lang: string }) {
  return (
    <Link
      href={`/${lang}/team/${team.uci_code.toLowerCase()}`}
      className="group relative rounded-2xl overflow-hidden bg-zinc-800/50 border border-white/5 shadow-lg shadow-black/20 transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-black/40 hover:border-white/15 hover:-translate-y-2 animate-[fadeSlideUp_0.6s_ease-out_both]"
      style={animationDelay ? { animationDelay } : undefined}
    >
      <div className="p-6 flex items-center gap-5">
        <TeamJersey team={team} />
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold tracking-wide text-zinc-100 transition-colors duration-300 group-hover:text-white leading-tight">
            {team.team_name}
          </h3>
          <p className="text-xs text-zinc-400 mt-1.5 font-medium uppercase tracking-widest">
            {team.country} {countryFlags[team.country] || ""}
          </p>
          <div className="flex items-center gap-2 mt-3">
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                variant === "world"
                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  : "bg-white/5 text-zinc-400 border border-white/5"
              }`}
            >
              {team.uci_code}
            </span>
          </div>
        </div>
      </div>
      <div className="mx-6 mb-4 h-0.5 w-0 bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500 ease-out group-hover:w-12 rounded-full" />
    </Link>
  );
}

function TeamCarousel({ teams, lang, dict }: { teams: Team[]; lang: string; dict: Record<string, string> }) {
  const _ = (key: string, fallback: string) => dict[key] || fallback;
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);
  const touchDelta = useRef(0);
  const team = teams[current];
  const isWorldTeam = team.team_category === "UCI WorldTeam";
  const flag = countryFlags[team.country] || "";
  const thumbStripRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((i: number) => {
    setCurrent(i);
    // scroll the thumbnail strip so the active thumb is centered
    setTimeout(() => {
      const strip = thumbStripRef.current;
      if (!strip) return;
      const thumb = strip.children[i] as HTMLElement | undefined;
      if (!thumb) return;
      const stripRect = strip.getBoundingClientRect();
      const thumbRect = thumb.getBoundingClientRect();
      const scrollTarget = thumb.offsetLeft - stripRect.width / 2 + thumbRect.width / 2;
      strip.scrollTo({ left: scrollTarget, behavior: "smooth" });
    }, 0);
  }, []);

  const prev = useCallback(() => goTo(current === 0 ? teams.length - 1 : current - 1), [current, teams.length, goTo]);
  const next = useCallback(() => goTo(current === teams.length - 1 ? 0 : current + 1), [current, teams.length, goTo]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDelta.current = 0;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    touchDelta.current = e.touches[0].clientX - touchStartX.current;
  }, []);

  const onTouchEnd = useCallback(() => {
    if (touchDelta.current > 60) prev();
    else if (touchDelta.current < -60) next();
    touchDelta.current = 0;
  }, [prev, next]);

  return (
    <div
      className="flex flex-col"
      style={{ minHeight: "calc(100vh - 14rem)" }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Main content — jersey left, info right */}
      <div className="flex-1 flex items-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Jersey */}
          <Link
            href={`/${lang}/team/${team.uci_code.toLowerCase()}`}
            className="group flex items-center justify-center"
          >
            <div className="relative w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden bg-zinc-800/50 border border-white/5 shadow-2xl shadow-black/40 flex items-center justify-center">
              {team.jerseySrc ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={team.jerseySrc}
                    alt={`${team.team_name} jersey`}
                    className="h-full w-auto max-w-full object-contain p-6 transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                </>
              ) : (
                <span className="text-6xl font-bold text-zinc-300">{team.uci_code}</span>
              )}
            </div>
          </Link>

          {/* Info */}
          <div className="flex flex-col gap-6">
            <div>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide mb-4 ${
                  isWorldTeam
                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    : "bg-white/5 text-zinc-400 border border-white/5"
                }`}
              >
                {isWorldTeam ? "UCI WorldTeam" : "UCI ProTeam"}
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                {team.team_name}
              </h2>
              <p className="text-lg text-zinc-400 mt-3 uppercase tracking-widest font-medium">
                {team.country} {flag}
              </p>
            </div>

            <div className="h-px bg-white/5" />

            <dl className="grid grid-cols-2 gap-6">
              <div>
                <dt className="text-xs text-zinc-400 uppercase tracking-widest font-medium">{_("uciCode", "UCI Code")}</dt>
                <dd className="mt-1.5 text-xl text-zinc-200 font-semibold">{team.uci_code}</dd>
              </div>
              <div>
                <dt className="text-xs text-zinc-400 uppercase tracking-widest font-medium">{_("status", "Status")}</dt>
                <dd className="mt-1.5 text-xl text-zinc-200 font-semibold">
                  {isWorldTeam ? _("automaticQualifier", "Automatic qualifier") : _("invitedTeam", "Invited team")}
                </dd>
              </div>
            </dl>

            <Link
              href={`/${lang}/team/${team.uci_code.toLowerCase()}`}
              className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 text-sm font-medium hover:bg-amber-500/20 transition-colors w-fit"
            >
              {_("viewDetails", "View team details")}
              <ChevronRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom toolbar */}
      <div className="py-6 space-y-4">
        {/* Progress bar */}
        <div className="relative h-1 rounded-full bg-zinc-800 overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500 ease-out"
            style={{ width: `${((current + 1) / teams.length) * 100}%` }}
          />
        </div>

        {/* Controls row: arrows + thumbnail strip */}
        <div className="flex items-center gap-4">
          <button
            onClick={prev}
            className="size-10 flex-shrink-0 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all"
          >
            <ChevronLeft className="size-5" />
          </button>

          {/* Thumbnail strip */}
          <div
            ref={thumbStripRef}
            className="flex-1 flex gap-2 overflow-x-auto items-center"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {teams.map((t, i) => (
              <button
                key={t.uci_code}
                onClick={() => goTo(i)}
                className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  i === current
                    ? "border-amber-400 shadow-lg shadow-amber-500/20 scale-110"
                    : "border-transparent opacity-50 hover:opacity-80"
                }`}
                title={t.team_name}
              >
                {t.jerseySrc ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={t.jerseySrc}
                    alt={t.team_name}
                    className="w-10 h-12 object-cover bg-zinc-800"
                  />
                ) : (
                  <div className="w-10 h-12 bg-zinc-700 flex items-center justify-center text-[8px] font-bold text-zinc-400">
                    {t.uci_code}
                  </div>
                )}
              </button>
            ))}
          </div>

          <button
            onClick={next}
            className="size-10 flex-shrink-0 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ViewToggle({ mode, onChange, labels }: { mode: ViewMode; onChange: (m: ViewMode) => void; labels: { grid: string; carousel: string } }) {
  return (
    <div className="inline-flex items-center rounded-xl bg-white/5 border border-white/5 p-1">
      <button
        onClick={() => onChange("grid")}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          mode === "grid"
            ? "bg-amber-500/15 text-amber-400 shadow-sm"
            : "text-zinc-400 hover:text-zinc-200"
        }`}
      >
        <LayoutGrid className="size-4" />
        {labels.grid}
      </button>
      <button
        onClick={() => onChange("carousel")}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          mode === "carousel"
            ? "bg-amber-500/15 text-amber-400 shadow-sm"
            : "text-zinc-400 hover:text-zinc-200"
        }`}
      >
        <GalleryHorizontal className="size-4" />
        {labels.carousel}
      </button>
    </div>
  );
}

export function TeamGrid({ teams, lang = "en", dict }: { teams: Team[]; lang?: string; dict?: Record<string, string> }) {
  const t = dict || {};
  const _ = (key: string, fallback: string) => t[key] || fallback;
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const worldTeams = teams.filter((t) => t.team_category === "UCI WorldTeam");
  const proTeams = teams.filter((t) => t.team_category === "UCI ProTeam");

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Hero header */}
        <div className="mb-10 animate-[fadeSlideUp_0.6s_ease-out_both]">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-2">
                {_("dateRange", "July 4 \u2013 July 26, 2026")}
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                {_("title", "Teams & Jerseys")}
              </h1>
              <p className="text-base text-zinc-400 mt-3 max-w-lg">
                {_("subtitle", "Meet the {count} teams racing 3,500 km across France for the yellow jersey.").replace("{count}", String(teams.length))}
              </p>
            </div>
            <ViewToggle mode={viewMode} onChange={setViewMode} labels={{ grid: _("grid", "Grid"), carousel: _("carousel", "Carousel") }} />
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 mt-6 pt-6 border-t border-white/5">
            <div>
              <p className="text-2xl font-bold text-white">{worldTeams.length}</p>
              <p className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-widest font-medium">{_("worldTeams", "WorldTeams")}</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{proTeams.length}</p>
              <p className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-widest font-medium">{_("proTeams", "ProTeams")}</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">21</p>
              <p className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-widest font-medium">{_("stages", "Stages")}</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">3,500 km</p>
              <p className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-widest font-medium">{_("distance", "Distance")}</p>
            </div>
          </div>
        </div>

        {viewMode === "carousel" ? (
          /* Single carousel with all teams */
          <section id="teams">
            <TeamCarousel teams={teams} lang={lang} dict={t} />
          </section>
        ) : (
          <>
            {/* UCI WorldTeams Section */}
            <section id="teams" className="mb-16 scroll-mt-20">
              <div className="flex items-center gap-3 mb-8 animate-[fadeSlideUp_0.6s_ease-out_0.1s_both]">
                <div className="flex items-center justify-center size-10 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <span className="text-amber-400 text-sm font-bold">WT</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white">
                    {_("uciWorldTeams", "UCI WorldTeams")}
                  </h2>
                  <p className="text-sm text-zinc-400">
                    {_("automaticQualifiers", "{count} automatic qualifiers").replace("{count}", String(worldTeams.length))}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {worldTeams.map((team, index) => (
                  <TeamCard key={team.uci_code} team={team} variant="world" animationDelay={`${200 + index * 80}ms`} lang={lang} />
                ))}
              </div>
            </section>

            {/* UCI ProTeams Section */}
            <section>
              <div className="flex items-center gap-3 mb-8 animate-[fadeSlideUp_0.6s_ease-out_both]">
                <div className="flex items-center justify-center size-10 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <span className="text-amber-400 text-sm font-bold">PT</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white">
                    {_("uciProTeams", "UCI ProTeams")}
                  </h2>
                  <p className="text-sm text-zinc-400">
                    {_("invitedTeams", "{count} invited teams").replace("{count}", String(proTeams.length))}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {proTeams.map((team, index) => (
                  <TeamCard key={team.uci_code} team={team} variant="pro" animationDelay={`${index * 80}ms`} lang={lang} />
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
