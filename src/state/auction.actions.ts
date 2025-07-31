import type { Bid } from "@/models/auction.models";
import type { State } from "./auction.state";

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
} | {
  type: 'import-state',
  state: State
};