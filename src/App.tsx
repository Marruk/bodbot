import { Separator } from '@radix-ui/react-separator';
import { Bike } from 'lucide-react';
import { useReducer } from 'react';
import './App.css';
import AuctionInfo from './components/auction-info';
import Lot from './components/lot';
import Teams from './components/teams';
import { ThemeProvider } from './components/theme-provider';
import { ThemeToggle } from './components/theme-toggle';
import { Button } from './components/ui/button';
import { BOTS } from './data/bots';
import type { Bid, PlayerKey, Team } from './models/auction.models';
import { auctionReducer } from './state/auction.reducer';
import { initialState, type State } from './state/auction.state';

function initState(): State {
  return { ...initialState }
}

function App() {
  const [state, dispatch] = useReducer(
    auctionReducer,
    null,
    initState
  );

  const startAuction = () => dispatch({ type: 'start' })
  const restartAuction = () => dispatch({ type: 'restart' })

  const nextLot = async () => {
    const { rider, playerOrder, players, upcomingRiders, boughtRiders } = prepareLotData(state)

    dispatch({ type: 'lot-start', rider, playerOrder })

    let currentBidderIndex = 0
    let currentHighestBidderIndex = null
    const bids: Bid[] = []

    while (currentHighestBidderIndex !== currentBidderIndex) {
      if (currentHighestBidderIndex === null) {
        currentHighestBidderIndex = 0
      }

      const currentBidderKey: PlayerKey = playerOrder[currentBidderIndex]
      const currentBidder = state.teams.find(team => team.key === currentBidderKey)
      const highestBid = bids.filter(bid => bid.amount !== null && bid.isValid).sort((a, b) => (b.amount ?? 0) - (a.amount ?? 0))[0]

      if (currentBidder === undefined || currentBidder.riders.length === 8 || ((currentBidder.moneyLeft ?? 0) < (highestBid?.amount ?? 0) + 100000)) {
        currentBidderIndex = (currentBidderIndex + 1) % state.teams.length
        continue
      }

      const bid: Bid = {
        player: currentBidderKey,
        amount: null,
        comment: null,
        isValid: true
      }

      try {
        const receivedBid = currentBidder?.bot.code(
          rider,
          highestBid?.amount ?? null,
          highestBid?.player ?? null,
          bids.filter(bid => bid.amount !== null).map(bid => ({
            player: bid.player,
            amount: bid.amount ?? -1,
            comment: bid.comment
          })),
          {
            moneyLeft: currentBidder.moneyLeft,
            riders: currentBidder.riders
          },
          players.filter(p => p.key !== currentBidderKey),
          upcomingRiders,
          boughtRiders
        )

        bid.amount = receivedBid?.amount ?? null
        bid.comment = receivedBid?.comment ?? null
      } catch (error) {
        bid.isValid = false
        console.error(error)
      }

      if ((bid.amount ?? 0) > currentBidder.moneyLeft ||
          ((bid.amount ?? 0) % 100000 !== 0) ||
          (bid.amount !== null && (bid.amount < (highestBid?.amount ?? 0) + 100000))) {
        bid.isValid = false
      }

      if (bid.isValid && bid.amount !== null) {
        currentHighestBidderIndex = currentBidderIndex
      }

      bids.push(bid)
      dispatch({ type: 'bid-received', bid })
      currentBidderIndex = (currentBidderIndex + 1) % state.teams.length

      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    dispatch({ type: 'rider-end' })

    if (state.upcomingRiders.length === 0) {
      dispatch({
        type: 'end'
      })
    }
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="bg-popover p-8">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bike /><h1 className="text-2xl font-bold">Lekker veilen zonder met elkaar te hoeven praten</h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
      <Separator className="bg-border data-[orientation=horizontal]:h-px" />
      <div className="p-8">
        <div className="container mx-auto">
          <div className="flex items-center justify-between gap-8">
            <AuctionInfo upcomingRiders={state.upcomingRiders}></AuctionInfo>
            <div>
            { state.status === 'idle' &&
                <Button onClick={() => startAuction()}>
                  He ho lets go
                </Button>
              }
            { state.status === 'ongoing' &&
              <Button disabled={state.currentLot?.status === 'ongoing'} onClick={() => nextLot()}>
                Volgende fietser
              </Button>
            }
            { state.status === 'done' &&
              <Button onClick={() => restartAuction()}>
                ff opnieuw
              </Button>
            }
            </div>
          </div>
        </div>
      </div>
      <Separator className="bg-border data-[orientation=horizontal]:h-px" />
      <div className="p-8">
        <div className="container mx-auto">
          <div className="flex gap-16">
            <div className="max-w-[320px] flex-1 break-inside-avoid-column">
              <Teams teams={state.teams}></Teams>
            </div>
            <div className="break-inside-avoid-column flex-1">
              { state.status === 'ongoing' && state.currentLot !== null &&
                <Lot lot={state.currentLot} />
              }
            </div>
            <div className="break-inside-avoid-column">

            </div>
          </div>
        </div>
      </div>
      <Separator className="bg-border data-[orientation=horizontal]:h-px" />
      <div className="p-8">
        {JSON.stringify(state)}
      </div>
    </ThemeProvider>
  )
}

export default App

function prepareLotData(state: State): { rider: string, playerOrder: PlayerKey[], players: Team[], upcomingRiders: string[], boughtRiders: string[]; } {
  const randomRiderIndex = Math.floor(Math.random() * (state.upcomingRiders.length - 1))
  const rider = state.upcomingRiders[randomRiderIndex]
  const randomOrder = shufflePlayerOrder(Array(state.teams.length).fill(0).map((_, i) => i))
  const randomPlayerOrder = randomOrder.map(i => Object.values(BOTS)[i].key)

  const upcomingRiders = [...state.upcomingRiders]
  upcomingRiders.splice(randomRiderIndex, 1)

  return {
    rider,
    playerOrder: randomPlayerOrder,
    players: state.teams,
    upcomingRiders,
    boughtRiders: state.teams.flatMap(t => t.riders.map(r => r.name)).sort((b, a) => a.localeCompare(b))
  }
}

function shufflePlayerOrder(array: number[]) {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array
}

