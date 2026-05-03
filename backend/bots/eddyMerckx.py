from typing import TypedDict

SPOTS_PER_TEAM: int = 8
TONNETJE = 100_000

# wordt alleen aangeroepen als:
# - je team niet vol is
# - je meer geld hebt dan het laatste hoogste bod
# - je niet het hoogste bod hebt
# komt eigenlijk gewoon neer als het nog zin heeft om een bod te doen dus ja

class TeamEntry(TypedDict):
    name: str # fietser
    amount: int # prijs
    comment: str | None # leuk berichtje

class BidEntry(TypedDict):
    player: str # naam
    amount: int # geboden bedrag
    comment: str | None # leuk berichtje

class YouState(TypedDict):
    moneyLeft: int # hoeveel geld je nog hebt (huidige bod is er niet afgehaald)
    riders: list[TeamEntry] # wie je al in je team hebt

class OtherState(TypedDict):
    key: str # iedereen die meedoet
    moneyLeft: int # hoeveel geld ze nog hebben
    riders: list[TeamEntry] # wie ze al in hun team hebben

class PointsPerSpeciality(TypedDict): # PCS punten, spreekt voor zich
    oneDayRaces: int | None
    gc: int | None
    timeTrial: int | None
    sprint: int | None
    climber: int | None
    hills: int | None

class PointsPerSeason(TypedDict): # punten per seizoen
    season: int # jaartal
    points: int # aantal punten
    rank: int # ranking van dat jaar

class RiderInfo(TypedDict): # wat info van PCS, maar misschien ook niet
    name: str | None # naam
    nationality: str | None # land code (twee letters)
    birthdate: str | None # gewoon lekker in een string: YYYY-MM-DD
    placeOfBirth: str | None # mooie plek
    currentTeam: str | None # lekker voor het teamgevoel
    height: float | None # lengte in meter
    weight: float | None # zwaarte in kilogram
    imageUrl: str | None # leuk kiekje
    pointsPerSpeciality: PointsPerSpeciality | None
    pointsPerSeasonHistory: list[PointsPerSeason] | None # aflopend, dit jaar eerst

class BotResponse(TypedDict):
    amount: int | None # hoeveel je wil bieden, moet deelbaar zijn door een ton
    comment: str # leuk berichtje doe iedereen de groeten

class theSuperComputer:

    def __init__(self):
        # initialize these as instance variables using 'self'
        self.bestGcStat = 0
        self.bestClimbStat = 0
        self.bestSprintStat = 0
        self.bestTtStat = 0
        self.bestOneDayStat = 0
        self.bestHillStat = 0
        self.bestTotalStats = 0

        self.inflationActive = 1

    def updateBestDataSeen(self, rider_info: RiderInfo | None):
        if rider_info is None:
            return
        rider_info['pointsPerSpeciality']
        stats = rider_info.get('pointsPerSpeciality') or {}

        self.bestGcStat = max(self.bestGcStat, stats.get('gc') or 0)
        self.bestClimbStat = max(self.bestClimbStat, stats.get('climber') or 0)
        self.bestSprintStat = max(self.bestSprintStat, stats.get('sprint') or 0)
        self.bestTtStat = max(self.bestTtStat, stats.get('timeTrial') or 0)
        self.bestOneDayStat= max(self.bestOneDayStat, stats.get('oneDayRaces') or 0)
        self.bestHillStat = max(self.bestHillStat, stats.get('hills') or 0)
        self.bestTotalStats = max(self.bestTotalStats, self.getTotalStats(stats))

    def determineComment(self, rider_info: RiderInfo | None):
        if rider_info is None:
            return "... ik ging wel een beetje uit van PCS"
        rider_info['pointsPerSpeciality']
        stats = rider_info.get('pointsPerSpeciality') or {}
        if (self.getTotalStats(stats) > self.bestTotalStats):
            return "die alles kan"
        if ((stats.get('gc') or 0) > self.bestGcStat):
            return "voor het algemeen klassement"
        if ((stats.get('climber') or 0) > self.bestClimbStat):
            return "voor het klimmen"
        if ((stats.get('sprint') or 0) > self.bestSprintStat):
            return "voor het sprinten"
        if ((stats.get('timeTrial') or 0) > self.bestTtStat):
            return "voor het tijdrijden"
        if ((stats.get('oneDayRaces') or 0) > self.bestOneDayStat):
            return "voor etappes"
        if ((stats.get('hills') or 0) > self.bestHillStat):
            return "voor de heuveltjes"
        return "die niks kan"

    def determineBid(self, rider_info: RiderInfo | None, highestBid, you: YouState) -> int | None :
        if rider_info is None:
            return
        rider_info['pointsPerSpeciality']
        stats = rider_info.get('pointsPerSpeciality') or {}
        tonnetjeMeer = min(you.get('moneyLeft'), (highestBid or 0) + TONNETJE)
        if (self.getTotalStats(stats) > self.bestTotalStats):
            return tonnetjeMeer
        if ((stats.get('gc') or 0) > self.bestGcStat):
            return tonnetjeMeer
        if ((stats.get('climber') or 0) > self.bestClimbStat):
            return tonnetjeMeer
        if ((stats.get('sprint') or 0) > self.bestSprintStat):
            return tonnetjeMeer
        if ((stats.get('timeTrial') or 0) > self.bestTtStat):
            return tonnetjeMeer
        if ((stats.get('oneDayRaces') or 0) > self.bestOneDayStat):
            return tonnetjeMeer
        if ((stats.get('hills') or 0) > self.bestHillStat):
            return tonnetjeMeer
        return None

    def getTotalStats(self, stats):
        return (stats.get('gc') or 0) + (stats.get('climber') or 0) + (stats.get('sprint') or 0) + (stats.get('timeTrial') or 0) + (stats.get('oneDayRaces') or 0) + (stats.get('hills') or 0)

    def computeSpotsLeft(self, you: YouState, others: list[OtherState]):
        spotsLeft = SPOTS_PER_TEAM - len(you['riders'])
        for other in others:
            spotsLeft += SPOTS_PER_TEAM - len(other['riders'])
        return spotsLeft

    def applyInflation(self, multiple):
        self.inflationActive = multiple
        self.bestGcStat *= multiple
        self.bestClimbStat *= multiple
        self.bestSprintStat *= multiple
        self.bestTtStat *= multiple
        self.bestOneDayStat *= multiple
        self.bestHillStat *= multiple
        self.bestTotalStats *= multiple

