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
  private ridersWeReallyReallyWant = ["VINGEGAARD Jonas"];
  private ridersWeReallyWant = ["PEDERSEN Mads", "PHILIPSEN Jasper"];
  private ridersWeWant = ["ALMEIDA João", "CARUSO Damiano", "COQUARD Bryan", "FORTUNATO Lorenzo", "GALL Felix", "GEE Derek", "PIDCOCK Thomas", "LANDA Mikel"];
  private ridersWeMaybeWant = ["AYUSO Juan", " DUNBAR Eddie", "MEINTJES Louis", "PARET-PEINTRE Valentin", "POELS Wout", "KUSS Sepp"];
  private ridersWeDontWant = ["MARTIN Guillaume", "SOLER Marc", "VINE Jay"];

  private activityOthers = 0;
  private previousRiderName = '';
  private maxPriceForReallyReally = 9_300_000;
  private maxPriceForReally = 5_100_000;
  private maxPriceForWant = 1_000_000;
  private maxPriceForMaybeWant = 100_000;
  private maxPriceForReactive = 600_000;


  determinePerfectBid(
      rider: string, riderBib: number, highestBid: number | null, highestBidBy: PlayerKey | null, bids: BodBy[], you: Player, others: Player[], upcomingRiders: string[], previousRiders: string[]
  ): BotResponse {
    if (upcomingRiders.length === 1) {
      return {amount: you.moneyLeft, comment: "Ok er is iets mis gegaan"};
    }

    if (this.ridersWeDontWant.includes(rider)) {
      return {amount: null, comment: "Als je deze koopt ben je gek"};
    }

    if (this.ridersWeReallyReallyWant.includes(rider)) {
      return {amount: this.tonnetjeMeer(highestBid, this.maxPriceForReallyReally, you.moneyLeft, 10_000_000), comment: "deze wil ik echt, maar echt"};
    }

    const maxToBeAbleToChoose: number = this.determineMaxToBeAbleToChoose(you, others);

    if (maxToBeAbleToChoose < 10_000_000 && you.riders.length > 6) {
      for (const rider of this.ridersWeReallyReallyWant) {
        if (upcomingRiders.includes(rider)) {
          return {amount: null, comment: "Ho wacht, dan wil ik vinnie wel"};
        }
      }
    }

    if (this.ridersWeReallyWant.includes(rider)) {
      return {amount: this.tonnetjeMeer(highestBid, this.maxPriceForReally, you.moneyLeft, maxToBeAbleToChoose), comment: "deze wil ik echt"};
    }

    if (maxToBeAbleToChoose < 10_000_000 && you.riders.length > 6) {
      for (const rider of this.ridersWeReallyWant) {
        if (upcomingRiders.includes(rider)) {
          return {amount: null, comment: "Ho wacht, dan wil ik dinges wel"};
        }
      }
    }

    if (previousRiders.length < 40) {
      return {amount: null, comment: "too soon"};
    }

    const lichtePaniek = upcomingRiders.length < 15;

    if (this.activityOthers > 3 && !lichtePaniek) {
      return {amount: null, comment: "tis me nu even te duur"};
    }

    if (this.ridersWeWant.includes(rider)) {
      return {amount: this.tonnetjeMeer(highestBid, this.maxPriceForWant, you.moneyLeft, maxToBeAbleToChoose), comment: "deze wil ik wel"};
    }

    if (this.reactiveBid(you, bids, upcomingRiders)) {
      return {amount: this.tonnetjeMeer(highestBid, this.maxPriceForReactive, you.moneyLeft, maxToBeAbleToChoose), comment: "okok dan wil ik em ook wel"};
    }

    if (previousRiders.length < upcomingRiders.length) {
      return {amount: null, comment: "nog geen reden voor paniek"};
    }

    if (this.ridersWeMaybeWant.includes(rider)) {
      return {amount: this.tonnetjeMeer(highestBid, this.maxPriceForMaybeWant, you.moneyLeft, maxToBeAbleToChoose), comment: "ik neem em wel"};
    }

    if (upcomingRiders.length < 15) {
      return {amount: this.tonnetjeMeer(highestBid, this.maxPriceForMaybeWant, you.moneyLeft, maxToBeAbleToChoose), comment: "lichte paniek"}
    }

    if (upcomingRiders.length <= 8 - you.riders.length) {
      return {amount: this.tonnetjeMeer(highestBid, this.maxPriceForWant, you.moneyLeft, maxToBeAbleToChoose), comment: "PANIEK"}
    }

    return {amount: null, comment: "wie?"};
  }

  private reactiveBid(you: Player, bids: BodBy[], upcomingRiders: String[]): boolean {
    const uniquePlayersBidding = new Set(bids.filter(bid => bid.amount > 0).map(bid => bid.player));
    const wanted = [...this.ridersWeWant, ...this.ridersWeReallyWant, ...this.ridersWeReallyReallyWant];
    const goodRidersStillComming = upcomingRiders.filter(rider => wanted.includes(rider)).length;
    const gottaDoSomething = goodRidersStillComming < 8 - you.riders.length;
    return (gottaDoSomething && uniquePlayersBidding.size == 1) || uniquePlayersBidding.size > 2;
  }

  private determineMaxToBeAbleToChoose(you: Player, others: Player[]): number {
    let max = 0;
    for (const player of others) {
      if (player.moneyLeft >= you.moneyLeft) {
        return 10_000_000;
      }
      max = Math.min(you.moneyLeft - player.moneyLeft, max);
    }
    return max;
  }

  private tonnetjeMeer(highestBid: number | null, maxAllowed: number, moneyLeft: number, maxToChoose: number): number {
    if (highestBid == null) {
      return 100_000;
    }
    return Math.min(moneyLeft, highestBid + 100_000, maxAllowed, maxToChoose);
  }

  public setPreviousRiderName(rider) {
    this.previousRiderName = rider;
  }

  public updateActivityOthers(players: Player[]) {
    for (const player of players) {
      if (player.riders.some(r => r.name === this.previousRiderName)) {
        if (this.activityOthers < 5) {
          this.activityOthers += 3;
        }
      }
    }
    if (this.activityOthers > 0) {
      this.activityOthers -= 1;
    }
  }

}

const algo = new PerfectBiddingAlgo();

export default function bot(
    rider: string, riderBib: number, highestBid: number | null, highestBidBy: PlayerKey | null, bids: BodBy[], you: Player, others: Player[], upcomingRiders: string[], previousRiders: string[]
): BotResponse {
  algo.updateActivityOthers(others);

  const bot = algo.determinePerfectBid(rider, riderBib, highestBid, highestBidBy, bids, you, others, upcomingRiders, previousRiders);

  algo.setPreviousRiderName(rider);

  return bot;
}
