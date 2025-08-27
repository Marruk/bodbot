
export type Rider = {
  name: string;
  team: string;
  role: 'climber' | 'sprinter' | 'GC' | 'domestique';
  maxBid: number;
  desirabilityScore: number;
  budgetRiderPool?: boolean;
};



export const TOP_RIDERS: Rider[] = [
  // UAE Team Emirates
  { name: "ALMEIDA João", team: "UAE Team Emirates", role: "GC", maxBid: 7000000, desirabilityScore: 85 },
  { name: "AYUSO Juan", team: "UAE Team Emirates", role: "GC", maxBid: 5000000, desirabilityScore: 75 },

  // Team Jumbo-Visma
  { name: "VINGEGAARD Jonas", team: "Team Visma | Lease a Bike", role: "GC", maxBid: 9400000, desirabilityScore: 100 },
  { name: "KUSS Sepp", team: "Team Visma | Lease a Bike", role: "domestique", maxBid: 1000000, desirabilityScore: 40 },

  // Lidl-Trek
  { name: "PEDERSEN Mads", team: "Lidl - Trek", role: "sprinter", maxBid: 3000000, desirabilityScore: 45 },
  { name: "CICCONE Giulio", team: "Lidl - Trek", role: "climber", maxBid: 1500000, desirabilityScore: 20 },

  // BORA - hansgrohe
  { name: "HINDLEY Jai", team: "Red Bull - BORA - hansgrohe", role: "GC", maxBid: 4000000, desirabilityScore: 50 },

  // Soudal Quick-Step
  { name: "LANDA Mikel", team: "Soudal Quick-Step", role: "GC", maxBid: 3000000, desirabilityScore: 45 },

  // INEOS Grenadiers
  { name: "BERNAL Egan", team: "INEOS Grenadiers", role: "GC", maxBid: 6000000, desirabilityScore: 65 },
  { name: "GANNA Filippo", team: "INEOS Grenadiers", role: "domestique", maxBid: 4000000, desirabilityScore: 55 },

  // Alpecin - Deceuninck
  { name: "PHILIPSEN Jasper", team: "Alpecin - Deceuninck", role: "sprinter", maxBid: 7000000, desirabilityScore: 75 },

  // EF Education - EasyPost
  { name: "CHAVES Esteban", team: "EF Education - EasyPost", role: "GC", maxBid: 1500000, desirabilityScore: 15 },

  // AG2R La Mondiale Team
  { name: "GALL Felix", team: "Decathlon AG2R La Mondiale Team", role: "GC", maxBid: 500000, desirabilityScore: 5 },

  // Bahrain - Victorious
  { name: "HAIG Jack", team: "Bahrain - Victorious", role: "GC", maxBid: 3000000, desirabilityScore: 35 },
  { name: "BUITRAGO Santiago", team: "Bahrain - Victorious", role: "GC", maxBid: 1500000, desirabilityScore: 25 },

  // Q36.5 Pro Cycling Team
  { name: "PIDCOCK Thomas", team: "Q36.5 Pro Cycling Team", role: "GC", maxBid: 3500000, desirabilityScore: 40 },


  // Groupama - FDJ
  { name: "GAUDU David", team: "Groupama - FDJ", role: "climber", maxBid: 4000000, desirabilityScore: 50 },

  // Team Jayco AlUla
  { name: "Ben O'Connor", team: "Team Jayco AlUla", role: "GC", maxBid: 2000000, desirabilityScore: 30 },

  // Cofidis
  { name: "BUCHMANN Emanuel", team: "Cofidis", role: "GC", maxBid: 2500000, desirabilityScore: 35 },

  // Intermarché - Wanty
  { name: "MEINTJES Louis", team: "Intermarché - Wanty", role: "GC", maxBid: 1000000, desirabilityScore: 20 },

  // Lotto
  { name: "VIVIANI Elia", team: "Lotto", role: "sprinter", maxBid: 1500000, desirabilityScore: 18 },
];



