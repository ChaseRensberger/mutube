from auth import initialize_youtube_client
from rich import print
from fastapi import FastAPI
from video import get_video_snippet

youtube = initialize_youtube_client()
app = FastAPI()

@app.get("/")
def read_root():
    return "µ-tube is up and running..."

@app.get("/score/{video_id}")
def evaluate_score(video_id: str):
    # Step 1. Retrieve video metadata
    return {"score": 0.5}

