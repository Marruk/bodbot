/* eslint-disable @typescript-eslint/no-unused-vars */

import type { PlayerKey } from "@/models/auction.models"

export default function bot(
  rider: string,
  riderBib: number,
  highestBid: number | null,
  highestBidBy: PlayerKey | null,
  bids: {
    player: PlayerKey,
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
    name: string
    nationality: string
    birthdate: string
    placeOfBirth: string | null
    currentTeam: string | null
    height: number | null
    weight: number | null
    imageUrl: string | null
    pointsPerSpeciality: {
      oneDayRaces: number,
      gc: number,
      timeTrial: number,
      sprint: number,
      climber: number,
      hills: number,
    },
    pointsPerSeasonHistory: {
      season: number,
      points: number,
      rank: number,
    }[],
  } | null,
): Promise<{
  comment: string | null
  amount: number | null,
}> {
  return fetch('http://localhost:8000/bot/lucas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rider, riderBib, highestBid, highestBidBy, bids, you, others, upcomingRiders, previousRiders, riderInfo })
  }).then(r => r.json())
}
