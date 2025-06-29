import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

interface RealEstateCompany {
  id: number;
  name: string;
  image: string;
  tagline: string;
  sales?: number;
  achievements?: number;
}

const RealEstateSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const companies: RealEstateCompany[] = [
    {
      id: 1,
      name: "WESTFIELD PROPERTIES",
      image: "https://images.bayut.eg/thumbnails/19889158-240x180.webp",
      tagline: "LEVEL RESULT DEVELOPMENT AND CONNECTION",
      sales: 42,
      achievements: 18,
    },
    {
      id: 2,
      name: "PROPERTY INSIDERS",
      image: "https://images.bayut.eg/thumbnails/19889158-240x180.webp",
      tagline: "Integrated Data Culture Solutions",
      sales: 35,
      achievements: 22,
    },
    {
      id: 3,
      name: "Urban Edge",
      image: "https://images.bayut.eg/thumbnails/19889158-240x180.webp",
      tagline: "DEVELOPMENTS",
      sales: 28,
      achievements: 15,
    },
    {
      id: 4,
      name: "Property Insider",
      image: "https://images.bayut.eg/thumbnails/19889158-240x180.webp",
      tagline: "عنار للإنجاز 19 عنار البيع 23",
      sales: 19,
      achievements: 23,
    },
    {
      id: 5,
      name: "Another Company",
      image: "https://images.bayut.eg/thumbnails/19889158-240x180.webp",
      tagline: "Premium Real Estate Solutions",
      sales: 31,
      achievements: 12,
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === companies.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? companies.length - 1 : prevIndex - 1,
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      nextSlide();
    }

    if (touchStart - touchEnd < -50) {
      prevSlide();
    }
  };

  // Calculate visible cards for desktop
  const getVisibleCards = () => {
    const cards = [];
    const len = companies.length;

    // Previous card
    cards.push(companies[(currentIndex - 1 + len) % len]);
    // Current card
    cards.push(companies[currentIndex]);
    // Next card
    cards.push(companies[(currentIndex + 1) % len]);

    return cards;
  };

  // Scroll to the current index
  useEffect(() => {
    if (sliderRef.current) {
      const container = sliderRef.current;
      const card = container.children[currentIndex] as HTMLElement;
      container.scrollTo({
        left: card.offsetLeft - container.offsetLeft,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  // Handle scroll events to update currentIndex
  const handleScroll = () => {
    if (sliderRef.current) {
      const container = sliderRef.current;
      const scrollPosition = container.scrollLeft + container.offsetWidth / 2;

      Array.from(container.children).forEach((child, index) => {
        const element = child as HTMLElement;
        if (
          element.offsetLeft <= scrollPosition &&
          element.offsetLeft + element.offsetWidth > scrollPosition
        ) {
          setCurrentIndex(index);
        }
      });
    }
  };

  const visibleCards = getVisibleCards();
  const currentCompany = companies[currentIndex];

  return (
    <div className="relative mx-auto w-full max-w-4xl px-4">
      <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
        الشركات العقارية المميزة
      </h2>

      <div className="w-full">
        {/* Mobile view (scroll behavior) */}
        <div className="md:hidden">
          <div
            ref={sliderRef}
            className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onScroll={handleScroll}
          >
            {companies.map((company) => (
              <div
                key={company.id}
                className="w-full flex-shrink-0 snap-center px-2"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="flex flex-col items-center bg-white p-6">
                  <div className="h-30 relative w-full overflow-hidden">
                    <Image
                      src={company.image}
                      width={400}
                      height={300}
                      alt={company.name}
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop view (3 cards with scroll-like behavior) */}
        <div className="relative hidden md:flex md:items-center md:justify-center md:gap-6">
          {visibleCards.map((company, index) => {
            const isCenter = index === 1;
            return (
              <div
                key={company.id}
                onClick={() =>
                  goToSlide(companies.findIndex((c) => c.id === company.id))
                }
                className={`flex cursor-pointer flex-col items-center bg-white p-4 transition-all ${isCenter ? "w-1/3 scale-105" : "w-1/4 opacity-90"}`}
              >
                <div className="relative h-48 w-full overflow-hidden rounded-lg">
                  <Image
                    src={company.image}
                    width={400}
                    height={300}
                    alt={company.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current company details below slider */}
      <div className="mt-4 p-2">
        <div className="text-center">
          <h3 className="text-sm font-bold text-gray-900 sm:text-2xl">
            {currentCompany.name}
          </h3>
          <p className="text-xs text-gray-600 sm:text-lg">
            {currentCompany.tagline}
          </p>

          {(currentCompany.sales || currentCompany.achievements) && (
            <div className="mt-2 flex flex-wrap justify-center gap-4">
              {currentCompany.sales && (
                <span className="rounded-full px-4 py-2">
                  {currentCompany.sales} عقار للبيع
                </span>
              )}
              {currentCompany.achievements && (
                <span className="rounded-full px-4 py-2">
                  {currentCompany.achievements} عقار للايجار
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 hidden -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md hover:bg-gray-100 focus:outline-none md:block"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 hidden -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md hover:bg-gray-100 focus:outline-none md:block"
        aria-label="Next slide"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default RealEstateSlider;
