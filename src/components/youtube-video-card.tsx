import { YoutubeVideo } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { formatViewCount, shortenTitle } from "@/lib/utils";

interface YoutubeVideoCardProps {
  video: YoutubeVideo;
}

export default function YoutubeVideoCard({ video }: YoutubeVideoCardProps) {
  return (
    <div className="flex flex-col gap-2 text-xs flex-shrink-0 w-[200px]">
      <Link href={video.link}>
        <Image
          src={video.thumbnail}
          alt={video.title}
          width={200}
          height={0}
          className="rounded-lg"
        />
      </Link>
      <Link href={video.link} className="font-semibold" title={video.title}>
        {shortenTitle(video.title)}
      </Link>
      <div>
        {video.published} • {formatViewCount(video.views)}{" "}
      </div>
    </div>
  );
}
