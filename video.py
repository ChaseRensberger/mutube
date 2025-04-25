import requests

EXAMPLE_SHORT_URL = "https://www.youtube.com/shorts/uQj5O4GTWtA"
EXAMPLE_VIDEO_URL = "https://www.youtube.com/watch?v=gGQlY9NbLaI"

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
    
if __name__ == "__main__":
    print(is_short("uQj5O4GTWtA"))