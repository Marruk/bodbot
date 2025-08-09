// wordt alleen aangeroepen als:
// - je team niet vol is
// - je meer geld hebt dan het laatste hoogste bod
// - je niet het hoogste bod hebt
// komt eigenlijk gewoon neer als het nog zin heeft om een bod te doen dus ja

export default async function bot(
  rider: string, // naam zoals op https://www.procyclingstats.com/race/vuelta-a-espana/2025/startlist/alphabetical
  riderBib: number, // nummer zoals op https://www.procyclingstats.com/race/vuelta-a-espana/2025/startlist/alphabetical (-1 als het niet bekend is)
  highestBid: number | null, // hoogste bod, is nooit van jou
  highestBidBy: 'tadej' | 'jonas' | 'daan' | 'mark' | 'niels' | null, // hoogste bod persoon
  bids: { // alle boden (in oplopende volgorde), inclusief die van jou
    player: 'tadej' | 'jonas' | 'daan' | 'mark' | 'niels', // naam
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
    key: 'jonas' | 'tadej' | 'daan' | 'mark' | 'niels', // iedereen die meedoet
    moneyLeft: number, // hoeveel geld ze nog hebben
    riders: { // wie ze al in hun team hebben
      name: string, // fietser
      amount: number, // prijs
      comment: string | null // leuk berichtje
    }[],
  }[],
  upcomingRiders: string[], // wie er nog komen in alfabetische volgorde (exclusief huidige)
  previousRiders: string[] // wie er al zijn geweest in alfabetische volgorde (exclusief huidige)
): Promise<{
  amount: number | null, // hoeveel je wil bieden, moet deelbaar zijn door een ton
  comment: string | null // leuk berichtje doe iedereen de groeten
}> {
  const endpoint = 'https://wielrenbots.beljaartmc.nl/bid'

  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')

  const request: RequestInfo = new Request(endpoint, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      rider, riderBib, highestBid, highestBidBy, bids, you, others, upcomingRiders, previousRiders
    })
  })

  return fetch(request).then(response => response.json())
}