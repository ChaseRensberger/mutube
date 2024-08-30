"use client";
import Image from "next/image";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Line, LineChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
  desktop: {
    label: "LukeJ",
    color: "#f87171",
  },
  mobile: {
    label: "Koolaid",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  views: string;
  timestamp: string;
}

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const lukej_img_src =
  "https://yt3.googleusercontent.com/NK2CK9qdB6i2S-cmdbpuhm5iHWSH4I2gJuVScABdmI-yWMduh2iR8CtgG34RbeM6Rh8V2aG-=s160-c-k-c0x00ffffff-no-rj";

const VideoList: Video[] = [
  {
    id: "1",
    title: "I spent A Day In 3rd Person!",
    thumbnail:
      "https://i.ytimg.com/vi/3GAAIKDUMLg/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDv-HuhPutReic1uhv6y6N5Uqht4A",
    views: "732",
    timestamp: "2 weeks ago",
  },
  {
    id: "2",
    title: "I spent A Day In 3rd Person!",
    thumbnail:
      "https://i.ytimg.com/vi/3GAAIKDUMLg/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDv-HuhPutReic1uhv6y6N5Uqht4A",
    views: "732",
    timestamp: "2 weeks ago",
  },
  {
    id: "3",
    title: "I spent A Day In 3rd Person!",
    thumbnail:
      "https://i.ytimg.com/vi/3GAAIKDUMLg/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDv-HuhPutReic1uhv6y6N5Uqht4A",
    views: "732",
    timestamp: "2 weeks ago",
  },
  {
    id: "4",
    title: "I spent A Day In 3rd Person!",
    thumbnail:
      "https://i.ytimg.com/vi/3GAAIKDUMLg/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDv-HuhPutReic1uhv6y6N5Uqht4A",
    views: "732",
    timestamp: "2 weeks ago",
  },
  {
    id: "5",
    title: "I spent A Day In 3rd Person!",
    thumbnail:
      "https://i.ytimg.com/vi/3GAAIKDUMLg/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDv-HuhPutReic1uhv6y6N5Uqht4A",
    views: "732",
    timestamp: "2 weeks ago",
  },
];

export default function Channel() {
  return (
    <main className="p-12 space-y-8">
      <section className="flex gap-4 w-10/12">
        <Image
          className="rounded-full"
          src={lukej_img_src}
          alt="LukeJ"
          width={160}
          height={160}
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">LukeJ</h1>
          <h2 className="flex">
            <span>@Lukejtv</span>
            <span>•</span>
            <span>2.49K subscribers</span>
            <span>•</span>
            <span>74 videos</span>
          </h2>
          <h2>having fun & filming it</h2>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-bold text-2xl">New Uploads</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:flex xl:gap-4">
          {VideoList.map((video) => (
            <YoutubeVideoCard key={video.id} video={video} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-bold text-2xl">Analytics</h2>
        <ChartContainer config={chartConfig} className="h-48 w-full">
          <LineChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Line dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </LineChart>
        </ChartContainer>
      </section>
    </main>
  );
}

interface YoutubeVideoCardProps {
  video: Video;
}

function YoutubeVideoCard({ video }: YoutubeVideoCardProps) {
  return (
    <div className="w-[246px]">
      <Image
        src={video.thumbnail}
        alt={video.title}
        width={246}
        height={138}
        objectFit="cover"
        className="rounded-lg"
      />
      <h2 className="font-bold">{video.title}</h2>
      <div className="text-gray-500 text-sm">
        <h3>LukeJ</h3>
        <div className="flex gap-1">
          <span>{video.views} views</span>
          <span>•</span>
          <span>{video.timestamp}</span>
        </div>
      </div>
    </div>
  );
}
