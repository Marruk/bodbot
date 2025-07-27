import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "./ui/button";

export default function AuctionInfo({ upcomingRiders }: { upcomingRiders: string[] }) {
  return (
    <>
      <div>
        <Collapsible>
          <div className="flex items-center gap-">
            <h4 className="font-semibold">
              Nog {upcomingRiders.length} vrolijke snuiters te gaan
            </h4>
            <CollapsibleTrigger>
              <Button variant="ghost" size="icon" className="size-8">
                <ChevronsUpDown />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div className="text-xs text-muted-foreground text-ellipsis">
              {upcomingRiders.join(', ')}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      {/* <div className="flex items-stretch gap-6 mt-6">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
            <CardAction>Card Action</CardAction>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
            <CardAction>Card Action</CardAction>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div> */}
    </>
  )
}
