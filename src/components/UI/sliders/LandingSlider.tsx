"use client";
import { useState, useEffect, useCallback } from "react";
import CircularTextButton from "../Buttons/CircularTextButton";
import DynamicButton from "../Buttons/DynamicButton";
import { Slide } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";

type SliderLandingProps = {
  slides: Slide[];
};

const LandingSlider = ({ slides }: SliderLandingProps) => {
  const [[currentIndex, direction], setCurrentIndex] = useState([0, 0]);
  const [autoPlay, setAutoPlay] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);

  // Show loader only on page reload
  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // Auto-slide every 5 seconds with progress indicator
  useEffect(() => {
    if (!autoPlay) return;

    let startTime: number;
    let animationFrameId: number;
    const duration = 5000; // 5 seconds

    const animateProgress = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      if (elapsed < duration) {
        animationFrameId = requestAnimationFrame(animateProgress);
      }
    };

    animationFrameId = requestAnimationFrame(animateProgress);

    const interval = setTimeout(() => {
      nextSlide();
    }, duration);

    return () => {
      clearTimeout(interval);
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentIndex, autoPlay]);

  const nextSlide = useCallback(() => {
    setCurrentIndex([(currentIndex + 1) % slides.length, 1]);
  }, [currentIndex, slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex([(currentIndex - 1 + slides.length) % slides.length, -1]);
  }, [currentIndex, slides.length]);

  const goToSlide = (index: number) => {
    const direction = index > currentIndex ? 1 : -1;
    setCurrentIndex([index, direction]);
  };

  // Swipe handlers for mobile
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      nextSlide();
    },
    onSwipedRight: () => {
      prevSlide();
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    }),
  };

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, delay: 0.3, ease: "easeOut" },
    },
  };

  return (
    <section className="relative" {...handlers}>
      {/* Loader (only on page reload) */}
      {pageLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="h-12 w-12 rounded-full border-4 border-main border-t-transparent"
          />
        </div>
      )}

      <div
        className={`relative h-[600px] overflow-hidden rounded-3xl md:h-[640px] ${
          pageLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 h-full w-full"
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
          >
            {/* Background Image with overlay */}
            <div
              className="absolute inset-0 h-full w-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${
                  typeof slides[currentIndex].image === "string"
                    ? slides[currentIndex].image
                    : slides[currentIndex].image.src
                })`,
              }}
            >
              <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Text Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="relative flex h-full w-full items-center justify-center text-white"
            >
              <div className="container mx-auto px-4">
                <div className="flex max-w-[600px] flex-col items-center md:items-start">
                  <motion.div
                    variants={textVariants}
                    className="mb-2 flex items-center gap-2"
                  >
                    <CircularTextButton />
                    <span className="text-sm italic sm:text-lg">
                      {slides[currentIndex].subTitle}
                    </span>
                  </motion.div>

                  <motion.h2
                    variants={textVariants}
                    className="mb-6 text-center text-4xl font-bold leading-tight md:text-start md:text-6xl lg:text-7xl"
                  >
                    {slides[currentIndex].title}
                  </motion.h2>

                  <motion.div variants={textVariants}>
                    <DynamicButton
                      href={slides[currentIndex].url}
                      label="Shop Now"
                      className="w-[200px] lg:w-[300px]"
                      variant="white"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Dots Navigation */}
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:left-16">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`group relative h-3 w-3 cursor-pointer rounded-full border p-2 ${currentIndex === index ? "border-gray-100" : "border-transparent"}`}
              aria-label={`Go to slide ${index + 1}`}
            >
              <div
                className={`absolute inset-0 left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all ${
                  currentIndex === index
                    ? "scale-100 bg-white"
                    : "scale-75 bg-white/50 group-hover:scale-90 group-hover:bg-white/70"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingSlider;
