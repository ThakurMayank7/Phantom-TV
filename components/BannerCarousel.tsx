"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { BannerDataType, VideoMetadataType } from "@/utils/types";
import { useNavigateWithDetails } from "@/hooks/useNavigateWithDetails";

const BannerCarousel = ({ banners }: { banners: BannerDataType[] }) => {
  const navigateWithDetails = useNavigateWithDetails();

  // Memoizing the updateCounter function using useCallback
  const slides = banners.map((banner, index) => (
    <div
      key={index}
      className="w-full h-[80vh] bg-cover bg-center bg-no-repeat overflow-hidden shadow-lg relative"
      style={{
        backgroundImage: `url(${banner.bannerURL})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent"></div>
      <div
        className="absolute bottom-0 left-0 p-6 w-1/3 ml-16 flex flex-col 
      justify-center"
      >
        <h2 className="text-lg text-text-accent">#{index + 1} Spotlight</h2>
        <br />
        <h3 className="text-white text-3xl font-bold">{banner.title}</h3>
        <br />
        <p className="text-gray-100 mt-2 line-clamp-4 overflow-hidden">
          {banner.description}
        </p>
        <br />
        <button
          className="text-button-text hover:text-button-secondary-hover focus:text-button-secondary-pressed bg-button-primary hover:bg-button-primary-hover focus:bg-button-primary-pressed hover:cursor-pointer p-2 text-lg font-semibold rounded border-2 border-button-secondary hover:border-border-light"
          onClick={() =>
            navigateWithDetails({
              title: banner.title,
              linkURL: banner.linkURL,
              episode: 100,
              thumbnailURL: banner.bannerURL,
            } as VideoMetadataType)
          }
        >
          Watch Now
        </button>
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
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-button-primary hover:bg-button-primary-hover text-text-inverted p-3 rounded shadow-lg hover:cursor-pointer"
          >
            <ChevronLeft /> {/* Left arrow */}
          </Button>

          <Button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-button-primary hover:bg-button-primary-hover text-text-inverted p-3 rounded shadow-lg hover:cursor-pointer"
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
