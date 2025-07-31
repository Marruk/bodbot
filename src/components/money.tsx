import { useEffect, useState } from "react";

export default function Money({ amount, animate }: { amount: number, animate?: boolean }) {
  const [displayAmount, setDisplayAmount] = useState(0)

  function getStepSize(current: number, goal: number): number {
    const difference = Math.abs(goal - current)
    const stepSize = Math.min(100000, Math.max(100, Math.pow(10, Math.floor(Math.log10(Math.max(1, difference)) - 1))))
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
    <>
      €{new Intl.NumberFormat().format(Math.round(displayAmount ?? 0))}
    </>
  )
}
