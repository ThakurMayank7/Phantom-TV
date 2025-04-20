"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { BannerDataType } from "@/utils/types";

const BannerCarousel = ({ banners }: { banners: BannerDataType[] }) => {
  // Memoizing the updateCounter function using useCallback
  const slides = banners.map((banner, index) => (
    <div
      key={index}
      className="w-full h-[80vh] bg-cover bg-center bg-no-repeat rounded-lg overflow-hidden shadow-lg relative"
      style={{
        backgroundImage: `url(${banner.bannerURL})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-6 w-full">
        <h3 className="text-text-primary text-2xl font-bold">{banner.title}</h3>
        <p className="text-text-secondary mt-2">{banner.description}</p>
      </div>
    </div>
  ));
  const updateCounter = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  }, [slides.length]);

  useEffect(() => {
    // Set interval to update counter every 6 seconds
    const intervalId = setInterval(updateCounter, 6000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [updateCounter]); // `updateCounter` is included as a dependency

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full h-auto overflow-hidden">
      {/* Slides Container */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-full h-full flex-shrink-0 flex items-center justify-center"
            style={{
              minWidth: "100%", // Ensures each child div is the full width of the parent
            }}
          >
            {slide}
          </div>
        ))}
      </div>

      {/* Previous Button */}

      {slides.length > 1 && (
        <>
          <Button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-pallette6 hover:bg-pallette3 p-3 rounded shadow-lg"
          >
            <ChevronLeft /> {/* Left arrow */}
          </Button>

          <Button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-pallette6 hover:bg-pallette3 p-3 rounded shadow-lg"
          >
            <ChevronRight /> {/* Right arrow */}
          </Button>
        </>
      )}

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.length > 1 &&
          slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                currentIndex === index ? "bg-primary-dark" : "bg-primary-bg"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
