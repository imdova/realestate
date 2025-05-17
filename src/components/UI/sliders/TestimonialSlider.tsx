"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import TestimonialCard from "../cards/TestimonialCard";

interface Testimonial {
  id: number;
  comment: string;
  warning?: string;
  clientName: string;
  avatar: string;
  date: string;
  rating: number;
}

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const dummyTestimonials: Testimonial[] = [
    {
      id: 1,
      comment:
        "Real authentic genuine quality however it fit me like an XL size when In fact Im L.",
      warning: "Beware",
      clientName: "Patrick M. Newman",
      date: "May 27, 2024",
      avatar:
        "https://img.freepik.com/free-photo/sexy-fashion-beauty-person-smile_1303-574.jpg?t=st=1743261832~exp=1743265432~hmac=e9c41e5357607b1e6779a049ab00b6dd934044c199db990b5c43a1647dc8846a&w=740",
      rating: 4,
    },
    {
      id: 2,
      comment:
        "Excellent product quality and fast delivery. Very satisfied with my purchase!",
      clientName: "Sarah Johnson",
      date: "June 15, 2024",
      avatar:
        "https://img.freepik.com/premium-photo/photo-pretty-woman-short-haired-suit-gesturing-with-hands-lifestyle-unaltered_561613-8645.jpg?w=1380",
      rating: 4,
    },
    {
      id: 3,
      comment:
        "The item was exactly as described. Perfect fit and great customer service.",
      clientName: "Michael Chen",
      date: "April 5, 2024",
      avatar:
        "https://img.freepik.com/free-photo/businesswoman-having-mobile-call-conversation-smartphone-talking-with-client-standing-white-background-brown-suit_1258-86064.jpg?t=st=1743261946~exp=1743265546~hmac=d6da55602a57770cf247e4d4595f50b9b86c1205161525270b74648f58bfb3f3&w=1380",
      rating: 4,
    },
    {
      id: 4,
      comment:
        "Beautiful design but the color was slightly different than shown in the pictures.",
      clientName: "Emily Rodriguez",
      date: "July 2, 2024",
      avatar:
        "https://img.freepik.com/free-photo/successful-corporate-woman-demonstrating-product-pointing-empty-space-showing-advertisement-smiling-standing-suit-white-background_176420-49127.jpg?t=st=1743261993~exp=1743265593~hmac=fc7e67dcfff1ce40a3ea04996e2ce3c971ac50869c6df9a8ce48677ac6f4763f&w=1380",
      rating: 4,
    },
    {
      id: 5,
      comment:
        "Fast shipping and excellent packaging. The product exceeded my expectations.",
      clientName: "David Wilson",
      date: "August 10, 2024",
      avatar:
        "https://img.freepik.com/free-photo/close-up-shot-charismatic-friendly-looking-happy-nice-dark-skinned-girl-with-pierced-nose-perfect-smile-standing-delighted-cute-white-wall-sweater-enjoying-family-holiday-dinner_176420-35297.jpg?t=st=1743262013~exp=1743265613~hmac=c917bbf4932aafc6a40de53d50090fc146bf2dfa2e4c05809f1bb5a9725bf1da&w=1380",
      rating: 4,
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + 3 >= dummyTestimonials.length ? 0 : prev + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? dummyTestimonials.length - 3 : prev - 1,
    );
  };

  const visibleTestimonials = dummyTestimonials.slice(
    currentIndex,
    currentIndex + 3,
  );

  // Handle case where we don't have enough testimonials to show
  if (visibleTestimonials.length < 3 && dummyTestimonials.length >= 3) {
    const needed = 3 - visibleTestimonials.length;
    visibleTestimonials.push(...dummyTestimonials.slice(0, needed));
  }
  return (
    <div className="animate-on-scroll fade-in rounded-2xl bg-[#e6d5c6a0] px-4 py-16 opacity-0 transition-all duration-700 ease-in-out sm:px-6 lg:px-8">
      <div className="mx-auto">
        <div className="relative mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-3 pb-16 sm:flex-row">
            <h2 className="flex items-center gap-2 text-3xl font-bold md:text-4xl">
              Happy Clients Say
            </h2>
            {/* Navigation Arrows */}
            <div className="flex gap-3">
              <button
                onClick={prevSlide}
                className="cursor-pointer rounded-full bg-white p-2 shadow-md transition hover:bg-gray-100"
                aria-label="Previous testimonial"
              >
                <ArrowLeft className="text-gray-600" size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="cursor-pointer rounded-full bg-white p-2 shadow-md transition hover:bg-gray-100"
                aria-label="Next testimonial"
              >
                <ArrowRight className="text-gray-600" size={20} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {visibleTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
