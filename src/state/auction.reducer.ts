import type { LogItem, Lot } from "@/models/auction.models";
import type { AuctionAction } from "./auction.actions";
import { initialState, type State } from "./auction.state";

export function auctionReducer(state: State, action: AuctionAction): State {
  switch (action.type) {
    case 'start': {
      return {
        ...state,
        status: 'ongoing',
        log: [
          ...state.log,
          {
            type: 'AUCTION_STARTED'
          }
        ]
      }
    }
    case 'restart': {
      return { ...initialState }
    }
    case 'end': {
      return {
        ...state,
        status: 'done',
        log: [
          ...state.log,
          {
            type: 'AUCTION_ENDED'
          }
        ]
      }
    }
    case 'lot-start': {
      const riderIndex = state.upcomingRiders.findIndex(r => r === action.rider)
      const newArray = [...state.upcomingRiders];
      newArray.splice(riderIndex, 1)

      return {
        ...state,
        currentLot: {
          status: 'ongoing',
          playerOrder: action.playerOrder,
          rider: action.rider,
          winningBid: null,
          allBids: []
        },
        upcomingRiders: newArray
      }
    }
    case 'bid-received': {
      const newBid = action.bid

      const oldBid = state.currentLot?.winningBid ?? null

      return {
        ...state,
        currentLot: state.currentLot === null ? null : {
          ...state.currentLot,
          winningBid: (oldBid?.amount ?? 0) < (newBid.amount ?? 0) ? newBid : oldBid,
          allBids: [
            ...state.currentLot.allBids,
            newBid
          ]
        }
      }
    }
    case 'lot-end': {
      const endedLot = state.currentLot
      if (endedLot === null) {
        return state
      }
    
      const winningBid = endedLot.winningBid
      const winnerIndex = state.teams.findIndex(t => winningBid?.player === t.key)

      return {
        ...state,
        currentLot: {
          ...state.currentLot,
          status: 'done',
        } as Lot,
        teams: winningBid === null || winningBid.amount === null ? state.teams : [
          ...state.teams.map((team, index) => {
            if (index === winnerIndex) {
              return {
                ...team,
                moneyLeft: team.moneyLeft - (winningBid.amount ?? 0),
                riders: [
                  ...team.riders,
                  {
                    name: endedLot.rider,
                    amount: (winningBid.amount ?? 0),
                    comment: winningBid.comment
                  }
                ]
              }
            } else {
              return team
            }
          }),
        ],
        previousRiders: [
          ...state.previousRiders,
          endedLot.rider
        ],
        log: [
          ...state.log,
          {
            type: 'LOT_ENDED',
            rider: endedLot.rider,
            winningBid,
            allBids: endedLot.allBids
          } as LogItem
        ]
      }
    }
    default: {
      throw Error('Oepsie')
    }
  }
}