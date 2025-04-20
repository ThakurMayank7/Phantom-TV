"use client";

import { NavigationDetailsType } from "@/utils/types";
import { useRouter } from "next/navigation";


export function NavigateWithDetails(navigationDetails:NavigationDetailsType) {
    const router=useRouter();

router.push("/watch/");
}

export function navigateBySearch() {}
