"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

const bikes: { uci_code: string; team: string; file: string }[] = [
  { uci_code: "ADC", team: "Alpecin\u2013Premier Tech", file: "2026-alpecin-premier-tech-canyon-aeroad.jpeg" },
  { uci_code: "DAT", team: "Decathlon CMA CGM", file: "decathlon.jpg" },
  { uci_code: "EFE", team: "EF Education\u2013EasyPost", file: "EF-Education.jpg" },
  { uci_code: "GFC", team: "Groupama\u2013FDJ United", file: "Groupaa-FDJ-United.jpg" },
  { uci_code: "IGD", team: "Ineos Grenadiers", file: "ineosgrenadiers.jpg" },
  { uci_code: "LTK", team: "Lidl\u2013Trek", file: "Trek.jpg" },
  { uci_code: "IWA", team: "Lotto\u2013Intermarch\u00e9", file: "lotto.jpg" },
  { uci_code: "MOV", team: "Movistar Team", file: "movistar.png" },
  { uci_code: "NSN", team: "NSN Cycling Team", file: "nsn_cycling.png" },
  { uci_code: "RBH", team: "Red Bull\u2013Bora\u2013Hansgrohe", file: "redbullborahansgrohe.png" },
  { uci_code: "SOQ", team: "Soudal\u2013Quick-Step", file: "quick_step.png" },
  { uci_code: "TBV", team: "Team Bahrain Victorious", file: "team_bahrain_victorious.jpg" },
  { uci_code: "JAY", team: "Team Jayco\u2013AlUla", file: "team_jayco.png" },
  { uci_code: "TPP", team: "Team Picnic\u2013PostNL", file: "Team_Picnic_PostNL.jpg" },
  { uci_code: "UAD", team: "UAE Team Emirates XRG", file: "UAE_team_emirates.png" },
  { uci_code: "UNX", team: "Uno-X Mobility", file: "UNOX-team.PNG" },
  { uci_code: "TVL", team: "Visma\u2013Lease a Bike", file: "visma.png" },
  { uci_code: "XAT", team: "XDS Astana Team", file: "Astana-Bike.png" },
  { uci_code: "CRS", team: "Caja Rural\u2013Seguros RGA", file: "caja_rural.jpg" },
  { uci_code: "COF", team: "Cofidis", file: "Cofidis.jpg" },
  { uci_code: "PIN", team: "Pinarello\u2013Q36.5", file: "pinarello\u2013q36.5-pro-cycling.png" },
  { uci_code: "TTE", team: "Team TotalEnergies", file: "Team_TotalEnergies.jpg" },
  { uci_code: "TUD", team: "Tudor Pro Cycling Team", file: "tudor_pro_cycling.png" },
];

export default function BikesGalleryPage() {
  const pathname = usePathname();
  const lang = pathname.split("/")[1] || "en";
  const isEs = lang === "es";
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-2">
            Tour de France 2026
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            {isEs ? "Galería de Bicicletas" : "Bike Gallery"}
          </h1>
          <p className="text-base text-zinc-400 mt-3">
            {isEs
              ? `Las ${bikes.length} bicicletas que competirán en el Tour de Francia 2026.`
              : `The ${bikes.length} bikes competing in the 2026 Tour de France.`}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bikes.map((bike, index) => (
            <button
              key={bike.uci_code}
              onClick={() => setSelected(index)}
              className="group rounded-2xl overflow-hidden bg-zinc-800/50 border border-white/5 shadow-lg shadow-black/20 transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-black/40 hover:border-white/15 hover:-translate-y-2 animate-[fadeSlideUp_0.6s_ease-out_both] text-left"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className="w-full aspect-[4/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/team_bikes/${bike.file}`}
                  alt={`${bike.team} bike`}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
              </div>
            </button>
          ))}
        </div>
      </main>

      {/* Lightbox modal */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-6 right-6 size-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <X className="size-5" />
          </button>

          <div
            className="max-w-5xl max-h-[85vh] w-full animate-[fadeSlideUp_0.3s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/team_bikes/${bikes[selected].file}`}
              alt={`${bikes[selected].team} bike`}
              className="w-full h-full max-h-[80vh] object-contain rounded-2xl"
            />
            <p className="text-center text-sm text-zinc-400 mt-4">
              {bikes[selected].team}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
