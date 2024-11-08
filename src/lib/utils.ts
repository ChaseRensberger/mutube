import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { parseStringPromise } from "xml2js";
import { YoutubeVideo } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchChannelVideos(
  channelId: string,
  maxResults: number = 10
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
    views: parseInt(
      entry["media:group"][0]["media:community"][0]["media:statistics"][0].$
        .views,
      10
    ),
  }));
}

export function formatViewCount(views: number): string {
  if (views >= 1000000000) {
    return `${(views / 1000000000).toFixed(1).replace(/\.0$/, "")}B`;
  }
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  }
  return views.toString();
}

export async function isShort(id: string): Promise<boolean> {
  const response = await fetch(`https://www.youtube.com/shorts/${id}`, {
    redirect: "manual",
  });

  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get("Location");
    if (location && location.includes("/watch?v=")) {
      return false;
    }
  }

  return response.status !== 302 && response.status !== 404;
}
