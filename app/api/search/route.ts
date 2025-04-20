import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  try {
    // Step 1: Search for the anime
    const searchRes = await fetch(
      `https://animeapi.skin/search?q=${encodeURIComponent(title)}`
    );
    const searchData = await searchRes.json();

    // Step 2: Try to get episode list for the first result (if any)
    if (Array.isArray(searchData) && searchData.length > 0) {
      const animeTitle = searchData[0].title; // Use the returned title for accuracy

      const episodesRes = await fetch(
        `https://animeapi.skin/episodes?title=${encodeURIComponent(animeTitle)}`
      );
      const episodesData = await episodesRes.json();

      console.log(episodesData)

      if (Array.isArray(episodesData)) {
        console.log(`Total episodes for "${animeTitle}":`, episodesData.length);
      }
    }

    console.log("search data:",searchData)

    return NextResponse.json(searchData);
  } catch (err) {
    console.error("Fetch error:", err);
    return NextResponse.json(
      { error: "Failed to fetch from AnimeAPI" },
      { status: 500 }
    );
  }
}
