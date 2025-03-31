"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Star } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  id: number;
  comment: string;
  warning?: string;
  clientName: string;
  avatar: string;
  date: string;
  rating: number;
}
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  useScrollAnimation();
  return (
    <div className="animate-on-scroll zoom-in relative w-full max-w-md scale-75 rounded-2xl bg-white p-8 text-center opacity-0 shadow-md transition-all duration-700 ease-in-out">
      {/* Profile Image */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <Image
          src={testimonial.avatar || "https://via.placeholder.com/80"}
          alt={testimonial.clientName}
          className="h-[80px] w-[80px] rounded-full border-4 border-white object-cover shadow-lg"
          width={80}
          height={80}
        />
      </div>

      {/* Content */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold text-gray-800">EXCELLENT JOB!</h3>
        <div className="my-2 flex justify-center gap-1 text-[#b9a28f]">
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              size={20}
              fill={index < testimonial.rating ? "currentColor" : "none"}
              stroke="currentColor"
            />
          ))}
        </div>
        <p className="text-sm text-gray-700 italic">{testimonial.comment}</p>
        <p className="font-signature mt-4 text-lg text-gray-900">
          {testimonial.clientName}
        </p>
      </div>
    </div>
  );
}

export default TestimonialCard;
