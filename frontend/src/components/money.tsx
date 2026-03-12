import { useEffect, useState } from "react";

export default function Money({ amount, animate }: { amount: number, animate?: boolean }) {
  const [displayAmount, setDisplayAmount] = useState(0)

  function getStepSize(current: number, goal: number): number {
    const difference = Math.abs(goal - current)
    const stepSize = Math.min(100_000, Math.max(1000, Math.pow(10, Math.floor(Math.log10(Math.max(1, difference)) - 1))))
    return stepSize * (current > goal ? -1 : 1)
  }

  useEffect(() => {
    if (animate === false || amount === 0) {
      setDisplayAmount(amount)
    } else {
      const stepSize = getStepSize(displayAmount, amount)
      setTimeout(() => {
        if (displayAmount !== amount) {
          setDisplayAmount(displayAmount + stepSize)
        }
      }, 2)
    }
  }, [amount, displayAmount, animate]);

  return (
    <span className="relative">
      <span className="absolute">
        €{new Intl.NumberFormat().format(Math.round(displayAmount ?? 0))}
      </span>
      <span className="opacity-0">
        €{new Intl.NumberFormat().format(Math.round(amount ?? 0))}
      </span>
    </span>
  )
}
