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
    <div ref={containerRef} className="scroll-smooth p-8 gap-4 flex overflow-x-scroll flex-row">
      { items.map((item, index) => (
        <LogCard key={index} item={item} />
      ))}
    </div>
  )
}
