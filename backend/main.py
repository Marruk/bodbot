import datetime

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from procyclingstats import Rider, RaceStartlist

app = FastAPI(title="BodBot API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["GET"],
    allow_headers=["*"],
)

@app.get("/startlist/{race_slug}/{year}")
def get_startlist(race_slug: str, year: str):
    url = f"race/{race_slug}/{year}/startlist"
    try:
        startlist = RaceStartlist(url)
        return [
            {
                "name": rider["rider_name"],
                "bib": rider["rider_number"],
                "url": rider["rider_url"],
                "nationality": rider["nationality"],
                "teamName": rider["team_name"],
                "teamUrl": rider["team_url"],
            }
            for rider in startlist.startlist()
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/rider/{rider_slug}")
def get_rider(rider_slug: str):
    url = f"rider/{rider_slug}"
    try:
        rider = Rider(url)
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Rider not found: {e}")

    def safe(fn):
        try:
            return fn()
        except Exception:
            return None

    current_year = datetime.date.today().year
    teams_history = safe(rider.teams_history) or []
    current_team = next((t for t in teams_history if t.get("season") == current_year), None)

    speciality_raw = safe(rider.points_per_speciality)
    return {
        "name": safe(rider.name),
        "nationality": safe(rider.nationality),
        "birthdate": safe(rider.birthdate),
        "placeOfBirth": safe(rider.place_of_birth),
        "height": safe(rider.height),
        "weight": safe(rider.weight),
        "imageUrl": safe(rider.image_url),
        "pointsPerSpeciality": {
            k.replace("one_day_races", "oneDayRaces").replace("time_trial", "timeTrial"): v
            for k, v in speciality_raw.items()
        } if speciality_raw else None,
        "pointsPerSeasonHistory": safe(rider.points_per_season_history),
        "currentTeam": current_team["team_name"] if current_team else None,
    }
