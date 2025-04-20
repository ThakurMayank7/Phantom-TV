"use client";

import { db } from "@/firebase/config";
import { firebaseHomePageData, HomePageAnimeDatatype } from "@/utils/types";
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

    const responseData: HomePageAnimeDatatype = await res.json();

    console.log(responseData);

    return responseData;
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return null;
  }
}
