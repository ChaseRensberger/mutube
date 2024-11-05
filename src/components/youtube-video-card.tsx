import { YoutubeVideo } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface YoutubeVideoCardProps {
  video: YoutubeVideo;
}

export default function YoutubeVideoCard({ video }: YoutubeVideoCardProps) {
  return (
    <div className="flex flex-col gap-2">
      <Image
        src={video.thumbnail}
        alt={video.title}
        width={480}
        height={360}
        objectFit="cover"
        className="rounded-lg"
      />
      <Link href={video.link} className="font-bold">
        {video.title}
      </Link>
      <div>{video.published}</div>
    </div>
  );
}
