"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

import CircularTextButton from "./Buttons/CircularTextButton";
import DynamicButton from "./Buttons/DynamicButton";
import { Slide } from "@/types";

type sliderLandingProps = {
  slides: Slide[];
};
const LandingSlider = ({ slides }: sliderLandingProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Ensure animation runs on page load
  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide((currentIndex + 1) % slides.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [currentIndex, slides.length]);

  // Function to change slides with slideInUp animation
  const changeSlide = (index: number) => {
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setAnimating(false);
    }, 500);
  };

  return (
    <section>
      <div className="relative flex h-[600px] items-center justify-center overflow-hidden rounded-4xl md:h-[640px]">
        {/* Image - SlideInUp Animation */}
        <div className="absolute top-0 left-0 h-full w-full">
          <Image
            className={`h-full w-full object-cover object-center transition-opacity duration-500 ${
              !loaded || animating ? "opacity-0" : "opacity-100"
            }`}
            src={slides[currentIndex].image}
            alt={slides[currentIndex].title}
            width={700}
            height={700}
            priority
          />
        </div>
        {/* Text Content - SlideInUp Animation */}
        <div className="relative flex h-full w-full text-white transition-transform duration-500 ease-in-out">
          <div
            className={`flex w-full max-w-[600px] flex-col items-center justify-center p-4 transition-all duration-500 md:items-start md:p-6 ${
              !loaded || animating
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
            <h2 className="mb-12 w-full text-center text-4xl leading-tight font-semibold capitalize md:text-start md:text-6xl">
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
