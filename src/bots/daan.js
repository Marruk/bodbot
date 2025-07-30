export function bot(
  rider, riderBib, highestBid, highestBidBy, bids, you, others, upcomingRiders, previousRiders
) {
  let amount = 0;
  let comment = "Nooit van gehoord";
  if (rider.startsWith("POGA")) {
    amount = you.moneyLeft;
    comment = "Dus toch!"
  } else if (rider.startsWith("VIN")) {
    amount = you.moneyLeft;
    comment = "Vinnie heuh, hopen dat er niet teveel vins meedoen"
  }

  return {amount, comment};
}
