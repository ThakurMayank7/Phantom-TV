"use client";

import { useEffect, useState } from "react";
import {
  AnimeMetadata,
  BannerDataType,
  HomePageAnimeDatatype,
  Top10AnimeMetadataType,
  VideoMetadataType,
} from "@/utils/types";
import BannerCarousel from "@/components/BannerCarousel";
import FavouriteCarousel from "@/components/TrendingCarousel";
import { fetchHomePageData } from "@/lib/fetcher";
import PopularCarousel from "@/components/PopularCarousel";
import { useNavigateWithDetails } from "@/hooks/useNavigateWithDetails";
import { useHomePageMetadataStore } from "@/store/HomePageStore";

export default function Home() {
  const [top10, setTop10] = useState<Top10AnimeMetadataType[] | null>(null);
  const [favourite, setFavourite] = useState<AnimeMetadata[] | null>(null);
  const [popular, setPopular] = useState<AnimeMetadata[] | null>(null);

  const [bannerData, setBannerData] = useState<BannerDataType[] | null>(null);

  const navigateWithDetails = useNavigateWithDetails();

  const homePageMetadata: HomePageAnimeDatatype | null =
    useHomePageMetadataStore((state) => state.homePageMetadata);

  const setHomePageMetadata = useHomePageMetadataStore(
    (state) => state.setHomePageMetadata
  );

  useEffect(() => {
    if (homePageMetadata) {
      setTop10(homePageMetadata.top10);
      setFavourite(homePageMetadata.favourite);
      setPopular(homePageMetadata.popular);
      setBannerData(homePageMetadata.bannerData);
    } else {
      const fetchHomePage = async () => {
        const homePageData: HomePageAnimeDatatype | null =
          await fetchHomePageData();

        if (!homePageData) {
          return;
        }

        setTop10(homePageData.top10);
        setFavourite(homePageData.favourite);
        setPopular(homePageData.popular);
        setBannerData(homePageData.bannerData);

        setHomePageMetadata(homePageData);
      };
      fetchHomePage();
    }
  }, [homePageMetadata, setHomePageMetadata]);

  if (!homePageMetadata) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-background text-text-primary">
      <div>{bannerData && <BannerCarousel banners={bannerData} />}</div>

      <div className="min-h-screen p-4">
        <div className="flex flex-row gap-2 mt-4">
          <div className="w-2/6 border border-border-focus p-2 rounded">
            <h2 className="text-4xl font-semibold text-center my-4">TOP 10</h2>
            <div className="flex flex-col space-y-4">
              {top10?.map((anime) => (
                <div
                  key={anime.rank}
                  className="flex bg-surface-elevated p-2 rounded shadow-md shadow-shadow border-2 border-border-light hover:border-border-focus hover:bg-surface-hover transition-all duration-200"
                >
                  <div className="flex items-center justify-center w-1/12">
                    <p className="text-4xl font-bold bg-primary text-text-inverted p-2 rounded-sm shadow-md text-shadow-shadow">
                      {anime.rank}
                    </p>
                  </div>
                  <div className="w-5/12 flex items-center justify-center">
                    <div
                      className="h-[20vh] aspect-square bg-cover bg-center bg-no-repeat rounded-lg overflow-hidden shadow-lg relative border border-border-focus"
                      style={{
                        backgroundImage: `url(${anime.animeMetadata.thumbnailURL})`,
                      }}
                    />
                  </div>
                  <div className="w-6/12 flex flex-col items-center justify-center text-center gap-8">
                    <p className="truncate w-full text-text-primary text-2xl mt-4 font-serif">
                      {anime.animeMetadata.title}
                    </p>

                    <button
                      className="text-button-text hover:text-button-secondary-hover focus:text-button-secondary-pressed bg-button-primary hover:bg-button-primary-hover focus:bg-button-primary-pressed hover:cursor-pointer p-2 text-lg font-semibold rounded border-2 border-button-secondary hover:border-border-light"
                      onClick={() =>
                        navigateWithDetails({
                          title: anime.animeMetadata.title,
                          linkURL: anime.animeMetadata.linkURL,
                          episode: anime.animeMetadata.numberOfEpisodes,
                          thumbnailURL: anime.animeMetadata.thumbnailURL,
                        } as VideoMetadataType)
                      }
                    >
                      Watch Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-4/6">
            {favourite && (
              <div>
                <h2 className="text-2xl ml-16 font-bold">Favourite Animes</h2>
                <FavouriteCarousel animes={favourite} />
              </div>
            )}
            <br />
            {popular && (
              <div>
                <h2 className="text-2xl ml-16 font-bold">Popular Animes</h2>
                <PopularCarousel animes={popular} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
