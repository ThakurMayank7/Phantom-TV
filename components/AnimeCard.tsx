"use client";

import { useNavigateWithDetails } from "@/hooks/useNavigateWithDetails";
import { AnimeMetadata, VideoMetadataType } from "@/utils/types";
import React from "react";
import { FaRegCirclePlay } from "react-icons/fa6";

function AnimeCard({
  anime,
  handleSearchNavigation,
}: {
  anime: AnimeMetadata;
  handleSearchNavigation?: VoidFunction;
}) {
  const navigateWithDetails = useNavigateWithDetails();

  return (
    <div
      className="h-80 bg-cover bg-center bg-no-repeat rounded-lg overflow-hidden shadow-lg relative group"
      style={{
        backgroundImage: `url(${anime.thumbnailURL})`,
      }}
      onClick={() => {
        if (handleSearchNavigation) {
          handleSearchNavigation();
          return;
        }
        navigateWithDetails({
          title: anime.title,
          linkURL: anime.linkURL,
          episode: anime.numberOfEpisodes,
          thumbnailURL: anime.thumbnailURL,
        } as VideoMetadataType);
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80"></div>

      <div className="absolute inset-0 bg-background/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center hover:cursor-pointer hover:border-2 hover:border-border-focus rounded-lg">
        <FaRegCirclePlay size={48} className="text-text-accent" />
      </div>

      <div className="absolute bottom-0 left-0 p-4 w-full">
        <h3 className="text-text-primary text-lg font-bold truncate">
          {anime.title}
        </h3>
      </div>
    </div>
  );
}

export default AnimeCard;
