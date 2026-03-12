import { BOTS } from "../data/bots";
import type { LogItem, Lot, StartListEntry, Team } from "../models/auction.models";

export interface State {
  status: 'idle' | 'ongoing' | 'done',
  teams: Team[],
  currentLot: Lot | null,
  startlist: StartListEntry[],
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
  startlist: [],
  upcomingRiders: [],
  previousRiders: [],
  log: [{
    type: 'AUCTION_STARTED'
  }]
};