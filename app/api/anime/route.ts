// app/api/anime/route.ts
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const title = searchParams.get("title");

//   if (!title) {
//     return NextResponse.json({ error: "Title is required" }, { status: 400 });
//   }

//   try {
//     const res = await fetch(
//       `https://animeapi.skin/search?q=${encodeURIComponent(title)}`
//     );
//     const data = await res.json();
//     return NextResponse.json(data);
//   } catch (err) {
//     return NextResponse.json(
//       { error: "Failed to fetch from AnimeAPI" },
//       { status: 500 }
//     );
//   }
// }
