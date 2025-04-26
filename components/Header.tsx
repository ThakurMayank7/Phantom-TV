"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

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
          <Link
            className="text-center text-5xl py-2 font-black hover:cursor-pointer"
            href="/"
          >
            Phantom TV
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
