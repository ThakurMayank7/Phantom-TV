"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsTwitterX } from "react-icons/bs";
import { FaDiscord, FaRedditAlien, FaTelegramPlane } from "react-icons/fa";
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
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300
        ${
          scrolled
            ? "opacity-100 bg-gradient-to-b from-background/90 via-background/50 to-transparent dark:from-black/90 dark:via-black/40 dark:to-transparent backdrop-blur-md"
            : "opacity-0"
        }`}
      ></div>

      <div className="relative container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4 mr-auto">
          <Sheet>
            <SheetTrigger>
              <GiHamburgerMenu size={40} />
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          <Link
            className="text-center text-5xl py-2 font-black hover:cursor-pointer"
            href="/"
          >
            Phantom TV
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="https://discord.gg/XtyJPHCJ">
            <FaDiscord size={24} />
          </Link>
          <Link href="https://t.me/+aHbzEVqR0FI1MjE1">
            <FaTelegramPlane size={24} />
          </Link>
          <Link href="https://www.reddit.com/r/suhagrathinvaders/s/XnVXxHc7Gg">
            <FaRedditAlien size={24} />
          </Link>
          <Link href="https://x.com/invaders15537">
            <BsTwitterX size={24} />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
