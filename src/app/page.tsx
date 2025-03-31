"use client";
import LandingImg_1 from "@/assets/images/landing-1.jpg";
import LandingImg_2 from "@/assets/images/landing-2.jpg";
import LandingImg_3 from "@/assets/images/home(1)-3.png";
import LandingImg_4 from "@/assets/images/home(1)-4.png";
import LandingImg_5 from "@/assets/images/home(1)-5.png";
import LandingSlider from "@/components/UI/LandingSlider";
import { Slide } from "@/types";
import { ArrowRight, Flame } from "lucide-react";
import { Products } from "@/constants/products.data";
import CategorySlider from "@/components/UI/CategorySlider";
import ProductCard from "@/components/UI/cards/ProductCard";
import FlashSaleCounter from "@/components/UI/Counter";
import Link from "next/link";
import Image from "next/image";
import DynamicButton from "@/components/UI/Buttons/DynamicButton";
import ProductFilter from "@/components/UI/ProductFilter";
import { useState } from "react";
import TestimonialSlider from "@/components/UI/TestimonialSlider";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const slides: Slide[] = [
  {
    id: 1,
    image: LandingImg_1,
    title: "Pharmacy that provides all medicines",
    subTitle: "Discounts on medicines + Delivery services",
    label: "Shop Now",
    url: "/",
  },
  {
    id: 2,
    image: LandingImg_2,
    subTitle: "Discounts on medicines + Delivery services",
    title: "Get Your Vitamins & Minerals",
    label: "Shop Now",
    url: "/",
  },
];
export default function Home() {
  const [filter, setFilter] = useState<string>("all");

  // Filter products based on selected filter
  const filteredProducts = Products.filter((product) => {
    if (filter === "all") return true;
    if (filter === "sale") return product.isOnSale;
    return product.category.toLowerCase() === filter.toLowerCase();
  });
  useScrollAnimation();
  return (
    <div>
      <div className="container mx-auto px-6 lg:max-w-[1440px]">
        {/* landing content  */}
        <LandingSlider slides={slides} />
        <CategorySlider />
        <div className="px-4 py-12 sm:px-6 lg:px-8">
          {/* Flash Sale Header with Counter */}
          <div className="animate-on-scroll slide-up mb-12 flex translate-y-10 flex-col items-center justify-between gap-8 opacity-0 transition-all duration-700 ease-in-out sm:flex-row sm:gap-8">
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <h2 className="flex items-center gap-2 text-3xl font-bold md:text-4xl">
                <Flame size={30} className="text-red-500" /> Flash Sale
              </h2>
              <FlashSaleCounter duration={{ value: 2, unit: "hours" }} />
            </div>
            {/* View More Button*/}
            <div className="text-center">
              <Link
                href={"#"}
                className="hover:text-main flex items-center gap-3 font-bold transition"
              >
                View All <ArrowRight size={18} />
              </Link>
            </div>
          </div>
          {/* Products Grid */}
          <div className="animate-on-scroll slide-up grid translate-y-10 grid-cols-1 gap-6 opacity-0 transition-all duration-700 ease-in-out sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </div>
        {/* Banners  */}
        <div className="flex flex-col gap-4 py-12 md:flex-row md:gap-8">
          <div className="animate-on-scroll zoom-in relative h-[600px] w-full scale-75 overflow-hidden rounded-2xl p-8 opacity-0 transition-all duration-700 ease-in-out md:h-[800px]">
            <Image
              className="absolute top-0 left-0 h-full w-full object-cover brightness-75"
              src={LandingImg_3}
              alt="Landing image"
            />
            <div className="relative flex h-full flex-col justify-between">
              <h2 className="text-4xl font-bold text-white">
                Get 30% off all types of functional foods on your first
                purchase.
              </h2>
              <div className="flex w-full items-center justify-between">
                <h1 className="text-6xl font-bold text-white">30%</h1>
                <DynamicButton variant="white" href={"/"} label={"Shop Now"} />
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col">
            <div className="animate-on-scroll zoom-in relative mb-4 h-full w-full scale-75 overflow-hidden rounded-2xl opacity-0 transition-all duration-700 ease-in-out md:mb-8">
              <Image
                className="absolute top-0 left-0 h-full w-full object-cover brightness-90"
                src={LandingImg_4}
                alt="Landing image"
              />
              <div className="relative flex h-full flex-col justify-center p-8">
                <div className="mb-4">
                  <h1 className="mb-2 max-w-[300px] text-4xl font-bold">
                    Weekend{" "}
                    <span className="text-4xl text-white"> Discount 20%</span>
                  </h1>
                  <p className="text-xs text-gray-700 sm:text-lg">
                    Low Priced Medical Products
                  </p>
                </div>
                <DynamicButton
                  className="!bg-black !text-white"
                  href={"/"}
                  label={"Shop Now"}
                />
              </div>
            </div>
            <div className="animate-on-scroll zoom-in relative h-full w-full scale-75 overflow-hidden rounded-2xl opacity-0 transition-all duration-700 ease-in-out">
              <Image
                className="absolute top-0 left-0 h-full w-full object-cover brightness-90"
                src={LandingImg_5}
                alt="Landing image"
              />
              <div className="relative flex h-full flex-col justify-center p-8">
                <div className="mb-4">
                  <h1 className="mb-2 max-w-[300px] text-4xl font-bold">
                    Save {""}
                    <span className="text-4xl text-white">50% Off </span>
                    Pathway Health.
                  </h1>
                  <p className="text-xs text-gray-700 sm:text-lg">
                    Shop the hotest products.
                  </p>
                </div>
                <DynamicButton variant="white" href={"/"} label={"Shop Now"} />
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-12 sm:px-6 lg:px-8">
          {/* Flash Sale Header with Counter */}
          <div className="animate-on-scroll slide-up mb-12 flex translate-y-10 flex-col items-center justify-between gap-8 opacity-0 transition-all duration-700 ease-in-out lg:flex-row lg:gap-8">
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <h2 className="flex items-center gap-2 text-3xl font-bold md:text-4xl">
                Best Seller Products
              </h2>
            </div>
            {/* View More Button*/}
            <div className="text-center">
              <ProductFilter onFilterChange={setFilter} />
            </div>
          </div>
          {/* Products Grid */}
          <div className="animate-on-scroll slide-up grid min-h-[400px] translate-y-10 grid-cols-1 gap-6 opacity-0 transition-all duration-700 ease-in-out sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <div className="text-sm font-medium text-gray-500">
                  No products found matching your filter
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="px-4 py-12 sm:px-6 lg:px-8">
          <TestimonialSlider />
        </div>
      </div>
    </div>
  );
}
