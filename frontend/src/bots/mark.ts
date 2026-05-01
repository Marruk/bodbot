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
  previousRiders: string[]
): {
  amount: number | null,
  comment: string | null
} {
  const randomAmount = (highestBid ?? 0) + (100000 * Math.round(Math.random() * 5 + 1))

  const doBid = Math.random() < 0.5

  return {
    amount: doBid ? Math.min(you.moneyLeft, randomAmount) : null,
    comment: doBid ? "ok dit is echt mijn laatste bod" : "deze hoef ik niet"
  }
}