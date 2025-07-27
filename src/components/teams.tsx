import type { Team } from "@/models/auction.models";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default function Teams({ teams }: { teams: Team[] }) {
  return (
    <>
      <div className="flex flex-col gap-6">
        {teams.map(team => (
          <Card key={team.key}>
            <CardHeader className="border-b">
              <div className="flex items-toop justify-between">
                <div>
                  <CardTitle>{team.bot.name}</CardTitle>
                  <CardDescription>{team.bot.owner}</CardDescription>
                </div>
                <div className="text-xl">
                  €{new Intl.NumberFormat().format(team.moneyLeft)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {
                [...team.riders, ...Array(8).fill(undefined)]
                  .slice(0, 8)
                  .map((rider, index) => (
                    <div key={index} className="text-sm">
                      { rider === undefined ?
                        <div className="text-muted-foreground">
                          -
                        </div>
                        :
                        <div className="flex justify-between gap-3">
                          <div className="overflow-hidden text-ellipsis whitespace-nowrap">{rider.name}</div>
                          <div>€{new Intl.NumberFormat().format(rider.amount)}</div>
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
