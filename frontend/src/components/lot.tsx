import { BOTS } from "@/data/bots";
import type { Lot } from "@/models/auction.models";
import { useEffect, useRef, useState } from "react";
import BidCard from "./bid-card";
import Money from "./money";
import { Badge } from "./ui/badge";

export default function Lot({ lot }: { lot: Lot }) {
  const bidsContainerRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [birthplaceConnector] = useState(['pittoreske', 'prachtige', 'fantastische', 'mooie', 'idyllische'][Math.round(Math.random() * 4)])
  
  useEffect(() => {
    const transitionClasses = ['opacity-0', 'translate-y-4']

    containerRef.current?.classList.remove('transition-all')
    transitionClasses.forEach(c => containerRef.current?.classList.add(c))

    setTimeout(() => {
      containerRef.current?.classList.add('transition-all')
      transitionClasses.forEach(c => containerRef.current?.classList.remove(c))
    }, 100)
  }, [lot.rider])
  
  useEffect(() => {
    if (bidsContainerRef.current !== null) {
      const container = bidsContainerRef.current
      container.scrollTop = Number.MAX_SAFE_INTEGER
    }
  }, [lot.allBids])
  return (
    <>
      <div ref={containerRef} className="flex items-center h-full gap-20">
        <div className="flex-[0_0_30%]">
          <div className="text-5xl font-bold text-balance flex items-baseline gap-3">
            {lot.rider}
          </div>
          {lot.riderInfo &&
            <div className="flex items-center gap-4 mt-8">
              { lot.riderInfo.imageUrl &&
                <img className="border-1 w-24 rounded-lg shadow-md" src={`https://www.procyclingstats.com/${lot.riderInfo.imageUrl}`} />
              }
              <div>
                <div className="text-sm text-muted-foreground flex flex-col gap-1">
                  <div className="flex items-center gap-1">
                    {lot.riderInfo.nationality && <img className="border-1 w-5 rounded-[.25rem]" src={`https://raw.githubusercontent.com/lipis/flag-icons/refs/heads/main/flags/4x3/${lot.riderInfo.nationality.toLowerCase()}.svg`} /> }
                    <div>•</div>
                    { lot.riderInfo.currentTeam &&
                      <>{lot.riderInfo.currentTeam}</>
                    }
                  </div>
                  { lot.riderInfo.placeOfBirth &&
                    <>
                      Geboren in het {birthplaceConnector} {lot.riderInfo.placeOfBirth}
                    </>
                  }
                  <div className="flex gap-1">
                    { lot.riderInfo.weight && <div>{lot.riderInfo.weight} kg</div> }
                    { lot.riderInfo.weight && lot.riderInfo.height && <div>•</div> }
                    { lot.riderInfo.height && <div>{lot.riderInfo.height} m</div> }
                  </div>
                </div>
                {lot.riderInfo.pointsPerSpeciality &&
                  <div className="text-xs mt-6 grid grid-cols-3 gap-x-4 gap-y-2">
                    {
                      [
                        { class: 'oneday', property: 'oneDayRaces' as const, label: 'One day races', color: '#A0D54C' },
                        { class: 'gc', property: 'gc' as const, label: 'Gc', color: '#F42A0E' },
                        { class: 'tt', property: 'timeTrial' as const, label: 'Time trial', color: '#5DA9EF' },
                        { class: 'sprint', property: 'sprint' as const, label: 'Sprint', color: '#FFAD4E' },
                        { class: 'climber', property: 'climber' as const, label: 'Climber', color: '#aa3df2' },
                        { class: 'hills', property: 'hills' as const, label: 'Hills', color: '#ff64d3' }
                      ].map((specialty) => {
                        const speciality = lot.riderInfo!.pointsPerSpeciality!
                        const points = speciality[specialty.property]
                        const maxSpecialtyPoints = Math.max(...Object.values(speciality).filter((v): v is number => v !== null))

                        return (
                          <div key={specialty.class} className={`rider-specialty rider-specialty--${specialty.class}`}>
                            <div className="h-1 bg-muted rounded-sm overflow-hidden">
                              <div className="h-1" style={{ backgroundColor: specialty.color, width: `${Math.round(((points ?? 0) / maxSpecialtyPoints) * 100)}%` }}></div>
                            </div>
                            <span className="text-muted-foreground">
                              {specialty.label}&nbsp;&nbsp;
                            </span>
                            <span className="font-medium">
                              {points}
                            </span>
                          </div>
                        )
                      })
                    }
                  </div>
                }
              </div>
            </div>
          }
          <div className="mt-8">
            <div className="mb-2 text-muted-foreground text-sm font-semibold">
              Volgorde van bieden
            </div>
            <div className="flex flex-wrap gap-1">
              {lot.playerOrder.map((key, index) => (
                <Badge key={index} variant="secondary" className={"transition-all border-border " + (lot.currentBidder === index ? "border-muted-foreground shadow-lg -translate-y-1" : "")}>
                  <span className="text-muted-foreground">{index + 1}.</span> {BOTS[key].owner}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-[0_0_12rem]">
          <div className="text-muted-foreground text-sm font-semibold mb-2">
            Hoogste bod
          </div>
          <div className="flex flex-col items-start gap-1">
            <div className="text-3xl">
              <Money amount={lot.winningBid?.amount ?? 0} />
            </div>
            {lot.winningBid !== null &&
              <div className="flex text-2xl items-center gap-3">
                {BOTS[lot.winningBid.player].owner}
                {lot.status === 'done' &&
                  <>
                    {lot.winningBid !== null &&
                      <Badge variant="success">Verkocht</Badge>
                    }
                  </>
                }
              </div>
            }
          </div>
        </div>
        <div ref={bidsContainerRef} className="flex-1 scroll-smooth flex-1 h-full overflow-y-scroll relative">
          <div className="sticky top-0 bg-linear-to-b from-50% from-background to-transparent h-1/3 z-1" />
          <div className="flex flex-col gap-4 px-6">
            {lot.allBids.map((bid, index) => (
              <div key={index} className="animate-in slide-in-from-bottom fade-in-0 duration-300">
                <BidCard bid={bid} />
              </div>
            ))}
          </div>
          <div className="sticky bottom-0 bg-linear-to-t from-50% from-background to-transparent h-1/4 z-1" />
        </div>
      </div>
    </>
  )
}