superComputer = theSuperComputer()

def bot(
    rider: str, # naam zoals op https://www.procyclingstats.com/race/giro-d-italia/2026/startlist/alphabetical
    rider_bib: int, # nummer zoals op https://www.procyclingstats.com/race/giro-d-italia/2026/startlist/alphabetical (-1 als het niet bekend is)
    highest_bid: int | None, # hoogste bod, is nooit van jou
    highest_bid_by: str | None, # hoogste bod persoon
    bids: list[BidEntry], # alle boden (in oplopende volgorde), inclusief die van jou
    you: YouState,
    others: list[OtherState], # de rest, jij komt hier niet voor
    upcoming_riders: list[str], # wie er nog komen in alfabetische volgorde (exclusief huidige)
    previous_riders: list[str], # wie er al zijn geweest in alfabetische volgorde (exclusief huidige)
    rider_info: RiderInfo | None, # wat info van PCS, maar misschien ook niet
) -> BotResponse:
    if len(upcoming_riders) > 2 * len(previous_riders):
        superComputer.updateBestDataSeen(rider_info)
        return {
        "amount": None,
        "comment": "ik verzamel even alleen DATA: "
        + str(superComputer.bestOneDayStat) + ", "
        + str(superComputer.bestGcStat) + ", "
        + str(superComputer.bestTtStat) + ", "
        + str(superComputer.bestSprintStat) + ", "
        + str(superComputer.bestClimbStat) + ", "
        + str(superComputer.bestHillStat) + ", "
        + str(superComputer.bestTotalStats)
        }

    if (len(upcoming_riders) < superComputer.computeSpotsLeft(you, others) * 3): #dus een derde moet nog gekocht worden
        if superComputer.inflationActive > 0.9:
            superComputer.applyInflation(0.9)

    if (len(upcoming_riders) < superComputer.computeSpotsLeft(you, others) * 2): #dus de helft moet nog gekocht worden
        if superComputer.inflationActive > 0.5:
            superComputer.applyInflation(0.5)


    comment = "wow ja ik zocht nog iemand " + superComputer.determineComment(rider_info) + str(superComputer.bestOneDayStat) + ", " + str(superComputer.bestGcStat) + ", " + str(superComputer.bestTtStat) + ", " + str(superComputer.bestSprintStat) + ", " + str(superComputer.bestClimbStat) + ", " + str(superComputer.bestHillStat) + ", " + str(superComputer.bestTotalStats)
    bot = superComputer.determineBid(rider_info, highest_bid, you)

    return {
        "amount": bot,
        "comment": comment
    }
