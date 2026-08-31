/* eslint-disable @typescript-eslint/no-unused-vars */

import { BOTS } from "@/data/bots"
import type { PlayerKey } from "@/models/auction.models"

const SESSION_STORAGE_KEY = 'MARKS_ZIEKE_BOT_OPSLAG'

export default function bot(
  rider: string,
  riderBib: number,
  highestBid: number | null,
  highestBidBy: PlayerKey | null,
  bids: {
    player: PlayerKey | null,
    amount: number,
    comment: string | null,
  }[],
  you: {
    moneyLeft: number,
    riders: {
      name: string,
      amount: number,
      comment: string | null
    }[],
  },
  others: {
    key: PlayerKey,
    moneyLeft: number,
    riders: {
      name: string,
      amount: number,
      comment: string | null
    }[],
  }[],
  upcomingRiders: string[],
  previousRiders: string[],
  riderInfo: {
    // wat info van PCS, maar misschien ook niet
    name: string; // naam
    nationality: string; // land code (twee letters)
    birthdate: string; // gewoon lekker in een string: YYYY-MM-DD
    placeOfBirth: string | null; // mooie plek
    currentTeam: string | null; // lekker voor het teamgevoel
    height: number | null; // lengte in meter
    weight: number | null; // zwaarte in kilogram
    imageUrl: string | null; // leuk kiekje
    pointsPerSpeciality: {
      // PCS punten, spreekt voor zich
      oneDayRaces: number;
      gc: number;
      timeTrial: number;
      sprint: number;
      climber: number;
      hills: number;
    };
    pointsPerSeasonHistory: {
      // punten per seizoen
      season: number; // jaartal
      points: number; // aantal punten
      rank: number; // ranking van dat jaar
    }[];
  } | null,
): {
  amount: number | null,
  comment: string | null
} {
  const hetIsInGodsHanden = () => {
    const doBid = Math.random() < 0.5

    return {
      amount: doBid ? Math.min(you.moneyLeft, (highestBid ?? 0) + 100000) : null,
      comment: "het is allemaal mis gegaan"
    }
  }

  if (DEZE_ZIJN_MOE.indexOf(rider) !== -1 && rider !== 'VINGEGAARD Jonas') {
    return {
      amount: null,
      comment: "deze is moe en is niet vingegaard"
    }
  }

  const ME_FAV = 'POGAČAR Tadej'
  const ME_ANDERE_FAV = 'tom'

  const ditIsMeFav = rider === ME_FAV
  const ikHebMeFav = you.riders.some(r => r.name === ME_FAV)
  const meFavKomtNog = upcomingRiders.indexOf(ME_FAV) !== -1

  const numberOfBoughtRiders = you.riders.length
  const maxPossibleBid = you.moneyLeft - ((8 - numberOfBoughtRiders - 1) * 100_000)

  // Blinde paniek
  if (!ditIsMeFav && !ikHebMeFav && !meFavKomtNog) {
    return hetIsInGodsHanden()
  }

  // Paniek
  if (upcomingRiders.length < (8 - numberOfBoughtRiders)) {
    if ((highestBid ?? 0) + 100_000 <= maxPossibleBid) {
      return {
        amount: (highestBid ?? 0) + 100_000,
        comment: "deze dan maar"
      }
    }
  }

  // Dit is me fav
  if (ditIsMeFav) {
    return {
      amount: you.riders.length === 7 ? you.moneyLeft : (highestBid ?? 0) + 100_000,
      comment: "dit is me fav"
    }
  }

  // Rustaaagh
  if (meFavKomtNog && you.riders.length === 7) {
    return {
      amount: null,
      comment: "me fav komt nog"
    }
  }

  // Even kijken wat de rest doet hoor
  const maxBid = meFavKomtNog ? Math.max(0, you.moneyLeft - (Math.max(...others.filter(o => o.riders.length < 8 && o.moneyLeft > 0).map(o => o.moneyLeft)) + 100_000)) : maxPossibleBid

  if (meFavKomtNog && (maxBid <= 0 || (maxBid < (highestBid ?? 0) + 100_000))) {
    return {
      amount: null,
      comment: "me fav komt nog"
    }
  }

  const tomHadKunnenBieden = others.find(o => o.key === ME_ANDERE_FAV && o.moneyLeft > 0 && o.riders.length < 8)
  const tomHeeftEenBodGedaan = bids.some(b => b.player === ME_ANDERE_FAV)
  const otherPlayersWithBids = [...new Set(bids.map(b => b.player).filter(k => k !== 'mark'))].length
  const othersWhoCanBid = others.filter(o => o.riders.length < 8 && o.moneyLeft > 0).length
  const theStrengsOfThePackIsTehWolf = otherPlayersWithBids >= Math.ceil(othersWhoCanBid / 2)

  if (tomHeeftEenBodGedaan || (!tomHadKunnenBieden && theStrengsOfThePackIsTehWolf)) {
    return {
      amount: (highestBid ?? 0) + 100_000,
      comment: `ik vertrouw op tom en anders op de rest`
    }
  } else {
    return {
      amount: null,
      comment: `voelt niet goed`
    }
  }
}

