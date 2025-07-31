import { Separator } from '@radix-ui/react-separator';
import { Rabbit, Tablets, Turtle } from 'lucide-react';
import { useReducer, useRef, useState } from 'react';
import { Toaster } from 'sonner';
import './App.css';
import AuctionInfo from './components/auction-info';
import Header from './components/header';
import Log from './components/log';
import Lot from './components/lot';
import Teams from './components/teams';
import { useTheme } from './components/theme/theme-provider';
import { Button } from './components/ui/button';
import { Switch } from './components/ui/switch';
import { ToggleGroup, ToggleGroupItem } from './components/ui/toggle-group';
import { BOTS } from './data/bots';
import { RIDER_BIBS } from './data/riders';
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

  const { theme } = useTheme()
  const [isTurboMode, setTurboMode] = useState(false)
  const [turboSpeed, setTurboSpeed] = useState("default")
  const nextRiderRef = useRef<HTMLButtonElement>(null)

  const turboSpeeds: { [label: string]: number } = {
    "fast": 10,
    "default": 500,
    "slow": 1000
  }

  const startAuction = () => dispatch({ type: 'start' })
  const restartAuction = () => dispatch({ type: 'restart' })

  const nextLot = async () => {
    const { rider, playerOrder, players, upcomingRiders, previousRiders } = prepareLotData(state)

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

      if (currentBidder === undefined || currentBidder.riders.length === 8 || ((currentBidder.moneyLeft ?? 0) < (highestBid?.amount ?? 0) + 100_000)) {
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
          RIDER_BIBS[rider] ?? -1,
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
          previousRiders
        )

        bid.amount = receivedBid?.amount ?? null
        bid.comment = receivedBid?.comment ?? null
      } catch (error) {
        bid.isValid = false
        console.error(error)
      }

      if ((bid.amount ?? 0) > currentBidder.moneyLeft ||
          ((bid.amount ?? 0) % 100_000 !== 0) ||
          (bid.amount !== null && (bid.amount < (highestBid?.amount ?? 0) + 100_000))) {
        bid.isValid = false
      }

      if (bid.isValid && bid.amount !== null) {
        currentHighestBidderIndex = currentBidderIndex
      }

      bids.push(bid)
      dispatch({ type: 'bid-received', bid })
      currentBidderIndex = (currentBidderIndex + 1) % state.teams.length

      await new Promise((resolve) => setTimeout(resolve, turboSpeeds[turboSpeed]));
    }

    dispatch({ type: 'lot-end' })

    if (upcomingRiders.length === 0) {
      dispatch({
        type: 'end'
      })
    } else {
      if (isTurboMode) {
        await new Promise((resolve) => setTimeout(resolve, turboSpeeds[turboSpeed]));
        nextRiderRef.current?.click()
      }
    }
  }

  const getSerializedState = (): string => {
    return JSON.stringify(state)
  }

  const setState = (state: State)  => {
    dispatch({ type: 'import-state', state })
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header getSerializedState={getSerializedState} setState={setState} />
        <div className="flex-1 px-8">
          <Teams teams={state.teams}></Teams>
          <div className="gap-16">
            <div className="break-inside-avoid-column flex-1">
              { state.status === 'ongoing' && state.currentLot !== null &&
                <Lot lot={state.currentLot} />
              }
            </div>
          </div>
        </div>
        <Separator className="bg-border data-[orientation=horizontal]:h-px" />
        <div className="p-8">
          <Log items={state.log} />
        </div>
        <div className="sticky bottom-0 bg-background shadow-md">
          <Separator className="bg-border data-[orientation=horizontal]:h-px" />
          <div className="p-8">
            <div>
              <div className="flex items-center justify-between gap-8">
                <div>
                { state.status === 'idle' &&
                    <Button onClick={() => startAuction()}>
                      He ho lets go
                    </Button>
                  }
                { state.status !== 'idle' &&
                  <div className="flex-none flex items-center gap-12">
                    <div className="text-right min-w-[160px]">
                      { state.status === 'ongoing' &&
                        <Button size="lg" ref={nextRiderRef} disabled={state.currentLot?.status === 'ongoing'} onClick={() => nextLot()}>
                          Volgende fietser
                        </Button>
                      }
                      { state.status === 'done' &&
                        <Button onClick={() => restartAuction()}>
                          Even opnieuw hoor
                        </Button>
                      }
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm whitespace-nowrap">
                        Snelheid
                      </div>
                      <ToggleGroup onValueChange={setTurboSpeed} defaultValue="default" type="single" variant="outline">
                        <ToggleGroupItem value="fast">
                          <Tablets size={16} />
                        </ToggleGroupItem>
                        <ToggleGroupItem value="default">
                          <Rabbit size={16} />
                        </ToggleGroupItem>
                        <ToggleGroupItem value="slow">
                          <Turtle size={16} />
                        </ToggleGroupItem>
                      </ToggleGroup>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className={`text-sm whitespace-nowrap ${isTurboMode ? '' : 'text-muted-foreground'}`}>
                          T-t-turbo
                        </div>
                        <Switch
                          checked={isTurboMode}
                          onCheckedChange={setTurboMode}
                        />
                      </div>
                    </div>
                  </div>
                }
                </div>
                <AuctionInfo upcomingRiders={state.upcomingRiders} previousRiders={state.previousRiders}></AuctionInfo>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster
        richColors
        position="top-center"
        theme={
          theme === "dark" ? "light" :
            theme === "light" ? "dark" :
            (window.matchMedia("(prefers-color-scheme: dark)") ? "light" : "dark")
          }
      />
    </>
  )
}

export default App

function prepareLotData(state: State): { rider: string, playerOrder: PlayerKey[], players: Team[], upcomingRiders: string[], previousRiders: string[]; } {
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
    previousRiders: state.previousRiders
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

