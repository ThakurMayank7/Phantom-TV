"use client";

import { db } from "@/firebase/config";
import {
  firebaseHomePageData,
  HomePageAnimeDatatype,
  ResponseType,
} from "@/utils/types";
import { doc, getDoc } from "firebase/firestore";

export async function fetchHomePageData(): Promise<HomePageAnimeDatatype | null> {
  try {
    const docRef = doc(db, "data", "HomePageData");
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }
    const data: firebaseHomePageData = docSnap.data() as firebaseHomePageData;
    console.log("Home page data:", data);

    const res = await fetch("/api/fetchhomepagedata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      console.error("Failed to fetch data:", res.statusText);
      return null;
    }

    const responseData: ResponseType = await res.json();

    console.log({
      bannerData: data.bannerData,
      top10: responseData.top10,
      popular: responseData.popular,
      trending: responseData.trending,
    } as HomePageAnimeDatatype);

    const result = {
      bannerData: data.bannerData,
      top10: responseData.top10,
      popular: responseData.popular,
      trending: responseData.trending,
    } as HomePageAnimeDatatype;

    return result;
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return null;
  }
}
