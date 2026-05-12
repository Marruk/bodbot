/* eslint-disable @typescript-eslint/no-unused-vars */

// wordt alleen aangeroepen als:
// - je team niet vol is
// - je meer geld hebt dan het laatste hoogste bod
// - je niet het hoogste bod hebt
// komt eigenlijk gewoon neer als het nog zin heeft om een bod te doen dus ja

export default function bot(
  rider: string, // naam zoals op https://www.procyclingstats.com/race/giro-d-italia/2026/startlist/alphabetical
  riderBib: number, // nummer zoals op https://www.procyclingstats.com/race/giro-d-italia/2026/startlist/alphabetical (-1 als het niet bekend is)
  highestBid: number | null, // hoogste bod, is nooit van jou
  highestBidBy: 'daan' | 'mark' | 'niels' | 'lucas' | 'hannah' | 'joran' | 'tom' | 'hendrik' | 'jonas' | 'tadej' | 'wout' | null, // hoogste bod persoon
  bids: { // alle boden (in oplopende volgorde), inclusief die van jou
    player: 'daan' | 'mark' | 'niels' | 'lucas' | 'hannah' | 'joran' | 'tom' | 'hendrik' | 'jonas' | 'tadej' | 'wout', // naam
    amount: number, // geboden bedrag
    comment: string | null, // leuk berichtje
  }[],
  you: {
    moneyLeft: number, // hoeveel geld je nog hebt (huidige bod is er niet afgehaald)
    riders: { // wie je al in je team hebt
      name: string, // fietser
      amount: number, // prijs
      comment: string | null // leuk berichtje
    }[],
  },
  others: { // de rest, jij komt hier niet voor
    key: 'daan' | 'mark' | 'niels' | 'lucas' | 'hannah' | 'joran' | 'tom' | 'hendrik' | 'jonas' | 'tadej' | 'wout', // iedereen die meedoet
    moneyLeft: number, // hoeveel geld ze nog hebben
    riders: { // wie ze al in hun team hebben
      name: string, // fietser
      amount: number, // prijs
      comment: string | null // leuk berichtje
    }[],
  }[],
  upcomingRiders: string[], // wie er nog komen in alfabetische volgorde (exclusief huidige)
  previousRiders: string[], // wie er al zijn geweest in alfabetische volgorde (exclusief huidige)
  riderInfo: { // wat info van PCS, maar misschien ook niet
    name: string // naam
    nationality: string // land code (twee letters)
    birthdate: string // gewoon lekker in een string: YYYY-MM-DD
    placeOfBirth: string | null // mooie plek
    currentTeam: string | null // lekker voor het teamgevoel
    height: number | null // lengte in meter
    weight: number | null  // zwaarte in kilogram
    imageUrl: string | null // leuk kiekje
    pointsPerSpeciality: { // PCS punten, spreekt voor zich
      oneDayRaces: number,
      gc: number,
      timeTrial: number,
      sprint: number,
      climber: number,
      hills: number,
    },
    pointsPerSeasonHistory: { // punten per seizoen, aflopend
      season: number, // jaartal
      points: number, // aantal punten
      rank: number, // ranking van dat jaar
    }[],
  } | null,
): {
  amount: number | null, // hoeveel je wil bieden, moet deelbaar zijn door een ton
  comment: string | null // leuk berichtje doe iedereen de groeten
} {
  const randomAmount = (highestBid ?? 0) + (100000 * Math.round(Math.random() * 5 + 1))

  const doBid = Math.random() < 0.5

  return {
    amount: doBid ? Math.min(you.moneyLeft, randomAmount) : null,
    comment: doBid ? "ok dit is echt mijn laatste bod" : "deze hoef ik niet"
  }
}
