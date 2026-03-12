import type { Bid, RiderInfo, StartListEntry } from "@/models/auction.models";
import type { State } from "./auction.state";

export type AuctionAction = {
  type: 'start'
} | {
  type: 'restart'
} | {
  type: 'lot-start',
  rider: string,
  riderInfo: RiderInfo | null,
  playerOrder: string[]
} | {
  type: 'bid-pending',
  bid: Bid
}| {
  type: 'bid-received',
  bid: Bid
} | {
  type: 'lot-end'
} | {
  type: 'end'
} | {
  type: 'import-state',
  state: State
} | {
  type: 'set-startlist',
  riders: StartListEntry[]
};