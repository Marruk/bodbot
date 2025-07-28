export function bot(
  rider, riderBib, highestBid, highestBidBy, bids, you, others, upcomingRiders, previousRiders
) {
  const randomAmount = (highestBid ?? 0) + (100000 * Math.round(Math.random() * 5 + 1))

  const doBid = Math.random() < 0.5

  return {
    amount: doBid ? null : Math.min(you.moneyLeft, randomAmount),
    comment: doBid ? "deze hoef ik niet" : "geef"
  }
}