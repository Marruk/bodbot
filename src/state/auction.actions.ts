import type { Bid } from "@/models/auction.models";

export type AuctionAction = {
  type: 'start'
} | {
  type: 'restart'
} | {
  type: 'lot-start',
  rider: string,
  playerOrder: string[]
} | {
  type: 'bid-received',
  bid: Bid
} | {
  type: 'lot-end'
} | {
  type: 'end'
};