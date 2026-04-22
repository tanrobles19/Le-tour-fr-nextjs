import fs from "fs";
import path from "path";
import Papa from "papaparse";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { JerseyBikeFlipper } from "@/components/jersey-bike-flipper";
import { RosterTable } from "@/components/roster-table";

interface TeamRow {
  team_name: string;
  uci_code: string;
  country: string;
  team_category: string;
}

interface RiderRow {
  uci_code: string;
  rider_name: string;
  nationality: string;
  date_of_birth: string;
}

const jerseyMap: Record<string, string> = {
  ADC: "alpecin_premier_tech.png",
  DAT: "decathlon_cma.png",
  EFE: "education_easypost.png",
  GFC: "groupama_FDJ_united.jpg",
  IGD: "ineos_grenadiers.png",
  LTK: "lidl_trek.jpg",
  IWA: "lotto_intermarche.jpg",
  MOV: "movistar_team.png",
  NSN: "NSN_cycling_team.png",
  RBH: "red_bull_bORA_hansgrohe.png",
  SOQ: "soudal_quick_step.jpg",
  TBV: "bahrain_victorious.png",
  JAY: "team_jayco_AlUla.png",
  TPP: "team_picnic_PostNL.png",
  UAD: "UAE_team_emirates.png",
  UNX: "uno_x_mobility.png",
  TVL: "team_visma.png",
  XAT: "XDS_astana_team.png",
  CRS: "caja_rural_seguros.jpg",
  COF: "Cofidis.jpg",
  PIN: "pinarello.png",
  TTE: "total_energies.png",
  TUD: "tudor_pro_cycling_team.png",
};

const bikeMap: Record<string, string> = {
  ADC: "2026-alpecin-premier-tech-canyon-aeroad.jpeg",
  DAT: "decathlon.jpg",
  EFE: "EF-Education.jpg",
  GFC: "Groupaa-FDJ-United.jpg",
  IGD: "ineosgrenadiers.jpg",
  LTK: "Trek.jpg",
  IWA: "lotto.jpg",
  MOV: "movistar.png",
  NSN: "nsn_cycling.png",
  RBH: "redbullborahansgrohe.png",
  SOQ: "quick_step.png",
  TBV: "team_bahrain_victorious.jpg",
  JAY: "team_jayco.png",
  TPP: "Team_Picnic_PostNL.jpg",
  UAD: "UAE_team_emirates.png",
  UNX: "UNOX-team.PNG",
  TVL: "visma.png",
  XAT: "Astana-Bike.png",
  CRS: "caja_rural.jpg",
  COF: "Cofidis.jpg",
  PIN: "pinarello–q36.5-pro-cycling.png",
  TTE: "Team_TotalEnergies.jpg",
  TUD: "tudor_pro_cycling.png",
};