const DEZE_ZIJN_MOE = [
  "ABRAHAMSEN Jonas",
  "ACKERMANN Pascal",
  "AFFINI Edoardo",
  "ALAPHILIPPE Julian",
  "ALLEGAERT Piet",
  "ARANBURU Alex",
  "ARENSMAN Thymen",
  "ARMIRAIL Bruno",
  "ARTZ Huub",
  "ASGREEN Kasper",
  "ASKEY Lewis",
  "AYUSO Juan",
  "AZPARREN Xabier Mikel",
  "BALDERSTONE Abel",
  "BALLERINI Davide",
  "BARGUIL Warren",
  "BAUDIN Alex",
  "BAUHAUS Phil",
  "BENNETT George",
  "BENOOT Tiesj",
  "BERCKMOES Jenno",
  "BERNAL Egan",
  "BERTHET Clément",
  "BERWICK Sebastian",
  "BIERMANS Jenthe",
  "BIESTERBOS Frits",
  "BITTNER Pavel",
  "BOL Cees",
  "BRAZ AFONSO Clément",
  "BREUILLARD Nicolas",
  "CAMPENAERTS Victor",
  "CARAPAZ Richard",
  "CARUSO Damiano",
  "CASTRILLO Pablo",
  "CATTANEO Mattia",
  "CEPEDA Jefferson Alveiro",
  "CHARMIG Anthon",
  "CORT Magnus",
  "COSTIOU Ewen",
  "CRAPS Lars",
  "DE KLEIJN Arvid",
  "DE LIE Arnaud",
  "DEBRUYNE Ramses",
  "DEGENKOLB John",
  "DEL TORO Isaac",
  "DELBOVE Joris",
  "DELETTRE Alexandre",
  "DENZ Nico",
  "DHONDT Robbe",
  "DILLIER Silvan",
  "DURBRIDGE Luke",
  "EENKHOORN Pascal",
  "ENGELHARDT Felix",
  "EVENEPOEL Remco",
  "FOSS Tobias",
  "FRETIN Milan",
  "FRIGO Marco",
  "GANNA Filippo",
  "GARCÍA PIERNA Raúl",
  "GATE Aaron",
  "GAVIRIA Fernando",
  "GEE-WEST Derek",
  "GERMANI Lorenzo",
  "GIRMAY Biniam",
  "GODON Dorian",
  "GRADEK Kamil",
  "GRÉGOIRE Romain",
  "GROßSCHARTNER Felix",
  "GUERNALEC Thibault",
  "HAGENES Per Strand",
  "HALLER Marco",
  "HARPER Chris",
  "HEALY Ben",
  "HERMANS Quinten",
  "HESSMANN Michel",
  "HIGUITA Sergio",
  "HINDLEY Jai",
  "HIRSCHI Marc",
  "HOOLE Daan",
  "HOWSON Damien",
  "IZAGIRRE Ion",
  "JEGAT Jordan",
  "JOHANNESSEN Tobias Halland",
  "JOHANNESSEN Anders Halland",
  "JORGENSON Matteo",
  "KANTER Max",
  "KIRSCH Alex",
  "KOOIJ Olav",
  "KUSS Sepp",
  "KWIATKOWSKI Michał",
  "LE BERRE Mathis",
  "LIPOWITZ Florian",
  "LOUVEL Matis",
  "MÄRKL Niklas",
  "MARSMAN Tim",
  "MARTIN Guillaume",
  "MARTINEZ Lenny",
  "MATTHEWS Michael",
  "MCNULTY Brandon",
  "MERLIER Tim",
  "MEURISSE Xandro",
  "MOHORIČ Matej",
  "MOLENAAR Alex",
  "NEILANDS Krists",
  "NICOLAU Joel",
  "O'BRIEN Kelland",
  "O'CONNOR Ben",
  "OLDANI Stefano",
  "OLIVEIRA Nelson",
  "OTRUBA Jakub",
  "PACHER Quentin",
  "PAGE Hugo",
  "PARET-PEINTRE Valentin",
  "PARET-PEINTRE Aurélien",
  "PARRA José Félix",
  "PEDERSEN Mads",
  "PHILIPSEN Jasper",
  "PIDCOCK Tom",
  "PIGANZOLI Davide",
  "PLANCKAERT Edward",
  "PLAPP Luke",
  "PLUIMERS Rick",
  // "POGAČAR Tadej",
  "POLITT Nils",
  "PRODHOMME Nicolas",
  "QUINN Sean",
  "RICCITELLO Matthew",
  "RICKAERT Jonas",
  "ROMO Javier",
  "RUBIO Einer",
  "RUSSO Clément",
  "SCHMID Mauro",
  "SEIXAS Paul",
  "SIMMONS Quinn",
  "SKAARSETH Anders",
  "SKJELMOSE Mattias",
  "SKUJIŅŠ Toms",
  "SLOCK Liam",
  "STANNARD Robert",
  "STEINHAUSER Georg",
  "STEWART Jake",
  "STORER Michael",
  "STUYVEN Jasper",
  "TARLING Joshua",
  "TEJADA Harold",
  "TEUNISSEN Mike",
  "THOMAS Benjamin",
  "TIBERI Antonio",
  "TRATNIK Jan",
  "TRENTIN Matteo",
  "TRÆEN Torstein",
  "TURGIS Anthony",
  "UIJTDEBROEKS Cian",
  "VACEK Mathias",
  "VALGREN Michael",
  "VAN ASBROECK Tom",
  "VAN BAARLE Dylan",
  "VAN DEN BERG Julius",
  "VAN DEN BROEK Frank",
  "VAN DER POEL Mathieu",
  "VAN DIJKE Tim",
  "VAN EETVELT Lennert",
  "VAN GILS Maxim",
  "VAN LERBERGHE Bert",
  "VAN MECHELEN Vlad",
  "VAN MOER Brent",
  "VAN WILDER Ilan",
  "VAUQUELIN Kévin",
  "VEISTROFFER Baptiste",
  "VELASCO Simone",
  "VERCHER Mattéo",
  "VERMEERSCH Florian",
  "VERONA Carlos",
  "VERSTRYNGE Emiel",
  "VERVAEKE Louis",
  "VINGEGAARD Jonas",
  "VINOKUROV Nicolas",
  "VOISARD Yannis",
  "WALKER Max",
  "WELLENS Tim",
  "WRIGHT Fred",
  "WÆRENSKJOLD Søren",
  "YATES Adam",
  "ZIMMERMANN Georg"
]