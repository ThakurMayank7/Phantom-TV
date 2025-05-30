"use client";

export function constructVideoUrl(title: string, episodes: number): string {
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN;

  if (!baseUrl) {
    throw new Error("Base URL is not defined in NEXT_PUBLIC_DOMAIN");
  }

  const url = `${baseUrl}/${title}-episode-${episodes}`;

  return url;
}
