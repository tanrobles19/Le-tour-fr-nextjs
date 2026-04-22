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
