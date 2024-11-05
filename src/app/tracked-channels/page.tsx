import ChannelRow from "@/components/channel-row";
import { YoutubeChannel } from "@/types";
import AddChannelForm from "@/components/add-channel-form";

export const revalidate = 10;

export default async function TrackedChannels() {
  const response = await fetch("https://horizon.studioj.mov/tracked-channel");
  const channels: { ChannelId: string; ChannelName: string }[] =
    await response.json();
  const trackedChannels: YoutubeChannel[] = channels.map((channel) => ({
    id: channel.ChannelId,
    name: channel.ChannelName,
  }));
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Channels</h1>
      {trackedChannels.map((channel) => (
        <ChannelRow key={channel.id} channel={channel} />
      ))}
      <AddChannelForm />
    </main>
  );
}
