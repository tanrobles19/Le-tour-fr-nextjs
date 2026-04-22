import fs from "fs";
import path from "path";
import Papa from "papaparse";

interface TeamRow {
  team_name: string;
  uci_code: string;
  country: string;
  team_category: string;
}

const jerseyMap: Record<string, string> = {
  ADC: "alpecin_premier_tech.png",
  DAT: "decathlon_cma.avif",
  EFE: "education_easypost.avif",
  GFC: "groupama_FDJ_united.jpg",
  IGD: "ineos_grenadiers.webp",
  LTK: "lidl_trek.jpg",
  IWA: "lotto_intermarché.jpg",
  MOV: "movistar_team.avif",
  NSN: "NSN_cycling_team.png",
  RBH: "red_bull_bORA_hansgrohe.webp",
  SOQ: "soudal_quick_step.jpg",
  TBV: "bahrain_victorious.avif",
  JAY: "team_jayco_AlUla.avif",
  TPP: "team_picnic_PostNL.avif",
  UAD: "UAE_team_emirates.webp",
  UNX: "uno_x_mobility.avif",
  TVL: "team_visma.webp",
  XAT: "XDS_astana_team.avif",
  CRS: "caja_rural_seguros.jpg",
  COF: "Cofidis.jpg",
  PIN: "pinarello.png",
  TTE: "total_energies.webp",
  TUD: "tudor_pro_cycling_team.webp",
};

export function loadTeams() {
  const csvPath = path.join(process.cwd(), "public/uci_teams.csv");
  const csvText = fs.readFileSync(csvPath, "utf-8");
  const { data } = Papa.parse<TeamRow>(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  return data.map((row) => {
    const jerseyFile = jerseyMap[row.uci_code];
    return {
      ...row,
      jerseySrc: jerseyFile ? `/bikes/${jerseyFile}` : null,
    };
  });
}
