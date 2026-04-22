import { getDictionary, isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { Bike, Clock, Calendar } from "lucide-react";
import { Countdown } from "@/components/countdown";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

export default async function StandingsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const t = dict.standings;

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-10">
          <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-2">
            Tour de France 2026
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            {t.title}
          </h1>
          <p className="text-base text-zinc-400 mt-3">{t.subtitle}</p>
        </div>

        <div className="rounded-2xl overflow-hidden border border-white/5 bg-zinc-800/30 mb-8">
          <Table>
            <TableHeader>
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-zinc-400 w-16">{t.rank}</TableHead>
                <TableHead className="text-zinc-400">{t.rider}</TableHead>
                <TableHead className="text-zinc-400">{t.team}</TableHead>
                <TableHead className="text-zinc-400">{t.time}</TableHead>
                <TableHead className="text-zinc-400">{t.gap}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-white/5">
                <TableCell colSpan={5} className="py-0">
                  <div className="h-0" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="relative rounded-3xl overflow-hidden border border-white/5 bg-zinc-800/30 shadow-2xl shadow-black/40">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -inset-[100%] animate-[spin_60s_linear_infinite] opacity-[0.03]">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `repeating-conic-gradient(from 0deg, #f59e0b 0deg 10deg, transparent 10deg 20deg)`,
                }}
              />
            </div>
          </div>

          <div className="relative flex flex-col items-center text-center px-8 py-16 sm:py-24">
            <div className="mb-10">
              <Countdown dict={{ days: t.days, hours: t.hours, min: t.min, sec: t.sec, raceUnderway: t.raceUnderway }} />
            </div>

            <div className="relative mb-6">
              <div className="size-20 rounded-full bg-gradient-to-br from-amber-400/20 to-orange-500/10 flex items-center justify-center border border-amber-500/20 animate-pulse">
                <Bike className="size-9 text-amber-400" />
              </div>
              <div className="absolute -top-1 -right-1 size-5 rounded-full bg-amber-500 flex items-center justify-center">
                <Clock className="size-3 text-zinc-950" />
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              {t.notStarted}
            </h2>
            <p className="text-zinc-400 max-w-md text-base leading-relaxed mb-10">
              {t.notStartedDesc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-lg">
              <div className="rounded-xl bg-white/5 border border-white/5 p-4 flex flex-col items-center gap-2">
                <Calendar className="size-5 text-amber-400" />
                <span className="text-lg font-bold text-white">Jul 4</span>
                <span className="text-[10px] text-zinc-400 uppercase tracking-widest">{t.grandDepart}</span>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/5 p-4 flex flex-col items-center gap-2">
                <Bike className="size-5 text-amber-400" />
                <span className="text-lg font-bold text-white">21 {lang === "es" ? "Etapas" : "Stages"}</span>
                <span className="text-[10px] text-zinc-400 uppercase tracking-widest">3,500 km</span>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/5 p-4 flex flex-col items-center gap-2">
                <Clock className="size-5 text-amber-400" />
                <span className="text-lg font-bold text-white">Jul 26</span>
                <span className="text-[10px] text-zinc-400 uppercase tracking-widest">{t.parisFinish}</span>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-6">
              {[
                { color: "bg-yellow-400", label: t.yellowJersey },
                { color: "bg-green-500", label: t.greenJersey },
                { color: "bg-red-500", label: t.polkaDotJersey },
                { color: "bg-white", label: t.whiteJersey },
              ].map((jersey) => (
                <div key={jersey.label} className="flex items-center gap-2">
                  <span className={`size-3 rounded-full ${jersey.color}`} />
                  <span className="text-xs font-medium text-zinc-300">{jersey.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
