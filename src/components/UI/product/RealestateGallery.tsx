"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import Image from "next/image";
import VideoGrid from "./VideoGrid";

interface RealestateGalleryProps {
  images: string[];
  videos?: string[];
  address: string;
}

export default function RealestateGallery({
  images,
  address,
  videos,
}: RealestateGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"images" | "map" | "video">(
    "images",
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsOpen(true);
    setActiveTab("images");
  };

  const closeModal = () => setIsOpen(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative mb-4">
      {/* Image Grid */}
      <div className="grid h-[300px] grid-cols-3 gap-2 md:h-[600px] md:grid-cols-8">
        {/* Featured Image (Left side - larger) */}
        <div
          className="col-span-2 cursor-pointer overflow-hidden rounded-md md:col-span-6"
          onClick={() => openModal(0)}
        >
          <Image
            src={images[0]}
            alt="Featured property image"
            width={700}
            height={700}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            priority
          />
        </div>

        {/* Thumbnail Grid (Right side - 2x2) */}
        <div className="grid grid-cols-1 grid-rows-3 gap-2 md:col-span-2">
          {images.slice(1, 4).map((img, index) => (
            <div
              key={index + 1}
              className="relative h-full w-full cursor-pointer overflow-hidden rounded-md"
              onClick={() => openModal(index + 1)}
            >
              <Image
                src={img}
                alt={`Property image ${index + 2}`}
                fill
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
              {/* Show +X more on last thumbnail if more images exist */}
              {index === 2 && images.length > 4 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 font-bold text-white">
                  +{images.length - 4} صور
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/90">
          {/* Header */}
          <div className="flex items-center justify-between bg-black/50 p-2 text-white sm:p-4">
            <button onClick={closeModal} className="p-2">
              <X className="h-6 w-6" />
            </button>
            <div className="flex gap-4">
              <button
                className={`px-4 py-2 ${activeTab === "images" ? "border-b-2 border-white text-white" : "text-gray-400"}`}
                onClick={() => setActiveTab("images")}
              >
                الصور ({images.length})
              </button>
              <button
                className={`px-4 py-2 ${activeTab === "map" ? "border-b-2 border-white text-white" : "text-gray-400"}`}
                onClick={() => setActiveTab("map")}
              >
                الخريطة
              </button>
              <button
                className={`px-4 py-2 ${activeTab === "video" ? "border-b-2 border-white text-white" : "text-gray-400"}`}
                onClick={() => setActiveTab("video")}
              >
                فيديو
              </button>
            </div>
            <div className="w-6"></div> {/* Spacer for balance */}
          </div>

          {/* Content */}
          <div className="no-scrollbar relative grid flex-1 overflow-auto">
            {activeTab === "images" ? (
              <div className="relative flex h-full w-full items-center justify-center">
                <Image
                  src={images[currentImageIndex]}
                  alt={`Property image ${currentImageIndex + 1}`}
                  fill
                  className="object-contain"
                />

                {/* Navigation arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 hover:bg-white/30"
                    >
                      <ChevronLeft className="h-8 w-8 text-white" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 hover:bg-white/30"
                    >
                      <ChevronRight className="h-8 w-8 text-white" />
                    </button>
                  </>
                )}

                {/* Image counter */}
                <div className="absolute bottom-4 left-0 right-0 text-center text-white">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </div>
            ) : activeTab === "map" ? (
              <div className="h-full w-full">
                {/* Google Maps Embed */}
                <div className="flex h-full w-full items-center justify-center">
                  <div className="p-4 text-center text-white">
                    <MapPin className="mx-auto mb-4 h-12 w-12" />
                    <h3 className="mb-2 text-xl font-bold">{address}</h3>
                    <p className="mb-4">خريطة تفاعلية للموقع</p>
                    <div className="aspect-video h-full w-full overflow-hidden rounded-lg bg-gray-700">
                      <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        scrolling="no"
                        marginHeight={0}
                        marginWidth={0}
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <VideoGrid videos={videos} />
            )}
          </div>

          {/* Thumbnail strip (images tab only) */}
          {activeTab === "images" && (
            <div className="hidden h-24 items-center overflow-x-auto bg-black/50 px-4 sm:flex">
              <div className="flex gap-2">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className={`h-16 w-16 flex-shrink-0 cursor-pointer rounded border-2 ${
                      currentImageIndex === index
                        ? "border-white"
                        : "border-transparent"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
