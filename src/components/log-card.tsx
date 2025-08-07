import { BOTS } from "@/data/bots";
import type { LogItem } from "@/models/auction.models";
import { BadgeEuro, BadgeX, Eye, Frown, PartyPopper } from "lucide-react";
import { useEffect, useRef } from "react";
import BidCard from "./bid-card";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function LogCard({ item }: { item: LogItem }) {
  const firstRender = useRef(true);
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    }
  });

  const stats = item.type === 'LOT_ENDED' && {
    numberOfBids: item.allBids.filter(b => b.amount !== null && b.isValid === true).length,
    numberOfTeams: item.allBids.filter(b => b.amount !== null && b.isValid === true).map(b => b.player).filter((value, index, array) => array.indexOf(value) === index).length,
    money: item.allBids.reduce((total, bid) => {
      if (bid.isValid) {
        return total + (bid.amount ?? 0)
      } else {
        return total
      }
    }, 0)
  }

  return (
    <Card ref={elementRef} className="flex-none w-[240px] animate-in zoom-in-90 fade-in slide-in-from-bottom">
      <CardContent>
        <div className="flex flex-col h-[120px] overflow-hidden">
          <div className="flex-none overflow-hidden flex gap-4">
            <div className="overflow-hidden text-ellipsis flex-1 text-sm font-bold whitespace-nowrap">
              {item.type === 'AUCTION_STARTED' &&
                <>We zijn los!</>
              }
              {item.type === 'AUCTION_ENDED' &&
                <>Tis klaar</>
              }
              {item.type === 'LOT_ENDED' &&
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="overflow-hidden text-ellipsis">
                      {item.rider}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    {item.rider}
                  </TooltipContent>
                </Tooltip>
              }
            </div>
            {item.type === 'AUCTION_STARTED' &&
              <PartyPopper className="text-yellow-600 dark:text-yellow-400" size={20} />
            }
            {item.type === 'AUCTION_ENDED' &&
              <Frown className="text-red-500" size={20} />
            }
            {item.type === 'LOT_ENDED' && item.winningBid !== null &&
              <BadgeEuro className="text-green-400" size={20} />
            }
            {item.type === 'LOT_ENDED' && item.winningBid === null &&
              <BadgeX className="text-muted-foreground" size={20} />
            }
          </div>
          {item.type === 'LOT_ENDED' &&
            <>
              <div className="grow flex flex-col">
                {item.winningBid !== null &&
                  <>
                    <div className="overflow-hidden flex-none text-sm mt-2">
                      {BOTS[item.winningBid.player].owner} <span className="text-muted-foreground">voor</span> €{new Intl.NumberFormat().format(item.winningBid.amount ?? 0)}
                      {item.winningBid.comment &&
                        <>:</>
                      }
                    </div>
                    {item.winningBid?.comment !== null &&
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex-[1_0_0] line-clamp-2 text-sm mt-1">
                            <>&ldquo;{item.winningBid.comment}&rdquo;</>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          &ldquo;{item.winningBid.comment}&rdquo;
                        </TooltipContent>
                      </Tooltip>
                    }
                  </>
                }
              </div>
              {stats &&
                <Sheet>
                  <SheetTrigger asChild>
                    <div className="flex-none mt-2 flex items-center gap-1 font-normal text-xs text-muted-foreground hover:underline cursor-pointer">
                      <span>
                        {stats.numberOfBids} bod{stats.numberOfBids !== 1 && "en"} van {stats.numberOfTeams} bot{stats.numberOfTeams !== 1 && "s"}
                      </span>
                      <Eye size={12} />
                    </div>
                  </SheetTrigger>
                  <SheetContent className="sm:max-w-[800px] max-w-[800px] max-h-screen overflow-y-scroll">
                    <SheetHeader>
                      <SheetTitle className="text-lg font-semibold">
                        {item.rider}
                      </SheetTitle>
                      <SheetDescription>
                        Alle boden op deze prachtige man
                      </SheetDescription>
                    </SheetHeader>
                    <div className="px-4 pb-4">
                      <div className="flex flex-col gap-4">
                        {item.allBids.map((bid, index) => (
                          <BidCard key={index} bid={bid} />
                        ))}
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              }
            </>
          }
        </div>
      </CardContent>
    </Card>
  )
}
