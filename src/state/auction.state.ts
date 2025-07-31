import { BOTS } from "../data/bots";
import { RIDERS } from "../data/riders";
import type { LogItem, Lot, Team } from "../models/auction.models";

export interface State {
  status: 'idle' | 'ongoing' | 'done',
  teams: Team[],
  currentLot: Lot | null,
  upcomingRiders: string[],
  previousRiders: string[],
  log: LogItem[]
}

export const initialState: State = {
  status: 'ongoing',
  teams: Object.values(BOTS).map(bot => ({
    key: bot.key,
    bot,
    moneyLeft: 10_000_000,
    riders: [] as { name: string, amount: number, comment: string | null }[]
  })),
  currentLot: null,
  upcomingRiders: [...RIDERS],
  previousRiders: [],
  log: [{
    type: 'AUCTION_STARTED'
  }]
};