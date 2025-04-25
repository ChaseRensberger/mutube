import requests
from auth import initialize_youtube_client
from rich import print
import os
from dotenv import load_dotenv

class Video:
    def __init__(self, video_id, title):
        self.video_id = video_id
        self.title = title

def get_video_snippet(youtube, video_id):
    request = youtube.videos().list(
        part="snippet",
        id=video_id
    )
    response = request.execute()
    return response

def get_video_statistics(youtube, video_id):
    request = youtube.videos().list(
        part="statistics",
        id=video_id
    )
    response = request.execute()
    return response

def get_channel_id_from_video_id(youtube, video_id):
    request = youtube.videos().list(
        part="snippet",
        id=video_id
    )
    response = request.execute()
    return response["items"][0]["snippet"]["channelId"]

def is_short(video_id):
    short_url = f"https://www.youtube.com/shorts/{video_id}"
    try:
        response = requests.head(short_url, allow_redirects=False)
        if response.status_code == 200:
            return True

        if 300 <= response.status_code < 400:
            return False

        return False

    except Exception:
        return False
    

def find_nearby_videos(youtube, video_id):
    channel_id = get_channel_id_from_video_id(youtube, video_id)
    print(f"Channel ID: {channel_id}")

    video_snippet = get_video_snippet(youtube, video_id)
    video_published_at = video_snippet["items"][0]["snippet"]["publishedAt"]
    print(f"Video published at: {video_published_at}")

    request = youtube.search().list(
        part="snippet",
        channelId=channel_id,
        type="video",
        order="date",
        maxResults=9,
        publishedBefore=video_published_at
    )
    response = request.execute()
    return response
    
if __name__ == "__main__":
    youtube = initialize_youtube_client()
    load_dotenv()
    print(find_nearby_videos(youtube, os.getenv("GEOGUESSR_VIDEO_ID")))