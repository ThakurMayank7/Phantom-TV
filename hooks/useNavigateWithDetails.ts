"use client";

import { useRouter } from "next/navigation";
import { useVideoStore } from "@/store/VideoStore";
import { VideoMetadataType } from "@/utils/types";

export function useNavigateWithDetails(): (
  videoMetadata: VideoMetadataType
) => void {
  const router = useRouter();
  const setVideo = useVideoStore((state) => state.setVideo);

  const navigate = (videoMetadata: VideoMetadataType) => {
    if (!videoMetadata.linkURL) {
      console.error("Missing linkURL in videoMetadata");
      return;
    }

    console.log("videoMetadata", videoMetadata);

    setVideo(videoMetadata);
    router.push(`/watch/${encodeURIComponent(videoMetadata.linkURL)}`);
  };

  return navigate;
}
