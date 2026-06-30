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
  const ME_ANDERE_FAV = 'lucas'

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
  const maxBid = meFavKomtNog ? Math.max(0, you.moneyLeft - (Math.max(...others.map(o => o.moneyLeft)) + 100_000)) : maxPossibleBid

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
  'ACKERMANN Pascal',
  'AERTS Toon',
  'ALEOTTI Giovanni',
  'ANDRESEN Tobias Lund',
  'ARENSMAN Thymen',
  'ARRIETA Igor',
  'AULAR Orluis',
  'BAIS Mattia',
  'BALLERINI Davide',
  'BARGUIL Warren',
  'BARTA Will',
  'BARTHE Cyril',
  'BASTIAENS Ayco',
  'BATTISTELLA Samuele',
  'BAX Sjoerd',
  'BAYER Tobias',
  'BELOKI Markel',
  'BERNAL Egan',
  'BETTIOL Alberto',
  'BJERG Mikkel',
  'BLIKRA Erlend',
  'BOUWMAN Koen',
  'BUITRAGO Santiago',
  'BUSATTO Francesco',
  'CAMPENAERTS Victor',
  'CARUSO Damiano',
  'CAVAGNA Rémi',
  'CEPEDA Jefferson Alexander',
  'CHRISTEN Jan',
  'CHRISTEN Fabio',
  'CICCONE Giulio',
  'CONSONNI Simone',
  'CRESCIOLI Ludovico',
  'DE JONG Timo',
  'DE LA CRUZ David',
  'DE LIE Arnaud',
  'DE VRIES Hartthijs',
  'DENZ Nico',
  'DONALDSON Robert',
  'DONOVAN Mark',
  'DVERSNES LAVIK Fredrik',
  'ENGELHARDT Felix',
  'EULÁLIO Afonso',
  'FLYNN Sean',
  'FROIDEVAUX Robin',
  'GALL Felix',
  'GANNA Filippo',
  'GARCÍA CORTINA Iván',
  'GAROFOLI Gianmarco',
  'GEE-WEST Derek',
  'GEENS Jonas',
  'GHEBREIGZABHIER Amanuel',
  'GIDDINGS Joshua',
  'GONZÁLEZ David',
  'GROENEWEGEN Dylan',
  'GROVES Kaden',
  'GUALDI Simone',
  'GUDMESTAD Tord',
  'HAIG Jack',
  'HAMILTON Chris',
  'HARPER Chris',
  'HATHERLY Alan',
  'HINDLEY Jai',
  'HIRT Jan',
  'HOELGAARD Markus',
  'HOLTER Ådne',
  'HUENS Axel',
  'JACOBS Johan',
  'JUUL-JENSEN Christopher',
  'KELDERMAN Wilco',
  'KENCH Josh',
  'KIELICH Timo',
  'KOPECKÝ Tomáš',
  'KOPECKÝ Matyáš',
  'KUBIŠ Lukáš',
  'KULSET Johannes',
  'KUSS Sepp',
  'LARSEN Niklas',
  'LEEMREIZE Gijs',
  'LEKNESSUND Andreas',
  'LEMMEN Bart',
  'LIENHARD Fabian',
  'LIVYNS Arjen',
  'LONARDI Giovanni',
  'LÓPEZ Harold Martín',
  'LÓPEZ Juan Pedro',
  'LØLAND Sakarias Koller',
  'MAESTRI Mirco',
  'MAGLI Filippo',
  'MAGNIER Paul',
  'MALUCELLI Matteo',
  'MARCELLUSI Martin',
  'MAS Enric',
  'MENTEN Milan',
  'MIFSUD Andrea',
  'MIHKELS Madis',
  'MIHOLJEVIĆ Fran',
  'MILAN Jonathan',
  'MILESI Lorenzo',
  'MORGADO António',
  'MOSCHETTI Matteo',
  'MOSCON Gianni',
  'MOZZATO Luca',
  'MÜHLBERGER Gregor',
  'MULLEN Ryan',
  'NABERMAN Tim',
  'NAESEN Oliver',
  'NARVÁEZ Jhonatan',
  'O\'CONNOR Ben',
  'OLIVEIRA Nelson',
  'PAASSCHENS Mathijs',
  'PALETTI Luca',
  'PEDERSEN Rasmus Søjberg',
  'PELLIZZARI Giulio',
  'PENHOËT Paul',
  'PESENTI Thomas',
  'PIGANZOLI Davide',
  'PINARELLO Alessandro',
  'PLANCKAERT Edward',
  'PLOWRIGHT Jensen',
  'POELS Wout',
  'PRICE-PEJTERSEN Johan',
  'RACCAGNI NOVIERO Andrea',
  'RAFFERTY Darren',
  'REINDERS Elmar',
  'REX Tim',
  'ROCHAS Rémy',
  'ROJAS Vicente',
  'ROLLAND Brieuc',
  'ROMO Javier',
  'RONDEL Mathys',
  'ROTA Lorenzo',
  'RUBIO Einer',
  'RUTSCH Jonas',
  'SCARONI Christian',
  'SCHULTZ Nick',
  'SCOTSON Callum',
  'SEGAERT Alec',
  'SEVILLA Diego Pablo',
  'SHAW James',
  'SHEFFIELD Magnus',
  'SILVA Guillermo Thomas',
  'SMITH Dion',
  'SOBRERO Matteo',
  'SOLER Marc',
  'STANNARD Robert',
  'STAUNE-MITTET Johannes',
  'STEWART Jake',
  'STORER Michael',
  'STORK Florian',
  'STRONG Corbin',
  'STUYVEN Jasper',
  'SVESTAD-BÅRDSENG Embret',
  'SWIFT Connor',
  'TAROZZI Manuele',
  'TEUTENBERG Tim Torn',
  'TJØTTA Martin',
  'TONELLI Alessandro',
  'TSVETKOV Nikita',
  'TURCONI Filippo',
  'TURNER Ben',
  'ULISSI Diego',
  'VALGREN Michael',
  'VAN DEN BOSSCHE Fabio',
  'VAN DEN BROEK Frank',
  'VAN DER LEE Jardi Christiaan',
  'VAN DIJKE Mick',
  'VAN EETVELT Lennert',
  'VAN GESTEL Dries',
  'VAN UDEN Casper',
  'VENDRAME Andrea',
  'VERGALLITO Luca',
  'VERNON Ethan',
  'VINE Jay',
  'VINGEGAARD Jonas',
  'VLASOV Aleksandr',
  'WALSCHEID Max',
  'WARBASSE Larry',
  'YATES Adam',
  'ZAMBANINI Edoardo',
  'ZANA Filippo',
  'ZANONCELLO Enrico',
  'ZUKOWSKY Nickolas',
  'ZWIEHOFF Ben'
]