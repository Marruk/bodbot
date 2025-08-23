import { BOTS } from "@/data/bots";
import type { Bid } from "@/models/auction.models";
import { BadgeEuro, BadgeX, CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

export default function BidCard({ bid }: { bid: Bid }) {
  const [{ bidSkeletonWidth, commentSkeletonWidth }, setSkeletonWidths] = useState({ bidSkeletonWidth: 0, commentSkeletonWidth: 0 });

  useEffect(() => {
    setSkeletonWidths({
      bidSkeletonWidth: (Math.round(Math.random() * 10) * 8) + 48,
      commentSkeletonWidth: (Math.round(Math.random() * 10) * 8) + 120,
    })
  }, []);

  return (
    <div className={"flex items-start gap-4 " + (!bid.isLoading && (!bid.isValid || (bid.amount ?? 0) === 0) ? "opacity-50" : "")}>
      <div className="flex-none size-[1.5rem] flex items-center content-center">
        {bid.isLoading ?
          <svg className="relative z-[-1] size-[1.25rem] animate-spin text-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          :
          bid.isValid === false ?
            <CircleX className="animate-in fade-in text-red-500" size={20} />
            :
            bid.amount === null ?
              <BadgeX className="animate-in fade-in text-muted-foreground" size={20} />
              :
              <BadgeEuro className="animate-in fade-in text-green-400" size={20} />
        }
      </div>
      <div className="flex-[0_0_7.5rem] overflow-hidden text-ellipsis font-semibold">
        {BOTS[bid.player].owner}
      </div>
      <div className="flex-[0_0_10rem] overflow-hidden text-ellipsis">
        {bid.isLoading ?
          <Skeleton className={"h-[1rem]"} style={{ width: bidSkeletonWidth + "px" }} />
          :
          <>€{new Intl.NumberFormat().format(bid.amount ?? 0)}</>
        }
      </div>
      <div className="flex-1 overflow-hidden">
        {bid.isLoading ?
          <Skeleton className={"h-[1rem]"} style={{ width: commentSkeletonWidth + "px" }} />
          :
          bid.comment !== null &&
            <div className="text-sm mt-[0.25rem]">
              &ldquo;{bid.comment}&rdquo;
            </div>
        }
      </div>
    </div>
  )
}