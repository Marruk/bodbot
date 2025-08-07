import { BOTS } from "@/data/bots";
import type { Lot } from "@/models/auction.models";
import { useEffect, useRef } from "react";
import BidCard from "./bid-card";
import Money from "./money";
import { Badge } from "./ui/badge";

export default function Lot({ lot }: { lot: Lot }) {
  const bidsContainerRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
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
        <div className="flex-[0_0_33%]">
          <div className="text-5xl font-bold text-balance">
            {lot.rider}
          </div>
          <div className="mt-8">
            <div className="text-muted-foreground text-sm font-semibold">
              Hoogste bod
            </div>
            <div className="flex items-center gap-2">
              <div className="text-3xl whitespace-nowrap">
                {lot.winningBid !== null &&
                  <>
                    {BOTS[lot.winningBid.player].owner} <span className="text-muted-foreground">met</span>&nbsp;
                  </>
                }
                <Money amount={lot.winningBid?.amount ?? 0} />
              </div>
              {lot.status === 'done' &&
                <>
                  {lot.winningBid !== null &&
                    <Badge variant="success">Verkocht</Badge>
                  }
                </>
              }
            </div>
          </div>
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
        <div ref={bidsContainerRef} className="scroll-smooth flex-1 h-full overflow-y-scroll relative">
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
