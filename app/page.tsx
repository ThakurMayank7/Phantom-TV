"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimeFetchType,
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
import AnimeCard from "@/components/AnimeCard";
import debounce from "lodash.debounce";

export default function Home() {
  const [top10, setTop10] = useState<Top10AnimeMetadataType[] | null>(null);
  const [favourite, setFavourite] = useState<AnimeMetadata[] | null>(null);
  const [popular, setPopular] = useState<AnimeMetadata[] | null>(null);

  const [bannerData, setBannerData] = useState<BannerDataType[] | null>(null);

  const [query, setQuery] = useState<string>("");

  const isSearchActiveRef = useRef<boolean>(false);

  const [searchResults, setSearchResults] = useState<AnimeFetchType[]>([]);

  const navigateWithDetails = useNavigateWithDetails();

  const homePageMetadata: HomePageAnimeDatatype | null =
    useHomePageMetadataStore((state) => state.homePageMetadata);

  const setHomePageMetadata = useHomePageMetadataStore(
    (state) => state.setHomePageMetadata
  );

  const [isSearchLoading, setIsSearchLoading] = useState(false);

  const debouncedSearch = useRef(
    debounce(async (searchTerm: string) => {
      if (searchTerm.length === 0) {
        setSearchResults([]);
        return;
      }

      if (searchTerm.length < 2) {
        return;
      }

      setIsSearchLoading(true);
      try {
        const res = await fetch(
          `/api/search?title=${encodeURIComponent(searchTerm)}`
        );
        const data = await res.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsSearchLoading(false);
      }
    }, 300)
  ).current;

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (window.scrollY === 0) {
      window.scrollTo({
        top: 400,
        behavior: "smooth",
      });
    }

    if (newQuery.length > 0 && !isSearchActiveRef.current) {
      isSearchActiveRef.current = true;
    } else if (newQuery.length === 0 && isSearchActiveRef.current) {
      isSearchActiveRef.current = false;
      setSearchResults([]);
      return;
    }

    debouncedSearch(newQuery);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

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

  const handleSearchNavigation = (anime: AnimeFetchType) => {
    if (!anime) {
      return;
    }

    const fetchQueryResults = async () => {
      const res = await fetch(
        `/api/episodes?title=${encodeURIComponent(anime.title)}`
      );
      const episodes: number = await res.json();
      console.log(episodes);

      const videoMetadata: VideoMetadataType = {
        title: anime.title,
        linkURL: anime.link_url.split("-episode")[0],
        episode: episodes,
        thumbnailURL: anime.thumbnail_url,
      };
      navigateWithDetails(videoMetadata);
    };
    fetchQueryResults();
  };

  if (!homePageMetadata) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-background text-text-primary">
      <div>{bannerData && <BannerCarousel banners={bannerData} />}</div>

      <div className="min-h-screen p-4">
        <div className="flex flex-col items-center mt-8 mb-12">
          <input
            type="search"
            value={query}
            onChange={handleQueryChange}
            placeholder="Search for an anime..."
            className="w-3/4 py-4 px-20 text-2xl border border-border-focus rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-primary bg-input-background"
          />
          {isSearchActiveRef.current && (
            <div className="w-full bg-surface-elevated mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 rounded-lg shadow-md shadow-shadow border-2 border-border-light transition-all duration-200">
              {isSearchLoading ? (
                <div className="col-span-5 text-center py-8">
                  <p className="text-lg font-medium">Searching...</p>
                </div>
              ) : searchResults.length > 0 ? (
                searchResults.map((anime: AnimeFetchType, index) => (
                  <AnimeCard
                    key={index}
                    anime={
                      {
                        title: anime.title,
                        linkURL: anime.link_url,
                        thumbnailURL: anime.thumbnail_url,
                        numberOfEpisodes: 100,
                      } as AnimeMetadata
                    }
                    handleSearchNavigation={() => handleSearchNavigation(anime)}
                  />
                ))
              ) : (
                <div className="text-center text-text-primary font-semibold text-lg">
                  No results found for {query}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-row gap-2 mt-4">
          <div className="w-2/6 border border-border-focus p-2 rounded flex flex-col h-screen">
            <h2 className="text-4xl font-semibold text-center my-4">TOP 10</h2>
            <div
              className="flex flex-col space-y-4 overflow-y-auto flex-grow pr-1"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "transparent transparent",
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                e.currentTarget.style.scrollbarColor =
                  "var(--color-scrollbar-hover) transparent";
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                e.currentTarget.style.scrollbarColor =
                  "var(--color-scrollbar) transparent";
              }}
            >
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

          <div className="w-4/6 h-80">
            {favourite && query.length === 0 && (
              <div>
                <h2 className="text-2xl ml-16 font-bold">Favourite Animes</h2>
                <FavouriteCarousel animes={favourite} />
              </div>
            )}
            <br />
            {popular && query.length === 0 && (
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
