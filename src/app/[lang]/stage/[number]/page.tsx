import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronLeft, ChevronRight, MapPin, Calendar, Ruler, Mountain } from "lucide-react";
import {
  stages,
  stageTypeColors,
  stageTypeLabels,
  formatStageDate,
} from "@/lib/stages";

export async function generateStaticParams() {
  return stages.map((s) => ({ number: String(s.stage) }));
}

export default async function StageDetailPage({
  params,
}: {
  params: Promise<{ lang: string; number: string }>;
}) {
  const { lang, number } = await params;
  const stageNum = parseInt(number, 10);
  const stage = stages.find((s) => s.stage === stageNum);

  if (!stage) notFound();

  const color = stageTypeColors[stage.type] || "#888";
  const typeLabel = stageTypeLabels[stage.type] || stage.type;
  const prevStage = stageNum > 1 ? stageNum - 1 : null;
  const nextStage = stageNum < 21 ? stageNum + 1 : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Back link */}
        <Link
          href={`/${lang}/route`}
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-10"
        >
          <ArrowLeft className="size-4" />
          Tour Route
        </Link>

        {/* Stage card */}
        <div className="rounded-3xl overflow-hidden bg-zinc-800/50 border border-white/5 shadow-2xl shadow-black/40 animate-[fadeSlideUp_0.6s_ease-out_both]">
          {/* Colored header bar */}
          <div
            className="h-2"
            style={{ background: `linear-gradient(to right, ${color}, ${color}88)` }}
          />

          <div className="p-8 sm:p-10">
            {/* Stage number + type */}
            <div className="flex items-center gap-4 mb-6">
              <div
                className="size-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-lg"
                style={{ background: color }}
              >
                {stage.stage}
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  Stage {stage.stage}
                </h1>
                <span
                  className="inline-flex items-center gap-1.5 mt-1 px-3 py-0.5 rounded-full text-xs font-semibold tracking-wide"
                  style={{
                    background: `${color}18`,
                    color: color,
                    border: `1px solid ${color}44`,
                  }}
                >
                  {typeLabel}
                </span>
              </div>
            </div>

            <div className="h-px bg-white/5 mb-8" />

            {/* Info grid */}
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex items-start gap-3">
                <MapPin className="size-5 text-zinc-400 mt-0.5 flex-shrink-0" />
                <div>
                  <dt className="text-xs text-zinc-400 uppercase tracking-widest font-medium">
                    Route
                  </dt>
                  <dd className="mt-1.5 text-lg text-zinc-200 font-semibold">
                    {stage.start} → {stage.finish}
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="size-5 text-zinc-400 mt-0.5 flex-shrink-0" />
                <div>
                  <dt className="text-xs text-zinc-400 uppercase tracking-widest font-medium">
                    Date
                  </dt>
                  <dd className="mt-1.5 text-lg text-zinc-200 font-semibold">
                    {formatStageDate(stage.date)}
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Ruler className="size-5 text-zinc-400 mt-0.5 flex-shrink-0" />
                <div>
                  <dt className="text-xs text-zinc-400 uppercase tracking-widest font-medium">
                    Distance
                  </dt>
                  <dd className="mt-1.5 text-lg text-zinc-200 font-semibold">
                    {stage.distance_km} km
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mountain className="size-5 text-zinc-400 mt-0.5 flex-shrink-0" />
                <div>
                  <dt className="text-xs text-zinc-400 uppercase tracking-widest font-medium">
                    Classification
                  </dt>
                  <dd className="mt-1.5 text-lg text-zinc-200 font-semibold">
                    {typeLabel}
                  </dd>
                </div>
              </div>
            </dl>

            <div className="h-px bg-white/5 my-8" />

            {/* Stage navigation */}
            <div className="flex items-center justify-between">
              {prevStage ? (
                <Link
                  href={`/${lang}/stage/${prevStage}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <ChevronLeft className="size-4" />
                  Stage {prevStage}
                </Link>
              ) : (
                <div />
              )}
              {nextStage ? (
                <Link
                  href={`/${lang}/stage/${nextStage}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  Stage {nextStage}
                  <ChevronRight className="size-4" />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
