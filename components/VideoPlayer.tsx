"use client";

import { constructVideoUrl } from "@/lib/constructUrl";
import { useState } from "react";

export default function VideoPlayer() {
  const [error, setError] = useState<string | null>(null);

  const [result, setResult] = useState<unknown>();

  const videoSrc = constructVideoUrl("one-piece", 1);

  const handleError = () => {
    setError("Video failed to load. Please check the source URL.");
  };

//   async function fetchAnimeMetadata(title: string) {
//     try {
//       const res = await fetch(`/api/anime?title=${encodeURIComponent(title)}`);
//       if (!res.ok) throw new Error("Failed to fetch metadata");
  
//       const data = await res.json();
//       console.log("Metadata:", data);
//       return data;
//     } catch (err) {
//       console.error("Error fetching metadata:", err);
//       return null;
//     }

//   const handleResult = () => {
//     let r: unknown;
//     try {
//       r = fetchAnimeMetadata("One Piece");
//       setResult(r);
//     } catch (e) {}
//   };

  return (
    <>
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
      {/* <button onClick={handleResult}>get result</button> */}
      {result}
    </>
  );
}
