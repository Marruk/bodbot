/* eslint-disable @typescript-eslint/no-unused-vars */

// wordt alleen aangeroepen als:
// - je team niet vol is
// - je meer geld hebt dan het laatste hoogste bod
// - je niet het hoogste bod hebt
// komt eigenlijk gewoon neer als het nog zin heeft om een bod te doen dus ja

export function bot(
  rider: string, // naam zoals op https://www.procyclingstats.com/race/vuelta-a-espana/2025/startlist/alphabetical
  riderBib: number, // nummer zoals op https://www.procyclingstats.com/race/vuelta-a-espana/2025/startlist/alphabetical (-1 als het niet bekend is)
  highestBid: number | null, // hoogste bod, is nooit van jou
  highestBidBy: 'tadej' | 'jonas' | 'daan' | null, // hoogste bod persoon
  bids: { // alle boden (in oplopende volgorde), inclusief die van jou
    player: 'tadej' | 'jonas' | 'daan', // naam
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
    key: 'jonas' | 'tadej' | 'daan', // iedereen die meedoet
    moneyLeft: number, // hoeveel geld ze nog hebben
    riders: { // wie ze al in hun team hebben
      name: string, // fietser
      amount: number, // prijs
      comment: string | null // leuk berichtje
    }[],
  }[],
  upcomingRiders: string[], // wie er nog komen in alfabetische volgorde (exclusief huidige)
  previousRiders: string[] // wie er al zijn geweest in alfabetische volgorde (exclusief huidige)
): {
  amount: number | null, // hoeveel je wil bieden, moet deelbaar zijn door een ton
  comment: string | null // leuk berichtje doe iedereen de groeten
} {
  const randomAmount = (highestBid ?? 0) + (100000 * Math.round(Math.random() * 5 + 1))

  const doBid = Math.random() < 0.5

  return {
    amount: doBid ? null : Math.min(you.moneyLeft, randomAmount),
    comment: doBid ? "deze hoef ik niet" : "geef"
  }
}