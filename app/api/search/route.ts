import { AnimeFetchType } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  try {
    console.log("search title:", title);

    const searchRes = await fetch(
      `https://animeapi.skin/search?q=${encodeURIComponent(title)}`
    );
    const searchData = await searchRes.json();

    const data: AnimeFetchType[] = searchData as AnimeFetchType[];
    if (!data || data.length === 0) {
      return NextResponse.json([] as AnimeFetchType[], { status: 200 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("Fetch error:", err);
    return NextResponse.json([] as AnimeFetchType[], { status: 500 });
  }
}
