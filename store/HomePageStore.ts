import { HomePageAnimeDatatype } from "@/utils/types";
import { create } from "zustand";

type useHomePageMetadataStore = {
  homePageMetadata: HomePageAnimeDatatype | null;
  setHomePageMetadata: (video: HomePageAnimeDatatype) => void;
  clearHomePageMetadata: () => void;
};

export const useHomePageMetadataStore = create<useHomePageMetadataStore>(
  (set) => ({
    homePageMetadata: null,
    setHomePageMetadata: (homePageMetadata) => set({ homePageMetadata }),
    clearHomePageMetadata: () => set({ homePageMetadata: null }),
  })
);
