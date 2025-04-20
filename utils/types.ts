export interface Banner {
  title: string;
  description: string;
  thumbnailURL: string;
}

export interface BannersType {
  banners: Banner[];
}

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

export interface top10AnimeMetadataType {
  animeMetadata: AnimeMetadata;
  rank: number;
}

export interface HomePageAnimeDatatype {
  top10: top10AnimeMetadataType[];
  trending: AnimeMetadata[];
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
  trending: firebaseAnimeData[];
}
