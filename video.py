import requests
from auth import initialize_youtube_client
from rich import print
import os
from dotenv import load_dotenv

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
    video_snippet = get_video_snippet(youtube, video_id)
    video_published_at = video_snippet["items"][0]["snippet"]["publishedAt"]

    request = youtube.search().list(
        part="snippet",
        channelId=channel_id,
        type="video",
        order="date",
        maxResults=50,
        publishedBefore=video_published_at
    )
    response = request.execute()
    videos = [video for video in response["items"] if not is_short(video["id"]["videoId"])][:10]
    
    for video in videos:
        video_id = video["id"]["videoId"]
        stats = get_video_statistics(youtube, video_id)
        if "items" in stats and len(stats["items"]) > 0:
            video["statistics"] = stats["items"][0]["statistics"]
        else:
            video["statistics"] = {"viewCount": "0"}
    
    return videos


if __name__ == "__main__":
    youtube = initialize_youtube_client()
    load_dotenv()
    video_id = os.getenv("GEOGUESSR_VIDEO_ID")
    input_video_snippet = get_video_snippet(youtube, video_id)
    print(f"Computing video ranking for {input_video_snippet['items'][0]['snippet']['title']}...")
    print()

    videos = find_nearby_videos(youtube, video_id)
    sorted_videos = sorted(videos, key=lambda x: int(x["statistics"]["viewCount"]), reverse=True)
    rank = -1
    for sorted_video_idx in range(len(sorted_videos)):
        if sorted_videos[sorted_video_idx]["id"]["videoId"] == video_id:
            rank = sorted_video_idx + 1
            break

    if rank == -1:
        print("Error: Video not found in nearby videos")
        exit()

    print("--------------------------------")
    print("Output:")
    print(f"{input_video_snippet['items'][0]['snippet']['title']} is ranked {rank} out of {len(sorted_videos)}")
    print()
    print("Nearby videos:")
    print()
    for video in sorted_videos:
        print(video["snippet"]["title"])
        print(video["statistics"]["viewCount"])
        print()
    print("--------------------------------")
