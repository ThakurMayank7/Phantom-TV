"use client";

import { constructVideoUrl } from "@/lib/constructUrl";
import { VideoPlayerType } from "@/utils/types";
import { useState } from "react";

export default function VideoPlayer({ title, episode }: VideoPlayerType) {
  const [error, setError] = useState<string | null>(null);

  const videoSrc = constructVideoUrl(title, episode);

  const handleError = () => {
    setError("Video failed to load. Please check the source URL.");
  };

  return (
    <div className="w-full relative aspect-video bg-gray-800 rounded-lg overflow-hidden">
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-error-bg">
          <div className="text-error text-center p-4">
            <p className="text-lg font-semibold mb-2">There was an Error!</p>
            <p>{error}</p>
          </div>
        </div>
      )}
      <iframe
        src={videoSrc}
        className="w-full h-full"
        title="One Piece Episode 1"
        frameBorder="0"
        scrolling="no"
        allowFullScreen
        onError={handleError}
      />
    </div>
  );
}
