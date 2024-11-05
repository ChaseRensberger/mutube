import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { parseStringPromise } from "xml2js";
import { YoutubeVideo } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchChannelVideos(
  channelId: string,
  maxResults: number = 5
): Promise<YoutubeVideo[]> {
  const response = await fetch(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`
  );
  const xmlData = await response.text();
  const result = await parseStringPromise(xmlData);

  return result.feed.entry.slice(0, maxResults).map((entry: any) => ({
    id: entry["yt:videoId"][0],
    title: entry.title[0],
    link: entry.link[0].$.href,
    thumbnail: `https://img.youtube.com/vi/${entry["yt:videoId"][0]}/mqdefault.jpg`,
    published: new Date(entry["published"][0]).toLocaleDateString(),
  }));
}
