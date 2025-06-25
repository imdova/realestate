import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { X } from "lucide-react";

type ImageViewerProps = {
  images: string[];
  initialIndex?: number;
  onClose?: () => void;
};

export default function ImageViewer({
  images,
  initialIndex = 0,
  onClose,
}: ImageViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const imageRef = useRef<HTMLDivElement>(null);

  const resetZoom = useCallback(() => {
    setIsZoomed(false);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    resetZoom();
  }, [images.length, resetZoom]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    resetZoom();
  }, [images.length, resetZoom]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose?.();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === " ") {
        setIsZoomed((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, onClose]);

  // Disable body scroll when this mounts, re‑enable on unmount
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleZoom = useCallback(() => {
    setIsZoomed((prev) => {
      if (!prev) {
        setScale(2); // Default zoom level
        return true;
      }
      resetZoom();
      return false;
    });
  }, [resetZoom]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isZoomed || !imageRef.current) return;

      const rect = imageRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate position for panning
      const newX = -(x - rect.width / 2) * (scale - 1);
      const newY = -(y - rect.height / 2) * (scale - 1);

      setPosition({ x: newX, y: newY });
    },
    [isZoomed, scale],
  );

  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      if (!isZoomed) return;

      e.preventDefault();
      const delta = -e.deltaY;
      const zoomIntensity = 0.1;

      setScale((prev) => {
        const newScale = prev + delta * zoomIntensity * 0.01;
        return Math.min(Math.max(1, newScale), 5); // Limit scale between 1 and 5
      });
    },
    [isZoomed],
  );

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black p-4">
      <div className="flex w-full justify-end">
        {/* Close button */}
        <button
          onClick={onClose}
          className="z-10 mb-4 cursor-pointer text-2xl text-white hover:text-gray-300"
          aria-label="Close image viewer"
        >
          <X size={18} />
        </button>
      </div>

      {/* Main image container */}
      <div
        ref={imageRef}
        className="relative flex h-full max-h-[470px] w-full flex-grow cursor-zoom-in items-center justify-center overflow-hidden lg:max-h-full"
        onClick={handleZoom}
        onMouseMove={handleMouseMove}
        onWheel={handleWheel}
      >
        <div
          className="transition-transform duration-300 ease-in-out"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          }}
        >
          <Image
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            width={1200}
            height={800}
            className="max-h-[80vh] max-w-full object-contain"
            style={{
              cursor: isZoomed ? "grab" : "zoom-in",
            }}
            priority
          />
        </div>
      </div>

      {/* Navigation controls */}
      <div className="mt-4 flex w-full max-w-4xl items-center justify-center gap-4 lg:justify-between">
        <button
          onClick={handlePrev}
          className="cursor-pointer rounded-full bg-white bg-opacity-30 p-2 text-black transition-all hover:bg-opacity-100"
          aria-label="Previous image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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

        {/* Thumbnail navigation */}
        <div className="hidden space-x-2 overflow-x-auto px-4 py-2 lg:flex">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                resetZoom();
              }}
              className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-sm transition-all ${
                index === currentIndex
                  ? "opacity-100"
                  : "border-transparent opacity-60 hover:opacity-80"
              }`}
              aria-label={`Go to image ${index + 1}`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${index + 1}`}
                width={64}
                height={64}
                className="h-full w-full cursor-pointer object-cover"
              />
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="cursor-pointer rounded-full bg-white bg-opacity-30 p-2 text-black transition-all hover:bg-opacity-100"
          aria-label="Next image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Image counter */}
      <div className="mt-2 text-sm text-white">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
        <button
          onClick={() => setScale((prev) => Math.min(prev + 0.5, 5))}
          className="cursor-pointer rounded-full bg-white bg-opacity-30 p-2 text-black hover:bg-opacity-100"
          aria-label="Zoom in"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
        <button
          onClick={() => setScale((prev) => Math.max(prev - 0.5, 1))}
          className="cursor-pointer rounded-full bg-white bg-opacity-30 p-2 text-black hover:bg-opacity-100"
          aria-label="Zoom out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 12H4"
            />
          </svg>
        </button>
        <button
          onClick={resetZoom}
          className="cursor-pointer rounded-full bg-white bg-opacity-30 p-2 text-black hover:bg-opacity-100"
          aria-label="Reset zoom"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
