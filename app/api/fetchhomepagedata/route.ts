// app/api/fetchhomepagedata/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  AnimeMetadata,
  fetchedEpisodeType,
  firebaseHomePageData,
  HomePageAnimeDatatype,
  Top10AnimeMetadataType,
} from "@/utils/types";

export async function POST(req: NextRequest) {
  try {
    const data: firebaseHomePageData = await req.json();

    const top10: Top10AnimeMetadataType[] = await Promise.all(
      data.top10.map(async (anime) => {
        const episodesRes = await fetch(
          `https://animeapi.skin/episodes?title=${encodeURIComponent(
            anime.data.title
          )}`
        );
        const episodesData = await episodesRes.json();
        const episodes = Array.isArray(episodesData) ? episodesData.length : 0;

        const fetchedEpisode: fetchedEpisodeType = {
          fetchedEpisode: episodesData[0],
        };

        return {
          rank: anime.rank,
          animeMetadata: {
            title: anime.data.title,
            linkURL: anime.data.linkURL,
            thumbnailURL: fetchedEpisode.fetchedEpisode.thumbnail_url,
            numberOfEpisodes: episodes,
          },
        } as Top10AnimeMetadataType;
      })
    );

    const popular: AnimeMetadata[] = await Promise.all(
      data.popular.map(async (anime) => {
        const episodesRes = await fetch(
          `https://animeapi.skin/episodes?title=${encodeURIComponent(
            anime.title
          )}`
        );
        const episodesData = await episodesRes.json();
        const episodes = Array.isArray(episodesData) ? episodesData.length : 0;

        const fetchedEpisode: fetchedEpisodeType = {
          fetchedEpisode: episodesData[0],
        };

        return {
          title: anime.title,
          linkURL: anime.linkURL,
          thumbnailURL: fetchedEpisode.fetchedEpisode.thumbnail_url,
          numberOfEpisodes: episodes,
        } as AnimeMetadata;
      })
    );

    const trending: AnimeMetadata[] = await Promise.all(
      data.trending.map(async (anime) => {
        const episodesRes = await fetch(
          `https://animeapi.skin/episodes?title=${encodeURIComponent(
            anime.title
          )}`
        );
        const episodesData = await episodesRes.json();
        const episodes = Array.isArray(episodesData) ? episodesData.length : 0;

        const fetchedEpisode: fetchedEpisodeType = {
          fetchedEpisode: episodesData[0],
        };

        return {
          title: anime.title,
          linkURL: anime.linkURL,
          thumbnailURL: fetchedEpisode.fetchedEpisode.thumbnail_url,
          numberOfEpisodes: episodes,
        } as AnimeMetadata;
      })
    );

    return NextResponse.json(
      { top10, popular, trending } as HomePageAnimeDatatype,
      { status: 200 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
