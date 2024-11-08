"use client";
import { YoutubeVideo } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { formatViewCount, shortenTitle, sleep } from "@/lib/utils";
import { Sparkle } from "@phosphor-icons/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState, FormEvent } from "react";

const PROMPT: string =
  "I am a youtuber and I am trying to come up with exciting, adventurous, and fun video ideas. I like this video a lot and am trying to come up with ideas similar to it. Can you help me out?";

interface YoutubeVideoCardProps {
  video: YoutubeVideo;
}

interface Prediction {
  output: string[];
  status: string;
}

export default function YoutubeVideoCard({ video }: YoutubeVideoCardProps) {
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [predictionError, setPredictionError] = useState(null);

  const handleSubmit = async () => {
    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: PROMPT,
        videoTitle: video.title,
      }),
    });
    let prediction = await response.json();
    if (response.status !== 201) {
      setPredictionError(prediction.detail);
      return;
    }
    setPrediction(prediction);

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(1000);
      const response = await fetch("/api/predictions/" + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        setPredictionError(prediction.detail);
        return;
      }
      console.log({ prediction: prediction });
      setPrediction(prediction);
    }
  };

  return (
    <div className="flex flex-col gap-2 text-xs flex-shrink-0 w-[200px]">
      <div className="relative">
        <Link href={video.link}>
          <Image
            src={video.thumbnail}
            alt={video.title}
            width={200}
            height={0}
            className="rounded-lg"
          />
        </Link>
        <Dialog>
          <DialogTrigger>
            <div className="absolute top-1 right-1 z-10 bg-white p-1 rounded-md opacity-50 hover:opacity-100 transition-opacity">
              <Sparkle size={16} color="#FFD700" weight="fill" />
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="py-4">{video.title}</DialogTitle>
              {!prediction && (
                <>
                  <div className="flex flex-col gap-4">
                    <Label className="text-lg font-semibold">Prompt</Label>
                    <Textarea value={PROMPT} readOnly className="h-[80px]" />
                    <Button onClick={handleSubmit}>Generate</Button>
                  </div>
                </>
              )}
              {predictionError && (
                <p className="text-red-500">{predictionError}</p>
              )}
              {prediction && (
                <>
                  {prediction.output && (
                    <div className="mt-5">
                      <p>{prediction.output.join("")}</p>
                    </div>
                  )}
                  <p className="py-3 text-sm opacity-50">
                    status: {prediction.status}
                  </p>
                </>
              )}
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <Link href={video.link} className="font-semibold" title={video.title}>
        {shortenTitle(video.title)}
      </Link>
      <div>
        {video.published} • {formatViewCount(video.views)}{" "}
      </div>
    </div>
  );
}
