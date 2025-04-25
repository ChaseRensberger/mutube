from auth import initialize_youtube_client
# from channel import get_channel_info
from video import is_short
from rich import print

def main():
    youtube = initialize_youtube_client()
    print(is_short("gGQlY9NbLaI"))
    print(is_short("uQj5O4GTWtA"))

if __name__ == "__main__":
    main()
