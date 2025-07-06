"use client";
import { useRef, useState, useEffect, ReactNode } from "react";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DUMMY_BLOG_POSTS } from "@/constants/blogs";

type BlogsSliderProps = {
  children: ReactNode;
};

const BlogsSlider: React.FC<BlogsSliderProps> = ({ children }) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Handle scroll to update arrow visibility
  const handleScroll = () => {
    const el = sliderRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;

    // Use Math.ceil/floor to avoid pixel rounding issues
    setShowLeftArrow(scrollLeft > 1);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
  };

  // Handle navigation
  const handleScrollBy = (direction: "next" | "prev") => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.scrollWidth / DUMMY_BLOG_POSTS.length;
      const visibleCards = Math.floor(
        sliderRef.current.clientWidth / cardWidth,
      );
      const scrollAmount = cardWidth * visibleCards;

      sliderRef.current.scrollBy({
        left: direction === "next" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Swipe handlers with RTL support
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleScrollBy("next"),
    onSwipedRight: () => handleScrollBy("prev"),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  // Button animation variants
  const buttonVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    hover: {
      scale: 1.1,
      backgroundColor: "rgba(255,255,255,0.9)",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    },
  };

  // Initialize scroll position and arrows
  useEffect(() => {
    handleScroll();
    const currentRef = sliderRef.current;
    currentRef?.addEventListener("scroll", handleScroll);

    return () => {
      currentRef?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative w-full" dir="ltr">
      <div className="overflow-hidden">
        {/* Slider container */}
        <div {...swipeHandlers} className="relative w-full">
          <div
            ref={sliderRef}
            className="hide-scrollbar flex w-full gap-6 overflow-x-auto scroll-smooth py-2"
            style={{ scrollbarWidth: "none" }}
          >
            {children}
          </div>
        </div>

        {/* Navigation arrows */}
        <AnimatePresence>
          {showLeftArrow && (
            <motion.button
              onClick={() => handleScrollBy("prev")}
              className={`absolute left-4 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all hover:bg-white`}
              aria-label={"Next"}
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft
                size={16}
                className="text-gray-700"
                strokeWidth={2.5}
              />
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showRightArrow && (
            <motion.button
              onClick={() => handleScrollBy("next")}
              className={`absolute right-4 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all hover:bg-white`}
              aria-label={"Previous"}
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight
                size={16}
                className="text-gray-700"
                strokeWidth={2.5}
              />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Hide scrollbar styles */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default BlogsSlider;
