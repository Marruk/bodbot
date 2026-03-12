import type { LogItem } from "@/models/auction.models";
import { useEffect, useRef } from "react";
import LogCard from "./log-card";

export default function Log({ items }: { items: LogItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current !== null) {
      const container = containerRef.current
      container.scrollLeft = Number.MAX_SAFE_INTEGER
    }
  }, [items])

  return (
    <div ref={containerRef} className="scroll-smooth px-8 py-6 gap-2 flex overflow-x-scroll flex-row">
      { items.map((item, index) => (
        <LogCard key={index} item={item} />
      ))}
    </div>
  )
}
