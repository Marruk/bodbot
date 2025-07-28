import type { LogItem } from "@/models/auction.models";
import { Card, CardContent } from "./ui/card";
import { BOTS } from "@/data/bots";

export default function Log({ items }: { items: LogItem[] }) {
  return (
    <div className="flex flex-col-reverse">
      { items.map((item, index) => (
        <Card key={index}>
          <CardContent>
            { item.type === 'AUCTION_STARTED' && 
              <>We zijn los!</>
            }
            { item.type === 'AUCTION_ENDED' && 
              <>Dat was hem weer joe!</>
            }
            { item.type === 'LOT_ENDED' && 
              <>
                { item.winningBid === null &&
                  <>Niemand hoefde {item.rider} helaas. Zielig!</>
                }
                { item.winningBid !== null &&
                  <>
                    {item.rider} is voor €{new Intl.NumberFormat().format(item.winningBid.amount ?? 0)} gekocht door {BOTS[item.winningBid.player].owner}
                    { item.winningBid.comment &&
                      <>: "{item.winningBid.comment}"</>
                    }
                  </>
                }
              </>
            }
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
