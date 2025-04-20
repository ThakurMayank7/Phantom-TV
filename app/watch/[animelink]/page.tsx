import { useNavigateToHome } from "@/hooks/useNavigateToHome"
import { useVideoStore } from "@/store/VideoStore";
import { VideoMetadataType } from "@/utils/types";
import React, { useEffect, useState } from "react";

function WatchPage() {
  const [videoMetadata, setVideoMetadata] = useState<VideoMetadataType | null>(
    null
  );

  const navigateHome = useNavigateToHome();

useEffect(() => {
  const video = useVideoStore.getState().video;
  if (!video) {
    navigateHome();
    return;
  }
  setVideoMetadata(video);

  return () => {
    useVideoStore.getState().clearVideo();
  };
}, [navigateHome]);

  if (!videoMetadata) {
    return <p>Loading video...</p>;
  }

  if (!videoMetadata) {
    return <p>Loading...</p>;
  }

  return <div>WatchPage</div>;
}

export default WatchPage;
