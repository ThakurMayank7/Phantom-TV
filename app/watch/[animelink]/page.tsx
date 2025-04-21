"use client";

import { useVideoStore } from "@/store/VideoStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function WatchPage() {
  const videoMetadata = useVideoStore((state) => state.video);

  const router = useRouter();

  useEffect(() => {
    if (!videoMetadata) {
      router.push("/");
    }
  }, [videoMetadata, router]);

  if (!videoMetadata) {
    return <p>Loading video...</p>;
  }

  return <div>{videoMetadata.linkURL}</div>;
}

export default WatchPage;
