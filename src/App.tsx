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
import { useWindowSize } from './lib/utils';
import type { Bid, BotResponse, PlayerKey, Team } from './models/auction.models';
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
  const windowSize = useWindowSize();
  const [isTurboMode, setTurboMode] = useState(false)
  const [turboSpeed, setTurboSpeed] = useState("default")
  const nextRiderRef = useRef<HTMLButtonElement>(null)

  const TURBO_SPEEDS: { [label: string]: number } = {
    "fast": 100,
    "default": 1000,
    "slow": 3000
  }

  const startLot = async () => {
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
        isValid: true,
        isLoading: true
      }

      dispatch({ type: 'bid-pending', bid })

      try {
        let receivedBid: BotResponse | undefined = undefined

        const bidInput = {
          rider: rider,
          riderBib: RIDER_BIBS[rider] ?? -1,
          highestBid: highestBid?.amount ?? null,
          highestBidBy: highestBid?.player ?? null,
          bids: bids.filter(bid => bid.amount !== null).map(bid => ({
            player: bid.player,
            amount: bid.amount ?? -1,
            comment: bid.comment
          })),
          you: {
            moneyLeft: currentBidder.moneyLeft,
            riders: currentBidder.riders
          },
          others: players.filter(p => p.key !== currentBidderKey),
          upcomingRiders: upcomingRiders,
          previousRiders: previousRiders
        }

        if (currentBidder.bot.type === 'script' && currentBidder.bot.code !== undefined) {
          receivedBid = currentBidder?.bot.code(bidInput.rider, bidInput.riderBib, bidInput.highestBid, bidInput.highestBidBy, bidInput.bids, bidInput.you, bidInput.others, bidInput.upcomingRiders, bidInput.previousRiders)
        } else if (currentBidder.bot.type === 'server' && currentBidder.bot.endpoint !== undefined) {
          receivedBid = await getBid(currentBidder.bot.endpoint, bidInput)
        }

        bid.amount = receivedBid?.amount ?? null
        bid.comment = receivedBid?.comment ?? null
      } catch (error) {
        bid.isValid = false
        console.error(error)
      }

      if ((bid.amount ?? 0) > currentBidder.moneyLeft ||
        ((bid.amount ?? 0) % 100_000 !== 0) ||
        (bid.amount !== null && bid.amount !== 0 && (bid.amount < (highestBid?.amount ?? 0) + 100_000))) {
        bid.isValid = false
      }

      if (bid.amount === 0) {
        bid.amount = null
      }

      if (bid.comment !== null && bid.comment?.length > 255) {
        bid.comment = bid.comment?.substring(0, 255) + "..."
      }

      if (bid.isValid && bid.amount !== null) {
        currentHighestBidderIndex = currentBidderIndex
      }

      bid.isLoading = false
      bids.push(bid)
      dispatch({ type: 'bid-received', bid })
      currentBidderIndex = (currentBidderIndex + 1) % state.teams.length

      await new Promise((resolve) => setTimeout(resolve, TURBO_SPEEDS[turboSpeed]));
    }

    dispatch({ type: 'lot-end' })

    if (upcomingRiders.length === 0) {
      dispatch({
        type: 'end'
      })
    } else {
      if (isTurboMode) {
        await new Promise((resolve) => setTimeout(resolve, TURBO_SPEEDS[turboSpeed]));
        nextRiderRef.current?.click()
      }
    }
  }

  const getSerializedState = (): string => {
    return JSON.stringify(state)
  }

  const setState = (state: State) => {
    dispatch({ type: 'import-state', state })
  }

  return (
    <>
      {(windowSize.height >= 1080 && windowSize.width >= 1080) ?
        <>
          <div className="flex flex-col h-screen overflow-hidden">
            <Header getSerializedState={getSerializedState} setState={setState} />
            <div className="flex-none px-8 pb-6">
              <Teams teams={state.teams}></Teams>
            </div>
            <div className="flex-[1_0_0] px-8 overflow-hidden">
              {state.status === 'ongoing' && state.currentLot !== null &&
                <Lot lot={state.currentLot} />
              }
            </div>
            <Log items={state.log} />
            <div className="sticky bottom-0 bg-background shadow-md">
              <Separator className="bg-border h-px" />
              <div className="px-8 py-6">
                <div>
                  <div className="flex items-center justify-between gap-8">
                    <div>
                      <div className="flex-none flex items-center gap-12">
                        <div className="text-right min-w-[160px]">
                          {state.status === 'ongoing' &&
                            <Button size="lg" ref={nextRiderRef} disabled={state.currentLot?.status === 'ongoing'} onClick={() => startLot()}>
                              Volgende fietser
                            </Button>
                          }
                          {state.status === 'done' &&
                            <Button onClick={() => dispatch({ type: 'restart' })}>
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
        :
        <div className="h-screen w-screen flex items-center justify-center">
          <span className="p-8 text-sm text-center text-muted-foreground">
            Eh sorry je moet even een groter scherm kopen
          </span>
        </div>
      }
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

function getBid(endpoint: string, bidInput: { rider: string; riderBib: number; highestBid: number | null; highestBidBy: PlayerKey; bids: { player: PlayerKey; amount: number; comment: string | null; }[]; you: { moneyLeft: number; riders: { name: string; amount: number; comment: string | null; }[]; }; others: Team[]; upcomingRiders: string[]; previousRiders: string[]; }): Promise<BotResponse> {
  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')

  const request: RequestInfo = new Request(endpoint, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(bidInput)
  })

  return fetch(request).then(response => response.json())
}

