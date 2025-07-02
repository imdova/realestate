"use client";

import { useState } from "react";
import { Play, Video, Expand, Heart, Share2, X } from "lucide-react";

interface VideoGridProps {
  videos?: string[];
}

export default function VideoGrid({ videos }: VideoGridProps) {
  const [expandedVideo, setExpandedVideo] = useState<number | null>(null);

  const getYouTubeEmbedUrl = (url: string) => {
    const match = url.match(/(?:v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
    return match
      ? `https://www.youtube.com/embed/${match[1]}?mute=1&loop=1&playlist=${match[1]}`
      : "";
  };

  const handleVideoClick = (index: number) => {
    if (expandedVideo === null) {
      setExpandedVideo(index);
    }
  };

  const closeExpandedVideo = () => {
    setExpandedVideo(null);
  };

  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center justify-center gap-2 rounded-full border border-gray-700 bg-gray-800/50 px-6 py-3">
            <Video className="h-5 w-5 text-main" />
            <h2 className="text-xl font-bold text-white">جولة بالفيديو</h2>
          </div>
          <p className="mx-auto mt-2 max-w-2xl text-gray-300">
            استكشف العقار من كل الزوايا من خلال جولاتنا المصورة عالية الجودة
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos?.map((video, index) => {
            const embedUrl = getYouTubeEmbedUrl(video);
            return (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-300 ${
                  expandedVideo === index
                    ? "fixed inset-0 z-50 flex items-center justify-center bg-black/90"
                    : "cursor-pointer bg-gray-800 hover:bg-gray-700/80"
                }`}
              >
                {/* Iframe Video */}
                <iframe
                  src={embedUrl}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className={`w-full rounded-xl transition-all duration-300 ${
                    expandedVideo === index
                      ? "h-[60vh] max-w-4xl"
                      : "aspect-video"
                  }`}
                  onClick={() => handleVideoClick(index)}
                />

                {/* Thumbnail Overlay */}
                {expandedVideo !== index && (
                  <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex justify-end space-x-2 space-x-reverse">
                      <button
                        className="rounded-full bg-gray-800/80 p-2 text-white transition-colors hover:bg-main"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Heart className="h-4 w-4" />
                      </button>
                      <button
                        className="rounded-full bg-gray-800/80 p-2 text-white transition-colors hover:bg-main"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-center">
                      <button
                        className="flex items-center justify-center rounded-full bg-main p-3 transition-colors hover:bg-main-dark"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVideoClick(index);
                        }}
                      >
                        <Play className="h-6 w-6 fill-white text-white" />
                      </button>
                    </div>

                    <div className="text-sm font-medium text-white">
                      جولة فيديو #{index + 1}
                    </div>
                  </div>
                )}

                {/* Expand/Close Button */}
                <button
                  className={`absolute ${
                    expandedVideo === index ? "right-4 top-4" : "right-2 top-2"
                  } z-10 rounded-full bg-gray-800/80 p-2 text-white transition-colors hover:bg-main`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (expandedVideo === index) {
                      closeExpandedVideo();
                    } else {
                      handleVideoClick(index);
                    }
                  }}
                >
                  {expandedVideo === index ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Expand className="h-4 w-4" />
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {!videos?.length && (
          <div className="py-12 text-center">
            <Video className="mx-auto h-12 w-12 text-gray-500" />
            <h3 className="mt-4 text-lg font-medium text-gray-300">
              لا تتوفر جولات فيديو حالياً
            </h3>
            <p className="mt-2 text-gray-500">سيتم إضافة جولات فيديو قريباً</p>
          </div>
        )}
      </div>
    </div>
  );
}
