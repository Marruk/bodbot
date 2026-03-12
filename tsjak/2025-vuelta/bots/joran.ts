import type { PlayerKey } from "@/models/auction.models"

export default async function bot(
  rider: string,
  riderBib: number,
  highestBid: number | null,
  highestBidBy: PlayerKey | null,
  bids: {
    player: PlayerKey | null
    amount: number
    comment: string | null
  }[],
  you: {
    moneyLeft: number
    riders: {
      name: string
      amount: number
      comment: string | null
    }[]
  },
  others: {
    key: PlayerKey
    moneyLeft: number
    riders: {
      name: string
      amount: number
      comment: string | null
    }[]
  }[],
  upcomingRiders: string[],
  previousRiders: string[]
): Promise<{
  amount: number | null
  comment: string | null
}> {
  let sensibleAmount = findRiderInKooplijst(rider, riderBib)?.maxAmount

  if (sensibleAmount > you.moneyLeft) {
    sensibleAmount = you.moneyLeft
  }

  if (sensibleAmount) {
    if (!highestBid) {
      return { amount: 100_000, comment: "Tonnetje" }
    }
    if (sensibleAmount === highestBid + 100_000) {
      return {
        amount: highestBid + 100_000,
        comment: "Oké laatste bod",
      }
    }
    if (sensibleAmount > highestBid + 500_000) {
      return {
        amount: highestBid + 300_000,
        comment: "Hé bikkels, niet zo laf doen",
      }
    }
    if (sensibleAmount < highestBid + 100_000) {
      return { amount: null, comment: `Dit wordt mij te ${randomLafwoord()}` }
    }
  }

  if (Math.floor(Math.random() * 100) === 88) {
    return {
      amount: you.moneyLeft,
      comment: `Ik heb mijn geluksgetal gegooid dus ik doe alles op deze nono`,
    }
  }

  if (highestBidBy === "mark" && you.moneyLeft > highestBid) {
    return {
      amount: highestBid + 100_000,
      comment: `Hee Markie wil je deze? Nou, ik doe nog een tonnetje`,
    }
  }

  // Paniekcheck 1
  if (upcomingRiders.length < (8 - you.riders.length) * 5) {
    return {
      amount: highestBid ? highestBid + 100_000 : 100_000,
      comment: `Ik moet wel iets gaan kopen nu`,
    }
  }

  // Paniekcheck 2
  if (upcomingRiders.length < (8 - you.riders.length) * 2) {
    return {
      amount: highestBid ? highestBid + 100_000 : 100_000,
      comment: `Godver ik heb nog niemand dan maar deze kneus`,
    }
  }

  return { amount: null, comment: `Nein man` }
}

function findRiderInKooplijst(
  riderName: string,
  riderBib: number
): Toprenner | undefined {
  const riderByName = kooplijst.find((rider) => {
    return riderName.toLowerCase().includes(rider.name)
  })

  if (riderByName) {
    return riderByName
  }

  const riderByBib = kooplijst.find((rider) => rider.riderBib === riderBib)

  if (riderByBib) {
    return riderByBib
  }
}

type Toprenner = {
  name: string
  riderBib: number
  maxAmount: number
}

const kooplijst: Toprenner[] = [
  {
    name: "pidcock",
    riderBib: 111,
    maxAmount: 1_000_000,
  },
  {
    name: "soler",
    riderBib: 7,
    maxAmount: 500_000,
  },
  {
    name: "ayuso",
    riderBib: 2,
    maxAmount: 4_900_000,
  },
  {
    name: "landa",
    riderBib: 51,
    maxAmount: 500_000,
  },
  {
    name: "meintjes",
    riderBib: 185,
    maxAmount: 100_000,
  },
  {
    name: "pedersen",
    riderBib: 27,
    maxAmount: 4_000_000,
  },
  {
    name: "almeida",
    riderBib: 1,
    maxAmount: 4_000_000,
  },
  {
    name: "vingegaard",
    riderBib: 11,
    maxAmount: 9_000_000,
  },
  {
    name: "philipsen",
    riderBib: 71,
    maxAmount: 3_000_000,
  },
  {
    name: "gall",
    riderBib: 91,
    maxAmount: 2_000_000,
  },
  {
    name: "tiberi",
    riderBib: 101,
    maxAmount: 1_500_000,
  },
  {
    name: "pellizari",
    riderBib: 45,
    maxAmount: 1_500_000,
  },
  {
    name: "ciccone",
    riderBib: 23,
    maxAmount: 1_000_000,
  },
  {
    name: "o'connor",
    riderBib: 151,
    maxAmount: 2_500_000,
  },
  {
    name: "bernal",
    riderBib: 62,
    maxAmount: 800_000,
  },
]

const laffeCommentsWoorden = [
  "duur",
  "gortig",
  "idioot",
  "prijzig",
  "gek",
  "mal",
  "krankzinnig",
  "expensivo",
]

function randomLafwoord() {
  const index = Math.floor(Math.random() * laffeCommentsWoorden.length)
  return laffeCommentsWoorden[index] ?? "teuer"
}
