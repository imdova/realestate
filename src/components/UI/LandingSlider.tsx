"use client";
import { useState, useEffect } from "react";
import CircularTextButton from "./Buttons/CircularTextButton";
import DynamicButton from "./Buttons/DynamicButton";
import { Slide } from "@/types";

type SliderLandingProps = {
  slides: Slide[];
};

const LandingSlider = ({ slides }: SliderLandingProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [pageLoading, setPageLoading] = useState(true); // Show loader on page reload

  // Show loader only on page reload
  useEffect(() => {
    setTimeout(() => setPageLoading(false), 600); // Simulate loading time
  }, []);

  // Auto-slide every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide((currentIndex + 1) % slides.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [currentIndex, slides.length]);

  // Function to change slides
  const changeSlide = (index: number) => {
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setAnimating(false);
    }, 500);
  };

  return (
    <section className="relative">
      {/* Loader (only on page reload) */}
      {pageLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="border-main h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"></div>
        </div>
      )}

      <div
        className={`rounded-4xl relative flex h-[600px] items-center justify-center overflow-hidden transition-opacity duration-500 md:h-[640px] ${
          pageLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Background Image */}
        <div
          className={`absolute inset-0 h-full w-full bg-cover bg-[78%] transition-opacity duration-500 sm:bg-center ${
            animating ? "opacity-0" : "opacity-100"
          }`}
          style={{
            backgroundImage: `url(${
              typeof slides[currentIndex].image === "string"
                ? slides[currentIndex].image
                : slides[currentIndex].image.src
            })`,
          }}
        ></div>

        {/* Text Content */}
        <div className="relative flex h-full w-full text-white transition-transform duration-500 ease-in-out">
          <div
            className={`flex w-full max-w-[600px] flex-col items-center justify-center p-4 transition-all duration-500 md:items-start md:p-6 ${
              animating
                ? "translate-y-10 opacity-0"
                : "translate-y-0 opacity-100"
            }`}
          >
            <div className="flex items-center">
              <CircularTextButton />
              <span className="text-xs italic sm:text-lg">
                {slides[currentIndex].subTitle}
              </span>
            </div>
            <h2 className="mb-12 w-full text-center text-4xl font-semibold capitalize leading-tight md:text-start md:text-6xl">
              {slides[currentIndex].title}
            </h2>
            <DynamicButton
              href={slides[currentIndex].url}
              label="Shop Now"
              className="w-[200px] lg:w-[300px]"
              variant="white"
            />
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="absolute bottom-4 z-10 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => changeSlide(index)}
              className={`relative h-2 cursor-pointer rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "w-[10px] bg-white"
                  : "w-2 bg-[#ffffff6a]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingSlider;
