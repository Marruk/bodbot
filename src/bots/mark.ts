/* eslint-disable @typescript-eslint/no-unused-vars */

import type { PlayerKey } from "@/models/auction.models"

export default async function bot(
  rider: string,
  riderBib: number,
  highestBid: number | null,
  highestBidBy:  PlayerKey | null,
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
  previousRiders: string[]
): Promise<{
  amount: number | null,
  comment: string | null
}> {
  const randomAmount = (highestBid ?? 0) + (100000 * Math.round(Math.random() * 5 + 1))

  const doBid = Math.random() < 0.5

  return {
    amount: doBid ? null : Math.min(you.moneyLeft, randomAmount),
    comment: doBid ? "deze hoef ik niet" : "ok dit is echt mijn laatste bod"
  }
}