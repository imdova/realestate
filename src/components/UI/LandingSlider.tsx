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
      <div className="relative flex h-[600px] items-center justify-center overflow-hidden rounded-4xl bg-gradient-to-tr from-[#c1cae9] to-[#f9d6d9] lg:h-[700px]">
        {/* Molecular Pattern Background */}
        <div className="absolute inset-0 h-full w-full opacity-15">
          <div className="absolute top-20 left-10 h-8 w-8 rounded-full bg-white"></div>
          <div className="absolute top-40 right-20 h-12 w-12 rounded-full bg-white"></div>
          <div className="absolute bottom-20 left-1/4 h-6 w-6 rounded-full bg-white"></div>
          <div className="absolute right-1/3 bottom-1/3 h-10 w-10 rounded-full bg-white"></div>
          <div className="absolute bottom-1/3 left-1/6 h-10 w-10 rounded-full bg-white"></div>
          <div className="absolute bottom-1/3 left-1/2 h-10 w-10 rounded-full bg-white"></div>
        </div>

        {/* Text Content - SlideInUp Animation */}
        <div className="relative flex h-full w-full justify-center text-white transition-transform duration-500 ease-in-out">
          <div
            className={`flex flex-col items-center justify-center p-4 transition-all duration-500 md:p-6 lg:items-start ${
              !loaded || animating
                ? "translate-y-10 opacity-0"
                : "translate-y-0 opacity-100"
            }`}
          >
            <div className="flex items-center">
              <CircularTextButton />
              <span className="text-sm italic sm:text-lg">
                {slides[currentIndex].subTitle}
              </span>
            </div>
            <h2 className="mb-12 w-full text-center text-4xl leading-tight font-semibold capitalize lg:text-start lg:text-6xl">
              {slides[currentIndex].title}
            </h2>
            <DynamicButton
              href={slides[currentIndex].url}
              label="Shop Now"
              width="300px"
              variant="white"
            />
          </div>
        </div>

        {/* Image - SlideInUp Animation */}
        <div className="relative hidden h-full w-full items-end justify-center lg:flex">
          <Image
            className={`h-full w-full object-cover transition-all duration-500 ${
              !loaded || animating
                ? "translate-y-10 opacity-0"
                : "translate-y-0 opacity-100"
            }`}
            src={slides[currentIndex].image}
            alt={slides[currentIndex].title}
            width={700}
            height={700}
          />
        </div>

        {/* Dots Navigation */}
        <div className="absolute bottom-4 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => changeSlide(index)}
              className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "w-[10px] bg-[#283593]"
                  : "w-2 bg-[#28349397]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingSlider;
