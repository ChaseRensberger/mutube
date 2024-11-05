"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AddChannelForm() {
  const [channelId, setChannelId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://horizon.studioj.mov/tracked-channel?channelId=${channelId}&key=a3UgCj_iD2zuqocV`,
        { method: "POST" }
      );

      if (response.ok) {
        setChannelId("");
        window.location.reload();
      }
    } catch (error) {
      console.error("Failed to add channel:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-12 mx-auto flex gap-4 w-6/12">
      <Input
        placeholder="Channel ID"
        id="channelId"
        value={channelId}
        onChange={(e) => setChannelId(e.target.value)}
      />
      <Button type="submit">Add Tracked Channel</Button>
    </form>
  );
}
