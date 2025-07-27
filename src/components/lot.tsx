import { BOTS } from "@/data/bots";
import type { Lot } from "@/models/auction.models";
import { Separator } from "@radix-ui/react-separator";
import { Card, CardContent } from "./ui/card";

export default function Lot({ lot }: { lot: Lot }) {
  return (
    <>
      <div>
        <div className="text-5xl">
          {lot.rider}
        </div>
        <div className="text-muted-foreground">
          Volgorde van bieden: {lot.playerOrder.map(key => BOTS[key].owner).join(', ')}
        </div>
      </div>
      <Separator className="bg-border h-px my-6" />
      <div>
        <div className="text-4xl">
          €{new Intl.NumberFormat().format(lot.winningBid?.amount ?? 0)}
          { lot.winningBid !== null &&
            <>
              &nbsp;door {BOTS[lot.winningBid.player].owner}
            </>
          }
        </div>
      </div>
      <Separator className="bg-border h-px my-6" />
      <div className="flex flex-col-reverse gap-2">
        { lot.allBids.map((bid, index) => (
          <Card key={index}>
            <CardContent>
              { bid.amount !== null ?
                <>€{new Intl.NumberFormat().format(bid.amount)}</>
                :
                <>Niks</>
              }
              &nbsp;geboden door {BOTS[bid.player].owner}
              { bid.comment &&
                <>: "{bid.comment}"</>
              }
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
