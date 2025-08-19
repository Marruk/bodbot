/* eslint-disable @typescript-eslint/no-unused-vars */

import type {BotResponse, PlayerKey} from "@/models/auction.models.ts";

interface Player {
  moneyLeft: number,
  riders: {
    name: string,
    amount: number,
    comment: string | null
  }[]
}

interface BodBy {
  player: PlayerKey,
  amount: number,
  comment: string | null
}

class PerfectBiddingAlgo {
  private ridersWeReallyReallyWant = ['VINGEGAARD Jonas'];
  private ridersWeReallyWant = ['PEDERSEN Mads'];
  private ridersWeWant = ['ALMEIDA João', 'CARUSO Damiano', 'COQUARD Bryan', 'FORTUNATO Lorenzo', 'GALL Felix', 'GEE Derek', 'PIDCOCK Thomas', 'LANDA Mikel', 'POOLE Max'];
  private ridersWeMaybeWant = ['AYUSO Juan', ' DUNBAR Eddie', 'MEINTJES Louis', 'PARET-PEINTRE Valentin', 'POELS Wout', 'KUSS Sepp'];
  private ridersWeDontWant = ['MARTIN Guillaume', 'SOLER Marc', 'VINE Jay'];

  private numberOfRidersNotBoughtByOthersInARow = 0;
  private previousRiderName = '';
  private maxPriceForReallyReally = 9_300_000;
  private maxPriceForReally = 5_100_000;
  private maxPriceForWant = 1_000_000;
  private maxPriceForMaybeWant = 100_000;


  determinePerfectBid(
      rider: string, riderBib: number, highestBid: number | null, highestBidBy: PlayerKey | null, bids: BodBy[], you: Player, others: Player[], upcomingRiders: string[], previousRiders: string[]
  ): BotResponse {
    if (this.ridersWeDontWant.includes(rider)) {
      return {amount: null, comment: "Als je deze koopt ben je gek"};
    }
    if (this.ridersWeReallyReallyWant.includes(rider)) {
      return {amount: this.tonnetjeMeer(highestBid, this.maxPriceForReallyReally, you.moneyLeft), comment: "deze wil ik echt, maar echt"};
    }
    if (this.ridersWeReallyWant.includes(rider)) {
      return {amount: this.tonnetjeMeer(highestBid, this.maxPriceForReally, you.moneyLeft), comment: "deze wil ik echt"};
    }
    if (this.ridersWeWant.includes(rider)) {
      return {amount: this.tonnetjeMeer(highestBid, this.maxPriceForWant, you.moneyLeft), comment: "deze wil ik wel"};
    }
    if (this.ridersWeMaybeWant.includes(rider)) {
      return {amount: this.tonnetjeMeer(highestBid, this.maxPriceForMaybeWant, you.moneyLeft), comment: "ik neem em wel"};
    }

    return {amount: null, comment: "wie?"};
  }

  private tonnetjeMeer(highestBid: number | null, max: number, moneyLeft: number): number {
    if (highestBid == null) {
      return 100_000;
    }
    return Math.min(moneyLeft, highestBid + 100_000, max);
  }

  public setPreviousRiderName(rider) {
    this.previousRiderName = rider;
  }

  public updateNumberOfRidersNotBoughtByOthersInARow(players: Player[]) {
    for (const player of players) {
      if (player.riders.some(r => r.name === this.previousRiderName)) {
        this.numberOfRidersNotBoughtByOthersInARow = 0;
      }
    }
    if (this.numberOfRidersNotBoughtByOthersInARow != 0) {
      this.numberOfRidersNotBoughtByOthersInARow++;
    }
  }

}

const algo = new PerfectBiddingAlgo();

export default function bot(
    rider: string, riderBib: number, highestBid: number | null, highestBidBy: PlayerKey | null, bids: BodBy[], you: Player, others: Player[], upcomingRiders: string[], previousRiders: string[]
): BotResponse {
  algo.updateNumberOfRidersNotBoughtByOthersInARow(others);

  const bot = algo.determinePerfectBid(rider, riderBib, highestBid, highestBidBy, bids, you, others, upcomingRiders, previousRiders);

  algo.setPreviousRiderName(rider);

  return bot;
}
