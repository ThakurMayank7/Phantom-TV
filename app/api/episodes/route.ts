import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  try {
    console.log("search title:", title);

    let episodes: number = 0;

    const episodesRes = await fetch(
      `https://animeapi.skin/episodes?title=${encodeURIComponent(title)}`
    );
    const episodesData = await episodesRes.json();

    if (Array.isArray(episodesData)) {
      console.log(`Total episodes for "${title}":`, episodesData.length);
      episodes = episodesData.length;
    }

    return NextResponse.json(episodes, { status: 200 });
  } catch (err) {
    console.error("Fetch error:", err);
    return NextResponse.json(0, { status: 500 });
  }
}
