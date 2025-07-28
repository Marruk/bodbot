import { Eye } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

export default function AuctionInfo({ upcomingRiders, previousRiders }: { upcomingRiders: string[], previousRiders: string[] }) {
  return (
    <>
      <div>
        <Sheet>
          <div className="flex items-center gap-1">
            <h4 className="font-semibold">
              Nog {upcomingRiders.length} vrolijke snuiters te gaan
            </h4>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <Eye />
                <span className="sr-only">Toggle</span>
              </Button>
            </SheetTrigger>
          </div>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="text-lg font-semibold">
                Hoeveel moeten er nog komen?
              </SheetTitle>
              <SheetDescription>
                { upcomingRiders.length } om precies te zijn
              </SheetDescription>
            </SheetHeader>
            <div className="px-4">
              { upcomingRiders.map((rider, index) => (
                <div className="text-sm" key={index}>
                  {rider}
                </div>
              ))}
              { previousRiders.length > 0 && 
                <>
                  <div className="text-muted-foreground font-semibold mt-6 mb-2">
                    Hoeveel zijn er al gegaan?
                  </div>
                  { previousRiders.map((rider, index) => (
                    <div className="text-xs text-muted-foreground" key={index}>
                      {rider}
                    </div>
                  ))}
                </>
              }
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
