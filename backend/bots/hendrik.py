import random
from typing import TypedDict

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
    base = (highest_bid or 0)
    random_amount = base + 100_000 * random.randint(1, 6)

    do_bid = random.random() < 0.5

    return {
        "amount": min(you["moneyLeft"], random_amount) if do_bid else None,
        "comment": "test",
    }
