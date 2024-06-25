import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const channelButtons = [
  {
    name: "Channelytics",
    href: "/channelId/channelytics",
  },
  {
    name: "Videos",
    href: "/channelId/channelytics",
  },
  {
    name: "Projections",
    href: "/channelId/channelytics",
  },
  {
    name: "Similar Channels",
    href: "/channelId/channelytics",
  },
  {
    name: "About",
    href: "/channelId/channelytics",
  },
];

export default function ChannelId() {
  return (
    <main className="p-24">
      <Card className="p-4">
        <CardContent className="flex items-center gap-8">
          <Avatar className="w-32 h-32 hover:rounded-md">
            <AvatarImage src="https://yt3.googleusercontent.com/NK2CK9qdB6i2S-cmdbpuhm5iHWSH4I2gJuVScABdmI-yWMduh2iR8CtgG34RbeM6Rh8V2aG-=s176-c-k-c0x00ffffff-no-rj" />
            <AvatarFallback>LJ</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h1 className="font-bold text-2xl">LukeJ</h1>
            <span className="flex gap-4 text-lg items-center">
              <h2 className="text-gray-600">@lukejtv</h2>
              <h2 className="text-gray-400">71 videos</h2>
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between gap-4">
          {channelButtons.map((button) => (
            <Button key={button.name} className="py-6 flex-1">
              {button.name}
            </Button>
          ))}
        </CardFooter>
      </Card>
    </main>
  );
}
