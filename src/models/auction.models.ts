export type PlayerKey = 'tadej' | 'jonas' | 'daan' | 'mark' | 'niels'

export interface Team {
  key: PlayerKey,
  bot: Bot,
  riders: {
    name: string,
    amount: number,
    comment: string | null
  }[],
  moneyLeft: number
}

export interface Lot {
  status: 'idle' | 'ongoing' | 'done',
  playerOrder: string[],
  currentBidder: number,
  rider: string,
  winningBid: Bid | null,
  allBids: Bid[]
}

export interface Bid {
  player: PlayerKey,
  amount: number | null,
  comment: string | null,
  isValid: boolean,
  isLoading: boolean
}

export interface Bot {
  key: PlayerKey
  owner: string
  name: string
  type: 'script' | 'server'
  endpoint?: string,
  code?: (
    rider: string,
    riderBib: number,
    highestBid: number | null,
    highestBidBy: PlayerKey | null,
    bids: {
      player: PlayerKey,
      amount: number,
      comment: string | null
    }[],
    you: {
      moneyLeft: number,
      riders: {
        name: string,
        amount: number,
        comment: string | null
      }[]
    },
    others: {
      key: PlayerKey,
      moneyLeft: number,
      riders: {
        name: string,
        amount: number,
        comment: string | null
      }[]
    }[],
    upcomingRiders: string[],
    previousRiders: string[]
  ) => BotResponse
}

export interface BotResponse {
  amount: number | null
  comment: string | null
}

export type LogItem = {
  type: 'AUCTION_STARTED'
} | {
  type: 'LOT_ENDED',
  rider: string,
  winningBid: Bid | null,
  allBids: Bid[]
} | {
  type: 'AUCTION_ENDED'
}