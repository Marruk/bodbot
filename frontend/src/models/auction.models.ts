export type PlayerKey = 'daan' | 'mark' | 'niels' | 'hannah' | 'joran' | 'lucas' | 'jonas' | 'tadej'

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
  status: 'ongoing' | 'done',
  playerOrder: string[],
  currentBidder: number,
  rider: string,
  riderInfo: RiderInfo | null,
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
  code: (
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
    previousRiders: string[],
    riderInfo: RiderInfo | null,
  ) => BotResponse | Promise<BotResponse>
}

export interface BotResponse {
  amount: number | null
  comment: string | null
}

export interface RiderInfo {
  name: string
  nationality: string
  birthdate: string
  placeOfBirth: string | null
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
  }
  pointsPerSeasonHistory: {
    season: number
    points: number
    rank: number
  }[]
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