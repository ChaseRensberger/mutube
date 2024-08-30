import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const lukej_img_src =
  "https://yt3.googleusercontent.com/NK2CK9qdB6i2S-cmdbpuhm5iHWSH4I2gJuVScABdmI-yWMduh2iR8CtgG34RbeM6Rh8V2aG-=s160-c-k-c0x00ffffff-no-rj";

const VideoList = [
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
      <div className="flex gap-4">
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
      </div>

      <section>
        <h2 className="font-bold text-2xl">New Uploads</h2>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-sm"
        >
          <CarouselContent>
            {VideoList.slice(0, 5).map((video, index) => (
              <CarouselItem
                key={video.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-3xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    </main>
  );
}
