"use client";

import Link from "next/link";
import React from "react";
import {
  FaDiscord,
  FaRedditAlien,
  FaTelegramPlane,
  FaTwitter,
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function Header() {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 backdrop-blur-sm">
      <div className="absolute inset-0 opacity-60"></div>

      <div className="relative container mx-auto px-4 flex items-center justify-between">
        <Sheet>
          <SheetTrigger>
            <GiHamburgerMenu />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <Link href={``}>
          <FaDiscord />
        </Link>
        <Link href={``}>
          <FaTelegramPlane />
        </Link>
        <Link href={``}>
          <FaRedditAlien />
        </Link>
        <Link href={``}>
          <FaTwitter />
        </Link>

        <Link
          className="text-center text-5xl py-2 font-black hover:cursor-pointer"
          href="/"
        >
          Phantom TV
        </Link>
      </div>
    </header>
  );
}

export default Header;
