from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from procyclingstats import Rider

app = FastAPI(title="BodBot API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/rider/{rider_slug}")
def get_rider(rider_slug: str):
    url = f"rider/{rider_slug}"
    try:
        rider = Rider(url)
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Rider not found: {e}")

    try:
        return {
            "name": rider.name(),
            "nationality": rider.nationality(),
            "birthdate": rider.birthdate(),
            "place_of_birth": rider.place_of_birth(),
            "height": rider.height(),
            "weight": rider.weight(),
            "image_url": rider.image_url(),
            "points_per_speciality": rider.points_per_speciality(),
            "points_per_season_history": rider.points_per_season_history(),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
