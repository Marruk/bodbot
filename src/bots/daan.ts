import type {BotResponse, PlayerKey} from "@/models/auction.models.ts";

interface Player {
  moneyLeft: number,
  riders: {
    name: string,
    amount: number,
    comment: string | null
  }[]
}

interface BodBy {
  player: PlayerKey,
  amount: number,
  comment: string | null
}

export function bot(
  rider: string, riderBib: number, highestBid: number | null, highestBidBy: PlayerKey | null, bids: BodBy[], you: Player, others: Player[], upcomingRiders: string[], previousRiders: string[]
): BotResponse {
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
