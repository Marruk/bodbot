import { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { TriangleAlert } from "lucide-react";

export default function StatsFetchFailsafe({ rider, onRetry, onSkip }: { rider: string, onRetry: () => void, onSkip: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const transitionClasses = ['opacity-0', 'translate-y-4']

    containerRef.current?.classList.remove('transition-all')
    transitionClasses.forEach(c => containerRef.current?.classList.add(c))

    setTimeout(() => {
      containerRef.current?.classList.add('transition-all')
      transitionClasses.forEach(c => containerRef.current?.classList.remove(c))
    }, 100)
  }, [rider])

  return (
    <div ref={containerRef} className="flex items-center h-full gap-20">
      <div className="flex-[0_0_30%]">
        <div className="text-5xl font-bold text-balance flex items-baseline gap-3">
          {rider}
        </div>
        <div className="mt-4 text-muted-foreground flex gap-2">
          <TriangleAlert /> Statistieken ophalen mislukt
        </div>
        <div className="mt-4 flex items-center gap-2">
          <Button variant="outline" onClick={onSkip}>
            Verder zonder
          </Button>
          <Button onClick={onRetry}>
            Probeer gewoon nog een keertje joh
          </Button>
        </div>
      </div>
    </div>
  )
}
