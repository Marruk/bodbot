import { BOTS } from "@/data/bots";
import { Card, CardContent } from "./ui/card";
import type { Bid } from "@/models/auction.models";

export default function BidCard({ bid }: { bid: Bid }) {
  return (
    <Card>
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
  )
}