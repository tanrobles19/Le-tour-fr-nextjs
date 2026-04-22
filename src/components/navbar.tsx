"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bike, Home, Map, Users, Trophy, Globe, Info, ImageIcon } from "lucide-react";

interface NavDict {
  home: string;
  bikes: string;
  tourRoute: string;
  teams: string;
  standings: string;
  about: string;
  edition: string;
}

export function Navbar({ lang, dict }: { lang: string; dict: NavDict }) {
  const pathname = usePathname();

  const navLinks = [
    { href: `/${lang}`, label: dict.home, icon: Home },
    { href: `/${lang}/bikes`, label: dict.bikes, icon: ImageIcon },
    { href: `/${lang}/route`, label: dict.tourRoute, icon: Map },
    { href: `/${lang}/teams`, label: dict.teams, icon: Users },
    { href: `/${lang}/standings`, label: dict.standings, icon: Trophy },
    { href: `/${lang}/about`, label: dict.about, icon: Info },
  ];

  const otherLang = lang === "en" ? "es" : "en";
  const otherLabel = lang === "en" ? "ES" : "EN";
  const switchPath = pathname.replace(new RegExp(`^/${lang}(/|$)`), `/${otherLang}$1`) || `/${otherLang}`;

  const isActive = (href: string) =>
    href === `/${lang}`
      ? pathname === `/${lang}` || pathname === `/${lang}/`
      : pathname.startsWith(href);

  return (
    <>
      {/* Desktop top navbar */}
      <header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center gap-2.5 sm:gap-3">
            <div className="size-8 sm:size-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Bike className="size-4 sm:size-5 text-zinc-950" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-bold tracking-tight text-white leading-none">
                Tour de France
              </span>
              <span className="text-[9px] sm:text-[10px] font-semibold text-amber-400/80 tracking-widest uppercase leading-none mt-0.5">
                2026
              </span>
            </div>
          </Link>

          {/* Desktop nav links — hidden on mobile */}
          <ul className="hidden sm:flex items-center gap-1">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(href)
                      ? "text-white bg-white/5"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-white/10"
                  }`}
                >
                  <Icon className="size-4" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href={switchPath}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Globe className="size-3.5" />
              {otherLabel}
            </Link>
            <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-medium text-amber-400">
              <span className="size-1.5 rounded-full bg-amber-400 animate-pulse" />
              {dict.edition}
            </span>
          </div>
        </nav>
      </header>

      {/* Mobile bottom tab bar — visible only on small screens */}
      <nav className="fixed bottom-0 left-0 right-0 z-[1000] sm:hidden bg-zinc-950/95 backdrop-blur-xl border-t border-white/10">
        <div className="flex items-center justify-around h-16 px-2">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg min-w-[4rem] transition-colors ${
                isActive(href)
                  ? "text-amber-400"
                  : "text-zinc-400"
              }`}
            >
              <Icon className="size-5" />
              <span className="text-[10px] font-medium leading-none">{label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
