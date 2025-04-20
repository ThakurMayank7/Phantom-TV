import { VideoMetadataType } from "@/utils/types";
import { create } from "zustand";

type VideoStore = {
  video: VideoMetadataType | null;
  setVideo: (video: VideoMetadataType) => void;
  clearVideo: () => void;
};

export const useVideoStore = create<VideoStore>((set) => ({
  video: null,
  setVideo: (video) => set({ video }),
  clearVideo: () => set({ video: null }),
}));