export const BUDGET_RIDERS: Rider[] = [
  { name: "BJERG Mikkel", team: "UAE Team Emirates", role: "domestique", maxBid: 0, desirabilityScore: 30, budgetRiderPool: true },
  { name: "GROßSCHARTNER Felix", team: "UAE Team Emirates", role: "climber", maxBid: 0, desirabilityScore: 33, budgetRiderPool: true },
  { name: "NOVAK Domen", team: "UAE Team Emirates", role: "domestique", maxBid: 0, desirabilityScore: 28, budgetRiderPool: true },
  { name: "VINE Jay", team: "UAE Team Emirates", role: "climber", maxBid: 0, desirabilityScore: 31, budgetRiderPool: true },
  { name: "ZINGLE Axel", team: "Team Visma", role: "sprinter", maxBid: 0, desirabilityScore: 20, budgetRiderPool: true },
  { name: "TULETT Ben", team: "Team Visma", role: "climber", maxBid: 0, desirabilityScore: 29, budgetRiderPool: true },
  { name: "LECERF Junior", team: "Soudal Quick-Step", role: "domestique", maxBid: 0, desirabilityScore: 24, budgetRiderPool: true },
  { name: "PARET-PEINTRE Valentin", team: "Soudal Quick-Step", role: "climber", maxBid: 0, desirabilityScore: 35, budgetRiderPool: true },
  { name: "REINDERINK Pepijn", team: "Soudal Quick-Step", role: "domestique", maxBid: 0, desirabilityScore: 22, budgetRiderPool: true },
  { name: "VERVAEKE Louis", team: "Soudal Quick-Step", role: "climber", maxBid: 0, desirabilityScore: 26, budgetRiderPool: true },
  { name: "JUNGELS Bob", team: "INEOS Grenadiers", role: "domestique", maxBid: 0, desirabilityScore: 28, budgetRiderPool: true },
  { name: "LANGELLOTTI Victor", team: "INEOS Grenadiers", role: "domestique", maxBid: 0, desirabilityScore: 22, budgetRiderPool: true },
  { name: "RIVERA Brandon Smith", team: "INEOS Grenadiers", role: "domestique", maxBid: 0, desirabilityScore: 21, budgetRiderPool: true },
  { name: "DEBRUYNE Ramses", team: "Alpecin - Deceuninck", role: "domestique", maxBid: 0, desirabilityScore: 20, budgetRiderPool: true },
  { name: "RIESEBEEK Oscar", team: "Alpecin - Deceuninck", role: "domestique", maxBid: 0, desirabilityScore: 18, budgetRiderPool: true },
  { name: "BELOKI Markel", team: "EF Education - EasyPost", role: "climber", maxBid: 0, desirabilityScore: 25, budgetRiderPool: true },
  { name: "CEPEDA Jefferson Alveiro", team: "Movistar Team", role: "climber", maxBid: 0, desirabilityScore: 28, budgetRiderPool: true },
  { name: "HESSMANN Michel", team: "Movistar Team", role: "domestique", maxBid: 0, desirabilityScore: 20, budgetRiderPool: true },
  { name: "PELLIZZARI Giulio", team: "Red Bull - BORA - hansgrohe", role: "domestique", maxBid: 0, desirabilityScore: 22, budgetRiderPool: true },
  { name: "VANSEVENANT Mauri", team: "Soudal Quick-Step", role: "domestique", maxBid: 0, desirabilityScore: 27, budgetRiderPool: true },
  { name: "GAROFOLI Gianmarco", team: "Soudal Quick-Step", role: "climber", maxBid: 0, desirabilityScore: 28, budgetRiderPool: true },
  { name: "Junior Kragh Andersen", team: "Lidl - Trek", role: "domestique", maxBid: 0, desirabilityScore: 23, budgetRiderPool: true },
  { name: "VERONA Carlos", team: "Lidl - Trek", role: "domestique", maxBid: 0, desirabilityScore: 24, budgetRiderPool: true },
  { name: "GALL Felix", team: "AG2R La Mondiale", role: "climber", maxBid: 0, desirabilityScore: 27, budgetRiderPool: true },
  { name: "Hugo Faura", team: "Burgos Burpellet BH", role: "domestique", maxBid: 0, desirabilityScore: 18, budgetRiderPool: true },
  { name: "CHUMIL Sergio Geovani", team: "Burgos Burpellet BH", role: "domestique", maxBid: 0, desirabilityScore: 20, budgetRiderPool: true },
  { name: "EDDY Patrick", team: "Team Picnic PostNL", role: "domestique", maxBid: 0, desirabilityScore: 20, budgetRiderPool: true },
  { name: "KOERDT Bjorn", team: "Team Picnic PostNL", role: "domestique", maxBid: 0, desirabilityScore: 18, budgetRiderPool: true },
  { name: "SEGAERT Alec", team: "Lotto", role: "climber", maxBid: 0, desirabilityScore: 30, budgetRiderPool: true },
  { name: "SLOCK Liam", team: "Lotto", role: "domestique", maxBid: 0, desirabilityScore: 22, budgetRiderPool: true },
  { name: "KNIGHT Oliver", team: "Cofidis", role: "domestique", maxBid: 0, desirabilityScore: 22, budgetRiderPool: true },
  { name: "SAMITIER Sergio", team: "Cofidis", role: "domestique", maxBid: 0, desirabilityScore: 22, budgetRiderPool: true },
  { name: "BOUWMAN Koen", team: "Team Jayco AlUla", role: "domestique", maxBid: 0, desirabilityScore: 25, budgetRiderPool: true },

  // Added new riders
  { name: "TEJADA Harold", team: "XDS Astana Team", role: "climber", maxBid: 0, desirabilityScore: 32, budgetRiderPool: true },
  { name: "ARCAS Jorge", team: "Movistar Team", role: "domestique", maxBid: 0, desirabilityScore: 22, budgetRiderPool: true },
  { name: "Dylan van Baarle", team: "Team Visma", role: "domestique", maxBid: 0, desirabilityScore: 35, budgetRiderPool: true },
  { name: "OLIVEIRA Ivo", team: "UAE Team Emirates", role: "domestique", maxBid: 0, desirabilityScore: 25, budgetRiderPool: true },
  { name: "SOLER Marc", team: "UAE Team Emirates", role: "climber", maxBid: 0, desirabilityScore: 34, budgetRiderPool: true },
];

export const ALL_RIDERS: Rider[] = TOP_RIDERS.concat(BUDGET_RIDERS)

export const TOP_TOP_RIDERS: Rider[] = TOP_RIDERS.filter(rider => rider.desirabilityScore >=75)