"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

interface Team {
  team_name: string;
  uci_code: string;
  country: string;
  team_category: string;
  jerseySrc: string | null;
}

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

type SortKey = "team_name" | "uci_code" | "country" | "team_category";
type SortDir = "asc" | "desc";

export function TeamsTable({ teams, lang = "en", dict }: { teams: Team[]; lang?: string; dict?: Record<string, string> }) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("team_name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) return <ArrowUpDown className="size-3.5 text-zinc-300" />;
    return sortDir === "asc"
      ? <ArrowUp className="size-3.5 text-amber-400" />
      : <ArrowDown className="size-3.5 text-amber-400" />;
  };

  const filtered = useMemo(() => {
    let result = teams;

    if (categoryFilter !== "all") {
      result = result.filter((t) => t.team_category === categoryFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.team_name.toLowerCase().includes(q) ||
          t.uci_code.toLowerCase().includes(q) ||
          t.country.toLowerCase().includes(q)
      );
    }

    result = [...result].sort((a, b) => {
      const aVal = a[sortKey].toLowerCase();
      const bVal = b[sortKey].toLowerCase();
      return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    });

    return result;
  }, [teams, search, sortKey, sortDir, categoryFilter]);

  const worldCount = teams.filter((t) => t.team_category === "UCI WorldTeam").length;
  const proCount = teams.filter((t) => t.team_category === "UCI ProTeam").length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-2">
            Tour de France 2026
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            All Teams
          </h1>
          <p className="text-base text-zinc-400 mt-3">
            {teams.length} teams registered for the 113th edition.
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
            <Input
              placeholder="Search teams..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-zinc-900/60 border-white/5 text-zinc-200 placeholder:text-zinc-400 focus-visible:ring-amber-500/30"
            />
          </div>

          {/* Category filter pills */}
          <div className="inline-flex items-center rounded-xl bg-white/5 border border-white/5 p-1">
            <button
              onClick={() => setCategoryFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                categoryFilter === "all"
                  ? "bg-amber-500/15 text-amber-400"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              All ({teams.length})
            </button>
            <button
              onClick={() => setCategoryFilter("UCI WorldTeam")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                categoryFilter === "UCI WorldTeam"
                  ? "bg-amber-500/15 text-amber-400"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              WorldTeam ({worldCount})
            </button>
            <button
              onClick={() => setCategoryFilter("UCI ProTeam")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                categoryFilter === "UCI ProTeam"
                  ? "bg-amber-500/15 text-amber-400"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              ProTeam ({proCount})
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl overflow-hidden border border-white/5 bg-zinc-800/30">
          <Table>
            <TableHeader>
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="w-16 text-zinc-400">Jersey</TableHead>
                <TableHead>
                  <button onClick={() => toggleSort("team_name")} className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors">
                    Team <SortIcon column="team_name" />
                  </button>
                </TableHead>
                <TableHead>
                  <button onClick={() => toggleSort("uci_code")} className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors">
                    Code <SortIcon column="uci_code" />
                  </button>
                </TableHead>
                <TableHead>
                  <button onClick={() => toggleSort("country")} className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors">
                    Country <SortIcon column="country" />
                  </button>
                </TableHead>
                <TableHead>
                  <button onClick={() => toggleSort("team_category")} className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors">
                    Category <SortIcon column="team_category" />
                  </button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow className="border-white/5">
                  <TableCell colSpan={5} className="text-center py-12 text-zinc-400">
                    No teams match your search.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((team) => {
                  const isWorldTeam = team.team_category === "UCI WorldTeam";
                  return (
                    <TableRow
                      key={team.uci_code}
                      className="border-white/5 hover:bg-white/[0.03] transition-colors"
                    >
                      {/* Jersey thumbnail */}
                      <TableCell>
                        <Link href={`/${lang}/team/${team.uci_code.toLowerCase()}`}>
                          <div className="size-10 rounded-lg overflow-hidden bg-white/5 border border-white/5 flex items-center justify-center">
                            {team.jerseySrc ? (
                              /* eslint-disable-next-line @next/next/no-img-element */
                              <img
                                src={team.jerseySrc}
                                alt={team.team_name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-[8px] font-bold text-zinc-400">{team.uci_code}</span>
                            )}
                          </div>
                        </Link>
                      </TableCell>

                      {/* Team name */}
                      <TableCell>
                        <Link
                          href={`/${lang}/team/${team.uci_code.toLowerCase()}`}
                          className="font-medium text-zinc-100 hover:text-white transition-colors"
                        >
                          {team.team_name}
                        </Link>
                      </TableCell>

                      {/* UCI code */}
                      <TableCell>
                        <span className="text-zinc-400 font-mono text-xs">{team.uci_code}</span>
                      </TableCell>

                      {/* Country */}
                      <TableCell>
                        <span className="text-zinc-300">
                          {team.country} {countryFlags[team.country] || ""}
                        </span>
                      </TableCell>

                      {/* Category badge */}
                      <TableCell>
                        <span
                          className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            isWorldTeam
                              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              : "bg-white/5 text-zinc-400 border border-white/5"
                          }`}
                        >
                          {isWorldTeam ? "WorldTeam" : "ProTeam"}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        {/* Footer count */}
        <p className="text-xs text-zinc-400 mt-4">
          Showing {filtered.length} of {teams.length} teams
        </p>
      </main>
    </div>
  );
}
