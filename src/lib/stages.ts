export interface Stage {
  stage: number;
  date: string;
  start: string;
  finish: string;
  distance_km: number;
  type: string;
  lat: number;
  lng: number;
}

// Coordinates point to the finish city of each stage
export const stages: Stage[] = [
  { stage: 1, date: "2026-07-04", start: "Barcelona", finish: "Barcelona", distance_km: 19.7, type: "team time trial", lat: 41.3874, lng: 2.1686 },
  { stage: 2, date: "2026-07-05", start: "Tarragona", finish: "Barcelona", distance_km: 178, type: "hilly", lat: 41.1189, lng: 1.2445 },
  { stage: 3, date: "2026-07-06", start: "Granollers", finish: "Les Angles", distance_km: 196, type: "mountain", lat: 42.5714, lng: 2.0744 },
  { stage: 4, date: "2026-07-07", start: "Carcassonne", finish: "Foix", distance_km: 182, type: "hilly", lat: 42.9638, lng: 1.6052 },
  { stage: 5, date: "2026-07-08", start: "Lannemezan", finish: "Pau", distance_km: 158, type: "flat", lat: 43.2951, lng: -0.3708 },
  { stage: 6, date: "2026-07-09", start: "Pau", finish: "Gavarnie-G\u00e8dre", distance_km: 186, type: "mountain", lat: 42.7344, lng: -0.0100 },
  { stage: 7, date: "2026-07-10", start: "Hagetmau", finish: "Bordeaux", distance_km: 175, type: "flat", lat: 44.8378, lng: -0.5792 },
  { stage: 8, date: "2026-07-11", start: "P\u00e9rigueux", finish: "Bergerac", distance_km: 182, type: "flat", lat: 44.8533, lng: 0.4833 },
  { stage: 9, date: "2026-07-12", start: "Malemort", finish: "Ussel", distance_km: 185, type: "hilly", lat: 45.5489, lng: 2.3108 },
  { stage: 10, date: "2026-07-14", start: "Aurillac", finish: "Le Lioran", distance_km: 167, type: "mountain", lat: 45.0811, lng: 2.7506 },
  { stage: 11, date: "2026-07-15", start: "Vichy", finish: "Nevers", distance_km: 161, type: "flat", lat: 46.9900, lng: 3.1590 },
  { stage: 12, date: "2026-07-16", start: "Circuit de Nevers Magny-Cours", finish: "Chalon-sur-Sa\u00f4ne", distance_km: 181, type: "flat", lat: 46.7834, lng: 4.8537 },
  { stage: 13, date: "2026-07-17", start: "Dole", finish: "Belfort", distance_km: 205, type: "hilly", lat: 47.6400, lng: 6.8600 },
  { stage: 14, date: "2026-07-18", start: "Mulhouse", finish: "Le Markstein Fellering", distance_km: 155, type: "mountain", lat: 47.9270, lng: 7.0200 },
  { stage: 15, date: "2026-07-19", start: "Champagnole", finish: "Plateau de Solaison", distance_km: 184, type: "mountain", lat: 46.0130, lng: 6.3050 },
  { stage: 16, date: "2026-07-21", start: "\u00c9vian-les-Bains", finish: "Thonon-les-Bains", distance_km: 26, type: "individual time trial", lat: 46.3706, lng: 6.4796 },
  { stage: 17, date: "2026-07-22", start: "Chamb\u00e9ry", finish: "Voiron", distance_km: 175, type: "flat", lat: 45.3646, lng: 5.5911 },
  { stage: 18, date: "2026-07-23", start: "Voiron", finish: "Orci\u00e8res-Merlette", distance_km: 185, type: "mountain", lat: 44.6900, lng: 6.3200 },
  { stage: 19, date: "2026-07-24", start: "Gap", finish: "Alpe d'Huez", distance_km: 128, type: "mountain", lat: 45.0911, lng: 6.0703 },
  { stage: 20, date: "2026-07-25", start: "Le Bourg-d'Oisans", finish: "Alpe d'Huez", distance_km: 171, type: "mountain", lat: 45.0911, lng: 6.0703 },
  { stage: 21, date: "2026-07-26", start: "Thoiry", finish: "Paris (Champs-\u00c9lys\u00e9es)", distance_km: 130, type: "flat", lat: 48.8566, lng: 2.3522 },
];

export const stageTypeColors: Record<string, string> = {
  flat: "#22c55e",
  hilly: "#f59e0b",
  mountain: "#ef4444",
  "team time trial": "#8b5cf6",
  "individual time trial": "#3b82f6",
};

export const stageTypeLabels: Record<string, string> = {
  flat: "Flat",
  hilly: "Hilly",
  mountain: "Mountain",
  "team time trial": "Team Time Trial",
  "individual time trial": "Individual Time Trial",
};

export function formatStageDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
}
