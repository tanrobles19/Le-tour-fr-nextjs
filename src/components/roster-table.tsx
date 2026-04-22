"use client";

import { useState, useMemo } from "react";
import { Users, Search, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

interface Rider {
  rider_name: string;
  nationality: string;
  date_of_birth: string;
}

const natFlags: Record<string, string> = {
  ESP: "\u{1F1EA}\u{1F1F8}", BEL: "\u{1F1E7}\u{1F1EA}", FRA: "\u{1F1EB}\u{1F1F7}",
  GBR: "\u{1F1EC}\u{1F1E7}", NED: "\u{1F1F3}\u{1F1F1}", ITA: "\u{1F1EE}\u{1F1F9}",
  GER: "\u{1F1E9}\u{1F1EA}", AUS: "\u{1F1E6}\u{1F1FA}", USA: "\u{1F1FA}\u{1F1F8}",
  COL: "\u{1F1E8}\u{1F1F4}", SUI: "\u{1F1E8}\u{1F1ED}", NOR: "\u{1F1F3}\u{1F1F4}",
  DEN: "\u{1F1E9}\u{1F1F0}", POL: "\u{1F1F5}\u{1F1F1}", SLO: "\u{1F1F8}\u{1F1EE}",
  POR: "\u{1F1F5}\u{1F1F9}", AUT: "\u{1F1E6}\u{1F1F9}", CZE: "\u{1F1E8}\u{1F1FF}",
  IRE: "\u{1F1EE}\u{1F1EA}", LUX: "\u{1F1F1}\u{1F1FA}", CAN: "\u{1F1E8}\u{1F1E6}",
  NZL: "\u{1F1F3}\u{1F1FF}", KAZ: "\u{1F1F0}\u{1F1FF}", RSA: "\u{1F1FF}\u{1F1E6}",
  ERI: "\u{1F1EA}\u{1F1F7}", ECU: "\u{1F1EA}\u{1F1E8}", ARG: "\u{1F1E6}\u{1F1F7}",
  SVK: "\u{1F1F8}\u{1F1F0}", LAT: "\u{1F1F1}\u{1F1FB}", EST: "\u{1F1EA}\u{1F1EA}",
  ISR: "\u{1F1EE}\u{1F1F1}", JPN: "\u{1F1EF}\u{1F1F5}", UKR: "\u{1F1FA}\u{1F1E6}",
  CRO: "\u{1F1ED}\u{1F1F7}", BRA: "\u{1F1E7}\u{1F1F7}", MEX: "\u{1F1F2}\u{1F1FD}",
  ROU: "\u{1F1F7}\u{1F1F4}", UAE: "\u{1F1E6}\u{1F1EA}", BIH: "\u{1F1E7}\u{1F1E6}",
};

function formatDob(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function calcAge(dateStr: string): number | null {
  if (!dateStr) return null;
  const d = new Date(dateStr + "T00:00:00");
  if (isNaN(d.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
  return age;
}

type SortKey = "rider_name" | "nationality" | "age";
type SortDir = "asc" | "desc";

interface RosterLabels {
  title: string;
  riders: string;
  search: string;
  rider: string;
  nationality: string;
  dob: string;
  age: string;
  all: string;
  showing: string;
}

export function RosterTable({ riders, lang }: { riders: Rider[]; lang: string }) {
  const [search, setSearch] = useState("");
  const [natFilter, setNatFilter] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey>("rider_name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const isEs = lang === "es";
  const labels: RosterLabels = {
    title: isEs ? "Plantilla del equipo" : "Team Roster",
    riders: isEs ? "ciclistas" : "riders",
    search: isEs ? "Buscar ciclista..." : "Search rider...",
    rider: isEs ? "Ciclista" : "Rider",
    nationality: isEs ? "Nacionalidad" : "Nationality",
    dob: isEs ? "Nacimiento" : "Date of Birth",
    age: isEs ? "Edad" : "Age",
    all: isEs ? "Todos" : "All",
    showing: isEs ? "Mostrando" : "Showing",
  };

  // Get unique nationalities for filter
  const nationalities = useMemo(() => {
    const nats = [...new Set(riders.map((r) => r.nationality))].sort();
    return nats;
  }, [riders]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) return <ArrowUpDown className="size-3 text-zinc-300" />;
    return sortDir === "asc"
      ? <ArrowUp className="size-3 text-amber-400" />
      : <ArrowDown className="size-3 text-amber-400" />;
  };

  const filtered = useMemo(() => {
    let result = riders;

    if (natFilter !== "all") {
      result = result.filter((r) => r.nationality === natFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((r) =>
        r.rider_name.toLowerCase().includes(q) ||
        r.nationality.toLowerCase().includes(q)
      );
    }

    result = [...result].sort((a, b) => {
      if (sortKey === "age") {
        const ageA = calcAge(a.date_of_birth) ?? 0;
        const ageB = calcAge(b.date_of_birth) ?? 0;
        return sortDir === "asc" ? ageA - ageB : ageB - ageA;
      }
      const valA = a[sortKey].toLowerCase();
      const valB = b[sortKey].toLowerCase();
      return sortDir === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });

    return result;
  }, [riders, search, natFilter, sortKey, sortDir]);

  return (
    <div className="mt-10 animate-[fadeSlideUp_0.6s_ease-out_0.2s_both]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center size-10 rounded-xl bg-amber-500/10 border border-amber-500/20">
          <Users className="size-5 text-amber-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            {labels.title}
          </h2>
          <p className="text-sm text-zinc-400">
            {riders.length} {labels.riders}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
        {/* Search */}
        <div className="relative flex-1 max-w-xs w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
          <Input
            placeholder={labels.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-zinc-900/60 border-white/5 text-zinc-200 placeholder:text-zinc-400 focus-visible:ring-amber-500/30 h-9 text-sm"
          />
        </div>

        {/* Nationality filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full" style={{ scrollbarWidth: "none" }}>
          <button
            onClick={() => setNatFilter("all")}
            className={`flex-shrink-0 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              natFilter === "all"
                ? "bg-amber-500/15 text-amber-400"
                : "text-zinc-400 hover:text-zinc-300 bg-white/5"
            }`}
          >
            {labels.all} ({riders.length})
          </button>
          {nationalities.map((nat) => {
            const count = riders.filter((r) => r.nationality === nat).length;
            return (
              <button
                key={nat}
                onClick={() => setNatFilter(nat === natFilter ? "all" : nat)}
                className={`flex-shrink-0 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  natFilter === nat
                    ? "bg-amber-500/15 text-amber-400"
                    : "text-zinc-400 hover:text-zinc-300 bg-white/5"
                }`}
              >
                {natFlags[nat] || ""} {nat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden border border-white/5 bg-zinc-800/30">
        <Table>
          <TableHeader>
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="text-zinc-400 w-10">#</TableHead>
              <TableHead>
                <button onClick={() => toggleSort("rider_name")} className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors">
                  {labels.rider} <SortIcon column="rider_name" />
                </button>
              </TableHead>
              <TableHead>
                <button onClick={() => toggleSort("nationality")} className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors">
                  {labels.nationality} <SortIcon column="nationality" />
                </button>
              </TableHead>
              <TableHead className="text-zinc-400 hidden sm:table-cell">
                {labels.dob}
              </TableHead>
              <TableHead>
                <button onClick={() => toggleSort("age")} className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors justify-end">
                  {labels.age} <SortIcon column="age" />
                </button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow className="border-white/5">
                <TableCell colSpan={5} className="text-center py-8 text-zinc-400">
                  {isEs ? "Sin resultados" : "No riders found"}
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((rider, i) => {
                const age = calcAge(rider.date_of_birth);
                const natFlag = natFlags[rider.nationality] || "";
                return (
                  <TableRow
                    key={`${rider.rider_name}-${i}`}
                    className="border-white/5 hover:bg-white/[0.03] transition-colors"
                  >
                    <TableCell className="text-zinc-400 text-sm tabular-nums">{i + 1}</TableCell>
                    <TableCell className="text-zinc-100 font-medium">{rider.rider_name}</TableCell>
                    <TableCell className="text-zinc-300 text-sm">{natFlag} {rider.nationality}</TableCell>
                    <TableCell className="text-zinc-400 text-sm hidden sm:table-cell">{formatDob(rider.date_of_birth)}</TableCell>
                    <TableCell className="text-zinc-400 text-sm text-right tabular-nums">{age ?? "—"}</TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <p className="text-xs text-zinc-400 mt-3">
        {labels.showing} {filtered.length} / {riders.length} {labels.riders}
      </p>
    </div>
  );
}
