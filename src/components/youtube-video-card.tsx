import { YoutubeVideo } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { formatViewCount, shortenTitle } from "@/lib/utils";

interface YoutubeVideoCardProps {
  video: YoutubeVideo;
}

export default function YoutubeVideoCard({ video }: YoutubeVideoCardProps) {
  return (
    <div className="flex flex-col gap-2 text-xs">
      <Link href={video.link}>
        <Image
          src={video.thumbnail}
          alt={video.title}
          width={480}
          height={360}
          objectFit="cover"
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
