export interface AnimeFetchType {
  title: string;
  title2?: string;
  link_url: string;
  embed_url: string;
  thumbnail_url: string;
}

export interface fetchedEpisodeType {
  fetchedEpisode: {
    title: string;
    episode: null | number;
    link_url: string;
    embed_url: string;
    thumbnail_url: string;
  };
}

export interface AnimeMetadata {
  title: string;
  linkURL: string;
  thumbnailURL: string;
  numberOfEpisodes: number;
}

export interface Top10AnimeMetadataType {
  animeMetadata: AnimeMetadata;
  rank: number;
}

export interface HomePageAnimeDatatype {
  top10: Top10AnimeMetadataType[];
  favourite: AnimeMetadata[];
  popular: AnimeMetadata[];
  bannerData: BannerDataType[];
}

export interface ResponseType {
  top10: Top10AnimeMetadataType[];
  favourite: AnimeMetadata[];
  popular: AnimeMetadata[];
}

export interface VideoPlayerType {
  title: string;
  episode: number;
}

export interface firebaseAnimeData {
  title: string;
  linkURL: string;
}

export interface firebaseHomePageData {
  popular: firebaseAnimeData[];
  top10: { data: firebaseAnimeData; rank: number }[];
  favourite: firebaseAnimeData[];
  bannerData: BannerDataType[];
}

export interface BannerDataType {
  rank: number;
  title: string;
  description: string;
  linkURL: string;
  bannerURL: string;
}

export interface VideoMetadataType {
  title: string;
  linkURL: string;
  episode:number;
  thumbnailURL:string;
}
