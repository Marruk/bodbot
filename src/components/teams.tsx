import type { Team } from "@/models/auction.models";
import Money from "./money";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function Teams({ teams }: { teams: Team[] }) {
  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-2">
        {teams.map(team => (
          <Card className="max-w-[320px]" key={team.key}>
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle>{team.bot.owner}</CardTitle>
                <div className="text-sm">
                  <Money amount={team.moneyLeft} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {
                [...team.riders, ...Array(8).fill(undefined)]
                  .slice(0, 8)
                  .map((rider, index) => (
                    <div key={index} className="text-xs">
                      { rider === undefined ?
                        <div className="text-muted-foreground">
                          -
                        </div>
                        :
                        <div className="flex items-center justify-between gap-3">
                          <div className="overflow-hidden text-ellipsis whitespace-nowrap">{rider.name}</div>
                          <div className="text-muted-foreground">
                            <Money amount={rider.amount} />
                          </div>
                        </div>
                      }
                    </div>
                  ))
              }
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
