import type { PlayerKey } from "@/models/auction.models"

type RiderValueMap = Record<string, number>

const FAVORITES: RiderValueMap = {
  "VINGEGAARD Jonas": 9_800_000,
  "ALMEIDA João": 8_000_000,
  "AYUSO Juan": 7_500_000,
  "TIBERI Antonio": 5_000_000,
  "CICCONE Giulio": 6_500_000,
  "GALL Felix": 6_800_000,
  "GAUDU David": 6_500_000,
  "BERNAL Egan": 5_000_000,
  "PIDCOCK Tom": 6_000_000,
  "KUSS Sepp": 5_500_000,
  "GROENEWEGEN Dylan": 7_000_000,
  "PHILIPSEN Jasper": 7_500_000,
}

const OUTSIDERS: RiderValueMap = {
  "DE GENDT Thomas": 3_500_000,
  "POELS Wout": 3_200_000,
  "MAS Enric": 5_800_000,
  "THOMAS Geraint": 5_500_000,
  "LANDA Mikel": 5_200_000,
  "O'CONNOR Ben": 5_000_000,
  "CARTHY Hugh": 4_500_000,
  "BUITRAGO Santiago": 4_800_000,
  "EVENEPOEL Remco": 9_000_000,
  "KELDERMAN Wilco": 4_000_000,
  "HAIG Jack": 4_200_000,
  "CARUSO Damiano": 4_000_000,
  "SOLER Marc": 3_800_000,
  "ROGLIČ Primož": 8_000_000,
  "BARDET Romain": 4_200_000,
}

const DEFAULT_VALUE = 2_000_000

export default async function bot(
    rider: string,
    riderBib: number,
    highestBid: number | null,
    highestBidBy: PlayerKey | null,
    bids: {
      player: PlayerKey | null,
      amount: number,
      comment: string | null,
    }[],
    you: {
      moneyLeft: number,
      riders: {
        name: string,
        amount: number,
        comment: string | null
      }[],
    },
    others: {
      key: PlayerKey,
      moneyLeft: number,
      riders: {
        name: string,
        amount: number,
        comment: string | null
      }[],
    }[],
    upcomingRiders: string[],
    previousRiders: string[]
): Promise<{
  amount: number | null,
  comment: string | null
}> {
  const currentBid = highestBid ?? 0
  const isFavorite = rider in FAVORITES
  const isOutsider = rider in OUTSIDERS

  const ridersLeft = upcomingRiders.length + 1

  if (isFavorite) {
    const baseValue = FAVORITES[rider]
    const chaosFactor = 0.9 + Math.random() * 0.3
    const maxPrice = baseValue * chaosFactor

    if (currentBid < maxPrice && you.moneyLeft > currentBid) {
      const increment = 100_000 * (1 + Math.floor(Math.random() * 3))
      const bid = Math.min(you.moneyLeft, currentBid + increment)
      return {
        amount: bid,
        comment: "🪿MINE MINE MINE 🪿"
      }
    }
    return { amount: null, comment: "Veeeeelste duur joh!" }
  }

  if (isOutsider) {
    if (ridersLeft > 50) {
      return { amount: null, comment: "Zou hem zo maar kunnen worden, maar ik wacht nog even af." }
    }

    const baseValue = OUTSIDERS[rider]
    const chaosFactor = 0.9 + Math.random() * 0.3
    const maxPrice = baseValue * chaosFactor

    if (currentBid < maxPrice && you.moneyLeft > currentBid) {
      const increment = 100_000 * (1 + Math.floor(Math.random() * 3))
      const bid = Math.min(you.moneyLeft, currentBid + increment)
      return {
        amount: bid,
        comment: "Deze gaat winnen!"
      }
    }
    return { amount: null, comment: "Laat maar joh!" }
  }

  if (ridersLeft > 20) {
    return { amount: null, comment: "Wie is dit dan joh?" }
  }

  const baseValue = DEFAULT_VALUE
  const chaosFactor = 0.9 + Math.random() * 0.3
  const maxPrice = baseValue * chaosFactor

  if (currentBid < maxPrice && you.moneyLeft > currentBid) {
    const increment = 100_000 * (1 + Math.floor(Math.random() * 3))
    const bid = Math.min(you.moneyLeft, currentBid + increment)
    return {
      amount: bid,
      comment: "Koopje!"
    }
  }

  return { amount: null, comment: "Wie is dit dan joh?" }
}
