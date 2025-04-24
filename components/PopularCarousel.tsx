"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { AnimeMetadata } from "@/utils/types";
import AnimeCard from "./AnimeCard";

const PopularCarousel = ({ animes }: { animes: AnimeMetadata[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const slidesToShow = 4;

  // Calculate maximum index based on the number of animes and slides to show
  const maxIndex = Math.max(0, animes.length - slidesToShow);

  const goToPrevious = () => {
    if (isAnimating || currentIndex === 0) return;
    setIsAnimating(true);
    setCurrentIndex(currentIndex - 1);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToNext = () => {
    if (isAnimating || currentIndex >= maxIndex) return;
    setIsAnimating(true);
    setCurrentIndex(currentIndex + 1);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Check if we have enough items to create a carousel
  if (animes.length <= slidesToShow) {
    // If not enough items, just display all of them without scrolling
    return (
      <div className="flex gap-4 w-full justify-center">
        {animes.map((anime, index) => (
          <AnimeCard key={index} anime={anime} />
        ))}
      </div>
    );
  }

  return (
    <div className="relative w-full py-4 flex items-center">
      {/* Left Button - Outside the slide area */}
      <Button
        onClick={goToPrevious}
        disabled={isAnimating || currentIndex === 0}
        className={`flex-shrink-0 mr-4 p-3 rounded shadow-lg z-10 text-text-inverted ${
          currentIndex === 0
            ? "bg-button-disabled cursor-not-allowed opacity-50"
            : "bg-button-primary hover:bg-button-primary-hover hover:cursor-pointer"
        }`}
      >
        <ChevronLeft />
      </Button>

      {/* Slides Container */}
      <div className="flex-grow overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / 4)}%)`,
            gap: "1rem", // Using style for gap instead of className to ensure consistent spacing
          }}
        >
          {animes.map((anime, index) => (
            <div
              key={index}
              style={{
                width: `calc(${100 / 4}% - ${3 / 4}rem)`, // adjusted gap calculation
                flexShrink: 0,
                padding: "0 0.25rem",
              }}
            >
              <AnimeCard anime={anime} />
            </div>
          ))}
        </div>
      </div>

      {/* Right Button - Outside the slide area */}
      <Button
        onClick={goToNext}
        disabled={isAnimating || currentIndex >= maxIndex}
        className={`flex-shrink-0 ml-4 p-3 rounded shadow-lg z-10 text-text-inverted ${
          currentIndex >= maxIndex
            ? "bg-button-disabled cursor-not-allowed opacity-50"
            : "bg-button-primary hover:bg-button-primary-hover hover:cursor-pointer"
        }`}
      >
        <ChevronRight />
      </Button>

      {/* Dots Indicator */}
      {animes.length > slidesToShow && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setCurrentIndex(index);
                  setTimeout(() => setIsAnimating(false), 500);
                }
              }}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                currentIndex === index ? "bg-primary-dark" : "bg-primary-bg"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularCarousel;
