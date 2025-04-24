"use client";

import VideoPlayer from "@/components/VideoPlayer";
import { useVideoStore } from "@/store/VideoStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function WatchPage() {
  const videoMetadata = useVideoStore((state) => state.video);

  const router = useRouter();

  const [currentEpisode, setCurrentEpisode] = useState<number>(1);

  // const [relatedVideos, setRelatedVideos] = useState<VideoMetadataType | null>(
  //   null
  // );

  useEffect(() => {
    if (!videoMetadata) {
      router.push("/");
    }
  }, [videoMetadata, router]);

  if (!videoMetadata) {
    return <p>Loading video...</p>;
  }

  return (
    // <div>
    <div className="flex flex-row gap-2 h-[80vh]">
      <div className="w-3/12 bg-surface rounded h-full p-2 flex flex-col border border-border-focus">
        <h2 className="mb-2 text-lg text-center">List of Episodes</h2>
        <div className="overflow-y-auto flex-grow">
          <div className="grid grid-cols-5 gap-1 mr-1">
            {Array.from({ length: videoMetadata.episode }, (_, i) => (
              <span
                key={i}
                className={`${
                  currentEpisode == i + 1 ? "bg-amber-500" : "bg-border-focus"
                } text-text-inverted px-2 py-1 text-center hover:bg-gray-100 cursor-pointer rounded`}
                onClick={() => setCurrentEpisode(i + 1)}
              >
                {i + 1}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="w-7/12 bg-surface rounded flex items-center justify-center">
        <VideoPlayer title={videoMetadata.linkURL} episode={currentEpisode} />
      </div>
      <div className="w-2/12 bg-surface rounded p-3 flex flex-col justify-center text-center">
        <div className="space-y-3">
          {videoMetadata.thumbnailURL && (
            <div className="mb-6">
              <Image
                src={videoMetadata.thumbnailURL}
                alt={videoMetadata.title}
                className="w-full rounded"
                width={400}
                height={225}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </div>
          )}

          <div>
            <p className="text-2xl font-bold">{videoMetadata.title}</p>
          </div>

          <div>
            <h3 className="font-medium">
              Total Episodes :{" "}
              <span className="font-black">{videoMetadata.episode}</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
    //   <div>
    //     <p>Watch More</p>
    //   </div>
    // </div>
  );
}

export default WatchPage;
