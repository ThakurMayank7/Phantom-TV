"use client";

import { useEffect, useState } from "react";
import { Banner, firebaseAnimeData, firebaseHomePageData } from "@/utils/types";
import BannerCarousel from "@/components/BannerCarousel";
import TrendingCarousel from "@/components/TrendingCarousel";
import { db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { fetchHomePageData } from "@/lib/fetcher";

type AnimeMetadata = {
  id: string;
  title: string;
  image: string;
  releaseDate: string;
  description: string;
  subOrDub: string;
  totalEpisodes: number;
  status: string;
};

export default function Home() {
  const [result, setResult] = useState<AnimeMetadata[] | null>(null);

  const [top10, setTop10] = useState<AnimeMetadata[] | null>(null);
  const [trending, setTrending] = useState<AnimeMetadata[] | null>(null);
  const [popular, setPopular] = useState<AnimeMetadata[] | null>(null);

  useEffect(() => {
    const fetchHomePage = async () => {
      fetchHomePageData();
    };
    fetchHomePage();
  }, []);

  const fetchAnimeMetadata = async (
    title: string
  ): Promise<AnimeMetadata[] | null> => {
    try {
      const res = await fetch(`/api/search?title=${encodeURIComponent(title)}`);
      if (!res.ok) throw new Error("Failed to fetch metadata");

      const data = await res.json();

      console.log(data);

      const data2: AnimeMetadata[] = data;
      return data2;
    } catch (err) {
      console.error("Error fetching metadata:", err);
      return null;
    }
  };

  const handleResult = async () => {
    const r = await fetchAnimeMetadata("Fire Force Season 2");
    setResult(r);
  };

  // const banners: Banner[] = [
  //   {
  //     title: "Super Cube",
  //     description:
  //       "In an accident, an ordinary boy, Wang Xiaoxiu, obtains a space system called Superpower Cube...",
  //     thumbnailURL:
  //       "https://cdn.noitatnemucod.net/thumbnail/1366x768/100/71a1f086c03a5f0157834c17860e1235.jpg",
  //   },
  //   {
  //     title: "One Piece",
  //     description:
  //       "Gold Roger was known as the Pirate King... Enter Monkey Luffy, a 17-year-old boy...",
  //     thumbnailURL:
  //       "https://cdn.noitatnemucod.net/thumbnail/1366x768/100/db8603d2f4fa78e1c42f6cf829030a18.jpg",
  //   },
  // ];

  return (
    <div className="bg-background text-text-primary min-h-screen p-8">
      {/* <BannerCarousel banners={banners} /> */}

      <button onClick={() => handleResult()}>asddsafsdasdfsda</button>

      {result && result.toString()}
      <div className="w-full">
        <TrendingCarousel />
      </div>

      {/* <VideoPlayer title="one-piece" episode={1} /> */}
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
