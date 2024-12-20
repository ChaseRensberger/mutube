import ChannelRow from "@/components/channel-row";
import { YoutubeChannel } from "@/types";
// import AddChannelForm from "@/components/add-channel-form";

export const revalidate = 10;

export default async function TrackedChannels() {
  const response = await fetch("https://horizon.studioj.mov/tracked-channels");
  const channelsData = await response.json();
  if (!Array.isArray(channelsData)) {
    console.error("Expected an array but got:", channelsData);
    return <div>Error loading channels</div>;
  }
  const trackedChannels: YoutubeChannel[] = channelsData.map((channel) => ({
    id: channel.ChannelId,
    name: channel.ChannelName,
  }));
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Channels</h1>
      <div className="flex flex-col gap-4">
        {trackedChannels.map((channel) => (
          <ChannelRow key={channel.id} channel={channel} />
        ))}
      </div>
      {/* <AddChannelForm /> */}
    </main>
  );
}
