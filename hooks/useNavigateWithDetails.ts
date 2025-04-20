'use client';

import { useRouter } from 'next/navigation';
import { useVideoStore } from '@/store/VideoStore';
import { VideoMetadataType } from '@/utils/types';

export function useNavigateWithDetails() {
  const router = useRouter();
  const setVideo = useVideoStore((state) => state.setVideo);

  const navigate = (videoMetadata: VideoMetadataType) => {
    setVideo(videoMetadata);
    router.push(`/watch/${encodeURIComponent(videoMetadata.linkURL)}-${videoMetadata.episode}`);
  };

  return navigate;
}
