import { YoutubeChannel } from "@/types";
import YoutubeVideoCard from "./youtube-video-card";
import { fetchChannelVideos } from "@/lib/utils";
import { isShort } from "@/lib/utils";

interface ChannelRowProps {
  channel: YoutubeChannel;
}

export default async function ChannelRow({ channel }: ChannelRowProps) {
  const videos = await fetchChannelVideos(channel.id);
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">{channel.name}</h2>
      <div className="flex flex-row gap-4">
        {videos.map((video) => (
          <YoutubeVideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
