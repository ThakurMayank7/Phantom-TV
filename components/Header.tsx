"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import {
  FaDiscord,
  FaRedditAlien,
  FaTelegramPlane,
  FaTwitter,
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

function Header() {
  const router = useRouter();
  const handleSiderbar = () => {};

  return (
    <header className="sticky top-0 left-0 right-0 z-50 backdrop-blur-sm">
      <div className="absolute inset-0 opacity-60"></div>

      <div className="relative container mx-auto px-4 flex items-center justify-between">
        <button onClick={handleSiderbar}>
          <GiHamburgerMenu />
        </button>
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

        <h1
          className="text-center text-5xl py-2 font-black hover:cursor-pointer"
          onClick={() => {
            router.push("/");
          }}
        >
          Phantom TV
        </h1>
      </div>
    </header>
  );
}

export default Header;
