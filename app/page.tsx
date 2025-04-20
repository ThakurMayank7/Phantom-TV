"use client";

import { useEffect, useState } from "react";
import {
  AnimeMetadata,
  BannerDataType,
  HomePageAnimeDatatype,
  Top10AnimeMetadataType,
} from "@/utils/types";
import BannerCarousel from "@/components/BannerCarousel";
import TrendingCarousel from "@/components/TrendingCarousel";
import { fetchHomePageData } from "@/lib/fetcher";

export default function Home() {
  const [result, setResult] = useState<AnimeMetadata[] | null>(null);

  const [top10, setTop10] = useState<Top10AnimeMetadataType[] | null>(null);
  const [trending, setTrending] = useState<AnimeMetadata[] | null>(null);
  const [popular, setPopular] = useState<AnimeMetadata[] | null>(null);

  const [bannerData, setBannerData] = useState<BannerDataType[] | null>(null);

  useEffect(() => {
    const fetchHomePage = async () => {
      const homePageData: HomePageAnimeDatatype | null =
        await fetchHomePageData();

      if (!homePageData) {
        return;
      }

      console.log(homePageData);

      setTop10(homePageData.top10);
      setTrending(homePageData.trending);
      setPopular(homePageData.popular);
      setBannerData(homePageData.bannerData);
    };
    fetchHomePage();
  }, []);

  return (
    <div className="bg-background text-text-primary min-h-screen p-8">
      {bannerData && <BannerCarousel banners={bannerData} />}

      {result && result.toString()}
      <div className="w-full">
        <TrendingCarousel />
      </div>

      <div className="bg-surface p-6 rounded-2xl border border-border mb-6">
        <h2 className="text-2xl font-bold text-text-accent">Demon Slayer</h2>
        <p className="text-text-secondary">Season 3 • Action, Fantasy</p>
        <button className="mt-4 bg-button-primary text-button-text px-4 py-2 rounded hover:bg-button-primary-hover">
          Watch Now
        </button>
      </div>
      <div className="bg-background text-text-primary min-h-screen p-8">
        <div className="bg-surface p-6 rounded-2xl border border-border">
          <h2 className="text-2xl font-bold text-text-accent">Demon Slayer</h2>
          <p className="text-text-secondary">Season 3 • Action, Fantasy</p>
          <button className="mt-4 bg-button-primary text-button-text px-4 py-2 rounded hover:bg-button-primary-hover">
            Watch Now
          </button>
        </div>
      </div>
    </div>
  );
}
