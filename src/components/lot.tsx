import { BOTS } from "@/data/bots";
import type { Lot } from "@/models/auction.models";
import { Separator } from "@radix-ui/react-separator";
import Money from "./money";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

export default function Lot({ lot }: { lot: Lot }) {
  return (
    <>
      <div>
        <div className="text-5xl font-bold">
          {lot.rider}
        </div>
        <div className="flex gap-2">
          <div className="text-sm text-muted-foreground">Volgorde van bieden</div>
          <div className="flex gap-1">
            {lot.playerOrder.map((key, index) => (
              <Badge key={index} variant="secondary" className={"transition-all border-border " + (lot.currentBidder === index ? "border-muted-foreground shadow-lg -translate-y-1" : "")}>
                <span className="text-muted-foreground">{index + 1}.</span> {BOTS[key].owner}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <Separator className="bg-border h-px my-6" />
      <div>
        <div className="text-4xl">
          <Money amount={lot.winningBid?.amount ?? 0} />
          {lot.winningBid !== null &&
            <>
              &nbsp;door {BOTS[lot.winningBid.player].owner}
            </>
          }
          {lot.status === 'done' &&
            <>
              {lot.winningBid === null ?
                <Badge variant="secondary">Niet verkocht :(</Badge>
                :
                <Badge variant="success">Verkocht</Badge>
              }
            </>
          }
        </div>
      </div>
      <Separator className="bg-border h-px my-6" />
      <div className="flex flex-col-reverse gap-2">
        {lot.allBids.map((bid, index) => (
          <Card key={index}>
            <CardContent>
              {bid.isLoading === true ?
                <>
                  We wachten even op {BOTS[bid.player].owner}
                </>
                :
                <>
                  {bid.amount !== null ?
                    <>€{new Intl.NumberFormat().format(bid.amount)}</>
                    :
                    <>Niks</>
                  }
                  &nbsp;geboden door {BOTS[bid.player].owner}
                  {bid.comment &&
                    <>: "{bid.comment}"</>
                  }
                </>
              }
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