const teamWebsites: Record<string, string> = {
  ADC: "https://www.alpecin-premiertech.com/",
  DAT: "https://decathloncmacgmteam.com/en/",
  EFE: "https://www.efprocycling.com/",
  GFC: "https://www.equipecycliste-groupama-fdj.fr/en/",
  IGD: "https://www.ineosgrenadiers.com/",
  LTK: "https://racing.trekbikes.com/team/lidl-trek",
  IWA: "https://www.lotto-intermarche.be/en",
  MOV: "https://movistarteam.com/en/team/mens-team",
  NSN: "https://nsncyclingteam.com/",
  RBH: "https://www.redbullborahansgrohe.com/en",
  SOQ: "https://soudal-quickstepteam.com/en",
  TBV: "https://bahraincyclingteam.com/",
  JAY: "https://greenedgecycling.com/2026/",
  TPP: "https://www.teampicnicpostnl.com/",
  UAD: "https://www.uaeteamemirates.com/",
  UNX: "https://www.unoxteam.com/",
  TVL: "https://www.teamvismaleaseabike.com/",
  XAT: "https://xds-astana.com/en",
  CRS: "https://teamcajarural-segurosrga.com/",
  COF: "https://www.equipecofidis.com/uk/home",
  PIN: "https://www.pinarello-q36-5.com/",
  TTE: "http://teamtotalenergies.com/en/",
  TUD: "https://www.tudorprocycling.com/",
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

function getTeams(): TeamRow[] {
  const csvPath = path.join(process.cwd(), "public/uci_teams.csv");
  const csvText = fs.readFileSync(csvPath, "utf-8");
  const { data } = Papa.parse<TeamRow>(csvText, { header: true, skipEmptyLines: true });
  return data;
}

function getRiders(uciCode: string): RiderRow[] {
  const csvPath = path.join(process.cwd(), "public/team_rosters.csv");
  const csvText = fs.readFileSync(csvPath, "utf-8");
  const { data } = Papa.parse<RiderRow>(csvText, { header: true, skipEmptyLines: true });
  return data
    .filter((r) => r.uci_code === uciCode)
    .sort((a, b) => a.rider_name.localeCompare(b.rider_name));
}

export async function generateStaticParams() {
  const teams = getTeams();
  return teams.map((t) => ({ code: t.uci_code.toLowerCase() }));
}

export default async function TeamDetailPage({
  params,
}: {
  params: Promise<{ lang: string; code: string }>;
}) {
  const { lang, code } = await params;
  const teams = getTeams();
  const team = teams.find((t) => t.uci_code.toLowerCase() === code);

  if (!team) notFound();

  const jerseyFile = jerseyMap[team.uci_code];
  const jerseySrc = jerseyFile ? `/bikes/${jerseyFile}` : null;
  const bikeFile = bikeMap[team.uci_code];
  const bikeSrc = bikeFile ? `/team_bikes/${bikeFile}` : null;
  const flag = countryFlags[team.country] || "";
  const isWorldTeam = team.team_category === "UCI WorldTeam";
  const riders = getRiders(team.uci_code);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Back link */}
        <Link
          href={`/${lang}`}
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-10"
        >
          <ArrowLeft className="size-4" />
          {lang === "es" ? "Todos los equipos" : "All teams"}
        </Link>

        {/* Hero card */}
        <div className="rounded-3xl overflow-hidden bg-zinc-800/50 border border-white/5 shadow-2xl shadow-black/40 animate-[fadeSlideUp_0.6s_ease-out_both]">
          {/* Jersey + Bike flipper */}
          {jerseySrc && (
            <JerseyBikeFlipper
              jerseySrc={jerseySrc}
              bikeSrc={bikeSrc}
              teamName={team.team_name}
            />
          )}

          {/* Team info */}
          <div className="p-8 sm:p-10">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">
                  {team.team_name}
                </h1>
                <p className="text-zinc-400 mt-2 text-lg uppercase tracking-widest">
                  {team.country} {flag}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
                  isWorldTeam
                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    : "bg-white/5 text-zinc-400 border border-white/5"
                }`}
              >
                {team.uci_code}
              </span>
            </div>

            <div className="mt-8 h-px bg-white/5" />

            {/* Details grid */}
            <dl className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <dt className="text-xs text-zinc-400 uppercase tracking-widest font-medium">
                  {lang === "es" ? "Categoría" : "Category"}
                </dt>
                <dd className="mt-1.5 text-zinc-200 font-medium">
                  {team.team_category}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-zinc-400 uppercase tracking-widest font-medium">
                  {lang === "es" ? "Código UCI" : "UCI Code"}
                </dt>
                <dd className="mt-1.5 text-zinc-200 font-medium">
                  {team.uci_code}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-zinc-400 uppercase tracking-widest font-medium">
                  {lang === "es" ? "País" : "Country"}
                </dt>
                <dd className="mt-1.5 text-zinc-200 font-medium">
                  {team.country} {flag}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-zinc-400 uppercase tracking-widest font-medium">
                  {lang === "es" ? "Estado" : "Status"}
                </dt>
                <dd className="mt-1.5 text-zinc-200 font-medium">
                  {isWorldTeam
                    ? lang === "es" ? "Clasificado automático" : "Automatic qualifier"
                    : lang === "es" ? "Equipo invitado" : "Invited team"}
                </dd>
              </div>
            </dl>

            {/* Official website */}
            {teamWebsites[team.uci_code] && (
              <>
                <div className="mt-8 h-px bg-white/5" />
                <div className="mt-6">
                  <a
                    href={teamWebsites[team.uci_code]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 text-sm font-medium hover:bg-amber-500/20 transition-colors"
                  >
                    <ExternalLink className="size-4" />
                    {lang === "es" ? "Sitio web oficial" : "Official website"}
                  </a>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Team Roster */}
        <RosterTable riders={riders} lang={lang} />
      </main>
    </div>
  );
}
